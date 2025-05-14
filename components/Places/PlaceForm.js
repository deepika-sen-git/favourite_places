import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../constants/Colors'
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import Button from '../UI/Button';


const PlaceForm = () => {

    const [enteredTitle, setEnteredTitle] = useState('');

    function titleChangeHandler(enteredText) {
        setEnteredTitle(enteredText)
    }

    function addPlaceHandler() {

    }

    return (
        <ScrollView style={styles.form}>
            <Text style={styles.label}>Title</Text>
            <TextInput
                style={styles.input}
                onChangeText={titleChangeHandler}
                value={enteredTitle}
            />
            <ImagePicker />
            <LocationPicker />
            <Button onPress={addPlaceHandler}>Add Place</Button>
        </ScrollView>
    )
}

export default PlaceForm

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24,
    },
    label: {
        color: Colors.primary200,
        fontWeight: 'bold',
        marginBottom: 8,

    },
    input: {
        marginVertical: 4,
        paddingVertical: 8,
        paddingHorizontal: 4,
        backgroundColor: Colors.primary100,
        borderBottomWidth: 2,
        color: Colors.primary800,
        fontWeight: 'bold'

    }
})