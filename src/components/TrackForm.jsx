import { useState, useEffect } from 'react';

function TrackForm  (props){
    const initialState = {
        title: '',
        artist: '',
    }

    // formData state to control the form
    const [formData, setFormData] = useState(props.selected ? props.selected : initialState);

    // handleChange function to update formData state
    function handleChange(evt) {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    }

    function handleSubmitForm(evt) {
        evt.preventDefault();
        if (props.selected) {
            // Don't forget to pass both formData and the ._id!
            props.handleUpdateTrack(props.selected._id, formData);
        } else {
            props.handleAddTrack(formData);
        }
        setFormData(initialState);
    }


    return (
        <div className="form-container">
            <form onSubmit={handleSubmitForm}>
                <label htmlFor="title"> Title </label>
                <input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="artist"> Artist </label>
                <input
                    id="artist"
                    name="artist"
                    value={formData.artist}
                    onChange={handleChange}
                />

                <button type="submit"> {props.selected ? 'Update Track' : 'Add New Track'} </button>
            </form>
        </div>
    );
};

export default TrackForm ;