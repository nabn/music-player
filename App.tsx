import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TracksList } from "./components/TracksList";

const queryClient = new QueryClient();
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TracksList />
  </QueryClientProvider>
);

export default App;
