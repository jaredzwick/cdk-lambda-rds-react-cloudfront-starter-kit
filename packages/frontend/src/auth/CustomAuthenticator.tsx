import {
  Authenticator,
  ColorMode,
  defaultDarkModeOverride,
  ThemeProvider,
  useAuthenticator,
  View,
} from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import { outputs } from "./Amplify";
import "@aws-amplify/ui-react/styles.css";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

// @ts-expect-error amplify is so fucked
Amplify.configure(outputs);

// const provider = {
//   custom: "auth0IdP",
// };

// function handleSignInClick() {
//   signInWithRedirect({ provider });
// }

const components = {
  Header() {
    return <View marginTop="5rem" />;
  },
  Footer() {
    return <View marginBottom="2.5rem" />;
  },
  //   Footer() {
  //     return (
  //       <>
  //         <Divider></Divider>
  //         <View textAlign="center">
  //           <Button
  //             onClick={() => {
  //               handleSignInClick();
  //             }}
  //             className="amplify-button amplify-field-group__control amplify-button--primary amplify-button--fullwidth"
  //           >
  //             Sign In with Google
  //           </Button>
  //         </View>
  //       </>
  //     );
  //   },
  //   FormFields: null,
};

export function CustomAuthenticator() {
  const { user } = useAuthenticator((context) => [context.user]);
  const { theme: currentTheme } = useTheme();
  const [colorMode, setColorMode] = useState<ColorMode>(
    currentTheme === "dark" ? "dark" : "light"
  );

  const theme = {
    name: "my-theme",
    overrides: [defaultDarkModeOverride],
    tokens: {
      colors: {
        primary: {
          10: "#3949ab", // Light pink
          40: "#3949ab", // Medium pink
          80: "#3949ab", // Dark pink
          100: "#3949ab", // Purple
        },
      },
    },
  };

  useEffect(() => {
    setColorMode(currentTheme === "dark" ? "dark" : "light");
  }, [currentTheme]);

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <ThemeProvider theme={theme} colorMode={colorMode}>
      <Authenticator components={components} />
    </ThemeProvider>
  );
}
