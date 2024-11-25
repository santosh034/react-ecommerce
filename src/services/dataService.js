function getSession(){
    const token = JSON.parse(sessionStorage.getItem("token"));
    const cbid = JSON.parse(sessionStorage.getItem("cbid"));
    return {token, cbid};
}

export async function getUser(){
    const browserData = getSession();
    const requestOptions = {
        method: "GET",
        headers: {"Content-Type": "application/json", Authorization: `Bearer ${browserData.token}`}
    }
    const response = await fetch(`${process.env.REACT_APP_HOST}/user/${browserData.cbid}`, requestOptions);
    if(!response.ok){
        throw { message: response.statusText, status: response.status }; //eslint-disable-line
    }
    const data = await response.json();
    return data;
}

export async function getUserOrders(){
    const browserData = getSession();
    const requestOptions = {
        method: "GET",
        headers: {"Content-Type": "application/json", Authorization: `Bearer ${browserData.token}`}
    }
    const response = await fetch(`${process.env.REACT_APP_HOST}/orders?userId=${browserData.cbid}`, requestOptions);
    if(!response.ok){
        throw { message: response.statusText, status: response.status }; //eslint-disable-line
    }
    const data = await response.json();
    return data;
}

export async function createOrder(cartList, total, user){
    const browserData = getSession();
    const order = {
        cartList: cartList,
        amountPaid: total,
        quantity: cartList.length,
        user: {
            name: user.name,
            email: user.email,
            id: user.id
        }
    }
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${browserData.token}` },
        body: JSON.stringify(order)
    }
    const response = await fetch(`${process.env.REACT_APP_HOST}/orders`, requestOptions);
    if(!response.ok){
        throw { message: response.statusText, status: response.status }; //eslint-disable-line
    }
    const data = await response.json();
    return data;
}


export const getUserCart=async ()=> {
    const browserData=getSession();
    const requestOptions={
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${browserData.token}`
        }
    }
    const response=await fetch(`${process.env.REACT_APP_HOST}/carts?userId=${browserData.cbid}`,requestOptions);
    if(!response.ok){
        throw {message:response.statusText,status:response.status};//eslint-disable-line
    }
    return await response.json();
}

export async function saveUserCart(cartList,total) {
    const user=await getUser();
    const browserData = getSession();
    const cart = {
        cartList: cartList,
        totalAmount: total,
        quantity: cartList.length,
        user: {
            name: user.name,
            email: user.email,
            id: user.id
        }
    }

    const updateRequestOptions = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${browserData.token}`
        },
        body: JSON.stringify(cart),
        method: "POST" 
    };

    const updateResponse = await fetch(`${process.env.REACT_APP_HOST}/carts`, updateRequestOptions);
    if (!updateResponse.ok) {
        throw { message: updateResponse.statusText, status: updateResponse.status };//eslint-disable-line
    }

}