import React, { useState } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';
import '../css/CodeBoxSmall.css';

const CodeBoxSmall = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-box-small-container" onClick={handleCopy}>
      <div className="code-box-small-wrapper">
        <span className="code-box-small-icon">{copied ? <FiCheck /> : <FiCopy />}</span>
        <pre className="code-box-small-code">
          <code>{code}</code>
        </pre>
      </div>
      <span className="code-box-small-helper-text">Click anywhere in the box to copy the content</span>
    </div>
  );
};

export default CodeBoxSmall;
