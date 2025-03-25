import React, { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import ReactMarkdown from 'react-markdown';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import { customMarkdownComponents } from '../components/Markdown';

interface Lesson {
  id: string;
  content: string;
  createdAt: any;
}

const Home: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    const fetchLessons = async () => {
      const q = query(collection(db, "lesson"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const lessonsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Lesson[];
      setLessons(lessonsData);
    };

    fetchLessons();
  }, []);

  return (
    <div className="max-w-full mx-auto">
      <Navbar />
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="border border-gray-300 rounded-md p-4 bg-white shadow-md">
            <div className="text-gray-700 line-clamp-3">
              <ReactMarkdown components={customMarkdownComponents}>{lesson.content}</ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Home;



