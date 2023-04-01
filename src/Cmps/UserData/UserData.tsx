import React, { useEffect, useMemo, useRef, useState } from 'react'
import Styles from './UserData.module.scss'
import { useRecoilState, useRecoilValue } from 'recoil'
import { updateUsers, deleteUser } from '../../utils/fetchData'
import { otherDataOpen, pageNumberState, prevPageState, usersDataState, usersPostsState, usersTodosState } from "../../atoms/atoms"
import OtherData from '../OtherData/OtherData';


export default function UserData(props: any) {
    let todosArr: any[];

    const [usersData, setUsersData] = useRecoilState<any[]>(usersDataState)
    const [userData, setUserData] = useState(props.userData)
    const [todosData, setTodosData] = useRecoilState<any[]>(usersTodosState)
    const [postsData, setPostsData] = useRecoilState<any[]>(usersPostsState)
    const [completedTodos, setCompletedTodos] = useState(false);
    const [showOtherData, setShowOtherData] = useState(false);
    const [userUpdatedData, setUserUpdatedData] = useState({ name: userData.name, email: userData.email })
    const [isOtherDataOpen, setOtherDataOpen] = useRecoilState(otherDataOpen)
    const pageNumber = useRecoilValue(pageNumberState)
    const [prevPage, setPrevPage] = useRecoilState<number>(prevPageState)
    const [swing, setSwing] = useState<boolean>(false)
    const [changeColorOnClick, setChangeColorOnClick] = useState<boolean>(false)
    const [slideInOut, setSlideInOut] = useState<boolean>(false)


    const filterUserSpecificData = (dataType: Array<any>) => {
        return dataType.filter(data => userData.id === data.userId)
    }
    const updateUserData = async () => {
        const indexOfUser = usersData.findIndex(user => user.id === userData.id)
        const newUser = { ...userData, name: userUpdatedData.name, email: userUpdatedData.email }
        const tempUsersData = usersData.map(user => user)
        tempUsersData[indexOfUser] = newUser
        setUsersData([...tempUsersData])
        await updateUsers({ ...userUpdatedData, id: userData.id })
    }
    const deleteUserData = async () => {
        setSwing(true)
        setTimeout(() => {
            if (props.openUserDataFlag) {
                props.openUserDataFunc()
            }
            const removedUserArray = usersData.filter((user) => user.id !== userData.id)
            const removeUserTodos = todosData.filter(user => user.userId !== userData.id)
            const removeUserPosts = postsData.filter(user => user.userId !== userData.id)
            setUsersData(removedUserArray)
            setTodosData(removeUserTodos)
            setPostsData(removeUserPosts)
        }, 3000)
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
    }, [todosData])

    const showOtherDataFunc = () => {
        setShowOtherData(true);
    }
    const unShowOtherDataFunc = () => {
        setOtherDataOpen(false)
        setShowOtherData(false);
    }

    useEffect(() => {
        setOtherDataOpen(true)
    }, [showOtherData])

    useEffect(() => {
        console.log(pageNumber, prevPage)
        if (prevPage > pageNumber) {
            setSlideInOut(true)
        } else {
            setSlideInOut(false)
        }

        setPrevPage(pageNumber)
    }, [pageNumber])


    useEffect(() => {
        if (!props.openUserDataFlag) {

            setChangeColorOnClick(false)
        }

    }, [props.openUserDataFlag])


    const changeColorOnClickFunc = () => {
        if (props.openUserDataFlag && !changeColorOnClick) {
            return
        } else {
            setChangeColorOnClick(!changeColorOnClick)
        }
    }

    return (
        <div className={!slideInOut ? Styles.slideIn : Styles.slideOut}>
            <div className={!completedTodos ? !swing ? Styles.userDataContainerFalseIn : `${Styles.userDataContainerFalseIn} ${Styles.swing}` : !swing ? Styles.userDataContainerTrue : `${Styles.userDataContainerTrue} ${Styles.swing}`} style={{ zIndex: `${100 - userData.id}`, backgroundColor: `${changeColorOnClick && props.openUserDataFlag ? "orange" : "white"}` }} onClick={(event) => {
                changeColorOnClickFunc()
                props.setMoreData({ userId: `${userData.id}`, todos: filterUserSpecificData(todosData), posts: filterUserSpecificData(postsData) })
                props.openUserDataFunc()
            }}>
                <div className={Styles.userDataInputs}>
                    <span onClick={event => event.stopPropagation()}>

                        <label className={Styles.UserDataLabel}>ID: {`${userData.id}`}</label>
                    </span>
                    <span onClick={event => event.stopPropagation()}>
                        <label htmlFor='userEmailInput' className={Styles.UserDataLabel}>Name:</label>
                        <input type="text" id="userNameInput" title='userNameInput' className={Styles.UserDataInputFields} value={`${userUpdatedData.name}`} onChange={(e) => setUserUpdatedData((prevState) => ({ ...prevState, name: e.target.value }))} />
                    </span>
                    <span onClick={event => event.stopPropagation()}>

                        <label htmlFor='userEmailInput' className={Styles.UserDataLabel}>Email:</label>
                        <input type="text" id="userEmailInput" title='userEmailInput' className={Styles.UserDataInputFields} value={`${userUpdatedData.email}`} onChange={(e) => setUserUpdatedData((prevState) => ({ ...prevState, email: e.target.value }))} />
                    </span>

                </div>
                <span className={Styles.OtherDataButtonContainer} onClick={event => event.stopPropagation()}>

                    <button title='otherData' onClick={() => showOtherDataFunc()} className={Styles.buttonShowModal}>Other data</button>
                    {showOtherData && <OtherData closeOtherData={unShowOtherDataFunc} userId={props.userData.id} />}
                </span>
                <span className={Styles.buttonsContainer} onClick={event => event.stopPropagation()}>
                    <button title='update' onClick={() => updateUserData()}>Update</button>
                    <button title='delete' onClick={() => deleteUserData()}>Delete</button>
                </span>
            </div>
        </div>
    )
}
