import React from 'react';
import Note from './note';

// eslint-disable-next-line react/function-component-definition
const NoteList = (props) => {
  const noteItems = Object.entries(props.notes).map(([id, note]) => {
    return <li className="note"><Note note={note} onEditSelect={props.onEditSelect} onDeleteSelect={props.onDeleteSelect} onDragSelect={props.onDragSelect} /></li>;
  });
  return (
    <ul className="notelist">
      {noteItems}
    </ul>
  );
};

export default NoteList;
