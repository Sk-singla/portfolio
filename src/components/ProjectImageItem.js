import React from 'react'

export const ProjectImageItem = (props) => {
    const { photo } = props;
    // console.log(photo);
    return (
        <div className={`carousel-item  ${props.isActive ? "active" : ""}`}>
            <img src={photo.photoUrl} alt="" className="d-block w-100" />
            <h3 className="text-center my-3">{photo.description}</h3>
        </div>
    )
}
