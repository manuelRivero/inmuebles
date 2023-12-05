import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./components/layout/admin";
import AuthLayout from "./components/layout/admin";

import Home from "./screens/Home";
import Login from "./screens/Login";
import "./App.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import Detail from "./screens/Detail";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
              <AdminLayout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route
                    path="/detalle-del-inmueble/:id"
                    element={<Detail />}
                  />
                </Routes>
              </AdminLayout>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default App;
