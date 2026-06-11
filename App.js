import { StatusBar } from "react-native";
import { StackNavigation } from "./src/navigations/StackNavigation";
import { Provider } from "react-redux";
import { store } from './src/store/Store';

// Only disable logging in production so you can debug comfortably locally
  console.log = () => {};
  console.info = () => {};
  console.warn = () => {};
  console.error = () => {};

export default function App() {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#000000"
        translucent={true}
      />
      <Provider store={store}>
        <StackNavigation />
      </Provider>
    </>
  );
}