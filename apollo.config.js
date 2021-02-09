/** @format */

module.exports = {
  client: {
    includes: ["./src/**/*.{tsx,ts}"],
    tagName: "gql",
    service: {
      name: "podcast",
      url: "https://podcast-marsinn.herokuapp.com/graphql",
    },
  },
};
