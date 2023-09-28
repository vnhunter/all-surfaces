module.exports = {
  content: ["./src/**/*.twig"],
  theme: {
    extend: {
      colors: {
        'lime-accent': '#7B9E16',
        'midnight-blue': '#0C3663',
        'deep-blue': '#042A53',
        'dark-blue': '#04203F',
        'primary-accent': '#C0BB35',
        'dark-primary-accent': '#b3af4c',
        'light-gray': '#FFFFFF87',
        'dark-gray': '#FFFFFF1F'
      },
      fontFamily: {
        'heading-font': ['Verlag'],
        'body-font': ['TTNorms'],
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
