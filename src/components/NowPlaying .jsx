

function NowPlaying(props){
    if (!props.selected)
        return (
          <div>
            <h1>NO Track in Play</h1>
          </div>
        );
    return(
         // return statement if props.selected has a truthy value
    <div className="details-container">
    <h1>Now Playing:</h1>
    <h2>title: {props.selected.title}</h2>
    <h2>
      Artist: {props.selected.artist} 
    </h2>
  </div>
    )
}

export default NowPlaying  ;