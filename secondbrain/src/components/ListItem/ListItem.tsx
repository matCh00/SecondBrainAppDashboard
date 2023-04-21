import React, { useEffect, useRef, useState } from 'react';
import './listItem.css';
import { useUpdateEffect } from 'primereact/hooks';
import { INote } from '../../models/INote';
import { Fieldset } from 'primereact/fieldset';
import Editor, { Monaco } from "@monaco-editor/react";
import { editor } from 'monaco-editor';

type Props = {
  code: INote[]
}

function ListItem(props: Props) {

  const [codes, setCodes] = useState<INote[]>([]);

  
  /** po pierwszym wejściu */
  useEffect (() => {
    setCodes(props.code);
  }, []);

  
  /** po każdej zmianie props.code */
  useUpdateEffect (() => {
    setCodes(props.code);
  }, [props.code]);


  const monacoRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  function handleEditorWillMount(monaco: Monaco) {
    monaco.languages.typescript?.typescriptDefaults?.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
    });
  }

  function handleEditorDidMount(editor: editor.IStandaloneCodeEditor, monaco: Monaco) {
    monacoRef.current = editor;
  }
  
  
  return (
    <div className='p-3'>
      
      {codes.map((i, index) => {
        return (

          <Fieldset legend={i.file} key={i.code + index} className='mb-3'>
            <Editor
              className='resize'
              language={i.language}
              value={i.code}
              theme='vs-dark'
              beforeMount={handleEditorWillMount}
              onMount={handleEditorDidMount}
            />
          </Fieldset>
        )
      })}

    </div>
  )
};

export default ListItem;