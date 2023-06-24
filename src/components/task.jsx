/* eslint-disable react/prop-types */
import Buttons from "./form/Buttons"
import './task.css'

/**
 * * La funcion de este componente mostrar un card con los
 * * datos obtenidos de la base de datos. estos datos provienen
 * * del componente taskList el cual le son pasados como props
 */

function Task({title, description, datetask, Edit, Delete, idTask, CheckTask, cssClass}) {
  return (
    <div className={`taskCard-container ${cssClass}`}>
      <h2 className="task-title-Element ">{title} <span className="task-date-Element">{datetask}</span></h2>
      <label className="task-description-title" htmlFor="">Description</label>
      <p  className="task-description-Element"> {description}</p>
      <div>
        <div className="task-check-Element">
          <input type="checkbox" onChange={(e)=>CheckTask(e)} name="completed" id={idTask} />
          <label htmlFor="">Completed</label>
        </div>
        <div className="task-buttons-container">
          <Buttons ID={idTask} cssClass="btnEdit" titleButton="edit" handleEvent={Edit} />
          <Buttons ID={idTask} cssClass="btnDelete" titleButton="delete" handleEvent={Delete} />
        </div>
      </div>
    </div>
  )
}

export default Task