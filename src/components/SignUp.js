import React, {useContext, useState} from 'react';
import {useHistory} from "react-router-dom";
import ProjectContext from "../context/projects/ProjectContext";

function SignUp(props) {

    const projectContext = useContext(ProjectContext)
    const {newAlert} = projectContext;

    const [newUserRequest,setNewUserRequest] = useState({name:"",email:"",password:""});
    const history = useHistory();
    const [passwordVisible,setPasswordVisibility] = useState(false);


    const handleChange = (event) => {
        setNewUserRequest({...newUserRequest, [event.target.name]: event.target.value});
    }


    const clearAllFields = () => {
        setNewUserRequest({name:"",email:"",password:""});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const response = await fetch(
                `${process.env.REACT_APP_SERVER_URL}/api/auth/createuser`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify(newUserRequest)
                }
            )

            const result = await response.json();
            if(result.success){
                localStorage.setItem("token",result.token);
                localStorage.setItem("email",newUserRequest.email)
                clearAllFields()
                // console.log(localStorage.getItem("token"))

                newAlert(false,"Sign up Successfully!")

                // NAVIGATE SOMEWHERE
                history.push("/");
            } else {
                // console.log(result.error);
                newAlert(true,result.error ? result.error : "Some Problem Occurred!");
            }
        }catch (e){
            // console.log(e.message)
            newAlert(true,e.message ? e.message : "Some Problem Occurred!");
        }
    }

    return (
        <div className="container" style={{marginTop:"90px"}}>
            <form onSubmit={handleSubmit}>
                <div className="form-group my-3">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" aria-describedby="name" name="name" value={newUserRequest.name}
                           onChange={handleChange} placeholder="Enter name" required/>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" value={newUserRequest.email}
                           onChange={handleChange} placeholder="Enter email" required/>
                </div>

                <div className="from-group my-3">
                    <label htmlFor="password">Password</label>
                    <div className="input-group mb-3">
                        <input type={ passwordVisible ? "text" : "password"} className="form-control" id="password"
                               placeholder="Password" onChange={handleChange}
                               name="password" value={newUserRequest.password}
                               aria-label="Password" aria-describedby="Password" required/>
                        <span className="input-group-text cursor_pointer" id="password_visibility"
                              onClick={()=>{
                                  setPasswordVisibility(!passwordVisible);
                              }}>
                            <i className={passwordVisible? "fa fa-eye-slash" : "fa fa-eye"} aria-hidden="true"/>
                        </span>
                    </div>
                </div>


                <button type="submit" className="my-3 px-3" style={{backgroundColor:"#353849"}}>Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;