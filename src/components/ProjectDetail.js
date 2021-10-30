import React, {useContext, useState} from 'react'
import ProjectContext from '../context/projects/ProjectContext';
import { ProjectImageItem } from './ProjectImageItem';
import {Link, useHistory, useParams} from "react-router-dom";
import edit_icon from "../images/icons-pencil.png"


export const ProjectDetail = () => {
    const {id} = useParams()
    const context = useContext(ProjectContext);
    const { getProjectById } = context;
    const currentProject = getProjectById(id)

    const [isVisible,setVisibility] = useState(false)

    const history = useHistory()

    if(!currentProject){
        history.push("/")
        return (<div/>);
    }

    const deleteProject = async ()=>{
        const response = await fetch(
            `http://localhost:3300/api/projects/deleteProject/${currentProject._id}`,
            {
                method: 'DELETE',
                headers:{
                    "Authorization": localStorage.getItem("token")
                }
            }
        )

        const result = await response.json();
        if(response.ok && result.success){
            history.push("/");
        } else {
            console.log(result.error);
        }

    }
    return (
        <div className = "mx-3" style={{marginTop:"90px"}}>
            <div className="container my-2" id="project_detail_text">
                <h1 className="my-1" style={{marginBottom:"20px", fontSize:"30px"}}>
                    <a href={currentProject.productionLink} target="_blank" rel="noreferrer">
                        {currentProject.name}
                    </a>



                    {currentProject.githubLink ?
                        <a href={currentProject.githubLink} target="_blank" rel="noreferrer"><i className="fab fa-github" style={{color:"black", marginLeft:"10px",fontSize:"24px"}}/></a>
                        : <div/>}

                    {/* IF ADMIN LOGGED IN THEN SHOW ICON TO EDIT PROJECT AND DELETE PROJECT*/}
                    {localStorage.getItem("isAdmin") ?
                        <Link to = {`/update/${id}`}> <i className="fa fa-edit" style={{color:"black",fontSize:"24px"}}/> </Link>
                        : <div/>}

                    {localStorage.getItem("isAdmin") ?
                        <i className="fa fa-trash" onClick={deleteProject} style={{color:"black",fontSize:"24px"}}/>
                        : <div/>}

                </h1>

                {
                    currentProject.technologies.map((tech,idx) => {
                        return <span key={idx} className="badge badge-dark my-2">{tech}</span>
                    })
                }
                <p className="my-1"> {currentProject.description}</p>

            </div>


            <div className={`my-2 ${!isVisible ? "visibility_gone" : ""}`}>
                <div id="project_images" className="carousel slide" data-bs-ride="carousel">

                    <div className="carousel-inner">
                        {
                            currentProject.photos.map((photo, idx)=>{
                                return <ProjectImageItem
                                    key = {photo._id}
                                    photo={photo}
                                    isActive = {idx === 0}
                                    setVisibility={setVisibility}
                                />
                            })
                        }
                    </div>


                    <button className="carousel-control-prev vertical-center" type="button" data-bs-target="#project_images" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon"/>
                    </button>
                    <button className="carousel-control-next vertical-center" type="button" data-bs-target="#project_images" data-bs-slide="next">
                        <span className="carousel-control-next-icon"/>
                    </button>
                </div>

            </div>



        </div>
    )
}
