const presets = [
  ["@babel/preset-react"],
  [
    "@babel/preset-env",
    {
      targets: {
        browsers: ["last 2 Chrome versions"],
        node: "current",
      },
      exclude: ["transform-regenerator"],
    },
  ],
];
module.exports = { presets };
