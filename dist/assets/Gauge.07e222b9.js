var y=(f,h,c)=>new Promise((p,a)=>{var r=e=>{try{o(c.next(e))}catch(l){a(l)}},d=e=>{try{o(c.throw(e))}catch(l){a(l)}},o=e=>e.done?p(e.value):Promise.resolve(e.value).then(r,d);o((c=c.apply(f,h)).next())});import{h as $}from"./index.12e054a8.js";import{u as C}from"./useProp.afe31ed3.js";import{u as T}from"./useEventBus.e5b4bcc7.js";import{d as B,q as M,r as u,a as V,w as z,o as _,c as m,l as D,b as s,F as S,e as E,t as w,f as F,_ as G}from"./index.031c8538.js";const I={class:"dv-decoration-9"},R=["stroke"],q=["dur"],A=["stroke"],H=["dur"],L=["stroke"],O=["xlink:href","stroke","fill"],P=["dur","begin"],W=["stroke"],j=B({__name:"Gauge",props:{component:null},setup(f){const h=f,c=M(),p=(t,n,i)=>{t==="attr"&&n==="color1"&&(r.value[0]=i),t==="attr"&&n==="color2"&&(r.value[1]=i),t==="attr"&&n==="unit"&&(g.value=i)},{propValue:a}=C(h.component,p),r=u([a.attr.color1,a.attr.color2]),d="decoration-9-polygon",o=u(3),e=u(0),l=u([1,1]),g=u(a.attr.unit||""),x=t=>{const i=t[0].contentRect,v=Math.min(i.width/100,i.height/100);l.value=[v,v]},b=t=>{const n=t;a.data.datatag&&n.TagName===a.data.datatag&&(e.value=Number(n.TagValue))};V(()=>y(this,null,function*(){yield N()}));const N=()=>y(this,null,function*(){if(a.data.history)try{const t=yield $.post({url:a.data.history,data:[a.data.datatag]});t.status===200&&(e.value=Number(t.data.TagValue))}catch(t){console.log(t.message||t)}c.isEditMode&&(e.value=Number((Math.random()*100).toFixed(2)))});return T("actual",b),(t,n)=>{const i=F("resize");return z((_(),m("div",I,[(_(),m("svg",{width:"100",height:"100",style:D(`transform: scale(${l.value[0]}, ${l.value[1]})`)},[s("defs",null,[s("polygon",{id:d,points:"15, 46.5, 21, 47.5, 21, 52.5, 15, 53.5"})]),s("circle",{cx:"50",cy:"50",r:"45",fill:"transparent",stroke:r.value[1],"stroke-width":"10","stroke-dasharray":"80, 100, 30, 100"},[s("animateTransform",{attributeName:"transform",type:"rotate",values:"0 50 50;360 50 50",dur:`${o.value}s`,repeatCount:"indefinite"},null,8,q)],8,R),s("circle",{cx:"50",cy:"50",r:"45",fill:"transparent",stroke:r.value[0],"stroke-width":"6","stroke-dasharray":"50, 66, 100, 66"},[s("animateTransform",{attributeName:"transform",type:"rotate",values:"0 50 50;-360 50 50",dur:`${o.value}s`,repeatCount:"indefinite"},null,8,H)],8,A),s("circle",{cx:"50",cy:"50",r:"38",fill:"transparent",stroke:r.value[1],"stroke-width":"1","stroke-dasharray":"5, 1"},null,8,L),(_(!0),m(S,null,E(new Array(20).fill(0),(v,k)=>(_(),m("use",{key:k,"xlink:href":`#${d}`,stroke:r.value[1],fill:Math.random()>.4?"transparent":r.value[0]},[s("animateTransform",{attributeName:"transform",type:"rotate",values:"0 50 50;360 50 50",dur:`${o.value}s`,begin:`${k*o.value/20}s`,repeatCount:"indefinite"},null,8,P)],8,O))),128)),s("circle",{cx:"50",cy:"50",r:"26",fill:"transparent",stroke:r.value[1],"stroke-width":"1","stroke-dasharray":"5, 1"},null,8,W)],4)),s("div",null,w(e.value)+w(g.value),1)])),[[i,x]])}}});const Y=G(j,[["__scopeId","data-v-d38a17ea"]]);export{Y as default};
