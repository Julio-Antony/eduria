const setHari = hari => {
    return {
        type: 'SET_HARI',
        payload: hari
    }
}

const exportDefault = {
    setHari
}

export default exportDefault