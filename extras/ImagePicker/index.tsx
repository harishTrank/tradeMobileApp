import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
export const getImage = async (setImage: any, multiple = false) => {
  try {
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: multiple ? true : false,
      allowsEditing: true,
      aspect: [4, 5],
      quality: 0.1,
      selectionLimit: 2,
    });
    if (!result.canceled) {
      if (multiple) {
        setImage(result.assets);
      } else {
        await setImage(result.assets[0].uri);
      }
    }
  } catch (err) {
    console.log(err, "err");
  }
};

export const createPostFromGallery = async (
  setImage: any,
  multiple = false
) => {
  try {
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: multiple ? true : false,
      allowsEditing: false,
      // aspect: [4, 4],
      quality: 0.1,
      selectionLimit: 2,
    });
    if (!result.canceled) {
      if (multiple) {
        setImage(result.assets);
      } else {
        await setImage(result.assets[0].uri);
      }
    }
  } catch (err) {
    console.log(err, "err");
  }
};

export const takePicture = async (setImage: any) => {
  try {
    let permiss: any = await ImagePicker.getCameraPermissionsAsync();
    if (permiss.canAskAgain === false) {
      Alert.alert("Camera permissions has been denied.");
    } else {
      if (permiss.granted === false) {
        let result: any = await ImagePicker.requestCameraPermissionsAsync();
      }
      ImagePicker.launchCameraAsync().then((res: any) => {
        setImage(res.assets[0].uri);
      });
    }
  } catch (err) {
    console.log(err, "error");
  }
};
