import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import { enviroments } from '../enviroments'
import { Button } from '@mui/material'

const NewsList = () => {
    const [data, setData] = useState(null)
    const [search, setSearch] = useState("finanzas")
    const [searchValue, setSearchValue] = useState("")
    useEffect(() => {
        const getNews = async () => {
            const response = await fetch(`${enviroments.news.url}/everything?q=${search}&apiKey=${enviroments.news.apiKey}&language=es&sortBy=publishedAt`);
            const data = await response.json()
            setData(data.articles)
        }
        getNews()
    }, [search])
    console.log(data)
    return (
        <div className='content-general col-10'>
            <input type="text" onChange={(e) => { setSearchValue(e.target.value) }} />
                <Button color="primary" variant="outlined" onClick={() => setSearch(searchValue)}>Buscar</Button>

            <div className="d-flex gap-2 justify-content-center my-5">
                <Button color="primary" variant="outlined" onClick={() => setSearch("finanzas")}>Finanzas</Button>
                <Button color="primary" variant="outlined" onClick={() => setSearch("criptomonedas")}>Criptomonedas</Button>
                <Button color="primary" variant="outlined" onClick={() => setSearch("inversiones")}>Inversiones</Button>
            </div>


            <div className="d-flex flex-wrap">
                {data?.map(item => (
                    <NewsItem key={item.url} data={item} query={search} />
                ))}
            </div>
        </div>
    )
}

export default NewsList