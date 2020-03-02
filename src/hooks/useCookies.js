import Cookies from 'universal-cookie'

const cookies = new Cookies()

export const getToken = () => cookies.get('pizza-hotline-token')

export const setToken = (newCookie) => {
    cookies.set('pizza-hotline-token', JSON.stringify(newCookie), { path: '/' })
}

export const removeToken = () => {
    cookies.remove('pizza-hotline-token', { path: '/' })
}