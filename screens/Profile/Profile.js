import React from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  View,
} from 'react-native';
import globalStyle from '../../assets/styles/globalStyle';
import Header from '../../components/Header/Header';
import style from './style';
//
import {ProfileTabsNavigation} from '../../navigation/MainNavigation';
//



const Profile = ({navigation}) => {
  return (
    <SafeAreaView style={[globalStyle.backgroundWhite, globalStyle.flex]}>
      <ScrollView contentContainerStyle={globalStyle.flexGrow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{color: 'blue'}}>Go Back</Text>
        </TouchableOpacity>

        <Header title={'Profile page'} type={1} />

        <Text>Welcome to profile page</Text>

        <Image
          style={style.profileImage}
          source={require('../../assets/images/default_profile.png')}
        />

        <View style={globalStyle.flex}>
          <ProfileTabsNavigation />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
