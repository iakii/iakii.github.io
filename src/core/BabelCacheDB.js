import * as Babel from "@babel/standalone";
import { parseReact } from "../routes/online/hooks/useJSXSchema";

/**
 * 黑名单关键字，禁止危险操作。
 * @type {RegExp[]}
 */
const blacklist = [
  /window\b/,
  /document\b/,
  /eval\b/,
  /Function\b/,
  /fetch\b/,
  /XMLHttpRequest\b/,
  /importScripts\b/,
  /postMessage\b/,
  /SharedWorker\b/,
  /Worker\b/,
  /WebSocket\b/,
  /EventSource\b/,
  /IndexedDB\b/,
  /top\b/,
  /require\b/,
  /globalThis\b/,
  /for\s*\(\s*;\s*;\s*\)/, // 禁止 for(;;)
  /while\s*\(\s*true\s*\)/, // 禁止 while(true)
  /do\s*{[\s\S]*?}\s*while\s*\(\s*true\s*\)/, // 禁止 do{}while(true)
];

class BabelCacheDB {
  // 数据库配置
  static DB_CONFIG = {
    dbName: "BabelCacheDB",
    storeName: "babelRecords",
    version: 1,
  };

  // Babel 解析默认配置（可自定义扩展）
  static BABEL_PARSE_OPTS = {
    presets: ["react"],
  };

