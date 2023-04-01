import React from 'react'

import UserDataCmp from '../UserDataCmp/UserDataCmp'
import Styles from './MoreDataContainer.module.scss'

export default function Todos(props: any) {


    return (
        <div className={Styles.todosMainContainer}>
            <span className={Styles.addContainer}>
                <label className={Styles.headerLabel}>{`${props.type} - User ${props.userFullData.userId}`}</label>
                <button type='button' title='add' className={Styles.addButton} >ADD</button>
            </span>
            <div className={Styles.todosSubContainer}>
                {props.type === "Posts" ? props.userFullData.posts.map((post: any) => { return <UserDataCmp key={post.id} data={post} type={props.type} setTodosData={props.setTodosData} /> }) : props.type === "Todos" ? props.userFullData.todos.map((todo: any) => { return <UserDataCmp key={todo.id} data={todo} type={props.type} setTodosData={props.setTodosData} /> }) : null}
            </div>
        </div>
    )
}
