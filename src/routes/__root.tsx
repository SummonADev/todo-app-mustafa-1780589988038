import { createRootRoute, Outlet } from '@tanstack/react-router';
import HomePage from '@/pages/HomePage';

export const Route = createRootRoute({
  component: RootLayout,
  // The old app rendered HomePage for every unmatched path — keep that behavior.
  notFoundComponent: HomePage,
});

// The app shell: anything rendered here appears on every page.
// <Outlet /> is where the matched page renders.
function RootLayout() {
  return <Outlet />;
}
