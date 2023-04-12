const config = {
  graphqlUrl:
    process.env.NEXT_PUBLIC_EP_API || "https://api.dev.braindao.org/graphql",
  googleAnalyticsID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
};

export default config;
