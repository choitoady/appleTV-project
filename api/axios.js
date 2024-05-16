import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: "e39171296c669e02690b475f0a9e7af7",
        language: "ko-KR",
    },
});

export default instance;