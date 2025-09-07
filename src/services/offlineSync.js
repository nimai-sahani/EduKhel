// Offline Data Synchronization Service
class OfflineSyncService {
  constructor() {
    this.dbName = 'EduKhelOfflineDB';
    this.version = 1;
    this.db = null;
    this.syncQueue = [];
    this.isOnline = navigator.onLine;
    this.init();
  }

  async init() {
    try {
      // Initialize IndexedDB for offline storage
      this.db = await this.openDB();
      
      // Listen for online/offline events
      window.addEventListener('online', () => {
        this.isOnline = true;
        this.syncPendingData();
      });
      
      window.addEventListener('offline', () => {
        this.isOnline = false;
      });
    } catch (error) {
      console.error('Failed to initialize offline sync:', error);
    }
  }

  openDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        
        // Create object stores for different data types
        if (!db.objectStoreNames.contains('progress')) {
          const progressStore = db.createObjectStore('progress', { keyPath: 'id', autoIncrement: true });
          progressStore.createIndex('userId', 'userId', { unique: false });
          progressStore.createIndex('timestamp', 'timestamp', { unique: false });
        }
        
        if (!db.objectStoreNames.contains('quizResults')) {
          const quizStore = db.createObjectStore('quizResults', { keyPath: 'id', autoIncrement: true });
          quizStore.createIndex('userId', 'userId', { unique: false });
          quizStore.createIndex('timestamp', 'timestamp', { unique: false });
        }
        
        if (!db.objectStoreNames.contains('syncQueue')) {
          const syncStore = db.createObjectStore('syncQueue', { keyPath: 'id', autoIncrement: true });
          syncStore.createIndex('type', 'type', { unique: false });
          syncStore.createIndex('timestamp', 'timestamp', { unique: false });
        }
      };
    });
  }

  // Save data locally when offline
  async saveOfflineData(storeName, data) {
    if (!this.db) return false;
    
    try {
      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      await store.add({
        ...data,
        timestamp: new Date().toISOString(),
        synced: false
      });
      return true;
    } catch (error) {
      console.error('Failed to save offline data:', error);
      return false;
    }
  }

  // Get offline data
  async getOfflineData(storeName, userId = null) {
    if (!this.db) return [];
    
    try {
      const transaction = this.db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();
      
      return new Promise((resolve, reject) => {
        request.onsuccess = () => {
          let data = request.result;
          if (userId) {
            data = data.filter(item => item.userId === userId);
          }
          resolve(data);
        };
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Failed to get offline data:', error);
      return [];
    }
  }

  // Add to sync queue
  async addToSyncQueue(type, data) {
    if (!this.db) return false;
    
    try {
      const transaction = this.db.transaction(['syncQueue'], 'readwrite');
      const store = transaction.objectStore('syncQueue');
      await store.add({
        type,
        data,
        timestamp: new Date().toISOString(),
        attempts: 0
      });
      return true;
    } catch (error) {
      console.error('Failed to add to sync queue:', error);
      return false;
    }
  }

  // Sync pending data when online
  async syncPendingData() {
    if (!this.isOnline || !this.db) return;
    
    try {
      const transaction = this.db.transaction(['syncQueue'], 'readwrite');
      const store = transaction.objectStore('syncQueue');
      const request = store.getAll();
      
      request.onsuccess = async () => {
        const pendingItems = request.result;
        
        for (const item of pendingItems) {
          try {
            await this.syncItem(item);
            // Remove from queue after successful sync
            await this.removeFromSyncQueue(item.id);
          } catch (error) {
            console.error('Failed to sync item:', error);
            // Increment attempts and keep in queue
            await this.incrementSyncAttempts(item.id);
          }
        }
      };
    } catch (error) {
      console.error('Failed to sync pending data:', error);
    }
  }

  async syncItem(item) {
    // Simulate API calls - replace with actual API endpoints
    const response = await fetch(`/api/${item.type}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item.data)
    });
    
    if (!response.ok) {
      throw new Error(`Sync failed: ${response.statusText}`);
    }
    
    return response.json();
  }

  async removeFromSyncQueue(id) {
    if (!this.db) return;
    
    try {
      const transaction = this.db.transaction(['syncQueue'], 'readwrite');
      const store = transaction.objectStore('syncQueue');
      await store.delete(id);
    } catch (error) {
      console.error('Failed to remove from sync queue:', error);
    }
  }

  async incrementSyncAttempts(id) {
    if (!this.db) return;
    
    try {
      const transaction = this.db.transaction(['syncQueue'], 'readwrite');
      const store = transaction.objectStore('syncQueue');
      const getRequest = store.get(id);
      
      getRequest.onsuccess = () => {
        const item = getRequest.result;
        if (item) {
          item.attempts = (item.attempts || 0) + 1;
          store.put(item);
        }
      };
    } catch (error) {
      console.error('Failed to increment sync attempts:', error);
    }
  }

  // Save progress data
  async saveProgress(userId, progressData) {
    const data = {
      userId,
      ...progressData,
      timestamp: new Date().toISOString()
    };
    
    if (this.isOnline) {
      try {
        // Try to sync immediately
        await this.syncItem({ type: 'progress', data });
        return true;
      } catch (error) {
        // If sync fails, save offline
        await this.saveOfflineData('progress', data);
        await this.addToSyncQueue('progress', data);
        return false;
      }
    } else {
      // Save offline and add to sync queue
      await this.saveOfflineData('progress', data);
      await this.addToSyncQueue('progress', data);
      return false;
    }
  }

  // Save quiz results
  async saveQuizResult(userId, quizData) {
    const data = {
      userId,
      ...quizData,
      timestamp: new Date().toISOString()
    };
    
    if (this.isOnline) {
      try {
        await this.syncItem({ type: 'quizResults', data });
        return true;
      } catch (error) {
        await this.saveOfflineData('quizResults', data);
        await this.addToSyncQueue('quizResults', data);
        return false;
      }
    } else {
      await this.saveOfflineData('quizResults', data);
      await this.addToSyncQueue('quizResults', data);
      return false;
    }
  }

  // Get user's offline progress
  async getUserProgress(userId) {
    return await this.getOfflineData('progress', userId);
  }

  // Get user's offline quiz results
  async getUserQuizResults(userId) {
    return await this.getOfflineData('quizResults', userId);
  }

  // Clear offline data
  async clearOfflineData() {
    if (!this.db) return;
    
    try {
      const stores = ['progress', 'quizResults', 'syncQueue'];
      const transaction = this.db.transaction(stores, 'readwrite');
      
      for (const storeName of stores) {
        const store = transaction.objectStore(storeName);
        await store.clear();
      }
    } catch (error) {
      console.error('Failed to clear offline data:', error);
    }
  }
}

// Create singleton instance
const offlineSyncService = new OfflineSyncService();

export default offlineSyncService;
