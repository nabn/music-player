import { Box, Button, HStack, Text } from "../design-system"
import { Ionicons } from "@expo/vector-icons"
import { PropsWithChildren } from "react"

type Props = { handleClose: () => void }

export const Player = ({ handleClose, children }: PropsWithChildren<Props>) => {
  return (
    <Box bg="rgba(0,0,0,0.8)" position="absolute" bottom={0} left={0} right={0}>
      <HStack justifyContent="space-between" alignItems="center" py="$1">
        <Text color="white" pl='$4'>Now Playing</Text>
        <Button onPress={handleClose} variant="link">
          <Ionicons name="ios-close-circle" size={30} color="white" />
        </Button>
      </HStack>

      <Box px="$4">{children}</Box>
    </Box>
  )
}

export const ProgressBar = ({ progress }: { progress: number }) => (
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

export const PlayPauseButton = ({
  onPress,
  variant,
}: {
  onPress: () => void
  variant: "play" | "pause"
}) => (
  <Button onPress={onPress} variant="link">
    <Ionicons
      name={
        variant === "play" ? "ios-play-circle-sharp" : "ios-pause-circle-sharp"
      }
      size={80}
      color="white"
    />
  </Button>
)
