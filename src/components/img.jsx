import React from "react";

const Img = ({ data }) => {
  return (
    <img
      src={
        data.album.images.length !== 0
          ? data.album.images[0].url
          : "http://placeimg.com/640/640/nature"
      }
      className="card-img-top"
      alt="imagealbum"
    />
  );
};

export default Img;
