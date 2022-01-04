import React from 'react'
import AndroidImageItem from "./AndroidImageItem";

export const ProjectImageItem = (props) => {
    const { photo, setVisibility, isActive} = props;
    // console.log(photo);
    return (
        <div className={`carousel-item  ${isActive ? "active" : ""}`}>
            <AndroidImageItem imageUrl={photo.photoUrl} onLoad={()=>{setVisibility(true)}} />
            <h3 className="text-center my-3">{photo.description}</h3>
        </div>
    )
}
