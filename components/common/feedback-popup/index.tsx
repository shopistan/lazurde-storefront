import React, { FC } from 'react'
import Modal from '../ui/modal'
import Button from '../ui/button'
import Label from 'components/common/ui/button/index'

interface FeedbackPopUpProps {
    heading: string | ''
    buttonText: string | '';
    firstNameText: string | '';
    firstNameInput: string | ''
    lastNameText: string | ''
    lastNameInput: string | ''
    emailText: string | ''
    emailInput: string | ''
    mobileNumberText: string | ''
    mobileNumberInput: string | ''
    feedbackText: string | ''
    feedbackInput: string | ''

}

const FeedbackPopUp: FC<FeedbackPopUpProps> = ({ firstNameText, firstNameInput, lastNameText, lastNameInput, emailText, emailInput, mobileNumberInput, mobileNumberText, feedbackText, feedbackInput, heading, buttonText }) => {
    return (
        <>
            <Modal className='' isOpened={true} onClose={() => { }}>
                <>
                    <Label>{heading}</Label>
                    <div>
                        {
                            firstNameText && firstNameInput &&
                            <>
                                <Label>{firstNameText}</Label>
                                <input placeholder={firstNameInput} />
                            </>
                        }
                        {
                            lastNameText && lastNameInput &&
                            <>
                                <Label>{lastNameText}</Label>
                                <input placeholder={lastNameInput} />
                            </>
                        }
                    </div>
                    {
                        emailInput && emailText &&
                        <>
                            <Label>{emailText}</Label>
                            <input placeholder={emailInput} />
                        </>
                    }
                    {
                        mobileNumberInput && mobileNumberText &&
                        <>
                            <Label>{mobileNumberText}</Label>
                            <input placeholder={mobileNumberInput} />
                        </>
                    }
                    {
                        feedbackText && feedbackInput &&
                        <>
                            <Label>{feedbackText}</Label>
                            <input placeholder={feedbackInput} />
                        </>
                    }
                    <Button className='' onClick={() => { }} buttonText={buttonText} />
                </>
            </Modal>
        </>
    )
}
export default FeedbackPopUp

