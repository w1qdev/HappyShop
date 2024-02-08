import { motion, AnimatePresence } from 'framer-motion'
import Popup from '../../popups/Popup';
import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux'
import BasketIcon from '../../assets/basket/basket.svg'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    MenuDivider,
    Image
  } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import './Header.scss'
import { useState } from 'react';


const Header = () => {

    const [isSingInPopupOpen, setIsSignInPopupOpen] = useState(false)
    const [isSingUpPopupOpen, setIsSignUpPopupOpen] = useState(false)
    const basketStore = useSelector(state => state.basket.basket)

    const isLoggedIn = !!localStorage.getItem('name') && !!localStorage.getItem('email')
    const storagedName = localStorage.getItem('name')

    const logoutAccount = () => {
        localStorage.setItem('name', '')
        localStorage.setItem('email', '')
        window.location = '/'
    }

    return (
        <>
            <AnimatePresence>
                {isSingInPopupOpen ? (
                    <Popup 
                        contentName="sign-in" 
                        popupHandler={setIsSignInPopupOpen}
                        title="Вход" 
                    />
                ) : null}

                {isSingUpPopupOpen ? (
                    <Popup 
                        contentName="sign-up" 
                        popupHandler={setIsSignUpPopupOpen}
                        title="Регистрация" 
                    />
                ) : null}
            </AnimatePresence>
            
            <div className='header'>
                <div className="container">
                    <div className="header__inner">
                        <NavLink to="/" className="header__inner__logo">
                            <span className='logo'>HappyShop</span> Магазин одежды
                        </NavLink>
                        <div className="header__inner__buttons">
                            <NavLink to="/basket" className="basket">
                                <AnimatePresence>
                                    {basketStore.length ? (
                                            <motion.div 
                                                className='basket__count'
                                                initial={{ y: 5, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                {basketStore.length}</motion.div>
                                    ) : null}
                                </AnimatePresence>
                                <img className='basket__icon' src={BasketIcon} alt="" />
                                <div className="basket__title">Корзина</div>
                            </NavLink>
                            
                            {isLoggedIn ? (
                                <Menu>
                                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                        {storagedName}
                                    </MenuButton>
                                    <MenuList>
                                        <NavLink to='/orders'>
                                            <MenuItem minH='48px'>
                                                    <span className='menu-item__text'>Мои заказы</span>
                                            </MenuItem>
                                        </NavLink>
                                        <MenuDivider />
                                        <MenuItem minH='40px'>
                                            <span 
                                                className='menu-item__text'
                                                onClick={logoutAccount}
                                            >
                                                Выйти
                                            </span>
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            ) : (
                                <>
                                    <div
                                        onClick={() => setIsSignInPopupOpen(prev => !prev)} 
                                        className="button sign-in"
                                        >Войти
                                    </div>
                                    <motion.div 
                                        whileHover={{ 
                                            scale: 1.02,
                                            transition: { duration: 0.2 }
                                        }}
                                        whileTap={{ scale: 0.99 }}
                                        className="button sign-up"
                                        onClick={() => setIsSignUpPopupOpen(prev => !prev)}
                                        >Регистрация
                                    </motion.div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Outlet />
        </>
        
    )
}

export default Header;