import React from "react";
import { MetaProvider } from "../components/MetabaseProviderPropsComponent";
import {
  CollectionBrowser,
  useCreateDashboardApi,
  useMetabaseAuthStatus,
} from "@metabase/embedding-sdk-react";
import ReactDOM from "react-dom/client";

export default function Collection({
  brand,
  id,
  pageSize,
  onClick,
  onCreateCallback,
  apiKey,
  metabaseInstanceUrl,
  keys,
}) {
  return (
    <MetaProvider
      apiKey={apiKey}
      metabaseInstanceUrl={metabaseInstanceUrl}
      brand={brand}
    >
      <CollectionComponent
        pageSize={pageSize}
        onClick={onClick}
        onCreate={onCreateCallback}
        collectionId={id}
        keys={keys}
      />
    </MetaProvider>
  );
}

function CollectionComponent({
  collectionId,
  onClick,
  onCreate,
  pageSize = 25,
  keys = ["dashboard"],
}) {
  const auth = useMetabaseAuthStatus();

  const { createDashboard } = useCreateDashboardApi();

  useEffect(() => {
    if (onCreate) onCreate(createDashboard);
  }, [onCreate, createDashboard]);

  if (auth.status === "error") {
    return <div>Failed to authenticate: {auth.error.message}</div>;
  }

  return (
    <CollectionBrowser
      collectionId={collectionId}
      pageSize={pageSize}
      visibleEntityTypes={keys}
      EmptyContentComponent={() => (
        <div style={{ margin: "200px 0" }}>Oops!!! 未查询到数据</div>
      )}
      visibleColumns={["name", "type", "lastEditedAt", "lastEditedBy"]}
      onClick={onClick}
    />
  );
}

export class CollectionElement extends HTMLElement {
  static get observedAttributes() {
    return ["name"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._root = null;
    this._props = {};
    console.log("constructor", this._props);
  }

  connectedCallback() {
    this._render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this._props[name] = newValue;
    console.log("attributeChangedCallback", name, oldValue, newValue);
    this._render();
  }

  _handleOnClick = (detail) => {
    this.dispatchEvent(new CustomEvent("click", { detail, bubbles: true }));
  };

  _handleOnCreate = (detail) => {
    this.dispatchEvent(new CustomEvent("create", { detail, bubbles: true }));
  };

  _render() {
    if (!this._root) {
      // React 渲染到 Shadow DOM
      this._root = ReactDOM.createRoot(this.shadowRoot);
    }

    this._root.render(
      <Collection
        id={this._props.id}
        pageSize={this._props.pageSize}
        keys={this._props.keys}
        onClick={this._handleOnClick}
        onCreate={this._handleOnCreate}
        apiKey={this._props.key}
        metabaseInstanceUrl={this._props.url}
        brand={this._props.brand}
      ></Collection>
    );
  }
}

const tagName = "collection-app";

if (!window.customElements.get(tagName)) {
  window.customElements.define(tagName, CollectionElement);
}
