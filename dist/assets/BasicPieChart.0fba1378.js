var f=(u,p,r)=>new Promise((o,l)=>{var d=t=>{try{i(r.next(t))}catch(e){l(e)}},s=t=>{try{i(r.throw(t))}catch(e){l(e)}},i=t=>t.done?o(t.value):Promise.resolve(t.value).then(d,s);i((r=r.apply(u,p)).next())});import{u as w}from"./index.f9a5bc2d.js";import{u as v}from"./index.972df987.js";import{c as _}from"./utils.fc532f69.js";import{u as C}from"./hooks.9acb56d3.js";import{d as L,r as D,a as S,w as y,u as z,o as E,c as B,f as O}from"./index.946b645a.js";const P=L({__name:"BasicPieChart",props:{component:null},setup(u){const p=u,r=D(null);let o;const{updateEchart:l,resizeHandler:d}=C(r);let s=[];const i=(a,n)=>{a.status>=0&&(s=a.afterData,m(s)),m(s)};v(p.component,i);const t=()=>{m(s)},{propValue:e}=w(p.component,t);S(()=>f(this,null,function*(){o=b(),l(o)}));const b=()=>{const a={grid:{top:"10%",left:"3%",right:"4%",bottom:"0%",containLabel:!0},tooltip:{trigger:"item"},legend:{show:e.legend.isShow,top:"5%",left:"center"},series:[]};let n=[{type:"pie",radius:[`${e.series.radiusMin||0}%`,`${e.series.radiusMax||100}%`],avoidLabelOverlap:!0,itemStyle:{borderRadius:e.series.borderRadius,borderColor:"transparent",borderWidth:100},label:{show:!1,position:"center",color:e.label.labelColor},emphasis:{label:{show:e.label.isShow,fontSize:e.label.labelSize,fontWeight:e.label.labelWeight},itemStyle:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}},labelLine:{show:!1},data:[]}];return a.series=n,a},m=a=>{const n=e.data.upperLimit,h=e.data.lowerLimit,g=a.map(c=>({value:_(Number(c.value),n,h),label:c.label}));o=b(),o.series[0].data=g.map(c=>({value:c.value,name:c.label})),l(o)};return(a,n)=>{const h=O("resize");return y((E(),B("div",{ref_key:"chartEl",ref:r},null,512)),[[h,z(d)]])}}});export{P as default};
