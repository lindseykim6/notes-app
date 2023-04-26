import React, { useState } from 'react';

// eslint-disable-next-line react/function-component-definition
const AddedNote = (props) => {
  const [titleName, setTitle] = useState('');
  const [textName, setText] = useState('');

  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const onTextChange = (event) => {
    setText(event.target.value);
  };

  function onAddNote() {
    props.onAddNote(titleName, textName);
  }

  return (
    <div className="addNote">
      <h1 className="header"> Add Note </h1>
      <div className="title">
        <span>Title</span>
        <input value={titleName} onChange={onTitleChange} />
      </div>
      <div className="text">
        <span> Text </span>
        <input value={textName} onChange={onTextChange} />
      </div>
      <button type="button" className="button" onClick={onAddNote}>Add Note</button>
    </div>
  );
};

export default AddedNote;
