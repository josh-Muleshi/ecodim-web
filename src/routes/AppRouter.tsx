import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from '../pages/Home';
import Login from '../pages/Login';
import { MarkdownEditor } from "../pages/MarkdownEditor";
import PrivateRoute from "./PrivateRouter";

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
                </Routes>
            </Router>
        </>
    );
};

export default AppRouter;