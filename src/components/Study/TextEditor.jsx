import React,{useState} from 'react'
import { Editor, EditorState, convertToRaw, convertFromRaw } from "draft-js";

const TextEditor = () => {
    const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };
  return (
    <div className='w-full h-48'>
    <Editor
      editorState={editorState}
      onChange={handleEditorChange}
    />
  </div>

  )
}

export default TextEditor