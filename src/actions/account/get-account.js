import { getToken } from '../../hooks/useCookies'

export default async () => {
    const response = await fetch('/get-account', {
        method: 'Get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${getToken().token}`
        }
    })

    return await response.json()
}