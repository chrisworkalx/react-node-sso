// 加载虚拟模块
export const virtualModulePlugin = () => {
  return {
    name: "virtual-module-plugin",
    resolveId(source) {
      if (source === "virtual-module") {
        return source; // 返回模块 ID，表示它已被解析
      }
      return null; // 表示 Rollup 应该继续常规的模块解析流程
    },
    load(id) {
      if (id === "virtual-module") {
        return 'export default "This is a virtual module!";';
      }
      return null; // 返回 null 表示 Rollup 应该继续常规的模块加载流程
    },
  };
};
