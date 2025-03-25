import React, { useState } from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import { MarkdownInput, MarkdownPreview } from '../components/Markdown';

const MarkdownEditor: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>("");

  return (
    <div className="max-w-full mx-auto">
      <Navbar />
      <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        <MarkdownInput markdown={markdown} setMarkdown={setMarkdown} />
        <MarkdownPreview markdown={markdown} />
      </div>
      <Footer />
    </div>
  );
};

export default MarkdownEditor;