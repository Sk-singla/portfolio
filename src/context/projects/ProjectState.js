import ProjectContext from "./ProjectContext";
import {useState, useCallback} from "react";


const ProjectState = (props) => {
    const host = process.env.REACT_APP_SERVER_URL;
    const savedProjects = localStorage.getItem("projects");
    const [projects, setProjects] = useState(  savedProjects ? JSON.parse(savedProjects) : [])

    const [isLoading, setIsLoading] = useState(true);


    const getProjectById = (id) => {
        return projects.find((project) => { return project._id === id})
        // return await fetchSingleProjectById(id);
    }

    // const fetchSingleProjectById = async (id)=>{
    //     try {
    //         const response = await fetch(
    //             `${host}/api/projects/getProject/${id}`,
    //             {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 }
    //             }
    //         )
    //
    //         const result = await response.json();
    //         console.log(result);
    //
    //         if(result.success){
    //             return result.project;
    //         } else {
    //             console.log(result);
    //             return null;
    //         }
    //     }catch (e){
    //         console.log(e.message);
    //     }
    // }

    const fetchProjects = useCallback(async ()=> {
        try {
            setIsLoading(true);
            const response = await fetch(
                `${host}/api/projects/getAllProjects`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )

            const result = await response.json();
            console.log(result);

            if(result.success){
                setProjects(result.projects);
                localStorage.setItem("projects",JSON.stringify(result.projects))
            } else {
                console.log(result);
            }
            setIsLoading(false);
        }catch (e){
            console.log(e.message);
            setIsLoading(false);
        }
    },[host])

    const setPros = (projs)=>{
        setProjects(projs);
    }

    return (
        <ProjectContext.Provider value = {{projects,getProjectById,fetchProjects,setPros,isLoading}}>
            {props.children}
        </ProjectContext.Provider>
    )
}

export default ProjectState;


