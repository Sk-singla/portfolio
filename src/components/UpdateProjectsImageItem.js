import React from 'react';

function UpdateProjectsImageItem(props) {
    const {idx,url,description,updateDesc,removeImage,index,updateIndex,isWeb,updateWeb} = props;

    return (
        <div style={{display:"inline-block"}} className="col-xl-4 col-lg-6 col-sm-12 d-inline-flex align-items-center my-2">
            <img src={url} width="70px" style={{display:"inline-block"}} alt=""/>
            <div className="form-group mx-3"  style={{display:"inline-block"}}>
                <input type="text" className="form-control" placeholder="Image Description..." name={`img_description${idx}`}
                       value={description} onChange={(event)=>{updateDesc(event.target.value,idx)}}
                />
            </div>
            <div className="form-group mx-3"  style={{display:"inline-block"}}>
                <input type="text" className="form-control" placeholder="Image Index..." name={`img_idx${idx}`}
                       value={index} onChange={(event)=>{updateIndex(event.target.value,idx)}}
                />
            </div>
            <i className="material-icons" style={{color:'#aeb0af', cursor:"pointer"}} onClick={()=>{removeImage(idx)}}>close</i>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id={`iswebsite${idx}`}
                       name={`iswebsite${idx}`} onChange={()=>{
                           updateWeb(idx)
                }} checked={isWeb}/>
                    <label className="form-check-label" htmlFor={`iswebsite${idx}`}>
                        Web
                    </label>
            </div>
        </div>
    );
}

export default UpdateProjectsImageItem;