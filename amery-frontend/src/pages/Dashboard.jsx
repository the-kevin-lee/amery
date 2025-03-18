import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import taskAPI from "../api/tasks";
import "./Dashboard.css";

const Dashboard = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    //retrieve token
    // token to then be passed down to API module functionalities below
    const token = localStorage.getItem("token");



    useEffect(() => {
        // redirect if not authenticated
        if (!token) {
            navigate("/");
        }
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData) {
            setUser(userData); //set user from localStorage
        } else {
            console.error("Unable to retrieve user data, check dashboard.jsx");
        }

        const retrieveTasks = async () => {
            try {
                const response = await taskAPI.getTasks(token);
                console.log("We retrieved tasks and this is what those tasks look like thru response.data:", response.data);
                setTasks(response.data) // retrieving tasks from response.data obj
            } catch (error) {
                console.error("Error retrieving tasks:", error);
            }
        }

        retrieveTasks();

    }, [navigate, token]);




    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    }

    const handleUpdateTask = async (id, message, completed) => {
        try {
            const response = await taskAPI.updateTask(token, id, message, !completed);
            setTasks(tasks.map(task => task.id === id ? response.data : task))
        } catch (error) {
            console.error("Error updating task:", error)
        }
    };

    const handleCreateTask = async () => {
        const trimmedTask = newTask.trim();
        if (trimmedTask.length < 3) {
            alert("Task must be at least 3 characters");
            return;
        }

        try {
            const response = await taskAPI.createTask(token, trimmedTask);
            setTasks([...tasks, response.data]);
            setNewTask("");
        } catch (error) {
            console.error("Error creating task:", error);
        
        }

    }

    const handleDeleteTask = async  (id) => {
        try {
            await taskAPI.deleteTask(token, id);
            setTasks(tasks.filter(task => task.id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
        } 
    }
 
    return (
        <>
        <h1>
            Welcome, {user?.username + "!" || "User!"}
        </h1>
        <h3>{user?.email || "No email"}</h3>
        <h2><Link to="/chat">Chat Here</Link></h2>
        <h2>Your tasks</h2>
        <input className="task-box"
        onChange={(e) => setNewTask(e.target.value)}
        value={newTask}
        placeholder="Please create a new task"
        />
        <br />
        <button onClick={handleCreateTask}>Create</button>
        <ul>
            {tasks.map(task => (
                <li key={task.id} style={{color: "white", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "5px", fontSize: "1.2em"}}>
                    <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                        <input 
                        type="checkbox" 
                        checked={task.completed} 
                        onChange={() => handleUpdateTask(task.id, task.message, task.completed)}
                        />
                        <span style={{textDecoration: task.completed ? "line-through" : "none"}}>
                        {task.message}
                        </span>
                    </div>
                    <button style={{marginTop: "5px"}} onClick={() => handleDeleteTask(task.id)}>Delete</button>
                </li>
            ))}

            </ul>
            
         


        <button onClick={handleLogout}>Logout</button>
        </>
    )
};

export default Dashboard;