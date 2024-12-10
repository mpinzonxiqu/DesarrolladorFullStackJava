import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProjectPage } from "./pages/ProjectPage";

import { ProjectFormPage } from "./pages/ProjectFormPage";

import './App.css'
import { Navigation } from "./components/Navigation";

function App() {


  return (
    <BrowserRouter>
    <Navigation/>
   
    <Routes>
    <Route path="/" element= {<Navigate to="/projects"/>}/> 
    <Route path="/projects" element={<ProjectPage/>}/>
    <Route path="/projects-create" element={<ProjectFormPage/>}/>
    </Routes>

    </BrowserRouter>
  )
}

export default App
