import React, { useState, useEffect } from 'react';
/* eslint-disable import/no-extraneous-dependencies */
// import { produce } from 'immer';
import * as firebasedb from '../services/datastore';
import Board from './board';
import AddedNote from './addednote';

function App(props) {
  let newList = {};
  const [count, setCount] = useState(1);
  const [defNotes, setDefaultNotes] = useState({});
  const [notes, setNotes] = useState({});

  useEffect(() => {
    // eslint-disable-next-line no-shadow
    firebasedb.onNotesValueChange((notes) => {
      setNotes(notes);
    });
  }, []);

  const handleEditSelect = (id, newTitle, newText) => {
    const updatedFields = { title: newTitle, text: newText };
    firebasedb.updateNote(id, updatedFields);
    // setNotes(
    //   produce((draft) => {
    //     draft[id] = { ...draft[id], ...updatedFields };
    //   }),
    // );
  };

  const handleDeleteSelect = (id) => {
    firebasedb.removeNote(id);
    // setNotes(
    //   produce((draft) => {
    //     delete draft[id];
    //   }),
    // );
  };

  const handleDragSelect = (id, xPos, yPos) => {
    firebasedb.dragNote(id, { x: xPos, y: yPos });
    // setNotes(
    //   produce((draft) => {
    //     draft[id] = { ...draft[id], ...{ x: xPos, y: yPos } };
    //   }),
    // );
  };

  const handleSearchSelect = (searchSelect) => {
    Object.entries(defNotes).map(([id, note]) => {
      if (note.title.startsWith(searchSelect)) {
        newList[id] = note;
      }
      return newList;
    });
    console.log(newList);
    setNotes(newList);
    newList = {};
  };

  //   const handleFormatSelect = (selectedEdit) => {
  //     setNotes(
  //     );
  //   };

  const newNote = {
    id: count,
    title: '',
    text: '',
    x: 0,
    y: 0,
  };

  const setAllNotes = (newTitle, newText) => {
    newNote.title = newTitle;
    newNote.text = newText;
    // const news = { ...notes, [count]: newNote };
    // setNotes(news);

    firebasedb.addNote(newNote);
    setCount(count + 1);
    setDefaultNotes(notes);
  };

  return (
    <div className="app">
      {console.log(notes)}
      <Board
        notes={notes}
        onEditSelect={(id, newTitle, newText) => handleEditSelect(id, newTitle, newText)}
        onSearchSelect={(text) => handleSearchSelect(text)}
        onDeleteSelect={(id) => handleDeleteSelect(id)}
        // onFormatSelect={(selection) => handleFormatSelect(selection)}
        onDragSelect={(id, x, y) => handleDragSelect(id, x, y)}
      />
      <AddedNote className="addNote" newNote={newNote} onAddNote={setAllNotes} />
    </div>
  );
}

export default App;
