import { createContext } from 'react'

const CurrentOrderContext = createContext({})

export const CurrentOrderProvider = CurrentOrderContext.Provider
export default CurrentOrderContext