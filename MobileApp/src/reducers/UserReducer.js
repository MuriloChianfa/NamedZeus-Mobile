export const initialState = {
    id: '',
    name: '',
    email: '',
    avatar: ''
};

export const UserReducer = (state, action) => {
    switch (action.type) {
        case 'setAvatar':
            return { ...state,
                id: action.payload.id,
                name: action.payload.name,
                email: action.payload.email,
                avatar: action.payload.avatar
            };
            break;
        default:
            return state;
            break;
    }
}
