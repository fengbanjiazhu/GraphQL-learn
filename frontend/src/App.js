import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import WebLayout from "./components/WebLayout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<WebLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/login" element={<Login />} />

            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
