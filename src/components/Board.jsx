import { useState } from "react";
import { Task } from "./Task";
import styled from 'styled-components';

export const Board = ({board, value, setBoard, tareas, setTarea, urlTarea, urlBoard}) => {
    const [nameTarea, setNameTarea] = useState('');
    const [descripcionTarea, setDescripcionTarea] = useState('');
    const [addTarea, setAddTarea] = useState(false);
    const [color, setColor] = useState('bisque');
    const divColor = {
      backgroundColor: color
    }
    const tareasFilter = tareas.filter(t => (value.id === t.idBoard));

    const handleClickAddTarea = () => {
        setAddTarea(true);
      }
    
      const handleClickCancelarTarea = (id) => {
        setAddTarea(false)
      }
    
      const handleNameTarea = (event) => {
        setNameTarea(event.target.value)
      }
      const handleDescripcionTarea = (event) => {
        setDescripcionTarea(event.target.value)
      }
      const handleColor = (event) => {
        console.log("cambia");
        setColor(event.target.value)
      }

    const handleSubmitAddTarea = (event, id) => {
        event.preventDefault();
        const boardItem = board.find((item) => item.id === id);
        fetch(urlTarea, {
          method: "POST",
          headers: {"Content-type" : "application/json"},
          body: JSON.stringify({name: nameTarea, description: descripcionTarea, idBoard: boardItem.id})
        })
          .then(res => res.json())
          .then(data => {
            setTarea([...tareas, data])
          })
          .catch(error => console.error(error))
        setAddTarea(false);
        setNameTarea('');
        setDescripcionTarea('')
      }

    const deleteBoard = (id) => {
        const indice = board.find(b => (b.id === id));
        if(tareasFilter.length === 0){
          fetch(`${urlBoard}/${indice.id}`, { method: "DELETE" })
            .then(res => res.json())
            .then(data => {
              setBoard(board => board.filter(b => b !== indice))
            })
            .catch(error => console.error(error))
        } else {
          alert('No debe de tener tareas en el tablero')
        }
      }
      const draggingOver = (event) => {
        event.preventDefault();
      }

      const onDrop = (event) => {
        const idTarea = event.dataTransfer.getData('idTarea')
        const tarea = tareas.find(t => t.id === idTarea);
        fetch(`${urlTarea}/${tarea.id}`, {
          method: 'PUT',
          headers: {'Content-type' : 'application/json'},
          body: JSON.stringify({id: tarea.id, name:tarea.name, description: tarea.description, idBoard: value.id})
        })
          .then(res => res.json())
          .then(data => {
            setTarea(tareas.map(t => (t.id === idTarea) ? data:t))
          })
      }

    return(
        <div key={value.id} className='card' style={divColor} >
            <div id='title'>
                <h2>{value.name}</h2>
            </div>
        <div id='anadirTarea'>
            {
            (!addTarea) ? <button className="button" type='button' value={value.id} onClick={handleClickAddTarea}>Añadir tarea</button>
            :
            <form onSubmit={(event) => handleSubmitAddTarea(event, value.id)} id='formularioAddTarea' autoComplete="off">
              <input type="text" className='formTarea' name="nombre-tarea" id="nombre-tarea"  placeholder="Nombre de la tarea..." onChange={handleNameTarea} />
              <input type="text" className='formTarea' name="descripcion-tarea" id="descripcion-tarea" placeholder='Descripción de la tarea...' onChange={handleDescripcionTarea} />
              <p>
                  <input type="submit" className="button" value="Añadir" id='botonAddTarea'/>
                  <button type="button" id='cancelar' className="button" onClick={() => handleClickCancelarTarea(value.id)}>Cancelar</button>
              </p>
            </form>
            }
        </div>
        <div id='seccion-tareas' droppable="true" onDragOver={draggingOver} onDrop={onDrop}>
            {
            (tareasFilter.length<1) ? <h3>No hay tareas que mostrar</h3>
            :
            tareasFilter.map(t => 
                <Task tarea={t} tareas={tareas} urlTarea={urlTarea} setTareas={setTarea} key={t.id} nameTarea={nameTarea} descripcionTarea={descripcionTarea} handleNameTarea={handleNameTarea} handleDescripcionTarea={handleDescripcionTarea}></Task>
            )
            }
        </div>
        <div id="acciones">
        <button type="button" className="button" onClick={() => deleteBoard(value.id)}>❌</button>
        <input type="color" className="button" onChange={handleColor} />
        </div>
    </div>
    );
}