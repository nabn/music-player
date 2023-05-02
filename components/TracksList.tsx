import { useState } from "react"
import { StyleSheet, SafeAreaView } from "react-native"
import { Box } from "../design-system"
import { Track } from "../hooks/Track"
import { NowPlaying } from "./NowPlaying"
import { Results } from "./Results"
import { SearchBar } from "./SearchBar"

export const TracksList = () => {
  const [query, setQuery] = useState("")
  const [selectedTrack, setSelectedTrack] = useState<Track>()

  const handleSearch = (query: string) => setQuery(query)
  const handlePreview = (track: Track) => setSelectedTrack(track)
  const dismissNowPlaying = () => {
    setSelectedTrack(undefined)
  }

  return (
    <Box flex={1}>
      <SafeAreaView style={styles.wrapper}>
        <SearchBar handleSearch={handleSearch} />
        <Results query={query} handlePreview={handlePreview} />
      </SafeAreaView>
      {selectedTrack && (
        <NowPlaying track={selectedTrack} handleClose={dismissNowPlaying} />
      )}
    </Box>
  )
}
const styles = StyleSheet.create({
  wrapper: { flex: 1 },
})
