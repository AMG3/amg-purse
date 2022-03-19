import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header/Header";
import ItemListContainer from "./container/ItemListContainer/ItemListContainer";
import ItemCount from "./components/ItemCount/ItemCount";

function App() {
  return (
    <div>
      <Header />
      <ItemListContainer />
      <ItemCount />
    </div>
  );
}

export default App;
