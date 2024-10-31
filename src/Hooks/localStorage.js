const getStoredData = (key) => {
    const storedData = sessionStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : [];
};

const saveData = (key, Id) => {
    const storedDatum = getStoredData(key);
    
    // Ensure storedDatum is an array
    if (Array.isArray(storedDatum)) {
        const exist = storedDatum.find((dataId) => dataId === Id);
        
        // Only push if the Id doesn't already exist
        if (!exist) {
            storedDatum.push(Id);
            sessionStorage.setItem(key, JSON.stringify(storedDatum));
        }
    } else {
        // If storedDatum is somehow not an array, initialize it as one
        sessionStorage.setItem(key, JSON.stringify([Id]));
    }
};



export {getStoredData, saveData}