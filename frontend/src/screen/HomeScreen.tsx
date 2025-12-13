import { StatusBar, StyleSheet, Text, useColorScheme, View, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
function HomeScreen() {

  return (
    <SafeAreaView>
      <View>
        <Text>salam</Text>
      </View>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
