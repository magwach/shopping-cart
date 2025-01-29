import { useContext, useEffect } from "react"
import { Context } from "../components/context"



export default function Cart() {

    const { setCurrentTab } = useContext(Context);

    useEffect(() => {
        setCurrentTab('Cart')
    }, [])

    return (
        <div>Cart</div>
    )
}