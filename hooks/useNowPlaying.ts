import { Audio, AVPlaybackStatus } from "expo-av"
import { useEffect, useState } from "react"
import { Track } from "../types/Track"

type PlaybackStatus = AVPlaybackStatus & { trackId: Track["trackId"] }
type State =
  | { name: "idle" }
  | { name: "playing"; status: PlaybackStatus }
  | { name: "paused"; status: PlaybackStatus }

const deriveState = (status?: PlaybackStatus): State => {
  if (!status || !status.isLoaded) {
    return { name: "idle" }
  }

  if (status.isPlaying) {
    return { name: "playing", status }
  }
  return { name: "paused", status }
}

export type NowPlaying = {
  state: State
  selectTrack: (track: Track) => void
  selectedTrack?: Track
  play: () => void
  pause: () => void
}
export const useNowPlaying = (): NowPlaying => {
  const [sound, setSound] = useState<Audio.Sound>()
  const [status, setStatus] = useState<PlaybackStatus>()
  const [selectedTrack, setSelectedTrack] = useState<Track>()

  const state = deriveState(status)

  const play: NowPlaying["play"] = async () => {
    try {
      const selectedTrackIsPlaying =
        state.name === "playing" &&
        state.status.trackId === selectedTrack?.trackId

      if (!selectedTrack || selectedTrackIsPlaying) {
        return
      }

      const selectedTrackIsPaused =
        state.name === "paused" &&
        state.status.trackId === selectedTrack?.trackId

      if (selectedTrackIsPaused) {
        await sound?.playAsync()
        return
      }

      if (state.name === "playing") {
        await sound?.unloadAsync()
      }

      const { sound: newSound } = await Audio.Sound.createAsync({
        uri: selectedTrack.previewUrl,
      })
      setSound(newSound)
      newSound.setOnPlaybackStatusUpdate((status) =>
        setStatus({ ...status, trackId: selectedTrack.trackId }),
      )
      newSound.playAsync()
    } catch (e) {
      console.error(e)
    }
  }
  const pause = () => {
    sound?.pauseAsync()
  }

  const selectTrack = (track: Track) => setSelectedTrack(track)

  // Cleanup
  useEffect(() => {
    return () => {
      sound?.unloadAsync()
    }
  }, [sound])

  return { state, play, pause, selectedTrack, selectTrack }
}
