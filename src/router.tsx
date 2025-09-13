// router.tsx
import { createBrowserRouter } from 'react-router-dom';

import { Layout } from './Layout';
import { AdminRoom } from './pages/AdminRoom';
import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { Room } from './pages/Room';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'rooms/new', element: <NewRoom /> },
      { path: 'rooms/:id', element: <Room /> },
      { path: 'admin/rooms/:id', element: <AdminRoom /> }
    ]
  }
]);
