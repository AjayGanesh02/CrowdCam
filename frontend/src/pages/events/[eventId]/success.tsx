import ImageUploadButton from "@/components/upload-image";
import {useRouter} from "next/router";

const SuccessPage = () => {
  const router = useRouter();

  return (
    <main className={"min-h-screen overscroll-none bg-gradient-to-t from-black to-[#292F36]"}>
      <div className={"py-auto px-4 pt-32"}>
        <div className={"text-3xl py-4 text-[#BFD7FF] font-bold text-center pb-10 px-8"}>
          <p>
            Thanks for uploading your photo(s)!
          </p>

          <div className="w-full">
            <button
              className={
                "text-white border w-full max-w-80 mx-auto py-4 border-[#292f36] rounded-xl bg-[#292F36] bg-opacity-40 mt-36 text-lg"
              }
              onClick={() => {
                router.push({pathname: "/"});
              }}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default SuccessPage
