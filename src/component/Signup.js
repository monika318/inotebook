import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", confirmPassword: "" })
    let history = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault(); //to prevent page from reloading 
        const { name, email, password, confirmPassword } = credentials
        const response = await fetch('http://localhost:5000/api/auth/createuser', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //Save the auth token and redirect
            localStorage.setItem('token', json.authtoken)
            history("/home")
        }
        else {
            alert("Invalid Credentials")
        }
    };
    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value }) //name=value
    }

    return (
        <div style={{ marginTop: "20px" }}>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlhtmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" onChange={onChange} name="name" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlhtmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" onChange={onChange} name="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} name="password" id="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" onChange={onChange} name="confirmPassword" id="confirmPassword" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
