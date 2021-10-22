import React, {useContext} from 'react'
import { ProjectItem } from './ProjectItem'
import ProjectContext from '../context/projects/ProjectContext';

export const Wrapper = () => {
    const context = useContext(ProjectContext);
    const {projects} = context;
    console.log(projects);

    return (
        <div>
            <section className="wrapper">

                <section id="four" className="wrapper alt style1">
                    <div className="inner">
                        <h2 className="major">My Projects</h2>

                        <section className="features">
                            {
                                context.projects.map((project)=>{
                                    console.log(project);
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
