import { render, screen } from '@testing-library/react'
import React from 'react'
import SiteNavBar from './index'

describe('', () => {
    const siteUrl = '/modal.png'
    const id = '1122'
    const image = {
        url: '/',
        altText: 'alt-image',
    }

    test('image', () => {
        render(<SiteNavBar headerId={id} siteLogoUrl={siteUrl} siteLogo={image} siteNavBar={[]} />)
        const altTextProps = screen.getByAltText('alt-image')
        expect(altTextProps).toBeInTheDocument()
        const idProps = screen.getByTestId('id')
        expect(idProps).toBeInTheDocument()
        const logoUrl = document.querySelector('a').getAttribute('href')
        expect(logoUrl).toBe('/')
    })
});