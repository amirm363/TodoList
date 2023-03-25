import React, { useEffect, useState } from "react";
import Styles from "./DataCard.module.scss";
import { fetchUsers, fetchTodos, fetchPosts } from "../../utils/fetchData"
import UserData from "../UserData/UserData";
import Pagination from "../Pagination/Pagination";
import { useRecoilState } from 'recoil'

import { usersTodosState, usersDataState, usersPostsState } from "../../atoms/atoms"

export function DataCard() {
    const [usersData, setUsersData] = useRecoilState<any[]>(usersDataState)
    const [todosData, setTodosData] = useRecoilState<any[]>(usersTodosState)
    const [postsData, setPostsData] = useRecoilState<any[]>(usersPostsState)
    const [pageNumber, setPageNumber] = useState(0)
    const [pageRadius, setPageRadius] = useState(0)
    const [searchedUsersArray, setSearchedUsersArray] = useState<any[]>([])
    const [UsersDataContainerStyle, setUsersDataContainerStyle] = useState({ 1: "UsersDataContainer", 2: "UsersDataContainerSwitch" })


    const renderPages = (currentPage: number) => {
        setPageNumber(currentPage - 1)
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

    const searchUsers = (input: string) => {

        const searchedUsersArray = usersData.filter(user => user.name.toLowerCase().includes(input.toLowerCase()))

        setSearchedUsersArray(searchedUsersArray)
    }
    return (
        <div className={Styles.card}>
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
                    return <UserData key={index} userData={user} />
                }).slice(pageNumber, pageNumber + 2)
                    : usersData.map((user, index) => {
                        return <UserData key={index} userData={user} />
                    }).slice(pageNumber * 2, pageNumber * 2 + 2)
                }
            </div>
            <Pagination pages={searchedUsersArray.length > 0 ? Math.floor(searchedUsersArray.length / 2 + 0.5) : Math.floor(usersData.length / 2 + 0.5)} setPageNumber={renderPages} />
        </div>
    );
}
