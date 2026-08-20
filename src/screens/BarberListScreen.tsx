import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Barber } from '../models/types';
import { getBarbers } from '../services/barberService';

export default function BarberListScreen() {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBarbers() {
      try {
        const data = await getBarbers();
        setBarbers(data);
      } catch (err) {
        console.error('Error loading barbers:', err);
        setError('Unable to load barbers.');
      } finally {
        setLoading(false);
      }
    }

    loadBarbers();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.message}>Loading barbers...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your barber</Text>

      <FlatList
        data={barbers}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.barberCard}>
            <Text style={styles.name}>{item.name}</Text>

            <Text style={styles.specialty}>
              {item.specialty}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  list: {
    paddingBottom: 20,
  },

  barberCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
  },

  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  specialty: {
    fontSize: 15,
    marginTop: 6,
  },

  message: {
    marginTop: 10,
    fontSize: 16,
  },

  error: {
    fontSize: 16,
  },
});