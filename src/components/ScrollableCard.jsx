
import { useEffect, useRef, useState, useMemo } from "react"

import "../pageStyles/ScrollableCardStyle.css";


const ScrollableCard=()=>{

  const scrollRef=useRef(null)
  const cards=[
    "https://cdn1.ozonusercontent.com/s3/sellerassets/ww2150_q80/262ac286-2e0d-11f1-adce-7a7515a0343e.jpeg",
    "https://cdn1.ozonusercontent.com/s3/sellerassets/ww2150_q80/3d272419-1eb9-11f1-8175-1ecbeb4959c6.jpeg",
    "https://cdn1.ozonusercontent.com/s3/sellerassets/ww2150_q80/4f46e564-2146-11f1-b4d4-1a71538c4c58.jpeg"
  ] 

  useEffect(()=>{
    let currentIndex=0

    const interval=setInterval(()=>{
      if(scrollRef.current){
        currentIndex=(currentIndex+1)%cards.length

        const scrollAmount=currentIndex*scrollRef.current.clientWidth
        scrollRef.current.scrollTo({
          left: scrollAmount,
          behavior: "smooth"
        })
      }
    },10000)

    return ()=>clearInterval(interval)
  },[cards.length])

  return(
    <div className="scroll__container" ref={scrollRef}>
      {cards.map((url, index)=>(
        <img className="scroll__cards"
        key={index}
        src={url} 
        alt={`Картинка ${index+1}`}
        />
      ))}
    </div>
  )
}
export default ScrollableCard