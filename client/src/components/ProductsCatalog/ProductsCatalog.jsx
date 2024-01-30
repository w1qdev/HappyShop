import './ProductsCatalog.scss'
import axios from 'axios'
import Card from '../Card/Card'
import { motion } from 'framer-motion'
import { endpoints } from '../../api'
import { useEffect, useState } from 'react'
import { toastError } from '../../utils/toasts'


const ProductsCatalog = () => {

    const [catalogList, setCatalogList] = useState([])


    useEffect(() => {
        axios.get(`${endpoints.SERVER_ORIGIN_URI}${endpoints.PRODUCTS.ROUTE}${endpoints.PRODUCTS.GET_ALL}`)
        .then(res => {
            console.log(res.data.body)
            setCatalogList(res.data.body)

        })
        .catch(err => {
            toastError("Что-то пошло не так, попробуйте позже")
            console.log(err)
        })
    }, [])


    return (
        <div 
            className="main-page__catalog"
        >
            {catalogList.length ? catalogList.map(item => (
                <Card key={item.id} {...item} />
            )) : null}
            
            
        </div>
)
}

export default ProductsCatalog