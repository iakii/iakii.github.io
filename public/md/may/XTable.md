以下是基于 `XTable` 组件的完整 JSDoc 注释，包含 `ProTable` 的属性说明以及 `XTable` 的扩展功能：

```javascript
/**
 * XTable 组件 - 基于 Ant Design ProTable 的封装组件，支持高级搜索、分页、错误处理等功能。
 *
 * @param {Object} props - 组件的属性
 * @param {Array} props.columns - 表格列配置，支持 ProTable 的列定义格式
 * @param {Function} props.request - 数据请求函数，接收 `(params, sort, filter)`，返回一个 Promise
 * @param {Object|boolean} [props.pagination=true] - 分页配置，支持 ProTable 的分页定义，传 `false` 禁用分页
 * @param {boolean} [props.isCheckbox=true] - 是否启用多选框
 * @param {Object|null} [props.advancedSearch=null] - 高级搜索配置，格式为 `{ whereNames: Array, whereExps: Array, onSearch: Function, onClose: Function }`
 * @param {Object} [props.toolbar] - 工具栏配置，支持 `actions` 属性自定义工具栏按钮
 * @param {Function} [props.toolBarRender] - 自定义工具栏渲染函数，接收 `action` 参数
 * @param {number} [props.defaultPageSize=20] - 默认每页显示的记录数
 * @param {Object} [props.search] - 搜索表单配置，继承自 ProTable 的 `search` 属性
 * @param {boolean} [props.bordered=true] - 是否显示表格边框
 * @param {boolean} [props.size='small'] - 表格大小，支持 `small`、`middle`、`large`
 * @param {boolean} [props.tableAlertRender=false] - 是否显示表格警告信息
 * @param {Object} [props.options] - 表格操作栏配置，支持全屏、密度调整等功能
 * @param {Function} [props.onRequestError] - 数据请求错误时的回调函数
 * @param {Function} [props.onRowSelectionChange] - 行选择变化时的回调函数
 * @param {Object} [props.rowSelection] - 行选择配置，继承自 ProTable 的 `rowSelection` 属性
 * @param {Object} [props.toolbar.actions] - 自定义工具栏按钮，支持函数或 JSX 元素
 * @returns {JSX.Element} - 渲染的表格组件
 */
export const XTable = ({
  columns,
  request,
  pagination,
  isCheckbox = true,
  advancedSearch = null,
  ...props
}) => {
  // 组件逻辑...
};
```

---

### **ProTable 的属性说明**

`XTable` 继承了 `ProTable` 的所有属性，以下是常用的 `ProTable` 属性说明：

| 属性名                | 类型               | 默认值       | 描述                                                                 |
|-----------------------|--------------------|--------------|----------------------------------------------------------------------|
| `columns`             | `Array`           | 必填         | 表格列配置，支持 `title`、`dataIndex`、`key` 等字段。                |
| `request`             | `Function`        | 必填         | 数据请求函数，接收 `(params, sort, filter)`，返回一个 Promise。      |
| `pagination`          | `Object|boolean`  | `true`       | 分页配置，支持 `pageSize`、`current` 等，传 `false` 禁用分页。       |
| `rowKey`              | `string|Function` | `'id'`       | 表格行的唯一标识字段。                                               |
| `search`              | `Object|boolean`  | `true`       | 搜索表单配置，传 `false` 禁用搜索。                                  |
| `toolBarRender`       | `Function|false`  | `true`       | 自定义工具栏渲染函数，传 `false` 隐藏工具栏。                        |
| `options`             | `Object|false`    | `{}`         | 表格操作栏配置，支持全屏、密度调整等功能，传 `false` 隐藏操作栏。    |
| `rowSelection`        | `Object`          | `undefined`  | 行选择配置，支持多选框、单选框等功能。                               |
| `onRequestError`      | `Function`        | `undefined`  | 数据请求错误时的回调函数。                                           |
| `tableAlertRender`    | `Function|false`  | `false`      | 自定义表格警告信息的渲染，传 `false` 隐藏警告信息。                  |
| `columnEmptyText`     | `string|false`    | `'-'`        | 当单元格数据为空时显示的占位文本，传 `false` 隐藏占位文本。          |
| `headerTitle`         | `string|ReactNode`| `undefined`  | 表格标题，显示在工具栏左侧。                                         |
| `defaultData`         | `Array`           | `[]`         | 表格的默认数据。                                                     |
| `loading`             | `boolean`         | `false`      | 是否显示加载状态。                                                   |

---

### **XTable 的扩展功能**

1. **高级搜索 (`advancedSearch`)**:
   - 格式：`{ whereNames: Array, whereExps: Array, onSearch: Function, onClose: Function }`
   - 描述：支持高级搜索功能，`whereNames` 和 `whereExps` 定义搜索字段和表达式，`onSearch` 和 `onClose` 分别为搜索和关闭的回调函数。

2. **错误处理 (`onRequestError`)**:
   - 描述：当数据请求发生错误时，触发该回调函数，并显示错误信息。

3. **工具栏按钮 (`toolbar.actions`)**:
   - 描述：支持自定义工具栏按钮，传入函数或 JSX 元素。

4. **多选框 (`isCheckbox`)**:
   - 描述：是否启用多选框，默认启用。

---

### **使用示例**

```javascript
import React from 'react';
import { XTable } from './XTable';

const columns = [
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '年龄', dataIndex: 'age', key: 'age' },
  { title: '地址', dataIndex: 'address', key: 'address' }
];

const request = async (params) => {
  // 模拟请求
  return {
    success: true,
    data: [
      { id: 1, name: '张三', age: 25, address: '北京' },
      { id: 2, name: '李四', age: 30, address: '上海' }
    ],
    total: 2
  };
};

const App = () => {
  return (
    <XTable
      columns={columns}
      request={request}
      pagination={{ pageSize: 10 }}
      advancedSearch={{
        whereNames: [{ label: '姓名', value: 'name' }],
        whereExps: [{ label: '包含', value: 'like' }],
        onSearch: (values) => console.log('搜索值:', values),
        onClose: () => console.log('关闭高级搜索')
      }}
    />
  );
};

export default App;
```

---

如需进一步扩展或调整，请根据具体需求修改注释内容！

找到具有 2 个许可证类型的类似代码