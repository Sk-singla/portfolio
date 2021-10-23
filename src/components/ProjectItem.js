import React from 'react'
import { Link } from 'react-router-dom';

export const ProjectItem = (props) => {

    const { project } = props;
    const maxChars = 100;
    function isValidHttpUrl(string) {
        let url;
        try {
            url = new URL(string);
        } catch (_) {
            return false;
        }
        return url.protocol === "http:" || url.protocol === "https:";
    }
    return (
        <article>
            <Link to={`/projectDetail/${project._id}`}>
                {project.logo && isValidHttpUrl(project.logo) ? <img src={project.logo} alt="" height="270px" className="image" /> :
                <img className="image" height="270px" key={project._id} src={`https://source.unsplash.com/416x270/?project&sig=${Math.random()}`} alt=""/> }

                <h3 className="major">{project.name}</h3>
                <p>{project.description.length > maxChars ? project.description.substring(0,maxChars) + "..." : project.description}</p>
                {/* <a href="/" className="special">Learn more</a> */}
            </Link>
        </article>
    )
}
