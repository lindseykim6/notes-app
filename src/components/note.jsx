import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Draggable from 'react-draggable';

// eslint-disable-next-line react/function-component-definition
const Note = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [titleName, setTitle] = useState('');
  const [textName, setText] = useState('');

  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const onTextChange = (event) => {
    setText(event.target.value);
  };

  useEffect(() => {
    setTitle(props.note.title);
    setText(props.note.text);
  }, []);

  function render() {
    setIsEditing(true);
  }
  function render2() {
    setIsEditing(false);
  }

  function onEditSelect() {
    // props.onDeleteSelect(props.notes.id);
    props.onEditSelect(props.id, titleName, textName);
    render2();
  }

  function onDeleteSelect() {
    // props.onDeleteSelect(props.notes.id);
    props.onDeleteSelect(props.id);
  }

  const handleDrag = (e, data) => {
    // props.onDragSelect(props.notes.id, data.x, data.y);
    props.onDragSelect(props.id, data.x, data.y);
  };

  return (
    <Draggable
      handle=".handle"
      grid={[25, 25]} // snapping to grid pixels
      defaultPosition={{ x: 40, y: 40 }}
      position={{
        x: props.note.x, y: props.note.y, width: 200, height: 200,
      }}
      onDrag={handleDrag}

    >
      <div className="noteDetail">
        <span className="handle"><i className="fa-solid fa-hand-fist" role="cell" /></span>
        <div className="title">
          { /* Got idea from https://stackoverflow.com/questions/67686771/how-to-show-hide-elements-on-boolean-value-on-react-js */ }
          { /* Sets the component based on isEditing */ }
          {isEditing && (<span>Title</span>)}
          {isEditing && (<input value={titleName} onChange={onTitleChange} />) }
          {!isEditing && (<p className="ourTitle"> {props.note.title} </p>
          ) }
        </div>
        <div className="text">
          {isEditing && (<span>Text</span>)}
          {isEditing && (<input value={textName} onChange={onTextChange} />) }
          {!isEditing && (<div className="textbox"> {props.note.text} </div>) }
        </div>
        <div>
          {!isEditing && <button type="button" className="button" onClick={render}> Edit </button>}
          {isEditing && <button type="button" className="button" onClick={onEditSelect}> Save </button>}
          <div className="delete"><i className="fa-solid fa-trash" role="cell" onClick={onDeleteSelect} /></div>
        </div>
      </div>
    </Draggable>
  );
};
//  }

export default Note;
