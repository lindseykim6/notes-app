import React from 'react';
import NoteList from './notelist';
import Search from './search';

// eslint-disable-next-line react/function-component-definition
const Board = (props) => {
  return (
    <div className="board">
      <div>
        <Search searchedNotes={props.searchedNotes} onSearchSelect={props.onSearchSelect} />
      </div>
      <div>
        <NoteList notes={props.notes} onEditSelect={props.onEditSelect} onDeleteSelect={props.onDeleteSelect} onDragSelect={props.onDragSelect} />
      </div>
    </div>
  );
};

export default Board;
