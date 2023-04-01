import React from 'react'
import LabelAndInput from '../LabelAndInput/LabelAndInput'
import Styles from './AddData.module.scss'

export default function AddData(props: any) {
    return (
        <div className={Styles.addDataContainer}>
            {/* <span className={Styles.AddDataSpan}>
                <label htmlFor='userEmailInput' className={Styles.UserDataLabel}>Title:</label>
                <input type="text" id="userNameInput" title='userNameInput' className={Styles.UserDataInputFields} value={`${props?.user?.name}`} />
            </span> */}
            {props.type === "Todos" ? <LabelAndInput label={["Title"]} closeAddWindow={props.closeAddWindow} /> : props.type === "Posts" ? <LabelAndInput label={["Title", "Body"]} closeAddWindow={props.closeAddWindow} /> : null}
        </div>
    )
}
