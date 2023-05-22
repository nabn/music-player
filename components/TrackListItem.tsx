import { Ionicons } from "@expo/vector-icons"
import { ViewToken } from "@shopify/flash-list"
import { TouchableNativeFeedback } from "react-native"
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated"
import { Image, HStack, VStack, Text, Box } from "../design-system"
import { Track } from "../types/Track"

type Props = {
  track: Track
  isPlaying: boolean
  onPress: (track: Track) => unknown
  viewableItems: Animated.SharedValue<ViewToken[]>
}

export const TrackListItem = ({
  track,
  onPress,
  isPlaying,
  viewableItems,
}: Props) => {
  const handlePress = () => onPress(track)

  const animatedStyle = useAnimatedStyle(() => {
    const isViewable = viewableItems.value.some(
      (item) => item.isViewable && item.item.trackId === track.trackId,
    )

    return { transform: [{ scale: withTiming(isViewable ? 1 : 0.9) }] }
  })

  return (
    <Animated.View style={animatedStyle}>
      <TouchableNativeFeedback onPress={handlePress}>
        <HStack space="md" px="$4" py="$2" alignItems="center">
          <Image
            source={{ uri: track.artworkUrl100 }}
            size="lg"
            borderRadius={4}
          />
          <VStack flex={1} height="100%">
            <Text variant="title" size="lg">
              {track.trackName}
            </Text>
            <Text fontWeight="$semibold">{track.artistName}</Text>
            <Text>{track.collectionName}</Text>
          </VStack>
          {isPlaying ? (
            <Box mr="$2">
              <Ionicons name="musical-notes-sharp" size={24} />
            </Box>
          ) : null}
        </HStack>
      </TouchableNativeFeedback>
    </Animated.View>
  )
}
