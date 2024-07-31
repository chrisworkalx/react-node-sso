export const pluginA = () => {
  return {
    name: "pluginA",
    buildStart: {
      //针对parallel类型的钩子 如果设置 sequential为true，则执行到当前钩子，并且等待完成，最后并发执行后续async类型的钩子
      sequential: true,
      async handler() {
        console.log("Plugin A starting...");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Plugin A finished.");
      },
    },
  };
};

export const pluginB = () => {
  return {
    name: "pluginB",
    async buildStart() {
      console.log("Plugin B starting...");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Plugin B finished.");
    },
  };
};

export const pluginC = () => {
  return {
    name: "pluginC",
    closeWatcher() {
      console.log(
        "============================Watcher is closing=================================="
      );
      // 这里可以放置任何清理操作
      //   cleanUpResources();
    },
  };
};
