import { useState, useEffect } from 'react'
import './App.css'
import * as trackService from './services/trackService';
import NowPlaying from './components/NowPlaying '
import TrackList from './components/TrackList'
import TrackForm from './components/TrackForm'

function App() {

  const [trackList, setTrackList] = useState([])

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

  return (
    <>
      <h1>Hello</h1>
      <TrackList trackList={trackList} />
    
    </>
  )

}

export default App
