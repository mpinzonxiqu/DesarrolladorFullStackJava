import  {Link} from 'react-router-dom'

export function Navigation() {
    return (
        <div>
           <Link to="/projects">
            <h1>Proyecto  Phyton-Django React</h1>
            </Link> 
            <Link to="/project-create">Menu de Navegacion</Link>
        </div>

    )
}