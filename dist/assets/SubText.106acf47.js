var i=(r,u,a)=>new Promise((n,o)=>{var l=e=>{try{t(a.next(e))}catch(s){o(s)}},c=e=>{try{t(a.throw(e))}catch(s){o(s)}},t=e=>e.done?n(e.value):Promise.resolve(e.value).then(l,c);t((a=a.apply(r,u)).next())});import{d as _,r as p,a as d,w as g,o as b,c as f,z as v,t as m,u as x,x as h,f as y,_ as N}from"./index.031c8538.js";import{u as T}from"./useEventBus.e5b4bcc7.js";import{h as z}from"./index.12e054a8.js";import{u as D}from"./useProp.afe31ed3.js";const S=_({__name:"SubText",props:{component:null},setup(r){const u=r;h(t=>({"66d8c752":o.value}));const{propValue:a}=D(u.component),n=p("0"),o=p("20px"),l=t=>{const e=t[0],{height:s}=e.contentRect;o.value=`${s}px`},c=t=>{const e=t;if(a.base.tagName&&e.TagName===a.base.tagName){const s=e.TagValue;n.value=s}};return d(()=>i(this,null,function*(){try{const t={tagName:a.base.tagName},e=yield z.get({url:a.base.url,params:t});e.status===200&&Object.keys(e.data).includes(a.base.tagName)&&c(e[a.base.tagName])}catch(t){console.log(t==null?void 0:t.message)}})),T("globalData",c),(t,e)=>{const s=y("resize");return g((b(),f("span",null,[v(m(n.value)+m(x(a).base.unit),1)])),[[s,l]])}}});const C=N(S,[["__scopeId","data-v-76ddb4c3"]]);export{C as default};
