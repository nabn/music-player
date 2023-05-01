import { FlashList } from "@shopify/flash-list";
import { useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Track, useMatchingTracks } from "../hooks/useMatchingTracks";
import { Empty } from "./Empty";
import { NowPlaying } from "./NowPlaying";
import SearchBar from "./SearchBar";
import { TrackListItem } from "./Track";

export const TracksList = () => {
  const [query, setQuery] = useState("");
  const [selectedTrack, setSelectedTrack] = useState<Track>();

  const {
    isLoading,
    error,
    data: songs,
    fetchNextPage,
  } = useMatchingTracks(query);

  const handleSearch = (query: string) => setQuery(query);
  const handlePreview = (track: Track) => {
    setSelectedTrack(track);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar handleSearch={handleSearch} />

      <FlashList
        data={songs?.pages[0]}
        renderItem={({ item }) => (
          <TrackListItem track={item} onPress={handlePreview} />
        )}
        keyExtractor={(item) => item.trackId}
        estimatedItemSize={100}
        onEndReachedThreshold={0.8}
        onEndReached={fetchNextPage}
        ListEmptyComponent={
          <Empty state={isLoading ? "loading" : error ? "error" : "idle"} />
        }
      />

      {selectedTrack && (
        <NowPlaying track={selectedTrack} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
