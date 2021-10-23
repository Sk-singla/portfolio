import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";

function AddProject(props) {

    const history = useHistory();
    useEffect(()=>{
        if(!localStorage.getItem("token")){
             history.push("/login");
        }
    },[history])

    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [logo,setLogo] = useState(null);
    const [projectPics,setProjectPics] = useState([]);
    const [technologies,setTechnologies] = useState([]);

    const handleProjectPicsChange = (event) => {
        setProjectPics([])
        for (let i = 0; i < event.target.files.length; i++) {
            setProjectPics(pics => [...pics,event.target.files[i]])
            console.log(event.target.files[i])
        }
    }

    const handleLogo = (event) => {
        setLogo(event.target.files[0]);
    }
    const handleName = (event) => {
        setName(event.target.value);
    }
    const handleDescription = (event) => {
        setDescription(event.target.value);
    }
    const handleTechnologies = (event) => {
        setTechnologies(event.target.value.split(", "));
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(
            "http://localhost:3300/api/projects/addProject",
            {
                method: 'POST',
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": localStorage.getItem("token")
                },
                body: JSON.stringify({
                    "name":name,
                    "description":description,
                    "photos": projectPics.map((pic,idx)=>{
                        return {"photoUrl":pic.name,"description":document.getElementById(`img_description${idx}`).value};
                    }),
                    "logo":logo?logo.name:null,
                    "technologies": technologies
                })
            }
        )
        const result = await response.json();
        console.log(result);
    }


    return (
        <div style={{marginTop:"90px"}} className="container">
            <form onSubmit={handleSubmit}>
                <div className="form-group my-3">
                    <label htmlFor="name">Project Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={handleName} value={name}
                           placeholder="Write Your Project Name here..."/>
                </div>

                <div className="form-group my-3">
                    <label htmlFor="project_description">Project Description</label>
                    <textarea className="form-control trans_white" id="project_description" name="description" value={description} onChange={handleDescription}
                              rows="3" placeholder="Enter Project description here..."/>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="technologies">Project Description</label>
                    <input type="text" className="form-control" id="technologies" name="technologies" value={technologies.join(", ")} onChange={handleTechnologies}
                              placeholder="Enter Technologies Used (Coma and Space separated)"/>
                </div>

                <div className="form-group my-3" style={{display:"inline-block"}}>
                    <label htmlFor="logo">Logo</label>
                    <input type="file" className="form-control-file" id="logo" onChange={handleLogo}/>
                </div>
                <div className="form-group my-3" style={{display:"inline-block"}}>
                    <label htmlFor="project_pics">Project Pictures</label>
                    <input type="file" className="form-control-file" id="project_pics" multiple
                           onChange={handleProjectPicsChange}/>
                </div>

                <br/>

                {
                    projectPics.map((pic,idx) => {
                        return <div key={`pic${idx}`} style={{display:"inline-block"}} className="d-inline-flex align-items-center my-2">
                            <img src={URL.createObjectURL(pic)} width="70px" style={{display:"inline-block"}} alt=""/>
                                <div className="form-group mx-3"  style={{display:"inline-block"}}>
                                    <input type="text" className="form-control" id={`img_description${idx}`}
                                           placeholder="Image Description..." name={`pic${idx}`}/>
                                </div>
                        </div>
                    })
                }

                <button type="submit" style={{display:"block"}} className="my-3">Submit</button>

            </form>
        </div>
    );
}

export default AddProject;