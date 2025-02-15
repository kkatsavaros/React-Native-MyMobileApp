import React from 'react';
import {SafeAreaView, Text, TouchableOpacity} from 'react-native';
import globalStyle from '../../assets/styles/globalStyle';
import Header from '../../components/Header/Header';

const Profile = ({navigation}) => {
  return (
    <SafeAreaView style={[globalStyle.backgroundWhite, globalStyle.flex]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={{color: 'blue'}}>Go Back</Text>
      </TouchableOpacity>
      <Header title={'Profile page'} type={1} />
      <Text>Welcome to profile page</Text>
    </SafeAreaView>
  );
};

export default Profile;