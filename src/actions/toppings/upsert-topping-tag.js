import { getToken } from '../../hooks/useCookies'

export default async (values) => {
    const {
        REACT_APP_BACKEND
    } = process.env;

    const response = await fetch(`${REACT_APP_BACKEND}/upsert-topping-tag`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${getToken().token}`
        },
        body: JSON.stringify(values)
    })

    return await response.json()
}