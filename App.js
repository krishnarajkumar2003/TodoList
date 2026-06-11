import { StatusBar } from "react-native";
import { StackNavigation } from "./src/navigations/StackNavigation";
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
      <StackNavigation />
    </>
  );
}