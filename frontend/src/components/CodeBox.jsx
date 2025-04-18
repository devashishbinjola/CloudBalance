import React, { useState } from "react";
import "../css/CodeBox.css";
import { FiCopy, FiCheck } from "react-icons/fi";

const CodeBox = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
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
