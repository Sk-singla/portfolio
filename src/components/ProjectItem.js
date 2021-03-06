import React, {useState} from 'react'
import { Link } from 'react-router-dom';

export const ProjectItem = (props) => {

    const { project } = props;
    const maxChars = 100;
    const [isVisible,setIsVisible] = useState(false);

    function getValidHttpUrl(string) {
        let url;
        try {
            url = new URL(string);
        } catch (_) {
            return `https://source.unsplash.com/416x270/?project&sig=${project._id}`;
        }
        return url.protocol === "http:" || url.protocol === "https:" ? string: `https://source.unsplash.com/416x270/?project&sig=${project._id}`;
    }
    return (
        <article className={!isVisible ? "visibility_gone" : ""}>   
            <Link to={`/projectDetail/${project._id}`}>
                <img src={getValidHttpUrl(project.logo)} alt="" height="65%" className="image"
                     onLoad={()=>{setIsVisible(true)}}
                     onError={(e)=>{
                         e.target.onerror = null;
                         e.target.src=`https://source.unsplash.com/416x270/?project&sig=${project._id}`
                     }}
                />
                <h3 className="major">{project.name}</h3>
                <p>{project.description.length > maxChars ? project.description.substring(0,maxChars) + "..." : project.description}</p>
                {/* <a href="/" className="special">Learn more</a> */}
            </Link>
        </article>
    )
}
