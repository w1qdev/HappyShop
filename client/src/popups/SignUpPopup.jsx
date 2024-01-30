import { motion } from 'framer-motion'
import './Popup.scss'


const SignUpPopup = () => {

    const submit = (e) => {
        e.preventDefault()

        console.log("submiting data!")
    }

    return (
        <form className="form" onSubmit={submit}>
            <div className="form__item">
                <div className="form__item-title">Введите ваше имя</div>
                <input type="text" placeholder='Иван' />
            </div>
            <div className="form__item">
                <div className="form__item-title">Введите ваш email</div>
                <input type="mail" placeholder='example@gmail.com' />
            </div>
            <div className="form__item">
                <div className="form__item-title">Придумайте пароль</div>
                <input type="password" placeholder='password123!_' />
            </div>
            <div className="form__item">
                <div className="form__item-title">Введите пароль еще раз</div>
                <input type="password" placeholder='password123!_' />
            </div>
            <motion.button 
                type='submit'
                whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.99 }}
            >
                Зарегистрироваться
            </motion.button>     
        </form>
    )
}


export default SignUpPopup;
