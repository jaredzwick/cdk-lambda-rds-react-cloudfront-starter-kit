export const outputs = {
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_USER_POOL_ID ?? "userPoolId",
      userPoolClientId:
        import.meta.env.VITE_USER_POOL_CLIENT_ID ??
        "<your-cognito-user-pool-client-id>",
      identityPoolId:
        import.meta.env.VITE_IDENTITY_POOL_ID ??
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
