import { useRouter } from "next/router";
import { useState } from "react";

const EventUploadPage = () => {
  const router = useRouter();

  const [eventId, setEventId] = useState<string>("")
  const [eventName, setEventName] = useState<string>("")
  const [eventDate, setEventDate] = useState<string>("")
  const [eventLocation, setEventLocation] = useState<string>("")
  const [eventImage, setEventImage] = useState<string>("")
  const [inputError, setInputError] = useState<string>("")

  const validateOutput = (e: any) => {
    e.preventDefault()

    if (eventId.length == 0) {
      setInputError("Please enter an event ID")
      return
    } else if (eventId.includes(" ")) {
      setInputError("Please enter a valid event ID (no spaces)")
      return
    }

    if(eventName.length == 0) {
      setInputError("Please enter an event name")
      return
    }

    if(eventDate.length == 0) {
      setInputError("Please enter an event date")
      return
    } else if(eventDate.length > 4 || !eventDate.includes("/") || eventDate.length < 3) {
      setInputError("Please only enter the date in MM/DD format")
      return
    }

    if(eventLocation.length == 0) {
      setInputError("Please enter an event location")
      return
    }

    var formData = new FormData()
    formData.append("eventId", eventId)
    formData.append("name", eventName)
    formData.append("date", eventDate)
    formData.append("location", eventLocation)
    formData.append("imageUrl", eventImage.length > 0 ? eventImage : "https://static.thenounproject.com/png/4974686-200.png")

    try {
      const response = fetch("/api/newevent", {
        method: "POST",
        body: formData
      })
    } catch (e) {
      console.error(e)
    }

    router.push(`/events/${eventId}/upload`);
  }

  return (
    <main
      className={
        "min-h-screen overscroll-none bg-gradient-to-t from-black to-[#292F36]"
      }
    >
      <div className={"pt-8 px-4"}>
        <div className={"text-3xl py-4 text-[#BFD7FF] font-bold text-center"}>
          <p>Create a new event!</p>
        </div>
      </div>
      <div className={"px-4"}>
        {
          inputError.length > 0 &&
          <div className={"text-red-400 mx-auto text-center"}>
            {inputError}
          </div>
        }
        <form className={"max-w-96 mx-auto"}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-400">
              Event ID (One Word)
            </label>
            <div className="mt-2">
              <input
                type="name"
                name="name"
                id="name"
                value={eventId}
                onChange={(e) => setEventId(e.target.value)}
                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="spartahacks9"
              />
            </div>
          </div>

          <div className={"mt-4"}>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-400">
              Event Name
            </label>
            <div className="mt-2">
              <input
                type="name"
                name="name"
                id="name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Sparta Hacks 9"
              />
            </div>
          </div>

          <div className={"mt-4"}>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-400">
              Date
            </label>
            <div className="mt-2">
              <input
                type="input"
                name="date"
                id="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="1/27"
              />
            </div>
          </div>

          <div className={"mt-4"}>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-400">
              Location
            </label>
            <div className="mt-2">
              <input
                type="location"
                name="location"
                id="location"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="East Lansing, MI"
              />
            </div>
          </div>

          <div className={"mt-2"}>
            <div className="flex justify-between">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-400 mt-4">
                Image URL
              </label>
              <span className="text-sm leading-6 text-gray-500 mt-4" id="email-optional">
              Optional
            </span>
            </div>
            <div className="mt-2">
              <input
                type="link"
                name="link"
                id="link"
                value={eventImage}
                onChange={(e) => setEventImage(e.target.value)}
                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="https://i.imgur.com/1a2b3c4d.jpg"
                aria-describedby="link"
              />
            </div>
          </div>

          <div className={"mt-4"}>
            <button
              className={
                "text-white border w-full mx-auto py-4 border-[#292f36] rounded-xl bg-[#292F36] bg-opacity-40 text-lg mt-4"
              }
              onClick={(e) => {
                 validateOutput(e)
              }}
            >
              Submit
            </button>
          </div>

        </form>
      </div>
    </main>
  );
};

export default EventUploadPage;
