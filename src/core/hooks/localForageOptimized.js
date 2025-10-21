/**
 * LocalForage 优化工具类
 * 核心特性：单元素键值对操作、IndexedDB 索引查询、分片存储（解决大容量问题）
 *
 * @example
 * // 初始化（项目启动时执行一次即可）
 * await LocalForageOptimized.init();
 *
 * // 场景1：单元素增删改查（按 id）
 * await LocalForageOptimized.item.add({ id: 1, name: '张三', status: 'active' });
 * await LocalForageOptimized.item.add({ id: 2, name: '李四', status: 'inactive' });
 *
 * const user1 = await LocalForageOptimized.item.get(1);
 * console.log('查询 id=1 的元素：', user1); // { id:1, name: '张三', status: 'active' }
 *
 * const updatedUser = await LocalForageOptimized.item.update(1, { name: '张三丰' });
 * console.log('修改后的元素：', updatedUser); // { id:1, name: '张三丰', status: 'active' }
 *
 * await LocalForageOptimized.item.delete(2);
 * console.log('删除 id=2 后，查询结果：', await LocalForageOptimized.item.get(2)); // null
 *
 * // 场景2：批量索引查询（按 status）
 * await LocalForageOptimized.item.add({ id: 3, name: '王五', status: 'active' });
 * await LocalForageOptimized.item.add({ id: 4, name: '赵六', status: 'active' });
 *
 * const activeUsers = await LocalForageOptimized.getItemsByIndex('status', 'active');
 * console.log('所有活跃用户：', activeUsers); // id=1、3、4 的元素
 *
 * // 场景3：分片存储（如按年月存日志）
 * await LocalForageOptimized.shard.add({ time: Date.now(), content: '用户登录' });
 * await LocalForageOptimized.shard.add([
 *   { time: Date.now(), content: '查看首页' },
 *   { time: Date.now(), content: '退出登录' }
 * ]);
 *
 * const currentShardLogs = await LocalForageOptimized.shard.get();
 * console.log('当前月日志总数：', currentShardLogs.length); // 3
 *
 * await LocalForageOptimized.shard.cleanExpired(3); // 清理 3 个月前的分片
 */
