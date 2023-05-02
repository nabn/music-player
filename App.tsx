import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { TracksList } from "./components/TracksList"
import { GluestackUIProvider } from "./design-system"
import { config } from "./gluestack-ui.config"

const queryClient = new QueryClient()
const App = () => (
  <QueryClientProvider client={queryClient}>
    <GluestackUIProvider config={config.theme}>
      <TracksList />
    </GluestackUIProvider>
  </QueryClientProvider>
)

export default App
