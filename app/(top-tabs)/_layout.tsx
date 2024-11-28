import {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function TopTabLayout() {
  return (
    <MaterialTopTabs>
      <MaterialTopTabs.Screen
        name="berlangsung"
        options={{ title: "Sedang Berlangsung" }}
      />
      <MaterialTopTabs.Screen
        name="proses"
        options={{ title: "Dalam Proses" }}
      />
    </MaterialTopTabs>
  );
}
