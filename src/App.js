import { Routes, Route } from 'react-router-dom'
import User from './Routes/User/User';

function App() {
  return (
    <div>
      <Routes>
          <Route element={<User />} path='/*' />
        </Routes>
    </div>
  );
}

export default App;
