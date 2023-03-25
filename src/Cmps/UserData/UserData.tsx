import React, { useEffect, useState } from 'react'
import Styles from './UserData.module.scss'
import { useRecoilState } from 'recoil'
import { updateUsers, deleteUser } from '../../utils/fetchData'
import { usersDataState, usersTodosState } from "../../atoms/atoms"
import OtherData from '../OtherData/OtherData';


export default function UserData(props: any) {
    let todosArr: any[];
    const [usersData, setUsersData] = useRecoilState(usersDataState)
    const [userData, setUserData] = useState(props.userData)
    const [todosData, setTodosData] = useRecoilState(usersTodosState)
    const [completedTodos, setCompletedTodos] = useState(false);
    const [showOtherData, setShowOtherData] = useState(false);
    const [userUpdatedData, setUserUpdatedData] = useState({ name: userData.name, email: userData.email })

    const getUserSpecificTodos = () => {
        console.log(todosData)
    }

    const updateUserData = async () => {
        await updateUsers({ ...userUpdatedData, id: userData.id })
    }
    const deleteUserData = async () => {
        const removedUserArray = usersData.filter((user) => user.id !== userData.id)
        setUsersData(removedUserArray)
        await deleteUser(userData.id)
    }

    useEffect(() => {
        todosArr = todosData.map((todo) => todo)
        let flag: boolean = false;
        const tempArr: any[] = todosArr.filter(todo => todo.userId === props.userData.id)
        for (let i = 0; i < tempArr.length; i++) {
            if (!tempArr[i].completed) {
                flag = false;
                break;
            }
            flag = true;
        }
        setCompletedTodos(flag)
    }, [])

    const showOtherDataFunc = () => {
        setShowOtherData(true);
    }
    const unShowOtherDataFunc = () => {
        setShowOtherData(false);
    }

    return (
        <div className={!completedTodos ? Styles.userDataContainerFalse : Styles.userDataContainerTrue}>
            <div className={Styles.userDataInputs}>
                <span>

                    <label className={Styles.UserDataLabel}>ID: {`${userData.id}`}</label>
                </span>
                <span>
                    <label htmlFor='userEmailInput' className={Styles.UserDataLabel}>Name:</label>
                    <input type="text" id="userNameInput" title='userNameInput' className={Styles.UserDataInputFields} value={`${userUpdatedData.name}`} onChange={(e) => setUserUpdatedData((prevState) => ({ ...prevState, name: e.target.value }))} />
                </span>
                <span>

                    <label htmlFor='userEmailInput' className={Styles.UserDataLabel}>Email:</label>
                    <input type="text" id="userEmailInput" title='userEmailInput' className={Styles.UserDataInputFields} value={`${userUpdatedData.email}`} onChange={(e) => setUserUpdatedData((prevState) => ({ ...prevState, email: e.target.value }))} />
                </span>

            </div>
            <span className={Styles.OtherDataButtonContainer}>

                <button title='otherData' onMouseEnter={() => showOtherDataFunc()} className={Styles.buttonShowModal}>Other data</button>
                {showOtherData && <OtherData closeOtherData={unShowOtherDataFunc} userId={props.userData.id} />}
            </span>
            <span className={Styles.buttonsContainer}>
                <button title='update' onClick={() => updateUserData()}>Update</button>
                <button title='delete' onClick={() => deleteUserData()}>Delete</button>
            </span>
        </div>
    )
}
