import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import type { Track } from "../hooks/useMatchingTracks";
import { Audio, AVPlaybackStatus } from "expo-av";

type Props = {
  track: Track;
};

export const NowPlaying = ({ track }: Props) => {
  const [playingSound, setPlayingSound] = useState<Audio.Sound>();
  const [audioMeta, setAudioMeta] = useState<AVPlaybackStatus>();

  const play = useCallback(async () => {
    try {
      if (playingSound) {
        const status = await playingSound.getStatusAsync();
        const isPlaying = status.isLoaded && status.isPlaying 
        isPlaying && playingSound.stopAsync();
      }

      const { sound } = await Audio.Sound.createAsync({
        uri: track.previewUrl,
      });
      setPlayingSound(sound);
      sound.playAsync();
      const meta = await sound.getStatusAsync();
      setAudioMeta(meta);
    } catch (e) {
      const error = e as Error;
      alert("couldnt play audio: " + error.message);
    }
  }, [track.previewUrl]);

  return (
    <View style={styles.nowPlaying}>
      <Text style={styles.header}>Now Playing </Text>
      <Text style={styles.trackName}>{track.trackName}</Text>
      <Text style={styles.artistName}>{track.artistName}</Text>
      <View style={styles.controlBtn}>
        <Button title="Play" onPress={play} />
      </View>
      <View style={styles.rightAlign}>
        {audioMeta?.isLoaded && (
          <>
            <Text style={styles.duration}>
              duration: {audioMeta.durationMillis}
            </Text>
            {audioMeta.isLoaded && <Text style={styles.duration}>Loaded</Text>}
            {audioMeta.isBuffering && (
              <Text style={styles.duration}>Buffering..</Text>
            )}
            {audioMeta.isPlaying && (
              <Text style={styles.duration}>Playing</Text>
            )}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nowPlaying: {
    backgroundColor: "rgba(0,0,0,0.8)",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    paddingBottom: 40,
  },
  header: {
    color: "white",
    marginBottom: 10,
  },
  trackName: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
  artistName: {
    color: "white",
    lineHeight: 20,
  },
  duration: {
    color: "white",
  },

  controlBtn: {},

  rightAlign: {
    display: "flex",
    alignItems: "flex-end",
  },
});
