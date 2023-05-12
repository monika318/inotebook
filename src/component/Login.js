import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [credentials, setcredentials] = useState({ email: "", password: "" })
    let history = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault(); //to prevent page from reloading 
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //Save the auth token and redirect
            localStorage.setItem('token', json.authtoken)
            history("/home")
            props.showAlert("Logged In Successfully ", "success");
        }
        else {
            props.showAlert("Invalid Credentials", "danger");
        }
    };
    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value }) //name=value
    }
    return (
        <div className='container' style={{ marginTop: '20px' }}>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>

        // <section className="vh-100" style={{ marginTop: '50px' }}>
        //     <div className="container-fluid h-custom">
        //         <div className="row d-flex justify-content-center align-items-center h-100">
        //             <div className="col-md-9 col-lg-6 col-xl-5">
        //                 <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
        //                     className="img-fluid" alt="Sample image" />
        //             </div>
        //             <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        //                 <form >
        //                     <div className="form-outline mb-4">
        //                         <input type="email" id="form3Example3" className="form-control form-control-lg"
        //                             placeholder="Enter a valid email address" />
        //                         <label className="form-label" for="form3Example3">Email address</label>
        //                     </div>

        //                     <div className="form-outline mb-3">
        //                         <input type="password" id="form3Example4" className="form-control form-control-lg"
        //                             placeholder="Enter password" />
        //                         <label className="form-label" for="form3Example4">Password</label>
        //                     </div>

        //                     {/* <div className="d-flex justify-content-between align-items-center">
        //                         <div className="form-check mb-0">
        //                             <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
        //                             <label className="form-check-label" for="form2Example3">
        //                                 Remember me
        //                             </label>
        //                         </div>
        //                         <a href="#!" className="text-body">Forgot password?</a>
        //                     </div> */}

        //                     <div className="text-center text-lg-start mt-4 pt-2">
        //                         <button type="button" className="btn btn-primary btn-lg">Login</button>

        //                     </div>

        //                 </form>
        //             </div>
        //         </div>
        //     </div>

        // </section>

    )
}

export default Login
