import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem';

const RelatedProducts = ({category,subCategory}) => {
    const {products} = useContext(ShopContext);
    const[related,setRelated] = useState([]);



    useEffect(() => {  
        if(products.length > 0){
            let productsCopy = [...products];

            productsCopy = productsCopy.filter((item)=> category === item.category);
            productsCopy = productsCopy.filter((item)=> subCategory === item.subCategory);
            setRelated(productsCopy.slice(0,5));
            
        }
    }, [products])

  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-5 mb-48'>
        {
            related.map((item,index)=>(
                <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price}/>
        ))}
    </div>
  )
}

export default RelatedProducts
