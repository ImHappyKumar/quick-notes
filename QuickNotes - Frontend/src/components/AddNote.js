import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import noteContext from '../context/noteContext';

const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const { title, description, tag } = data;
        addNote(title, description, tag);
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" {...register("title", { 
                        required: "Title is required",
                        validate: {
                            noWhiteSpace: value => value.trim() !== '' || 'Title cannot be empty'
                        }
                    })} />
                    {errors.title && <p className='text-danger'>{errors.title.message}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea type="text" className="form-control" id="description" name="description" {...register("description", {
                        required: "Description is required",
                        validate: {
                            noWhiteSpace: value => value.trim() !== '' || 'Description cannot be empty'
                        }
                    })} />
                    {errors.description && <p className='text-danger'>{errors.description.message}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" {...register("tag")} />
                </div>
                <button type="submit" className="btn btn-primary w-100">Add Note</button>
            </form>
        </div>
    );
};

export default AddNote;
