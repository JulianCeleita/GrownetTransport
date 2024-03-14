import * as ImagePicker from "expo-image-picker";

export const useGetEvidence = () => {
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
      quality: 0.5,
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
      }
    }
  };

  return {
    pickImageFromCamera,
  };
};
