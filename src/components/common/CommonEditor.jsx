// // CommonComponent.jsx
// import React, { useState, useRef, useMemo } from 'react';
// import JoditEditor from 'jodit-react';

// const CommonEditor = ({ placeholder, initialValue, onContentChange }) => {
//   const editor = useRef(null);
//   const [content, setContent] = useState(initialValue || '');

//   const config = useMemo(
//     () => ({
//       readonly: false,
//       placeholder: placeholder || 'Start typing...',
//     }),
//     [placeholder]
//   );

//   const handleContentChange = (newContent) => {
//     setContent(newContent);
//     onContentChange(newContent);
//   };

//   return (
//     <JoditEditor
//       ref={editor}
//       value={content}
//       config={config}
//       tabIndex={1}
//       onBlur={(newContent) => setContent(newContent)}
//       onChange={handleContentChange}
//     />
//   );
// };

// export default CommonEditor;



import JoditEditor from 'jodit-react';
import React, { useRef } from 'react';

const CommonEditor = ({ setEditorData, editorData }) => {
  const editor = useRef(null);
  const handleEditorChange = (data) => {
    setEditorData(data);
  };

  return (
    <JoditEditor
      ref={editor}
      config={{
        minHeight: 350,
        uploader: {
        insertImageAsBase64URI: true
        }
      }}
      value={editorData}
      onBlur={(newContent) => handleEditorChange(newContent)}
    />
  );
};

export default CommonEditor;