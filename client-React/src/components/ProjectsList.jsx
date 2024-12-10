import { useEffect, useState } from "react";
import { getAllProjects } from "../api/project.api";
import { ProjectCard } from "./ProjectCard";

export function ProjectsList(){
    
    const [project, setProjects] = useState([]);


    useEffect(()=>{
     async function loadProjects(){
     const res = await getAllProjects();
     //console.log(res);
     setProjects(res.data);
    }
    loadProjects();
    }, []);
    
    return <div>
        
    {project.map(project=>(
       
       <ProjectCard key={project.id} project={project}/>
    ))}
</div>;
   

}