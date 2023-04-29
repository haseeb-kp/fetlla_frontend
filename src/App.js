import { Routes, Route } from 'react-router-dom'
import User from './Routes/User/User';
import Admin from './Routes/Admin/Admin';

function App() {
  return (
    <div>
      <Routes>
          <Route element={<Admin />} path='/admin/*' />
          <Route element={<User />} path='/*' />
        </Routes>
    </div>
  );
}

export default App;
