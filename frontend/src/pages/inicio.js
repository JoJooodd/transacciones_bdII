import '../styles/inicio.css';
import React, { useState } from 'react';
import api from '../utils/axios';

function Inicio() {

    // variables apra insertar datos
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');

    // variables para actualizar datos
    const [new_nombre, setNewNombre] = useState('');
    const [new_apellido, setNewApellido] = useState('');

    const [keep_nombre, setKeepNombre] = useState('');
    const [keep_apellido, setKeepApellido] = useState('');

    // variables para eliminar datos
    const [idEliminar, setIdEliminar] = useState(0);

    const [activo, setActivo] = useState(false);

    const [nivelActivo, setNivelActivo] = useState(true);

    const [transaccionActivar, setTransaccionActivar] = useState(false);

    const [personas, setPersonas] = useState([]);

    const [mostrar, setMostrar] = useState(false);

    // Id de la persona seleccionada para actualizar/eliminar
    const [id_actual, setIdActual] = useState(0);

    const handleSelectActualizar = (e) => {
        const id = Number(e.target.value);
        setIdActual(id);
        const persona = personas.find((p) => p.id === id);
        if (persona) {
            setKeepNombre(persona.nombre);
            setKeepApellido(persona.apellido);
        }
    };

    const handleSelectEliminar = (e) => {
        const id = Number(e.target.value);
        setIdEliminar(id);
    };

    const aislamientoVars = [
        { id: 1, nivel: 'READ UNCOMMITTED' },
        { id: 2, nivel: 'READ COMMITTED' },
        { id: 3, nivel: 'REPEATABLE READ' },
        { id: 4, nivel: 'SERIALIZABLE' }
    ]

    const [aislamiento, setAislamiento] = useState(0);

    const [nombreAislamiento, setNombreAislamiento] = useState("");

    const handleSelectAislamiento = (e) => {
        const id = Number(e.target.value);

        setAislamiento(id);
        setNombreAislamiento(aislamientoVars.find(a => a.id === id)?.nivel || "");

    }

    async function beginTransaction() {
        try{
            
            const response = await api.post("/transaccion/iniciar");

            await getUsers();

            console.log("Transacción Iniciada Correctamente")
        } catch (err){
            throw err
        }
    }

    async function insertUser(nombre, apellido) {
        try{
            const response = await api.post("/transaccion/insertar", {
                nombre: nombre,
                apellido: apellido
            })
            console.log(`Nombre: ${nombre}`)
            console.log(`Apellido: ${apellido}`)
            console.log("---------------------------------")

            await getUsers();

        } catch (err){
            throw err
        }
    }

    async function getUsers() {
        try{
            const response = await api.get("/transaccion/getUsers");

            setPersonas(response.data);

        } catch (err){
            throw err
        }
        
    }

    async function updateUser(id, nombre, apellido) {
        try{
            
            await api.put('/transaccion/updateUser', {
                id: id,
                nombre: nombre,
                apellido: apellido
            })

            console.log(`ID a Modificar: ${id}`)
            console.log(`Datos Nuevos\nNombre:${nombre} - Apellido: ${apellido}`)

        } catch (err){
            throw err
        }
    }

    async function deleteUser(id) {
        try{
            
            await api.delete(`/transaccion/deleteUser/${id}`)


            // imprimir nombre a eliminar

        } catch (err){
            throw err
        }
        
    }

    async function changeIsolationLevel(nivel) {
        try{

            await api.post("/transaccion/isolation", {nivel: nivel})
            
            console.log(`-----------Nivel actualizado: ${nivel}----------`)

        } catch (err) {
            throw err
        }
        
    }

    async function commitTransaction() {
        try{
            const response = await api.post("/transaccion/commit")
            console.log("Commit Exitoso :)")
        }catch (err){
            throw err
        }
    }

    async function rollbackTransaction() {
        try{
            const response = await api.post("/transaccion/rollback")
            console.log("Rollback Exitoso :(")
        }catch (err){
            throw err
        }
    }

    function msgCommitExitoso() {
        alert("Commit Exitoso");
    }

    function msgRollBackExitoso() {
        alert("Rollback Exitoso");
    }

    return (
        <div className="contenedor-inicial">
            <div className="nivel-aislamiento">    
                <h2>Seleccione nivel de aislamiento</h2>    
                <div>
                    <label>Nivel: </label>
                    <select
                        value={aislamiento}
                        onChange={handleSelectAislamiento}
                        disabled={!nivelActivo || activo}
                    >
                    {aislamiento === 0 && <option value={0}>-- Selecciona --</option>}
                        {aislamientoVars.map((a) => (
                        <option key={a.id} value={a.id}>
                            {a.nivel}
                        </option>
                        ))}
                    </select>
                </div>
                <button onClick={() => {
                    changeIsolationLevel(nombreAislamiento)
                    setNivelActivo(false);
                    setTransaccionActivar(true);
                }} disabled={activo || !nivelActivo}>
                    Confirmar nivel
                </button>
            </div>

            <div className="contenedor-botones">
                <button onClick={() => {
                    setActivo(true);
                    beginTransaction();}}
                    disabled={!transaccionActivar || activo}>Transaccion</button>
                <button onClick={() => {
                    setActivo(false);
                    setNivelActivo(true);
                    setTransaccionActivar(false);
                    commitTransaction();
                    msgCommitExitoso();}}  disabled={!activo}>Commit</button>
                <button onClick={() => {
                    setActivo(false);
                    setNivelActivo(true);
                    setTransaccionActivar(false);
                    rollbackTransaction();
                    msgRollBackExitoso()}} disabled={!activo}>Rollback</button>
            </div>

            <div className="contenedor-funciones">
                
                <div className="contenedor-tarjeta-insertar">
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
                                onChange={(e) => setNombre(e.target.value)}
                                required>
                            </input>
                        </div>
                        <div>
                            <label htmlFor="apellido">Apellido: </label>
                            <input
                                id="apellido" 
                                type="text"
                                placeholder="Apellido (ej. Calderón)"
                                value={apellido}
                                onChange={(e) => setApellido(e.target.value)}
                                required>
                            </input>
                        </div>
                        <button type="submit" onClick={(e   ) => {
                            e.preventDefault();
                                if (!nombre.trim() || !apellido.trim()) {
                                alert("Debes completar ambos campos antes de insertar.");
                                return;
                            }
                            setNombre('');
                            setApellido('');
                            insertUser(nombre, apellido);}
                            } disabled={!activo}>Insertar</button>
                    </form>

                </div>

                <div className="contenedor-tarjeta-actualizar">
                    <div className="contenedor-logo">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" 
                        height="2.3em" width="2.3em" xmlns="http://www.w3.org/2000/svg"><path fill="none" 
                        stroke="#000" stroke-width="2" d="M1.7507,16.0022 C3.3517,20.0982 7.3367,23.0002 
                        11.9997,23.0002 C18.0747,23.0002 22.9997,18.0752 22.9997,12.0002 M22.2497,7.9982 
                        C20.6487,3.9012 16.6627,1.0002 11.9997,1.0002 C5.9247,1.0002 0.9997,5.9252 0.9997,12.0002 
                        M8.9997,16.0002 L0.9997,16.0002 L0.9997,24.0002 M22.9997,0.0002 L22.9997,8.0002 
                        L14.9997,8.0002"></path></svg>
                    </div>
                    <h1>Actualice los datos</h1>
                    <form> 
                        <h2>Seleccione una persona para actualizar</h2>    
                        <div>
                            <label>Usuario: </label>
                            <select value={id_actual} onChange={handleSelectActualizar} disabled={!activo}>
                            {id_actual === 0 && <option value={0}>-- Selecciona --</option>}
                                {personas.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.nombre} {p.apellido}
                                </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="new_nombre">Nombre: </label>
                            <input
                                id="new_nombre" 
                                type="text"
                                placeholder="Nombre (ej. Josué)"
                                value={new_nombre}
                                onChange={(e) => setNewNombre(e.target.value)}>
                            </input>
                        </div>
                        <div>
                            <label htmlFor="new_apellido">Apellido: </label>
                            <input
                                id="new_apellido" 
                                type="text"
                                placeholder="Apellido (ej. Bautista)"
                                value={new_apellido}
                                onChange={(e) => setNewApellido(e.target.value)}>
                            </input>
                        </div>
                        <button type="button" onClick={() => { 
                            updateUser(id_actual, new_nombre, new_apellido)
                            setNewNombre('')
                            setNewApellido('')
                        }
                            } disabled={!activo}>Actualizar</button>
                    </form>
                </div>

                <div className="contenedor-tarjeta-eliminar">
                    <div className="contenedor-logo">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" 
                        height="2.5em" width="2.5em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" 
                        d="M0 0h24v24H0z"></path><path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 
                        1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 
                        0h2v6h-2v-6zM9 4v2h6V4H9z"></path></g></svg>
                    </div>
                    <h1>Borrar usuario</h1>
                    <form> 
                        <h2>Seleccione una persona para eliminar</h2>    
                        <div>
                            <label>Usuario: </label>
                            <select value={idEliminar} onChange={handleSelectEliminar} disabled={!activo}>
                            {idEliminar === 0 && <option value={0}>-- Selecciona --</option>}
                                {personas.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.nombre} {p.apellido}
                                </option>
                                ))}
                            </select>
                        </div>
                        
                        <button type="button" onClick={() => { 
                            setNombre('');
                            setApellido('');
                            deleteUser(idEliminar);}
                            } disabled={!activo}>Eliminar</button>
                    </form>
                </div>


                <div className="contenedor-tarjeta-mostrar-datos">
                    <div className="contenedor-logo">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" t="1569683650778" 
                        viewBox="0 0 1024 1024" version="1.1" pId="13065" height="2.5em" width="2.5em" 
                        xmlns="http://www.w3.org/2000/svg"><defs></defs><path d="M301.3 496.7c-23.8 
                        0-40.2-10.5-41.6-26.9H205c0.9 43.4 36.9 70.3 93.9 70.3 59.1 0 95-28.4 95-75.5 
                        0-35.8-20-55.9-64.5-64.5l-29.1-5.6c-23.8-4.7-33.8-11.9-33.8-24.2 0-15 13.3-24.5 
                        33.4-24.5 20.1 0 35.3 11.1 36.6 27h53c-0.9-41.7-37.5-70.3-90.3-70.3-54.4 0-89.7 
                        28.9-89.7 73 0 35.5 21.2 58 62.5 65.8l29.7 5.9c25.8 5.2 35.6 11.9 35.6 24.4 0.1 
                        14.7-14.5 25.1-36 25.1z" pId="13066"></path><path d="M928 140H96c-17.7 0-32 14.3-32 
                        32v496c0 17.7 14.3 32 32 32h380v112H304c-8.8 0-16 7.2-16 16v48c0 4.4 3.6 8 8 8h432c4.4 
                        0 8-3.6 8-8v-48c0-8.8-7.2-16-16-16H548V700h380c17.7 0 32-14.3 
                        32-32V172c0-17.7-14.3-32-32-32z m-40 488H136V212h752v416z" pId="13067"></path><path 
                        d="M828.5 486.7h-95.8V308.5h-57.4V534h153.2zM529.9 540.1c14.1 0 27.2-2 39.1-5.8l13.3 
                        20.3h53.3L607.9 511c21.1-20 33-51.1 33-89.8 0-73.3-43.3-118.8-110.9-118.8s-111.2 
                        45.3-111.2 118.8c-0.1 73.7 43 118.9 111.1 118.9z m0-190c31.6 0 52.7 27.7 52.7 71.1 0 
                        16.7-3.6 30.6-10 40.5l-5.2-6.9h-48.8L542 491c-3.9 0.9-8 1.4-12.2 1.4-31.7 
                        0-52.8-27.5-52.8-71.2 0.1-43.6 21.2-71.1 52.9-71.1z" pId="13068"></path></svg>
                    </div>
                    <h1>Datos actuales</h1>
                    <div>
                        <button onClick={() => {
                            getUsers()
                            setMostrar(!mostrar)
                            }
                        } disabled={!activo}>
                            {mostrar ? "Ocultar" : "Mostrar"} lista
                        </button>

                        {mostrar && (
                            <div className="lista-personas">
                            {personas.map((p) => (
                                <div className="persona" key={p.id}>
                                    <span className="id">{p.id}</span>
                                    <span className="nombre">{p.nombre}</span>
                                    <span className="apellido">{p.apellido}</span>
                                </div>
                            ))}
                            </div>
                        )}
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Inicio;
