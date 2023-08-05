import React from 'react';

const DeleteNote = (props) => {
    const { deleteNoteId, handleDeleteNote, closeDeleteModalRef } = props;

    const handleOnClick = () => {
        handleDeleteNote();
    }

    return (
        <>
            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="deleteModalLabel">Delete Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this note?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closeDeleteModalRef}>Cancel</button>
                            <button disabled={!deleteNoteId} type="button" className="btn btn-primary" onClick={handleOnClick}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default DeleteNote;