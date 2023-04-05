import React, { useState } from 'react';
import './listItem.css';
import { useUpdateEffect } from 'primereact/hooks';
import { INote } from '../../models/INote';
import { Fieldset } from 'primereact/fieldset';
import Editor from "@monaco-editor/react";

type Props = {
  code: INote[]
}

function ListItem(props: Props) {

  const [codes, setCodes] = useState<INote[]>([]);

  
  /** po każdej zmianie props.code */
  useUpdateEffect (() => {
    setCodes(props.code);
  }, [props.code]);
  
  
  return (
    <div className='p-3'>
      
      {codes.map((i, index) => {
        return (

          <Fieldset legend={i.language} key={i.code + index} className='mb-3'>
            <Editor
              height={'10vh'}
              language={i.language}
              value={i.code}
              theme='vs-dark'
            />
          </Fieldset>
        )
      })}

    </div>
  )
};

export default ListItem;