import "./style.css";

import xyz from "virtual:xyz";
import virtualText from "virtual:module";
import aa from "@/files/a.txt";
import bb from "@/files/b.txt";
import remoteList from "https://jsonplaceholder.typicode.com/posts/1/comments";
import DynamicText from "dynamic-module";

const randomColor = () => Math.floor(Math.random() * 256);
const createBgColor = () =>
  `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;

async function loadDynamicFunction() {
  const module = await import("./dynamicModule.js");

  module.dynamicFunction();
}

const oApp = document.querySelector("#app");

oApp.style.cssText = `background-color: #f99; height: 100vh; 
    overflow: auto; padding: 20px;margin:auto;
    max-width:80%;text-align: center;
  `;

function createDivBox(str) {
  const oDiv = document.createElement("div");
  str = Array.isArray(str) ? str : [str];

  const htmlString = str.reduce((prev, next) => {
    return `${prev}<div class="list" 
    style="display:inline-block;max-width: 50%;
    white-space:pre-wrap;word-break:break-all;overflow-wrap: break-word;
    padding: 10px 20px; 
    color: #fff; 
    background-color: ${createBgColor()}; border-radius:8px;
    margin-bottom: 20px;transition: all 0.3s ease-in-out;">${
      typeof next === "string" ? next : JSON.stringify(next)
    }</div>`;
  }, "");
  oDiv.innerHTML = htmlString;
  oApp.appendChild(oDiv);
}

function bootstrap() {
  loadDynamicFunction();

  createDivBox(xyz);
  createDivBox(virtualText);
  createDivBox(aa);
  createDivBox(remoteList);
  createDivBox(DynamicText);
  createDivBox(bb);
}

bootstrap();
