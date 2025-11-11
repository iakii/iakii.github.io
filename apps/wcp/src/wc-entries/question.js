import { InteractiveQuestion } from "@metabase/embedding-sdk-react";
import { MetaProvider } from "../components/MetabaseProviderPropsComponent";
import ReactDOM from "react-dom/client";
export default function Question({ apiKey, metabaseInstanceUrl, id }) {
  return (
    <MetaProvider apiKey={apiKey} metabaseInstanceUrl={metabaseInstanceUrl}>
      <InteractiveQuestion
        questionId={id}
        withDownloads
        withResetButton
        withChartTypeSelector
      />
    </MetaProvider>
  );
}
