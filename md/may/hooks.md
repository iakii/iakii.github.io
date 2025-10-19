## **Hooks 文档**

### 1. **`useAntDesignComponents`**
- **解决问题**: 动态渲染 Ant Design 组件，支持 JSX 格式的动态渲染。
- **功能**:
  - 支持两种 JSX 格式的渲染：
    1. `['Tag', {color: 'red', children: 'demo'}]`
    2. `{component: 'Space', size: 15, wrap: true, children: []}`
  - 提供错误渲染提示。
- **使用方法**:
  ```js
  const [renderJsx] = useAntDesignComponents();
  const jsx = ['Button', { type: 'primary', children: 'Click Me' }];
  const element = renderJsx(jsx);
  ```

---

### 2. **`useInjectionAntDesign`**
- **解决问题**: 提供 Ant Design 相关工具的注入，简化组件开发。
- **功能**:
  - 提供 `$message`、`$notification`、`$modal` 等 Ant Design 工具。
  - 提供 `renderJsx` 方法用于动态渲染。
  - 提供 `urlQueryParams` 和权限校验工具。
- **使用方法**:
  ```js
  const injected = useInjectionAntDesign();
  injected.$message.success('操作成功');
  ```

---

### 3. **`useDict`**
- **解决问题**: 提供字典数据的管理和获取。
- **功能**:
  - 管理和获取字典数据。
  - 支持动态加载和缓存。
- **使用方法**:
  ```js
  const dict = useDict('status');
  console.log(dict); // 输出字典数据
  ```

---

### 4. **`useEvent`**
- **解决问题**: 提供事件订阅和发布的能力。
- **功能**:
  - 支持事件订阅、一次性订阅、事件发布和移除事件监听。
- **使用方法**:
  ```js
  const [eventOn, eventEmit] = useEmit();
  eventOn('myEvent', (data) => console.log(data));
  eventEmit('myEvent', { key: 'value' });
  ```

---

### 5. **`useFavicon`**
- **解决问题**: 动态更改浏览器标签页的 favicon。
- **功能**:
  - 更改 favicon 图标。
- **使用方法**:
  ```js
  useFavicon('/path/to/favicon.ico');
  ```

---

### 6. **`useIdle`**
- **解决问题**: 检测用户是否处于空闲状态。
- **功能**:
  - 检测用户空闲时间。
  - 提供回调函数处理空闲和唤醒事件。
- **使用方法**:
  ```js
  const [isIdle] = useIdle({ time: 60, focusCallback: () => console.log('唤醒') });
  ```

---

### 7. **`useInjectionAntDesign`**
- **解决问题**: 提供 Ant Design 工具和动态渲染能力。
- **功能**:
  - 提供 Ant Design 的工具注入。
  - 提供动态渲染能力。
- **使用方法**:
  ```js
  const { $message, renderJsx } = useInjectionAntDesign();
  $message.success('操作成功');
  ```

---

### 8. **`useLicense`**
- **解决问题**: 校验和管理用户的许可证信息。
- **功能**:
  - 校验许可证有效性。
  - 提供许可证相关操作。
- **使用方法**:
  ```js
  const isValid = useLicense();
  console.log(isValid ? '许可证有效' : '许可证无效');
  ```

---

### 9. **`useMitt`**
- **解决问题**: 提供基于 Mitt 的事件总线。
- **功能**:
  - 支持事件的发布和订阅。
- **使用方法**:
  ```js
  const [mitt] = useMitt();
  mitt.on('event', (data) => console.log(data));
  mitt.emit('event', { key: 'value' });
  ```

---

### 10. **`useMove`**
- **解决问题**: 提供拖拽和移动的能力。
- **功能**:
  - 支持拖拽事件。
- **使用方法**:
  ```js
  const { onDragStart, onDragEnd } = useMove();
  ```

---

### 11. **`useNProgress`**
- **解决问题**: 提供页面加载进度条的控制。
- **功能**:
  - 控制页面加载进度条。
- **使用方法**:
  ```js
  const { start, done } = useNProgress();
  start();
  done();
  ```

---

### 12. **`usePermission`**
- **解决问题**: 提供权限校验功能。
- **功能**:
  - 校验用户是否有权限。
- **使用方法**:
  ```js
  const [isPermission] = usePermission();
  console.log(isPermission('admin') ? '有权限' : '无权限');
  ```

---

### 13. **`useQuery`**
- **解决问题**: 提供 URL 查询参数的解析。
- **功能**:
  - 获取和解析 URL 查询参数。
- **使用方法**:
  ```js
  const query = useQuery();
  console.log(query.get('id'));
  ```

---

### 14. **`useSelector`**
- **解决问题**: 提供 Redux 状态的选择器。
- **功能**:
  - 获取 Redux 状态。
- **使用方法**:
  ```js
  const { user } = useSelector((state) => state.app);
  console.log(user);
  ```

---

### 15. **`useWebSocket`**
- **解决问题**: 提供 WebSocket 的连接和管理。
- **功能**:
  - 管理 WebSocket 连接。
  - 提供事件监听和发送功能。
- **使用方法**:
  ```js
  const ws = useWebSocket('ws://example.com');
  ws.on('message', (data) => console.log(data));
  ```

---

### 16. **`useWorker`**
- **解决问题**: 提供 Web Worker 的管理。
- **功能**:
  - 管理 Web Worker。
- **使用方法**:
  ```js
  const worker = useWorker('/path/to/worker.js');
  worker.postMessage({ key: 'value' });
  ```

---

如果需要更详细的说明或示例代码，请告诉我！