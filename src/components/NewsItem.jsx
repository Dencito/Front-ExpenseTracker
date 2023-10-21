import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'

const NewsItem = ({ data, query }) => {
  const category = query.charAt(0).toUpperCase() + query.slice(1)
  return (
  <Card sx={{ maxWidth: 300, margin: "auto" }}>
    <CardActionArea>
      <CardMedia
        component="img"
        height="160"
        image={data.urlToImage}
        alt={data.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.description}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
  )
}

export default NewsItem