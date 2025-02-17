import { Link } from "react-router-dom";


const Signup = () => {

return (
    <>
    <div>
        <h1>Sign Up Here</h1>
        <form>
            <input type="text" placeholder="Username" required />
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">Sign Up</button>

        </form>
        <p>Already have an account? <Link to="/">Login Here</Link></p>
    </div>
    </>
)

};


export default Signup;