import fetch from "node-fetch";

export default (options) => {
  const { responseType } = options || { responseType: "text" };
  return {
    name: "remote-module-loader",
    resolveId(source) {
      if (["http", "https"].some((url) => source.startsWith(url + "://"))) {
        return source; // 直接返回 URL 作为模块 ID
      }
      return null; // 继续常规的模块解析流程
    },
    async load(id) {
      if (["http", "https"].some((url) => id.startsWith(url + "://"))) {
        const response = await fetch(id);
        const content = await response[responseType]();
        return `export default ${JSON.stringify(content)};`; // 将远程内容作为 JavaScript 字符串导出
      }
      return null; // 继续常规的模块加载流程
    },
  };
};
