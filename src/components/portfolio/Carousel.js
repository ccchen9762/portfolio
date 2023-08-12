import React, { useState } from "react";
import { Image } from "react-bootstrap";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

function Carousel({images}) {
  const[image, setImage] = useState(0);

  const prevSlide = () => {
    setImage(image === 0 ? images.length-1 : image-1);
  }

  const nextSlide = () => {
    setImage(image === images.length-1 ? 0 : image+1);
  }

  return (
      <div className="w-fit h-full m-0 p-0 flex justify-center items-center relative bg-gray-700 rounded-xl">
        <BsArrowLeftCircleFill className="absolute w-8 h-8 left-4 text-white drop-shadow-lg hover:cursor-pointer hover:!text-slate-200 active:!text-slate-600" onClick={prevSlide}/>
          {images.map((item, index) => {
              if(item.type === "img")
                return <Image src={require(`../../assets/images/${item.src}`)} alt={item.alt} key={index} className={image === index ? "w-auto h-full py-4 select-none" : "hidden"}/>
              else
                return <iframe src={item.src} className={image === index ? "w-8/12 h-full py-4 select-none" : "hidden"}/>
          })}
        <BsArrowRightCircleFill className="absolute w-8 h-8 right-4 text-white drop-shadow-lg hover:cursor-pointer hover:!text-slate-200 active:!text-slate-600" onClick={nextSlide}/>
        <span className="flex absolute bottom-2">
          {images.map((_, index) => {
            return <button key={index} onClick={() => {setImage(index)}} className={image === index ? "w-2 h-2 mx-1 mb-0 bg-white rounded-full drop-shadow-lg border-0 outline-0" : 
              "w-2 h-2 mx-1 mb-0 bg-zinc-500 rounded-full drop-shadow-lg border-0 outline-0"}></button>
          })}
        </span>
      </div>
  );
}

export default Carousel;