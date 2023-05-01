import { StyleSheet, Text, View } from "react-native";
import type { Track } from "../hooks/useMatchingTracks";

type Props = {
  track: Track;
};

export const NowPlaying = ({ track }: Props) => {
  console.log(track);
  return (
    <View style={styles.nowPlaying}>
      <Text>Now Playing </Text>
      <Text style={styles.trackName}>{track.trackName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  nowPlaying: {
    backgroundColor: "white",
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    height: 150,
    padding: 10,
  },
  trackName: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
