import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/Colors";

export default function Button({ onPress, children }) {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
            <Text style={styles.buttonText}>{children}</Text>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        margin: 8,
        backgroundColor: Colors.accent500,
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: 0.15,
        shadowRadius: 3,
        shadowOffset: {
            width: 1, height: 1
        },
        borderRadius: 4,

    },
    buttonText: {
        color: Colors.primary800,
        fontSize: 16,
        textAlign: 'center'
    },
    pressed: {
        opacity: 0.7
    }
});