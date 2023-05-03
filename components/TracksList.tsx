import { useState } from "react"
import { SafeAreaView, StyleSheet } from "react-native"
import { Box, Text } from "../design-system"
import { useNowPlaying } from "../hooks/useNowPlaying"
import { Track } from "../types/Track"
import { getProgress, Player, PlayPauseButton, ProgressBar } from "./Player"
import { Results } from "./Results"
import { SearchBar } from "./SearchBar"

export const TracksList = () => {
  const [query, setQuery] = useState("")
  const [playerOpen, setPlayerOpen] = useState(false)

  const nowPlaying = useNowPlaying()
  const { state } = nowPlaying
  const progress = getProgress(state, nowPlaying.selectedTrack)

  const handleSearch = (query: string) => setQuery(query)
  const handlePreview = (track: Track) => {
    nowPlaying.selectTrack(track)
    setPlayerOpen(true)
  }
  const dismissPlayer = () => setPlayerOpen(false)

  const isPlaying =
    state.name !== "idle" &&
    !!(state.status?.isLoaded && state.status.isPlaying)

  return (
    <Box flex={1}>
      <SafeAreaView style={styles.wrapper}>
        <SearchBar handleSearch={handleSearch} />
        <Results
          query={query}
          handlePreview={handlePreview}
          selectedTrack={nowPlaying.selectedTrack}
          onScroll={dismissPlayer}
          isPlaying={isPlaying}
        />

        {playerOpen && nowPlaying.selectedTrack ? (
          <Player handleClose={dismissPlayer}>
            <Text color="$blueGray50" variant="title" size="2xl" px="$4">
              {nowPlaying.selectedTrack.trackName}
            </Text>

            <Box py="$2">
              {state.name === "idle" ||
              state.status.trackId !== nowPlaying.selectedTrack.trackId ? (
                <PlayPauseButton
                  variant="play"
                  onPress={() => nowPlaying.play()}
                />
              ) : state.name === "paused" ? (
                // Resume
                <PlayPauseButton
                  variant="play"
                  onPress={() => nowPlaying.play()}
                />
              ) : isPlaying ? (
                // Pause
                <PlayPauseButton
                  variant="pause"
                  onPress={() => nowPlaying.pause()}
                />
              ) : (
                // Play
                <PlayPauseButton
                  variant="play"
                  onPress={() => nowPlaying.play()}
                />
              )}
            </Box>

            <ProgressBar progress={progress} />
          </Player>
        ) : null}
      </SafeAreaView>
    </Box>
  )
}
const styles = StyleSheet.create({
  wrapper: { flex: 1 },
})
