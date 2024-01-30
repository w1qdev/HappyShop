import { motion } from 'framer-motion'
import Card from '../../components/Card/Card'
import { axios } from 'axios'
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'
import './BasketPage.scss'


const BasketPage = () => {
    const basketStore = useSelector(state => state.basket.basket)

    const makeOrder = async () => {
        await axios.post()
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