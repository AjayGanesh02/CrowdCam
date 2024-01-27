import Image from "next/image";
import LoginButton from "@/components/auth/login-btn";
import UploadButton from "@/components/upload-image";

export default function Home() {
  return (
    <div>
      Hello world
      <LoginButton />
      <UploadButton />
    </div>
  );
}
