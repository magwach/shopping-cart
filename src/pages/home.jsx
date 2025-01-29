import { useContext, useEffect, useState } from "react"
import { ImSpinner3 } from "react-icons/im";
import { BiSolidError } from "react-icons/bi";
import DisplayProduct from "../components/products-display/products-display";
import { Context } from "../components/context";



export default function Home() {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const {setCurrentTab} = useContext(Context)

    function fetchProducts() {
        setLoading(true);
        fetch('https://fakestoreapi.com/products')
            .then((response) => {
                setLoading(false);
                if (!response.ok) {
                    setErrMsg('Failed to fetch data');
                }
                return response.json();
            }).then((data) => {
                setLoading(false)
                if (data) setProducts(data)
            }).catch((e) => {
                setLoading(false);
                setErrMsg('Failed to fetch data');
            })
    }

    useEffect(() => {
        fetchProducts();
        setCurrentTab('Home')

    }, [])
    return (
        <div className="flex justify-center items-center">
            {
                loading ? <ImSpinner3 className="size-8 lg:size-11 slow-spin" /> : errMsg ?
                    <div className="flex flex-col items-center">
                        <BiSolidError className="size-8 lg:size-11" color="red" />
                        <p className=" font-bold text-lg lg:text-2xl">{errMsg}</p>
                    </div> : 
                    <div className="min-h-[80vh] grid grid-cols-3 gap-6 lg:grid-cols-5 lg:gap-7">
                        {
                            products && products.length && products.map(product => <DisplayProduct product={product} />)
                        }
                    </div>
            }
        </div>

    )
}