/**
 * {
            "_id": "616ecce83683100e860",
            "name": "Meme's Magic",
            "logo": "https://cdn.vox-cdn.com/thumbor/PSLYCBn2BjUj8Zdbf4BD6SMus-0=/0x0:1800x1179/920x613/filters:focal(676x269:964x557):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/66741310/3zlqxf_copy.0.jpg",
            "description": "Hello world appHello world appHello world appHello world appHello world appHello world appHello world appHello world appHello world appHello world app world appHello world appHello world appHello world app world appHello world appHello world appHello world app world appHello world appHello world appHello world app world appHello world appHello world appHello world app world appHello world appHello world appHello world app world appHello world appHello world appHello world app world appHello world appHello world appHello world app world appHello world appHello world appHello world app world appHello world appHello world appHello world app world appHello world appHello world appHello world app world appHello world appHello world appHello world app world appHello world appHello world appHello world app world appHello world appHello world appHello world app \n world appHello world appHello world appHello world app world appHello world appHello world appHello world app world appHello world appHello world appHello world app world appHello world appHello world appHello world app ",
            "technologies": [
                "Android",
                "Kotlin",
                "Hello",
                "Hi",
                "done",
            ],
            "photos": [
                {
                    "photoUrl": "https://akshaymoorthy.com/img/social/social_signup.png",
                    "description": "Sign up Screen",
                    "_id": "616ecce84d0c36865100e861"
                },
                {
                    "photoUrl": "https://akshaymoorthy.com/img/social/social_otp.png",
                    "description": "Otp Screen",
                    "_id": "616ecce84d0c36865100e861"
                },
                {
                    "photoUrl": "https://akshaymoorthy.com/img/social/social_signup.png",
                    "description": "Again SignUp Page",
                    "_id": "616ecce84d0c36865100e861"
                },
                {
                    "photoUrl": "https://akshaymoorthy.com/img/social/social_otp.png",
                    "description": "Otp Screen",
                    "_id": "616ecce84d0c36865100e861"
                }
            ],
            "__v": 0
        },
 {
            "_id": "616ecce836sdfsf83100e860",
            "name": "Meme's Magic",
            "logo": "https://cdn.vox-cdn.com/thumbor/PSLYCBn2BjUj8Zdbf4BD6SMus-0=/0x0:1800x1179/920x613/filters:focal(676x269:964x557):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/66741310/3zlqxf_copy.0.jpg",
            "description": "Hello world app",
            "technologies": [
                "Android",
                "Kotlin"
            ],
            "photos": [
                {
                    "photoUrl": "this is photourl",
                    "description": "Descriptionva",
                    "_id": "616ecce84d0c36865100e861"
                }
            ],
            "__v": 0
        },
 {
            "_id": "616ecce83683100ewerwer860",
            "name": "Meme's Magic",
            "logo": "https://cdn.vox-cdn.com/thumbor/PSLYCBn2BjUj8Zdbf4BD6SMus-0=/0x0:1800x1179/920x613/filters:focal(676x269:964x557):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/66741310/3zlqxf_copy.0.jpg",
            "description": "Hello world app",
            "technologies": [
                "Android",
                "Kotlin"
            ],
            "photos": [
                {
                    "photoUrl": "this is photourl",
                    "description": "Descriptionva",
                    "_id": "616ecce84d0c36865100e861"
                }
            ],
            "__v": 0
        },
 {
            "_id": "616ecce8xcvxvc3683100e860",
            "name": "Meme's Magic",
            "logo": "https://cdn.vox-cdn.com/thumbor/PSLYCBn2BjUj8Zdbf4BD6SMus-0=/0x0:1800x1179/920x613/filters:focal(676x269:964x557):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/66741310/3zlqxf_copy.0.jpg",
            "description": "Hello world app",
            "technologies": [
                "Android",
                "Kotlin"
            ],
            "photos": [
                {
                    "photoUrl": "this is photourl",
                    "description": "Descriptionva",
                    "_id": "616ecce84d0c36865100e861"
                }
            ],
            "__v": 0
        },
 {
            "_id": "616ecce83683100e860",
            "name": "Meme's Magic",
            "logo": "https://cdn.vox-cdn.com/thumbor/PSLYCBn2BjUj8Zdbf4BD6SMus-0=/0x0:1800x1179/920x613/filters:focal(676x269:964x557):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/66741310/3zlqxf_copy.0.jpg",
            "description": "Hello world appHello world appHello world appHello world appHello world appHello world appHello world appHello world appHello world appHello world app world appHello world appHello world appHello world app world appHello world appHello world appHello world app world appHello world appHello world appHello world app world appHello world appHello world appHello world app world appHello world appHello world appHello world app world appHello world appHello world appHello world app world appHello world appHello world appHello world app world appHello world appHello world appHello world app world appHello world appHello world appHello world app world appHello world appHello world appHello world app world appHello world appHello world appHello world app world appHello world appHello world appHello world app world appHello world appHello world appHello world app \n world appHello world appHello world appHello world app world appHello world appHello world appHello world app world appHello world appHello world appHello world app world appHello world appHello world appHello world app ",
            "technologies": [
                "Android",
                "Kotlin",
                "Hello",
                "Hi",
                "done",
            ],
            "photos": [
                {
                    "photoUrl": "https://akshaymoorthy.com/img/social/social_signup.png",
                    "description": "Sign up Screen",
                    "_id": "616ecce84d0c36865100e861"
                },
                {
                    "photoUrl": "https://akshaymoorthy.com/img/social/social_otp.png",
                    "description": "Otp Screen",
                    "_id": "616ecce84d0c36865100e861"
                },
                {
                    "photoUrl": "https://akshaymoorthy.com/img/social/social_signup.png",
                    "description": "Again SignUp Page",
                    "_id": "616ecce84d0c36865100e861"
                },
                {
                    "photoUrl": "https://akshaymoorthy.com/img/social/social_otp.png",
                    "description": "Otp Screen",
                    "_id": "616ecce84d0c36865100e861"
                }
            ],
            "__v": 0
        },
 {
            "_id": "616ecce836sdfsf83100e860",
            "name": "Meme's Magic",
            "logo": "https://cdn.vox-cdn.com/thumbor/PSLYCBn2BjUj8Zdbf4BD6SMus-0=/0x0:1800x1179/920x613/filters:focal(676x269:964x557):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/66741310/3zlqxf_copy.0.jpg",
            "description": "Hello world app",
            "technologies": [
                "Android",
                "Kotlin"
            ],
            "photos": [
                {
                    "photoUrl": "this is photourl",
                    "description": "Descriptionva",
                    "_id": "616ecce84d0c36865100e861"
                }
            ],
            "__v": 0
        },
 {
            "_id": "616ecce83683100ewerwer860",
            "name": "Meme's Magic",
            "logo": "https://cdn.vox-cdn.com/thumbor/PSLYCBn2BjUj8Zdbf4BD6SMus-0=/0x0:1800x1179/920x613/filters:focal(676x269:964x557):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/66741310/3zlqxf_copy.0.jpg",
            "description": "Hello world app",
            "technologies": [
                "Android",
                "Kotlin"
            ],
            "photos": [
                {
                    "photoUrl": "this is photourl",
                    "description": "Descriptionva",
                    "_id": "616ecce84d0c36865100e861"
                }
            ],
            "__v": 0
        },
 {
            "_id": "616ecce8xcvxvc3683100e860",
            "name": "Meme's Magic",
            "logo": "https://cdn.vox-cdn.com/thumbor/PSLYCBn2BjUj8Zdbf4BD6SMus-0=/0x0:1800x1179/920x613/filters:focal(676x269:964x557):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/66741310/3zlqxf_copy.0.jpg",
            "description": "Hello world app",
            "technologies": [
                "Android",
                "Kotlin"
            ],
            "photos": [
                {
                    "photoUrl": "this is photourl",
                    "description": "Descriptionva",
                    "_id": "616ecce84d0c36865100e861"
                }
            ],
            "__v": 0
        },

 */