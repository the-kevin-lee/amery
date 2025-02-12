import { Link } from "react-router-dom";

const Login = () => {
    return (
       <>
        <div>
            <h1>Login Here</h1>
            <form>
                <input type="email" placeholder="email" required />
                <input type="password" placeholder="password" required/>
                <button type="submit">Login</button>
            </form>
            <p>Dont' Have an account <Link to="/signup">Sign Up Here</Link> </p>
        </div>
       </>
        
    )
};

export default Login;