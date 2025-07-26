import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import Inicio from './pages/inicio';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="*" element={<Navigate to="/" replace={true} />} exact={true} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;