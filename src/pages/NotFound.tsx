const NotFound = () => {
    return (
      <div>
        <nav className="bg-orange-400 text-white p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Ecodim</h1>
        </nav>

        <h1 className="text-7xl font-bold text-center m-16">404 - Page Not Found</h1>
        
        <footer className="bg-gray-800 text-white text-center p-3 mt-10">
          <p>© {new Date().getFullYear()} Ecodim. Tous droits réservés.</p>
        </footer>
      </div>
    
  );
  };
  
  export default NotFound;