import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from '../pages/Home';
import { MarkdownEditor } from "../pages/MarkdownEditor";
//import PrivateRoute from "./PrivateRouter";

const AppRouter = () => {
  return (
    <div className="p-4 text-center">

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