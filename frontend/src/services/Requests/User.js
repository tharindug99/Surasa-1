import fetch from "axiosConfig/FetchInterceptor";

const UserRequest = {};
const user = "users";

UserRequest.addAUser = (data) => {
    return fetch({
        url: user,
        method: "post",
        data: data,
    });
};

UserRequest.getAllUsers = (params) => {
    return fetch({
        url: user,
        method: "get",
        params: params,
    });
};

UserRequest.getAUser = (id) => {
    return fetch({
        url: `${user}/${id}`,
        method: "get",
    });
};

UserRequest.updateAUser = (params) => {
    return fetch({
        url: user,
        method: "put",
        params: params,
    });
};

UserRequest.deleteAUser = (params) => {
    return fetch({
        url: user,
        method: "delete",
        params: params,
    });
};

// New methods for adding and deducting points ------------ NEW--------------------------------
UserRequest.addLoyaltyPoints = (userId, points) => {
    return fetch({
        url: `users/${userId}/add-loyalty-points`,
        method: 'patch',
        data: { points }
    });
};

UserRequest.deductLoyaltyPoints = (userId, points) => {
    return fetch({
        url: `users/${userId}/deduct-loyalty-points`,
        method: 'patch',
        data: { points }
    });
};


UserRequest.loginUser = async (formData) => {
    try {
        const response = await fetch({
            url: `${user}/login`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: formData,
        });

        if (response.status !== 200) {
            // Handle non-ok responses
            if (response.data.message) {
                throw new Error(response.data.message);
            } else {
                throw new Error('Network response was not ok');
            }
        }

        return response.data;
    } catch (error) {
        console.error('An error occurred during login:', error);
        throw error;
    }
};


UserRequest.logoutUser = async () => {
    try {
        const response = await fetch(`${user}/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            },
        });
        console.log("response", response);
        console.log("response.data", response.data);
        if (!response.data.success) {
            const errorResponse = await response();
            throw new Error(errorResponse.message || 'Network response was not ok');
        }
        localStorage.clear();
        // const data = response.parseJSON();
        // return data;
    } catch (error) {
        console.error('An error occurred during logout:', error.message);
        console.log("response");
        throw error;
    }
};





export default UserRequest;
