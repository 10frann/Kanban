import { useEffect, useState } from 'react'
import './App.css'
import { Header } from './shared/Header';
import { Board } from './components/Board';
import { Footer } from './shared/Footer';

function App() {
  const [board, setBoard] = useState([]);
  const [nameBoard, setNameBoard] = useState('');
  const [tareas, setTarea] = useState([]);
  const urlBoard = "http://localhost:3000/board";
  const urlTarea = "http://localhost:3000/tareas"

  useEffect(() => {
    fetch(urlBoard)
      .then(res => res.json())
      .then(data => {
        setBoard([...data])
      })
      .catch(error => console.error(error))
  }, [])
  useEffect(() => {
    fetch(urlTarea)
      .then(res => res.json())
      .then(data => {
        setTarea([...data])
      })
      .catch(error => console.error(error))
  })

  const handleChange = (event) => {
    setNameBoard(event.target.value)
  } 
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(urlBoard, {
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({name: nameBoard})
    })
    .then(res => res.json())
    .then(data => {
      setBoard([...board, data])
    })
    setNameBoard('');
  }

  return (
    <section id='app'>
      <Header handleSubmit={handleSubmit} nameBoard={nameBoard} handleChange={handleChange}></Header>
      <div id="tablero">
        {board.map(value => <Board key={value.id} urlTarea={urlTarea} urlBoard={urlBoard} board={board} value={value} setBoard={setBoard} tareas={tareas} setTarea={setTarea}/>)}
      </div>
      <Footer></Footer>
    </section>
  )
}

export default App
