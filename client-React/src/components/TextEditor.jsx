import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

function TextEditor() {
  const quillRef = useRef(null);

  useEffect(() => {
    if (quillRef.current) {
      new Quill(quillRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['link', 'blockquote', 'code-block'],
            [{ list: 'ordered'}, { list: 'bullet' }]
          ]
        }
      });
    }
  }, []);

  return (
    <div>
      <div ref={quillRef} style={{ height: '200px' }}></div>
    </div>
  );
}

export default TextEditor;
