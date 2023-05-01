import { TextInput, StyleSheet } from "react-native";

type Props = {
  handleSearch: (query: string) => void;
};
const SearchBar = ({ handleSearch }: Props) => {
  return (
    <TextInput
      style={styles.searchBar}
      placeholder="Search by artist name"
      autoCorrect={false}
      autoCapitalize="words"
      onSubmitEditing={(e) => handleSearch(e.nativeEvent.text)}
    />
  );
};

const styles = StyleSheet.create({
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    marginHorizontal: 16,
  },
});

export default SearchBar;
