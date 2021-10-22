import React from 'react'
import { Link } from 'react-router-dom';

export const ProjectItem = (props) => {

    const { project } = props;
    return (
        <article>
            <Link to={`/projectDetail/${project._id}`}>
                {project.logo ? <img src={project.logo} alt="" className="image" /> : <div />}

                <h3 className="major">{project.name}</h3>
                <p>{project.description}</p>
                {/* <a href="/" className="special">Learn more</a> */}
            </Link>
        </article>
    )
}
