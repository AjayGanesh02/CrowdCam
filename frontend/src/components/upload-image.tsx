// clone this ui: https://combinepdf.com/
import { FileUploader } from "react-drag-drop-files";
import LoadingIcons from "react-loading-icons";
import { useState } from "react";

const fileTypes = ["JPG", "PNG", "JPEG"];

const ImageUpload = ({
  search,
  begun,
  setter,
  eventId,
}: {
  search: boolean;
  begun: any;
  setter: any;
  eventId: string;
}) => {
  const [loading, setLoading] = useState(false);
  const handleFileUpload = async (files: any) => {
    const formData = new FormData();

    formData.append("eventId", eventId);

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const response = await fetch(search ? "/api/search" : "/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        var res = await response.json();
        setter(res);
        setLoading(false);
      } else {
        console.error("Error uploading files:", response.statusText);
      }
    } catch (error: any) {
      console.error("Error uploading files:", error.message);
    }
  };

  return (
    <form encType="multipart/form-data flex">
      <div className={"h-48 justify-center max-w-96 mx-auto relative"}>
        {loading && (
          <div
            className={
              "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            }
          >
            <LoadingIcons.TailSpin />
          </div>
        )}
        <FileUploader
          handleChange={(files: any) => {
            handleFileUpload(Object.values(files));
            setLoading(true);
            begun();
          }}
          name="file"
          types={fileTypes}
          multiple={true}
          label="Upload or Drop Photos"
        />
      </div>
      {/*<input type="file" name="files" multiple onChange={handleFileUpload}/>*/}
    </form>
  );
};

export default ImageUpload;