export const LocalForageOptimized = {
  // 配置项：可根据项目需求修改
  config: {
    dbName: 'OptimizedDB',       // 数据库名
    mainStoreName: 'MainStore',  // 主存储表（存单元素）
    shardStoreName: 'ShardStore',// 分片存储表（存大容量分片数据）
    defaultIndexes: ['id', 'status'] // 初始化时自动创建的索引（按需添加）
  },

  // 实例缓存：避免重复创建
  instances: {
    main: null,  // 主存储实例
    shard: null  // 分片存储实例
  },

  /**
   * 1. 初始化（必须先执行！创建数据库、表、索引）
   * @returns {Promise<boolean>} 初始化结果
   */
  async init() {
    try {
      // 1.1 创建主存储实例（存单元素，带索引）
      this.instances.main = await localforage.createInstance({
        name: this.config.dbName,
        storeName: this.config.mainStoreName
      });

      // 1.2 创建分片存储实例（存大容量分片数据）
      this.instances.shard = await localforage.createInstance({
        name: this.config.dbName,
        storeName: this.config.shardStoreName
      });

      // 1.3 为主要存储表创建索引（依赖 IndexedDB 原生 API）
      const mainDB = await this.instances.main._dbInfo.db;
      const mainStore = mainDB.transaction(this.config.mainStoreName, 'readwrite').objectStore(this.config.mainStoreName);

      // 自动创建配置中的索引（如 id、status）
      this.config.defaultIndexes.forEach(indexName => {
        try {
          mainStore.createIndex(indexName, indexName, { unique: indexName === 'id' }); // id 设为唯一索引
        } catch (err) {
          if (!err.message.includes('already exists')) throw err; // 忽略“索引已存在”的错误
        }
      });

      console.log('LocalForage 优化版初始化成功');
      return true;
    } catch (err) {
      console.error('LocalForage 初始化失败：', err);
      return false;
    }
  },

  /**
   * 2. 单元素操作（按 id 增删改查，无全量读写）
   */
  item: {
    /**
     * 添加单元素（按 id 作为唯一键）
     * @param {Object} item 必须包含 id 字段（如 { id: 1, name: '张三' }）
     * @returns {Promise<Object>} 添加成功的元素
     */
    async add(item) {
      if (!item?.id) throw new Error('元素必须包含唯一 id 字段');
      await LocalForageOptimized.instances.main.setItem(`item_${item.id}`, item);
      return item;
    },

    /**
     * 根据 id 查询单元素
     * @param {string/number} id 元素的唯一 id
     * @returns {Promise<Object|null>} 查到的元素（不存在则返回 null）
     */
    async get(id) {
      return await LocalForageOptimized.instances.main.getItem(`item_${id}`);
    },

    /**
     * 根据 id 修改单元素
     * @param {string/number} id 元素的唯一 id
     * @param {Object} newData 要更新的字段（如 { name: '张三丰' }）
     * @returns {Promise<Object>} 更新后的完整元素
     */
    async update(id, newData) {
      const oldItem = await LocalForageOptimized.item.get(id);
      if (!oldItem) throw new Error(`未找到 id 为 ${id} 的元素`);

      const updatedItem = { ...oldItem, ...newData, id }; // 保留原 id，覆盖新字段
      await LocalForageOptimized.instances.main.setItem(`item_${id}`, updatedItem);
      return updatedItem;
    },

    /**
     * 根据 id 删除单元素
     * @param {string/number} id 元素的唯一 id
     * @returns {Promise<boolean>} 删除结果
     */
    async delete(id) {
      await LocalForageOptimized.instances.main.removeItem(`item_${id}`);
      return true;
    }
  },

  /**
   * 3. 批量查询（利用索引，效率远高于全量遍历）
   * @param {string} indexName 索引名（必须是初始化时配置的，如 'status'）
   * @param {any} indexValue 索引对应的值（如 'active'）
   * @returns {Promise<Array>} 符合条件的元素数组
   */
  async getItemsByIndex(indexName, indexValue) {
    if (!LocalForageOptimized.config.defaultIndexes.includes(indexName)) {
      throw new Error(`索引 ${indexName} 未初始化，请先在 config.defaultIndexes 中添加`);
    }

    try {
      const mainDB = await LocalForageOptimized.instances.main._dbInfo.db;
      const mainStore = mainDB.transaction(LocalForageOptimized.config.mainStoreName, 'readonly').objectStore(LocalForageOptimized.config.mainStoreName);
      const index = mainStore.index(indexName);

      // 利用索引查询，直接返回符合条件的所有元素
      return await new Promise((resolve, reject) => {
        const request = index.getAll(indexValue);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    } catch (err) {
      console.error('索引查询失败：', err);
      return [];
    }
  },

  /**
   * 4. 分片存储（处理大容量数据，如按时间分片的日志、列表）
   */
  shard: {
    /**
     * 生成分片键（默认按“年月”分片，如 202405）
     * @param {Date} [date=new Date()] 基于该日期生成分片键
     * @returns {string} 分片键（如 '202405'）
     */
    generateShardKey(date = new Date()) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      return `${year}${month}`;
    },

    /**
     * 向分片添加数据（不会覆盖整个分片，只追加）
     * @param {any} data 要添加的分片数据（单个或数组）
     * @param {string} [shardKey] 分片键（不填则用当前年月）
     * @returns {Promise<Array>} 添加后的分片完整数据
     */
    async add(data, shardKey) {
      const key = shardKey || LocalForageOptimized.shard.generateShardKey();
      const oldShardData = await LocalForageOptimized.instances.shard.getItem(key) || [];

      // 支持单个数据或数组批量添加
      const newShardData = [...oldShardData, ...(Array.isArray(data) ? data : [data])];
      await LocalForageOptimized.instances.shard.setItem(key, newShardData);

      return newShardData;
    },

    /**
     * 获取指定分片的完整数据
     * @param {string} [shardKey] 分片键（不填则用当前年月）
     * @returns {Promise<Array>} 分片数据（默认空数组）
     */
    async get(shardKey) {
      const key = shardKey || LocalForageOptimized.shard.generateShardKey();
      return await LocalForageOptimized.instances.shard.getItem(key) || [];
    },

    /**
     * 清理过期分片（如删除 3 个月前的分片）
     * @param {number} [months=3] 保留最近 N 个月的分片
     * @returns {Promise<Array>} 被删除的分片键列表
     */
    async cleanExpired(months = 3) {
      const now = new Date();
      const保留MonthsAgo = new Date(now.setMonth(now.getMonth() - months));
      const expiredShardKey = LocalForageOptimized.shard.generateShardKey(保留MonthsAgo);

      const allShardKeys = await LocalForageOptimized.instances.shard.keys();
      const deletedKeys = [];

      // 删除所有小于过期分片键的分片（如 202402 < 202405，会被删除）
      for (const key of allShardKeys) {
        if (key < expiredShardKey) {
          await LocalForageOptimized.instances.shard.removeItem(key);
          deletedKeys.push(key);
        }
      }

      console.log(`清理过期分片完成，共删除 ${deletedKeys.length} 个分片：`, deletedKeys);
      return deletedKeys;
    }
  }
};

