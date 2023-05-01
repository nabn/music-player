import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

export const Empty = ({ state }: { state: "idle" | "loading" | "error" }) => (
  <View style={styles.emptyContainer}>
    {state === "loading" ? (
      <ActivityIndicator />
    ) : state === "error" ? (
      <>
        <Text style={styles.error}>
          There was an issue fetching the results.
        </Text>
        <Text style={styles.helpText}>
          Please try again later or contact support.
        </Text>
      </>
    ) : state === "idle" ? (
      <Text style={styles.helpText}>Enter an artist name to start</Text>
    ) : (
      <Text style={styles.error}>Something went wrong</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  helpText: {
    color: "grey",
    textAlign: "center",
  },
  error: {
    color: "red",
    textAlign: "center",
    fontSize: 20,
  },
});
