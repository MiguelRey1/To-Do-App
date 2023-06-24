/* eslint-disable react/prop-types */
import { createRef, useContext, useEffect } from "react";
import Buttons from "./Buttons";
import { addData, getLastID, getID, updateData, getIdDocs } from "../../JS/firabaseQuerys";
import { taskContext } from "../../App";
import "./formTask.css";

const titleRef = createRef();
const contentRef = createRef();

function FormTask({ Active, OpenModal }) {
  const { task, setTask } = useContext(taskContext);

  /**
   * * Este useEffect() su funcion es proporcionar los datos a editar en el formulario para las tareas
   * * cada vez que se produzca un cambio de estado en "task" y de esta forma volver a renderizar
   * * el componente para tener la vista actualizada.
   */
  useEffect(() => {
    titleRef.current.value = task.title;
    contentRef.current.value = task.description;
  }, [task]);

  /**
   * * La Funcion handleAdd() tiene como funcion obtener los datos proporcionados en los inputs
   * * mandar a llamar el ultimo ID registrado en los documentos mediante getLastID
   * * y agregar una nueva tarea (task) a la Base de Datos.
   */
  const handleAdd = async () => {
    let newId = await getLastID();
    let newTask = {
      id: newId + 1,
      title: titleRef.current.value,
      description: contentRef.current.value,
      dateTask: new Date().toLocaleDateString(),
      completed: false,
    };

    let listid = await getID();
    let foundId = listid.find((el) => el === task.id);
    if (foundId) {
      handleUpdate();
      OpenModal()
    } else {
      //? Evalua si los inputs tienen datos, si estan vacios retorna el foco a los inputs
      if (titleRef.current.value) {
        setTask(newTask);
        addData(newTask);
        //? Esta es una funcion pasada como props desde el padre para abrir y cerra la ventana modal
        OpenModal()
      } else {
        titleRef.current.focus();
      }
      setTask({
        id: 0,
        title: "",
        description: "",
        dateTask: new Date().toLocaleDateString(),
        completed: false,
      });
    }
  };

  /**
   * * handleUpdate() obtiene el id del documento de firestore mediante la funcion getIdDocs() para
   * * luego crear un nuevo objeto y pasarlo junto con el Id del documento a la funcion updateData()
   * * para actualizar el documento de Firestore en Firebase.
   */

  const handleUpdate = async () => {
    //? esta Linea trae el id que es generado por firestore para actualizar el documento
    let foundId = await getIdDocs(task.id);
    let editedTask = {
      id: task.id,
      title: titleRef.current.value,
      description: contentRef.current.value,
      dateTask: new Date().toLocaleDateString(),
      completed: false,
    };
    updateData(editedTask, foundId.id);
    setTask({
      id: 0,
      title: "",
      description: "",
      dateTask: new Date().toLocaleDateString(),
      completed: false,
    });
  };

  return (
    <div className={`formTask-container ${Active}`}>
      <div className="formTask--Element">
        <div>
          <h3>Title</h3>
          <input
            className="formtask--inputs"
            ref={titleRef}
            type="text"
            placeholder="Task"
          />
        </div>
        <div>
          <h3>Desription</h3>
          <textarea
            className="formtask--inputs"
            placeholder="Description"
            ref={contentRef}
            cols="30"
            rows="10"
          ></textarea>
        </div>
        <Buttons
          ID="save"
          cssClass="btnSave"
          titleButton="Save"
          handleEvent={handleAdd}
        />
      </div>
    </div>
  );
}

export default FormTask;
