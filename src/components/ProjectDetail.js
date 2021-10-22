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
        <div className = "row project_detail mx-3" style={{marginTop:"90px"}}>
            <div className="col-sm" id="project_detail_text">
                <h1 className="my-1" style={{marginBottom:"20px", fontSize:"30px"}}>{currentProject.name}</h1>
                <p className="text-justify">{currentProject.description}</p>
            </div>


            <div className="col-sm">
                <div id="project_images" className="carousel slide" data-bs-ride="carousel">

                    <div className="carousel-inner">
                        {
                            currentProject.photos.map((photo, idx)=>{
                                return <ProjectImageItem photo={photo} isActive = {idx === 0}/>
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
