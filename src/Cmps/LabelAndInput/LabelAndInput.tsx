import React, { useEffect, useState } from 'react'
import Styles from "./LabelAndInput.module.scss"

export default function LabelAndInput(props: any) {
    const [inputValue, setInputValue] = useState<string[]>(Array(props.label.length).fill(""))

    const setInputValueArray = (value: string, index: number) => {
        let tempArr: string[] = inputValue.map(value => value);
        tempArr[index] = value
        setInputValue([...tempArr])
    }
    return (
        <div className={Styles.LabelAndInputContainer}>
            {props.label.map((label: string, index: number) => {
                console.log(label)
                return (<span className={Styles.AddDataSpan} key={index}>
                    <label htmlFor={`${label}Input`} className={Styles.UserDataLabel}>{`${label}:`}</label>
                    <input type="text" id={`${label}Input`} title={`${label}`} className={Styles.UserDataInputFields} value={inputValue[index]} onChange={(e) => setInputValueArray(e.target.value, index)} />
                </span>)
            })}
        </div>

    )
}
