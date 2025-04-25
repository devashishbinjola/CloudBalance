import React, { useState } from "react";
import "./CodeBox.css";
import { FiCopy, FiCheck } from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CodeBox = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Code copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-box-container">
      <div className="code-box-wrapper" onClick={handleCopy}>
        <button className="copy-button" onClick={(e) => {
          e.stopPropagation(); 
          handleCopy();
        }}>
          {copied ? <FiCheck /> : <FiCopy />}
        </button>
        <pre className="code-box">
          <code>{code}</code>
        </pre>
      </div>
      <span className="helper-text">Click anywhere in the box to copy the content</span>
    </div>
  );
};

export default CodeBox;
