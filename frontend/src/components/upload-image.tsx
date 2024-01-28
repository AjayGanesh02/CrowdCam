// clone this ui: https://combinepdf.com/

import {FileUploader} from "react-drag-drop-files";

const ImageUpload = ({ search, setter }: { search: boolean; setter: any }) => {
  const handleFileUpload = async (files: any) => {
    // e.preventDefault();

    const formData = new FormData();

    // Assuming your file input has the "multiple" attribute
    // for (let i = 0; i < e.target.files.length; i++) {
    //   console.log(files[i])
    //   formData.append("files", e.target.files[i]);
    // }
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const response = await fetch(search ? "/api/search" : "/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        if (search) {
          var res = await response.json();
          setter(res);
          // console.log(res)
        }
      } else {
        console.error("Error uploading files:", response.statusText);
      }
    } catch (error: any) {
      console.error("Error uploading files:", error.message);
    }
  };

  return (
    <form encType="multipart/form-data flex">
      <div className={"h-48 justify-center max-w-96 mx-auto"}>
        <FileUploader
          handleChange={(files: any) => {
            var filesArr = []
            for (const [key, value] of Object.entries(files)) {
              filesArr.push(value)
            }
            handleFileUpload(filesArr)
          }}
          name="file"
          types={["JPG", "PNG", "JPEG"]}
          multiple={true}
          label="Upload or Drop Photos Here"
        />
      </div>
      {/*<input type="file" name="files" multiple onChange={handleFileUpload}/>*/}
    </form>
  );
};

export default ImageUpload;
