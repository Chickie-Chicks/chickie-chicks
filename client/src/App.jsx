import { useEffect, useState } from "react";
import { MenuItem } from "./components/MenuItem";

function App() {
  const [menu, setMenu] = useState([]);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    fetch("/api/menu")
      .then(res => res.json())
      .then(data => setMenu(data))
      .catch(error => console.error("Failed to load menu:", error));
  }, []);

  const handleOrder = (item) => {
    setOrder([...order, item]);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Chickie Chicks Menu</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {menu.map(item => (
          <MenuItem key={item._id || item.id} {...item} onOrder={handleOrder} />
        ))}
      </div>
    </div>
  );
}

export default App;
