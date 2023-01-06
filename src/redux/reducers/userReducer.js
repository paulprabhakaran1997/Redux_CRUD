const initialValue = {
    userList  : []
};


const userReducer = (state = initialValue , action) =>{
    const { type , payload } = action;
    
    switch(type){
        case 'ADD_USER':
            return {
                ...state,
                userList : [...state.userList , payload]
            }

        case 'EDIT_USER':
            // console.log("Payload = " , payload)
            const editedUserList = [...state.userList].map((data) => data.id === payload.index ? payload.data : data);
            console.log("Final = " , editedUserList)
            return {
                ...state,
                userList : editedUserList
            }

        case 'DELETE_USER':
            // console.log("Payload = " , payload)
            const deletedUserList = [...state.userList].filter((data) => data.id !== payload.index);
            console.log("Final = " , deletedUserList)
            return {
                ...state,
                userList : deletedUserList
            }

        default:
            return state
    }

    return state
}

export default userReducer