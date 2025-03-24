import ReactMarkdown from 'react-markdown';
import { useState } from 'react';

export const MarkdownEditor = () => {
    const [markdown, setMarkdown] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setMarkdown(e.target.value);
    };
  
    return (
        <div className="p-4 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Partie Markdown */}
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold mb-2">Editor</h2>
              <textarea
                className="w-full h-80 border p-4 rounded-md"
                placeholder="Write your markdown here..."
                value={markdown}
                onChange={handleChange}
              />
            </div>
            
            {/* Partie Preview */}
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold mb-2">Preview</h2>
              <div className="border p-4 rounded-md h-80 overflow-auto">
                <ReactMarkdown>{markdown}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
    );
}