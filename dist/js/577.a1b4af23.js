"use strict";(self["webpackChunkkokh_assistant_vue_telegram"]=self["webpackChunkkokh_assistant_vue_telegram"]||[]).push([[577],{3577:function(e,t,s){s.r(t),s.d(t,{default:function(){return y}});var n=s(6768),a=s(4232),r=s(5033);const c=(0,n.Lk)("div",{class:"container-tittle"},[(0,n.Lk)("p",null," Оцінка експерта "),(0,n.Lk)("hr",{class:"hr_title"})],-1),l={class:"content-main"},i={class:"expert-assessment"},u={key:0},o=(0,n.Lk)("p",null," Оцінка експерта ще не додана психологом, зачекайте 🤍 ",-1),k=[o],d={key:1},m={class:"date-calendar-block"},v=(0,n.Lk)("img",{src:r,alt:"date"},null,-1),p={class:"content-view"};function g(e,t,s,r,o,g){return(0,n.uX)(),(0,n.CE)("div",null,[c,(0,n.Lk)("div",l,[(0,n.Lk)("div",i,[0===r.assessments.length?((0,n.uX)(),(0,n.CE)("div",u,k)):((0,n.uX)(),(0,n.CE)("div",d,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(r.assessments,(e=>((0,n.uX)(),(0,n.CE)("div",{key:e.id,class:"container-view-client-info"},[(0,n.Lk)("div",m,[(0,n.Lk)("p",null,[v,(0,n.eW)(" "+(0,a.v_)(r.formatDate(e.created_at)),1)])]),(0,n.Lk)("div",p,[(0,n.Lk)("p",null,(0,a.v_)(e.content),1)])])))),128))]))])])])}var L=s(133),_=s(144),f={name:"ExpertAssessment",setup(){const e=localStorage.getItem("telegram_user_id"),t=(0,_.KR)([]),s=async()=>{try{const s=await L.A.getExpertAssessment(e);t.value=s.data.data}catch(s){console.error("Error fetching expert assessments:",s)}},a=e=>{const t={year:"numeric",month:"numeric",day:"numeric"},s=new Date(e);return s.toLocaleDateString("uk-UA",t)};return(0,n.sV)(s),{assessments:t,formatDate:a}}},h=s(1241);const E=(0,h.A)(f,[["render",g]]);var y=E},5033:function(e,t,s){e.exports=s.p+"img/calendar.361ee9bb.svg"}}]);
//# sourceMappingURL=577.a1b4af23.js.map