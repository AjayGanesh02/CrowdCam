import {useState} from "react";
import { Carousel } from "@material-tailwind/react";

const QueryPage = () => {
  const [queriedImages, setQueriedImages] = useState([
    "https://crowdcamimages.s3.amazonaws.com/uploads/812c36650da0ab87b027f7407IMG_5179.jpg",
    "https://crowdcamimages.s3.amazonaws.com/uploads/implicit_bias.jpg",
    "https://crowdcamimages.s3.amazonaws.com/uploads/IMG_5174.jpg",
    "https://crowdcamimages.s3.amazonaws.com/uploads/implicit_bias.jpg",
    "https://crowdcamimages.s3.amazonaws.com/uploads/812c36650da0ab87b027f7407IMG_5179.jpg",
  ])

  return (
    <div className={"overscroll-none bg-gradient-to-t from-black to-[#292F36] text-center"}>
      <Carousel className="rounded-xl">
        <img
          src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
          alt="image 2"
          className="h-full w-full object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
          alt="image 3"
          className="h-full w-full object-cover"
        />
      </Carousel>
      <div className={"text-3xl pt-8 px-8 text-[#BFD7FF] font-bold"}>
        <p>
          Queried Images
        </p>
      </div>
      <div className={"px-4"}>
        {
          queriedImages.map((image, index) => {
            return (
                <img src={image} className={"max-h-96 max-w-96 mx-auto rounded-md my-4"}/>
            )
          })
        }
      </div>
    </div>
  )
}

export default QueryPage
