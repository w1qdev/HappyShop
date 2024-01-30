import { motion } from 'framer-motion'
import './Popup.scss'


const SignInPopup = () => {

    const submit = (e) => {
        e.preventDefault()

        console.log("submiting data")
    }

    return (
        <form className="form" onSubmit={submit}>
            <div className="form__item">
                <div className="form__item-title">Введите ваш email</div>
                <input type="text" placeholder='example@gmail.com' />
            </div>
            <div className="form__item">
                <div className="form__item-title">Введите пароль</div>
                <input type="password" placeholder='password123@_' />
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