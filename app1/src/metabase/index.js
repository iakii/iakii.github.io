import { FlagTwoTone, PlusOutlined } from "@ant-design/icons";
import { DrawerForm, ProCard } from "@ant-design/pro-components";
import {
  CollectionBrowser,
  InteractiveQuestion,
  useCreateDashboardApi,
  useMetabaseAuthStatus,
} from "@metabase/embedding-sdk-react";
import { createFileRoute, useLocation } from "@tanstack/react-router";
import { Button, Empty, Result } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import MetaProvider from "./provider";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id = 47 } = useLocation().search;

  return (
    <MetaProvider>
      <Embed id={id} />
    </MetaProvider>
  );
}

const Embed = ({ collectionId = 10 }) => {
  const auth = useMetabaseAuthStatus();
  const [questionRef, setQuestion] = useState({ visible: false });

  const history = Route.useNavigate();

  const { createDashboard } = useCreateDashboardApi();
  if (auth.status === "error") {
    return (
      <Result>
        <div>Failed to authenticate: {auth.error.message}</div>
      </Result>
    );
  }

  const onClose = () => {
    setQuestion({ visible: false, id: null });
  };

  const createDashboardHandler = async () => {
    const c = await createDashboard({
      collectionId: collectionId,
      name: "" + dayjs().format("YYYY-MM-DD HH:mm:ss"),
      description: "Created via the Embedding SDK",
    });
    console.log("Created dashboard:", c);
    history({ to: `/${c.id}/edit`, search: { title: c.name } });
  };

  useEffect(() => {
    const metaBase = document.querySelector("#metabase-sdk-portal-root");
    if (metaBase) metaBase.style.display = "none";
  }, []);

  return (
    <ProCard
      extra={
        <Button icon={<PlusOutlined />} onClick={createDashboardHandler}>
          创建仪表盘
        </Button>
      }
      headerBordered
    >
      <QuestionModal
        visible={questionRef.visible}
        id={questionRef.id}
        title={questionRef.title}
        onClose={onClose}
      />{" "}
      <CollectionBrowser
        collectionId={collectionId}
        pageSize={10000}
        visibleEntityTypes={["dashboard", "question"]}
        EmptyContentComponent={() => (
          <Empty style={{ margin: "200px 0" }}>Oops!!! 未查询到数据</Empty>
        )}
        visibleColumns={["name", "type", "lastEditedAt", "lastEditedBy"]}
        onClick={(e) => {
          console.log(90, e);
          if (e.model === "dashboard") {
            history({ to: `/${e.id}`, search: { title: e.name } });
          } else {
            setQuestion({ visible: true, id: e.id, title: e.name });
          }
        }}
      />
    </ProCard>
  );
};

const QuestionModal = ({
  id = 11,
  visible = false,
  onClose,
  title = "仪表盘",
}) => {
  return (
    <DrawerForm
      open={visible}
      drawerProps={{
        onClose: onClose,
        width: "100vw",
        height: "100vh",
        placement: "bottom",
        destroyOnHidden: true,
        top: 0,
      }}
      title={title}
    >
      <InteractiveQuestion
        questionId={id}
        withDownloads
        withResetButton
        withChartTypeSelector
      />
    </DrawerForm>
  );
};
