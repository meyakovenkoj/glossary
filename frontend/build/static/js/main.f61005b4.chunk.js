(this.webpackJsonpglossary=this.webpackJsonpglossary||[]).push([[0],{107:function(e,t,n){},113:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),o=n(29),s=n.n(o),c=(n(88),n(67)),d=n(68),l=n(23),r=n(69),h=n(77),u=n(149),p=n(144),b=n(150),j=n(75),m=n.n(j),v=n(47),f=n.n(v),g="http://"+document.location.hostname;n(107);var x=n(151),C=n(145),y=n(146),O=n(2),w=function(e){Object(r.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).style={margin:0,top:"auto",right:20,bottom:20,left:"auto",position:"fixed"},a.state={start:!1,value:"",text:"",open:!1,done:"",counter:0},a.handleChange=a.handleChange.bind(Object(l.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(l.a)(a)),a.addWord=a.addWord.bind(Object(l.a)(a)),a.handleClose=a.handleClose.bind(Object(l.a)(a)),a.handleStart=a.handleStart.bind(Object(l.a)(a)),a.generateText=a.generateText.bind(Object(l.a)(a)),a}return Object(d.a)(n,[{key:"handleChange",value:function(e){this.setState({value:e.target.value})}},{key:"handleClose",value:function(e,t){"clickaway"!==t&&this.setState({open:!1})}},{key:"generateText",value:function(){var e=document.getElementById("text");this.state.value.split(". ").forEach((function(t){var n=document.createElement("p"),a=document.createTextNode(t);n.appendChild(a),e.appendChild(n)}))}},{key:"handleSubmit",value:function(e){this.generateText(),e.preventDefault()}},{key:"handleStart",value:function(e){f.a.post("".concat(g,"api/start"),{},{headers:{"Content-Type":"application/json"}}).then((function(e){return!0})).catch((function(e){return alert(e),!1})),this.setState({start:!0}),e.preventDefault()}},{key:"handleDownload",value:function(e){f.a.get("".concat(g,"api/stop"),{}).then((function(e){var t=window.URL.createObjectURL(new Blob([e.data])),n=document.createElement("a");n.href=t,n.setAttribute("download","glossary.csv"),document.body.appendChild(n),n.click()})).catch((function(e){return alert(e),!1})),e.preventDefault()}},{key:"addWord",value:function(e){var t;window.getSelection?t=window.getSelection():"undefined"!=typeof document.selection&&(t=document.selection);var n,a=t.toString();if(a.length>0){var i=t.getRangeAt(0);if(i&&!t.isCollapsed&&t.anchorNode.parentNode===t.focusNode.parentNode){var o=document.createElement("span");o.className="highlight",i.surroundContents(o)}(n={word:a,element:i.commonAncestorContainer.textContent},f.a.post("".concat(g,"api/add"),n,{headers:{"Content-Type":"application/json"}}).then((function(e){return!0})).catch((function(e){return alert(e),!1})))&&this.setState({open:!0,done:a,counter:this.state.counter+1})}e.preventDefault()}},{key:"render",value:function(){return Object(O.jsxs)("div",{className:"item",children:[Object(O.jsxs)("div",{className:"item",style:{flexDirection:"row",paddingTop:"10px",justifyContent:"space-around"},children:[Object(O.jsx)(u.a,{variant:"contained",onClick:this.handleStart,children:"\u0417\u0430\u043f\u0443\u0441\u043a"}),Object(O.jsx)(u.a,{variant:"contained",onClick:this.handleDownload,disabled:!this.state.start,children:"\u0421\u043a\u0430\u0447\u0430\u0442\u044c"})]}),Object(O.jsxs)("div",{id:"text-enter",style:{width:"95%"},className:"item",children:[Object(O.jsx)(p.a,{id:"outlined-basic",name:"text",variant:"outlined",multiline:!0,rows:5,className:"item",value:this.state.value,onChange:this.handleChange,placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u0435\u043a\u0441\u0442"}),Object(O.jsx)(u.a,{variant:"contained",type:"submit",onClick:this.handleSubmit,disabled:!this.state.start,children:"\u041d\u0430\u0447\u0430\u0442\u044c \u043f\u0435\u0440\u0435\u0432\u043e\u0434"})]}),Object(O.jsx)(b.a,{component:"div",style:{width:"95%"},className:"item",sx:{border:"1px dashed grey"},children:Object(O.jsx)("div",{id:"text",className:"item",children:Object(O.jsx)("p",{})})}),Object(O.jsx)(x.a,{style:this.style,onClick:this.addWord,disabled:!this.state.start,children:Object(O.jsx)(m.a,{})}),Object(O.jsx)(C.a,{open:this.state.open,autoHideDuration:3e3,onClose:this.handleClose,children:Object(O.jsx)(y.a,{onClose:this.handleClose,variant:"outlined",severity:"success",sx:{width:"100%"},children:this.state.done+" words: "+this.state.counter.toString()})})]})}}]),n}(a.Component),S=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,153)).then((function(t){var n=t.getCLS,a=t.getFID,i=t.getFCP,o=t.getLCP,s=t.getTTFB;n(e),a(e),i(e),o(e),s(e)}))};s.a.render(Object(O.jsx)(i.a.StrictMode,{children:Object(O.jsx)(w,{})}),document.getElementById("root")),S()},88:function(e,t,n){}},[[113,1,2]]]);
//# sourceMappingURL=main.f61005b4.chunk.js.map