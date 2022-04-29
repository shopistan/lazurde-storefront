import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import SiteNavBar from './index'

describe('', () => {
    const siteUrl = '/modal.png'
    const id = '1122'
    const image = {
        url: '/',
        altText: 'alt-image',
    }

    const array: any = [{
        navTitle: 'navTitle1',
        titleUrl: '/',
        navArr: [{
            title: 'title',
            catArr: [{
                title: 'title',
                url: '/',
                isBold: false,
            }],
        }],
    }, {
        navTitle: 'navTitle2',
        titleUrl: '/',
        navArr: [{
            title: 'title',
            catArr: [{
                title: 'title',
                url: '/',
                isBold: false,
            }],
        }],
    }]

    test('Site navbar', () => {
        render(<SiteNavBar headerId={id} siteLogoUrl={siteUrl} siteLogo={image} siteNavBar={array} setOpenSearchDialog={() => { }} />)
        expect(screen.getByAltText('alt-image')).toBeInTheDocument()
        expect(screen.getByTestId('id')).toBeInTheDocument()
        expect(document.querySelector('a').getAttribute('href')).toBe('/')
        expect(array).toHaveLength(2)
        expect(array).toEqual(expect.arrayContaining([
            expect.objectContaining({ navTitle: 'navTitle1' }),
            expect.objectContaining({ navTitle: 'navTitle2' })
        ]))
    })
});