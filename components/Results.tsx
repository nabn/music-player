import { FlashList } from "@shopify/flash-list"
import { useMatchingTracks } from "../hooks/useMatchingTracks"
import { Track } from "../types/Track"
import { Empty } from "./Empty"
import { TrackListItem } from "./TrackListItem"

type Props = {
  query: string
  selectedTrack?: Track
  handlePreview: (track: Track) => void
  onScroll?: () => void
  isPlaying: boolean
}
export const Results = ({
  query,
  selectedTrack,
  handlePreview,
  onScroll,
  isPlaying,
}: Props) => {
  const {
    data: songs,
    isLoading,
    error,
    fetchNextPage,
  } = useMatchingTracks(query)

  const data = songs?.pages[0] ?? ([] as Track[])
  return (
    <FlashList
      data={data}
      onScrollBeginDrag={onScroll}
      renderItem={({ item }) => (
        <TrackListItem
          track={item}
          onPress={handlePreview}
          isPlaying={isPlaying && selectedTrack?.trackId === item.trackId}
        />
      )}
      extraData={{ selectedTrack, isPlaying }}
      keyExtractor={(item) => item.trackId.toString()}
      estimatedItemSize={100}
      onEndReachedThreshold={0.8}
      onEndReached={fetchNextPage}
      contentContainerStyle={selectedTrack ? { paddingBottom: 250 } : undefined}
      ListEmptyComponent={
        <Empty state={isLoading ? "loading" : error ? "error" : "idle"} />
      }
    />
  )
}
