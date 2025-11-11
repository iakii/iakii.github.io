import {
  EditableDashboard,
  InteractiveDashboard,
} from "@metabase/embedding-sdk-react";
import { MetaProvider } from "../components/MetabaseProviderPropsComponent";
import ReactDOM from "react-dom/client";
export default function Dashboard({
  apiKey,
  metabaseInstanceUrl,
  id,
  type = "normal",
  brand,
}) {
  return (
    <MetaProvider apiKey={apiKey} metabaseInstanceUrl={metabaseInstanceUrl} brand={brand}>
      {type === "normal" ? (
        <InteractiveDashboard dashboardId={id} withDownloads />
      ) : (
        <EditableDashboard dashboardId={id} withDownloads />
      )}
    </MetaProvider>
  );
}
