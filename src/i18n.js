import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "welcome": "Welcome to EduKhel Learning Hub",
      "download_pdf": "Download PDF 📄",
      "badge": "Badge",
      "maths_real_life": "Maths in Real Life",
      "maths_puzzle": "Maths Puzzle",
      "time_speed_distance": "Time-Speed-Distance Tricks",
      "speed_challenge": "Speed Challenge",
      "olympiad_math": "Olympiad Mathematics Challenges",
      "olympiad_quiz": "Olympiad Quiz"
    }
  },
  hi: {
    translation: {
      "welcome": "एडूखेल लर्निंग हब में आपका स्वागत है",
      "download_pdf": "पीडीएफ डाउनलोड करें 📄",
      "badge": "बैज",
      "maths_real_life": "असली जीवन में गणित",
      "maths_puzzle": "गणित पहेली",
      "time_speed_distance": "समय-गति-दूरी ट्रिक्स",
      "speed_challenge": "गति चुनौती",
      "olympiad_math": "ओलंपियाड गणित चुनौतियाँ",
      "olympiad_quiz": "ओलंपियाड क्विज़"
    }
  },
  od: {
    translation: {
      "welcome": "ଏଡୁଖେଲ୍ ଲର୍ଣ୍ଣିଂ ହବ୍ ରେ ଆପଣଙ୍କୁ ସ୍ବାଗତ",
      "download_pdf": "ପିଡିଏଫ୍ ଡାଉନଲୋଡ୍ କରନ୍ତୁ 📄",
      "badge": "ବ୍ୟାଜ୍",
      "maths_real_life": "ଏବଂ ଜୀବନରେ ଗଣିତ",
      "maths_puzzle": "ଗଣିତ ପଜଲ୍",
      "time_speed_distance": "ସମୟ-ଗତି-ଦୂରତା ଟ୍ରିକ୍ସ",
      "speed_challenge": "ଗତି ଚ୍ୟାଲେଞ୍ଜ",
      "olympiad_math": "ଓଲିମ୍ପିଆଡ୍ ଗଣିତ ଚ୍ୟାଲେଞ୍ଜସ୍",
      "olympiad_quiz": "ଓଲିମ୍ପିଆଡ୍ କୁଇଜ୍"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    interpolation: { escapeValue: false }
  });

export default i18n;
