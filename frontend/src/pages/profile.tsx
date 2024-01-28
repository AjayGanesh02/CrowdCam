import { useProfileImage } from "@/contexts/ProfileContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ImageUpload from "@/components/upload-image";

const ProfilePage = () => {
  const router = useRouter();
  const { profileImageUrl, setProfileImage } = useProfileImage();
  const [localProfileImage, setLocalProfileImage] = useState<string>("");

  useEffect(() => {
    setLocalProfileImage(profileImageUrl ? profileImageUrl : "");
  }, [profileImageUrl]);

  return (
    <main
      className={
        "h-screen overscroll-none bg-gradient-to-t from-black to-[#292F36] text-center"
      }
    >
      <div className={"text-3xl pt-8 px-8 text-[#BFD7FF] font-bold"}>
        <p>Profile Page</p>
      </div>
      <div className={"mt-12"}>
        {localProfileImage != "" ? (
          <div>
            <img
              src={localProfileImage}
              className={"max-h-96 max-w-full mx-auto rounded-md"}
            />
            <div>
              <p className={"text-white my-8"}>
                This is the image we have for you. Is this good?
              </p>
              <button
                className={
                  "text-white border w-80 py-4 border-[#292f36] rounded-xl bg-[#292F36] bg-opacity-40 text-lg"
                }
                onClick={() => {
                  setProfileImage(localProfileImage);
                  router.push("/query");
                }}
              >
                Choose this image
              </button>
            </div>
            <div className={"mt-4 text-blue-400 underline"}>
              <button
                onClick={() => {
                  setProfileImage("");
                }}
              >
                Not this one!
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p className={"text-white my-8"}>
              We don&apos;t have an image for you. Please upload one!
            </p>
            <ImageUpload
              search={true}
              setter={(reply: string[]) => console.log(reply)}
            />
            {/*<button*/}
            {/*  className={"text-white border w-80 py-4 border-[#292f36] rounded-xl bg-[#292F36] bg-opacity-40 text-lg"}*/}
            {/*  onClick={() => {*/}
            {/*    setLocalProfileImage("https://crowdcamimages.s3.amazonaws.com/uploads/812c36650da0ab87b027f7407IMG_5179.jpg")*/}
            {/*  }}*/}
            {/*>*/}
            {/*  Upload an image*/}
            {/*</button>*/}
          </div>
        )}
      </div>
    </main>
  );
};

export default ProfilePage;
