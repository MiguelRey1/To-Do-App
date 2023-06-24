import { createContext, useState } from 'react'
import './App.css'
import FormTask from './components/form/formTask'
import TaskList from './components/taskList'
import { modalActive } from './JS/firabaseQuerys';
import Buttons from './components/form/Buttons';

// eslint-disable-next-line react-refresh/only-export-components
export const taskContext = createContext(null);


function App() {
  //? Estos dos estados seran los encargados de controlar la apertura y cierre de la ventana modal
  const [activeModal, setActiveModal] = useState("inactive")
  const [openModal, setOpenModal] = useState(false)
  const [task, setTask] = useState({
    id: 0,
    title: "",
    description: "",
    dateTask: new Date().toLocaleDateString(),
    completed: false
  })

/**
 * * El objetivo de esta funcion es evaluar si el estado del elemento 
 * * esta activo o inactivo para poder abrir la ventana modal
 */
  const openForm = ()=>{
    let isActive = modalActive(openModal)
    if(isActive){
      setOpenModal(false)
      setActiveModal("inactive")
    }else{
      setOpenModal(true)
      setActiveModal("active")
    }
  }

  return (
    <>
      <taskContext.Provider value={{task, setTask}}>
        <FormTask Active={activeModal} OpenModal={openForm}/>
        <Buttons titleButton="New Task" handleEvent={openForm}/>
        <TaskList OpenModal={openForm}/>
      </taskContext.Provider>
    </>
  )
}

export default App
