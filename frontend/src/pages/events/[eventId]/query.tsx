import { useEffect, useState } from "react";

import Image from "next/image";
import ImageUpload from "@/components/upload-image";
import { saveAs } from "file-saver";
import { useRouter } from "next/router";
import {ArrowDownTrayIcon} from "@heroicons/react/24/outline";

const QueryPage = () => {
  const [ prompt, setPrompt ] = useState<string>("We don't have an image for you. Please upload one!");
  const [queryResults, setQueryResults] = useState<string[]>([]);
  const [active, setActive] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (queryResults.length > 0) {
      setActive(queryResults[0]);
    }
  }, [queryResults]);

  return (
    <div
      className={
        "min-h-screen h-auto overscroll-none bg-gradient-to-t from-black to-[#292F36] text-center"
      }
    >
      <div className={"text-3xl pt-8 px-8 text-[#BFD7FF] font-bold"}>
        <p>Query {queryResults.length > 0 ? "Results" : "Page"}</p>
      </div>
      <div className={""}>
        {queryResults.length == 0 ? (
          <div className={"mt-12"}>
            <p className={"text-white my-8 px-4"}>
              {prompt}
            </p>
            <ImageUpload
              search={true}
              begun={() => {}}
              setter={(reply: any) => {
                if (reply.error) {
                  setPrompt(`${ reply.error }. Please try again.`);
                }
                else {
                  setQueryResults(reply.matches);
                }
              }}
              eventId={
                typeof router.query.eventId == "string"
                  ? router.query.eventId
                  : ""
              }
            />
          </div>
        ) : (
          <>
            <div className={"flex px-10 pb-20 mt-4"}>
              <div className="grid gap-4 mx-auto">
                <div className="flex items-center max-h-[480px] relative">
                  <img
                    className="rounded-lg object-contain mx-auto h-[480px] sm:h-[480px]"
                    src={active}
                    alt=""
                  />
                  {/*<div className={"absolute bottom-1 right-1"}>*/}
                  {/*  <ArrowDownTrayIcon className={"w-8 text-white"}/>*/}
                  {/*</div>*/}
                </div>
                <div
                  className={"text-blue-500 underline"}
                  onClick={() => {
                    saveAs(active, "CrowdCamPicture.png");
                  }}
                >
                  Download Image Here
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                  {queryResults?.map((imgelink, index) => (
                    <div
                      key={index}
                      className="h-20 w-max-full cursor-pointer rounded-lg relative"
                    >
                      <Image
                        onClick={() => setActive(imgelink)}
                        src={imgelink}
                        className="object-cover rounded-md"
                        alt="gallery-image"
                        fill={true}
                      />
                    </div>
                  ))}
                </div>
                <div className={"text-gray-400"}>
                  {queryResults?.length} Queries Found
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QueryPage;
