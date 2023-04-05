import { firestore } from "./firebase";
import { collection, getDocs, addDoc, doc, setDoc, DocumentData, query, where, deleteDoc } from "firebase/firestore"; 
import { INote, INoteGroup } from './../models/INote';


export const addNote = async (type: string, name: string, code: INote[]) => {

  const colRef = collection(firestore, 'notes', type, 'notes');

  const q = query(colRef, where("name", '==', name));
  const querySnapshot = await getDocs(q);

  if (querySnapshot && querySnapshot.docs[0] && querySnapshot.docs[0].id) {
    const docRef = doc(colRef, querySnapshot.docs[0].id);
  
    try {
      await setDoc(docRef, {name: name, code: code});      
    } 
    catch (e) {
      console.error("Error updating document: ", e);
    }
  }

  else {
    try {
      await addDoc(colRef, {name: name, code: code});
    } 
    catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}


export const deleteNote = async (type: string, name: string) => {

  const colRef = collection(firestore, 'notes', type, 'notes');

  const q = query(colRef, where("name", '==', name));
  const querySnapshot = await getDocs(q);

  const docRef = doc(colRef, querySnapshot.docs[0].id);
  
  try {
    await deleteDoc(docRef);
  } 
  catch (e) {
    console.error("Error deleting document: ", e);
  }
}


export const getNotes = async (type: string) => {

  const colRef = collection(firestore, 'notes', type, 'notes');

  const querySnapshot = await getDocs(colRef);  

  let res: INoteGroup[] = [];

  querySnapshot.forEach((doc) => {    
    res.push(doc.data() as INoteGroup);
  });

  return res;
}


export const getAllNotes = async () => {

  const colRef = collection(firestore, 'notes');

  const q = query(colRef, where("active", '==', true));
  const querySnapshot = await getDocs(q);    

  let res: INoteGroup[] = [];

  querySnapshot.docs.map(async (doc) => {  

    const ref = collection(colRef, doc.data().key, 'notes');
    const snapshot = await getDocs(ref);  

    let ress: INote[] = [];

    snapshot.docs.map(async (d) => {  
      ress.push(d.data() as INote);
    });

    res.push({name: doc.data().key, code: ress});
  });

  return res;
}