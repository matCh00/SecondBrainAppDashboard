import { firestore } from "./firebase";
import { collection, getDocs, addDoc } from "firebase/firestore"; 
import { INote } from './../models/INote';


export const addNote = async (type: string, name: string, code: INote[]) => {
  const colRef = collection(firestore, type);
  
  try {
    const docRef = await addDoc(colRef, {name: name, code: code});
  } 
  catch (e) {
    console.error("Error adding document: ", e);
  }
}


export const getNotes = async (type: string) => {
  const querySnapshot = await getDocs(collection(firestore, type));

  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
}