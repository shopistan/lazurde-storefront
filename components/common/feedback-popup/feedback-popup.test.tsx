import React from 'react'
import FeedbackPopUp from './index'
import { screen, render, fireEvent } from '@testing-library/react'
import ContextProvider, { AppContext } from "lib/context";

const heading = 'Send Feedback'


const renderComponent = () => {
    render(
        <ContextProvider>
            <FeedbackPopUp open={true} heading={heading} onClose={() => { true }} />
        </ContextProvider>
    )
}

const renderComponentAR = () => {
    render(
        <AppContext.Provider value={{ appState: { lang: "ar" } }}>
            <FeedbackPopUp open={true} heading={heading} onClose={() => { true }} />
        </AppContext.Provider>
    )
}

test('feedback pop up testing', () => {
    renderComponent()
    expect(heading).toBe('Send Feedback')
})

test("render arabic version", () => {
    renderComponentAR();
});