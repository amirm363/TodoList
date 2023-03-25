import { atom } from 'recoil'


export const usersTodosState = atom<any[]>({
    key: 'usersTodosState',
    default: []
})
export const usersDataState = atom<any[]>({
    key: 'usersDataState',
    default: []
})
export const usersPostsState = atom<any[]>({
    key: 'usersPostsState',
    default: []
})