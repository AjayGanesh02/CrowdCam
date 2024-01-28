// clone this ui: https://combinepdf.com/

const ImageUpload = (search: boolean, setter: (urls: string[]) => void) => {
  const handleFileUpload = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();

    // Assuming your file input has the "multiple" attribute
    for (let i = 0; i < e.target.files.length; i++) {
      formData.append("files", e.target.files[i]);
    }

    try {
      const response = await fetch(search ? "/api/search" : "/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Files uploaded successfully.");
        if (search) {
          setter(await response.json());
        }
      } else {
        console.error("Error uploading files:", response.statusText);
      }
    } catch (error: any) {
      console.error("Error uploading files:", error.message);
    }
  };

  return (
    <form encType="multipart/form-data">
      <input type="file" name="files" multiple onChange={handleFileUpload} />
    </form>
  );
};

export default ImageUpload;
