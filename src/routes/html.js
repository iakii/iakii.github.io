import { createFileRoute } from "@tanstack/react-router";
import {
  EyeOutlined,
  FileTextOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import Editor from "@monaco-editor/react";
import { Button, Space, Typography } from "antd";
import template from "../core/template";
import printMgr from "../core/utils";
import { useState } from "react";

export const Route = createFileRoute("/html")({
  component: HtmlTab,
});

// 文件顶部
const exampleParams = `{
  "printConfig":{
    "landscape": "landscape",
    "showPageSize": true,
    "showPrintTime": true
  },
  "columns": [
    { "title": "姓名", "dataIndex": "name", "key": "name" },
    { "title": "年龄", "dataIndex": "age", "key": "age" },
    { "title": "地址", "dataIndex": "address", "key": "address" },
    { "title": "部门", "dataIndex": "department", "key": "department" },
    { "title": "职位", "dataIndex": "position", "key": "position" },
    { "title": "电话", "dataIndex": "phone", "key": "phone" },
    { "title": "邮箱", "dataIndex": "email", "key": "email" },
    { "title": "入职日期", "dataIndex": "entryDate", "key": "entryDate" },
    { "title": "工号", "dataIndex": "jobId", "key": "jobId" },
    { "title": "状态", "dataIndex": "status", "key": "status" },
    { "title": "备注", "dataIndex": "remark", "key": "remark" }
  ],
  "dataSource": [
    { "key": 1, "name": "张三", "age": 32, "address": "北京", "department": "研发部", "position": "工程师", "phone": "13800000001", "email": "zhangsan@example.com", "entryDate": "2020-01-15", "jobId": "1001", "status": "在职", "remark": "无" },
    { "key": 2, "name": "李四", "age": 28, "address": "上海", "department": "市场部", "position": "经理", "phone": "13800000002", "email": "lisi@example.com", "entryDate": "2019-03-22", "jobId": "1002", "status": "在职", "remark": "优秀员工" },
    { "key": 3, "name": "王五", "age": 45, "address": "广州", "department": "财务部", "position": "会计", "phone": "13800000003", "email": "wangwu@example.com", "entryDate": "2018-07-10", "jobId": "1003", "status": "离职", "remark": "退休" },
    { "key": 4, "name": "赵六", "age": 36, "address": "深圳", "department": "人事部", "position": "主管", "phone": "13800000004", "email": "zhaoliu@example.com", "entryDate": "2021-05-01", "jobId": "1004", "status": "在职", "remark": "" },
    { "key": 5, "name": "钱七", "age": 29, "address": "杭州", "department": "研发部", "position": "测试", "phone": "13800000005", "email": "qianqi@example.com", "entryDate": "2022-02-18", "jobId": "1005", "status": "在职", "remark": "" },
    { "key": 6, "name": "孙八", "age": 41, "address": "成都", "department": "市场部", "position": "专员", "phone": "13800000006", "email": "sunba@example.com", "entryDate": "2017-11-30", "jobId": "1006", "status": "在职", "remark": "" },
    { "key": 7, "name": "周九", "age": 38, "address": "重庆", "department": "财务部", "position": "出纳", "phone": "13800000007", "email": "zhoujiu@example.com", "entryDate": "2016-09-25", "jobId": "1007", "status": "在职", "remark": "" },
    { "key": 8, "name": "吴十", "age": 33, "address": "西安", "department": "研发部", "position": "架构师", "phone": "13800000008", "email": "wushi@example.com", "entryDate": "2015-04-12", "jobId": "1008", "status": "在职", "remark": "技术骨干" },
    { "key": 9, "name": "郑十一", "age": 27, "address": "苏州", "department": "人事部", "position": "助理", "phone": "13800000009", "email": "zhengshiyi@example.com", "entryDate": "2023-06-20", "jobId": "1009", "status": "试用", "remark": "" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" },
    { "key": 10, "name": "王十二", "age": 50, "address": "南京", "department": "市场部", "position": "总监", "phone": "13800000010", "email": "wangshier@example.com", "entryDate": "2010-12-01", "jobId": "1010", "status": "在职", "remark": "公司元老" }
  ]
}`;
const exampleTemplate = `<div style="text-align:center;font-size:32px;margin-bottom:20px;" class='font-bold'>员工信息表</div>
    <table border="1" style="width:100%;border-collapse:collapse;">
      <thead>
        <tr>
          <th class='font-600-bold'>序号</th>
          {{each columns}}
            <th class='font-600-bold'>{{$value.title}}</th>
          {{/each}}
        </tr>
      </thead>
      <tbody>
        {{each dataSource as item, index}}
          <tr>
            <td>{{index + 1}}</td>
            {{each columns as col}}
              <td>{{item[col.dataIndex]}}</td>
            {{/each}}
          </tr>
        {{/each}}
      </tbody>
    </table>
`;

export default function HtmlTab(props) {
  const { htmlParams, setHtmlParams, htmlTemplate, setHtmlTemplate } = props;
  const [htmlPreview, setHtmlPreview] = useState("");
  // 新增：art-template 渲染逻辑
  const handlePreview = () => {
    try {
      const params = JSON.parse(htmlParams);
      const html = template.render(htmlTemplate, params);
      console.log(1111, params, html);
      setHtmlPreview(html);
    } catch (e) {
      setHtmlPreview(
        `<div style='color:red'>参数或模板错误: ${e.message}</div>`
      );
    }
  };
  return (
    <ProCard split="vertical" ghost bordered style={{ minHeight: 600 }}>
      <ProCard
        headerBordered
        title={
          <span>
            <FileTextOutlined style={{ color: "#faad14", marginRight: 8 }} />
            Html模板参数与预览
          </span>
        }
        extra={
          <Space>
            <Button
              onClick={() => {
                setHtmlParams(exampleParams);
                setHtmlTemplate(exampleTemplate);
              }}
            >
              示例复杂表格
            </Button>
            <Button icon={<EyeOutlined />} onClick={handlePreview}>
              设置参数预览
            </Button>
            <Button
              type="primary"
              icon={<PrinterOutlined />}
              onClick={() => {
                const params = JSON.parse(htmlParams);
                htmlPreview &&
                  printMgr.print("html", {
                    html: htmlPreview,
                    ...(params.printConfig || {}),
                  });
                console.log("print html", htmlPreview);
              }}
              disabled={!htmlPreview}
            >
              打印
            </Button>

            <Button
              type="primary"
              icon={<PrinterOutlined />}
              onClick={() => {
                const params = JSON.parse(htmlParams);

                htmlPreview &&
                  printMgr.snapshotFunc(htmlPreview, params.printConfig || {});
                console.log("print html", htmlPreview);
              }}
              disabled={!htmlPreview}
            >
              截图并打印
            </Button>
          </Space>
        }
        bodyStyle={{ padding: 24 }}
      >
        <Typography.Text strong>参数设置 (JSON)</Typography.Text>
        <Editor
          height={500}
          width="100%"
          language="json"
          theme="vs-dark"
          value={htmlParams}
          options={{
            fontSize: 15,
            minimap: { enabled: true },
            fontFamily: "monospace",
            scrollBeyondLastLine: false,
          }}
          onChange={(v) => setHtmlParams(v)}
        />
        <Typography.Text
          strong
          style={{ margin: "16px 0 8px", display: "block" }}
        >
          模板 (支持&#123;&#123;变量&#125;&#125;、
          <a
            href="https://goofychris.github.io/art-template/docs/syntax.html#Condition"
            target="_blank"
          >
            art-template
          </a>
          语法)
        </Typography.Text>
        <Editor
          height={500}
          width="100%"
          language="html"
          theme="vs-dark"
          value={htmlTemplate}
          options={{
            fontSize: 15,
            minimap: { enabled: true },
            fontFamily: "monospace",
            scrollBeyondLastLine: false,
            padding: 12,
          }}

          onChange={(v) => setHtmlTemplate(v)}
        />
      </ProCard>
      <ProCard
        headerBordered
        title={<Typography.Text strong>预览</Typography.Text>}
        bodyStyle={{
          padding: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
        style={{
          background: "#fff",
          borderRadius: 8,
          minHeight: 300,
          width: "210mm",
        }}
      >
        <div
          style={{
            background: "#fff",
            width: "210mm",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            borderRadius: 8,
            padding: 24,
            fontFamily:
              "'宋体', '宋体-简', Avenir, Helvetica, Arial, sans-serif",
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: htmlPreview }} />
        </div>
      </ProCard>
    </ProCard>
  );
}
