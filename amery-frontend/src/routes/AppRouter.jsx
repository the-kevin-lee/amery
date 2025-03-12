import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


// pages imported
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../api/ProtectedRoute";
import ChatPage from "./ChatPage";

const AppRouter = () => {
    

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                {/* vv protected routes below */}
                <Route element={<ProtectedRoute />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="chat" element={<ChatPage/>} />
                </Route>
            </Routes>
        </Router>
    )
};

export default AppRouter;