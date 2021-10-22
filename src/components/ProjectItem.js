import React from 'react'
import { Link } from 'react-router-dom';

export const ProjectItem = (props) => {

    const { project } = props;
    const maxChars = 100;
    return (
        <article>
            <Link to={`/projectDetail/${project._id}`}>
                {project.logo ? <img src={project.logo} alt="" className="image" /> : <div />}

                <h3 className="major">{project.name}</h3>
                <p>{project.description.length > maxChars ? project.description.substring(0,maxChars) + "..." : project.description}</p>
                {/* <a href="/" className="special">Learn more</a> */}
            </Link>
        </article>
    )
}
