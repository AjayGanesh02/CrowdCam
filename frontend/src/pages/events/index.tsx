import { ChevronRightIcon } from "@heroicons/react/16/solid";
import { MagnifyingGlassIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { kv } from "@vercel/kv";
import {useEffect, useState} from "react";

export type EventType = {
  eventId: string;
  name: string;
  date: string;
  location: string;
  imageUrl: string
};

const EventsPage = ({ events }: { events: EventType[] }) => {
  const router = useRouter();
  const [toggleSearch, setToggleSearch] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [displayEvents, setDisplayEvents] = useState<EventType[]>(events);

  useEffect(() => {
    if (search.length > 0) {
      setDisplayEvents(events.filter((event) => event.name.toLowerCase().includes(search.toLowerCase())));
    } else {
      setDisplayEvents(events);
    }
  }, [events, search]);

  return (
    <main
      className={
        "min-h-screen overscroll-none bg-gradient-to-t from-black to-[#292F36]"
      }
    >
      <div className={"px-8"}>
        <div className={"mx-auto pt-8"}>
          <div className={"text-3xl pt-4 text-[#BFD7FF] font-bold flex"}>
            <span>Events Page</span>
            <MagnifyingGlassIcon className={"w-8 ml-auto"} onClick={() => setToggleSearch((prevState) => !prevState)}/>
            <PlusCircleIcon  className={"w-8 ml-1 sm:ml-4"} onClick={() => router.push('/events/create')}/>
          </div>
          {
            toggleSearch &&
            <input className={"w-full mt-2 rounded-md p-1"}
                   value={search}
                   onChange={(e) => setSearch(e.target.value)}/>
          }

          {/* event clickables */}
          <div className={"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 place-items-center mt-10"}>
            {displayEvents.map((event, idx) => (
              <div
                key={idx}
                className={
                  "border border-gray-700 w-full rounded-md p-2 hover:cursor-pointer hover:bg-opacity-40 hover:bg-[#292F36]"
                }
                onClick={() => {
                  if (router.query.type == "upload") {
                    router.push(`/events/${event.eventId}/upload`);
                  } else {
                    router.push(`/events/${event.eventId}/query`);
                  }
                }}
              >
                <div className="absolute rounded-3xl h-8 w-8 text-xs text-[#292F36] bg-[#BFD7FF]">
                  <div className="flex w-full h-full m-auto">
                    <div className="m-auto font-semibold">{event.date}</div>
                  </div>
                </div>
                <div className={"flex p-3 items-center justify-center w-full"}>
                  <div className={"flex-shrink-0"}>
                    <img
                      className={"h-16 w-16 rounded-md"}
                      src="//d112y698adiu2z.cloudfront.net/photos/production/challenge_thumbnails/002/716/391/datas/medium_square.png"
                      alt=""
                    />
                  </div>
                  <div className={"ml-4 mr-auto"}>
                    <p className={"text-xl text-[#BFD7FF] font-semibold"}>
                      {event.name}
                    </p>
                    <p className={"text-sm text-blue-400"}>{event.location}</p>
                  </div>
                  <ChevronRightIcon
                    className={"w-8 h-8 text-[#BFD7FF] flex-shrink-0"}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export const getServerSideProps = async () => {
  const events: EventType[] = await kv.json.get("events");
  return { props: { events } };
};

export default EventsPage;
