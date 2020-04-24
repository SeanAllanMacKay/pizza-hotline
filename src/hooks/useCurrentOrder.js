import { useState } from "react"

export default () => {
    const [currentOrder, setCurrentOrder] = useState(null)

    return {
        currentOrder,
        setCurrentOrder,
    }
}