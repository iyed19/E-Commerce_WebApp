import Slider from "../components/Slider";
import HomePrdList from "../components/HomePrdList";
import { CartProvider } from "react-use-cart";
import Cart from "../components/cart/Cart";


export default function Home(){
    return(
        <>
            <Slider/>
            <h1>Home</h1>
            <HomePrdList/>

        </>
    )
}