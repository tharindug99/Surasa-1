export default function isAuthenticated() {
    const authToken = localStorage.getItem("authToken");
    const tokenExpiration = localStorage.getItem("tokenExpiration");
    const userId = localStorage.getItem("userId");
    const firstName = localStorage.getItem("first_name");
    const currentTime = Date.now();

    return (
        authToken &&
        tokenExpiration &&
        Number(tokenExpiration) > currentTime &&
        userId &&
        firstName
    );
}
