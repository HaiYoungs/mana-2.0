(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[13],{a3w7:function(e,a,r){"use strict";r.r(a);r("14J3");var t=r("BMrR"),s=(r("+L6B"),r("2/Rp")),n=(r("jCWc"),r("kPKH")),i=(r("Q9mQ"),r("diRs")),c=(r("MXD1"),r("CFYs")),l=r("k1fw"),d=(r("miYZ"),r("tsqr")),o=r("tJVT"),u=(r("5NDa"),r("5rEg")),m=(r("OaEy"),r("2fM7")),g=(r("y8nQ"),r("Vl3Y")),p=r("q1tI"),b=r.n(p),h=r("9kvl"),E=r("55Ip"),f=r("sYde"),w=r.n(f),v=g["a"].Item,j=m["a"].Option,O=u["a"].Group,_={ok:b.a.createElement("div",{className:w.a.success},b.a.createElement(h["a"],{id:"userandregister.strength.strong"})),pass:b.a.createElement("div",{className:w.a.warning},b.a.createElement(h["a"],{id:"userandregister.strength.medium"})),poor:b.a.createElement("div",{className:w.a.error},b.a.createElement(h["a"],{id:"userandregister.strength.short"}))},y={ok:"success",pass:"normal",poor:"exception"},N=function(e){var a,r=e.submitting,f=e.dispatch,N=e.userAndregister,k=Object(p["useState"])(0),q=Object(o["a"])(k,2),F=q[0],z=q[1],C=Object(p["useState"])(!1),V=Object(o["a"])(C,2),I=V[0],J=V[1],x=Object(p["useState"])("86"),A=Object(o["a"])(x,2),M=A[0],S=A[1],Y=Object(p["useState"])(!1),B=Object(o["a"])(Y,2),P=B[0],Q=B[1],R=!1,D=g["a"].useForm(),T=Object(o["a"])(D,1),W=T[0];Object(p["useEffect"])((function(){if(N){var e=W.getFieldValue("mail");"ok"===N.status&&(d["a"].success("\u6ce8\u518c\u6210\u529f\uff01"),h["e"].push({pathname:"/user/register-result",state:{account:e}}))}}),[N]),Object(p["useEffect"])((function(){return function(){clearInterval(a)}}),[]);var X=function(){var e=59;z(e),a=window.setInterval((function(){e-=1,z(e),0===e&&clearInterval(a)}),1e3)},G=function(){var e=W.getFieldValue("password");return e&&e.length>9?"ok":e&&e.length>5?"pass":"poor"},H=function(e){f({type:"userAndregister/submit",payload:Object(l["a"])(Object(l["a"])({},e),{},{prefix:M})})},K=function(e,a){var r=Promise;return a&&a!==W.getFieldValue("password")?r.reject(Object(h["d"])({id:"userandregister.password.twice"})):r.resolve()},L=function(e,a){var r=Promise;return a?(I||J(!!a),Q(!P),a.length<6?r.reject(""):(a&&R&&W.validateFields(["confirm"]),r.resolve())):(J(!!a),r.reject(Object(h["d"])({id:"userandregister.password.required"})))},U=function(e){S(e)},Z=function(){var e=W.getFieldValue("password"),a=G();return e&&e.length?b.a.createElement("div",{className:w.a["progress-".concat(a)]},b.a.createElement(c["a"],{status:y[a],className:w.a.progress,strokeWidth:6,percent:10*e.length>100?100:10*e.length,showInfo:!1})):null};return b.a.createElement("div",{className:w.a.main},b.a.createElement("h3",null,b.a.createElement(h["a"],{id:"userandregister.register.register"})),b.a.createElement(g["a"],{form:W,name:"UserRegister",onFinish:H},b.a.createElement(v,{name:"mail",rules:[{required:!0,message:Object(h["d"])({id:"userandregister.email.required"})},{type:"email",message:Object(h["d"])({id:"userandregister.email.wrong-format"})}]},b.a.createElement(u["a"],{size:"large",placeholder:Object(h["d"])({id:"userandregister.email.placeholder"})})),b.a.createElement(i["a"],{getPopupContainer:function(e){return e&&e.parentNode?e.parentNode:e},content:I&&b.a.createElement("div",{style:{padding:"4px 0"}},_[G()],Z(),b.a.createElement("div",{style:{marginTop:10}},b.a.createElement(h["a"],{id:"userandregister.strength.msg"}))),overlayStyle:{width:240},placement:"right",visible:I},b.a.createElement(v,{name:"password",className:W.getFieldValue("password")&&W.getFieldValue("password").length>0&&w.a.password,rules:[{validator:L}]},b.a.createElement(u["a"],{size:"large",type:"password",placeholder:Object(h["d"])({id:"userandregister.password.placeholder"})}))),b.a.createElement(v,{name:"confirm",rules:[{required:!0,message:Object(h["d"])({id:"userandregister.confirm-password.required"})},{validator:K}]},b.a.createElement(u["a"],{size:"large",type:"password",placeholder:Object(h["d"])({id:"userandregister.confirm-password.placeholder"})})),b.a.createElement(O,{compact:!0},b.a.createElement(m["a"],{size:"large",value:M,onChange:U,style:{width:"20%"}},b.a.createElement(j,{value:"86"},"+86"),b.a.createElement(j,{value:"87"},"+87")),b.a.createElement(v,{style:{width:"80%"},name:"mobile",rules:[{required:!0,message:Object(h["d"])({id:"userandregister.phone-number.required"})},{pattern:/^\d{11}$/,message:Object(h["d"])({id:"userandregister.phone-number.wrong-format"})}]},b.a.createElement(u["a"],{size:"large",placeholder:Object(h["d"])({id:"userandregister.phone-number.placeholder"})}))),b.a.createElement(t["a"],{gutter:8},b.a.createElement(n["a"],{span:16},b.a.createElement(v,{name:"captcha",rules:[{required:!0,message:Object(h["d"])({id:"userandregister.verification-code.required"})}]},b.a.createElement(u["a"],{size:"large",placeholder:Object(h["d"])({id:"userandregister.verification-code.placeholder"})}))),b.a.createElement(n["a"],{span:8},b.a.createElement(s["a"],{size:"large",disabled:!!F,className:w.a.getCaptcha,onClick:X},F?"".concat(F," s"):Object(h["d"])({id:"userandregister.register.get-verification-code"})))),b.a.createElement(v,null,b.a.createElement(s["a"],{size:"large",loading:r,className:w.a.submit,type:"primary",htmlType:"submit"},b.a.createElement(h["a"],{id:"userandregister.register.register"})),b.a.createElement(E["a"],{className:w.a.login,to:"/user/login"},b.a.createElement(h["a"],{id:"userandregister.register.sign-in"})))))};a["default"]=Object(h["c"])((function(e){var a=e.userAndregister,r=e.loading;return{userAndregister:a,submitting:r.effects["userAndregister/submit"]}}))(N)},sYde:function(e,a,r){e.exports={main:"main___2kx2N",password:"password___2JDrd",getCaptcha:"getCaptcha___1oboe",submit:"submit___34wM2",login:"login___1qBuj",success:"success___3hl98",warning:"warning___2i2r2",error:"error___3JfQo","progress-pass":"progress-pass___BM1Xu",progress:"progress___2s68u"}}}]);