import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// pages imported
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="signup" element={<Signup/>}/>
                <Route path="dashboard  " element={<Dashboard/>} />
            </Routes>
        </Router>
    )
};

export default AppRouter;