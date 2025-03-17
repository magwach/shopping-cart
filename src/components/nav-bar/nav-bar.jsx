import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { TiHome } from "react-icons/ti";
import { useContext } from "react";
import { Context } from "../context";



export default function NavBar() {
    const { currentTab } = useContext(Context)

    return (
        <nav className="flex flex-row justify-between align-middle w-full container text-[#0d0d0d] text-lg font-bold mx-auto py-2 px-5 lg:px-9 border-2 border-[#0d0d0d] rounded-xl lg:text-2xl lg:py-4 fixed top-1 z-50 bg-white">
            <Link to={'/'} className="cursor-pointer">
                <TiHome className="size-7 lg:size-10 hover-class transition-colors duration-500" color={currentTab === 'Home' && '#D4AF37'} />
            </Link>
            <h2>
                Clothes Store
            </h2>
            <Link to={'/cart'} className="cursor-pointer" >
                <FaShoppingCart className="size-7 lg:size-10 hover-class transition-colors duration-500" color={currentTab === 'Cart' && '#D4AF37'} />
            </Link>
        </nav>
    )
} 