import { motion } from 'framer-motion'
import './Popup.scss'
import { useState } from 'react'
import { isDataFilled } from '../utils/isDataFilled'
import { toastError, toastSuccess } from '../utils/toasts'
import { endpoints } from '../api'
import axios from 'axios'


const SignInPopup = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const changeFormData = ({ name, value }) => setFormData({...formData, [name]: value })

    const submit = async (e) => {
        e.preventDefault()

        if (isDataFilled(formData)) {
            toastError("Кажется, вы что-то не заполнили")
            return
        }

        await axios.post(`${endpoints.SERVER_ORIGIN_URI}${endpoints.USERS.ROUTE}${endpoints.USERS.CREATE}`, formData)
        .then(res => {
            if (res.data.error) {
                toastError(res.data.error)
                return
            }

            toastSuccess("Вы успешно зарегистрированны")
        })
        .catch(err => {
            toastError("Что-то пошло не так, попробуйте позже")
        })
    }

    return (
        <form className="form" onSubmit={submit}>
            <div className="form__item">
                <div className="form__item-title">Введите ваш email</div>
                <input 
                    type="text" 
                    placeholder='example@gmail.com'
                    name='email'
                    value={formData.email}
                    onChange={e => changeFormData(e.target)} 
                />
            </div>
            <div className="form__item">
                <div className="form__item-title">Введите пароль</div>
                <input 
                    type="password" 
                    placeholder='password123@_'
                    name='password'
                    value={formData.password}
                    onChange={e => changeFormData(e.target)} 
                />
            </div>
            <motion.button 
                type='submit'
                whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.99 }}    
            >Войти
            </motion.button>  
        </form>
    )
}

export default SignInPopup;