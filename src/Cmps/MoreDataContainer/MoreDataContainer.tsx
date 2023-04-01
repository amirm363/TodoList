import React, { useState } from 'react'
import AddData from '../AddData/AddData'

import UserDataCmp from '../UserDataCmp/UserDataCmp'
import Styles from './MoreDataContainer.module.scss'

export default function Todos(props: any) {
    const [openAddWindow, setOpenAddWindow] = useState(false)

    const closeAddWindow = () => {
        setOpenAddWindow(false)
    }

    return (
        <div className={Styles.todosMainContainer}>
            <span className={Styles.addContainer}>
                <label className={Styles.headerLabel}>{`${props.type} - User ${props.userFullData.userId}`}</label>
                {!openAddWindow && <button type='button' title='add' className={Styles.addButton} onClick={() => setOpenAddWindow(true)}>ADD</button>}
            </span>
            <div className={Styles.todosSubContainer}>
                {openAddWindow ? props.type === "Posts" ? <AddData type="Posts" closeAddWindow={closeAddWindow} /> : props.type === "Todos" ? <AddData type="Todos" closeAddWindow={closeAddWindow} /> : null
                    : <>{props.type === "Posts" ? props.userFullData.posts.map((post: any) => { return <UserDataCmp key={post.id} data={post} type={props.type} setTodosData={props.setTodosData} /> }) : props.type === "Todos" ? props.userFullData.todos.map((todo: any) => { return <UserDataCmp key={todo.id} data={todo} type={props.type} setTodosData={props.setTodosData} /> }) : null}</>
                }
            </div>
        </div>
    )
}
