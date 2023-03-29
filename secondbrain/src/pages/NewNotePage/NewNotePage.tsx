import React, { useState } from 'react';
import './newNotePage.css';
import Editor from "@monaco-editor/react";
import { Button } from 'primereact/button';

function NewNotePage() {

  const [editors, setEdtors] = useState([{key: 0, code: ''}]);

  const handleEditorChange = (value?: string, index?: number) => {
    let chosen = editors[index ? index : 0];
    chosen.code = value ? value : '';
    let arr = [...editors];
    arr[index ? index : 0] = chosen;
    setEdtors(arr);   
  }

  const handleAddCode = () => {
    setEdtors([...editors, {key: editors.length, code: ''}]);
  }

  const handleRemoveCode = (key: number) => {   
    let arr = editors.filter(e => e.key !== key);
    setEdtors(arr);
  }
  
  return (
    <div className='px-3 pb-3'>

      {editors.map((e, index) => {
        return(
          <div className='flex mt-3' key={e.key}>
            <Editor
              height={80 / editors?.length + 'vh'}
              defaultLanguage="typescript"
              theme='vs-dark'
              onChange={(value) => handleEditorChange(value, index)}
            />
            <Button icon="pi pi-minus" severity="danger" onClick={() => handleRemoveCode(e.key)}/>
          </div>
        )
      })}

      <Button icon="pi pi-plus" severity="success" onClick={handleAddCode} className='mt-3 w-full'/>

    </div>
  )
};

export default NewNotePage;