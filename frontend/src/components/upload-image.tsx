
// clone this ui: https://combinepdf.com/

// const ImageUploadButton = () => {
//   const [file, setFile] = useState(null);

// const handleFileChange = (e: any) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       alert('Please select an image before uploading.');
//       return;
//     }

//     const formData = new FormData();
//     for (let i = 0; i < file; i++) {
//       formData.append('files', file[i]);
//     }

//     try {
//       const response = await fetch('/api/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('File uploaded successfully:', data.message);
//         // You can handle the uploaded file path or do something with it
//       } else {
//         console.error('Error uploading file:', response.statusText);
//       }
//     } catch (error: any) {
//     console.error('Error uploading file:', error.message);
//     }
//   };

//   return (
//     <div>
//       <input type="file" name="files" multiple onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload</button>
//     </div>
//   );
// //   <form encType="multipart/form-data">
// //   <input type="file" name="files" multiple onChange={handleFileUpload} />
// // </form>
// // );
// };

const ImageUpload = () => {
    const handleFileUpload = async (e: any) => {
        e.preventDefault();
        
        const formData = new FormData();
        
        // Assuming your file input has the "multiple" attribute
        for (let i = 0; i < e.target.files.length; i++) {
            formData.append('files', e.target.files[i]);
        }
        
        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            
            if (response.ok) {
                console.log('Files uploaded successfully.');
            } else {
                console.error('Error uploading files:', response.statusText);
            }
        } catch (error: any) {
            console.error('Error uploading files:', error.message);
        }
    };
    
    return (
        <form encType="multipart/form-data">
            <input type="file" name="files" multiple onChange={handleFileUpload}/>
        </form>
        );
    };
    
    export default ImageUpload;
    