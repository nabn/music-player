import { useState } from "react"
import { SafeAreaView, StyleSheet } from "react-native"
import { Box, Text } from "../design-system"
import { useNowPlaying } from "../hooks/useNowPlaying"
import { Track } from "../types/Track"
import { Player, PlayPauseButton, ProgressBar } from "./Player"
import { Results } from "./Results"
import { SearchBar } from "./SearchBar"

export const TracksList = () => {
  const [query, setQuery] = useState("")
  const [playerOpen, setPlayerOpen] = useState(false)

  const { state, selectedTrack, selectTrack, play, pause } = useNowPlaying()

  const handleSearch = (query: string) => setQuery(query)
  const handlePreview = (track: Track) => {
    selectTrack(track)
    setPlayerOpen(true)
  }
  const dismissPlayer = () => setPlayerOpen(false)

  const isPlaying = state.name === "playing"
  const playingTrackId = isPlaying ? state.status.trackId : undefined

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
              {state.name === "playing" &&
              playingTrackId === selectedTrack.trackId ? (
                <PlayPauseButton variant="pause" onPress={pause} />
              ) : (
                <PlayPauseButton variant="play" onPress={play} />
              )}
            </Box>

            {state.name === "idle" ? null : (
              <ProgressBar progress={state.progress} />
            )}
          </Player>
        ) : null}
      </SafeAreaView>
    </Box>
  )
}
const styles = StyleSheet.create({
  wrapper: { flex: 1 },
})
