import NoteContext from './noteContext';
import { useState } from 'react';

const NoteState = (props) => {
  const host = process.env.REACT_APP_HOST;
  const [notes, setNotes] = useState([]);

  // Get all notes
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });
      if (response.ok) {
        const json = await response.json();
        setNotes(json.data);
      } else {
        console.log('Failed to fetch notes.');
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  }

  // Add a note
  const addNote = async (title, description, tag) => {
    // If tag is not entered or empty, use default tag
    if (!tag || tag.trim() === '') {
      tag = 'General';
    }

    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag })
      });

      if (response.ok) {
        const json = await response.json();
        setNotes(notes.concat(json.data));
      } else {
        console.log('Failed to add note.');
      }
    } catch (error) {
      console.error('Error adding note:', error);
    }
  }

  // Update a Note
  const updateNote = async (id, title, description, tag) => {
    // If tag is not entered or empty, use default tag
    if (!tag || tag.trim() === '') {
      tag = 'General';
    }

    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag })
      });

      if (response.ok) {
        const updatedNotes = notes.map((note) => {
          if (note._id === id) {
            return { ...note, title, description, tag };
          }
          return note;
        });
        setNotes(updatedNotes);
      } else {
        console.log('Failed to update note.');
      }
    } catch (error) {
      console.error('Error updating note:', error);
    }
  }

  // Delete a Note
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });

      if (response.ok) {
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      } else {
        console.log('Failed to delete note.');
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  }

  return (
    <NoteContext.Provider value={{ notes, getNotes, addNote, updateNote, deleteNote }}>
      {props.children}
    </NoteContext.Provider>
  );
}

export default NoteState;
