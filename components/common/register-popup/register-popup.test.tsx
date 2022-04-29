import React from 'react'
import RegisterModal from 'components/common/register-popup/index'
import { screen, render } from '@testing-library/react'

const renderComponent = () => {
    const title = 'Register Title';
    const text = 'Register Text';
    const buttonText = 'Register Button Text'
    const image = {
        url: '/',
        altText: 'Image'
    }
    render(
        <>
            <RegisterModal modalTitle={title} modalText={text} modalButton={buttonText} isOpen={true} modalImage={image} />
        </>
    )
}

describe('Register modal testing', () => {
    test('title', () => {
        renderComponent()
        const titleProps = screen.getByText(/Register Title/i)
        expect(titleProps).toBeInTheDocument()
    });
    test('text', () => {
        renderComponent()
        const textProps = screen.getByText(/Register text/i)
        expect(textProps).toBeInTheDocument()
    });
    test('button', () => {
        renderComponent()
        const buttonProps = screen.getByText(/Register Button Text/i)
        expect(buttonProps).toBeInTheDocument()
    });
    test('image', () => {
        renderComponent()
        const imageProps = screen.getByAltText(/image/i)
        expect(imageProps).toBeInTheDocument()
    });
})