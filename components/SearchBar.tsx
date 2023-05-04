import { Input } from "../design-system"

type Props = {
  handleSearch: (query: string) => void
}
export const SearchBar = ({ handleSearch }: Props) => {
  return (
    <Input variant="rounded" mx="$4" my="$2">
      <Input.Input
        placeholder="Search by artist name"
        autoCorrect={false}
        autoCapitalize="words"
        selectTextOnFocus
        onSubmitEditing={(e) => handleSearch(e.nativeEvent.text)}
      />
    </Input>
  )
}
