// src/components/LanguageSwitcher.jsx
import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng); // 👈 language update
  };

  return (
    <div className="flex gap-2 bg-gray-900/70 px-3 py-2 rounded-xl shadow-lg backdrop-blur-md">
      <button
        onClick={() => changeLanguage("en")}
        className="px-2 py-1 text-sm font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition"
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage("hi")}
        className="px-2 py-1 text-sm font-bold text-white bg-pink-600 rounded-lg hover:bg-pink-500 transition"
      >
        हिंदी
      </button>
      <button
        onClick={() => changeLanguage("od")}
        className="px-2 py-1 text-sm font-bold text-white bg-green-600 rounded-lg hover:bg-green-500 transition"
      >
        ଓଡିଆ
      </button>
    </div>
  );
};

export default LanguageSwitcher;
