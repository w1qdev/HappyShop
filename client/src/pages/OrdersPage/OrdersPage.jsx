import { useEffect, useState } from 'react';
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom';
import axios from 'axios'
import './OrdersPage.scss'
import { endpoints } from '../../api';
import { toastError } from '../../utils/toasts';
import Card from '../../components/Card/Card';
import { setOrders } from '../../store/slices/ordersSlice';
import { useDispatch, useSelector } from 'react-redux'


const OrdersPage = () => {

    const [orders, setOrdersList] = useState([])
    const ordersStore = useSelector(state => state.orders.orders)
    const dispatch = useDispatch()
    const userID = localStorage.getItem('uid')
    

    const getOrdersTotalPrice = () => {
        let totalPrice = 0

        console.log(ordersStore)

        ordersStore.forEach(item => {
            totalPrice += item.price * item.count
        })

        return totalPrice
    }

    const totalPrice = getOrdersTotalPrice()


    useEffect(() => {
        axios.get(`${endpoints.SERVER_ORIGIN_URI}${endpoints.ORDERS.ROUTE}${endpoints.ORDERS.GET_ORDERS}/${userID}`)
        .then(res => {
            if (res.data.error){
                toastError(res.data.error)
                return
            }

            if (res.data.orders) {
                setOrdersList(res.data.orders)
                dispatch(setOrders(res.data.orders))
            }
        })
        .catch(err => {
            toastError("Что-то пошло не так, попробуйте позже")
        })
    }, [])
    

    return (
        <div className="orders-page">
            <div className="container">
                <div className="orders-page__title">
                    <div className="title">Мои заказы</div>
                    <div className="line"></div>
                </div>

                <div className="orders-page__orders">
                    { ordersStore.length ? ordersStore.map(order => (
                        <div key={order.id} className="order__group">
                            <Card {...order} isCardInOrder={true} />
                        </div>
                        
                    )) : (
                        <motion.div 
                            className="orders-is-clear"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="orders-is-clear__text">К сожалению, вы еще не делали заказов 😔</div>
                            <Link to="/" className="orders-is-clear__button">Вернуться на главную</Link>
                        </motion.div>
                    ) }
                </div>

                {ordersStore.length ? (
                    <div className="orders-page__total-price">
                        <div className="price">
                            <span className="price-text">Сумма заказов: </span>
                            <span className="price-count">{totalPrice}₽</span>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default OrdersPage;