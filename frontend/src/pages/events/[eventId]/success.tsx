import ImageUploadButton from "@/components/upload-image";

const EventUploadPage = () => {
  return (
    <main className={"min-h-screen overscroll-none bg-gradient-to-t from-black to-[#292F36]"}>
      <div className={"h-screen py-auto px-4 grid grid-cols-1 items-center"}>
        <div className={"text-3xl py-4 text-[#BFD7FF] font-bold text-center"}>
          <p>
            Thanks for uploading!
          </p>
        </div>
      </div>
    </main>
  )
}

export default EventUploadPage
