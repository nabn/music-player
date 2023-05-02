import { ActivityIndicator } from "react-native"
import { Box, Text } from "../design-system"

export const Empty = ({ state }: { state: "idle" | "loading" | "error" }) => (
  <Box p="$4" alignItems="center">
    {state === "loading" ? (
      <ActivityIndicator />
    ) : state === "error" ? (
      <Box>
        <Text textAlign="center" variant="error">
          There was an issue fetching the results.
        </Text>
        <Text textAlign="center">
          Please try again later or contact support.
        </Text>
      </Box>
    ) : state === "idle" ? (
      <Text textAlign="center">Enter an artist name to start</Text>
    ) : (
      <Text textAlign="center" variant="error">
        Something went wrong
      </Text>
    )}
  </Box>
)
