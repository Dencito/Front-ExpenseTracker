import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import { enviroments } from '../enviroments'
import { Button, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

const NewsList = () => {
    const [data, setData] = useState(null)
    const [search, setSearch] = useState("finanzas")
    const [searchValue, setSearchValue] = useState("")
    useEffect(() => {
        const getNews = async () => {
            const response = await fetch(`${enviroments.backend.url}/news?apiKey=${enviroments.news.apiKey}&q=${search}&language=es&sortBy=publishedAt`);
            const data = await response.json()
            setData(data.articles)
        }
        getNews()
    }, [search])
    return (
        <div className='content-general col-12 col-xl-10 mx-auto'>
            <div className="d-flex flex-column align-items-center gap-3 justify-content-center my-5">
            <div className='col-2 d-flex'>
                <TextField variant="standard" type="search" onChange={(e) => { setSearchValue(e.target.value) }} />
                <Button color="primary"  onClick={() => setSearch(searchValue)}> <SearchIcon /></Button>
            </div>
                <div className="d-flex gap-3 w-100 justify-content-center overflow-auto">
                <Button color="primary" variant="outlined" onClick={() => setSearch("finanzas")}>Finanzas</Button>
                <Button color="primary" variant="outlined" onClick={() => setSearch("criptomonedas")}>Criptomonedas</Button>
                <Button color="primary" variant="outlined" onClick={() => setSearch("inversiones")}>Inversiones</Button>
                </div>
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