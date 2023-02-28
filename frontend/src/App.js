import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/home';
import Input from './components/Input';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path ="/">
      <Route index element={<Home/>}/>
      <Route path="Input" element={<Input />} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
