import React from 'react';
import { FiEdit, FiTrash2 } from "react-icons/fi";

const NoteItem = (props) => {
    const { note, openUpdateModal, openDeleteModal } = props;
    return (
        <div className="col-md-6 p-2">
            <div className="card">
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <h5 className="card-title text-truncate" style={{maxWidth: '80%'}}>{note.title}</h5>
                        <div className="icons">
                            <i className="mx-1" style={{ cursor: 'pointer' }} onClick={() => { openUpdateModal(note) }}><FiEdit /></i>
                            <i className="mx-1" style={{ cursor: 'pointer' }} onClick={() => { openDeleteModal(note._id) }}><FiTrash2 /></i>
                        </div>
                    </div>
                    <p className="card-text text-truncate">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem;