import axios from "axios";


export const fetchUsers = async () => {

    const data = await axios.get("https://jsonplaceholder.typicode.com/users")
    // console.log(data.data)
    return data.data
}

export const fetchTodos = async () => {
    const data = await axios.get("https://jsonplaceholder.typicode.com/todos")
    // console.log(data.data)
    return data.data
}
export const fetchPosts = async () => {
    const data = await axios.get("https://jsonplaceholder.typicode.com/posts")
    // console.log(data.data)
    return data.data
}

export const updateUsers = async (user: any) => {
    const sendData = await axios.put(`https://jsonplaceholder.typicode.com/users/${user.id}`, { ...user })
}
export const deleteUser = async (userId: string) => {
    const sendData = await axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`)
}