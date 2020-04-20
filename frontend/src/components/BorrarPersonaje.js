import React, {Fragment, useState} from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { useHistory } from 'react-router';
import basePathApi from '../routes/BasePath.router';
import Swal from 'sweetalert2';


const BorrarPersonaje = () => {

    const [episodio, setEpisodio] = useState("episodio");
    const [personaje, setPersonaje] = useState("");
    const history = useHistory();

    const handleEpisodioChange = epi => {
        setEpisodio(epi);
    }
    
    const handlePersonajeChange = p => {
        setPersonaje(p);
    }

    const sweetSucces = (pers) => {
        Swal.fire(
            'Excelente!',
            `Personaje ${pers} eliminado con éxito!`,
            'success'
        )
    }

    const sweetError = () => {
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'El personaje no existe!'
          })
    }

    const borrarPersonaje = async pers  => {
        const response = await axios.get(`${basePathApi}/borrarPersonaje?episodio=${episodio}&personaje=${pers}`);
        if(response.status === 201){
            sweetSucces(pers);
            history.replace('/');
        } else {
            sweetError();
        }
    }


    const handleSubmit = e => {
        try{
            e.preventDefault();
            if(personaje!= null && episodio!=="episodio"){
                borrarPersonaje(personaje);
            }
        } catch (error) {
            return error;
        }

    }

        return(
            <Fragment>
                <Navbar />
                <form onSubmit={handleSubmit}>
                    <div className="col-md-4" style={{position: "absolute", marginLeft:"42%", marginTop:"15%"}}>
                        <div className="row">
                            <select className="epi-form" style={{width:"45%"}} onChange={e => handleEpisodioChange(e.target.value)} value={episodio}>
                                <option>Episodio</option>
                                <option value="episodio1">Episodio 1</option>
                                <option value="episodio2">Episodio 2</option>
                                <option value="episodio3">Episodio 3</option>
                                <option value="episodio4">Episodio 4</option>
                                <option value="episodio5">Episodio 5</option>
                            </select>
                        </div>
                        <div className="row" style={{marginTop:"5%", marginBottom:"5%"}}>
                            <input placeholder="Nombre del personaje" maxLength="25" value={personaje} onChange={e => handlePersonajeChange(e.target.value)}></input>
                        </div>
                        <div className="row">
                            <button type="submit" className="btn btn-secondary btn-md">Eliminar</button>
                        </div>
                    </div>
                </form>
            </Fragment>
        )
}

export default BorrarPersonaje;