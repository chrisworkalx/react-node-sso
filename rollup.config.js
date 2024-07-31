import { defineConfig } from "rollup";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import postcss from "rollup-plugin-postcss";
import { fileURLToPath, URL } from "node:url";
import alias from "@rollup/plugin-alias";
//===============================自定义插件==============================================//
import MyDynamicImportPlugin from "./src/plugins/myRollupDynamic.js";
import MyRollupResolveIdPlugin from "./src/plugins/myRollupResolveIdPlugin.js";
import FetchRemotePlugin from "./src/plugins/load/fetchRemotePlugin.js";
// import LifeStylePlugin from "./src/plugins/lifeStylePlugin.js";

import { pluginA, pluginB, pluginC } from "./src/plugins/testPlugin.js";

import { virtualModulePlugin } from "./src/plugins/load/virtualModule.js";
import ReadFileEndWithTxtPlugin from "./src/plugins/load/textFileLoaderPlugin.js";
import DynamicLoadPlugin from "./src/plugins/load/dynamicPlugin.js";
import CacheLoadPlugin from "./src/plugins/load/cacheLoadPlugin.js";

//===============================自定义插件==============================================//

const delay = () => new Promise((resolve) => setTimeout(resolve, 5000));
/** 
  async：该钩子也可以返回一个解析为相同类型的值的 Promise；否则，该钩子被标记为 sync。
  first：如果有多个插件实现此钩子，则钩子按顺序运行，直到钩子返回一个不是 null 或 undefined 的值。
  sequential：如果有多个插件实现此钩子，则所有这些钩子将按指定的插件顺序运行。如果钩子是 async，则此类后续钩子将等待当前钩子解决后再运行。
  parallel：如果有多个插件实现此钩子，则所有这些钩子将按指定的插件顺序运行。如果钩子是 async，则此类后续钩子将并行运行，而不是等待当前钩子。
*/
const createDynamicResolvedIdPlugin = (name, order, extraConfig = {}) => {
  name = `my-dynamic-${name || Math.random().toFixed(2)}-plugin`;
  return {
    name,
    resolveId: {
      order: order || "pre",
      handler(id) {
        // console.log(name, id);
        return null;
      },
    },
    ...extraConfig,
  };
};

console.log(fileURLToPath(new URL("./src", import.meta.url)), "---ppppp");

export default defineConfig({
  input: "src/main.js",
  output: {
    // file: "dist/bundle.js",
    dir: "dist",
    format: "es",
    sourcemap: true,
  },
  // resolve: {
  //   extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
  //   alias: {
  //     "@": fileURLToPath(new URL("./src", import.meta.url)),
  //   },
  // },

  plugins: [
    resolve(),
    commonjs(),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
    }),
    alias({
      entries: [
        {
          find: "@",
          replacement: fileURLToPath(new URL("./src", import.meta.url)),
        },
      ],
    }),
    terser(),
    serve({
      open: true,
      contentBase: ["dist", "src"],
      port: 3000,
    }),
    postcss(),
    livereload({
      watch: "dist",
    }),
    //================自定义插件 直接创建测试=======================/
    // createDynamicResolvedIdPlugin("aaaa", "pre", {
    //   writeBundle: {
    //     sequential: false,
    //     order: "post",
    //     async handler({ dir }) {
    //       console.log("-------aaaa------");
    //       return null;
    //     },
    //   },
    // }),
    // createDynamicResolvedIdPlugin("bbbb", "pre", {
    //   writeBundle: {
    //     sequential: false,
    //     order: "post",
    //     async handler({ dir }) {
    //       console.log("-------bbbb------");
    //       return null;
    //     },
    //   },
    // }),
    // createDynamicResolvedIdPlugin("cccc", "pre", {
    //   writeBundle: {
    //     sequential: true, //sequential 设置就会按顺序执行 针对parallel并行钩子触发
    //     order: "post",
    //     async handler({ dir }) {
    //       await delay();
    //       console.log("--------cccc-------", dir);
    //       return null;
    //     },
    //   },
    // }),
    // createDynamicResolvedIdPlugin("dddd", "pre", {
    //   writeBundle: {
    //     sequential: false,
    //     order: "post",
    //     async handler({ dir }) {
    //       console.log("-------dddd------");
    //       return null;
    //     },
    //   },
    // }),
    // createDynamicResolvedIdPlugin("eeee", "pre", {
    //   writeBundle: {
    //     sequential: false,
    //     order: "post",
    //     async handler({ dir }) {
    //       console.log("-------eeee------");
    //       return null;
    //     },
    //   },
    // }),

    //================自定义插件 导入文件形式=======================/
    pluginA(),
    pluginB(),
    pluginC(),
    MyDynamicImportPlugin({
      age: 20,
    }),
    MyRollupResolveIdPlugin(),
    // LifeStylePlugin(10),

    //================自定义插件 load 钩子 开始=======================/
    virtualModulePlugin(),
    // ReadFileEndWithTxtPlugin(),
    FetchRemotePlugin({
      responseType: "json",
    }),
    DynamicLoadPlugin(process),
    CacheLoadPlugin({
      name: "chris",
    }),
    //================自定义插件 load 钩子 结束=======================/
  ],
});
