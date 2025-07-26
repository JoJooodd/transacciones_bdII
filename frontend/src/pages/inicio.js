import '../styles/inicio.css';
import React, { useState } from 'react';


function Inicio() {

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');

    return (
        <div className="contenedor-inicial">
            <h1>Ingrese los datos</h1>
            <form> 
                <div>
                    <label>Nombre: </label>
                    <input type="text"
                        placeholder="Nombre (ej. Alejandro)"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label>Apellido: </label>
                    <input type="text"
                        placeholder="Apellido (ej. Calderón)"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}>
                    </input>
                </div>
            </form>
            <div className="contenedor-botones">
                <button className="boton">Transaccion</button>
                <button className="boton">Insertar</button>
                <button className="boton">Commit</button>
                <button className="boton">Rollback</button>
            </div>
        </div>
    );
}

export default Inicio;