import { useState } from "react"
import { SafeAreaView, StyleSheet } from "react-native"
import { Box, Text } from "../design-system"
import { useNowPlaying } from "../hooks/useNowPlaying"
import { Track } from "../types/Track"
import { Player, PlayPauseButton, ProgressBar } from "./Player"
import { Results } from "./Results"
import { SearchBar } from "./SearchBar"
import * as Haptics from "expo-haptics"

export const TracksList = () => {
  const [query, setQuery] = useState("")
  const [playerOpen, setPlayerOpen] = useState(false)

  const { state, selectedTrack, selectTrack, play, pause } = useNowPlaying()

  const handleSearch = (query: string) => {
    setQuery(query)
  }
  const handlePreview = (track: Track) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
    selectTrack(track)
    setPlayerOpen(true)
  }
  const dismissPlayer = () => {
    if (playerOpen) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      setPlayerOpen(false)
    }
  }

  const isPlaying = state.name === "playing"
  const playingTrackId = isPlaying ? state.trackId : undefined

  const nowPlayingTrackProgress =
    state.name === "idle" || selectedTrack?.trackId !== state.trackId
      ? 0
      : state.progress

  return (
    <Box flex={1}>
      <SafeAreaView style={styles.wrapper}>
        <SearchBar handleSearch={handleSearch} />
        <Results
          query={query}
          handlePreview={handlePreview}
          playingTrackId={playingTrackId}
          onScroll={dismissPlayer}
          isPlaying={isPlaying}
        />

        {playerOpen && selectedTrack ? (
          <Player handleClose={dismissPlayer}>
            <Text color="$white" variant="title" size="2xl">
              {selectedTrack.trackName}
            </Text>

            <Box py="$2">
              {state.name === "buffering" ? (
                <PlayPauseButton variant="buffering" onPress={pause} />
              ) : state.name === "playing" &&
                playingTrackId === selectedTrack.trackId ? (
                <PlayPauseButton variant="pause" onPress={pause} />
              ) : (
                <PlayPauseButton variant="play" onPress={play} />
              )}
            </Box>

            <ProgressBar progress={nowPlayingTrackProgress} />
          </Player>
        ) : null}
      </SafeAreaView>
    </Box>
  )
}
const styles = StyleSheet.create({
  wrapper: { flex: 1 },
})
