const path = require("path");

module.exports = {
     mode: "development", // or 'production' for production builds
     entry: "./src/index.ts", // your entry file
     output: {
          filename: "index.js", // output file name
          path: path.resolve(__dirname, "dist"), // output directory
     },
     resolve: {
          extensions: [".ts", ".js"], // file extensions to resolve
     },
     module: {
          rules: [
               {
                    test: /\.ts$/, // for TypeScript files
                    use: "ts-loader", // use ts-loader to compile TypeScript
                    exclude: /node_modules/,
               },
               {
                    test: /\.wgsl$/, // for text files
                    use: "raw-loader", // use raw-loader to import text files
               },
          ],
     },
};
