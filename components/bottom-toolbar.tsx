"use client";

import type React from "react";
import { useState } from "react";
import {
  GitBranch,
  Bell,
  Check,
  X,
  AlertCircle,
  ChevronDown,
  Settings,
} from "lucide-react";

const BottomToolbar: React.FC = () => {
  const [language, setLanguage] = useState("TypeScript");
  const toggleLanguage = () => {
    setLanguage((prev) =>
      prev === "TypeScript" ? "JavaScript" : "TypeScript",
    );
  };

  return (
    <div className="backdrop-blur-2xl sticky z-20 bg-transparent -bottom-12t  left-0 right-0 border-t-2 border-white/10 text-white text-xs flex items-center justify-between px-2 py-1">
      <div className="flex items-center space-x-4">
        <button
          className="flex items-center space-x-1 hover:bg-transparent/90 px-2 py-0.5 rounded"
          onClick={toggleLanguage}
        >
          <GitBranch size={14} />
          <span>main</span>
        </button>
        <div className="flex items-center space-x-1">
          <X size={14} />
          <Check size={14} />
          <span>0</span>
          <AlertCircle size={14} />
          <span>0</span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button
          disabled={true}
          className="flex items-center space-x-1  px-2 py-0.5 rounded"
          onClick={toggleLanguage}
        >
          <span>{language}</span>
          <ChevronDown size={14} />
        </button>
        <span>UTF-8</span>
        <span>LF</span>
        <Bell size={14} />
        <Settings size={14} />
      </div>
    </div>
  );
};

export default BottomToolbar;
