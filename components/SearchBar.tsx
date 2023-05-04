import { Input } from "../design-system"

type Props = {
  handleSearch: (query: string) => void
}
export const SearchBar = ({ handleSearch }: Props) => {
  return (
    <Input mx="$4" my="$2" borderRadius='$md'>
      <Input.Input
        placeholder="Search by artist name"
        autoCorrect={false}
        autoCapitalize="words"
        selectTextOnFocus
        fontSize='$lg'
        onSubmitEditing={(e) => handleSearch(e.nativeEvent.text)}
      />
    </Input>
  )
}
