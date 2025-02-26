import React from 'react';
import {View, Text} from 'react-native';

const Home = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Brain</Text>
    </View>
  );
};

export default Home;


// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   ActivityIndicator,
//   Dimensions,
//   StyleSheet,
// } from 'react-native';
// import {LineChart} from 'react-native-chart-kit';
// import axios from 'axios';

// // API Key & Headers
// const API_KEY = '46839323-7ba6-42fb-ba98-198f67122cdc';
// const headers = {
//   'x-api-key': API_KEY,
//   'Content-Type': 'application/json',
// };

// const FTTHLineChart = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch API Data
//   useEffect(() => {
//     const fetchDailyReports = async () => {
//       try {
//         const response = await axios.get(
//           'http://172.17.44.31:5050/huginn/ftth_progress/daily_reports',
//           {headers},
//         );

//         // Transform Data
//         const transformedData = response.data.map(item => ({
//           hour: parseInt(item.Hour, 10),
//           completion: item['ΟΛΟΚΛΗΡΩΣΗ'] || 0,
//           notCompleted: item['ΜΗ ΟΛΟΚΛΗΡΩΣΗ'] || 0,
//           backlog:
//             typeof item['Backlog'] === 'number' ? item['Backlog'] / 10 : 0,
//         }));

//         setData(transformedData);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDailyReports();
//   }, []);

//   // Show loading spinner while fetching data
//   if (loading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#4287f5" />
//       </View>
//     );
//   }

//   // Extract X and Y Axis Data
//   const labels = data.map(item => item.hour.toString()); // X-Axis (hours)
//   const completionData = data.map(item => item.completion);
//   const notCompletedData = data.map(item => item.notCompleted);
//   const backlogData = data.map(item => item.backlog);

//   // Chart dimensions and manual scaling for dot positions
//   const chartWidth = Dimensions.get('window').width - 0;
//   const chartHeight = 700;
//   const numPoints = labels.length;
//   const xStep = chartWidth / (numPoints - 1);

//   // Determine the maximum value among all datasets to scale Y positions
//   const allValues = [...completionData, ...notCompletedData, ...backlogData];
//   const maxValue = Math.max(...allValues);

//   // Helper function: only render text if this dot is the "third" from the end
//   // (i.e. reverse index % 3 === 0)
//   const shouldDisplayLabel = (index, dataLength) =>
//     (dataLength - 1 - index) % 2 === 0;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Εργασίες FTTH συνολικά ανά ώρα σήμερα</Text>

//       <LineChart
//         data={{
//           labels: labels,
//           datasets: [
//             {
//               data: completionData,
//               color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`, // Green line
//               strokeWidth: 3,
//             },
//             {
//               data: notCompletedData,
//               color: (opacity = 1) => `rgba(244, 67, 54, ${opacity})`, // Red line
//               strokeWidth: 3,
//             },
//             {
//               data: backlogData,
//               color: (opacity = 1) => `rgba(66, 135, 245, ${opacity})`, // Blue line
//               strokeWidth: 3,
//             },
//           ],
//         }}
//         width={chartWidth}
//         height={chartHeight}
//         chartConfig={{
//           backgroundGradientFrom: '#ffffff',
//           backgroundGradientTo: '#ffffff',
//           decimalPlaces: 0,
//           color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//           labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//           style: {borderRadius: 10},
//           propsForBackgroundLines: {strokeWidth: 0},
//           propsForDots: {
//             r: '4',
//             strokeWidth: '2',
//             stroke: '#000000',
//           },
//         }}
//         bezier
//         style={styles.chart}
//         // Manual decorator for custom dot labels with conditional rendering
//         decorator={() => {
//           return (
//             <>
//               {/* Green dots for Completion */}
//               {completionData.map((value, index) => {
//                 if (!shouldDisplayLabel(index, completionData.length)) {
//                   return null;
//                 }
//                 return (
//                   <Text
//                     key={`completion-${index}`}
//                     style={{
//                       position: 'absolute',
//                       // clamp the left value to at least 5 px
//                       left: Math.max(5, xStep * index - 30),
//                       top: chartHeight - (value / maxValue) * chartHeight - 10,
//                       fontSize: 12,
//                       fontWeight: 'bold',
//                       color: 'green',
//                     }}>
//                     {value}
//                   </Text>
//                 );
//               })}

//               {/* Red dots for Not Completed */}
//               {notCompletedData.map((value, index) => {
//                 if (!shouldDisplayLabel(index, notCompletedData.length)) {
//                   return null;
//                 }
//                 return (
//                   <Text
//                     key={`notCompleted-${index}`}
//                     style={{
//                       position: 'absolute',
//                       left: Math.max(5, xStep * index - 30),
//                       top: chartHeight - (value / maxValue) * chartHeight - 80,
//                       fontSize: 12,
//                       fontWeight: 'bold',
//                       color: 'red',
//                     }}>
//                     {value}
//                   </Text>
//                 );
//               })}

//               {/* Blue dots for Backlog */}
//               {backlogData.map((value, index) => {
//                 if (!shouldDisplayLabel(index, backlogData.length)) {
//                   return null;
//                 }
//                 return (
//                   <Text
//                     key={`backlog-${index}`}
//                     style={{
//                       position: 'absolute',
//                       left: Math.max(5, xStep * index - 30),
//                       top: chartHeight - (value / maxValue) * chartHeight - 30,
//                       fontSize: 10,
//                       fontWeight: 'bold',
//                       color: 'blue',
//                     }}>
//                     {value}
//                   </Text>
//                 );
//               })}
//             </>
//           );
//         }}
//       />

//       {/* Legend */}
//       <View style={styles.legend}>
//         <View style={[styles.legendItem, {backgroundColor: '#4caf50'}]} />
//         <Text style={styles.legendText}>Completion</Text>

//         <View style={[styles.legendItem, {backgroundColor: '#f44336'}]} />
//         <Text style={styles.legendText}>Not Completed</Text>

//         <View style={[styles.legendItem, {backgroundColor: '#4287f5'}]} />
//         <Text style={styles.legendText}>Backlog</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 20,
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginVertical: 10,
//   },
//   chart: {
//     marginVertical: 10,
//     borderRadius: 10,
//   },
//   legend: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 5,
//   },
//   legendItem: {
//     width: 15,
//     height: 15,
//     borderRadius: 4,
//     marginHorizontal: 5,
//   },
//   legendText: {
//     fontSize: 14,
//     marginRight: 15,
//   },
// });

// export default FTTHLineChart;
