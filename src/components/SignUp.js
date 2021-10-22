import React, {useState} from 'react';

function SignUp(props) {

    const [newUserRequest,setNewUserRequest] = useState({name:"",email:"",password:""});


    const handleChange = (event) => {
        setNewUserRequest({...newUserRequest, [event.target.name]: event.target.value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const response = await fetch(
                "http://localhost:3300/api/auth/createuser",
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
                console.log(localStorage.getItem("token"))

                // NAVIGATE SOMEWHERE
            } else {
                console.log(result.error);
                // SHOW ERROR MESSAGE
            }
        }catch (e){
            console.log(e.message)
            // SHOW ERROR MESSAGE
        }
    }

    return (
        <div className="container" style={{marginTop:"90px"}}>
            <form onSubmit={handleSubmit}>
                <div className="form-group my-3">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" aria-describedby="name" name="name" value={newUserRequest.name}
                           onChange={handleChange} placeholder="Enter name"/>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" value={newUserRequest.email}
                           onChange={handleChange} placeholder="Enter email"/>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" onChange={handleChange} name="password" value={newUserRequest.password}/>
                </div>
                <button type="submit" className="my-3" style={{backgroundColor:"#353849"}}>Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;