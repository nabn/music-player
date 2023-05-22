import { Box, Button, HStack, Text } from "../design-system"
import { Ionicons } from "@expo/vector-icons"
import { PropsWithChildren } from "react"
import { ActivityIndicator } from "react-native"
import * as Haptics from "expo-haptics"
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated"

type Props = { handleClose: () => void }

export const Player = ({ handleClose, children }: PropsWithChildren<Props>) => {
  return (
    <Animated.View
      entering={SlideInDown}
      exiting={SlideOutDown}
      style={{
        backgroundColor: "rgba(0,0,0,0.8)",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <HStack justifyContent="space-between" alignItems="center" py="$1">
        <Text color="white" pl="$4">
          Now Playing
        </Text>
        <Button onPress={handleClose} variant="link">
          <Ionicons name="ios-close-circle" size={30} color="white" />
        </Button>
      </HStack>

      <Box px="$4">{children}</Box>
    </Animated.View>
  )
}

export const ProgressBar = ({ progress = 0 }: { progress?: number }) => (
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

const iconMap = {
  play: <Ionicons name={"ios-play-circle-sharp"} size={80} color="white" />,
  pause: <Ionicons name={"ios-pause-circle-sharp"} size={80} color="white" />,
  buffering: <ActivityIndicator size="large" />,
} as const

export const PlayPauseButton = ({
  onPress,
  variant,
}: {
  onPress: () => void
  variant: keyof typeof iconMap
}) => {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    onPress()
  }
  return (
    <Button onPress={handlePress} variant="link" h="$32">
      {iconMap[variant]}
    </Button>
  )
}
