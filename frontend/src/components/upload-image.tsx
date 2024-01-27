import { useState } from 'react';

const ImageUploadButton = () => {
  const [file, setFile] = useState(null);

const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select an image before uploading.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('File uploaded successfully:', data.filePath);
        // You can handle the uploaded file path or do something with it
      } else {
        console.error('Error uploading file:', response.statusText);
      }
    } catch (error: any) {
    console.error('Error uploading file:', error.message);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default ImageUploadButton;
