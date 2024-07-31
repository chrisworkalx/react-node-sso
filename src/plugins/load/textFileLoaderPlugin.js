import fs from "fs";
import path from "path";
// import { fileURLToPath, URL } from "node:url";

// 处理自定义文件类型
export default () => {
  return {
    name: "text-file-loader",
    resolveId(source) {
      if (source.endsWith(".txt")) {
        return source; // 表示该模块已被解析
      }
      return null; // 继续常规的模块解析流程
    },
    load(id) {
      if (id.endsWith(".txt")) {
        // console.log("id", id);
        // console.log("import.meta.url", import.meta.url);
        const filePath = path.resolve(id);
        const content = fs.readFileSync(filePath, "utf-8");
        return `export default ${JSON.stringify(content)};`; // 将文本文件内容作为 JavaScript 字符串导出
      }
      return null; // 继续常规的模块加载流程
    },
  };
};
