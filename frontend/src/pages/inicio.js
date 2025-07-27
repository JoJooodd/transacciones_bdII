import '../styles/inicio.css';
import React, { useState } from 'react';


function Inicio() {

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');

    return (
        <div className="contenedor-inicial">

            <div className="contenedor-tarjeta">
                <div className="contenedor-logo">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="2.5em" width="2.5em" 
                    xmlns="http://www.w3.org/2000/svg"><path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 
                    6.987 0 008 15a6.987 6.987 0 005.468-2.63z"></path><path fill-rule="evenodd" d="M8 9a3 3 0 100-6 3 3 0 000 6z" 
                    clip-rule="evenodd"></path><path fill-rule="evenodd" d="M8 1a7 7 0 100 14A7 7 0 008 1zM0 8a8 8 0 1116 0A8 8 0 010 8z" 
                    clip-rule="evenodd"></path></svg>
                </div>
                <h1>Ingrese los datos</h1>
                <form> 
                    <div>
                        <label htmlFor="nombre">Nombre: </label>
                        <input
                            id="nombre" 
                            type="text"
                            placeholder="Nombre (ej. Alejandro)"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}>
                        </input>
                    </div>
                    <div>
                        <label htmlFor="apellido">Apellido: </label>
                        <input
                            id="apellido" 
                            type="text"
                            placeholder="Apellido (ej. Calderón)"
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}>
                        </input>
                    </div>
                </form>

            <div className="contenedor-botones">
                <button >Transaccion</button>
                <button >Insertar</button>
                <button >Commit</button>
                <button >Rollback</button>
            </div>

            </div>
        </div>
    );
}

export default Inicio;