import React from "react";

import axios from "axios";
import Header from "./components/Header/Header";
import Drawer from "./components/Drawer/Drawer";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Favorites from "./pages/Favorites/Favorites";
import AppContext from "./context";
import Orders from "./pages/Orders/Orders";


function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, itemsResponse] = await Promise.all([
          axios.get("https://63d941b974f386d4efe7f721.mockapi.io/cart"),
          axios.get("https://63d941b974f386d4efe7f721.mockapi.io/items")
        ]);

        // const favoritesResponse = await axios.get("https://63d941b974f386d4efe7f721.mockapi.io/favorites")

        setIsLoading(false);

        setCartItems(cartResponse.data);
        // setFavorites(favoritesResponse.data)
        setItems(itemsResponse.data);

      } catch (error) {
        alert("Ошибка при запросе данных :(");
        console.error(error);
      }
    }
    fetchData();
  }, []);



  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(item => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://63d941b974f386d4efe7f721.mockapi.io/cart/${findItem.id}`);
      } else {
        setCartItems(prev => [...prev, obj]);
        const { data } = await axios.post("https://63d941b974f386d4efe7f721.mockapi.io/cart", obj);
        setCartItems((prev) => prev.map(item => {
          if (item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id
            }
          }
          return item;
        }));
      }
    } catch (error) {
      alert("Ошибка при добавлении в корзину :(");
      console.error(error);
    }
  };

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://63d941b974f386d4efe7f721.mockapi.io/cart/${id}`);
      setCartItems(prev => prev.filter(item => Number(item.id) !== Number(id)));
    } catch (error) {
      alert("Ошибка при удалении в корзину :(");
      console.error(error);
    }
  };

  const onAddToFavorites = async (obj) => {
    try {
      if (favorites.find(favObj => favObj.id === obj.id)) {
        axios.delete(`https://63d941b974f386d4efe7f721.mockapi.io/favorites/${obj.id}`);
        setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))
      } else {
        const { data } = await axios.post(`https://63d941b974f386d4efe7f721.mockapi.io/favorites`, obj);
        setFavorites(prev => [...prev, data])
      }
    } catch (error) {
      console.log("Не удалось добавить в фавориты!");
      console.error(error);
    }

  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };


  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };


  return (
    <AppContext.Provider value={{
      items,
      cartItems,
      favorites,
      isItemAdded,
      onAddToFavorites,
      onAddToCart,
      setCartOpened,
      setCartItems
    }}>
      <div className="wrapper clear">

        <Drawer
          onRemove={onRemoveItem}
          items={cartItems}
          onClose={() => setCartOpened(false)}
          opened={cartOpened}
        />

        <Header onClickCart={() => setCartOpened(true)} />


        <Routes>
          <Route
            path="/"
            element={<Home
              items={items}
              cartItems={cartItems}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorites={onAddToFavorites}
              onAddToCart={onAddToCart}
              isLoading={isLoading}
            />} />

          <Route path="/favorites" element={<Favorites />} />

          <Route path="/orders" element={<Orders />} />

        </Routes>
      </div>
    </AppContext.Provider>
  );
}


export default App;
