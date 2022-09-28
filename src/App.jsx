import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Clientes } from "./pages/Clientes"

/*
Axios.interceptors.request.use(function (config) {
  config.url = `${process.env.REACT_APP_API_BASE_URL}${config.url}`;
  return config;
}
);*/

export function App() {
  return (

    <Routes>
      <Route path="/clientes" element={<Clientes />} />
    </Routes>



  )
}

