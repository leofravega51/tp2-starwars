import React from 'react';
import {Link} from 'react-router-dom';

const Home = () => {


    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/" style={{color:"yellow"}}>StarWars</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/starwars/agregarPersonaje" className="links" style={{marginRight: "50px", fontSize : 20, color:"white", textDecoration:"none"}}>Agregar personaje</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/starwars/borrarPersonaje" className="links" style={{marginRight: "50px", fontSize : 20, color:"white", textDecoration:"none" }}>Borrar personaje</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/starwars/listarPersonajes" className="links" style={{marginRight: "50px", fontSize : 20, color:"white", textDecoration:"none"}}>Listado de personajes</Link>
                    </li>
                </ul>
            </div>
            
        </nav>

    )
}

export default Home;