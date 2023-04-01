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

export const otherDataOpen = atom<Boolean>({
    key: 'otherDataOpen',
    default: false
})

export const pageNumberState = atom<number>({
    key: 'pageNumberState',
    default: 0
})
export const prevPageState = atom<number>({
    key: 'prevPageState',
    default: 0
})