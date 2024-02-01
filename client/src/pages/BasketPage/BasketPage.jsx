import { motion } from 'framer-motion'
import Card from '../../components/Card/Card'
import axios from 'axios'
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { clearBasket } from '../../store/slices/basketSlice.js';
import { endpoints } from '../../api/index.js'
import { toastError, toastSuccess } from '../../utils/toasts.js'

import './BasketPage.scss'


const BasketPage = () => {
    const basketStore = useSelector(state => state.basket.basket)
    const dispatch = useDispatch()

    const makeOrder = async () => {

        

        await axios.post(`${endpoints.SERVER_ORIGIN_URI}${endpoints.ORDERS.ROUTE}${endpoints.ORDERS.MAKE_ORDER}`, { basketStore })
        .then(res => {
            dispatch(clearBasket())
            toastSuccess("Отлично! Ваш заказ уже едет к вам")
        })
        .catch(err => {
            toastError("Что-то пошло не так, попробуйте позже")
        })
    }

    return (
        <motion.div 
            className="basket-page"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <div className="container">
                <div className="basket-page__title">
                    <div className="title">Корзина товаров</div>
                    <div className="line"></div>
                </div>

                <div className="basket-page__basket">
                    {basketStore.length ? basketStore.map(item => (
                        <Card key={item.id} {...item} />
                    )) : (
                        <motion.div 
                            className="basket-is-clear"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="basket-is-clear__text">К сожалению, в вашей корзине пусто 😔</div>
                            <Link to="/" className="basket-is-clear__button">Вернуться на главную</Link>
                        </motion.div>
                    )}
                </div>
                
                {basketStore.length ? (
                    <div className="basket-page__make-order">
                        <button 
                            className='make-order__button'
                            onClick={makeOrder}
                        >
                            Заказать
                        </button>
                    </div>
                ) : null}

                
            </div>
        </motion.div>
    )
}

export default BasketPage;