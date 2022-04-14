import React, { FC } from "react";
import Image from 'next/image'

interface productCardProps {
    button: string;
    title: string;
    text: string;
}

interface productCardPropsArray {
    productCardArray: productCardProps[];
}


const ProductCard: FC<productCardPropsArray> = ({ productCardArray }): JSX.Element => {
    return (
        <div>
            {

                productCardArray && productCardArray.map((data, index) => {
                    const { button, title, text } = data
                    return (
                        <div key={index}>
                            <div>
                                <Image src='/' alt='' width='100%' height='100%' />
                                <button>{button}</button>
                            </div>
                            <div>
                                <h3>{title}</h3>
                                <p>{text}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default ProductCard