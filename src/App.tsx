import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { Room } from './pages/Room';
import { BrowserRouter, Route } from 'react-router-dom';

import { AuthContextProvider } from './context/AuthContext';
import { AdminRoom } from './pages/AdminRoom';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route path='/' Component={Home} />
        <Route path='/rooms/new' Component={NewRoom} />
        <Route path='/rooms/:id' Component={Room} />
        <Route path='/admin/rooms/:id' Component={AdminRoom} />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
