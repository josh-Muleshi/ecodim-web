import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useState } from 'react';

function Home() {
  return <h1 className="text-2xl font-bold text-center">Home Page</h1>;
}

function MarkdownEditor() {
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

export default function App() {
  return (
    <Router>
      <div className="p-4 text-center">
        <nav className="mb-4">
          <Link to="/" className="mr-4 text-blue-500">Home</Link>
          <Link to="/markdown" className="text-blue-500">Markdown Editor</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/markdown" element={<MarkdownEditor />} />
        </Routes>
      </div>
    </Router>
  );
}
