import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value);
  };

  return (
    <div className="max-w-full mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="w-full">
          <textarea
            className="w-full h-[calc(100vh-2rem)]"
            placeholder="Write your markdown here..."
            value={markdown}
            onChange={handleChange}
          />
        </div>
        
        <div className="w-full">
          <div className="w-full h-[calc(100vh-2rem)] overflow-auto">
            <div className="markdown-preview">
              <ReactMarkdown 
                children={markdown}
                components={{
                  // Headers
                  h1: ({node, ...props}) => <h1 className="text-3xl font-bold mb-4" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-2xl font-semibold mb-3" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-xl font-medium mb-2" {...props} />,
                  h4: ({node, ...props}) => <h4 className="text-lg font-semibold mb-2" {...props} />,
                  h5: ({node, ...props}) => <h5 className="text-md font-medium mb-1" {...props} />,
                  h6: ({node, ...props}) => <h6 className="text-sm font-light mb-1" {...props} />,
                  
                  // Paragraphs
                  p: ({node, ...props}) => <p className="mb-2 text-gray-800" {...props} />,
                  
                  // Strong (Bold Text)
                  strong: ({node, ...props}) => <strong className="font-bold text-gray-900" {...props} />,
                  
                  // Emphasized (Italic Text)
                  em: ({node, ...props}) => <em className="italic text-gray-600" {...props} />,
                  
                  // Unordered List
                  ul: ({node, ...props}) => <ul className="list-disc pl-5" {...props} />,
                  
                  // Ordered List
                  ol: ({node, ...props}) => <ol className="list-decimal pl-5" {...props} />,
                  
                  // List Items
                  li: ({node, ...props}) => <li className="mb-2" {...props} />,
                  
                  // Links
                  a: ({node, ...props}) => (
                    <a className="text-blue-600 hover:underline" {...props} />
                  ),
                  
                  // Images
                  img: ({node, ...props}) => (
                    <img className="max-w-full h-auto" {...props} />
                  ),
                  
                  // Blockquotes
                  blockquote: ({node, ...props}) => (
                    <blockquote className="border-l-4 pl-4 text-gray-700 italic" {...props} />
                  ),
                  
                  // Code Blocks
                  code: ({node, ...props}) => (
                    <code className="bg-gray-200 text-sm px-2 py-1 rounded">{props.children}</code>
                  ),
                  
                  // Inline Code
                  inlineCode: ({node, ...props}) => (
                    <code className="bg-gray-200 text-sm px-1 py-0.5 rounded">{props.children}</code>
                  ),
                  
                  // Horizontal Rule
                  hr: ({node, ...props}) => (
                    <hr className="border-t-2 border-gray-300 my-4" {...props} />
                  ),

                  table: ({node, ...props}) => <table className="min-w-full table-auto" {...props} />,
                  th: ({node, ...props}) => <th className="border-b-2 px-4 py-2">{props.children}</th>,
                  td: ({node, ...props}) => <td className="border-b px-4 py-2">{props.children}</td>,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
