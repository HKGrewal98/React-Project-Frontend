import {useState,useEffect,useContext} from 'react'
import Cart from './components/Cart/Cart';
import Header from "./components/Layout/Header";
import Meals from './components/Meals/Meals';
import Login from './components/Login/Login'
import mealContext from './store/MealItemContext';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'

function App() {

  useEffect(()=>{

    generateJWT()

    setInterval(()=>{
          generateJWT()
    },3400000)

  },[])

  async function generateJWT(){
    const response = await fetch('http://localhost:8080/web/getToken',{
      method:'POST',
      headers :{
          "Content-type":"application/json",
          'Access-Control-Allow-Origin':'*',
          "Accept": 'application/json',
      },
      body:JSON.stringify({"clientId":"frontend"})
      })

      const data = await response.json()
      console.log(data.accessToken)
      ctx.setAuthJWT(data.accessToken)
  }

  const ctx = useContext(mealContext)
  const isLogined = ctx.isLogined 
  
  const [cartVisible,setCartVisible] = useState(false)

  const showCart = () => setCartVisible(true)
  
  const disableCart = () => setCartVisible(false)

  const routes = createBrowserRouter([
    {path:'/',element:<Login/>},
    {path:'/ottomonMenu',element:<> 
                                      {cartVisible &&  <Cart disableCart={disableCart} />}
                                      <Header showCart={showCart} />
                                      <main>
                                        <Meals/>
                                      </main>
                                  </>
    }
  ])

  
  return (
      // <>
      //  {!isLogined && <Login/>}
      //   {isLogined && 
      //    <>
      //    {cartVisible &&  <Cart disableCart={disableCart} />}
      //   <Header showCart={showCart} />
      //   <main>
      //     <Meals/>
      //   </main>
      //    </>}
      // </>
      <RouterProvider router={routes}/>
  );
}

export default App;
