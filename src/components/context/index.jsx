import { createContext, useState } from "react";


export const Context = createContext(null);

export default function CurrentTabContext({ children }) {
    const [currentTab, setCurrentTab] = useState('');

    return (
        <Context.Provider value={{ setCurrentTab, currentTab }}>{children}</Context.Provider>
    )
}