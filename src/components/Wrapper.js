import React, {useContext, useEffect, useState} from 'react'
import { ProjectItem } from './ProjectItem'
import ProjectContext from '../context/projects/ProjectContext';

export const Wrapper = () => {
    const context = useContext(ProjectContext);
    const [filters,setFilters] = useState([]);
    const [allFilters,setAllFilters] = useState(new Set());
    const {projects} = context;
    const [filteredProjects,setFilteredProjects] = useState(projects);


    const handleClick = (event)=>{
        if(filters.find((filter)=>event.target.textContent === filter)){
            setFilters(filters.filter((filter)=> filter !== event.target.textContent));
        } else {
            setFilters([...filters,event.target.textContent]);
        }
    }

    useEffect(()=>{
        const temp = new Set();
        for(let i=0;i<projects.length;i++) {
            if(!projects[i].technologies){
                continue;
            }
            for(const tech of projects[i].technologies){
                temp.add(tech);
            }
        }
        setAllFilters(temp);
    },[projects])

    useEffect(()=>{
        const temp = [];

        if(filters.length <=0){
            setFilteredProjects(projects);
            return;
        }
        for(let i=0;i<projects.length;i++){
            const project = projects[i];

            for(let filter of filters){
                if(project.technologies && project.technologies.find((tech)=>{return tech === filter})){
                    temp.push(project);
                    break
                }
            }
            // if(numberOfChipsNotSelected >= Object.keys(filters).length){
            //     setFilteredProjects(projects);
            //     return;
            // }

        }
        setFilteredProjects(temp);
    },[filters, projects])
    return (
        <div>
            <section className="wrapper">

                <section id="four" className="wrapper alt style1">
                    <div className="inner">
                        <h2 className="major">My Projects</h2>
                        {
                            Array.from(allFilters).map((tech) => {
                                return <span className={`badge badge-dark ${filters.find((filter)=>filter === tech)? "selected" : ""}`} onClick={handleClick}>{tech}</span>
                            })
                        }
                        <section className="features">
                            {
                                filteredProjects.map((project)=>{
                                    return <ProjectItem key={project._id} project = {project}/>
                                })
                            }
                        </section>
                        {/* <ul className="actions">
                            <li><a href="/" className="button">Browse All</a></li>
                        </ul> */}
                    </div>
                </section>
            </section>
        </div>
    )
}
