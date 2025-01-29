import { Home, Task } from './pages';
import { Route, Routes } from 'react-router-dom';
import { MainLayout, HeaderLayout } from './layouts';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route element={<HeaderLayout />}>
          <Route path='/' element={<Home />} />
        </Route>
        <Route path='/task' element={<Task />} />
      </Route>
    </Routes>
  );
}

export default App;
