import{u as y}from"./useProp.afe31ed3.js";import{d as w,r as n,h as c,i as d,w as B,o as $,c as m,b as e,u as s,f as L,p as C,j as I,_ as z}from"./index.41c68991.js";const k=a=>(C("data-v-87cf69a8"),a=a(),I(),a),D={class:"dv-border-box-8"},M=["width","height"],S=["id","d"],N=["id"],R=k(()=>e("stop",{offset:"0%","stop-color":"#fff","stop-opacity":"1"},null,-1)),V=k(()=>e("stop",{offset:"100%","stop-color":"#fff","stop-opacity":"0"},null,-1)),j=[R,V],E=["id"],G=["fill"],H=["dur","path"],P=["fill","points"],q=["stroke","xlink:href"],A=["stroke","xlink:href","mask"],F=["from","to","dur"],J=w({__name:"BorderBox",props:{component:null},setup(a){const b=a,{propValue:r}=y(b.component),t=n(150),o=n(150),l=n(`border-box-8-path-${c()}`),u=n(`border-box-8-gradient-${c()}`),_=n(`border-box-8-mask-${c()}`),x=v=>{const i=v[0].contentRect;t.value=i.width,o.value=i.height},p=d(()=>r.base.dur?r.base.dur:3),h=d(()=>(t.value+o.value-5)*2),f=d(()=>r.base.reverse?`M 2.5, 2.5 L 2.5, ${o.value-2.5} L ${t.value-2.5}, ${o.value-2.5} L ${t.value-2.5}, 2.5 L 2.5, 2.5`:`M2.5, 2.5 L${t.value-2.5}, 2.5 L${t.value-2.5}, ${o.value-2.5} L2.5, ${o.value-2.5} L2.5, 2.5`);return(v,g)=>{const i=L("resize");return B(($(),m("div",D,[($(),m("svg",{class:"dv-border-svg-container",width:t.value,height:o.value},[e("defs",null,[e("path",{id:l.value,d:s(f),fill:"transparent"},null,8,S),e("radialGradient",{id:u.value,cx:"50%",cy:"50%",r:"50%"},j,8,N),e("mask",{id:_.value},[e("circle",{cx:"0",cy:"0",r:"150",fill:`url(#${u.value})`},[e("animateMotion",{dur:`${s(p)}s`,path:s(f),rotate:"auto",repeatCount:"indefinite"},null,8,H)],8,G)],8,E)]),e("polygon",{fill:s(r).base.backgroundColor,points:`5, 5 ${t.value-5}, 5 ${t.value-5} ${o.value-5} 5, ${o.value-5}`},null,8,P),e("use",{stroke:s(r).base.colorLeft,"stroke-width":"1","xlink:href":`#${l.value}`},null,8,q),e("use",{stroke:s(r).base.colorRight,"stroke-width":"3","xlink:href":`#${l.value}`,mask:`url(#${_.value})`},[e("animate",{attributeName:"stroke-dasharray",from:`0, ${s(h)}`,to:`${s(h)}, 0`,dur:`${s(p)}s`,repeatCount:"indefinite"},null,8,F)],8,A)],8,M))])),[[i,x]])}}});const Q=z(J,[["__scopeId","data-v-87cf69a8"]]);export{Q as default};
