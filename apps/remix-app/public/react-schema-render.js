/**
 * Minified by jsDelivr using Terser v5.37.0.
 * Original file: /npm/react-schema-render@0.0.5/dist/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
var React = require("react");
function _interopDefaultLegacy(e) {
  return e && "object" == typeof e && "default" in e ? e : { default: e };
}
var React__default = _interopDefaultLegacy(React);
function _typeof(e) {
  return (
    (_typeof =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          }),
    _typeof(e)
  );
}
function _defineProperty(e, t, o) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: o,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = o),
    e
  );
}
function ownKeys(e, t) {
  var o = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    (t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      o.push.apply(o, r));
  }
  return o;
}
function _objectSpread2(e) {
  for (var t = 1; t < arguments.length; t++) {
    var o = null != arguments[t] ? arguments[t] : {};
    t % 2
      ? ownKeys(Object(o), !0).forEach(function (t) {
          _defineProperty(e, t, o[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o))
        : ownKeys(Object(o)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(o, t));
          });
  }
  return e;
}
function _objectWithoutPropertiesLoose(e, t) {
  if (null == e) return {};
  var o,
    r,
    n = {},
    c = Object.keys(e);
  for (r = 0; r < c.length; r++)
    ((o = c[r]), t.indexOf(o) >= 0 || (n[o] = e[o]));
  return n;
}
function _objectWithoutProperties(e, t) {
  if (null == e) return {};
  var o,
    r,
    n = _objectWithoutPropertiesLoose(e, t);
  if (Object.getOwnPropertySymbols) {
    var c = Object.getOwnPropertySymbols(e);
    for (r = 0; r < c.length; r++)
      ((o = c[r]),
        t.indexOf(o) >= 0 ||
          (Object.prototype.propertyIsEnumerable.call(e, o) && (n[o] = e[o])));
  }
  return n;
}
function isJsonSchema(e) {
  return e && "object" === _typeof(e) && e.component && !hasNotSchema(e);
}
function hasNotSchema(e) {
  return e && "object" === _typeof(e) && "_notSchema" in e;
}
var _schemaParsers = [];
function setParsers(e) {
  _schemaParsers = _schemaParsers.concat(e);
}
function setParser(e) {
  _schemaParsers.push(e);
}
function getParsers() {
  return _schemaParsers;
}
function clearParsers() {
  _schemaParsers = [];
}
var _componentDecorator,
  _components = {};
function setComponents() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
  _components = Object.assign(_components, e);
}
function setComponent(e, t) {
  _components[e] = t;
}
function getComponents() {
  return _components;
}
function getComponent(e) {
  return ((arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {})
    .components || _components)[e];
}
function clearComponents() {
  _components = {};
}
function setComponentDecorator(e) {
  _componentDecorator = e;
}
function getComponentDecorator() {
  return _componentDecorator;
}
function clearComponentDecorator() {
  _componentDecorator = void 0;
}
function objectSchemaToComponent(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
    o = (t.parsers || getParsers()).reduce(function (e, o) {
      return o(e, t);
    }, e),
    r = t.componentDecorator || getComponentDecorator();
  return r
    ? r({ schema: e, children: baseSchemaParser(o, t), context: t })
    : baseSchemaParser(o, t);
}
function arraySchemaToComponent(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
  return React.createElement(
    React.Fragment,
    null,
    e.map(function (e) {
      return objectSchemaToComponent(e, t);
    })
  );
}
function getPropValueFromArray(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
  return e.map(function (e) {
    return getPropValue(e, t);
  });
}
function getPropValue(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
  if (Array.isArray(e)) return getPropValueFromArray(e, t);
  if (isJsonSchema(e)) return objectSchemaToComponent(e, t);
  if (hasNotSchema(e)) {
    e._notSchema;
    return _objectWithoutProperties(e, ["_notSchema"]);
  }
  return e;
}
function getProps(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
    o = {};
  return (
    Object.keys(e).forEach(function (r) {
      var n = e[r];
      o[r] = getPropValue(n, t);
    }),
    o
  );
}
function baseSchemaParser(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
    o = e.component,
    r = getProps(_objectWithoutProperties(e, ["component"]), t);
  void 0 === r.key && r.name && (r.key = r.name);
  var n = t.components || getComponents();
  return "string" == typeof o && n[o]
    ? React.createElement(n[o], r)
    : React.createElement(o, r);
}
var SchemaRenderContext = React.createContext({}),
  SchemaRender = React.memo(function (e) {
    var t = e.schema,
      o = React.useContext(SchemaRenderContext);
    return Array.isArray(t)
      ? arraySchemaToComponent(t, o)
      : "object" === _typeof(t)
        ? objectSchemaToComponent(t, o)
        : null;
  }),
  SchemaProvider = function (e) {
    var t = e.children,
      o = e.components,
      r = e.parsers,
      n = e.componentDecorator,
      c = _objectWithoutProperties(e, [
        "children",
        "components",
        "parsers",
        "componentDecorator",
      ]);
    return React__default.default.createElement(
      SchemaRenderContext.Provider,
      {
        value: _objectSpread2(
          { components: o, componentDecorator: n, parsers: r },
          c
        ),
      },
      t
    );
  };
window.reactSchemaRender = window.reactSchemaRender || {};
window.reactSchemaRender.SchemaProvider = SchemaProvider;
window.reactSchemaRender.SchemaRender = SchemaRender;
window.reactSchemaRender.SchemaRenderContext = SchemaRenderContext;
window.reactSchemaRender.arraySchemaToComponent = arraySchemaToComponent;
window.reactSchemaRender.baseSchemaParser = baseSchemaParser;
window.reactSchemaRender.clearComponentDecorator = clearComponentDecorator;
window.reactSchemaRender.clearComponents = clearComponents;
window.reactSchemaRender.clearParsers = clearParsers;
window.reactSchemaRender.getComponent = getComponent;
window.reactSchemaRender.getComponentDecorator = getComponentDecorator;
window.reactSchemaRender.getComponents = getComponents;
window.reactSchemaRender.getParsers = getParsers;
window.reactSchemaRender.getPropValue = getPropValue;
window.reactSchemaRender.getPropValueFromArray = getPropValueFromArray;
window.reactSchemaRender.getProps = getProps;
window.reactSchemaRender.hasNotSchema = hasNotSchema;
window.reactSchemaRender.isJsonSchema = isJsonSchema;
window.reactSchemaRender.objectSchemaToComponent = objectSchemaToComponent;
window.reactSchemaRender.setComponent = setComponent;
window.reactSchemaRender.setComponentDecorator = setComponentDecorator;
window.reactSchemaRender.setComponents = setComponents;
window.reactSchemaRender.setParser = setParser;
window.reactSchemaRender.setParsers = setParsers;
//# sourceMappingURL=/sm/9f8f855a77f6009fbdfe8139e5839ebbe9754e27c9e2aaa4bbe8ed4ef09647cf.map
