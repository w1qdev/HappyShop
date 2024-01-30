import { useSelector, useDispatch } from 'react-redux'
import { addItemToBasket, removeItemFromBasket } from '../../store/slices/basketSlice'
import { motion } from 'framer-motion'
import './Card.scss'


const Card = ({ id, title, description, price, count }) => {
    const basketStore = useSelector(state => state.basket.basket)
    const isCardInBasket = basketStore.find(elem => elem.id === id)
    const dispatch = useDispatch()
    const productData = { id, title, description, price, count }


    const addToCart = () => dispatch(addItemToBasket(productData))
    const removeFormCart = () => dispatch(removeItemFromBasket({ id: id }))
    


    return (
        <motion.div 
            className="catalog__item"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <div className="catalog__item-title">{title}</div>
            <div className="catalog__item-subtitle">{description}</div>
            <div className="catalog__item-price">{price}₽</div>

            {isCardInBasket ? (
                <div 
                    className="catalog__item-add-to-cart red"
                    onClick={removeFormCart}
                >
                    Убрать из корзины
                </div>
            ) : (
                <div 
                    className="catalog__item-add-to-cart"
                    onClick={addToCart}
                >
                    Добавить в корзину
                </div>
            )}

            
        </motion.div>
    )
}


export default Card;