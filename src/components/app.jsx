/* eslint-disable no-shadow */
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
    firebasedb.onNotesValueChange((notes) => {
      setNotes(notes);
    });
    firebasedb.onDefNotesValueChange((defNotes) => {
      setDefaultNotes(defNotes);
    });
  }, []);

  const handleEditSelect = (id, newTitle, newText) => {
    const updatedFields = { title: newTitle, text: newText };
    firebasedb.updateNote(id, updatedFields);
    firebasedb.updateDefNote(id, updatedFields);
    // setNotes(
    //   produce((draft) => {
    //     draft[id] = { ...draft[id], ...updatedFields };
    //   }),
    // );
  };

  const handleDeleteSelect = (id) => {
    firebasedb.removeNote(id);
    firebasedb.removeDefNote(id);
    // setNotes(
    //   produce((draft) => {
    //     delete draft[id];
    //   }),
    // );
  };

  const handleDragSelect = (id, xPos, yPos) => {
    const updatedFields = { x: xPos, y: yPos };
    firebasedb.dragNote(id, updatedFields);
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
    firebasedb.search(newList);
    newList = {};
  };

  //   const handleFormatSelect = (selectedEdit) => {
  //     setNotes(
  //     );
  //   };

  const setAllNotes = (newTitle, newText) => {
    // const news = { ...notes, [count]: newNote };
    // setNotes(news);
    setCount(count + 1);
    const newNote = {
      // id: count,
      title: newTitle,
      text: newText,
      x: 0,
      y: 0,
      zindex: count * 10,
    };
    firebasedb.addNote(newNote);
    firebasedb.addDefNote(newNote);
  };

  return (
    <div className="app">
      <Board
        notes={notes}
        onEditSelect={(id, newTitle, newText) => handleEditSelect(id, newTitle, newText)}
        onSearchSelect={(text) => handleSearchSelect(text)}
        onDeleteSelect={(id) => handleDeleteSelect(id)}
        // onFormatSelect={(selection) => handleFormatSelect(selection)}
        onDragSelect={(id, x, y) => handleDragSelect(id, x, y)}
      />
      <AddedNote className="addNote" onAddNote={setAllNotes} />
    </div>
  );
}

export default App;
