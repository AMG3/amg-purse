import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header/Header";
import ItemListContainer from "./container/ItemListContainer/ItemListContainer";

function App() {
  return (
    <div>
      <Header />
      <ItemListContainer greeting="Bienvenido a AMG-PURSE" />
    </div>
  );
}

export default App;
