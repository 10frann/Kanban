import logo from '../assets/logotipo.png'

export const Header = ({nameBoard, handleChange, handleSubmit}) => {
    return (
        <div id='header'>
            <div id="logo">
                <img src={logo} alt="" width={"50px"}/> 
                <h1>KANBAN</h1>
            </div>
            <form onSubmit={handleSubmit} autoComplete='off'>
                <input type="text" name="crear-tablero" id="crear-tablero" placeholder='Nombre: ' value={nameBoard} onChange={handleChange} />
                <input type="submit" value="Añadir" id='boton-anadir'/>
            </form>
        </div>
      )
}