  /**
   * 初始化数据库连接（私有方法，内部复用）
   * @returns {Promise<IDBDatabase>} IndexedDB 实例
   */
  #initDB() {
    return new Promise((resolve, reject) => {
      const { dbName, version, storeName } = BabelCacheDB.DB_CONFIG;
      const request = indexedDB.open(dbName, version);

      // 数据库升级/首次创建：创建对象存储
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        // 若存储表不存在，则创建（主键为 id）
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: "id" });
          console.log(`[IndexedDB] 创建存储表 ${storeName}`);
        }
      };

      // 连接成功
      request.onsuccess = (e) => resolve(e.target.result);
      // 连接失败
      request.onerror = (e) =>
        reject(new Error(`数据库连接失败：${e.target.error}`));
    });
  }

  /**
   * Babel 解析代码（私有方法，内部复用）
   * @param {string} code - 待解析的原始代码
   * @param {object} customOpts - 自定义 Babel 解析配置
   * @returns {object} Babel 解析后的 AST 对象
   */
  #parseCode(code, customOpts = {}) {
    try {
      return parseReact(code); // 浏览器端 Babel 解析 API
    } catch (err) {
      throw new Error(`Babel 解析失败：${err.message}`);
    }
  }

  /**
   * 1. 新增记录（Create）
   * @param {object} data - 新增数据（必须包含 id、name、code）
   * @param {string/number} data.id - 唯一标识（主键）
   * @param {string} data.name - 记录名称（自定义）
   * @param {string} data.code - 原始代码（待解析）
   * @param {object} [customBabelOpts] - 自定义 Babel 解析配置
   * @returns {Promise<object>} 新增的完整记录（含 babel、createTime）
   */
  async addRecord(data, customBabelOpts = {}) {
    const { id, name, code } = data;
    // 校验必填字段
    if (!id || !name || !code) {
      throw new Error("新增失败：id、name、code 为必填字段");
    }

    const db = await this.#initDB();
    const store = db
      .transaction(BabelCacheDB.DB_CONFIG.storeName, "readwrite")
      .objectStore(BabelCacheDB.DB_CONFIG.storeName);

    // 校验 id 唯一性（避免主键冲突）
    const existingRecord = await new Promise((resolve) => {
      const request = store.get(id);
      request.onsuccess = (e) => resolve(e.target.result);
      request.onerror = () => resolve(null);
    });
    if (existingRecord) {
      db.close();
      throw new Error(`新增失败：id 为 ${id} 的记录已存在`);
    }

    // 解析 code 生成 babel 字段，填充 createTime
    const babel = await this.#parseCode(code, customBabelOpts);
    console.log("parsed babel", babel);
    const createTime = Date.now();
    const newRecord = { id, name, code, babel, createTime };

    // 写入数据库
    await new Promise((resolve, reject) => {
      const request = store.add(newRecord);
      request.onsuccess = () => {
        console.log(`[IndexedDB] 新增记录成功：id=${id}`);
        resolve(newRecord);
      };
      request.onerror = (e) => reject(new Error(`新增失败：${e.target.error}`));
    });

    db.close();
    return newRecord;
  }

  /**
   * 2. 查询记录（Read）- 按 id 查单条
   * @param {string/number} id - 记录主键
   * @returns {Promise<object|null>} 匹配的记录（无则返回 null）
   */
  async getRecordById(id) {
    const db = await this.#initDB();
    const store = db
      .transaction(BabelCacheDB.DB_CONFIG.storeName, "readonly")
      .objectStore(BabelCacheDB.DB_CONFIG.storeName);

    const record = await new Promise((resolve) => {
      const request = store.get(id);
      request.onsuccess = (e) => resolve(e.target.result);
      request.onerror = () => resolve(null);
    });

    db.close();
    if (record) {
      console.log(`[IndexedDB] 查询到记录：id=${id}`);
    } else {
      console.log(`[IndexedDB] 未查询到 id=${id} 的记录`);
    }
    return record;
  }

  /**
   * 3. 查询记录（Read）- 查询所有记录
   * @returns {Promise<object[]>} 所有记录数组（空则返回 []）
   */
  async getAllRecords() {
    const db = await this.#initDB();
    const store = db
      .transaction(BabelCacheDB.DB_CONFIG.storeName, "readonly")
      .objectStore(BabelCacheDB.DB_CONFIG.storeName);

    const records = await new Promise((resolve) => {
      const request = store.getAll();
      request.onsuccess = (e) => resolve(e.target.result);
      request.onerror = () => resolve([]);
    });

    db.close();
    console.log(`[IndexedDB] 查询到 ${records.length} 条记录`);
    return records;
  }

  /**
   * 4. 查询记录（Read）- 按 name 模糊查询
   * @param {string} keyword - 名称关键词
   * @returns {Promise<object[]>} 匹配的记录数组（空则返回 []）
   */
  async searchRecordsByName(keyword) {
    const allRecords = await this.getAllRecords();
    // 模糊匹配（忽略大小写）
    const matchedRecords = allRecords.filter((record) =>
      record.name.toLowerCase().includes(keyword.toLowerCase())
    );
    console.log(
      `[IndexedDB] 名称包含 "${keyword}" 的记录共 ${matchedRecords.length} 条`
    );
    return matchedRecords;
  }

  /**
   * 5. 更新记录（Update）
   * @param {string/number} id - 要更新的记录主键
   * @param {object} updateData - 待更新字段（可选：name、code、customBabelOpts）
   * @param {string} [updateData.name] - 新名称
   * @param {string} [updateData.code] - 新代码（修改后自动重新解析 babel）
   * @param {object} [updateData.customBabelOpts] - 新的 Babel 解析配置（仅 code 变更时生效）
   * @returns {Promise<object>} 更新后的完整记录
   */
  async updateRecord(id, updateData) {
    const { name, code, customBabelOpts = {} } = updateData;
    if (!name && !code) {
      throw new Error("更新失败：需传入 name 或 code 字段");
    }

    const db = await this.#initDB();
    const store = db
      .transaction(BabelCacheDB.DB_CONFIG.storeName, "readwrite")
      .objectStore(BabelCacheDB.DB_CONFIG.storeName);

    // 校验记录是否存在
    const existingRecord = await new Promise((resolve) => {
      const request = store.get(id);
      request.onsuccess = (e) => resolve(e.target.result);
      request.onerror = () => resolve(null);
    });
    if (!existingRecord) {
      db.close();
      throw new Error(`更新失败：未找到 id=${id} 的记录`);
    }

    // 构建更新后的记录：保留原字段，覆盖传入的更新字段
    const updatedRecord = { ...existingRecord };
    if (name) updatedRecord.name = name;
    // 若 code 变更，重新解析 babel 字段
    if (code) {
      updatedRecord.code = code;
      updatedRecord.babel = await this.#parseCode(code, customBabelOpts);
      console.log("parsed babel", updatedRecord.babel);
    }
    // createTime 保持原时间（如需更新可手动添加：
    updatedRecord.createTime = Date.now()

    // 写入数据库（put 方法：存在则更新，不存在则新增）
    await new Promise((resolve, reject) => {
      const request = store.put(updatedRecord);
      request.onsuccess = () => {
        console.log(`[IndexedDB] 更新记录成功：id=${id}`);
        resolve(updatedRecord);
      };
      request.onerror = (e) => reject(new Error(`更新失败：${e.target.error}`));
    });

    db.close();
    return updatedRecord;
  }

  /**
   * 6. 删除记录（Delete）- 按 id 删单条
   * @param {string/number} id - 要删除的记录主键
   * @returns {Promise<boolean>} 删除成功返回 true（无此记录也返回 true）
   */
  async deleteRecordById(id) {
    const db = await this.#initDB();
    const store = db
      .transaction(BabelCacheDB.DB_CONFIG.storeName, "readwrite")
      .objectStore(BabelCacheDB.DB_CONFIG.storeName);

    await new Promise((resolve) => {
      const request = store.delete(id);
      request.onsuccess = () => {
        console.log(`[IndexedDB] 删除记录成功：id=${id}`);
        resolve(true);
      };
      request.onerror = () => resolve(true);
    });

    db.close();
    return true;
  }

  /**
   * 7. 删除记录（Delete）- 清空所有记录
   * @returns {Promise<boolean>} 清空成功返回 true
   */
  async clearAllRecords() {
    const db = await this.#initDB();
    const store = db
      .transaction(BabelCacheDB.DB_CONFIG.storeName, "readwrite")
      .objectStore(BabelCacheDB.DB_CONFIG.storeName);

    await new Promise((resolve, reject) => {
      const request = store.clear();
      request.onsuccess = () => {
        console.log("[IndexedDB] 清空所有记录成功");
        resolve(true);
      };
      request.onerror = (e) => reject(new Error(`清空失败：${e.target.error}`));
    });

    db.close();
    return true;
  }
}

// 初始化工具类实例（全局可用）
export const babelCacheDB = new BabelCacheDB();
