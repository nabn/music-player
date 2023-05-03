import { Ionicons } from "@expo/vector-icons"
import { TouchableNativeFeedback } from "react-native"
import { Image, HStack, VStack, Text, Box } from "../design-system"
import { Track } from "../types/Track"

type Props = {
  track: Track
  isPlaying: boolean
  onPress: (track: Track) => unknown
}

export const TrackListItem = ({ track, onPress, isPlaying }: Props) => {
  const handlePress = () => onPress(track)

  return (
    <TouchableNativeFeedback onPress={handlePress}>
      <HStack space="md" px="$4" py="$2" alignItems="center">
        <Image source={{ uri: track.artworkUrl100 }} size="lg" />
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
  )
}
