import React from "react";

const Title = ({data}) => {
    return    <h5 className="card-title">{data.album.name}</h5>
}

const Subtitle = ({data}) => {
    return  <h6 className="card-subtitle mb-2 text-muted">{data.name} by artist {data.artists[0].name}</h6>
}

export {Title, Subtitle};