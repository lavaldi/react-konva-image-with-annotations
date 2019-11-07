import React, { useState, useEffect } from "react";
import { Image } from "react-konva";

const ImageFromUrl = ({ imageUrl, setCanvasMeasures }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const image = new window.Image();
    image.src = imageUrl;
    image.addEventListener("load", () => {
      setImage(image);
      setCanvasMeasures({
        width: image.width,
        height: image.height
      });
    });

    return () => image.removeEventListener("load");
  }, [imageUrl, setImage]);

  return <Image image={image} />;
};

export default ImageFromUrl;
