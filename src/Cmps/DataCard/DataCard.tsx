import React, { useEffect, useState } from "react";
import Styles from "./DataCard.module.scss";
import { fetchUsers, fetchTodos, fetchPosts } from "../../utils/fetchData"
import UserData from "../UserData/UserData";
import Pagination from "../Pagination/Pagination";
import { useRecoilState, useRecoilValue } from 'recoil'

import { usersTodosState, usersDataState, usersPostsState, otherDataOpen, pageNumberState } from "../../atoms/atoms"

import MoreDataContainer from "../MoreDataContainer/MoreDataContainer";

export function DataCard() {

    const [usersData, setUsersData] = useRecoilState<any[]>(usersDataState)
    const [todosData, setTodosData] = useRecoilState<any[]>(usersTodosState)
    const [postsData, setPostsData] = useRecoilState<any[]>(usersPostsState)
    const [pageNumber, setPageNumber] = useRecoilState<number>(pageNumberState)
    const [pageRadius, setPageRadius] = useState(0)
    const [searchedUsersArray, setSearchedUsersArray] = useState<any[]>([])
    const testValue = useRecoilValue(otherDataOpen);
    const [openUserData, setOpenUserData] = useState<boolean>(false)
    const [userMoreData, setUserMoreData] = useState<any>()



    const renderPages = (currentPage: number) => {

        setPageNumber(currentPage - 1)


    }

    const openUserDataFunc = () => {
        setOpenUserData(!openUserData)
    }
    useEffect(() => {
        let usersDataWS;
        let todosDataWS;
        let postsDataWS;

        const getUsersDataFromWS = async () => {
            return await fetchUsers()
        }
        const getTodosDataFromWS = async () => {
            return await fetchTodos()
        }
        const getPostsDataFromWS = async () => {
            return await fetchPosts()
        }
        usersDataWS = getUsersDataFromWS();
        todosDataWS = getTodosDataFromWS()
        postsDataWS = getPostsDataFromWS()



        todosDataWS.then((res) => setTodosData(res))
        usersDataWS.then((res) => setUsersData(res))
        postsDataWS.then((res) => setPostsData(res))

    }, [])

    useEffect(() => {
        console.log(usersData)
    }, [usersData])
    useEffect(() => {
        setPageRadius(pageNumber + 2)
    }, [pageNumber])

    useEffect(() => {
        console.log(userMoreData)
    }, [userMoreData])
    useEffect(() => {
        console.log(searchedUsersArray)
    }, [searchedUsersArray])


    const searchUsers = (input: string) => {

        const searchedUsersArray = usersData.filter(user => user.name.toLowerCase().includes(input.toLowerCase()))

        setSearchedUsersArray(searchedUsersArray)
    }
    return (
        <div className={openUserData ? `${Styles.card} ${Styles.animate}` : `${Styles.card}`} >
            <span className={Styles.searchInputContainer}>
                <input
                    type="text"
                    title="search"
                    id="searchInput"
                    required={true}
                    className={Styles.searchInput}
                    onChange={(e) => searchUsers(e.target.value)}
                ></input>
                <label htmlFor="searchInput" className={Styles.searchLabel}>Search</label>
                <button title="add" className={Styles.addButton}>ADD</button></span>
            <div className={Styles.UsersDataContainer}>

                {searchedUsersArray.length > 0 ? searchedUsersArray.map((user, index) => {

                    return <UserData key={user.id} userData={user} openUserDataFunc={openUserDataFunc} setMoreData={setUserMoreData} openUserDataFlag={openUserData} />
                }).slice(pageNumber, pageNumber + 2)
                    : usersData.map((user, index) => {
                        return <UserData key={user.id} userData={user} openUserDataFunc={openUserDataFunc} setMoreData={setUserMoreData} openUserDataFlag={openUserData} />
                    }).slice(pageNumber * 2, pageNumber * 2 + 2)
                }
            </div>
            <Pagination pages={searchedUsersArray.length > 0 ? Math.floor(searchedUsersArray.length / 2 + 0.5) : Math.floor(usersData.length / 2 + 0.5)} setPageNumber={renderPages} />
            {openUserData && userMoreData && <div className={Styles.todosAndPosts} >
                <MoreDataContainer type="Todos" userFullData={userMoreData} setTodosData={setTodosData} />
                <MoreDataContainer type="Posts" userFullData={userMoreData} setTodosData={setTodosData} />
            </div>}
        </div>
    );
}
