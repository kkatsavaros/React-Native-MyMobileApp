import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import Header from '../../components/Header/Header';

import style from './style';
import globalStyle from '../../assets/styles/globalStyle';

const Home = () => {
  return (
    <SafeAreaView style={[globalStyle.backgroundWhite, globalStyle.flex]}>
      <Header title={'Home page - ddd'} type={1} />
      <Header title={'Home page'} type={2} />
      <Header title={'Home page'} type={3} />
    </SafeAreaView>
  );
};

export default Home;
