import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { PageContainer } from "@ant-design/pro-components";
import { Card, Space, Tooltip } from "antd";
import PageErrorBoundary from "./PageErrorBoundary";
import { useNavigate, useRouter } from "@tanstack/react-router";

/**
 * PageLayout
 *
 * 包装页面内容的布局组件，使用 ProComponents 的 `PageContainer` 并在标题区提供常用的导航控制（后退 / 前进 / 刷新）。
 *
 * @example
 * <PageLayout title={<span>我的页面</span>}>
 *   <MyContent />
 * </PageLayout>
 *
 * @param {import('@ant-design/pro-components').PageContainerProps} props - 其余会透传到 PageContainer 的属性
 * @param {import('react').ReactNode} [props.title] - 标题内容，可以是字符串或 JSX
 * @param {import('react').ReactNode} [props.children] - 页面主体内容
 * @returns {import('react').ReactElement} 返回一个带错误边界和页头控制的 PageContainer
 *
 * 事件说明：
 * - 后退：调用 history.back()
 * - 前进：调用 history.go(1)
 * - 刷新：调用 location.reload()
 */
export default function PageLayout({ title = "", children = null, ...props }) {
  const onBack = () => history.back();
  const onNext = () => history.go(1);
  const onRedo = () => location.reload();
  return (
    <PageContainer
      fixedHeader
      header={{
        style: { padding: "0 15px" },
        title: (
          <Space size={16}>
            <Tooltip title="后退">
              <ArrowLeftOutlined onClick={onBack} />
            </Tooltip>
            <Tooltip title="前进">
              <ArrowRightOutlined onClick={onNext} />
            </Tooltip>
            <Tooltip title="刷新">
              <RedoOutlined onClick={onRedo} />
            </Tooltip>
            {title}
          </Space>
        ),
      }}
      content={<PageErrorBoundary>{children}</PageErrorBoundary>}
      {...props}
    ></PageContainer>
  );
}
