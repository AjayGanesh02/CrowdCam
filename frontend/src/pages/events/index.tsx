import {ChevronRightIcon} from "@heroicons/react/16/solid";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {useRouter} from "next/router";
import {useEffect} from "react";

const EventsPage = () => {

  const router = useRouter();
  useEffect(() => {
    console.log(router.query.type)
  }, [router])

  return (
    <main className={"min-h-screen overscroll-none bg-gradient-to-t from-black to-[#292F36]"}>
      <div className={"px-8"}>
        <div className={"mx-auto pt-8"}>
          <div className={"text-3xl pt-4 text-[#BFD7FF] font-bold flex"}>
            <p>
              Events Page
            </p>
            <MagnifyingGlassIcon className={"w-8 ml-auto"}/>

          </div>


          {/* event clickables */}
          <div className={"grid grid-cols-1 lg:grid-cols-2 place-items-center"}>
            <div className={"border border-gray-700 mt-10 w-full max-w-96 rounded-md p-2"}
                 onClick={() => {
                   if (router.query.type == "query") {
                     router.push("/events/spartahack9/query")
                   } else {
                     router.push("/events/spartahack9/upload")
                   }
                 }
                 }>
              <div className="absolute rounded-3xl h-8 w-8 text-xs text-[#292F36] bg-[#BFD7FF]">
                <div className="flex w-full h-full m-auto">
                  <div className="m-auto font-semibold">
                    1/27
                  </div>
                </div>
              </div>
              <div className={"flex p-3 items-center justify-center w-full"}>
                <div className={"flex-shrink-0"}>
                  <img className={"h-16 w-16 rounded-md"}
                       src="//d112y698adiu2z.cloudfront.net/photos/production/challenge_thumbnails/002/716/391/datas/medium_square.png"
                       alt=""/>
                </div>
                <div className={"ml-4 mr-auto"}>
                  <p className={"text-xl text-[#BFD7FF] font-semibold"}>
                    Sparta Hacks 9
                  </p>
                  <p className={"text-sm text-blue-400"}>
                    East Lansing
                  </p>
                </div>
                <ChevronRightIcon className={"w-8 h-8 text-[#BFD7FF] flex-shrink-0"}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default EventsPage
