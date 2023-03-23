import "./Drawer.scss";
import React from "react";
import Info from "../Info/Info";
import { useCart } from "../../hooks/useCart";

function Drawer({ onClose, items = [], onRemove, opened }) {
    const { cartItems, setCartItems, totalPrice } = useCart();
    //Нет базы
    // const [orderaId, setOrderId] = React.useState(null);
    const [isOrderComplete, setIsOrderComplete] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);


    const onClickOrder = () => {
        try {
            setIsLoading(true);
            setIsOrderComplete(true);
            setCartItems([]);
        } catch (error) {
            alert('Не удалось создать зааказ :(');
        }
        setIsLoading(false);
    };

    return (
        <div className={`overlay ${opened ? "overlayVisible" : ''}`}>
            <div className="drawer">
                <h2 className="d-flex justify-between mb-30 ">
                    Корзина
                    <img
                        onClick={onClose}
                        className="removeBtn cu-p"
                        src="img/btn-remove.svg"
                        alt="Remove"
                    />
                </h2>

                {
                    items.length > 0 ?
                        <div className="d-flex flex-column flex">
                            <div className="items flex">
                            {items.map((obj) => (
                                <React.Fragment>
                                    <div key={obj.id} className="cartItem d-flex align-center mb-20">
                                        <div
                                            style={{ backgroundImage: `url(${obj.image})` }}
                                            className="cartItemImg"
                                        >
                                        </div>
                                        <div className="mr-20 flex">
                                            <p className="mb-5">{obj.title}</p>
                                            <b>{obj.price} руб.</b>
                                        </div>
                                        <img
                                            onClick={() => onRemove(obj.id)}
                                            className="removeBtn"
                                            src="img/btn-remove.svg"
                                            alt="Remove"
                                        />
                                    </div>

                                </React.Fragment>
                            ))}
                            <div className="cartTotalBlock">
                                <ul>
                                    <li>
                                        <span>Итого:</span>
                                        <div></div>
                                        <b>{totalPrice} руб. </b>
                                    </li>
                                    <li>
                                        <span>Налог 5%: </span>
                                        <div></div>
                                        <b>{totalPrice / 100 * 5} руб. </b>
                                    </li>
                                </ul>
                                <button onClick={onClickOrder} className="greenButton">
                                    Оформить заказ
                                    <img src="img/arrow.svg" alt="Arrow" />
                                </button>
                            </div>
                        </div>
            </div> : <Info
                title={isOrderComplete ? "Заказ оформлен" : "Корзина пустая"}
                description={
                    isOrderComplete
                        ? "Ваш заказ #18 скоро будет передан курьерской доставке"
                        : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
                }
                image={isOrderComplete ? "img/completed-oreder.jpg" : "img/empty-cart.svg"}
            />
                }
        </div>
        </div >
    )
}

export default Drawer;