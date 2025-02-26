
function TrackList(props) {
    const tracks = props.trackList.map((track) => (
        <div key={track._id} className="track-item">
            <p>{track.title} by {track.artist}</p>
                <button onClick={() => {props.updateSelected(track)}}>Play</button>
                <button onClick={() => props.handleFormView(track)}>Edit</button>
                <button onClick={() => {props.handleRemoveTrack(track._id)}}>Delete</button>
        </div>
    ));



    return (
        <div className="sidebar-container">
            <h1>Tracks List</h1>
            {!props.trackList.length ? <h2>No Tracks Yet!</h2> : 
            <ul>{tracks}</ul>}
            <button onClick={props.handleFormView}>
                {props.isFormOpen ? 'Close Form' : 'Add New Track'}
            </button>
        </div>
    );
}

export default TrackList;