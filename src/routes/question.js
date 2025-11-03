import { createFileRoute, useLocation } from "@tanstack/react-router";
import MetaProvider from "../provider";
import { InteractiveQuestion } from "@metabase/embedding-sdk-react";

export const Route = createFileRoute("/question")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id = 10 } = useLocation().search;
  return (
    <MetaProvider>
      <InteractiveQuestion
        questionId={id}
        withDownloads
        withResetButton
        withChartTypeSelector
      />
    </MetaProvider>
  );
}
