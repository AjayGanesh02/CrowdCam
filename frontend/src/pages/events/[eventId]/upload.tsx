import ImageUploadButton from "@/components/upload-image";
import { useRouter } from "next/router";

const EventUploadPage = () => {
  const router = useRouter();

  return (
    <main
      className={
        "min-h-screen overscroll-none bg-gradient-to-t from-black to-[#292F36]"
      }
    >
      <div className={"pt-8 px-4"}>
        <div className={"text-3xl py-4 text-[#BFD7FF] font-bold text-center"}>
          <p>Upload Images Here</p>
        </div>
        <ImageUploadButton
          search={false}
          begun={() => {}}
          setter={(url: string) => {
            console.log("SETTER CALLED");
            router.push(`/events/${router.query.eventId}/success`);
          }}
          eventId={
            typeof router.query.eventId == "string" ? router.query.eventId : ""
          }
        />
      </div>
    </main>
  );
};

export default EventUploadPage;
