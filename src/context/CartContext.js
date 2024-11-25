import { createContext, useContext, useEffect, useReducer } from "react";
import { cartReducer } from "../reducers";
import { toast } from "react-toastify";
import { getUserCart } from "../services";

const cartInitialState = {
    cartList: [],
    total: 0
}

const CartContext = createContext(cartInitialState);

export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, cartInitialState);

    useEffect(()=>{
        const fetchUserCart= async ()=>{
            if(sessionStorage.getItem("token")){
                try{
                    const userCart=await getUserCart();
                    if(userCart && userCart.length > 0){
                        setCart(userCart[0]);
                    }
                }catch{
                    toast.error("Error Loading User Cart!!!");
                }
            }
        }
        fetchUserCart();
    },[])

    function setCart(userCartObj){
        dispatch({
            type:"SET_CART",
            payload:{
                products:userCartObj.cartList,
                total:userCartObj.totalAmount
            }
        })
    }
    function addToCart(product){
        const updatedList = state.cartList.concat(product);
        const updatedTotal = state.total + product.price;

        dispatch({
            type: "ADD_TO_CART",
            payload: {
                products: updatedList,
                total: updatedTotal
            }
        })
    }

    function removeFromCart(product){
        const updatedList = state.cartList.filter(item => item.id !== product.id);
        const updatedTotal = state.total - product.price;

        dispatch({
            type: "REMOVE_FROM_CART",
            payload: {
                products: updatedList,
                total: updatedTotal
            }
        })
    }

    function clearCart(){
        dispatch({
            type: "CLEAR_CART",
            payload: {
                products: [],
                total: 0
            }
        })
    }

    const value = {
        cartList: state.cartList,
        total: state.total,
        addToCart,
        removeFromCart,
        clearCart,
        setCart
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext);
    return context;
}