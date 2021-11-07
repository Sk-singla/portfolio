import React, {useContext, useEffect, useState} from 'react'
import { ProjectItem } from './ProjectItem'
import ProjectContext from '../context/projects/ProjectContext';
import Loading from "./Loading";

export const Wrapper = () => {
    const context = useContext(ProjectContext);
    const [filters,setFilters] = useState([]);
    const [allFilters,setAllFilters] = useState(new Set());
    const {projects,isLoading} = context;
    const [filteredProjects,setFilteredProjects] = useState(projects);

    const handleCategoryClick = (event)=>{
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
                        <div className="my-2">
                            {
                                Array.from(allFilters).map((tech,idx) => {
                                    return <span key={idx} className={`badge badge-dark ${filters.find((filter)=>filter === tech)? "selected" : ""}`} onClick={handleCategoryClick}>{tech}</span>
                                })
                            }
                        </div>

                        <section className="features">
                            {
                                isLoading && projects.size <=0  ? <Loading vertically_center={false}/>:
                                filteredProjects.sort((a,b)=>{
                                    return (a.endDate > b.endDate) ? -1 : ((b.endDate > a.endDate) ? 1 : 0)
                                }).map((project)=>{
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
