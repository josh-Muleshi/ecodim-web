import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../services/firebase';
import { doc, getDoc, deleteDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import ReactMarkdown from 'react-markdown';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import { customMarkdownComponents } from '../components/Markdown';
import Loading from '../components/Loading';

interface Lesson {
  id: string;
  content: string;
  week?: boolean;
}

const LessonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [newContent, setNewContent] = useState<string>("");
  const [week, setWeek] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchLesson = async () => {
      if (!id) return;
      const docRef = doc(db, "lesson", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setLesson({ id: docSnap.id, ...data } as Lesson);
        setNewContent(data.content);
        setWeek(data.week || false); // Initialiser le switch
      }
    };

    fetchLesson();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    await deleteDoc(doc(db, "lesson", id));
    alert("Lesson deleted successfully!");
    navigate("/dashboard");
  };

  const handleUpdate = async () => {
    if (!id || !newContent.trim()) return;
    
    const updatedData = {
      content: newContent,
      week: week,
      updatedAt: serverTimestamp(),
    };

    await updateDoc(doc(db, "lesson", id), updatedData);
    setLesson((prev) => prev ? { ...prev, content: newContent, week } : null);
    setIsEditing(false);
    alert("Lesson updated successfully!");
  };

  if (!lesson) return <Loading />;

  return (
    <div className="max-w-full mx-auto">
      <Navbar />

      <div className="p-6 justify-center items-center">
        {isEditing && (
          <>
            <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <textarea 
                value={newContent} 
                onChange={(e) => setNewContent(e.target.value)}
                className="w-full min-h-[200px] max-h-full p-2 border border-gray-300 rounded-md overflow-hidden resize-none"
              />
              <div className="w-full h-full overflow-auto p-4 border border-gray-300 rounded-md bg-white">
                <ReactMarkdown components={customMarkdownComponents}>{newContent}</ReactMarkdown>
              </div>
            </div>

            {/* ✅ Switch toggle pour la propriété week */}
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
              <span className="ml-2 text-sm font-medium text-gray-700">{week ? "Oui" : "Non"}</span>
            </div>
          </>
        )}

        {!isEditing && (
          <div className="flex flex-col justify-center items-center space-y-4">
            <div className="w-full max-w-4xl text-lg">
              <ReactMarkdown components={customMarkdownComponents}>{lesson.content}</ReactMarkdown>
            </div>
            <p className="text-sm text-gray-600">
              <strong>Semaine active :</strong> {lesson.week ? 'Oui' : 'Non'}
            </p>
          </div>
        )}

        <div className="mt-8 flex justify-center space-x-8">
          {isEditing ? (
            <button 
              onClick={handleUpdate} 
              className="px-5 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 text-lg"
            >
              Save
            </button>
          ) : (
            <button 
              onClick={() => setIsEditing(true)} 
              className="px-5 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-lg"
            >
              Edit
            </button>
          )}

          <button 
            onClick={handleDelete} 
            className="px-5 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 text-lg"
          >
            Delete
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LessonDetail;
