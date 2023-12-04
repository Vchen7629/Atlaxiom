/*import { useState, useEffect } from "react";

const UserDataStorage = () => {
    let storedUsername;

    try {
        storedUsername = JSON.parse(localStorage.getItem("username")) || '';
    } catch (error) {
        console.error("Error parsing username from localStorage:", error);
        storedUsername = '';
    }

    const [username, setUsername] = useState(storedUsername);

    useEffect(() => {
        localStorage.setItem("username", JSON.stringify(username));
        console.log("Username Data:", username);
    }, [username]);

    return [username, setUsername];
};

export default UserDataStorage;*/