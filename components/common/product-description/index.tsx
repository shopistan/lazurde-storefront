// import { fetchItemBySku, fetchItemBySkus } from 'lib/xm'
import React, { useContext, useEffect } from 'react'
import ImageSection from './image-section'

const ProductDescription = () => {

// useEffect(() => {
//   fetchItemBySku("100").then((result) => {
//     console.log("something1", result)
//   })
//   fetchItemBySkus(['100']).then((result) => {
//     console.log("something", result)
//   })

// }, [])


  return (
    <>
    <div>ProductDescription</div>
    <ImageSection></ImageSection>
    </>

  )
}

export default ProductDescription