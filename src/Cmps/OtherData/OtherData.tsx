import React, { useEffect, useState } from 'react'
import Styles from './OtherData.module.scss'
import { useRecoilState, useRecoilValue } from 'recoil'
import { usersDataState, otherDataOpen } from '../../atoms/atoms'


export default function OtherData(props: any) {
    const [otherData, setOtherData] = useRecoilState(usersDataState)
    const [specificUserData, setSpecificUserData] = useState<any[]>([])
    const [isOtherDataOpen, setOtherDataOpen] = useRecoilState(otherDataOpen)




    useEffect(() => {
        const user = otherData.filter((user) => user.id === props.userId)
        setSpecificUserData(user)
    }, [])


    return (
        <div className={Styles.OtherDataContainer} onClick={() => props.closeOtherData()}>
            <div className={Styles.userDataInputs}>
                <span>
                    <label htmlFor='userEmailInput' className={Styles.UserDataLabel}>Street:</label>
                    <input type="text" id="userNameInput" title='userNameInput' className={Styles.UserDataInputFields} value={`${specificUserData[0]?.address.street}`} readOnly />
                </span>
                <span>
                    <label htmlFor='userEmailInput' className={Styles.UserDataLabel}>City:</label>
                    <input type="text" id="userNameInput" title='userNameInput' className={Styles.UserDataInputFields} value={`${specificUserData[0]?.address.city}`} readOnly />
                </span>
                <span>

                    <label htmlFor='userEmailInput' className={Styles.UserDataLabel}>Zip Code:</label>
                    <input type="text" id="userEmailInput" title='userEmailInput' className={Styles.UserDataInputFields} value={`${specificUserData[0]?.address.zipcode}`} readOnly />
                </span>
            </div>
        </div>
    )
}
