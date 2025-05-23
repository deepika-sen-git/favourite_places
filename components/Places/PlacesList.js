import { FlatList, StyleSheet, View, Text } from 'react-native'
import { Colors } from '../../constants/Colors';

function PlacesList({ places }) {

    if (!places || places.length === 0) {
        return (
            <View style={styles.fallBackContainer}>
                <Text style={styles.fallBackText}>No Places Added Yet!!</Text>
            </View>
        )
    }

    return (
        <FlatList
            data={places}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <PlaceItem place={item} />}
        />
    );
}

export default PlacesList

const styles = StyleSheet.create({
    fallBackContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fallBackText: {
        fontSize: 16,
        color: Colors.primary200,
    }
})