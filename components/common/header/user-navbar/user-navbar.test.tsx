import { render, screen } from '@testing-library/react'
import React from 'react'
import UserNavBar from './index'
import ContextProvider from "lib/context";

describe('', () => {
    const object = {
        mainImg: {
            url: '/',
            altText: 'altText',
        },
        mainTitle: 'mainTitle',
        logoArr: [{
            logoImg: {
                url: '/',
                altText: 'altText',
            }
        }],
        brandArr: [{
            url: '/',
            altText: 'altText',
            label: '',
            labelUrl: '',
            brandImg: {
                url: '/',
                altText: '',
            },
        }],
    }
    render(
        <ContextProvider>
            <UserNavBar brandSideBar={object} />
        </ContextProvider>
    )

    test('links', () => {
        const links = document.querySelector("a").getAttribute('href')
        expect(links).toBe('/')
    })
});