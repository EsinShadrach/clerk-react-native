import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  useUser,
} from "@clerk/clerk-react";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import SignInWithOAuth from "./components/SignInWithOauth";

export default function App() {
  const env = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";

  function getUser() {
    const { user } = useUser();
    if (user) {
      return user.username;
    }
    return "no user";
  }

  return (
    <ClerkProvider publishableKey={env}>
      <SafeAreaView style={styles.AndroidSafeArea}>
        <View style={styles.centeredView}>
          <SignedIn>
            <Text>{getUser()}</Text>
          </SignedIn>
          <SignedOut>
            <SignInWithOAuth />
          </SignedOut>
        </View>
      </SafeAreaView>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
