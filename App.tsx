import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { initializeDatabase } from './src/database/database';
import BarberListScreen from './src/screens/BarberListScreen';

export default function App() {
  useEffect(() => {
    initializeDatabase();
  }, []);

  return <BarberListScreen />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Barber Scheduler</Text>
      <Text>SQLite database initialized</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
