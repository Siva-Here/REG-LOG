import MainReg from './MainReg'
import MainLog from './MainLog'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {
  return (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainReg />}/>
              <Route path="/login" element={<MainLog />} />
              <Route path="/register" element={<MainReg/>} />
              <Route path="*" element={<h1>Page NOt Found</h1>} />
            </Routes>
          </BrowserRouter>
      );
}

      export default App;
