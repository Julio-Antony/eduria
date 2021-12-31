const ScheduleReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_HARI':
            return {
                ...state,
                hari: action.payload
            }
        default:
            return state
    }
}

export default ScheduleReducer