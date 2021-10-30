import React from 'react'

export const ProjectImageItem = (props) => {
    const { photo, setVisibility, isActive} = props;
    // console.log(photo);
    return (
        <div className={`carousel-item  ${isActive ? "active" : ""}`}>
            <img src={photo.photoUrl} alt="" className="d-block w-100" onLoad={()=>{setVisibility(true)}} />
            <h3 className="text-center my-3">{photo.description}</h3>
        </div>
    )
}
