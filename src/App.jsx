import { Routes, Route } from "react-router-dom";
import Navbar from './Navbar';
import Home from './Pages/Home';
import Shop from './Pages/Shop';
import Discussion from './Pages/Discussion';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/disc" element={<Discussion />} />
        </Routes>
      </main>
    </>
  );
}

export default App;