var w=Object.defineProperty,v=Object.defineProperties;var A=Object.getOwnPropertyDescriptors;var L=Object.getOwnPropertySymbols;var E=Object.prototype.hasOwnProperty,_=Object.prototype.propertyIsEnumerable;var b=(i,t,a)=>t in i?w(i,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):i[t]=a,C=(i,t)=>{for(var a in t||(t={}))E.call(t,a)&&b(i,a,t[a]);if(L)for(var a of L(t))_.call(t,a)&&b(i,a,t[a]);return i},S=(i,t)=>v(i,A(t));var m=(i,t,a)=>new Promise((s,p)=>{var x=e=>{try{n(a.next(e))}catch(l){p(l)}},u=e=>{try{n(a.throw(e))}catch(l){p(l)}},n=e=>e.done?s(e.value):Promise.resolve(e.value).then(x,u);n((a=a.apply(i,t)).next())});import{h as D}from"./index.f53bf2ef.js";import{d as k,r as B,q as M,a as F,w as T,u as z,o as O,c as V,f as q}from"./index.41c68991.js";import{u as H}from"./useProp.afe31ed3.js";import{c as N}from"./utils.fc532f69.js";import{u as P}from"./hooks.54748386.js";const K=k({__name:"BasicLineChart",props:{component:null},setup(i){const t=i,a=B(null);let s;const p=M(),x=()=>{l()},{updateEchart:u,resizeHandler:n}=P(a),{propValue:e}=H(t.component,x);F(()=>m(this,null,function*(){s=d(),g(),yield l()}));const l=()=>m(this,null,function*(){try{const o=yield D.get({url:e.data.url});if(o.status===200){const r=e.data.upperLimit,c=e.data.lowerLimit,f=o.data.map(h=>({value:N(Number(h.value),r,c),label:h.label}));y(f)}}catch(o){if(console.log((o==null?void 0:o.message)||o),p.isEditMode){const c=["\u79E6","\u9F50","\u695A","\u8D75","\u71D5","\u97E9","\u9B4F"].map(f=>({label:f,value:Math.round(Math.random()*(e.data.upperLimit||100))}));y(c)}}}),d=()=>{const o={grid:{top:"10%",left:"3%",right:"4%",bottom:"10%",containLabel:!0},tooltip:{trigger:"axis"},xAxis:{type:"category",data:[],splitLine:{show:e.axis.xshow,lineStyle:{type:e.axis.xLineType,color:e.axis.xAxisLineColor}},axisLine:{lineStyle:{color:e.axis.axisColor||"#fff"}},axisTick:{lineStyle:{color:e.axis.axisColor||"#fff"}},axisLabel:{color:e.axis.axisLabelColor||"#fff"}},yAxis:{type:"value",max:e.data.max?e.data.max:"dataMax",splitLine:{show:e.axis.yshow,lineStyle:{type:e.axis.yLineType,color:e.axis.yAxisLineColor}},axisLine:{lineStyle:{color:e.axis.axisColor||"#fff"}},axisTick:{lineStyle:{color:e.axis.axisColor||"#fff"}},axisLabel:{color:e.axis.axisLabelColor||"#fff"}},series:[]};let r=[{data:[],type:"line",symbol:"none",smooth:!0,markLine:{data:[]},areaStyle:{opacity:e.series.lineArea?.7:0},lineStyle:{width:1,color:e.series.lineColor||"#3491FA"},itemStyle:{color:{type:"linear",x:0,y:0,x2:0,y2:1,colorStops:[{offset:0,color:e.series.lineLinearStart||"#3491FA"},{offset:1,color:e.series.lineLinearEnd||"transparent"}],global:!1}}}];return o.series=r,o},y=o=>{s=d(),s.series[0].data=o.map(r=>r.value),s.xAxis=S(C({},s.xAxis),{data:o.map(r=>r.label)}),u(s)},g=()=>{u(s)};return(o,r)=>{const c=q("resize");return T((O(),V("div",{ref_key:"chartEl",ref:a},null,512)),[[c,z(n)]])}}});export{K as default};
