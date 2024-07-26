import { createContext, useState, useEffect } from "react";

export const PhotosContext = createContext();

export const PhotosProvider = ({ children }) => {
  const [photos, setPhotos] = useState(() => {
    // load initial existing photos from localStorage
    const savedPhotos = localStorage.getItem("photos");
    return savedPhotos ? JSON.parse(savedPhotos) : [];
  });

  //hold pic selsection
  const [selectedFile, setSelectedFile] = useState(null); 
  const [error, setError] =useState("")
  //for allowing it to stay so long theres token
  // const { token } = useContext(AuthContext);

  useEffect(() => {
    // photos to localstorage
    localStorage.setItem("photos", JSON.stringify(photos));
  }, [photos]);

  //check token
  // useEffect(() => {
  //   const checkTokenExpiration = () => {
      
  //     const tokenValid = token; 

  //     if (!tokenValid) {
  //       // Clear photos if token expires
  //       // photos.forEach(photo => {
  //       //   URL.revokeObjectURL(photo.url)
  //       // })
  //       console.log("notoken")
  //       // setPhotos([]);
  //     }
  //   };

  //   checkTokenExpiration();


// TEST
  
  const handleUpload = () => {
    if (selectedFile) {
      const readFile = new FileReader();
      readFile.onloadend = () => {
      const uploadedAt = new Date().toString(); 
      // const imghash= Date.now();
      // const url= URL.createObjectURL(selectedFile);

      // const blob = `${url}?${imghash}`

      const newPhoto = {
        id: Date.now(),
        file: selectedFile.name,
        url: readFile.result,
        // url: url,
        description: "",
        editable: true,
        uploadedAt: uploadedAt,
      };
      const updatedPhotos = [newPhoto, ...photos];
      setPhotos(updatedPhotos)
      setSelectedFile(null); 

      // find index of the newly added photo in the updated photos array
      const newIndex = updatedPhotos.findIndex(photo => photo.id === newPhoto.id);
      console.log("Index of new uploaded photo:", newIndex);
    }
    readFile.readAsDataURL(selectedFile)
    
  }
  
  }

// const handleUpload = () => {
//   if (selectedFile) {
//    // timestamp
//     const uploadedAt = new Date().toString(); 
//     const newPhoto = {
//       file: selectedFile.name,
//       url: URL.createObjectURL(selectedFile),
//       description: "",
//       editable: true,
//       uploadedAt: uploadedAt,
//     };
//     setPhotos([newPhoto, ...photos]);
//    // clear the selected file after upload
//     setSelectedFile(null); 
//   }
// };

  const handleFileChange = (file) => {
    
    setError('');

    // if file is not a photo (gif,jpeg,png)
    if (file && !file.type.startsWith('image/')) {
      setError('Invalid file type. Please upload a photo or GIF.');

      setTimeout(() => {
        setError("");
      }, 5000);

      // clear selected file
      setSelectedFile(null); 
      return;
    }

    setSelectedFile(file); // Update the selected file state
  };

  const handleDescriptionChange = (index, description) => {
    //go through each photo in photos array, if index matches copy photo obj, new object with replaced desc
    const newPhotos = photos.map((photo, i) =>
      i === index ? { ...photo, description } : photo
    );
    setPhotos(newPhotos);
  };

  const handleEditAndSavePhoto = (index, isEditable) => {
    //go through each photo in photos array, if index matches copy photo obj, new object with editable bool updated, else keep it the same
    const newPhotos = photos.map((photo, i) =>
      i === index ? { ...photo, editable: isEditable } : photo
    );
    console.log("canEdit:", isEditable)
    setPhotos(newPhotos);
  };

  const handleDeletePhoto = (index) => {
    const newPhotos = [...photos];
    
    //remove 1 photo at specific index
    const removedPhoto = newPhotos.splice(index, 1)

    //TESTTTEST
    const deletedPhoto = newPhotos[index]
    console.log(index); 
    console.log("Pic removed")
    
    setPhotos(newPhotos);
  };

  return (
    <PhotosContext.Provider
      value={{
        photos,
        selectedFile,
        error,
        handleFileChange,
        handleUpload,
        handleDescriptionChange,
        handleEditAndSavePhoto,
        handleDeletePhoto,
      }}
    >
      {children}
    </PhotosContext.Provider>
  );
}
