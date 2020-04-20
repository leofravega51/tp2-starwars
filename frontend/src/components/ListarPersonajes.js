import React, {Fragment, useState} from 'react';
import Navbar from './Navbar';
import basePathApi from '../routes/BasePath.router';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert'



const ListarPersonajes = () => {

    const [episodio, setEpisodio] = useState("episodio");
    const [listado, setListado] = useState([]);

    const handleEpisodioChange = async (e)  =>{

        const response = await axios.get(`${basePathApi}/listarPersonajes?episodio=${e}`);
        setEpisodio(e);
        setListado(response.data);
    }

        return(
            <Fragment>
                <Navbar />
                <div className="container">
                    <div className="row">
                        <div className="col-md-4" style={{position: "absolute", left:"42%", marginTop:"5%"}}>
                            <div className="row">
                                <select className="epi-form" style={{marginRight:"2%", width:"45%"}} onChange={e => handleEpisodioChange(e.target.value)} value={episodio}>
                                    <option>Episodio</option>
                                    <option value="episodio1">Episodio 1</option>
                                    <option value="episodio2">Episodio 2</option>
                                    <option value="episodio3">Episodio 3</option>
                                    <option value="episodio4">Episodio 4</option>
                                    <option value="episodio5">Episodio 5</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div id="tabla-personajes" className="row" style={{position: "absolute", left:"10%", right:"10%", marginTop:"10%"}}>
                        
                        {listado!==0 ?
                            
                            listado.map((personaje, i) => (
                                <div className="card" style={{width: "18rem",margin:"2% 2%"}} key={i}>
                                    <div className="card-body">
                                        <p className="card-text">{personaje}</p>
                                    </div>
                                </div>
                            ))  

                            :
                            <div className="col-md-4" style={{position: "absolute", left:"33%", marginTop:"5%"}}>
                                <Alert variant="secondary" style={{width:"90%"}}>
                                    No hay personajes asociados a este episodio!
                                </Alert>
                            </div>
                        }
                    </div>
                </div>
            </Fragment>
        )
}

export default ListarPersonajes;