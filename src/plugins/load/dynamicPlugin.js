export default (process) => {
  return {
    name: "dynamic-module-plugin",
    resolveId(source) {
      if (source === "dynamic-module") {
        return source; // 模块已解析
      }
      return null; // 继续常规的模块解析流程
    },
    load(id) {
      if (id === "dynamic-module") {
        const dynamicContent =
          process.env.NODE_ENV === "production"
            ? 'export default "This is the production version.";'
            : 'export default "This is the development version.";';
        return dynamicContent;
      }
      return null; // 继续常规的模块加载流程
    },
  };
};
