import{u as l,a as m,j as a,G as i,P as d,b as s}from"./index-434dd7a5.js";const h=()=>{const{homeData:o}=l();let[n,r]=o;return m("section",{className:"home-content",children:[m("div",{className:"WM-home",children:[a(i,{gender:"women"}),n&&n.map(e=>{if(e.productType==="Product")return a("section",{className:"home-product",children:a(d,{image:`https://${e.imageUrl}`,name:e.name,id:e.id,gender:"women",price:e.price,children:a(s,{prodId:e.id,prodName:e.name,prodGender:"women",prodImage:`https://${e.imageUrl}`,prodPrice:e.price})},e.id)},e.id)})]}),m("div",{className:"M-home",children:[a(i,{gender:"men",classN:"M-product-header"}),r&&r.map(e=>{if(e.productType==="Product")return a("section",{className:"home-product",children:a(d,{image:`https://${e.imageUrl}`,name:e.name,id:e.id,gender:"men",price:e.price,children:a(s,{prodId:e.id,prodName:e.name,prodGender:"men",prodImage:`https://${e.imageUrl}`,prodPrice:e.price})})},e.id)})]})]})};export{h as default};
