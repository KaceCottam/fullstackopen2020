(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,n,t){e.exports=t(37)},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(14),o=t.n(c),u=t(4),l=t(3),i=t(2),m=t.n(i),f=Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).BASE_URL||"/persons",b=function(){return m.a.get(f).then((function(e){return e.data}))},d=function(e){return m.a.post(f,e).then((function(e){return e.data}))},s=function(e,n){return m.a.put("".concat(f,"/").concat(e),n).then((function(e){return e.data}))},p=function(e){return m.a.delete("".concat(f,"/").concat(e))},h=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],c=n[1],o=Object(a.useState)({name:"",number:""}),i=Object(l.a)(o,2),m=i[0],f=i[1],h=Object(a.useState)(null),E=Object(l.a)(h,2),v=E[0],O=E[1],S=Object(a.useState)(""),j=Object(l.a)(S,2),C=j[0],k=j[1];Object(a.useEffect)((function(){b().then((function(e){return c(e)}))}),[]);var _=function(){return f({name:"",number:""})},g=function(e){return function(n){setTimeout((function(){O(null)}),5e3),O(r.a.createElement("p",{style:e},n))}},T=g({color:"green"}),w=g({color:"red"}),y=function(e){return function(n){return e(n.target.value)}},D=t.filter((function(e){return e.name.toUpperCase().includes(C.toUpperCase())})).map((function(e,n){return r.a.createElement("p",{key:n},e.name," ",e.number," ",r.a.createElement("button",{onClick:(a=e,function(){p(a.id).then((function(e){T("Removed ".concat(a.name," from the phonebook.")),c(t.filter((function(e){return e.id!==a.id})))}))})},"delete"));var a}));return r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement("label",{htmlFor:"filter"},"filter:"),r.a.createElement("input",{id:"filter",value:C,onChange:y(k)})),r.a.createElement("h2",null,"Phonebook"),v,r.a.createElement("form",{onSubmit:function(e){e.preventDefault();var n,a=t.find((function(e){return e.name===m.name}));a?(n=a,window.confirm("Do you want to replace ".concat(n.name,"'s phone number ")+"with ".concat(m.number,"?"))?s(a.id,m).then((function(e){c(t.map((function(n){return n===a?e:n}))),T("Changed ".concat(e.name,"'s number to ").concat(e.number,"!")),_()})).catch((function(e){var n=e.response;return w(n.data.error)})):(w("".concat(m.name," already exists!")),_())):d(m).then((function(e){c(t.concat(e)),T("Added ".concat(e.name," to the phone book!")),_()})).catch((function(e){var n=e.response;return w(n.data.error)}))}},r.a.createElement("div",null,r.a.createElement("label",{htmlFor:"name"},"name:"),r.a.createElement("input",{id:"name",value:m.name,onChange:y((function(e){return f(Object(u.a)({},m,{name:e}))}))}),r.a.createElement("br",null),r.a.createElement("label",{htmlFor:"number"},"number:"),r.a.createElement("input",{id:"number",value:m.number,onChange:y((function(e){return f(Object(u.a)({},m,{number:e}))}))})),r.a.createElement("div",null,r.a.createElement("button",{disabled:""===m.name||""===m.number,type:"submit"},"add"))),r.a.createElement("h2",null,"Numbers"),D)};o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(h,null)),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.e210880f.chunk.js.map