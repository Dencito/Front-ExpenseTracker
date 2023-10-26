export const enviroments = {
    backend: {
        url: "https://ptq0f8t6m2.execute-api.us-east-1.amazonaws.com/dev",
        urlLocal: "https://ptq0f8t6m2.execute-api.us-east-1.amazonaws.com/dev",
    },
    news: {
        url: process.env.REACT_APP_URL_NEWS,
        apiKey: "f9a948eea2cf4a61b60f108f3c9a68cd"
    }
}