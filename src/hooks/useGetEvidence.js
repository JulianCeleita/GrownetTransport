import * as ImagePicker from "expo-image-picker";

export const useGetEvidence = () => {
  const pickImageFromGallery = async (setEvidence, handleClose) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      //   base64: true,
    });

    if (!result.canceled) {
      if (result.assets[0].type !== "image") {
        alert("the evidence must be an image!");
      } else {
        const dataImage = {
          fileUri: result.assets[0].uri,
          fileName: result.assets[0].uri.split("/").pop(),
          fileType: result.assets[0].uri.match(/\.(\w+)$/)?.[1],
        };
        setEvidence(dataImage);
        handleClose();
        // console.log(dataImage);
        // console.log(result.assets[0].base64);
      }
    }
  };

  const pickImageFromCamera = async (setEvidence, handleClose) => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      //   base64: true,
    });

    if (!result.canceled) {
      if (result.assets[0].type !== "image") {
        alert("the evidence must be an image!");
      } else {
        const dataImage = {
          fileUri: result.assets[0].uri,
          fileName: result.assets[0].uri.split("/").pop(),
          fileType: result.assets[0].uri.match(/\.(\w+)$/)?.[1],
        };
        setEvidence(dataImage);
        handleClose();
        // console.log(dataImage);
        // console.log(result.assets[0].base64);
      }
    }
  };

  return {
    pickImageFromGallery,
    pickImageFromCamera,
  };
};
