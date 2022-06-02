import React from 'react'
import PLPCategory from './index'
import { render, fireEvent } from "@testing-library/react";
import ContextProvider, { AppContext } from "lib/context";
import { screen } from "@testing-library/dom";


const title = 'Explore All Categories'
const text = 'Our jewelry builds on a legacy of over 180 years of expert craftsmanship with beautifully designed necklaces and pendants, bracelets, rings, and more.Our newest jewlery showcases L’azurde’s creativity and unparalleled design at its best.'
const cardArray = [
    {
        cardTitle: 'Necklaces',
        cardImage: {
            url: '',
            altText: 'Image1'
        },
        cardLink: '/0'
    },
    {
        cardTitle: 'Rings',
        cardImage: {
            url: '',
            altText: 'Image2'
        },
        cardLink: '/1'
    },
    {
        cardTitle: 'Earrings',
        cardImage: {
            url: '',
            altText: 'Image3'
        },
        cardLink: '/2'
    },
    {
        cardTitle: 'Bracelets & Anklets',
        cardImage: {
            url: '',
            altText: 'Image4'
        },
        cardLink: '/3'
    },
]

const renderComponentAR = () => {

    render(
        <AppContext.Provider value={{ appState: { lang: "ar" } }}>
            <PLPCategory title={title} text={text} cards={cardArray} />
        </AppContext.Provider>
    );
};

const color = '#0000'

describe('PLP category', () => {
    test('plp category title test', () => {
        render(
            <ContextProvider>
                <PLPCategory title={title} text={text} cards={cardArray} />
            </ContextProvider>
        )
        const titleTest = screen.getByText(title);
        expect(titleTest).toBeInTheDocument();
    });

    test('plp category text test', () => {
        render(
            <ContextProvider>
                <PLPCategory title={title} text={text} cards={cardArray} />
            </ContextProvider>
        )
        const textTest = screen.getByText(text);
        expect(textTest).toBeInTheDocument();
    });
    test('plp array testing', () => {
        render(
            <ContextProvider>
                <PLPCategory title={title} text={text} cards={cardArray} backgroundColor={color} />
            </ContextProvider>
        )
        expect(cardArray).toHaveLength(4)
        expect(cardArray).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ cardTitle: 'Necklaces', cardLink: '/0' }),
                expect.objectContaining({ cardTitle: 'Rings', cardLink: '/1' }),
                expect.objectContaining({ cardTitle: 'Earrings', cardLink: '/2' }),
                expect.objectContaining({ cardTitle: 'Bracelets & Anklets', cardLink: '/3' }),
            ]
            )
        )
    })

    test("render arabic version", () => {
        renderComponentAR();
    });
})