import React, { useState, FC } from 'react'
import Image from 'next/image'
import Label from 'components/common/ui/label/index'
import Button from 'components/common/ui/button/index'
import Modal from 'components/common/ui/modal/index'
import styles from './register-popup.module.scss'
import { ImageType } from 'lib/types/common'
import CrossSmall from 'components/icons/CrossSmall'

interface RegisterModalProps {
    modalImage: ImageType;
    modalTitle: string;
    modalText: string;
    modalButton: string;
    isOpen: boolean;
}


const RegisterModal: FC<RegisterModalProps> = ({ isOpen = false, modalImage, modalTitle = '', modalText = '', modalButton = '' }) => {
    const [open, setOpen] = useState(isOpen)
    return (
        <Modal className='register-modal' isOpened={open} onClose={() => { }}  >
            <div className={styles['register-container']}>
                <div className={styles['cross-icon']} >
                    <CrossSmall onClick={() => { setOpen(!open) }}/>
                </div>
                {
                    modalImage && modalImage.url &&
                    <Image className={styles['modal-image']} src={modalImage.url} alt={modalImage.altText} width={300} height={400} />
                }
                <div className={styles['register-text-section']}>
                    <Label className={styles['modal-title']}>
                        {modalTitle}
                    </Label>
                    <Label className={styles['modal-text']}>
                        {modalText}
                    </Label>
                    <Button className={styles['modal-button']} children={modalButton} />
                </div>

            </div>
        </Modal>
    )
}
export default RegisterModal