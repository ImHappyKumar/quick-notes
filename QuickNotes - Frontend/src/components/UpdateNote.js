import React, { useState } from 'react';

const UpdateNote = (props) => {
    const [validationErrors, setValidationErrors] = useState({});

    const { currentNote, setCurrentNote, handleUpdateNote, closeUpdateModalRef } = props;

    const handleOnChange = (e) => {
        setCurrentNote({ ...currentNote, [e.target.name]: e.target.value });
        setValidationErrors({ ...validationErrors, [e.target.name]: '' });
    }

    const validateForm = () => {
        const errors = {};

        if (currentNote.currentTitle === '') {
            errors.currentTitle = 'Title is required';
        }
        else if (currentNote.currentTitle.trim() === '') {
            errors.currentTitle = 'Title cannot be empty';
        }

        if (currentNote.currentDescription === '') {
            errors.currentDescription = 'Description is required';
        }
        else if (currentNote.currentDescription.trim() === '') {
            errors.currentDescription = 'Description cannot be empty';
        }

        if (Object.keys(errors).length === 0) {
            return true;
        }
        else {
            setValidationErrors(errors);
            return false;
        }
    }

    const handleOnClick = () => {
        if (validateForm()) {
            handleUpdateNote();
        }
    }

    const handleCloseUpdateModal = () => {
        setValidationErrors({});
    }

    return (
        <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="updateModalLabel">Update Note</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseUpdateModal}></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" className="form-control" id="currentTitle" name="currentTitle" value={currentNote.currentTitle} onChange={handleOnChange} required />
                                {validationErrors.currentTitle && <p className="text-danger">{validationErrors.currentTitle}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea type="text" className="form-control" id="currentDescription" name="currentDescription" value={currentNote.currentDescription} onChange={handleOnChange} required></textarea>
                                {validationErrors.currentDescription && <p className="text-danger">{validationErrors.currentDescription}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tag" className="form-label">Tag</label>
                                <input type="text" className="form-control" id="currentTag" name="currentTag" value={currentNote.currentTag} onChange={handleOnChange} />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCloseUpdateModal} ref={closeUpdateModalRef}>Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={handleOnClick}>Update Note</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateNote;