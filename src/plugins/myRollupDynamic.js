export default function myRollupPlugin(options) {
  // console.log("options", options);
  return {
    name: "my-rollup-plugin",
    resolveDynamicImport(source, importer) {
      console.log(`Resolving dynamic import: ${source} from ${importer}`);

      // 你可以在这里修改导入路径或做其他处理
      // 例如，将路径前缀添加某个路径
      if (source === "./dynamicModule.js") {
        return this.resolve("src/dynamicModule.js", importer);
      }

      // 返回 null 表示不处理这个动态导入
      return null;
    },
  };
}
