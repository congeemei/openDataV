import{u as h}from"./useProp.afe31ed3.js";import{d as p,r as l,w as L,o as c,c as d,b as s,u as r,k as f,f as k,_ as b}from"./index.41c68991.js";const $={class:"dv-border-box-13"},g=["width","height"],m=["fill","stroke","d"],B=["stroke"],x=["stroke"],w=["stroke","d"],y={class:"border-box-content"},M=p({__name:"BorderBox",props:{component:null},setup(i){const u=i,{propValue:o}=h(u.component),e=l(150),t=l(150),_=n=>{const a=n[0].contentRect;e.value=a.width,t.value=a.height};return(n,v)=>{const a=k("resize");return L((c(),d("div",$,[(c(),d("svg",{class:"dv-border-svg-container",width:e.value,height:t.value},[s("path",{fill:r(o).base.backgroundColor,stroke:r(o).base.colorLeft,d:`
          M 5 20 L 5 10 L 12 3  L 60 3 L 68 10
          L ${e.value-20} 10 L ${e.value-5} 25
          L ${e.value-5} ${t.value-5} L 20 ${t.value-5}
          L 5 ${t.value-20} L 5 20
        `},null,8,m),s("path",{fill:"transparent","stroke-width":"3","stroke-linecap":"round","stroke-dasharray":"10 5",stroke:r(o).base.colorLeft,d:"M 16 9 L 61 9"},null,8,B),s("path",{fill:"transparent",stroke:r(o).base.colorRight,d:"M 5 20 L 5 10 L 12 3  L 60 3 L 68 10"},null,8,x),s("path",{fill:"transparent",stroke:r(o).base.colorRight,d:`M ${e.value-5} ${t.value-30} L ${e.value-5} ${t.value-5} L ${e.value-30} ${t.value-5}`},null,8,w)],8,g)),s("div",y,[f(n.$slots,"default",{},void 0,!0)])])),[[a,_]])}}});const C=b(M,[["__scopeId","data-v-1b71904e"]]);export{C as default};
