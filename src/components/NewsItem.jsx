import React from 'react'

const NewsItem = ({data, query}) => {
  return (
    <div className="card p-5 w-1/2 mx-auto bg-base-100 shadow-xl">
  <figure><img src={data.urlToImage} alt={data.title} /></figure>
  <div className="card-body">
    <h2 className="card-title">
      {data.title}
      <div className="badge badge-secondary">NEW</div>
    </h2>
    <p>{data.description}</p>
    <div className="card-actions justify-end">
      <div className="badge badge-outline">{query.charAt(0).toUpperCase() + query.slice(1)}</div> 
    </div>
  </div>
</div>
  )
}

export default NewsItem