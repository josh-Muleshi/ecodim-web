import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../services/firebase';
import { doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import ReactMarkdown from 'react-markdown';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import { customMarkdownComponents } from '../components/Markdown';

interface Lesson {
  id: string;
  content: string;
}

const LessonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [newContent, setNewContent] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchLesson = async () => {
      if (!id) return;
      const docRef = doc(db, "lesson", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLesson({ id: docSnap.id, ...docSnap.data() } as Lesson);
        setNewContent(docSnap.data().content);
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
    await updateDoc(doc(db, "lesson", id), { content: newContent });
    setLesson((prev) => prev ? { ...prev, content: newContent } : null);
    setIsEditing(false);
    alert("Lesson updated successfully!");
  };

  if (!lesson) return <p>Loading...</p>;

  return (
    <div className="max-w-full mx-auto">
        <Navbar />
        <div className="p-6 flex justify-center items-center min-h-screen">
            <div className="w-full max-w-4xl bg-white">
                {isEditing ? (
                <textarea 
                    value={newContent} 
                    onChange={(e) => setNewContent(e.target.value)}
                    className="w-full h-screen p-4 border border-gray-300 rounded-lg text-lg resize-none overflow-hidden"
                />
                ) : (
                <div className="border border-gray-300 p-8 rounded-lg text-lg leading-relaxed">
                    <ReactMarkdown components={customMarkdownComponents}>{lesson.content}</ReactMarkdown>
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
        </div>
        <Footer />
    </div>
  );
};

export default LessonDetail;
