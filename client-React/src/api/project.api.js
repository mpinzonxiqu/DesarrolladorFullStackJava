import axios from 'axios'


const projectsApi = axios.create({
    baseURL: "http://127.0.0.1:8000/projects/api/v1/projects/",
});

export const getAllProjects = () => projectsApi.get("/");


export const createProjects = (project) => projectsApi.post("/", project);
