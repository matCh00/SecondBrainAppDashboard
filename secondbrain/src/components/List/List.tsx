import React, { useContext, useEffect, useRef, useState } from 'react';
import './list.css';
import { deleteNote, getNotes } from '../../backend/api';
import { types } from '../../models/Types';
import { useUpdateEffect } from 'primereact/hooks';
import { INoteGroup } from '../../models/INote';
import ListItem from '../ListItem/ListItem';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';

type Props = {
  type: string,
  searchValue: string,
}

function List(props: Props) {

  const [notes, setNotes] = useState<INoteGroup[]>([]);
  const [notesFiltered, setNotesFiltered] = useState<INoteGroup[]>([]);

  const {loggedIn} = useContext(AuthContext);

  const navigate = useNavigate();

  const toast = useRef<Toast>(null);


  /** po pierwszym wejściu */
  useEffect (() => {
    getNotes(types.find(t => t.name === props.type)?.value!).then(
      (res) => {
        setNotes(res);        
      }
    )
  }, []);


  /** po każdej zmianie prop.type */
  useUpdateEffect (() => {
    getNotes(types.find(t => t.name === props.type)?.value!).then(
      (res) => {
        setNotes(res);        
      }
    )
  }, [props.type]);


  /** po każdej zmianie props.searchValue i notes */
  useUpdateEffect (() => {    
    if (!props.searchValue || props.searchValue.length < 1) {
      setNotesFiltered(notes);
      return;
    }
    let tempNotes = notes.filter(n => n.name.toLowerCase().includes(props.searchValue.toLowerCase()));
    setNotesFiltered(tempNotes);
  }, [props.searchValue, notes]);


  /** dialog */
  const confirmDelete = (name: string) => {
    confirmPopup({
        message: 'Are you sure you want to delete note?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => accept(name),
        reject
    });
  };


  /** potwierdzenie usunięcia */
  const accept = (name: string) => {
    deleteNote(props.type, name).then(() => {
      setNotes(notes => notes.filter(n => n.name !== name))
    })
      
    toast.current!.show({ severity: 'success', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
  };


  /** zaprzeczenie usunięcia */
  const reject = () => {
    toast.current!.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
  };


  /** sklonowanie notatki */
  const handleClone = (name: string) => {
    let codes = notes.find(n => n.name === name);
    navigate('new', {state: {type: props.type, name, codes}})
  }

  
  return (
    <div className='pt-3'>

      <Toast ref={toast} />
      <ConfirmPopup />
      
      {notesFiltered.map((i, index) => {
        return (

          <Card 
            title={i.name} 
            header={() => {
              return (
                <div className='flex justify-content-end pt-3 pr-3 -mb-6'>
                  <Button label='Show / Clone' severity="success" outlined onClick={() => {handleClone(i.name)}} className='mr-3'/>
                  <Button label='Delete' severity="danger" outlined onClick={() => {confirmDelete(i.name)}} disabled={!loggedIn}/>
                </div>
              )
            }} 
            key={i.name + index} 
            className='mb-3'
          >
            <ListItem code={i.codes} />
          </Card>
        )
      })}

    </div>
  )
};

export default List;
