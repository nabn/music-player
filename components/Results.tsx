import { FlashList } from "@shopify/flash-list"
import { useMatchingTracks } from "../hooks/useMatchingTracks"
import { Track } from "../hooks/Track"
import { Empty } from "./Empty"
import { TrackListItem } from "./TrackListItem"

type Props = { query: string; handlePreview: (track: Track) => void }
export const Results = ({ query, handlePreview }: Props) => {
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
      renderItem={({ item }) => (
        <TrackListItem track={item} onPress={handlePreview} />
      )}
      keyExtractor={(item) => item.trackId.toString()}
      estimatedItemSize={100}
      onEndReachedThreshold={0.8}
      onEndReached={fetchNextPage}
      ListEmptyComponent={
        <Empty state={isLoading ? "loading" : error ? "error" : "idle"} />
      }
    />
  )
}
