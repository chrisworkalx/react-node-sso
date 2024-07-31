import fs from "fs";

export default (options) => {
  console.log("options", options);
  return {
    name: "cache-optimized-loader",
    buildStart() {
      this.cache = new Map(); // 初始化缓存
    },
    resolveId(source) {
      if (source.endsWith(".txt")) {
        return source;
      }
      return null;
    },
    load(id) {
      if (id.endsWith(".txt")) {
        if (this.cache.has(id)) {
          console.log("cached--id---------------------------", id);

          return this.cache.get(id); // 从缓存中获取内容
        }
        console.log("id---------------------------", id);
        const content = fs.readFileSync(id, "utf-8");
        const code = `export default ${JSON.stringify(content)};`;
        this.cache.set(id, code); // 将内容存入缓存
        return code;
      }
      return null;
    },
  };
};
