#!/usr/bin/env node
/**
 * CLI 工具：读取 package.json 版本号，生成 public/version.json
 * @module version-generator
 */
const fs = require("fs");
const path = require("path");

const dayjs = require("dayjs");

/**
 * 获取 package.json 路径
 * @returns {string}
 */
function getPackageJsonPath() {
  return path.resolve(__dirname, "package.json");
}

/**
 * 获取 public 目录路径
 * @returns {string}
 */
function getPublicDir() {
  return path.resolve(__dirname, "public");
}

/**
 * 读取 package.json 并返回版本号
 * @returns {string}
 */
function readVersion() {
  const pkgPath = getPackageJsonPath();
  if (!fs.existsSync(pkgPath)) {
    throw new Error("package.json 文件不存在");
  }
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
  if (!pkg.version) {
    throw new Error("package.json 未包含 version 字段");
  }
  return pkg.version;
}

/**
 * 写入 version.json 到 public 目录
 * @param {string} version
 */
function writeVersionJson(version) {
  const publicDir = getPublicDir();
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  const outPath = path.join(publicDir, "version.json");
  const content = JSON.stringify(
    { version, date: dayjs().format("YYYY-MM-DD HH:mm") },
    null,
    2
  );
  fs.writeFileSync(outPath, content, "utf-8");
  console.log(`已生成 ${outPath}:\n${content}`);
}

// 主流程
try {
  const version = readVersion();
  writeVersionJson(version);
} catch (e) {
  console.error("生成 version.json 失败:", e.message);
  process.exit(1);
}
