import { FileExcelTwoTone } from "@ant-design/icons";
import { ProCard, ProTable } from "@ant-design/pro-components";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "antd";
import { useRef, useState } from "react";
import * as XLSX from "xlsx";

export const Route = createFileRoute("/excel")({
  component: RouteComponent,
  staticData: {
    name: "导出Excel示例",
    icon: <FileExcelTwoTone />,
    index: 10,
  },
});

function RouteComponent() {
  const [dataSource, setDataSource] = useState([]);
  const actionRef = useRef(null);
  // 导出Excel逻辑
  const handleExportExcel = async () => {
    // const data = actionRef.current?.getDataSource?.() || [];
    if (!dataSource.length) {
      window?.alert?.("无可导出的数据");
      return;
    }
    // 只导出部分字段
    const exportData = dataSource.map(
      ({ avatar, name, age, phone, gender, email, cell, state, nat }) => ({
        头像: avatar, // 这里为图片url
        姓名: name,
        年龄: age,
        手机: phone,
        性别: gender,
        email,
        cell,
        国家: state,
        nat,
      })
    );
    const ws = XLSX.utils.json_to_sheet(exportData);
    // 设置表头样式（绿色背景，白色字体）
    const header = ["头像", "姓名", "年龄", "手机", "性别", "email", "cell", "国家", "nat"];
    header.forEach((key, idx) => {
      const col = XLSX.utils.encode_col(idx) + "1";
      if (!ws[col]) return;
      ws[col].s = {
        fill: { fgColor: { rgb: "52C41A" } }, // 绿色
        font: { color: { rgb: "FFFFFF" }, bold: true },
        alignment: { horizontal: "center", vertical: "center" },
      };
    });
    // 需要写入样式需用 writeFile/writexlsx-style
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "用户信息");
    XLSX.writeFile(wb, "用户信息.xlsx");
  };

  return (
    <ProCard ghost direction="column">
      <ProTable
        toolBarRender={(action) => [
          <Button onClick={handleExportExcel}>导出Excel</Button>,
        ]}
        actionRef={actionRef}
        style={{ margin: "12px 0" }}
        size="small"
        bordered
        postData={(data) => {
          console.log("data", data);
          setDataSource(data);
          return data;
        }}
        request={async ({ current, pageSize }) => {
          const query = `page=${current}&size=${pageSize}`;
          return await fetch(
            `https://randomuser.me/api?results=${30 * 2}&${query}`
          )
            .then((res) => res.json())
            .then((res) => ({
              total: res.info.results,
              success: true,
              data: res.results.map((x) => {
                x.avatar = x.picture?.thumbnail;
                x.age = x.dob?.age;
                x.name = x.name?.last;
                x.state = x.location?.state;
                return x;
              }),
            }));
        }}
        columns={[
          {
            title: "头像",
            dataIndex: "avatar",
            valueType: "avatar",
            align: "center",
            width: 48,
          },
          {
            title: "姓名",
            width: 100,
            dataIndex: "name",
          },
          {
            title: "年龄",
            width: 48,
            dataIndex: "age",
          },
          {
            title: "手机",
            dataIndex: "phone",
            width: 132,
          },
          {
            title: "性别",
            dataIndex: "gender",
            width: 64,
          },

          {
            title: "email",
            dataIndex: "email",
            // width: 200,
          },
          {
            title: "cell",
            dataIndex: "cell",
            // width: 116,
          },
          {
            title: "国家",
            dataIndex: "state",
            // width: 200,
          },
          {
            title: "nat",
            dataIndex: "nat",
            width: 22,
          },
        ]}
        search={{ layout: "vertical" }}
        rowKey="id"
        pagination={false}
      />
    </ProCard>
  );
}
