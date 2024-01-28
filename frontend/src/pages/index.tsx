import Image from "next/image";
import Logo from "../../public/logo.svg";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <main
      className={
        "min-h-screen overscroll-none bg-gradient-to-t from-black to-[#292F36]"
      }
    >
      <div className={"flex items-center text-center px-4 sm:px-10"}>
        <div className={"mt-16 mx-auto"}>
          <Image src={Logo} alt={"logo"} width={150} className={"mx-auto"} />
          <p
            className={
              "text-center mt-8 text-4xl sm:text-6xl font-bold bg-gradient-to-r from-purple-800 to-blue-500 text-transparent bg-clip-text"
            }
          >
            CROWDCAM
          </p>
          <p
            className={
              "text-xl sm:text-3xl px-4 text-[#BFD7FF] mt-4 sm:mt-7 font-bold"
            }
          >
            Find yourself amongst the crowds
          </p>
          <div className="w-full">
            <button
              className={
                "text-[#BFD7FF] border w-full max-w-80 mx-auto py-4 border-[#292f36] rounded-xl hover:cursor-pointer hover:bg-opacity-40 hover:bg-[#292F36] mt-36 text-lg"
              }
              onClick={() => {
                router.push({ pathname: "/events", query: { type: "query" } });
              }}
            >
              Find Yourself
            </button>
          </div>
          <div>
            <button
              className={
                "text-[#BFD7FF] border w-full max-w-80 mx-auto py-4 border-[#292f36] rounded-xl hover:cursor-pointer hover:bg-opacity-40 hover:bg-[#292F36] text-lg mt-4"
              }
              onClick={() => {
                router.push({ pathname: "/events", query: { type: "upload" } });
              }}
            >
              Help Others
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
