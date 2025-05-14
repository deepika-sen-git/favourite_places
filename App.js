import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import IconButton from './components/UI/IconButton';
import { Colors } from './constants/Colors';
import Map from './screens/Map';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={
          {
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700, }
          }
        }>
          <Stack.Screen name='AllPlaces' component={AllPlaces}
            options=
            {({ navigation }) => ({
              title: " Your Favorite Places",
              headerRight: ({ tintColor }) => (
                <IconButton name="add" color={tintColor} size={24} onPress={() => navigation.navigate('AddPlace')} />),

            })
            }
          />
          <Stack.Screen name='AddPlace' component={AddPlace} options={{ title: "Add a New Place" }} />
          <Stack.Screen name='Map' component={Map} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
