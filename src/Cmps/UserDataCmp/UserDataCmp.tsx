import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { usersTodosState } from '../../atoms/atoms'
import Styles from "./UserDataCmp.module.scss"


export default function UserDataCmp(props: any) {
    const [todosArray, setTodosArray] = useRecoilState<any[]>(usersTodosState)
    const [userData, setUserData] = useState<any>(props.data);

    const setMarked = () => {
        const tempTodos: any[] = todosArray.map(todo => todo)
        setUserData({ ...userData, completed: true })
        const index: number = todosArray.findIndex(todo => todo.id === userData.id)
        tempTodos[index] = { ...userData, completed: true }
        props.setTodosData([...tempTodos])
    }
    return (
        <div className={Styles.MainContainerUserDataCmp} style={{ boxShadow: props.type === "Posts" ? "0px 0px 4px 2px lightgray" : props.type === "Todos" && !userData.completed ? "0px 0px 4px 2px orange" : "0px 0px 4px 2px #83fc3c" }}>
            <span className={Styles.TitleSpan}>
                <label title={`Title: ${props.data.title}`}>Title: {props.data.title}</label>

            </span>
            <span className={Styles.StatusAndButton}>
                <span className={Styles.StatusSpan}>
                    <label title={`${props.type === "Posts" ? `Body: ${props.data.body}` : `Completed: ${props.data.completed}`}`}>{`${props.type === "Posts" ? `Body: ${props.data.body}` : `Completed: ${props.data.completed}`} `}</label>
                </span>
                {props.type === "Todos" && !userData.completed && <button title='markcompleted' className={Styles.MarkedButton} onClick={setMarked}>Mark Completed</button>}
            </span>
        </div>
    )
}


