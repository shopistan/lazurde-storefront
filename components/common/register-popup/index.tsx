import React, { FC } from 'react'
import Image from 'next/image'
import Label from 'components/common/ui/label/index'
import Button from 'components/common/ui/button/index'
import Modal from 'components/common/ui/modal/index'
import styles from './register-popup.module.scss'
import { ImageType } from 'lib/types/common'

interface RegisterModalProps {
    modalImage: ImageType;
    modalTitle: string;
    modalText: string;
    modalButton: string;
}


const RegisterModel: FC<RegisterModalProps> = ({ modalImage, modalTitle = '', modalText = '', modalButton = '' }) => {
    return (
        <Modal className='register-modal' isOpened={true} onClose={() => { }}  >
            <div className={styles['register-container']}>
                {
                    modalImage && modalImage.url &&
                    <Image className={styles['modal-image']} src={modalImage.url} alt={modalImage.altText} width={500} height={400} />
                }
                <div >
                </div>
                <div>
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
export default RegisterModel