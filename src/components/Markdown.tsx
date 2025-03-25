import ReactMarkdown from 'react-markdown';
import React, { useRef, useEffect } from 'react';

interface MarkdownInputProps {
    markdown: string;
    setMarkdown: React.Dispatch<React.SetStateAction<string>>;
  }
  
  const MarkdownInput: React.FC<MarkdownInputProps> = ({ markdown, setMarkdown }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
  
    useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }, [markdown]);
  
    return (
      <textarea
        ref={textareaRef}
        className="w-full min-h-[200px] max-h-full p-2 border border-gray-300 rounded-md overflow-hidden resize-none"
        placeholder="Write your markdown here..."
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
      />
    );
  };
  
  interface MarkdownPreviewProps {
    markdown: string;
  }
  
  const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ markdown }) => {
    return (
      <div className="w-full h-full overflow-auto p-4 border border-gray-300 rounded-md bg-white">
        <ReactMarkdown components={customMarkdownComponents}>{markdown}</ReactMarkdown>
      </div>
    );
};

const customMarkdownComponents: object = {
  h1: (props: any) => <h1 className="text-3xl font-bold mb-4" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-semibold mb-3" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-medium mb-2" {...props} />,
  h4: (props: any) => <h4 className="text-lg font-semibold mb-2" {...props} />,
  h5: (props: any) => <h5 className="text-md font-medium mb-1" {...props} />,
  h6: (props: any) => <h6 className="text-sm font-light mb-1" {...props} />,
  p: (props: any) => <p className="mb-2 text-gray-800" {...props} />,
  strong: (props: any) => <strong className="font-bold text-gray-900" {...props} />,
  em: (props: any) => <em className="italic text-gray-600" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-5" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-5" {...props} />,
  li: (props: any) => <li className="mb-2" {...props} />,
  a: (props: any) => <a className="text-blue-600 hover:underline" {...props} />,
  img: (props: any) => <img className="max-w-full h-auto" {...props} />,
  blockquote: (props: any) => <blockquote className="border-l-4 pl-4 text-gray-700 italic" {...props} />,
  code: (props: any) => <code className="bg-gray-200 text-sm px-2 py-1 rounded" {...props} />,
  inlineCode: (props: any) => <code className="bg-gray-200 text-sm px-1 py-0.5 rounded" {...props} />,
  hr: (props: any) => <hr className="border-t-2 border-gray-300 my-4" {...props} />,
  table: (props: any) => <table className="min-w-full table-auto" {...props} />,
  th: (props: any) => <th className="border-b-2 px-4 py-2" {...props} />,
  td: (props: any) => <td className="border-b px-4 py-2" {...props} />,
};

export { MarkdownInput, MarkdownPreview, customMarkdownComponents }