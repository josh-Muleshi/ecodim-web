import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home } from '../pages/Home';
import { MarkdownEditor } from "../pages/MarkdownEditor";
import PrivateRoute from "./PrivateRouter";

const AppRouter = () => {
  return (
    <div className="p-4 text-center">
        <nav className="mb-4">
          <Link to="/" className="mr-4 text-blue-500">Home</Link>
          <Link to="/markdown" className="text-blue-500">Markdown-Editor</Link>
        </nav>

        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/markdown" element={<MarkdownEditor />} />

                {/* <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                        <Home />
                        </PrivateRoute>
                    }
                /> */}

                {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
        </Router>
    </div>
  );
};

export default AppRouter;