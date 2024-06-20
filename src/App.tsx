import styles from "./styles/Header.module.css";
import Header from "./components/Header";
import Catalog from "./components/Сatalog";
import { Provider } from "react-redux";
import Favorites from "./components/Favorites";
import store from "./store/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
