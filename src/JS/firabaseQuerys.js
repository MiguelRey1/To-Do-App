/* eslint-disable no-unused-vars */
import { getDocs, setDoc, deleteDoc, collection, doc} from 'firebase/firestore';
import { db } from '../firebaseConfig/firebaseconfig'

/*
 * * esta funcion obtiene el ultimo ID de todos los datos registrados  
 * Para luego ser usado asignando un nuevo ID
 */
export const getLastID = async () =>{
  const query = await getDocs(collection(db,"todos"));
  const listId = query.docs.map((doc)=> doc.data().id )
  return Math.max(...listId)
}

/**
 * * getID() solicita todos los campos 'id'que se encuentran en cada 
 * * documento de mi coleccion en la base de datos
 */

export const getID = async () =>{
  const query = await getDocs(collection(db,"todos"));
  const listId = query.docs.map((doc)=> doc.data().id )
  return listId
}

/**
 * * getIdDocs() solicita todos los 'id' que se generan automaticamente para 
 * * cada documento de la coleccion en la base de datos
 */
export const getIdDocs = async (idtask) =>{
  const query = await getDocs(collection(db,"todos"));
  let foundId = query.docs.find(doc=>{
    if(doc.data().id === idtask){
      return doc.id
    }
  })
  return foundId
  
}

//? addData() se encarga de agregar un nuevo Documento o dato a Firebase
export const addData = async (obj) => {
  const newDoc = doc(collection(db,"todos"))
  await setDoc(newDoc,obj)
}
//? updateData() actualiza el documento especificado mediante el idDoc en Firestore de Firebase
export const updateData = async (obj, idDoc) => {
  const docUpdateRef = doc(db, "todos", idDoc);
  await setDoc(docUpdateRef, obj, {merge: true});
}
//? Eliminar el documento especificado de Firestore.
export const deleteData = async (idDoc) => {
  await deleteDoc(doc(db, "todos", idDoc))
}
/**
 * * el proposito de esta funcion es recibir un valor booleano 
 * * para determinar si se ha cumplido o no una tarea.
 */
export const isCompleted = (completed) => completed;

export const modalActive = (active) => active