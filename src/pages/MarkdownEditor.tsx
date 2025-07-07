import React, { useState } from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import { MarkdownInput, MarkdownPreview } from '../components/Markdown';
import { db, auth } from '../services/firebase';
import { collection, serverTimestamp, doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const MarkdownEditor: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>("");
  const [week, setWeek] = useState<boolean>(false); // ✅ État pour le switch
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!auth.currentUser) {
      alert("User not authenticated");
      return;
    }

    try {
      const lessonRef = doc(collection(db, "lesson"));
      const lessonId = lessonRef.id;
      const timestamp = serverTimestamp();

      await setDoc(lessonRef, {
        uid: lessonId, 
        content: markdown,
        createdAt: timestamp,
        updatedAt: timestamp,
        userId: auth.currentUser.uid,
        week: week, // ✅ Sauvegarde de la valeur du switch
      });

      alert("Lesson saved successfully!");
      navigate("/dashboard");
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

      {/* ✅ Switch visuel */}
      <div className="flex justify-center items-center gap-4 p-4">
        <label htmlFor="weekToggle" className="font-medium text-gray-700">Semaine active :</label>

        <label htmlFor="weekToggle" className="relative inline-block w-12 h-6 cursor-pointer">
          <input
            id="weekToggle"
            type="checkbox"
            checked={week}
            onChange={(e) => setWeek(e.target.checked)}
            className="sr-only"
          />
          <div className={`w-full h-full rounded-full transition-colors duration-300 ${week ? "bg-green-500" : "bg-gray-400"}`}></div>
          <div
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
              week ? "translate-x-6" : ""
            }`}
          />
        </label>

        <span className="ml-2 text-sm font-medium text-gray-700">
          {week ? "Oui" : "Non"}
        </span>
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
