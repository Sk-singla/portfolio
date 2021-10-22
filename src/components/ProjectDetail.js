import React, {useContext, useEffect} from 'react'
import ProjectContext from '../context/projects/ProjectContext';
import { ProjectImageItem } from './ProjectImageItem';
import {Redirect, useParams} from "react-router-dom";


export const ProjectDetail = () => {
    const {id} = useParams()
    const context = useContext(ProjectContext);
    const { getProjectById } = context;
    const currentProject = getProjectById(id)

    return (
        <div>
            <h1 className="container my-1" style={{marginBottom:"20px", fontSize:"30px"}}>{currentProject.name}</h1>
            <p className="container">{currentProject.description}</p>


            <div id="project_images" className="carousel slide" data-bs-ride="carousel">

                <div className="carousel-inner">
                    {
                        currentProject.photos.map((photo, idx)=>{
                            return <ProjectImageItem photo={photo} isActive = {idx===0 ? true : false}/>
                        })
                    }
                </div>


                <button className="carousel-control-prev vertical-center" type="button" data-bs-target="#project_images" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon"></span>
                </button>
                <button className="carousel-control-next vertical-center" type="button" data-bs-target="#project_images" data-bs-slide="next">
                    <span className="carousel-control-next-icon"></span>
                </button>
            </div>
















        </div>
    )
}
