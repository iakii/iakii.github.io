/**
 * 生成缓存 Key（浏览器端：代码内容哈希 + 解析配置哈希）
 * @param {string} code - 待解析的代码字符串
 * @param {object} parserOpts - Babel 解析配置
 * @returns {string} 唯一缓存 Key
 */
function generateCacheKey(code, parserOpts) {
  // 1. 计算代码内容哈希（避免相同代码重复解析）
  const codeHash = btoa(unescape(encodeURIComponent(code))); // 简单哈希（复杂场景用 Crypto API）
  // 2. 序列化解析配置（配置变化则 Key 变化）
  const optsStr = JSON.stringify(parserOpts, (key, value) =>
    typeof value === "function" ? value.toString() : value
  );
  const optsHash = btoa(unescape(encodeURIComponent(optsStr)));
  return `${codeHash}-${optsHash}`;
}

/**
 * 带 LocalStorage 缓存的 Babel 解析函数
 * @param {string} code - 待解析代码
 * @param {object} parserOpts - 解析配置
 * @returns {object} AST 对象
 */
function parseWithLocalStorageCache(code, parserOpts = {}) {
  const defaultOpts = { sourceType: "module", plugins: ["jsx", "typescript"] };
  const finalOpts = { ...defaultOpts, ...parserOpts };
  const cacheKey = generateCacheKey(code, finalOpts); // 复用方案 1 的 generateCacheKey
  const CACHE_PREFIX = "babel-ast-cache-"; // 缓存键前缀（避免冲突）

  // 1. 读取缓存
  const cachedStr = localStorage.getItem(CACHE_PREFIX + cacheKey);
  if (cachedStr) {
    try {
      const cachedAst = JSON.parse(cachedStr);
      console.log("[Browser Babel Cache (LocalStorage) Hit]");
      return cachedAst;
    } catch (err) {
      console.warn("[LocalStorage Cache Corrupted] 重新解析");
      localStorage.removeItem(CACHE_PREFIX + cacheKey);
    }
  }

  // 2. 解析并写入缓存
  const ast = Babel.parse(code, finalOpts);
  try {
    // AST 序列化为字符串存入 LocalStorage
    localStorage.setItem(CACHE_PREFIX + cacheKey, JSON.stringify(ast));
  } catch (err) {
    console.warn("[LocalStorage Full] 无法存入缓存");
  }
  return ast;
}

// 示例：持久化缓存解析结果

// 手动清理缓存（可选）
function clearBabelLocalCache() {
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith("babel-ast-cache-")) {
      localStorage.removeItem(key);
    }
  });
}

// const tsCode = `interface User { name: string; age: number; }`;
// const tsAst = parseWithLocalStorageCache(tsCode, { plugins: ["typescript"] });
