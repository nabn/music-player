import { useInfiniteQuery } from "@tanstack/react-query";

// TODO
export type Track = Record<string, string>

const PAGE_SIZE = 25;
const ITUNES_API_URL = "https://itunes.apple.com";

// NOTE: pagination doesn't seem to be supported by the iTunes API
export const useMatchingTracks = (searchText: string) =>
  useInfiniteQuery<Track>({
    enabled: !!searchText,
    queryKey: ["tracks", searchText],
    queryFn: async ({ pageParam = 0 }) => {
      if (!searchText) return [];
      const offset = pageParam * PAGE_SIZE;
      const url = `${ITUNES_API_URL}/search?term=${searchText}&entity=song&attribute=artistTerm&limit=${PAGE_SIZE}&offset=${offset}`;
      const { results } = await fetch(url).then((r) => r.json());
      return results;
    },
    getNextPageParam: (_, pages) => pages.length,
  });
