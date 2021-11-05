import React, {useContext, useState} from 'react'
import ProjectContext from '../context/projects/ProjectContext';
import { ProjectImageItem } from './ProjectImageItem';
import {Link, useHistory, useParams} from "react-router-dom";

export const ProjectDetail = () => {
    const {id} = useParams()
    const context = useContext(ProjectContext);
    const { getProjectById, isLoading } = context;
    const currentProject = getProjectById(id)

    const [isVisible,setVisibility] = useState(false)

    const history = useHistory()

    if(!currentProject && !isLoading){
        history.push("/")
        return (<div/>);
    }

    const deleteProject = async ()=>{
        const response = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/api/projects/deleteProject/${currentProject._id}`,
            {
                method: 'DELETE',
                headers:{
                    "Authorization": localStorage.getItem("token")
                }
            }
        )

        const result = await response.json();
        console.log(result)
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
                        {currentProject.productionLink ?
                            <img src="/link_icon_arrow.png" className="mx-2" alt=""  width="24px"/>
                            : <div/>}
                    </a>

                    {currentProject.githubLink ?
                        <a href={currentProject.githubLink} target="_blank" rel="noreferrer"><img src="/github.png" className="mx-2" alt=""  width="24px"/></a>
                        : <div/>}

                    {/* IF ADMIN LOGGED IN THEN SHOW ICON TO EDIT PROJECT AND DELETE PROJECT*/}
                    {localStorage.getItem("isAdmin") === "true" ?
                        <Link to = {`/update/${id}`}><img src="/edit_icon.png" className="mx-2" alt=""  width="24px"/> </Link>
                        : <div/>}

                    {localStorage.getItem("isAdmin") === "true" ?
                        <img src="/delete.png" alt=""  width="20px" onClick={deleteProject} style={{cursor:"pointer"}}/>
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
                            currentProject.photos.sort((a,b)=>{
                                return (a.index > b.index) ? 1 : ((b.index > a.index) ? -1 : 0)
                            }).map((photo, idx)=>{
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
