import { Alert, StyleSheet } from 'react-native'
import React, { useCallback, useLayoutEffect, useState, } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { useNavigation } from '@react-navigation/native';
import IconButton from '../components/UI/IconButton';

const Map = () => {

    const [selectedLocation, setSelectedLocation] = useState();

    const navigation = useNavigation();
    // const region = {
    //     latitude: 37.78,
    //     longitude: -122.43,
    //     latitudeDelta: 0.0922,
    //     longitudeDelta: 0.0421
    // };

    const region = {
        latitude: 20.5937,         // Approximate center of India
        longitude: 78.9629,
        latitudeDelta: 1,         // Zoom level (higher = more zoomed out)
        longitudeDelta: 1,
    };

    function selectLocationHandler(event) {
        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;
        setSelectedLocation({ lat: lat, lng: lng });
    }

    const savePickedLocationHandler = useCallback(() => {

        if (!selectedLocation) {
            Alert.alert("No Location Picked",
                "You have to pick a location by tapping on map first!!"
            );
            return;
        }

        navigation.navigate('AddPlace', {
            pickedLatitude: selectedLocation.lat,
            pickedLongitude: selectedLocation.lng
        });

    }, [navigation, selectedLocation]); //useCallback for avoiding unnecessary re-render cycles



    useLayoutEffect(() => {

        navigation.setOptions({
            headerRight: ({ tintColor }) =>
                <IconButton color={tintColor} size={24} name='save' onPress={savePickedLocationHandler} />
        });

    }, [navigation, savePickedLocationHandler]);

    return (
        <MapView style={styles.map} initialRegion={region} onPress={selectLocationHandler}>
            {selectedLocation && <Marker coordinate={{ latitude: selectedLocation.lat, longitude: selectedLocation.lng }}
                title='Picked Location'
            />}
        </MapView>

    )
}

export default Map

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
})