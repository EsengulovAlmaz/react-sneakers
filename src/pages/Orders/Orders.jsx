
import React from "react";
import AppContext from "../../context";


function Orders() {
    // const { onAddToFavorites, onAddToCart } = React.useContext(AppContext);
    // const [orders, setOrders] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        (async () => {
            // try {
            // const {data} = await axios.get('/orders');
            // console.log(data.map(obj => obj.items).flat());
            // setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
            // setIsLoading(false)
            // } catch (error) {
            //     alert("Ошибка при запросе заказов")
            // console.error(error);
            // }
        })()
    }, []);


    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>Мои заказы</h1>
            </div>

            <div className="d-flex flex-wrap">
                <h1>Нет базы</h1>
                {
                    // (isLoading ? [...Array(8)] : orders).map((item, index) => (
                    //     <Card
                    //         key={index}
                    //         onFavorite={(obj) => onAddToFavorites(obj)}
                    //         loading={isLoading}
                    //         {...item}
                    //     />
                    // ))
                }
            </div>
        </div>
    )
}

export default Orders;