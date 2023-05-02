import { useCallback, useEffect, useState } from "react"
import { Track } from "../hooks/Track"
import { Audio, AVPlaybackStatus } from "expo-av"
import { Box, Button, HStack, Text } from "../design-system"
import { Ionicons } from "@expo/vector-icons"

type Props = { track: Track; handleClose: () => unknown }

export const NowPlaying = ({ track, handleClose }: Props) => {
  const [sound, setSound] = useState<Audio.Sound>()
  const [audioStatus, setAudioStatus] = useState<AVPlaybackStatus>()

  const play = useCallback(async () => {
    try {
      // Stop previously playing if any
      if (sound) {
        const status = await sound.getStatusAsync()
        const isPlaying = status.isLoaded && status.isPlaying
        isPlaying && sound.stopAsync()
      }

      const { sound: newSound } = await Audio.Sound.createAsync({
        uri: track.previewUrl,
      })
      setSound(newSound)
      newSound.setOnPlaybackStatusUpdate((status) => setAudioStatus(status))
      newSound.playAsync()
    } catch (e) {
      const error = e as Error
      alert("couldnt play audio: " + error.message)
    }
  }, [track.previewUrl])

  const pause = () => {
    if (sound) {
      sound.pauseAsync()
    }
  }

  // Cleanup
  useEffect(() => {
    return () => {
      sound?.unloadAsync()
    }
  }, [sound])

  const progress =
    audioStatus?.isLoaded && audioStatus.durationMillis
      ? Math.floor(
          (audioStatus.positionMillis / audioStatus.durationMillis) * 100,
        )
      : 0

  return (
    <Box bg="rgba(0,0,0,0.8)" position="absolute" bottom={0} left={0} right={0}>
      <HStack justifyContent="space-between" alignItems="center" py="$1">
        <Text color="$warmGray50" pl="$4">
          Now Playing{" "}
        </Text>
        <Button onPress={handleClose} variant="link">
          <Ionicons name="ios-close-circle" size={30} color="lightgray" />
        </Button>
      </HStack>

      <Box px="$4">
        <Text color="$blueGray50" variant="title" size="2xl">
          {track.trackName}
        </Text>
        <Text color="$warmGray50">{track.artistName}</Text>
      </Box>

      <PlayPause isPlaying={!!(audioStatus?.isLoaded && audioStatus.isPlaying)} play={play} pause={pause} />
      <ProgressBar progress={progress} />
    </Box>
  )
}

const PlayPause = ({
  isPlaying,
  play,
  pause,
}: {
  isPlaying: boolean
  play: () => void
  pause: () => void
}) => (
  <Box py="$2">
    {isPlaying ? (
      <Button onPress={pause} variant="link">
        <Ionicons name="ios-pause-circle-sharp" size={80} color="lightgray" />
      </Button>
    ) : (
      <Button onPress={play} variant="link">
        <Ionicons name="ios-play-circle-sharp" size={80} color="lightgray" />
      </Button>
    )}
  </Box>
)

const ProgressBar = ({ progress }: { progress: number }) => (
  <Box h="$4" mb="$10">
    {!progress ? null : (
      <Box justifyContent="center" h="$1" bg="$gray500" borderRadius="$full">
        <Box
          bg="$blueGray50"
          h="100%"
          borderRadius="$full"
          style={{ width: progress + "%" }}
        />
      </Box>
    )}
  </Box>
)
