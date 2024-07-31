const delay = (t) => new Promise((res) => setTimeout(res, t ? t * 1000 : 1000));
export default function lifeStylePlugin(timer) {
  return {
    // 钩子返回null表示什么都不处理流向下一个钩子或者默认处理
    //该钩子在构建开始时调用，可以用于准备工作或初始化。
    async buildStart() {
      console.log("build start==================");
      await delay(timer);
    },
    //该钩子用于解析模块 ID，可以用于自定义模块解析逻辑。
    async resolveId(id) {
      console.log("resolveId========================");
      await delay();
      return null;
    },
    //该钩子用于加载模块内容，可以用于自定义模块加载逻辑。
    async load(id) {
      console.log("load=============================");
      await delay();
      return null;
    },
    //该钩子用于转换模块内容，可以用于自定义转换逻辑，例如代码编译或压缩。
    async transform(code, id) {
      //   if (id.endsWith(".js")) {
      //     return {
      //       code,
      //       map: null,
      //     };
      //   }
      //   return null;
      console.log("transform=======================================");
      return null;
    },
    //该钩子在生成捆绑包时调用，可以用于修改生成的文件或添加额外的输出
    async generateBundle(options, bundle, isWrite) {
      console.log("generateBundle=============================");
      for (const fileName of Object.keys(bundle)) {
        const chunk = bundle[fileName];
        // console.log("chunk.type", chunk.type);
        if (chunk.type === "asset") {
          continue;
        }
        //   const transformedCode = await customTransformChunkFunction(chunk.code);
        //   chunk.code = transformedCode;
      }
      return null;
    },
    //该钩子在文件写入磁盘后调用，可以用于执行额外的文件操作。
    async writeBundle(options, bundle) {
      console.log("writeBundle===================");
      await delay();
      //   return null;
    },
    //该钩子在构建结束时调用，可以用于清理工作或关闭资源。
    async closeBundle() {
      console.log("closeBundle=============================");
      await delay();
      //   return null;
    },
  };
}
