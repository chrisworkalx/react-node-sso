// my-plugin.js
export default function myRollupResolveIdPlugin(options = {}) {
  return {
    name: "my-rollup-resolve-id-plugin",

    // 解析模块 ID
    resolveId(source, importer) {
      //   console.log("importer", importer);
      if (source.startsWith("virtual:")) {
        return source; // 标识符保持不变
      }
      return null; // 使用默认解析
    },

    // 加载模块内容
    load(id) {
      if (id.startsWith("virtual:")) {
        return `export default "This is virtual module: ${id}";`;
      }
      return null; // 使用默认加载
    },
  };
}
