import './App.css';
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Home from "./pages/Home";
import { Route, Routes} from "react-router-dom";
import SignUp from './components/SignUp';
import Administration from './pages/Admin/Administration';
import AdminProducts from "./pages/Admin/AdminProducts";
import AdminCategories from "./pages/Admin/AdminCategories";
import AdminPrdDetails from './pages/Admin/AdminPrdDetails';
import AddProduct from "./components/AddProduct";
import AddCategory from "./components/AddCategory.jsx";
import EditProduct from "./components/EditProduct";
import PrdDetails from "./components/PrdDetails.jsx";
import Cart from './components/cart/Cart.jsx';
import HomePrdList from "./components/HomePrdList";
import { CartProvider } from "react-use-cart";
import Order from './components/Order.jsx';

function App() {
  return (
    <div className="App">
      <CartProvider>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="signup" element={<SignUp/>}/>
          <Route path="administration" element={<Administration/>}/>
          <Route path='administration/products' element={<AdminProducts/>} />
          <Route path='administration/products/:id' element={<AdminPrdDetails/>} />
          <Route path='administration/products/edit/:id' element={<EditProduct/>} />
          <Route path='administration/products/add' element={<AddProduct/>} />
          <Route path=':id' element={<PrdDetails/>} />
          <Route path='cart' element={<Cart/>} />
          <Route path='order' element={<Order/>} />
          {/* <Route path='administration/categories' element={<AdminCategories/>} /> */}
          {/* <Route path='administration/categories/add' element={<AddCategory/>} /> */}
          {/* <Route path="about" element={<About/>}/> */}
        </Routes>
      </CartProvider>

    </div>
  );
}

export default App;
