export const outputs = {
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_UserPoolId ?? "userPoolId",
      userPoolClientId:
        import.meta.env.VITE_UserPoolClientId ??
        "<your-cognito-user-pool-client-id>",
      identityPoolId:
        import.meta.env.VITE_IdentityPoolId ??
        "<your-cognito-identity-pool-id>",
      loginWith: {
        email: true,
      },
      signUpVerificationMethod: "code",
      userAttributes: {
        email: {
          required: true,
        },
      },
      allowGuestAccess: true,
      passwordFormat: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireNumbers: true,
        requireSpecialCharacters: true,
      },
    },
  },
};
