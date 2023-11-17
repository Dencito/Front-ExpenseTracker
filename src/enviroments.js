export const enviroments = {
    backend: {
        url: "https://zmyds2t5da.execute-api.us-east-1.amazonaws.com/prd",
        urlLocal: "https://zmyds2t5da.execute-api.us-east-1.amazonaws.com/prd",
    },
    news: {
        url: process.env.REACT_APP_URL_NEWS,
        apiKey: "f9a948eea2cf4a61b60f108f3c9a68cd"
    }
}