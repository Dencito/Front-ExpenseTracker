
export const enviroments = {
    backend: {
        url: process.env.REACT_APP_URL_BACK,
        urlLocal: "http://54.172.163.47:5117/api"
    },
    news: {
        url: process.env.REACT_APP_URL_NEWS,
        apiKey: process.env.REACT_APP_API_KEY_NEWS
    }
}