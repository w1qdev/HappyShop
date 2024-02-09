import { useSelector, useDispatch } from 'react-redux'
import { addItemToBasket, removeItemFromBasket, addBasketItemCount, subtractBasketItemCount } from '../../store/slices/basketSlice'
import { MinusIcon, AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { setOrders } from '../../store/slices/ordersSlice';
import { Tooltip } from '@chakra-ui/react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import './Card.scss'
import { endpoints } from '../../api'
import { toastError, toastSuccess } from '../../utils/toasts'
import wordDeclenision from '../../utils/wordDeclension';

const CardButton = ({ isCardInOrder, productData, id }) => {

    const basketStore = useSelector(state => state.basket.basket)
    const isCardInBasket = basketStore.find(elem => elem.id === id)
    const basketItem = basketStore.find(item => item.id === id ? true : false)
    const startItemCount = basketItem ? basketItem?.count : 1
    const [itemCount, setItemCount] = useState(startItemCount)
    const userID = localStorage.getItem('uid')
    const dispatch = useDispatch()


    const addToBasket = () => {
        dispatch(addItemToBasket({ ...productData, count: 1 }))
        setItemCount(1)
    }
    const removeFromBasket = () => {
        dispatch(removeItemFromBasket({ id: id }))
    }
    
    const removeOrderItem = () => {
        axios.post(`${endpoints.SERVER_ORIGIN_URI}${endpoints.ORDERS.ROUTE}${endpoints.ORDERS.REMOVE_ITEM}`, { id, uid: userID })
        .then(res => {
            if (res.data.error) {
                toastError(res.data.error)
                return
            }

            toastSuccess("Заказ успешно удален")
            dispatch(setOrders(res.data['new-orders']))
        })
        .catch(err => {
            toastError("Что-то пошло не так, попробуйте позже")
        })
    }

    const itemCountHandler = (e) => {
        if (e.target.value === '') {
            setItemCount(1)
            return
        }
        
        setItemCount(e.target.value)
    }

    const addItemCount = () => {
        setItemCount(prev => parseInt(prev) + 1)
        dispatch(addBasketItemCount({ id: id }))
    }

    const subtractItemCount = () => {
        setItemCount(prev => parseInt(prev) - 1 === 0 ? removeFromBasket() : parseInt(prev) - 1)
        dispatch(subtractBasketItemCount({ id: id }))
    }

    if (isCardInOrder) {
        return (
            <div 
                className="catalog__item add-to-cart orange"
                onClick={removeOrderItem}
            >
                Отменить заказ
            </div>    
        )
    } else {
        return (
            <>
                <AnimatePresence>
                    {isCardInBasket ? (
                        <motion.div 
                            className="add-to-cart cart-counter"
                            initial={{ y: 5, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <Tooltip label='Убрать один элемент из корзины' openDelay={500} hasArrow placement='top'>
                                <motion.div 
                                    className="counter minus"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={subtractItemCount}
                                >
                                    { itemCount > 1 ? (
                                        <div 
                                            className='icon'
                                        >
                                            <MinusIcon color="white" />
                                        </div>
                                    ) : (
                                        <div className='icon'>
                                            <DeleteIcon color="white" />
                                        </div>
                                    ) }
                                </motion.div>
                            </Tooltip>
                            <div className="counter count">
                                <input 
                                    type="number" 
                                    value={itemCount}
                                    onChange={itemCountHandler}
                                />
                            </div>
                            <Tooltip label='Добавить один элемент в корзину' openDelay={500} hasArrow placement='top'>
                                <motion.div 
                                    className="counter plus"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={addItemCount}
                                >
                                    <AddIcon color="white" />
                                </motion.div>
                            </Tooltip>
                        </motion.div>
                    ) : (
                        <div 
                            className="catalog__item add-to-cart"
                            onClick={addToBasket}
                        >
                            Добавить в корзину
                        </div>
                    )}
                </AnimatePresence>
            </>
        )
    }
} 


const Card = ({ id, title, description, price, warehouseCount, isCardInOrder }) => {

    const productData = { id, title, description, price, warehouseCount }

    const ordersStore = useSelector(state => state.orders.orders)
    const orderItem = ordersStore.find(item => item.id === id ? true : false)

    const formattedPrice = price.toLocaleString("ru")

    return (
        <motion.div 
            className="catalog__item"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <div className="catalog__item-title">{title}</div>
            <div className="catalog__item-subtitle">{description}</div>
            <div className="catalog__item-price">{formattedPrice}₽
                <span>/шт.</span>
                {isCardInOrder ? <span className='item-count'> • {orderItem?.count} {wordDeclenision(orderItem?.count, 'штук')}</span> : null}
            </div>

            <CardButton 
                isCardInOrder={isCardInOrder} 
                productData={productData} 
                id={id}
            />
        </motion.div>   
    )
}


export default Card;