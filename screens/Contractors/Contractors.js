import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

// API Config
const API_URL = 'http://172.17.44.31:5050/huginn/contractor';
const API_KEY = '46839323-7ba6-42fb-ba98-198f67122cdc';
const headers = {
  'x-api-key': API_KEY,
  'Content-Type': 'application/json',
};

const Contractors = ({navigation}) => {
  const [tsedy, setTsedy] = useState([]);
  const [contractors, setContractors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(API_URL, {headers});

      if (response?.data) {
        console.log('Fetched data:', response.data);
        setTsedy(Array.isArray(response.data.TSEDY) ? response.data.TSEDY : []);
        setContractors(
          Array.isArray(response.data.contractors)
            ? response.data.contractors
            : [],
        );
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>ΤSEDY Regions</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <>
          <FlatList
            data={tsedy}
            keyExtractor={(item, index) => `tsedy-${index}`}
            renderItem={({item}) => (
              <View style={styles.item}>
                <Text style={styles.itemText}>{item}</Text>
              </View>
            )}
          />

          <Text style={styles.title}>Contractors</Text>

          <FlatList
            data={contractors}
            keyExtractor={(item, index) => `contractor-${index}`}
            renderItem={({item}) => (
              <View style={styles.item}>
                <Text style={styles.itemText}>{item}</Text>
              </View>
            )}
          />
        </>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.buttonText}>Go to Profile Page</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// ✅ Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default Contractors;
