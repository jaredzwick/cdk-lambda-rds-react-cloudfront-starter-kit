import { Authenticator, View } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import { outputs } from "./Amplify";
import "@aws-amplify/ui-react/styles.css";

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

export const CustomAuthenticator = () => {
  return <Authenticator components={components}></Authenticator>;
};
