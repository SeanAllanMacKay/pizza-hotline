import { getToken } from '../../hooks/useCookies'

export default async (values) => {
    const {
        REACT_APP_BACKEND
    } = process.env;

    const formData = new FormData()

    Object.entries(values).forEach(([key, value]) => {
        if(Array.isArray(value)){
            formData.append(key, JSON.stringify(value))
        } else {
            formData.append(key, value)
        }
    })

    const response = await fetch(`${REACT_APP_BACKEND}/upsert-crust`, {
        method: 'POST',
        headers: {
            'Authorization': `${getToken().token}`
        },
        body: formData
    })

    return await response.json()
}