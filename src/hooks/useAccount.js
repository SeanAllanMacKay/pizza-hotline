import { useState } from "react"

import getAccount from '../actions/account/get-account'

import { removeToken } from '../hooks/useCookies'

export default () => {
    const [account, setAccount] = useState(null)

    const refreshAccount = async () => {
        const response = await getAccount()
        if(response.success){
            setAccount(response.user)
        } else {
            setAccount(null)
            removeToken()
        }
    }

    return {
        account,
        setAccount,
        refreshAccount
    }
}