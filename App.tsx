import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import BarberListScreen from './src/screens/BarberListScreen';
import { getDatabase } from './src/database/database';
import { seedBarbers } from './src/services/barberService';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function initializeApp() {
      try {
        await getDatabase();
        await seedBarbers();

        setIsReady(true);
      } catch (error) {
        console.error('Database initialization error:', error);
      }
    }

    initializeApp();
  }, []);

  if (!isReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>
          Loading Barber Scheduler...
        </Text>
      </View>
    );
  }

  return <BarberListScreen />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
});