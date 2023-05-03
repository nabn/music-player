import { Track } from "../types/Track"
import { NowPlaying } from "../hooks/useNowPlaying"
export const getProgress = (state: NowPlaying, selectedTrack?: Track) =>
  (state.name === "playing" || state.name === "paused") &&
  state.status.trackId === selectedTrack?.trackId &&
  state.status.isLoaded &&
  state.status.durationMillis
    ? Math.floor(
        (state.status.positionMillis / state.status.durationMillis) * 100,
      )
    : 0
