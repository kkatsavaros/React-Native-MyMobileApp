import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import {Button, Menu, Provider as PaperProvider} from 'react-native-paper';
import {BarChart} from 'react-native-chart-kit';
import axios from 'axios';

const StatistikaAllRPA = () => {
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get('window').width,
  );
  const [error, setError] = useState('');

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', change => {
      setScreenWidth(change.window.width);
    });

    return () => subscription.remove();
  }, []);

  const fetchData = async () => {
    const headers = {
      'x-api-key': '46839323-7ba6-42fb-ba98-198f67122cdc',
      'Content-Type': 'application/json',
    };
    try {
      const response = await axios.get(
        'http://172.17.44.31:5050/huginn/reporting/all_reports_by_year',
        {headers},
      );
      setData(response.data);
      setError(''); // Clear error state on successful data fetch
    } catch (error) {
      console.error('Error fetching data: ', error);
      setError('Failed to fetch data, please try again later.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const chartData = {
    labels:
      data
        .find(item => item.year === selectedYear)
        ?.data.map(item => item['Automation Type']) || [],
    datasets: [
      {
        data:
          data
            .find(item => item.year === selectedYear)
            ?.data.map(item => item.total) || [],
      },
    ],
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Button onPress={() => setMenuVisible(true)}>Select Year</Button>
          }>
          {data.map(item => (
            <Menu.Item
              key={item.year}
              onPress={() => {
                setSelectedYear(item.year);
                setMenuVisible(false);
              }}
              title={String(item.year)}
            />
          ))}
        </Menu>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {selectedYear && (
          <BarChart
            data={chartData}
            width={screenWidth}
            height={220}
            yAxisLabel=""
            chartConfig={{
  backgroundColor: '#1cc910',
  backgroundGradientFrom: '#eff3ff',
  backgroundGradientTo: '#efefef',
  decimalPlaces: 2, // number of decimal places for the values, adjust as needed
  color: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`, // color for the bars
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // color for the labels
  propsForLabels: {
    fontSize: 12, // you can adjust the font size for better visibility
    rotation: 45,
    translateX: -25, // Adjust X position as needed for readability
    translateY: -30, // Adjust Y position to move the labels above the bars
  },
  showValuesOnTopOfBars: true, // ensure this is true to show values
  valueFormat: "##0.0", // format for the value displayed
  propsForVerticalLabels: {
    fontWeight: 'bold', // you can make labels bold
  },
  propsForHorizontalLabels: {
    fontWeight: 'bold', // you can make labels bold
  },
  barPercentage: 0.5, // adjust bar width percentage to avoid clutter
  useShadowColorFromDataset: false // optional, for styling
}}

          />
        )}
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    paddingTop: 20,
    paddingBottom: 20,
  },
});

export default StatistikaAllRPA;
