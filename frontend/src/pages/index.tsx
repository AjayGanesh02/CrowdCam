import ImageUpload from "@/components/upload-image";
import Logo from "../../public/logo.svg";
import Image from "next/image";
import {useRouter} from "next/router";

export default function Home() {

  const router = useRouter();

  return (
    <main
      className={
        "h-screen overscroll-none bg-gradient-to-t from-black to-[#292F36]"
      }
    >
      <div className={"flex items-center text-center px-10"}>
        <div className={"mt-48 mx-auto"}>
          <Image src={Logo} alt={"logo"} width={150} className={"mx-auto"} />
          <p
            className={
              "text-center mt-8 text-5xl sm:text-6xl font-bold bg-gradient-to-r from-purple-800 to-blue-500 text-transparent bg-clip-text"
            }
          >
            CROWDCAM
          </p>
          <p
            className={
              "text-2xl sm:text-3xl px-4 text-[#BFD7FF] mt-4 sm:mt-7 font-bold"
            }
          >
            Find yourself amongst the crowds
          </p>
          <div>
            <button
              className={"text-white border w-80 py-4 border-[#292f36] rounded-xl bg-[#292F36] bg-opacity-40 mt-16 text-lg"}
            >
              Find Yourself
            </button>
          </div>
          <div>
            <button
              className={"text-white border w-80 py-4 border-[#292f36] rounded-xl bg-[#292F36] bg-opacity-40 text-lg mt-12"}
              onClick={() => {router.push('/events')}}
            >
              Help Others
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
