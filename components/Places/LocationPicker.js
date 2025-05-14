import { StyleSheet, View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import OutlinedButton from '../UI/OutlinedButton'
import { useForegroundPermissions, PermissionStatus, getCurrentPositionAsync } from 'expo-location'
import { Colors } from '../../constants/Colors'
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native'
import { getMapPreview } from '../../util/location'

const LocationPicker = () => {

    // const [currLocation, setCurrLocation] = useState();
    const [pickedLocation, setPickedLocation] = useState();
    const [locationPermissionInfo, requestPermission] = useForegroundPermissions();
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const route = useRoute();


    // const mapPickedLocation = route.params && {
    //     lat: route.params.pickedLat,
    //     lng: route.params.pickedLng
    // };

    // useEffect(() => {

    //     if (mapPickedLocation) {
    //         setPickedLocation(mapPickedLocation);
    //     }

    // }, [mapPickedLocation]);


    useEffect(() => {

        if (isFocused && route.params) {
            const mapPickedLocation = {
                lat: route.params.pickedLat,
                lng: route.params.pickedLng
            };
            setPickedLocation(mapPickedLocation);
        }

    }, [isFocused, route]);



    async function verifyPermissions() {
        if (locationPermissionInfo.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
        if (locationPermissionInfo.status === PermissionStatus.DENIED) {
            Alert.alert("Insufficient Permissions", "You need to grant location permissions to use this app");
            return false;
        }
        return true;
    }

    async function getLocationHandler() {
        const hasPermission = await verifyPermissions();

        if (!hasPermission) {
            return;
        }

        const location = await getCurrentPositionAsync();
        // setCurrLocation(location);
        console.log(location);
    }

    function pickOnMapHandler() {
        navigation.navigate('Map');

    }

    let locationPreview = <Text>No location picked yet.</Text>

    if (pickedLocation) {
        locationPreview = <Image style={styles.image} source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }} />
    }

    return (
        <View>
            <View style={styles.mapPreview}>
                {locationPreview}
            </View>
            <View style={styles.actions}>

                <OutlinedButton icon="location" onPress={getLocationHandler}>Locate User</OutlinedButton>
                <OutlinedButton icon="map" onPress={pickOnMapHandler}>Pick on Location</OutlinedButton>
            </View>
        </View>
    )
}

export default LocationPicker

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%'
    }
})