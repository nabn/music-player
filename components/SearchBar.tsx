import { Box, Input } from "../design-system"

type Props = {
  handleSearch: (query: string) => void
}
export const SearchBar = ({ handleSearch }: Props) => {
  return (
    <Box px="$4" py="$2">
      <Input variant="rounded">
        <Input.Input
          placeholder="Search by artist name"
          autoCorrect={false}
          autoCapitalize="words"
          onSubmitEditing={(e) => handleSearch(e.nativeEvent.text)}
        />
        <Input.Icon />
      </Input>
    </Box>
  )
}
