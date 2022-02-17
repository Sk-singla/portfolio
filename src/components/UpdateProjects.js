import React, {useContext, useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import ProjectContext from "../context/projects/ProjectContext";
import UpdateProjectsImageItem from "./UpdateProjectsImageItem";
import {storage} from "../firebase/FirebaseInit";
import {getDownloadURL, uploadBytes,ref, deleteObject,  } from "firebase/storage"
import Loading from "./Loading";

function UpdateProjects(props) {

    const [isLoading, setIsLoading] = useState(false);
    const [loadingText, setLoadingText] = useState(null);


    const history = useHistory();
    useEffect(()=>{
        if(localStorage.getItem("email")!==process.env.REACT_APP_ADMIN_MAIL){
             history.push("/login");
        }
    },[history])



    const {id} = useParams()
    const context = useContext(ProjectContext);
    const { getProjectById, newAlert } = context;
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

            if(currentProject.startDate)
            setStartDate(new Date(currentProject.startDate).toISOString().substr(0,10))

            if(currentProject.endDate)
            setEndDate(new Date(currentProject.endDate).toISOString().substr(0,10))
        }
    },[currentProject])




    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [logo,setLogo] = useState(null);
    const [projectPics,setProjectPics] = useState([]);
    const [projectPicsDescriptions,setProjectPicsDescriptions] = useState([]);
    const [projectPicsIndex,setProjectPicsIndex] = useState([]);
    const [projectPicsType,setProjectPicsType] = useState([]);
    const [technologies,setTechnologies] = useState([]);
    const [githubLink,setGithubLink] = useState("");
    const [productionLink,setProductionLink] = useState("");
    const [startDate,setStartDate] = useState((new Date()).toISOString().substr(0,10));
    const [endDate,setEndDate] = useState((new Date()).toISOString().substr(0,10));

    const [oldPics,setOldPics] = useState([]);
    const [oldLogo,setOldLogo] = useState(null);
    const [deletingFiles,setDeletingFiles] = useState([]);


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

    const handleProjectPicIndexChange = (text,idx)=>{
        projectPicsIndex[idx] = parseInt(text);
        setProjectPicsIndex([...projectPicsIndex]);
    }
    const handleProjectPicTypeChange = (idx)=>{
        projectPicsType[idx] = !projectPicsType[idx];
        setProjectPicsType([...projectPicsType]);
    }

    const handleOldProjectDescriptionChange = (text,idx)=>{
        oldPics[idx].description = text
        setOldPics([...oldPics])
    }

    const handleOldProjectPicIndexChange = (text,idx)=>{
        oldPics[idx].index = parseInt(text)
        setOldPics([...oldPics])
    }
    const handleOldProjectPicTypeChange = (idx)=>{
        oldPics[idx].isWeb = !oldPics[idx].isWeb
        setOldPics([...oldPics])
    }
    const removeOldPic = (idx)=>{
        setDeletingFiles([...deletingFiles,oldPics[idx].photoUrl]);
        setOldPics(oldPics.filter((p,i)=> i!==idx))
    }

    const removeLogo = ()=>{
        if(oldLogo != null){
            setDeletingFiles([...deletingFiles,oldLogo]);
        }
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

    const handleStartDate = (event)=>{
        setStartDate(event.target.value);
    }
    const handleEndDate = (event)=>{
        setEndDate(event.target.value);
    }

    const uploadFileAndGetDownloadUrl = async (file)=>{
        setLoadingText(`Uploading ${file.name}...`);
        const imageRef = ref(storage,`images/${Date.now() + "-" +  file.name}`);
        const result = await uploadBytes(imageRef,file);
        console.log(`${file.name} uploaded`)
        return await getDownloadURL(result.ref);
    }

    const deleteImage = async (imageUrl) => {
        const imageRef = ref(storage,imageUrl);
        setLoadingText(`Deleting ${imageRef.name}`);
        await deleteObject(imageRef);
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            setIsLoading(true);

            const photos = [];
            for (let i = 0; i < oldPics.length; i++) {
                photos.push(oldPics[i]);
            }
            for (let i = 0; i < projectPics.length; i++){
                photos.push(
                    {
                        "photoUrl":await uploadFileAndGetDownloadUrl(projectPics[i]),
                        "description":projectPicsDescriptions[i],
                        "index": projectPicsIndex[i],
                        "isWeb": projectPicsType[i]
                    }
                );
            }

            for(let i=0; i< deletingFiles.length; i++){
                await deleteImage(deletingFiles[i]);
            }

            const project = {
                "name":name,
                "description":description,
                "logo":logo ? await uploadFileAndGetDownloadUrl(logo) : oldLogo,
                "githubLink": githubLink.trim(),
                "productionLink": productionLink.trim(),
                "photos": photos,
                "technologies": technologies,
                "startDate":(new Date(startDate).valueOf()),
                "endDate":(new Date(endDate).valueOf()),
            }

            console.log(project);

            setLoadingText("Uploading Project...");
            const response = await fetch(
                `${process.env.REACT_APP_SERVER_URL}/api/projects/${currentProject ? "updateProject/"+id : "addProject"}`,
                {
                    method: 'POST',
                    headers:{
                        "Content-Type": "Application/Json",
                        "Authorization": localStorage.getItem("token")
                    },
                    body: JSON.stringify(project)
                }
            )
            setLoadingText("Done");

            const result = await response.json();
            console.log(result);
            setIsLoading(false);
            if(result.success){
                clearAllFields();
                newAlert(false,"Project Uploaded Successfully!");
                history.push("/");
            } else {
                newAlert(true, result.error ? result.error : "Some Problem Occurred!");
            }
        } catch (e){
            setIsLoading(false);
            console.log(e.message);
            newAlert(true, e.message ? e.message : "Some Problem Occurred!");
        }
    }


    const clearAllFields = ()=>{
        setName("");
        setDescription("");
        setTechnologies([]);
        setLogo(null);
        setProjectPics([]);
        setOldLogo(null);
        setOldPics([]);
        setProjectPicsDescriptions([])
        setProductionLink("")
        setGithubLink("")
    }



    return (
        <div style={{marginTop:"90px"}} className="container">

            {
                isLoading ?
                    <Loading vertically_center={true} isAbs={true} text={loadingText}/>
                    : <div/>
            }



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

                <div className="form-group my-3 me-3 date inline_box_item">
                    <label htmlFor="start_date">Start Date</label>
                    <input type="date" className="form-control" id="start_date" name="start_date"
                           placeholder="Start Date" aria-label="start_date"
                           aria-describedby="Start-Date" value={startDate} onChange={handleStartDate}/>
                </div>

                <div className="form-group my-3 date inline_box_item">
                    <label htmlFor="end_date">End Date</label>
                    <input type="date" className="form-control" id="end_date" name="end_date"
                           placeholder="End Date" aria-label="end_date"
                           aria-describedby="End-Date" value={endDate} onChange={handleEndDate}/>
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
                                    index={pic.index}
                                    updateIndex={handleOldProjectPicIndexChange}
                                    isWeb = {pic.isWeb}
                                    updateWeb ={handleOldProjectPicTypeChange}
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
                                    index={projectPicsIndex[idx]}
                                    updateIndex={handleProjectPicIndexChange}
                                    isWeb = {projectPicsType[idx]}
                                    updateWeb ={handleProjectPicTypeChange}
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

                <button type="submit" style={{display:"block"}} className="my-3 px-3">Submit</button>

            </form>
        </div>
    );
}

export default UpdateProjects;