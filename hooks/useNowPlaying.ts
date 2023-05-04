import { Audio, AVPlaybackStatus } from "expo-av"
import { useEffect, useState } from "react"
import { Track } from "../types/Track"

type PlaybackStatus = AVPlaybackStatus & { trackId: Track["trackId"] }
export type NowPlaying =
  | { name: "idle" }
  | { name: "playing"; status: PlaybackStatus; progress: number }
  | { name: "paused"; status: PlaybackStatus; progress: number }

const deriveState = (status?: PlaybackStatus): NowPlaying => {
  if (!status || !status.isLoaded) {
    return { name: "idle" }
  }

  const progress = status.durationMillis
    ? Math.floor((status.positionMillis / status.durationMillis) * 100)
    : 0

  return { name: status.isPlaying ? "playing" : "paused", status, progress }
}

export const useNowPlaying = () => {
  const [sound, setSound] = useState<Audio.Sound>()
  const [status, setStatus] = useState<PlaybackStatus>()
  const [selectedTrack, setSelectedTrack] = useState<Track>()

  const state = deriveState(status)

  const play = async () => {
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
