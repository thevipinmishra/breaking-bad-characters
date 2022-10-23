import{u as h,a as d}from"./axiosClient.8a283db0.js";import{k as f,l as C,u as b,a as r,j as e,S as x}from"./index.adc785e4.js";function j(){var N,k;const{id:t}=f(),i=C(),m=b(),l=(N=m.getQueryData(["characters"]))==null?void 0:N.find(s=>s.char_id===Number(t)-1),o=(k=m.getQueryData(["characters"]))==null?void 0:k.find(s=>s.char_id===Number(t)+1);console.log(l,o);const{isLoading:w,data:a,error:u}=h([t],()=>d(`/characters/${t}`).then(s=>s.data[0])),p=a==null?void 0:a.status,{data:n}=h([t,p==="deceased"],()=>d(`/death?name=${a.name.replace(/\s+/g,"+")}`).then(s=>s.data[0]),{enabled:!!p}),g=a==null?void 0:a.name,{data:v}=h([t,g],()=>d(`/quote?author=${a.name.replace(/\s+/g,"+")}`).then(s=>s.data[0]),{enabled:!!g});return u&&u.message,e("div",{className:"container",children:w?e(x,{}):r("div",{className:"character-item-page",children:[r("div",{className:"top-row",children:[r("div",{className:"left-controls",children:[r("button",{className:"back-button","aria-label":"Go back",onClick:()=>i(-1),children:[e("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",className:"feather feather-chevron-left",children:e("path",{d:"M15 18l-6-6 6-6"})}),"Go Back"]}),e("button",{"aria-label":"Go to Homepage",onClick:()=>i("/"),children:r("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",className:"feather feather-home",children:[e("path",{d:"M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"}),e("path",{d:"M9 22V12h6v10"})]})})]}),r("div",{className:"next-prev",children:[l&&r("button",{onClick:()=>i(`/characters/${l.char_id}`),children:[e("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",className:"feather feather-chevrons-left",children:e("path",{d:"M11 17l-5-5 5-5m7 10l-5-5 5-5"})})," ",l.name]}),o&&r("button",{onClick:()=>i(`/characters/${o.char_id}`),children:[o.name," ",e("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",className:"feather feather-chevrons-right",children:e("path",{d:"M13 17l5-5-5-5M6 17l5-5-5-5"})})]})]})]}),e("div",{className:"image",children:e("img",{src:a.img,alt:a.img})}),r("div",{className:"content",children:[r("div",{className:"name-row",children:[e("h2",{children:a.name})," ",e("span",{className:`status ${a.status.replace(/\s+/g,"-").toLowerCase()}`,children:a.status})]}),e("p",{className:"cast-name",children:a.portrayed}),r("div",{className:"occupation",children:[e("p",{children:"Occupation"}),e("ul",{children:a.occupation.map((s,c)=>e("li",{children:s},c))})]}),a.appearance.length>0&&r("div",{className:"episodes",children:[e("p",{children:"Breaking Bad Appearance (Seasons)"}),e("ul",{children:a.appearance.map((s,c)=>e("li",{children:s},c))})]}),a.better_call_saul_appearance.length>0&&r("div",{className:"episodes",children:[e("p",{children:"Better Call Saul Appearance (Seasons)"}),e("ul",{children:a.better_call_saul_appearance.map((s,c)=>e("li",{children:s},c))})]}),(n==null?void 0:n.cause)&&r("div",{className:"death-status",children:[r("div",{className:"row",children:[e("h3",{className:"heading",children:"Cause of Death"}),e("p",{children:n.cause})]}),r("div",{className:"row",children:[e("h3",{className:"heading",children:"Death Episode"}),r("p",{children:["Season ",n.season,", Episode ",n.episode]})]})]}),v&&r("div",{className:"quote",children:[e("h3",{className:"heading",children:"Quote(s)"}),e("p",{className:"quote-item",children:v.quote})]})]})]})})}export{j as default};
