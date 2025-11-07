import { AppstoreFilled } from "@ant-design/icons";
import { createFileRoute } from "@tanstack/react-router";
import WujieReact from "wujie-react";

export const Route = createFileRoute("/wujie")({
  component: RouteComponent,
   staticData: {
    name: "无界 - wujie微前端",
    icon: <AppstoreFilled />,
    index: 98,
  },
});

function RouteComponent() {
  return (
    <WujieReact
      width="100%"
      name="app2"
      fiber={true}
      url={"/app2/"}
      sync={true}
      props={{
        token:
          "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJqcGVlbl94dzR0RjIxOFZfUF9ZVC1WNG5WNmw4XzFXN0JiUjRncHZmZFA4In0.eyJleHAiOjE3NjI1MjM2MjAsImlhdCI6MTc2MjQxNTYyMCwianRpIjoiNjliMzZlMzgtNTRkNy00ODVkLTlmZjMtMjg0OWRmNDM3MDAwIiwiaXNzIjoiaHR0cDovL2dhdGV3YXktc2VydmljZS9hdXRoL3JlYWxtcy90ZGNhcmUiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiMGM5NWUyYjUtNDY0Yy00MTJlLTk4NWItNTE5YjUyZDQ5YTdkIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoidGRuaXMiLCJzZXNzaW9uX3N0YXRlIjoiZWVkNzI3NTAtMTMyZC00NmZjLWI2NmUtODRkNWY5NGZmNDExIiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsIm51cnNlIiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsidGRuaXMiOnsicm9sZXMiOlsibnVyc2VNYW5hZ2VyIiwidXNlciJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiIiwiZGVwYXJ0bWVudE5hbWUiOiJJQ1XmiqTlo6vnq5kiLCJhZGRyZXNzIjp7fSwiZGVwYXJ0bWVudENvZGUiOiIwMTg4IiwiZGVwYXJ0bWVudElkIjoiMGRlOGFkNmQtYWU2Ni00NTllLTliN2YtNWFkZjFhOGZkNDlkIiwicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJudXJzZSIsInVtYV9hdXRob3JpemF0aW9uIiwidXNlciJdLCJkb2N0b3JEZXB0QWJzdHJhY3QiOiIiLCJncm91cHMiOlsib2ZmbGluZV9hY2Nlc3MiLCJudXJzZSIsInVtYV9hdXRob3JpemF0aW9uIiwidXNlciJdLCJkZXB0IjpbXSwicHJlZmVycmVkX3VzZXJuYW1lIjoicnVuIiwiZG9jdG9yRGVwdE5hbWUiOiIiLCJnaXZlbl9uYW1lIjoi566h55CG5ZGYIiwidXNlcklkIjoiZDRmY2Y0YzEtMWZjZi00YjM1LTllY2QtN2U2NWU4NWM4ZGU0IiwiZG9jdG9yRGVwdENvZGUiOiIiLCJkb2N0b3JEZXB0SWQiOiIiLCJuYW1lIjoi566h55CG5ZGYIiwiaWQiOiJkNGZjZjRjMS0xZmNmLTRiMzUtOWVjZC03ZTY1ZTg1YzhkZTQiLCJkZXBhcnRtZW50QWJzdHJhY3QiOiJJQ1XmiqTlo6vnq5kifQ.ql987i1Er3PHe5MKoXRcGSAXu_dDBa6ROc494OGPBFUdIOHpmlwoWXBTTsKUM4unCJLGIxTMtScR2XOF4bFWroHdKIriRz9E0pDwAGQO-Wn1V4FbtnFw9a6SW6TsQ7cKh9WiZQEUaJsncunRHbal44yw-vzSGPx7yASGeqwpSVQuAjID5iOmEwNV4tDNf56e_7KIzejukzQV920BiJmzQS13P3qvYR_ZLuLo0lkZ-UdJ7JVwsDUtxvVVDpl93wsV290lr45pmjsW4IioUrd_FC8toKjuo1IT33FeMp-LZGMSnn1M7_DbZC0sqFWEzNr_-FwN79xJtSbL_--nEZpMkA",
      }}
    ></WujieReact>
  );
}
