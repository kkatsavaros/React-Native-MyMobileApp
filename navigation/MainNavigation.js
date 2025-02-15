import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
//
import {Routes} from './Routes';
import Home from '../screens/Home/Home';
import Profile from '../screens/Profile/Profile';
//

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Drawer
const MainMenuNavigation = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name={Routes.Home} component={Home} />
      <Stack.Screen name={Routes.Profile} component={Profile} />
    </Drawer.Navigator>
  );
};

// Stack
const MainNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{header: () => null, headerShown: false}}>
      {/* <Stack.Screen name={Routes.Home} component={Home} />       
      <Stack.Screen name={Routes.Profile} component={Profile} /> */}
      <Stack.Screen name={'Drawer'} component={MainMenuNavigation} />
    </Stack.Navigator>
  );
};

export default MainNavigation;
