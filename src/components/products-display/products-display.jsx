import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../store/slices/cart-slice";
import { useEffect } from "react";


export default function DisplayProduct({ product }) {

    const dispatch = useDispatch();
    const { cart } = useSelector(state => state)
    const inCart = cart.some(item => item.id === product.id);
    const displayValue = inCart ? "Remove from" : "Add to";

    function handleClick() {
        const cpyCart = [...cart];
        const index = cpyCart.findIndex(item => item.id === product.id);
        if (index !== -1) {
            dispatch(removeFromCart(product.id));
        } else {
            dispatch(addToCart(product));
        }
    }

    useEffect(() => {
        console.log(cart);
    }, [cart]);
    
    function StarRating({ rating }) {
        return (
            <div className="flex w-full justify-center">
                {[...Array(5)].map((_, index) => {
                    const fillPercentage = Math.max(0, Math.min(100, (rating - index) * 100));
                    return <FillableSVG key={index} fillPercentage={fillPercentage} />;
                })}
            </div>
        );
    }

    function FillableSVG({ fillPercentage }) {
        return (
            <div className="relative w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10">
                <svg className="absolute text-gray-300 w-full h-full">
                    <path
                        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21L12 17.77L5.82 21L7 14.14L2 9.27L8.91 8.26L12 2Z"
                        fill="currentColor"
                    />
                </svg>

                <div
                    className="absolute top-0 left-0 overflow-hidden"
                    style={{ width: `${fillPercentage}%` }}
                >
                    <svg className="text-yellow-500 w-full h-full">
                        <path
                            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21L12 17.77L5.82 21L7 14.14L2 9.27L8.91 8.26L12 2Z"
                            fill="currentColor"
                        />
                    </svg>
                </div>
            </div>
        );
    }

    return (
        <div className="group flex flex-col items-center border-1 rounded-lg p-3  h-[420px] lg:h-[600px] text-xs lg:text-lg cursor-pointer hover:shadow-black hover:shadow-2xl ">
            <img
                src={product?.image}
                alt={product?.title}
                className="w-full h-[50%]"
            />
            <p className="mt-3 font-medium">{product?.title}</p>
            <div className="my-3 text-xl font-bold">${product?.price}</div>
            <StarRating rating={product?.rating?.rate} />
            <button onClick={() => handleClick()} className="hidden group-hover:block border-2 rounded-md bg-[#0d0d0d] text-[#f5f5f5] font-bold w-full h-11 cursor-pointer mt-4 z-1">{displayValue} cart</button>
        </div>
    )
}