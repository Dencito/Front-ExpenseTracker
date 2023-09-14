
export const enviroments = {
    backend: {
        url: "https://ptq0f8t6m2.execute-api.us-east-1.amazonaws.com/dev"/* process.env.REACT_APP_URL_BACK */,
        urlLocal: "https://ptq0f8t6m2.execute-api.us-east-1.amazonaws.com/dev" /* "http://54.172.163.47:5117/api" */,
    },
    news: {
        url: process.env.REACT_APP_URL_NEWS,
        apiKey: process.env.REACT_APP_API_KEY_NEWS
    }
}