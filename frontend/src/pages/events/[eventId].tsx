import ImageUploadButton from "@/components/upload-image";

const EventUploadPage = () => {
  return (
    <main className={"h-screen overscroll-none bg-gradient-to-t from-black to-[#292F36]"}>
      <div className={"pt-8 px-4"}>
        <div className={"text-3xl py-4 text-[#BFD7FF] font-bold text-center"}>
          <p>
            Upload Images Here
          </p>
        </div>
        <ImageUploadButton/>
      </div>
    </main>
  )
}

export default EventUploadPage
