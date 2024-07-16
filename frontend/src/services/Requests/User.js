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
UserRequest.addPoints = (userId, points) => {
    return fetch({
        url: `${user}/${userId}/add-points`,
        method: "post",
        data: {points},
    });
};

UserRequest.deductPoints = (userId, points) => {
    return fetch({
        url: `${user}/${userId}/deduct-points`,
        method: "post",
        data: {points},
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

export default UserRequest;
