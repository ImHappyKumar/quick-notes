import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import UpdateNote from './UpdateNote';
import DeleteNote from './DeleteNote';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes, updateNote, deleteNote } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
    }
    else {
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);

  // UPDATE NOTE
  const openUpdateModalRef = useRef(null);
  const closeUpdateModalRef = useRef(null);
  const [currentNote, setCurrentNote] = useState({ currentId: '', currentTitle: '', currentDescription: '', currentTag: '' });

  const openUpdateModal = (currentNote) => {
    openUpdateModalRef.current.click();
    setCurrentNote({ currentId: currentNote._id, currentTitle: currentNote.title, currentDescription: currentNote.description, currentTag: currentNote.tag });
  }

  const handleUpdateNote = () => {
    updateNote(currentNote.currentId, currentNote.currentTitle, currentNote.currentDescription, currentNote.currentTag);
    closeUpdateModalRef.current.click();
    setCurrentNote({ currentId: '', currentTitle: '', currentDescription: '', currentTag: '' })
  }

  // DELETE NOTE
  const openDeleteModalRef = useRef(null);
  const closeDeleteModalRef = useRef(null);
  const [deleteNoteId, setDeleteNoteId] = useState('');

  const openDeleteModal = (id) => {
    openDeleteModalRef.current.click();
    setDeleteNoteId(id);
  }

  const handleDeleteNote = () => {
    deleteNote(deleteNoteId);
    closeDeleteModalRef.current.click();
    setDeleteNoteId('');
  }

  return (
    <>
      {localStorage.getItem('token') && <div className="row">
        <div className="col-4 pe-5" style={{ borderRight: '1px solid gray' }}>
          <h4>New Note</h4>
          <AddNote />
        </div>

        {/* Button To Launch Update Modal */}
        <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#updateModal" ref={openUpdateModalRef}>
          Launch Update Modal
        </button>
        {/* Update Modal */}
        <UpdateNote currentNote={currentNote} setCurrentNote={setCurrentNote} handleUpdateNote={handleUpdateNote} closeUpdateModalRef={closeUpdateModalRef} />

        {/* Button To Launch Delete Modal */}
        <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#deleteModal" ref={openDeleteModalRef}>
          Launch Delete Modal
        </button>
        {/* Delete Modal */}
        <DeleteNote deleteNoteId={deleteNoteId} handleDeleteNote={handleDeleteNote} closeDeleteModalRef={closeDeleteModalRef} />

        <div className="col-8 ps-5">
          <h4>My Notes</h4>
          <div className="row">
            <div className="my-2">
              {notes.length === 0 && 'No notes to display. Begin your creative journey by adding a new note.'}
            </div>
            {notes.map((note) => {
              return <NoteItem key={note._id} note={note} openUpdateModal={openUpdateModal} openDeleteModal={openDeleteModal} />
            })}
          </div>
        </div>
      </div>}
    </>
  )
}

export default Notes;