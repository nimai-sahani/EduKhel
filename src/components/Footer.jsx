// src/components/Footer.jsx
function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-4 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">© 2025 EduKhel. All Rights Reserved.</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms</a>
          <a href="#" className="hover:text-white">Support</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
