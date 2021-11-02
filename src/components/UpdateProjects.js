import React, {useContext, useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import ProjectContext from "../context/projects/ProjectContext";
import UpdateProjectsImageItem from "./UpdateProjectsImageItem";

function UpdateProjects(props) {


    const history = useHistory();
    useEffect(()=>{
        if(!localStorage.getItem("token")){
             history.push("/login");
        }
    },[history])

    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [logo,setLogo] = useState(null);
    const [projectPics,setProjectPics] = useState([]);
    const [projectPicsDescriptions,setProjectPicsDescriptions] = useState([]);
    const [technologies,setTechnologies] = useState([]);
    const [githubLink,setGithubLink] = useState("");
    const [productionLink,setProductionLink] = useState("");

    const [oldPics,setOldPics] = useState([]);
    const [oldLogo,setOldLogo] = useState(null);


    const {id} = useParams()
    const context = useContext(ProjectContext);
    const { getProjectById } = context;
    const currentProject = getProjectById(id)
    useEffect(()=>{
        if(currentProject!=null){
            setName(currentProject.name)
            setDescription(currentProject.description)
            setTechnologies(currentProject.technologies);
            setOldPics(currentProject.photos);
            setOldLogo(currentProject.logo);
            setGithubLink(currentProject.githubLink);
            setProductionLink(currentProject.productionLink);
        }
    },[currentProject])




    const handleProjectPicsChange = (event) => {
        for (let i = 0; i < event.target.files.length; i++) {
            setProjectPics(pics => [...pics,event.target.files[i]])

            projectPicsDescriptions.push("");
            setProjectPicsDescriptions([...projectPicsDescriptions]);
            console.log(event.target.files[i])
        }
    }
    const removeImage = (idx)=>{
        setProjectPics(projectPics.filter((p,i)=> i!==idx))
        setProjectPicsDescriptions(projectPicsDescriptions.filter((p,i)=> i!==idx))
    }
    const handleProjectDescriptionChange = (text,idx)=>{
        projectPicsDescriptions[idx] = text;
        setProjectPicsDescriptions([...projectPicsDescriptions]);
    }
    const handleOldProjectDescriptionChange = (text,idx)=>{
        oldPics[idx].description = text
        setOldPics([...oldPics])
    }
    const removeOldPic = (idx)=>{
        setOldPics(oldPics.filter((p,i)=> i!==idx))
    }

    const removeLogo = ()=>{
        setLogo(null);
        setOldLogo(null);
    }
    const restoreLogo = ()=>{
        if(currentProject)
        {
            setLogo(null);
            setOldLogo(currentProject.logo);
        }
    }


    const handleLogo = (event) => {
        setLogo(event.target.files[0]);
    }
    const handleName = (event) => {
        setName(event.target.value);
    }
    const handleDescription = (event) => {
        setDescription(event.target.value);
    }
    const handleTechnologies = (event) => {
        setTechnologies(event.target.value.split(", "));
    }

    const handleGithubLink = (event) => {
        setGithubLink(event.target.value);
    }
    const handleProductionLink = (event) => {
        setProductionLink(event.target.value);
    }

    const updateProject = async ()=>{
        const formData = new FormData()

        formData.append('name',name)
        formData.append('description',description)
        formData.append('githubLink',githubLink.trim())
        formData.append('productionLink',productionLink.trim())

        formData.append('logo',logo ? logo : oldLogo)


        for (let i = 0; i < projectPics.length; i++){
            formData.append('new_photos',projectPics[i]);
            formData.append('new_photos',projectPicsDescriptions[i]);
        }
        for(const tech of technologies){
            formData.append('technologies',tech);
        }
        for (const oldPic of oldPics) {
            formData.append('photos',JSON.stringify({photoUrl:oldPic.photoUrl,description:oldPic.description}));
        }

        const response = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/api/projects/updateProject/${currentProject._id}`,
            {
                method: 'POST',
                headers:{
                    "Authorization": localStorage.getItem("token")
                },
                body: formData
            }
        )
        const result = await response.json();
        console.log(result);
        if(result.success){
            clearAllFields();
            history.push("/");
        }

    }


    const addNewProject = async ()=>{
        const formData = new FormData()

        formData.append('name',name)
        formData.append('description',description)
        formData.append('logo',logo)

        formData.append('githubLink',githubLink.trim())
        formData.append('productionLink',productionLink.trim())

        for (let i = 0; i < projectPics.length; i++){
            formData.append('photos',projectPics[i]);
            formData.append('photos',projectPicsDescriptions[i]);
        }
        for(const tech of technologies){
            formData.append('technologies',tech);
        }


        const response = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/api/projects/addProject`,
            {
                method: 'POST',
                headers:{
                    "Authorization": localStorage.getItem("token")
                },
                body: formData
            }
        )
        const result = await response.json();
        console.log(result);
        if(result.success){
            clearAllFields();
            history.push("/");
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            if(currentProject){
                await updateProject()
            } else {
                await addNewProject()
            }
        } catch (e){
            console.log(e.message);
        }
    }


    const clearAllFields = ()=>{
        setName("");
        setDescription("");
        setTechnologies([]);
        setLogo(null);
        setProjectPics([]);
    }



    return (
        <div style={{marginTop:"90px"}} className="container">
            <form onSubmit={handleSubmit}>
                <div className="form-group my-3">
                    <label htmlFor="name">Project Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={handleName} value={name}
                           placeholder="Write Your Project Name here..."/>
                </div>

                <div className="form-group my-3">
                    <label htmlFor="project_description">Project Description</label>
                    <textarea className="form-control trans_white" id="project_description" name="description" value={description} onChange={handleDescription}
                              rows="3" placeholder="Enter Project description here..."/>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="technologies">Technologies</label>
                    <input type="text" className="form-control" id="technologies" name="technologies" value={technologies.join(", ")} onChange={handleTechnologies}
                              placeholder="Enter Technologies Used (Coma and Space separated)"/>
                </div>

                <div className="form-group my-3">
                    <label htmlFor="github_link">Github Link</label>
                    <input type="text" className="form-control trans_white" id="github_link" name="github_link" value={githubLink} onChange={handleGithubLink}
                           placeholder="Enter Project Github Link here..."/>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="production_link">Production Link</label>
                    <input type="text" className="form-control" id="production_link" name="production_link" value={productionLink} onChange={handleProductionLink}
                              placeholder="Enter Technologies Used (Coma and Space separated)"/>
                </div>

                <div className="form-group my-3 d-flex align-items-center">
                    <label className="file_label" htmlFor="logo"  style={{display:"inline-block"}}>Logo</label>
                    <input type="file" className="form-control-file" id="logo" accept="image/*" onChange={handleLogo}/>
                    <img src={logo ? URL.createObjectURL(logo) : currentProject ? currentProject.logo ? oldLogo : "" : "" } width="70px" style={{display:"inline-block"}} className="mx-4" alt=""/>
                    {
                        logo || oldLogo ? <i className="material-icons" style={{color:'#aeb0af', cursor:"pointer"}} onClick={removeLogo}>close</i>
                            : <div/>
                    }
                    {
                        currentProject ?
                            <i className="material-icons mx-3" style={{color:'#aeb0af', cursor:"pointer"}} onClick={restoreLogo}>refresh</i>
                            : <div/>
                    }

                </div>



                <div className="row inline_box_item">

                    {
                        oldPics.map((pic,idx) => {
                            return <UpdateProjectsImageItem
                                    key={`old_pic${idx}`}
                                    idx={idx}
                                    url={pic.photoUrl}
                                    description={pic.description}
                                    updateDesc={handleOldProjectDescriptionChange}
                                    removeImage={removeOldPic}
                                />
                        })
                    }
                    {
                        projectPics.map((pic,idx) => {
                            return <UpdateProjectsImageItem
                                    key={`pic${idx}`}
                                    idx={idx}
                                    url={URL.createObjectURL(pic)}
                                    description={projectPicsDescriptions[idx]}
                                    updateDesc={handleProjectDescriptionChange}
                                    removeImage={removeImage}
                                />
                        })
                    }


                    <div className={`form-group ${projectPics.length > 0 || oldPics.length > 0 ? "col-4 d-inline-flex align-items-center my-2" : "my-3"}`}>
                        <label className="file_label" htmlFor="project_pics" style={{display:"inline-block"}}>
                            {projectPics.length <= 0 && oldPics.length<=0 ? "Add Project Pictures" : <i className="material-icons">add</i>}
                        </label>
                        <input type="file" className="form-control-file" id="project_pics" accept="image/*" multiple
                               onChange={handleProjectPicsChange}/>
                    </div>

                </div>

                <button type="submit" style={{display:"block"}} className="my-3">Submit</button>

            </form>
        </div>
    );
}

export default UpdateProjects;