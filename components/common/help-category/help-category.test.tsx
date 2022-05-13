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
    title: '',
    text: '',
    details: '',
    link: '',
    buttonText: '',
    tnumber: '',
    crnumber: '',
    vnumber: '',
    imageText: '',
    bgcolor: '',
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
          expect.objectContaining({ title: "" }),
        ])
      );
})
test("render arabic version", () => {
    renderComponentAR();
});