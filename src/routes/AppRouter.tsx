import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from '../pages/Home';
import Login from '../pages/Login';
import MarkdownEditor from "../pages/MarkdownEditor";
import PrivateRoute from "./PrivateRouter";
import NotFound from "../pages/NotFound";

const AppRouter = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />

                    <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    }
                    />

                    <Route 
                    path="/dashboard/edit" 
                    element={
                        <PrivateRoute>
                            <MarkdownEditor />
                        </PrivateRoute>
                    }
                    />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </>
    );
};

export default AppRouter;