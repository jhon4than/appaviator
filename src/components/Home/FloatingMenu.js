import { createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";

Icon.loadFont();

const mainNavigation = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: () => ({
        tabBarIcon: ({ focused }) => (
          <Icon name="home" size={20} color={focused ? "#fff" : "#ddd"} />
        ),
        tabBarLabel: "Inicio",
      }),
    },
    Games: {
      screen: Games,
      navigationOptions: () => ({
        tabBarIcon: ({ focused }) => (
          <Icon name="gamepad" size={20} color={focused ? "#fff" : "#ddd"} />
        ),
        tabBarLabel: "Jogos",
      }),
    },
    Bonus: {
      screen: Bonus,
      navigationOptions: () => ({
        tabBarIcon: ({ focused }) => (
          <Icon name="gift" size={20} color={focused ? "#fff" : "#ddd"} />
        ),
        tabBarLabel: "Bônus",
      }),
    },
  },
  {
    barStyle: {
      backgroundColor: "#7159c1",
    },
  }
);

export default createAppContainer(mainNavigation);
