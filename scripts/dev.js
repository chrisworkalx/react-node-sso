import rollup from "rollup/dist/rollup.js";
import config from "../rollup.config.js";

async function watch() {
  const watcher = rollup.watch(config);

  // 模拟某种条件下停止监听器，例如 5 秒后
  setTimeout(() => {
    watcher.close();
    console.log("Watcher stopped programmatically.");
  }, 5000);

  watcher.on("event", (event) => {
    if (event.code === "START") {
      console.log("Rollup is starting...");
    }
    if (event.code === "BUNDLE_END") {
      console.log("Bundle completed.");
    }
  });
}

watch();
