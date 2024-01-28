import { Carousel } from "@material-tailwind/react";
import {useState} from "react";

const QueryPage = () => {
  const [queriedImages, setQueriedImages] = useState([
    "https://crowdcamimages.s3.amazonaws.com/uploads/812c36650da0ab87b027f7407IMG_5179.jpg",
    "https://crowdcamimages.s3.amazonaws.com/uploads/implicit_bias.jpg",
    "https://crowdcamimages.s3.amazonaws.com/uploads/IMG_5174.jpg",
    "https://crowdcamimages.s3.amazonaws.com/uploads/implicit_bias.jpg",
    "https://crowdcamimages.s3.amazonaws.com/uploads/812c36650da0ab87b027f7407IMG_5179.jpg",
  ]);
  const [ active, setActive ] = useState(
    "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    );

    return (
      <main
        className={"h-screen overscroll-none bg-gradient-to-t from-black to-[#292F36]"}
      >
        <div className={"flex items-center text-center px-10"}>
          <div className="grid gap-4">
            <div>
              <img
                className="h-auto w-full max-w-full rounded-lg object-cover object-center md:h-[480px]"
                src={active}
                alt=""
              />
            </div>
            <div className="grid grid-cols-5 gap-4">
              {queriedImages.map((imgelink, index) => (
                <div key={index}>
                  <img
                    onClick={() => setActive(imgelink)}
                    src={imgelink}
                    className="h-20 max-w-full cursor-pointer rounded-lg object-cover object-center"
                    alt="gallery-image"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    )
  }

      export default QueryPage
