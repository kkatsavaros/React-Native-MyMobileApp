import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from '../../components/Header/Header';
//
import LineChart from '../../components/LineChart';
import BarChart from '../../components/BarChart';
//
import {testData} from '../../components/data';
//
import {newShade} from '../utils';


const Chart1 = () => {
  return (
    <View style={styles.container}>
      {/* <Header title={'LineCharts'} type={1} /> */}

      <Text>Line Chart</Text>

      <LineChart
        data={testData}
        onPressItem={item => console.log(item)}
        x_key="month"
        y_key="value"
        backgroundColor={'transparent'}
        svgBackgroundColor={'transparent'}
        useGradientBackground={true}
        gradient_background_config={{
          stop1: {
            offset: 0,
            stopColor: '#6491d9',
            stopOpacity: 0.4,
          },
          stop2: {
            offset: 1,
            stopColor: '#35578f',
            stopOpacity: 0.8,
          },
        }}
      />

      <Text>Bar Chart</Text>
      <BarChart
        onPressItem={item => console.log(item)}
        data={testData}
        x_key="month"
        y_key="value"
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Chart1;
