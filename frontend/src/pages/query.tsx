import { useProfileImage } from "@/contexts/ProfileContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ImageUpload from "@/components/upload-image";

const QueryPage = () => {

  const [queryResults, setQueryResults] = useState<string[]>([]);
  const [ active, setActive ] = useState("");

  useEffect(() => {
    if(queryResults.length > 0) {
      setActive(queryResults[0]);
    }
  }, [queryResults]);

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
        {
          queryResults.length == 0 ? (
            <div>
              <p className={"text-white my-8"}>
                We don&apos;t have an image for you. Please upload one!
              </p>
              <ImageUpload
                search={true}
                setter={(reply: any) => {
                  setQueryResults(reply.matches)}
                }
              />
            </div>
          )
            :
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
                  {queryResults?.map((imgelink, index) => (
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
        }
      </div>
    </main>
  );
};

export default QueryPage;
