import { FlashList, ViewToken } from "@shopify/flash-list"
import { useMatchingTracks } from "../hooks/useMatchingTracks"
import { Track } from "../types/Track"
import { Empty } from "./Empty"
import { TrackListItem } from "./TrackListItem"
import * as Haptics from "expo-haptics"
import { useSharedValue } from "react-native-reanimated"

type Props = {
  query: string
  playingTrackId?: Track["trackId"]
  handlePreview: (track: Track) => void
  onScroll?: () => void
  isPlaying: boolean
}
export const Results = ({
  query,
  playingTrackId,
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

  const handleEndReached = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
    fetchNextPage()
  }

  const data = songs?.pages[0] ?? ([] as Track[])

  const viewableItems = useSharedValue<ViewToken[]>([])
  return (
    <FlashList
      data={data}
      onViewableItemsChanged={({ viewableItems: vItems }) =>
        (viewableItems.value = vItems)
      }
      onScrollBeginDrag={onScroll}
      renderItem={({ item }) => (
        <TrackListItem
          viewableItems={viewableItems}
          track={item}
          onPress={handlePreview}
          isPlaying={isPlaying && playingTrackId === item.trackId}
        />
      )}
      extraData={{ selectedTrackId: playingTrackId, isPlaying, viewableItems }}
      keyExtractor={(item) => item.trackId.toString()}
      estimatedItemSize={100}
      onEndReachedThreshold={0.8}
      onEndReached={handleEndReached}
      contentContainerStyle={
        playingTrackId ? { paddingBottom: 250 } : undefined
      }
      ListEmptyComponent={
        <Empty state={isLoading ? "loading" : error ? "error" : "idle"} />
      }
    />
  )
}
