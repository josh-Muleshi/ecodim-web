import React, { useState } from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import { MarkdownInput, MarkdownPreview } from '../components/Markdown';
import { db, auth } from '../services/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const MarkdownEditor: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>("");

  const handleSave = async () => {
    if (!auth.currentUser) {
      alert("User not authenticated");
      return;
    }

    try {
      await addDoc(collection(db, "lesson"), {
        content: markdown,
        createdAt: serverTimestamp(),
        userId: auth.currentUser.uid,
      });
      alert("Lesson saved successfully!");
    } catch (error) {
      console.error("Error saving lesson:", error);
    }
  };

  return (
    <div className="max-w-full mx-auto">
      <Navbar />
      <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        <MarkdownInput markdown={markdown} setMarkdown={setMarkdown} />
        <MarkdownPreview markdown={markdown} />
      </div>
      <div className="flex justify-center p-4">
        <button 
          onClick={handleSave}
          className="px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-blue-600"
        >
          Save
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default MarkdownEditor;