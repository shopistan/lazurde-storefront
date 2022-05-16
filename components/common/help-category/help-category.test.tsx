import { render } from '@testing-library/react'
import React from 'react'
import HelpCategory from './index'
import ContextProvider, { AppContext } from 'lib/context'

const heading = 'heading'
const image = {
    url: '/',
    altText: 'test-image'
}

const array = [{
    title: '' || 'title',
    text: '' || 'text',
    details: false,
    link: '' || 'link',
    buttonText: '' || 'buttonText',
    tnumber: '' || 'tnumber',
    crnumber: '' || 'crnumber',
    vnumber: '' || 'vnumber',
    imageText: '' || 'imageText',
    bgcolor: '' || '#0000',
}]

const renderComponent = () => {
    render(
        <ContextProvider>
            <HelpCategory mainImage={image} heading={heading} categories={array} />
        </ContextProvider>
    )
}

const renderComponentAR = () => {
    render(
        <AppContext.Provider value={{ appState: { lang: "ar" } }}>
            <HelpCategory mainImage={image} heading={heading} categories={array} />
        </AppContext.Provider>
    )
}

test('Help Category Test', () => {
    renderComponent()
    expect(image).toStrictEqual({ 'altText': 'test-image', 'url': '/' })
    expect(heading).toBe('heading')
    expect(array).toHaveLength(1)
    expect(array).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                title: "title", text: 'text', details: false,
                link: 'link',
                buttonText: 'buttonText',
                tnumber: 'tnumber',
                crnumber: 'crnumber',
                vnumber: 'vnumber',
                imageText: 'imageText',
                bgcolor: '#0000',
            }),
        ])
    );
})
test("render arabic version", () => {
    renderComponentAR();
});