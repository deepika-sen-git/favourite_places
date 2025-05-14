import { View, Text, Button, Alert, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker'
import { Colors } from '../../constants/Colors';
import OutlinedButton from '../UI/OutlinedButton';

const ImagePicker = () => {

    const [pickedImage, setPickedImage] = useState();
    const [cameraPermissionInfo, requestPermission] = useCameraPermissions();

    async function verifyPermissions() {
        if (cameraPermissionInfo.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
        if (cameraPermissionInfo.status === PermissionStatus.DENIED) {
            Alert.alert("Insufficient Permissions", "You need to access camera permissions to use this app");
            return false;
        }
        return true;
    }

    async function takeImageHandler() {
        const hasPermission = await verifyPermissions();

        if (!hasPermission) {
            return;
        }
        const image = await launchCameraAsync({

            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        });
        console.log(image.assets);
        // setPickedImage(image.uri);
        if (image.canceled || !image.assets || image.assets.length === 0) {
            return;
        }

        setPickedImage(image.assets[0].uri);
        console.log(image.assets);
    }

    let imagePreview = <Text>No Image Taken Yet</Text>;

    if (pickedImage) {
        imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
    }

    return (
        <View>
            <Text>ImagePicker</Text>
            <View style={styles.imagePreview}>{imagePreview}</View>
            {/* <Button title='Take Image' onPress={takeImageHandler}></Button> */}
            <OutlinedButton icon="camera" onPress={takeImageHandler}>Take Image</OutlinedButton>
        </View>
    )
}

export default ImagePicker

const styles = StyleSheet.create({

    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
    },
    image: {
        width: '100%',
        height: '100%',
    }

});