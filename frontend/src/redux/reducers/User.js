import {
    SAVE_USER,
    ADD_USER,
    UPDATE_USER,
    REMOVE_USER,
    SAVE_USERS,
    LOGIN_USER,
    LOGOUT_USER,
    ADD_LOYALTY_POINTS,
    DEDUCT_LOYALTY_POINTS
} from "redux/constants/User";

const initState = {
    users: [],
    currentUser: null,
    token: null,
    tokenType: null,
    expiresIn: null,
};

const User = (state = initState, action) => {
    switch (action.type) {
        case SAVE_USER:
        case SAVE_USERS:
            return {
                ...state,
                users: action.payload,
            };
        case ADD_USER:
            return {
                ...state,
                users: [...state.users, action.payload],
            };
        case UPDATE_USER:
            const updatedUsers = state.users.map((user) =>
                user.id === action.payload.id ? action.payload : user
            );
            return {
                ...state,
                users: updatedUsers,
                currentUser: action.payload.id === state.currentUser?.id ? action.payload : state.currentUser,
            };
        case REMOVE_USER:
            const filteredUsers = state.users.filter((user) => user.id !== action.payload.id);
            return {
                ...state,
                users: filteredUsers,
                currentUser: state.currentUser?.id === action.payload.id ? null : state.currentUser,
            };
        case LOGIN_USER:
            return {
                ...state,
                currentUser: action.payload,
            };

        case LOGOUT_USER:
            return {
                ...state,
                currentUser: null,
                token: null,
                tokenType: null,
                expiresIn: null,
            };
        case ADD_LOYALTY_POINTS:
            return {
                ...state,
                users: state.users.map(u =>
                    u.id === action.payload.user.id ?
                        { ...u, loyalty_points: u.loyalty_points + action.payload.points } :
                        u
                ),
                currentUser: state.currentUser?.id === action.payload.user.id ?
                    { ...state.currentUser, loyalty_points: state.currentUser.loyalty_points + action.payload.points } :
                    state.currentUser
            };

        case DEDUCT_LOYALTY_POINTS:
            return {
                ...state,
                users: state.users.map(u =>
                    u.id === action.payload.user.id ?
                        { ...u, loyalty_points: u.loyalty_points - action.payload.points } :
                        u
                ),
                currentUser: state.currentUser?.id === action.payload.user.id ?
                    { ...state.currentUser, loyalty_points: state.currentUser.loyalty_points - action.payload.points } :
                    state.currentUser
            };
        default:
            return state;
    }
};

export default User;