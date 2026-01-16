"use strict";(self.webpackChunkprint_js=self.webpackChunkprint_js||[]).push([["835"],{65862(e,t,r){r.r(t),r.d(t,{SimpleGreeting:()=>c,component:()=>d});var n=r(18467),o=r(39974),s=r(28812),l=r(10442),i=r(38390);function d(){let e=(0,i.useRef)(null);return(0,i.useEffect)(()=>{(function(e){if(Array.from(document.getElementsByTagName("script")).some(t=>t.src&&t.src.indexOf(e)>-1)){fn&&fn();return}let t=e=>{if(!e)return"";try{return new URL(e,location.href).href}catch(t){return String(e)}},r=t(e),n=Array.from(document.getElementsByTagName("script")).find(n=>{let o=n.getAttribute("src");return!!o&&(o===e||t(o||n.src)===r)});return new Promise((t,r)=>{if(n){if("true"===n.getAttribute("data-loaded")||"complete"===n.readyState||"loaded"===n.readyState)return void t();let e=()=>{n.setAttribute("data-loaded","true"),n.removeEventListener("load",e),n.removeEventListener("error",o),t()},o=t=>{n.removeEventListener("load",e),n.removeEventListener("error",o),r(t)};return n.addEventListener("load",e),void n.addEventListener("error",o)}let o=document.createElement("script");o.src=e,o.type="module",o.setAttribute("data-loaded","false"),o.addEventListener("load",()=>{o.setAttribute("data-loaded","true"),console.log("finish loading lib from "),t()}),o.addEventListener("error",e=>{console.error("Error loading lib from ",e),r(e)}),document.head.appendChild(o)})})("/js-library/lit-all.min.js").then(()=>{console.log("lit-element loaded",window.LitElement)});let t=(0,l.qy)`<div>
      <h1>Lite Page</h1>
      <Test></Test>
    </div>`;(0,l.XX)(t,e.current)},[]),(0,o.jsxs)(s.A,{children:[(0,o.jsx)("div",{ref:e}),(0,o.jsx)("simple-greeting",{name:"张三",children:(0,o.jsx)(a,{})})]})}let a=()=>(0,o.jsx)("div",{children:" Test"});class c extends l.WF{render(){return(0,l.qy)`<style>
        p {
          font-size: 20px;
          font-weight: bold;
          color: green;
        }
      </style>
      <p>Hello, ${this.name}!</p>
      <slot></slot>`}constructor(...e){super(...e),(0,n._)(this,"name","World")}}(0,n._)(c,"styles",(0,l.AH)`
    :host {
      color: blue;
    }
  `);let u="simple-greeting";window.customElements.get(u)||window.customElements.define(u,c)}}]);