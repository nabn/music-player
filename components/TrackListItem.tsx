import { TouchableNativeFeedback } from "react-native"
import { Image, HStack, VStack, Text } from "../design-system"
import { Track } from "../hooks/Track"

type Props = {
  track: Track
  onPress: (track: Track) => unknown
}

export const TrackListItem = ({ track, onPress }: Props) => {
  const handlePress = () => onPress(track)
  return (
    <TouchableNativeFeedback onPress={handlePress}>
      <HStack space="md" mx="$4" my="$2">
        <Image source={{ uri: track.artworkUrl100 }} size="lg" />
        <VStack flex={1}>
          <Text variant="title" size="lg" color="$blue800">
            {track.trackName}
          </Text>
          <Text fontWeight="$semibold">{track.artistName}</Text>
          <Text>{track.collectionName}</Text>
        </VStack>
      </HStack>
    </TouchableNativeFeedback>
  )
}
