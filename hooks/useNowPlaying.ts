import { Audio, AVPlaybackStatus } from "expo-av"
import { useEffect, useState } from "react"
import { Track } from "../types/Track"

type PlaybackStatus = AVPlaybackStatus & { trackId: Track["trackId"] }
export type NowPlaying =
  | { name: "idle" }
  | { name: "buffering"; trackId: Track["trackId"] }
  | { name: "playing"; progress: number; trackId: Track["trackId"] }
  | { name: "paused"; progress: number; trackId: Track["trackId"] }

const deriveState = (status?: PlaybackStatus): NowPlaying => {
  if (!status || !status.isLoaded) {
    return { name: "idle" }
  }

  if (status.isBuffering) {
    return { name: "buffering", trackId: status.trackId }
  }

  const progress = status.durationMillis
    ? Math.floor((status.positionMillis / status.durationMillis) * 100)
    : 0

  return {
    name: status.isPlaying ? "playing" : "paused",
    trackId: status.trackId,
    progress,
  }
}

export const useNowPlaying = () => {
  const [sound, setSound] = useState<Audio.Sound>()
  const [status, setStatus] = useState<PlaybackStatus>()
  const [selectedTrack, setSelectedTrack] = useState<Track>()

  const state = deriveState(status)

  const play = async () => {
    try {
      const selectedTrackIsPlaying =
        state.name === "playing" && state.trackId === selectedTrack?.trackId

      if (!selectedTrack || selectedTrackIsPlaying) {
        return
      }

      const selectedTrackIsPaused =
        state.name === "paused" && state.trackId === selectedTrack?.trackId

      if (selectedTrackIsPaused) {
        await sound?.playAsync()
        return
      }

      if (state.name === "playing") {
        await sound?.unloadAsync()
      }

      // Ensure sound output when ringer is off
      await Audio.setAudioModeAsync({ playsInSilentModeIOS: true })

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
