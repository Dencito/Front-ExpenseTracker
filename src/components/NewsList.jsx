import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'

const NewsList = () => {
    const [data, setData] = useState(null)
    const [search, setSearch] = useState("finanzas")
    useEffect(() => {
        const getNews = async () => {
            const response = await fetch(`https://newsapi.org/v2/everything?q=${search}&apiKey=f9a948eea2cf4a61b60f108f3c9a68cd&language=es&sortBy=publishedAt`);
            const data = await response.json()
            setData(data.articles)
        }
        getNews()
    }, [search])
    console.log(data)
    return (
        <div className='container overflow-auto h-screen'>
            <input type="text" onChange={(e)=> {setSearch(e.target.value)}} />

            <div className="flex gap-2 justify-center mt-5">
                <button className='btn btn-secondary btn-outline' onClick={() => setSearch("finanzas")}>Finanzas</button>
                <button className='btn primary btn-outline' onClick={() => setSearch("criptomonedas")}>Criptomonedas</button>
                <button className='btn btn-success btn-outline' onClick={() => setSearch("inversiones")}>Inversiones</button>
            </div>
            

            <div className="flex flex-wrap">
                {data?.map(item => (
                    <NewsItem key={item.url} data={item} query={search} />
                ))}
            </div>
        </div>
    )
}

export default NewsList