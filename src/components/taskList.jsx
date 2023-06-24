/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import { createRef, useContext, useEffect, useState } from 'react'
import './taskList.css'
import { getDocs , collection} from 'firebase/firestore';
import { db } from '../firebaseConfig/firebaseconfig'
import Task from './task';
import { taskContext } from '../App';
import { deleteData, getIdDocs, updateData } from '../JS/firabaseQuerys';

function TaskList( { OpenModal } ) {
  const [taskList, setTaskList] = useState([]);
  const {task, setTask} = useContext(taskContext)
  /**
   * * el proposito de esta funcion es obtener una lista con todos los objetos 
   * * almacenados dentro de la bases de datos y asignarlos al estado mediante setTaskList().
   */
  const getTasks = async () =>{
    const query = await getDocs(collection(db,"todos"));
    const listTasks = query.docs.map((doc)=> doc.data())
    setTaskList(listTasks)
    
  }

  /**
   * * Esta funcion envia los datos de la tarea seleccionada al
   * * formulario de creacion de tareas para poder editar una
   * * tarea ya existente
   */
  const edit = (e)=>{
    OpenModal()
   let idElement = Number.parseInt(e.target.id)
    taskList.forEach((el)=>{
      if(el.id === idElement){
        setTask({
          id: el.id,
          title: el.title, 
          description: el.description,
          dateTask: el.dateTask,
          completed: el.completed
        })
      }
    })
  }

  /**
   * * esta funcion recibe el "id" de la tarea (task) a eliminar y se lo pasa como parametro
   * * a getIdDocs() para posteriormente llamar la funcion deleteData() y poder eliminar
   * * el documento de la base de datos.
   */
  const handleDelete = async (e) =>{
    let idElement = Number.parseInt(e.target.id)
    let idDoc = await getIdDocs(idElement)
    deleteData(idDoc.id)
    setTask({  
      id: 0,
      title: "",
      description: "",
      dateTask: new Date().toLocaleDateString(),
      completed: false
    })
  }

/**
 * * Esta funcion es la encargada de gestionar el estado de 'tarea completada' 
 * * mediante el checkbox del componente task
 */  
  const completeTask = async (e) =>{
    let  idElement = Number.parseInt(e.target.id)
    let docId = await getIdDocs(idElement)
    
    // ? este metodo devuelve la tarea que coincida con el id del elemento en cuestion para luebo actualizar la Base de Datos
    const taskCompleted = taskList.find((el)=>{
      if(el.id === idElement){
        el.completed = e.target.checked
        return el
      }
    })

    updateData(taskCompleted,docId.id)
    setTask(taskCompleted)

  }

  /**
   * * este useEffect() actualiza la interfaz siempre que ocurra un cambio dentro de la
   * * variable " task " 
   */
  useEffect(()=>{
    getTasks()
  },[task])


  

  return (
    <div className="TaskList-container">
      {
       taskList.map((el) => (
        <Task 
          idTask={el.id}
          key={el.id} 
          title={el.title} 
          description={el.description} 
          datetask={el.dateTask} 
          Edit={edit}
          Delete={handleDelete}
          CheckTask={completeTask}
          cssClass={(el.completed)? "completed":""}
          />
      ))
      }
    </div>
  )
}

export default TaskList