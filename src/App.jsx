import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header/Header";
import ItemListContainer from "./container/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./container/ItemDetailContainer/ItemDetailContainer";

function App() {
  return (
    <div>
      <Header />
      <ItemListContainer />
      <ItemDetailContainer />
      {/* <ItemCount /> */}
    </div>
  );
}

export default App;
