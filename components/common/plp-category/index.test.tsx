import React from 'react'
import PLPCategory from './index'
import { render, fireEvent } from "@testing-library/react";
import ContextProvider from "lib/context";
import { screen } from "@testing-library/dom";

const renderComponent = () => {
    const title = 'Explore All Categories'
    const text = 'Our jewelry builds on a legacy of over 180 years of expert craftsmanship with beautifully designed necklaces and pendants, bracelets, rings, and more.Our newest jewlery showcases L’azurde’s creativity and unparalleled design at its best.'
    const cardArray = [
        {
            cardTitle: 'Necklaces',
            cardImage: {
                url: '',
                altText: 'Image1'
            }
        },
        {
            cardTitle: 'Rings',
            cardImage: {
                url: '',
                altText: 'Image2'
            }
        },
        {
            cardTitle: 'Earrings',
            cardImage: {
                url: '',
                altText: 'Image3'
            }
        },
        {
            cardTitle: 'Bracelets & Anklets',
            cardImage: {
                url: '',
                altText: 'Image4'
            }
        },
    ]
    render(
        <ContextProvider>
            <PLPCategory title={title} text={text} cards={cardArray} />
        </ContextProvider>
    )
};

describe('PLP category', () => {
    test ('plp category title test', () => {
        renderComponent()
        const title = screen.getByText(/Explore All Categories/i);
        expect(title).toBeInTheDocument();
    });

    test ('plp category text test', () => {
        renderComponent()
        const text = screen.getByText(/Our jewelry builds on a legacy of over 180 years of expert craftsmanship with beautifully designed necklaces and pendants, bracelets, rings, and more.Our newest jewlery showcases L’azurde’s creativity and unparalleled design at its best./i);
        expect(text).toBeInTheDocument();
    });
})