import { useState, useEffect } from 'react'
import './App.css'
import * as trackService from './services/trackService';
import NowPlaying from './components/NowPlaying '
import TrackList from './components/TrackList'
import TrackForm from './components/TrackForm'

function App() {

  const [trackList, setTrackList] = useState([])
  const [selected, setSelected] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    async function fetchTracks() {
      try {
        const tracks = await trackService.index()

        if (tracks.error) {
          throw new Error(tracks.error)
        }
        setTrackList(tracks) //form the service
      } catch (error) {
        console.log(error);
      }
    }
    fetchTracks()
  }, [])

  function updateSelected(track) {
    setSelected(track);
  }

  function handleFormView(track) {
    // if (!track.title) setSelected(null);
    // setIsFormOpen(!isFormOpen);
    setSelected(track);
    setIsFormOpen(!isFormOpen);
  }

  //for creating new Track
  async function handleAddTrack(formData) {
    try {
      const newTrack = await trackService.create(formData);

      if (newTrack.error) {
        throw new Error(newTrack.error);
      }

      setTrackList([...trackList, newTrack]);
      setIsFormOpen(false);
    } catch (error) {
      // Log the error to the console
      console.log(error);
    }
  }

  //for updating
  async function handleUpdateTrack(id, formData) {
    try {
      const updatedTrack = await trackService.update(id, formData)

      if (updatedTrack.error) throw new Error(updatedTrack.error)

      const updatedList = trackList.map(track => {
        // If the id of the current track is not the same as the updated track's id, return the existing track. If the id's match, instead return the updated track.
        if (track._id === updatedTrack._id) {
          return updatedTrack
        }
        return track
      })

      setSelected(updatedTrack)
      setTrackList(updatedList)
      setIsFormOpen(false)

    } catch (error) {
      console.log(error)
    }
  }

  async function handleRemoveTrack(id) {
    try {
      const response = await trackService.deleteTrack(id);

      if (response.error) {
        throw new Error(response.error);
      }

      setTrackList(trackList.filter((track) => track._id !== id));
      setSelected(null);
      setIsFormOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <TrackList
        trackList={trackList}
        updateSelected={updateSelected}
        handleUpdateTrack={handleUpdateTrack}
        handleRemoveTrack={handleRemoveTrack}
        handleFormView={handleFormView} 
        isFormOpen={isFormOpen}
      />
      {/* if true show the form, if false show details */}
      {isFormOpen ? (
        <TrackForm selected={selected} handleAddTrack={handleAddTrack} handleUpdateTrack={handleUpdateTrack} />
      ) : (
        <NowPlaying selected={selected} handleFormView={handleFormView} />
      )}
    </>
  )

}

export default App
