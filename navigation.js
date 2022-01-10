
import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'

import HomeScreen from "./Src/Screens/Home";
import AddScreen from './Src/Screens/Add';

const Stack = createStackNavigator({
      Home: HomeScreen,
      Add: AddScreen,
  },{
    initialRouteName:"Home"
  });

  const AppContainer = createAppContainer(Stack);

  export default AppContainer;