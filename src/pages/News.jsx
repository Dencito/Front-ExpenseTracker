import React from 'react'
import NewsList from '../components/NewsList'

const News = () => {
  document.title = "Noticias recomendadas"
  return (
    <NewsList/>
  )
}

export default News