import React, { useContext, useState, useEffect } from 'react';
import './newNotePage.css';
import Editor from "@monaco-editor/react";
import { Button } from 'primereact/button';
import { AuthContext } from '../../context/AuthContext';
import { addNote } from '../../backend/api';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { types } from '../../models/Types';
import { useLocation } from 'react-router-dom';
import { INote } from '../../models/INote';

function NewNotePage() {

  const [type, setType] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [editors, setEditors] = useState<INote[]>([{key: 0, code: '', language: 'typescript'}]);

  const { state } = useLocation();

  const {loggedIn} = useContext(AuthContext);


  /** po każdej zmianie state */
  useEffect(() => {
    console.log(state);
    
    if (!state) 
      return;

    if (state.init) {
      setType('');
      setName('');
      setEditors([]);
    }
    else {
      setType(state.type);
      setName(state.name);
      setEditors(state.codes['codes']);
    }
  }, [state])


  /** nadpisanie kodów */
  const handleEditorChange = (value?: string, index?: number) => {
    let chosen = editors[index ? index : 0];
    chosen.code = value ? value : '';
    let arr = [...editors];
    arr[index ? index : 0] = chosen;
    setEditors(arr);   
  }


  /** dodanie kodu */
  const handleAddCode = () => {
    setEditors([...editors, {key: editors.length, code: '', language: 'css'}]);
  }


  /** usunięcie kodu */
  const handleRemoveCode = (key: number) => {   
    let arr = editors.filter(e => e.key !== key);
    setEditors(arr);
  }


  /** zmiana języka programowania */
  const handleChangeLang = (key: number, language: string) => {  
    let chosen = editors.find(e => e.key === key);
    let index = editors.indexOf(chosen!);
    chosen!.language = language ? language : '';
    let arr = [...editors];
    arr[index ? index : 0] = chosen!;
    setEditors(arr);       
  }

  
  /** zapisanie notatki */
  const handleSave = () => {  
    addNote(type, name, editors).then(() => {
      setEditors([])
    });
  }
  

  return (
    <div className='px-3 pb-3 flex flex-wrap justify-content-around'>

      <div className="flex w-full mt-3 gap-3">
        <Dropdown value={type} onChange={(e) => setType(e.value)} options={types} optionLabel="name" className='w-full' placeholder='Type'/>
        <InputText value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' className='w-full'/>
      </div>

      <div className="flex w-full mt-3 gap-3">
        <Button icon="pi pi-plus" severity="success" outlined onClick={handleAddCode} className='w-full'/>
        <Button label='Save' severity="info" outlined onClick={handleSave} className='w-full' disabled={!loggedIn || type.length===0 || name.length===0} />
      </div>

      {editors.map((e, index) => {
        return(
          <div className='flex mt-3' key={e.key}>
            <Editor
              height={Math.max(80 / (editors?.length % 2 === 0 ? editors?.length/2 : Math.floor(editors?.length/2)+1), 30) + 'vh'}
              width='42vw'
              language={e.language}
              value={e.code}
              theme='vs-dark'
              onChange={(value) => handleEditorChange(value, index)}
            />
            <div className='flex flex-column ml-1'>
              <Button label='TS' severity="secondary" outlined onClick={() => handleChangeLang(e.key, 'typescript')} className='mb-3'/>
              <Button label='HTML' severity="secondary" outlined onClick={() => handleChangeLang(e.key, 'html')} className='mb-3'/>
              <Button label='CSS' severity="secondary" outlined onClick={() => handleChangeLang(e.key, 'css')} className='mb-3'/>
              <Button icon="pi pi-minus" severity="danger" outlined onClick={() => handleRemoveCode(e.key)} className='flex flex-grow-1 w-full'/>
            </div>
          </div>
        )
      })}

    </div>
  )
};

export default NewNotePage;