import React, { useContext, useState } from 'react';
import './list.css';
import { getNotes } from '../../backend/api';
import { types } from '../../models/Types';
import { useUpdateEffect } from 'primereact/hooks';
import { INoteGroup } from '../../models/INote';
import ListItem from '../ListItem/ListItem';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

type Props = {
  type: string,
  searchValue: string,
}

function List(props: Props) {

  const {loggedIn} = useContext(AuthContext);
  const navigate = useNavigate();

  const [notes, setNotes] = useState<INoteGroup[]>([]);
  const [notesFiltered, setNotesFiltered] = useState<INoteGroup[]>([]);

  
  useUpdateEffect (() => {
    getNotes(types.find(t => t.name === props.type)?.value!).then(
      (res) => {
        setNotes(res);        
      }
    )
  }, [props.type]);


  useUpdateEffect (() => {
    if (!props.searchValue || props.searchValue.length < 1) {
      setNotesFiltered(notes);
      return;
    }
    
    let tempNotes = notes.filter(n => n.name.includes(props.searchValue));
    setNotesFiltered(tempNotes);
  }, [props.searchValue, notes]);


  const handleClone = (name: string) => {
    let code = notes.find(n => n.name === name);
    navigate('new', {state: {type: props.type, name, code}})
  }

  
  const handleDelete = (name: string) => {
    console.log(name);
  }

  
  return (
    <div className='p-3'>
      
      {notesFiltered.map((i, index) => {
        return (

          <Card 
            title={i.name} 
            header={() => {
              return (
                <div className='flex justify-content-end pt-3 pr-3 -mb-6'>
                  <Button label='Clone' severity="success" outlined onClick={() => {handleClone(i.name)}} className='mr-3'/>
                  <Button label='Delete' severity="danger" outlined onClick={() => {handleDelete(i.name)}} disabled={!loggedIn}/>
                </div>
              )
            }} 
            key={i.name + index} 
            className='mb-3'
          >
            <ListItem code={i.code} />
          </Card>
        )
      })}

    </div>
  )
};

export default List;
