(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{40:function(e,n,t){"use strict";t.r(n);var c=t(15),r=t.n(c),o=t(3),a=t(1),s=t(0),u=function(e){var n=e.filterValue,t=e.setFilterValue;return Object(s.jsxs)("div",{children:["filter shown with",Object(s.jsx)("input",{value:n,onChange:function(e){t(e.target.value.toLocaleLowerCase())}})]})},i=t(4),d=t.n(i),l="/api/persons",f=function(){return d.a.get(l).then((function(e){return e.data}))},j=function(e){return d.a.post(l,e).then((function(e){return e.data}))},b=function(e){return d.a.delete("".concat(l,"/").concat(e)).then((function(e){return e.data}))},h=function(e,n){return d.a.put("".concat(l,"/").concat(e),n).then((function(e){return e.data}))},p=function(e){var n=e.personsToShow,t=e.persons,c=e.setPersons,r=e.handleMessage;return Object(s.jsx)(s.Fragment,{children:n.map((function(e){return Object(s.jsxs)("p",{children:[e.name," ",e.number,Object(s.jsx)("button",{onClick:function(){return function(e){window.confirm("Delete ".concat(e.name,"?"))&&b(e.id).then((function(){c(t.filter((function(n){return n.id!==e.id}))),r(!1,"Deleted ".concat(e.name,"."))})).catch((function(){r(!1,"Information of ".concat(e.name," has been already been removed from server.")),c(t.filter((function(n){return n.id!==e.id})))}))}(e)},children:"delete"})]},e.name)}))})},O=function(e){var n=e.persons,t=e.setPersons,c=e.handleMessage,r=Object(a.useState)(""),u=Object(o.a)(r,2),i=u[0],d=u[1],l=Object(a.useState)(""),f=Object(o.a)(l,2),b=f[0],p=f[1];return Object(s.jsxs)("form",{onSubmit:function(e){e.preventDefault();var r={name:i,number:b},o=n.filter((function(e){return e.name===i}));if(o.length>0){if(window.confirm("".concat(i," is already added to phonebook, replace the old number with the new one?"))){var a=o[0].id;h(a,r).then((function(e){t(n.map((function(n){return n.id===a?e:n}))),c(!0,"Updated ".concat(i,"."))})).catch((function(){c(!1,"Failed to update ".concat(i,"."))}))}}else j(r).then((function(e){t(n.concat(e)),c(!0,"Added ".concat(i,"."))})).catch((function(){c(!1,"Failed to add ".concat(i,"."))})),d(""),p("")},children:[Object(s.jsxs)("div",{children:["name: ",Object(s.jsx)("input",{value:i,onChange:function(e){d(e.target.value)}})]}),Object(s.jsxs)("div",{children:["number: ",Object(s.jsx)("input",{value:b,onChange:function(e){p(e.target.value)}})]}),Object(s.jsx)("div",{children:Object(s.jsx)("button",{type:"submit",children:"add"})})]})},m=function(e){var n=e.success,t=e.message,c={color:n?"green":"red",background:"lightgrey",fontSize:"20px",borderStyle:"solid",borderRadius:"5px",padding:"10px",marginBottom:"10px"};return t?Object(s.jsx)("div",{style:c,children:t}):null},x=function(){var e=Object(a.useState)(!0),n=Object(o.a)(e,2),t=n[0],c=n[1],r=Object(a.useState)(null),i=Object(o.a)(r,2),d=i[0],l=i[1],j=Object(a.useState)([]),b=Object(o.a)(j,2),h=b[0],x=b[1],v=Object(a.useState)(""),g=Object(o.a)(v,2),w=g[0],S=g[1];Object(a.useEffect)((function(){f().then((function(e){return x(e)}))}),[]);var k=function(e,n){c(e),l(n),setTimeout((function(){return l(null)}),3e3)},y=h.filter((function(e){return e.name.toLocaleLowerCase().includes(w)}));return Object(s.jsxs)("div",{children:[Object(s.jsx)(m,{success:t,message:d}),Object(s.jsx)("h2",{children:"Phonebook"}),Object(s.jsx)(u,{filterValue:w,setFilterValue:S}),Object(s.jsx)(O,{persons:h,setPersons:x,handleMessage:k}),Object(s.jsx)("h2",{children:"Numbers"}),Object(s.jsx)(p,{personsToShow:y,persons:h,setPersons:x,handleMessage:k})]})};r.a.render(Object(s.jsx)(x,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.16778ea1.chunk.js.map