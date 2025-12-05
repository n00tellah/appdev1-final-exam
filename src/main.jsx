import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '../public/CSS/main.css'
import '../public/CSS/corner.css'
import { HashRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Todos from "./pages/Todos";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/todos" element={<Todos />} />
    </Routes>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </StrictMode>
)
