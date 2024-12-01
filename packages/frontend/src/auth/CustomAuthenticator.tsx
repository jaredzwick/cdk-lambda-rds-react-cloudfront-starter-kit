import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import { outputs } from "./Amplify";

// @ts-expect-error amplify is so fucked
Amplify.configure(outputs);

// const provider = {
//   custom: "auth0IdP",
// };

// function handleSignInClick() {
//   signInWithRedirect({ provider });
// }

// export const CustomAuthenticator = () => {
//   const components = {
//     SignIn: {
//       Footer() {
//         return (
//           <>
//             <Divider></Divider>
//             <View textAlign="center">
//               <Button
//                 onClick={() => {
//                   handleSignInClick();
//                 }}
//                 className="amplify-button amplify-field-group__control amplify-button--primary amplify-button--fullwidth"
//               >
//                 Sign In with Google
//               </Button>
//             </View>
//           </>
//         );
//       },
//       FormFields: null,
//     },
//   };
//   return <Authenticator components={components}></Authenticator>;
// };

export const CustomAuthenticator = () => {
  return <Authenticator />;
};
