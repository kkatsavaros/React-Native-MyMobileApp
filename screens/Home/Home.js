import React from 'react';
import {SafeAreaView, Text, View, TouchableOpacity} from 'react-native';
import Header from '../../components/Header/Header';
import {Routes} from '../../navigation/Routes';

import style from './style';
import globalStyle from '../../assets/styles/globalStyle';

const Home = ({navigation}) => {
  return (
    <SafeAreaView style={[globalStyle.backgroundWhite, globalStyle.flex]}>
      <Header title={'Home page - ddd'} type={1} />
      <Header title={'Home page'} type={2} />
      <Header title={'Home page'} type={3} />

      <TouchableOpacity
        onPress={() => {
          navigation.navigate(Routes.Profile);
        }}>
        <View>
          <Text>Go to Profile Page</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;
