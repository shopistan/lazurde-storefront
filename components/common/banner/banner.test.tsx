import { render, screen } from '@testing-library/react'
import React from 'react'
import Banner from './index'

const renderComponent = () => {
    const imageProps = {
        url: '/',
        altText: 'image',
    }
    render(
        <Banner title={'banner title'} text={'banner text'} bgColor={'#ffff'} backgroundImage={imageProps} />
    )
}

describe('Banner ', () => {
    test('Banner title props', () => {
        renderComponent()

        const title = screen.getByText(/banner title/i);
        expect(title).toBeInTheDocument();
    });
    test('banner text props', () => {
        renderComponent()

        const text = screen.getByText(/banner text/i);
        expect(text).toBeInTheDocument();
    });
    test('banner image props', () => {
        renderComponent()

        const image = screen.getByAltText('image');
        expect(image).toBeInTheDocument();
    });
})