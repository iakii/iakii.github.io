const json = {};


// {
//   "columns": [
//     {
//       "title": "手册",
//       "dataIndex": "s-year",
//       "ellipsis": true,
//       "isSearch": true,
//       "hideInTable": true,
//       "valueEnumPromise": "$root.render((params) => {\n  // 如有有依赖更新，从params中拿参数\n  return $api\n    .query(\"/nursingquality/book-annual/info?pageSize=100&pageIndex=0\")\n    .then(({ data }) => {\n      return (data || []).map((x) => ({ label: x.name, value: x.year }))\n    })\n})\n",
//       "transform": "$root.transform((value) => {\n  return {\n    year: value,\n  }\n})\n",
//       "searchProps": "$root.render((e) => {\n  return {\n    defaultValue: new Date().getFullYear(),\n  }\n})\n"
//     },
//     {
//       "title": "日期",
//       "dataIndex": "displayDateLike",
//       "valueType": "date",
//       "ellipsis": true,
//       "isSearch": true,
//       "width": 120,
//       "hideInTable": true
//     },
//     {
//       "title": "日查时间",
//       "dataIndex": "fieldList.displayDate",
//       "ellipsis": true,
//       "width": 120
//     },
//     {
//       "title": "科室",
//       "dataIndex": "businessDeptId",
//       "valueType": "tdDepartmentSelector",
//       "width": 220,
//       "ellipsis": true,
//       "isSearch": true,
//       "hideInTable": true
//     },
//     {
//       "title": "科室",
//       "dataIndex": "businessDeptName",
//       "width": 220,
//       "align": "left",
//       "ellipsis": true
//     },
//     {
//       "title": "日查项目",
//       "dataIndex": "rcxm",
//       "width": 160,
//       "ellipsis": true,
//       "render": "$root.render(({ value,record }) => {\n  return {component: 'div',style: {width:'160px',whiteSpace: 'pre-wrap',display:'inline-block'},children: record.fieldList.rcxm}})"
//     },
//     {
//       "title": "内容",
//       "dataIndex": "rcnr",
//       "width": 160,
//       "ellipsis": true,
//       "render": "$root.render(({ value,record }) => {\n  return {component: 'div',style: {width:'160px',whiteSpace: 'pre-wrap',display:'inline-block'},dangerouslySetInnerHTML:{__html:record.fieldList.rcnr} }})"
//     },
//     {
//       "title": "样本数",
//       "dataIndex": "yangbenshu",
//       "width": 160,
//       "ellipsis": true,
//       "render": "$root.render(({ value,record }) => {\n  return {component: 'div',style: {width:'160px',whiteSpace: 'pre-wrap',display:'inline-block'},dangerouslySetInnerHTML:{__html:record.fieldList.yangbenshu} }})"
//     },
//     {
//       "title": "记录人",
//       "dataIndex": "createUserName",
//       "width": 120,
//       "render": "$root.render(({ value,record }) => {\n  return {component: 'div',children: record.createUserName}})"
//     },
//     {
//       "title": "记录时间",
//       "dataIndex": "recordDate",
//       "valueType": "dateTime",
//       "width": 120,
//       "ellipsis": true
//     }
//   ],
//   "saveParameter": {
//     "autoReport": 1
//   },
//   "action": [
//     {
//       "id": 1679483119791,
//       "name": "未填写科室",
//       "type": "3",
//       "pageId": "未填写科室",
//       "runShow": "$root.user.roleModels.findIndex((v) => v.name === \"护理部\") !== -1\n",
//       "run": "$root.$drawer(\n  {\n    title: \"未填写科室\",\n    width: \"95vw\",\n    footer: null,\n    bodyStyle: { padding: \"15px 15px 15px 15px\" },\n  },\n  \"未填写科室\",\n  {\n    seachDocId: 41,\n  }\n)\n"
//     },
//     {
//       "id": 1679484041210,
//       "name": "导出未填写科室",
//       "type": "3",
//       "icon": "DownloadOutlined",
//       "runShow": "$root.user.roleModels.findIndex((v) => v.name === \"护理部\") !== -1\n",
//       "run": "const onOk = (dom) => {\n  const { formValues = {} } = dom\n  if (!formValues.displayDateLike) {\n    $root.$message.error(\"日期为必选项\")\n    return\n  }\n  let loading = $root.$message.loading(\"加载中\")\n  $api\n    .download(\n      \"/nursingquality/book/unreported-export\",\n      Object.assign({ docId: 41 }, formValues || {})\n    )\n    .finally(() => {\n      loading()\n    })\n}\nlet dom = $root.$dialog(\n  {\n    title: \"未填写科室导出\",\n    okText: \"导出\",\n    cancelText: \"取消\",\n    width: \"400px\",\n    bodyStyle: { height: \"auto\" },\n    footer: [\n      $root.renderJsx({\n        component: \"Button\",\n        children: \"导出\",\n        type: \"primary\",\n        key: \"submit\",\n        onClick: () => {\n          onOk(dom)\n        },\n      }),\n    ],\n  },\n  \"未填写科室导出\",\n  {}\n)\n"
//     },
//     {
//       "id": 1681195183773,
//       "name": "导出列表",
//       "type": "3",
//       "runShow": "$root.render(() => {\n  const { customConfig = {} } = ($root.state || {}).doc || {}\n  return !customConfig.hideExport\n})\n",
//       "run": "const tableParams = $root.getValueByKeys($root, \"searchFormValues\", {})\nconst exportConfig = $root.getValueByKeys(\n    $root,\n    \"state.doc.customConfig.exportConfig\",\n    {}\n)\nconst rootDepartmentTree = $root.getValueByKeys(\n    $root,\n    \"state.rootDepartmentTree\",\n    []\n)\nconst columnsInfo = $root.getValueByKeys(\n    $root,\n    \"state.doc.customConfig.columns\",\n    []\n)\nconst docName = $root.getValueByKeys($root, \"state.doc.docName\", \"\")\nconst businessDeptId = $root.getValueByKeys(\n    $root,\n    \"tableParams.businessDeptId\",\n    \"\"\n)\nconst departmentObj =\n    rootDepartmentTree.find((v) => v.id === businessDeptId) || {}\n\nlet columnsArr = []\nfor (let i of columnsInfo) {\n    if (i.children) {\n        columnsArr = columnsArr.concat(i.children)\n    } else {\n        columnsArr.push(i)\n    }\n}\n\nconst headers = columnsArr\n    .filter((v) => !v.hideInTable && v.valueType !== \"indexBorder\")\n    .map((v, k) => v.title)\n    .join(\",\")\nconst columns = columnsArr\n    .filter((v) => !v.hideInTable && v.valueType !== \"indexBorder\")\n    .map((v, k) => {\n        if (v.dataIndex == \"fieldList.displayDate\") {\n            return \"displayDate\"\n        }\n        return v.dataIndex;\n    })\n    .join(\",\")\nlet tableParamsInfo = Object.assign({}, tableParams)\ndelete tableParamsInfo[\"_timestamp\"]\nconst loading = $root.$message.loading(\"加载中\")\n$api\n    .download(\n        exportConfig.url || \"/nursingquality/book/export\",\n        Object.assign({}, $root.directoryParams, tableParamsInfo, {\n            headers,\n            columns,\n            filename:\n                (departmentObj.departmentName || \"\") +\n                (tableParams.year || \"\") +\n                docName,\n        }),\n        {},\n        \"get\"\n    )\n    .finally(() => {\n        loading()\n    })\n"
//     }
//   ],
//   "searchTimeRange": "date"
// }