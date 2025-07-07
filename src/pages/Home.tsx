import React, { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import ReactMarkdown from 'react-markdown';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import { customMarkdownComponents } from '../components/Markdown';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

interface Lesson {
  id: string;
  content: string;
  createdAt: any;
  week?: boolean;
}

const Home: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLessons = async () => {
      const q = query(collection(db, "lesson"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const lessonsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Lesson[];

      // ✅ Met les leçons avec week=true en premier
      const sortedLessons = lessonsData.sort((a, b) => {
        if (a.week === b.week) return 0;
        return a.week ? -1 : 1;
      });

      setLessons(sortedLessons);
      setIsLoading(false);
    };

    fetchLessons();
  }, []);

  return (
    <div className="max-w-full mx-auto">
      <Navbar />

      <div className="flex justify-center p-6">
        <h1 className="text-gray-500">Toutes les leçons</h1>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <Link to={`/dashboard/detail/${lesson.id}`} key={lesson.id}>
              <div className="relative border border-gray-300 rounded-md p-4 bg-white shadow-md cursor-pointer hover:bg-gray-100">
                
                {/* ✅ Label Semaine */}
                {lesson.week && (
                  <div className="absolute bottom-4 right-4 bg-orange-400 text-white text-xs font-semibold px-4 py-2 rounded-full">
                    Semaine
                  </div>
                )}
                
                <div className="text-gray-700 line-clamp-3">
                  <ReactMarkdown components={customMarkdownComponents}>
                    {lesson.content}
                  </ReactMarkdown>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Home;
