import React from 'react'
import AndroidImageItem from "./AndroidImageItem";
import WebImageItem from "./WebImageItem";

export const ProjectImageItem = (props) => {
    const { photo, setVisibility, isActive} = props;
    // console.log(photo);
    return (
        <div className={`carousel-item  ${isActive ? "active" : ""}`}>
            {
                photo.isWeb !== true
                    ? <AndroidImageItem imageUrl={photo.photoUrl} onLoad={() => {
                    setVisibility(true)
                }}/>
                    : <WebImageItem imageUrl={photo.photoUrl} onLoad={()=> {
                        setVisibility(true)
                    }}/>
            }
            <h3 className="text-center my-3">{photo.description}</h3>
        </div>
    )
}
