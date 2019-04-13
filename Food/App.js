import { TabNavigator, StackNavigator } from "react-navigation";
//Screens
import HomeScreen from "./screens/HomeScreen";
import InfoScreen from "./screens/InfoScreen";
import BookScreen from "./screens/BookScreen";
import BarcodeScreen from "./screens/BarcodeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import InfoDetailScreen from "./screens/InfoDetailScreen";
import BookDetailScreen from "./screens/BookDetailScreen";
import BookDetailKindScreen from "./screens/BookDetailKindScreen";
import BookDetailRelatedScreen from "./screens/BookDetailRelatedScreen";
import LoginScreen from "./screens/LoginScreen";
import BuyScreen from "./screens/BuyScreen";
import PaymentScreen from "./screens/PaymentScreen";
import HomeDetailScreen from "./screens/HomeDetailScreen";
//Screen names
import { Home, Info, Book, Barcode, Profile } from "./utils/ScreenNames";

let routeConfigs = {
  Home: {
    screen: StackNavigator({
      Home: {
        screen: HomeScreen
      },
      HomeDetail: {
        screen: HomeDetailScreen
      }
    })
  },
  Info: {
    screen: StackNavigator({
      Info: {
        screen: InfoScreen
      },
      InfoDetail: {
        screen: InfoDetailScreen
      }
    })
  },
  Book: {
    screen: StackNavigator({
      Book: {
        screen: BookScreen
      },
      BookDetail: {
        screen: TabNavigator(
          {
            "Cùng loại": {
              screen: BookDetailKindScreen
            },
            "Liên quan": {
              screen: BookDetailRelatedScreen
            }
          },
          {
            tabBarPosition: "top",
            showsHorizontalScrollIndicator: false,
            tabBarOptions: {
              activeTintColor: "#FF5500",
              inactiveTintColor: "#DF6F51",
              labelStyle: {
                fontSize: 13
              },
              style: {
                backgroundColor: "#fff"
              }
            }
          }
        )
      }
    })
  },
  Barcode: {
    screen: StackNavigator({
      Barcode: {
        screen: BarcodeScreen
      },
      Buy: {
        screen: BuyScreen
      },
      Payment: {
        screen: PaymentScreen
      }
    })
  },
  Profile: {
    screen: StackNavigator({
      Profile: {
        screen: ProfileScreen
      },
      Login: {
        screen: LoginScreen
      }
    })
  }
};
let tabNavigatorConfig = {
  tabBarPosition: "bottom",
  animationEnabled: true,
  swipeEnabled: true,
  tabBarOptions: {
    activeTintColor: "#FF5500",
    inactiveTintColor: "#DF6F51",
    labelStyle: {
      fontSize: 12
    },
    style: {
      backgroundColor: "#FEF7EF",
      height: 60
    },
    // showLabel: false
    showIcon: true
  },
  order: [Home, Info, Book, Barcode, Profile]
};
const App = TabNavigator(routeConfigs, tabNavigatorConfig);
export default App;
