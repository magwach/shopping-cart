import { useContext, useEffect, useState } from "react";
import { Context } from "../components/context";
import { useDispatch, useSelector } from "react-redux";
import { Minus, Plus } from "lucide-react";
import { FaTrashAlt } from "react-icons/fa";
import { removeFromCart } from "../store/slices/cart-slice";

export default function Cart() {
    const { setCurrentTab } = useContext(Context);
    const [total, setTotal] = useState(0);
    const [unitTotals, setUnitTotals] = useState({}); 
    const { cart } = useSelector(state => state);
    const dispatch = useDispatch();

    const NumberInput = ({ item, onChange }) => {
        const [quantity, setQuantity] = useState(
            Math.round(unitTotals[item.id] ? unitTotals[item.id] / item.price : 1)
        );

        const handleIncrement = () => {
            const newQuantity = Math.round(quantity + 1);
            setQuantity(newQuantity);
            onChange(item.id, newQuantity);
        };

        const handleDecrement = () => {
            if (quantity > 1) {
                const newQuantity = Math.round(quantity - 1);
                setQuantity(newQuantity);
                onChange(item.id, newQuantity);
            }
        };

        const displayValue = Math.round(quantity);

        return (
            <div className="flex items-center gap-1 w-40">
                <button
                    onClick={handleDecrement}
                    disabled={quantity <= 1}
                    className="h-10 w-10 lg:h-14 lg:w-14 flex items-center justify-center rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 cursor-pointer"
                >
                    <Minus className="w-full h-full" />
                </button>

                <div className="w-full h-full border border-gray-300 rounded text-center align-middle py-1 lg:py-3">
                    <span className="text-center lg:text-2xl">{displayValue}</span>
                </div>

                <button
                    onClick={handleIncrement}
                    className="h-10 w-10 lg:h-14 lg:w-14 flex items-center justify-center rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 cursor-pointer"
                >
                    <Plus className="w-full h-full" />
                </button>
            </div>
        );
    };

    function handleRemove(item) {
        dispatch(removeFromCart(item.id));
        setUnitTotals(prev => {
            const { [item.id]: _, ...rest } = prev;
            return rest;
        });
    }

    function handleQuantityChange(id, newQuantity) {
        setUnitTotals(prev => ({
            ...prev,
            [id]: newQuantity * cart.find(item => item.id === id).price,
        }));
    }

    useEffect(() => {
        setCurrentTab('Cart');
    }, []);

    useEffect(() => {
        const currentTotals = cart.reduce((acc, cur) => acc + cur.price * (unitTotals[cur.id] ? unitTotals[cur.id] / cur.price : 1), 0);
        setTotal(currentTotals + Object.values(unitTotals).reduce((acc, cur) => acc + cur, 0));
    }, [unitTotals, cart]);

    return (
        cart && cart.length ? (
            <div className="flex flex-col gap-3 items-center mb-7">
                {cart.map(item => (
                    <div key={item.id} className="flex flex-col w-full border-1 border-black p-4">
                        <div className="flex flex-row gap-3">
                            <div className="h-[120px] w-[90px] lg:h-[160px] lg:w-[120px] ">
                                <img src={item.image} alt={item.title} className="w-full h-full" />
                            </div>
                            <div className="flex flex-col w-full gap-23">
                                <div className="flex justify-between w-full">
                                    <p className="text-lg font-semibold lg:text-2xl">{item.title}</p>
                                    <p className="text-lg font-semibold lg:text-2xl">${item.price}</p>
                                </div>
                                <div className="flex flex-row justify-between w-full">
                                    <FaTrashAlt color="black" className="size-7 lg:size-14 cursor-pointer" onClick={() => handleRemove(item)} />
                                    <NumberInput item={item} onChange={handleQuantityChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <div className=" text-2xl font-bold fixed bottom-2 z-50 bg-white w-[80vw] text-center rounded-xl border-2 border-black ">Total= ${total}</div>
            </div>
        ) : (
            <div className="text-center text-2xl font-bold">Your cart is empty</div>
        )
    );
}
