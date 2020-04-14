import { getToken } from '../../hooks/useCookies'

export default async () => {
    const {
        REACT_APP_BACKEND
    } = process.env;

    const response = await fetch(`${REACT_APP_BACKEND}/topping-tags`, {
        method: 'Get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${getToken().token}`
        }
    })

    return await response.json()
}