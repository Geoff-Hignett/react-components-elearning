import { createContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({children}){
    const [startConfidenceLevels, setStartConfidenceLevels] = useState([5, 5, 5]);
    const [finishConfidenceLevels, setFinishConfidenceLevels] = useState([5, 5, 5]);

    const updateStartConfidenceLevels = (newArr) => {
        setStartConfidenceLevels(newArr);
    }

    const updateFinishConfidenceLevels = (newArr) => {
        setFinishConfidenceLevels(newArr);
    }

    return (
        <AppContext.Provider value={{ startConfidenceLevels, updateStartConfidenceLevels, finishConfidenceLevels, updateFinishConfidenceLevels }}>{children}</AppContext.Provider>
    );
}

export default AppContext;