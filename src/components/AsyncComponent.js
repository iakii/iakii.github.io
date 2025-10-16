import ProSkeleton from '@ant-design/pro-skeleton';
import { lazy, Suspense } from 'react';

/**
 * 异步组件
 * @param {*} param0 path: 组件路径
 * @returns
 */
export default function AsyncComponent({ path, ...props }) {
  const Component = lazy(() => path);
  return (
    <Suspense fallback={<ProSkeleton type="result" />}>
      <Component {...props} />
    </Suspense>
  );
}
