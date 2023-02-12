import {useState} from 'react'
import Cart from './components/Cart/Cart';
import Header from "./components/Layout/Header";
import Meals from './components/Meals/Meals';
import { MealContextProvider } from './store/MealItemContext';
import Login from './components/Login/Login'

function App() {
  
  const [cartVisible,setCartVisible] = useState(false)

  const showCart = () => setCartVisible(true)
  
  const disableCart = () => setCartVisible(false)
  
  return (
      <Login/>
      //  <MealContextProvider>
      //   {cartVisible &&  <Cart disableCart={disableCart} />}
      //   <Header showCart={showCart} />
      //   <main>
      //     <Meals/>
      //   </main>
      //   </MealContextProvider>
  );
}

export default App;
