import { useState } from "react";

export const Task = ({tarea, setTareas, tareas, urlTarea}) => {
    const [editTarea, setEditTarea] = useState(false)
    const [nameTarea, setNameTarea] = useState(tarea.name);
    const [descripcionTarea, setDescripcionTarea] = useState(tarea.description)

    const handleNameTarea = (event) => {
        setNameTarea(event.target.value)
    }
    const handleDescripcionTarea = (event) => {
        setDescripcionTarea(event.target.value)
    }
    const deleteTask = (id) => {
        const deleteTask = tareas.find(t => t.id === id)
        if(confirm(`¿Desea eliminar la tarea con nombre "${deleteTask.name}"?`)) {
            fetch(`${urlTarea}/${deleteTask.id}`, {
                method: "DELETE"
            })
            .then(res => res.json())
            .then(data => {
                setTareas(tareas.filter(t => (t.id !== id)))
            })
            .catch(error => console.error(error))
        }
      }
    const editTask = (event, id) => {
        event.preventDefault();
        const editTask = tareas.find(t => t.id === id);
        fetch(`${urlTarea}/${editTask.id}`, {
            method:"PUT",
            headers: {"Content-type" : "application/json"},
            body: JSON.stringify({id: editTask.id, name: nameTarea, description: descripcionTarea, idBoard: editTask.idBoard})
        })
            .then(res => res.json())
            .then(data => {
                setTareas(tareas.map(t => (t.id === id) ? data : t))
            })
            .catch(error => console.error(error))
        setEditTarea(false)
    }
    const handleClickEdit = () => {
        setEditTarea(true)
    }
    const handleClickEditCancelar = () => {
        setEditTarea(false)
    }
      const startDrag = (e, tarea) => {
        e.dataTransfer.setData('idTarea', tarea.id);
      }
    return (
        <div key={tarea.id} id='tarea' draggable="true" onDragStart={(e) => startDrag(e, tarea)}>
            <p className="name">{tarea.name}</p>
            <p>{tarea.description}</p>
            {
            (editTarea) && 
            <form onSubmit={(e) => editTask(e, tarea.id)}>
                <h3>Editar Tarea</h3>
                <input type="text" className='formTarea' name="nombre-tarea" id="nombre-tarea" placeholder="Nombre de la tarea..." value={nameTarea} onChange={handleNameTarea} />
                <input type="text" className='formTarea' name="descripcion-tarea" id="descripcion-tarea" placeholder='Descripción de la tarea...' value={descripcionTarea} onChange={handleDescripcionTarea} />
                <p>
                  <input type="submit" className="button" value="Editar" id='botonAddTarea'/>
                  <button type="button" id='cancelar' className="button" onClick={handleClickEditCancelar}>Cancelar</button>
                </p>
            </form>
            }
            <p>
                <button onClick={handleClickEdit} className="button">✏️</button>
                <button onClick={() => deleteTask(tarea.id)} className="button">❌</button>
            </p>
        </div>
    )
}