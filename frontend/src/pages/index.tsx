import Image from "next/image";
import LoginButton from "@/components/auth/login-btn";
import UploadButton from "@/components/upload-image";
// import Icon from "@/app/favicon.ico";

export default function Home() {
  return (
    <main className={"h-screen overscroll-none bg-blue-100"}>
      <div className={"flex"}>
        <div className={"mx-auto"}>
          {/*<Image src={Icon} alt={"hello"} width={150} height={150} className={"object-center"}/>*/}
          <h1 className={"text-center mt-10 text-6xl roboto"}>
            Welcome to [name]
          </h1>
          {/*<LoginButton/>*/}
          {/*<UploadButton/>*/}
        </div>
      </div>
    </main>
  );
}
