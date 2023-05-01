import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
} from "react-native";
import { Track } from "../hooks/useMatchingTracks";

type Props = {
  track: Track;
  onPress: (track: Track) => unknown;
};

export const TrackListItem = ({ track, onPress }: Props) => {
  const handlePress = () => onPress(track);
  return (
    <TouchableNativeFeedback onPress={handlePress}>
      <View style={styles.container}>
        <View style={styles.artworkContainer}>
          <Image
            source={{ uri: track.artworkUrl100 }}
            style={styles.artwork}
            resizeMode="contain"
          />
        </View>
        <View style={styles.trackInfo}>
          <Text style={styles.track}>{track.trackName}</Text>
          <Text style={styles.artist}>{track.artistName}</Text>
          <Text style={styles.album}>{track.collectionName}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flexDirection: "row",
    gap: 8,
    padding: 8,
  },
  artworkContainer: {},
  artwork: {
    height: 100,
    width: 100,
  },
  trackInfo: {
    flex: 1,
  },
  track: {
    fontWeight: "bold",
    fontSize: 20,
  },
  artist: {},
  album: {},
});
