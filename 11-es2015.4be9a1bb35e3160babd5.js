(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{"9N29":function(n,t,e){"use strict";e.r(t),e.d(t,"UserModule",(function(){return yn}));var o=e("ofXK"),s=e("3Pt+"),i=e("FpXt"),c=e("fXoL");let g=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=c.Gb({type:n,selectors:[["app-user"]],decls:5,vars:0,consts:[[1,"left"],[1,"split-pane-divider-left"],[1,"middle"]],template:function(n,t){1&n&&(c.Sb(0,"div",0),c.Nb(1,"app-user-sidebar"),c.Rb(),c.Nb(2,"app-splitter",1),c.Sb(3,"div",2),c.Nb(4,"router-outlet"),c.Rb())},styles:["[_nghost-%COMP%]{width:100%;height:100%;flex:1;display:flex;flex-flow:row nowrap;overflow:hidden;align-items:flex-start;align-content:flex-start}[_nghost-%COMP%]   .left[_ngcontent-%COMP%]{width:15%;height:100%}[_nghost-%COMP%]   .middle[_ngcontent-%COMP%]{width:60%;flex-grow:1;height:100%}[_nghost-%COMP%]   .right[_ngcontent-%COMP%]{width:25%;height:100%}@media (max-width:1600px){[_nghost-%COMP%]   .left[_ngcontent-%COMP%]{width:20%}[_nghost-%COMP%]   .middle[_ngcontent-%COMP%]{width:55%;flex-grow:1;height:100%}[_nghost-%COMP%]   .right[_ngcontent-%COMP%]{width:25%;height:100%}}@media (max-width:1400px){[_nghost-%COMP%]   .left[_ngcontent-%COMP%]{width:25%}[_nghost-%COMP%]   .right[_ngcontent-%COMP%], [_nghost-%COMP%]   .split-pane-divider-right[_ngcontent-%COMP%]{display:none}}@media (max-width:768px){[_nghost-%COMP%]{overflow:auto;flex-flow:row wrap}[_nghost-%COMP%]   app-splitter[_ngcontent-%COMP%]{display:none}[_nghost-%COMP%]   .left[_ngcontent-%COMP%]{width:100%!important;height:auto}[_nghost-%COMP%]   .middle[_ngcontent-%COMP%]{height:auto}[_nghost-%COMP%]   .right[_ngcontent-%COMP%]{width:100%!important;height:auto}}@media (max-width:522px){[_nghost-%COMP%]{overflow:hidden;height:auto}}"]}),n})();var a=e("tyNb"),r=e("auXs"),l=e("bQbs"),M=e("6O88"),C=e("9S5+");function O(n,t){if(1&n){const n=c.Tb();c.Sb(0,"div",7),c.Sb(1,"div",8),c.Fc(2),c.Nb(3,"br"),c.Fc(4),c.Rb(),c.Sb(5,"div",9),c.Fc(6),c.Nb(7,"br"),c.Sb(8,"span"),c.Fc(9),c.Rb(),c.Rb(),c.Sb(10,"div",10),c.Sb(11,"span",11),c.Fc(12,"valid until:"),c.Rb(),c.Nb(13,"br"),c.Fc(14),c.dc(15,"date"),c.Rb(),c.Sb(16,"div",12),c.Sb(17,"a",13),c.Zb("click",(function(){c.uc(n);const e=t.$implicit;return c.cc(2).remove(e)})),c.Nb(18,"i",14),c.Rb(),c.Rb(),c.Rb()}if(2&n){const n=t.$implicit;c.Ab(2),c.Hc(" ",n.agent,""),c.Ab(2),c.Hc(" ",n.os," "),c.Ab(2),c.Hc(" ",n.client,""),c.Ab(3),c.Gc(n.mode),c.Ab(5),c.Hc(" ",c.fc(15,5,n.expires,"long")," ")}}function h(n,t){if(1&n&&(c.Sb(0,"div",3),c.Sb(1,"div",4),c.Sb(2,"div",5),c.Fc(3,"Sessions"),c.Rb(),c.Dc(4,O,19,8,"div",6),c.Rb(),c.Rb()),2&n){const n=c.cc();c.Ab(4),c.jc("ngForOf",n.sessions)}}let P=(()=>{class n{constructor(n,t,e){this.jam=n,this.auth=t,this.notify=e}ngOnInit(){this.auth.isLoggedIn()&&this.refresh()}remove(n){const t=n.id;this.jam.session.remove({id:t}).then(()=>{this.sessions&&(this.sessions=this.sessions.filter(n=>n.id!==t)),this.notify.success("Session Login removed")}).catch(n=>{this.notify.error(n)})}refresh(){this.jam.session.list().then(n=>{this.sessions=n}).catch(n=>{this.notify.error(n)})}}return n.\u0275fac=function(t){return new(t||n)(c.Mb(M.JamService),c.Mb(M.JamAuthService),c.Mb(l.h))},n.\u0275cmp=c.Gb({type:n,selectors:[["app-sessions-page"]],decls:3,vars:1,consts:[[1,"sessions"],["section","Session Logins"],["class","content",4,"ngIf"],[1,"content"],[1,"session-list"],[1,"section-title"],["class","session",4,"ngFor","ngForOf"],[1,"session"],[1,"agent"],[1,"title"],[1,"expires"],[1,"label"],[1,"remove"],["title","Remove this login",3,"click"],[1,"icon-remove"]],template:function(n,t){1&n&&(c.Sb(0,"div",0),c.Nb(1,"app-view-header-slim",1),c.Dc(2,h,5,1,"div",2),c.Rb()),2&n&&(c.Ab(2),c.jc("ngIf",t.sessions))},directives:[C.a,o.t,o.s],pipes:[o.f],styles:['[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]{height:100%;overflow-y:auto;overflow-x:hidden}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{padding:15px 15px 60px}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]{text-transform:uppercase;letter-spacing:1.25px;font-size:13.2px;margin-bottom:10px;color:var(--on-control-ambient)}@media (max-width:522px){[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{padding-left:10px;padding-right:10px}}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]{display:flex;flex-flow:column wrap;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:100%;padding-top:5px;background-color:var(--background);color:var(--on-background)}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]{min-height:48px;display:flex;flex-flow:row nowrap;align-items:center;align-content:space-evenly;width:100%;padding:10px;line-height:1.25em;border-bottom:0 solid var(--background-border);border-top:1px solid var(--background-border)}@media (max-width:1000px){[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]{height:auto}}@media (max-width:522px){[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]{font-size:.9em}}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]:hover{background-color:var(--background-hover)}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]:last-child{border-bottom-width:1px}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .small-screen-icon[_ngcontent-%COMP%]{display:none}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{color:var(--on-background-active)}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:var(--on-background);font-size:.8em}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{padding:0;display:inline-block;margin:0 10px 0 0}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{font-size:.8em;vertical-align:middle}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   a.title-link[_ngcontent-%COMP%]{font-size:inherit;margin-right:10px;color:var(--on-background-active)}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:var(--on-background)}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{color:var(--on-background-hover)}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .handle[_ngcontent-%COMP%]{width:0;margin-left:0;cursor:move}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .handle[_ngcontent-%COMP%]   span.grippy[_ngcontent-%COMP%]{display:inline-block;width:26px;height:8px;transform:rotate(90deg);margin-left:-8px}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .handle[_ngcontent-%COMP%]   span.grippy[_ngcontent-%COMP%], [_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .handle[_ngcontent-%COMP%]   span.grippy[_ngcontent-%COMP%]:before{background-image:radial-gradient(#7b7b7b 40%,transparent 0);background-size:4px 4px;background-position:0 100%;background-repeat:repeat-x}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .handle[_ngcontent-%COMP%]   span.grippy[_ngcontent-%COMP%]:before{content:"";display:block;width:100%;height:33%}@media (max-width:1000px){[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]{height:auto;min-height:48px}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{display:block}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:inline-block;margin-left:0}}@media (max-width:400px){[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]{flex-flow:row wrap;align-items:inherit;width:100%;font-size:.9em}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .small-screen-icon[_ngcontent-%COMP%]{display:inline-block}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .handle[_ngcontent-%COMP%]{order:2;width:25%;text-align:center}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .handle[_ngcontent-%COMP%]   span.grippy[_ngcontent-%COMP%]{transform:rotate(0deg)}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{order:6;margin-left:0;margin-right:0;padding-right:0;padding-left:0;width:100%}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{margin-left:0;margin-right:0;padding-right:0;padding-left:0;overflow:hidden;text-overflow:ellipsis}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{width:100%;margin-left:0;margin-right:0;overflow:hidden;text-overflow:ellipsis}}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .agent[_ngcontent-%COMP%]{width:140px;font-size:.8em;padding-right:10px}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .expires[_ngcontent-%COMP%]{width:260px;font-size:.8em;padding-right:10px}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{flex-grow:1;padding-right:10px}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:.7em;text-transform:uppercase}@media (max-width:400px){[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .agent[_ngcontent-%COMP%], [_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .expires[_ngcontent-%COMP%]{width:100%}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{order:0;width:calc(100% - 30px)}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .remove[_ngcontent-%COMP%]{order:1}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .agent[_ngcontent-%COMP%]{order:2}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .expires[_ngcontent-%COMP%]{order:3}}']}),n})(),d=(()=>{class n{constructor(n,t,e,o){this.router=n,this.app=t,this.settings=e,this.player=o}onChange(){this.settings.applySettings()}}return n.\u0275fac=function(t){return new(t||n)(c.Mb(a.c),c.Mb(l.e),c.Mb(l.l),c.Mb(l.j))},n.\u0275cmp=c.Gb({type:n,selectors:[["app-page-settings"]],decls:26,vars:7,consts:[[1,"settings"],["section","Settings"],[1,"content"],[1,"section-title"],[1,"select"],["type","radio","name","theme",3,"ngModel","value","ngModelChange"],["type","checkbox","title","Show Waveform of Current Track",3,"ngModel","ngModelChange"],["type","checkbox","value","1",3,"ngModel","ngModelChange"],["type","checkbox","value","1","title","Show Notifications On Tracks Change",3,"ngModel","ngModelChange"]],template:function(n,t){1&n&&(c.Sb(0,"div",0),c.Nb(1,"app-view-header-slim",1),c.Sb(2,"div",2),c.Sb(3,"div",3),c.Fc(4,"Design"),c.Rb(),c.Sb(5,"div"),c.Sb(6,"fieldset"),c.Sb(7,"label",4),c.Sb(8,"input",5),c.Zb("ngModelChange",(function(n){return t.app.settings.theme=n}))("ngModelChange",(function(){return t.onChange()})),c.Rb(),c.Fc(9,"Dark"),c.Rb(),c.Sb(10,"label",4),c.Sb(11,"input",5),c.Zb("ngModelChange",(function(n){return t.app.settings.theme=n}))("ngModelChange",(function(){return t.onChange()})),c.Rb(),c.Fc(12,"Light"),c.Rb(),c.Rb(),c.Rb(),c.Sb(13,"div",3),c.Fc(14,"Player"),c.Rb(),c.Sb(15,"label"),c.Sb(16,"input",6),c.Zb("ngModelChange",(function(n){return t.app.settings.showWaveform=n}))("ngModelChange",(function(){return t.onChange()})),c.Rb(),c.Fc(17," Show Waveform of Current Track "),c.Rb(),c.Sb(18,"div",3),c.Fc(19,"Playing"),c.Rb(),c.Sb(20,"label"),c.Sb(21,"input",7),c.Zb("ngModelChange",(function(n){return t.app.settings.playingTrackInTitle=n}))("ngModelChange",(function(){return t.onChange()})),c.Rb(),c.Fc(22," Show Playing Track Name in Window Title "),c.Rb(),c.Sb(23,"label"),c.Sb(24,"input",8),c.Zb("ngModelChange",(function(n){return t.app.settings.notificationSong=n}))("ngModelChange",(function(){return t.onChange()})),c.Rb(),c.Fc(25," Show Notification Popup On Track Change "),c.Rb(),c.Rb(),c.Rb()),2&n&&(c.Ab(8),c.jc("ngModel",t.app.settings.theme)("value","dark"),c.Ab(3),c.jc("ngModel",t.app.settings.theme)("value","light"),c.Ab(5),c.jc("ngModel",t.app.settings.showWaveform),c.Ab(5),c.jc("ngModel",t.app.settings.playingTrackInTitle),c.Ab(3),c.jc("ngModel",t.app.settings.notificationSong))},directives:[C.a,s.q,s.c,s.i,s.l,s.a],styles:["[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]{height:100%;overflow-y:auto;overflow-x:hidden}[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{padding:0 15px 15px}[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]{text-transform:uppercase;letter-spacing:1.25px;font-size:13.2px;margin-bottom:10px;color:var(--on-control-ambient)}@media (max-width:522px){[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{padding-left:10px;padding-right:10px}}[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{display:block;padding-bottom:15px;color:var(--on-background-active)}[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%]{margin-top:-1px;display:inline-block;vertical-align:middle}[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   fieldset[_ngcontent-%COMP%]{margin-bottom:15px;width:auto;display:inline}[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   label.select[_ngcontent-%COMP%]{width:auto;padding-bottom:0}[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   label.select[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{margin-right:10px}"]}),n})();e("tk/3");var _=e("JffP"),p=e("XNiG"),b=e("1G5W"),u=e("24wo");function f(n,t){1&n&&c.Nb(0,"i",15)}function m(n,t){1&n&&(c.Sb(0,"span"),c.Fc(1,"Random Image"),c.Rb())}function v(n,t){1&n&&(c.Sb(0,"div"),c.Nb(1,"i",16),c.Fc(2," Stream Audio"),c.Rb())}function x(n,t){1&n&&(c.Sb(0,"div"),c.Nb(1,"i",16),c.Fc(2," Manage Podcasts"),c.Rb())}function w(n,t){1&n&&(c.Sb(0,"div"),c.Nb(1,"i",16),c.Fc(2," Upload Audio"),c.Rb())}function y(n,t){1&n&&(c.Sb(0,"div"),c.Nb(1,"i",16),c.Fc(2," Server Administration"),c.Rb())}function S(n,t){if(1&n){const n=c.Tb();c.Sb(0,"div",3),c.Sb(1,"div"),c.Sb(2,"div",4),c.Sb(3,"div",5),c.Fc(4,"Name"),c.Rb(),c.Sb(5,"div"),c.Fc(6),c.Rb(),c.Rb(),c.Sb(7,"div",4),c.Sb(8,"div",5),c.Fc(9,"Avatar"),c.Rb(),c.Sb(10,"div",6),c.Zb("drop",(function(t){return c.uc(n),c.cc().onDropFile(t)}))("dragover",(function(t){return c.uc(n),c.cc().onDragOverFile(t)})),c.Sb(11,"div",7),c.Fc(12," Drag an Image File here "),c.Rb(),c.Nb(13,"app-coverart-image",8),c.Sb(14,"button",9),c.Zb("click",(function(){return c.uc(n),c.cc().randomAvatar()})),c.Dc(15,f,1,0,"i",10),c.Dc(16,m,2,0,"span",11),c.Rb(),c.Sb(17,"form"),c.Sb(18,"input",12),c.Zb("change",(function(t){return c.uc(n),c.cc().selectFile(t)})),c.Rb(),c.Sb(19,"label",13),c.Fc(20,"Choose a file"),c.Rb(),c.Rb(),c.Rb(),c.Rb(),c.Sb(21,"div"),c.Sb(22,"div",5),c.Fc(23,"Permissions:"),c.Rb(),c.Sb(24,"div",14),c.Dc(25,v,3,0,"div",11),c.Dc(26,x,3,0,"div",11),c.Dc(27,w,3,0,"div",11),c.Dc(28,y,3,0,"div",11),c.Rb(),c.Rb(),c.Rb(),c.Rb()}if(2&n){const n=c.cc();c.Ab(6),c.Gc(n.auth.user.name),c.Ab(7),c.jc("coverArtObj",n.auth.user)("size",100)("round",!0)("refreshRandom",n.refreshRandom),c.Ab(2),c.jc("ngIf",n.refreshing),c.Ab(1),c.jc("ngIf",!n.refreshing),c.Ab(9),c.jc("ngIf",null==n.auth.user||null==n.auth.user.roles?null:n.auth.user.roles.stream),c.Ab(1),c.jc("ngIf",null==n.auth.user||null==n.auth.user.roles?null:n.auth.user.roles.podcast),c.Ab(1),c.jc("ngIf",null==n.auth.user||null==n.auth.user.roles?null:n.auth.user.roles.upload),c.Ab(1),c.jc("ngIf",null==n.auth.user||null==n.auth.user.roles?null:n.auth.user.roles.admin)}}let k=(()=>{class n{constructor(n,t,e,o){this.app=n,this.auth=t,this.jam=e,this.notify=o,this.refreshing=!1,this.unsubscribe=new p.a,this.refreshRandom=Object(_.a)()}ngOnDestroy(){this.unsubscribe.next(),this.unsubscribe.complete()}onDropFile(n){var t;n.preventDefault(),this.uploadFile(null===(t=n.dataTransfer)||void 0===t?void 0:t.files)}onDragOverFile(n){n.stopPropagation(),n.preventDefault()}selectFile(n){this.uploadFile(n.target.files)}uploadFile(n){n&&0!==n.length&&this.auth.user&&this.jam.user.uploadUserImage({id:this.auth.user.id},n[0]).pipe(Object(b.a)(this.unsubscribe)).subscribe(n=>{},n=>{this.notify.error(n)},()=>{this.refreshRandom=Object(_.a)(),this.notify.success("Upload done")})}randomAvatar(){!this.refreshing&&this.auth.user&&(this.refreshing=!0,this.jam.user.generateUserImage({id:this.auth.user.id}).then(()=>{this.refreshing=!1,this.refreshRandom=Object(_.a)(),this.notify.success("Image randomized")}).catch(n=>{this.refreshing=!1,this.notify.error(n)}))}}return n.\u0275fac=function(t){return new(t||n)(c.Mb(l.e),c.Mb(M.JamAuthService),c.Mb(M.JamService),c.Mb(l.h))},n.\u0275cmp=c.Gb({type:n,selectors:[["app-user-page"]],decls:3,vars:1,consts:[[1,"user"],["section","User"],["class","content",4,"ngIf"],[1,"content"],[1,"section"],[1,"section-title"],[1,"drop-zone",3,"drop","dragover"],[1,"placeholder"],[3,"coverArtObj","size","round","refreshRandom"],[1,"button-primary",3,"click"],["class","icon-spin icon-spinner",4,"ngIf"],[4,"ngIf"],["id","file","type","file","placeholder","Upload image","accept",".png,.jpeg,.jpg",1,"inputfile",3,"change"],["for","file",1,"button-primary"],[1,"roles"],[1,"icon-spin","icon-spinner"],[1,"icon-checkmark"]],template:function(n,t){1&n&&(c.Sb(0,"div",0),c.Nb(1,"app-view-header-slim",1),c.Dc(2,S,29,11,"div",2),c.Rb()),2&n&&(c.Ab(2),c.jc("ngIf",t.auth.user))},directives:[C.a,o.t,u.a,s.w,s.j,s.k],styles:["[_nghost-%COMP%]   .user[_ngcontent-%COMP%]{height:100%;overflow-y:auto;overflow-x:hidden}[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{padding:0 15px 15px}[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]{text-transform:uppercase;letter-spacing:1.25px;font-size:13.2px;margin-bottom:10px;color:var(--on-control-ambient)}@media (max-width:522px){[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{padding-left:10px;padding-right:10px}}[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]{padding-bottom:30px}[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .drop-zone[_ngcontent-%COMP%]{vertical-align:bottom;display:inline-block;min-width:200px;min-height:140px;margin-bottom:15px;margin-right:15px;border:2px dotted var(--secondary);padding-left:15px;padding-right:15px;padding-bottom:15px;text-align:center}[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .drop-zone[_ngcontent-%COMP%]   app-coverart-image[_ngcontent-%COMP%]{margin:0 auto 10px}[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .drop-zone[_ngcontent-%COMP%]   .inputfile[_ngcontent-%COMP%]{width:.1px;height:.1px;opacity:0;overflow:hidden;position:absolute;z-index:-1}[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .drop-zone[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-bottom:10px}[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .drop-zone[_ngcontent-%COMP%]   .placeholder[_ngcontent-%COMP%]{width:100%;padding-top:15px;padding-bottom:15px;text-align:center;color:var(--on-control-ambient);font-size:.8em;text-transform:uppercase}"]}),n})();const R=[{path:"",component:g,children:[{path:"",pathMatch:"full",component:k,canActivate:[r.a],data:{name:"User"}},{path:"settings",component:d,canActivate:[r.a],data:{name:"Settings"}},{path:"sessions",component:P,canActivate:[r.a],data:{name:"Sessions"}}]}],F=a.g.forChild(R),A=function(n){return[n]};function j(n,t){if(1&n&&(c.Sb(0,"a",6),c.Nb(1,"i"),c.Sb(2,"span"),c.Fc(3),c.Rb(),c.Rb()),2&n){const n=t.$implicit;c.jc("routerLink",c.oc(5,A,n.link))("routerLinkActiveOptions",n.options),c.Ab(1),c.Cb(n.icon),c.Ab(2),c.Gc(n.text)}}function z(n,t){if(1&n&&(c.Sb(0,"div",4),c.Dc(1,j,4,7,"a",5),c.Rb()),2&n){const n=c.cc();c.Ab(1),c.jc("ngForOf",n.sections)("ngForTrackBy",n.trackByFn)}}let N=(()=>{class n{constructor(n,t){this.app=n,this.router=t,this.collapsed={},this.sections=[],this.showMobileNavig=!1;const e=R[0],o=((null==e?void 0:e.children)||[]).filter(n=>{var t;return n.path&&n.path.length>0&&(null===(t=n.data)||void 0===t?void 0:t.name)}).map(n=>{var t;const e=(null===(t=n.data)||void 0===t?void 0:t.link)?n.data.link:n.path;return{id:e,text:n.data?n.data.name:"",icon:n.data&&n.data.icon?n.data.icon:"icon-admin",link:"/user/"+e,options:{exact:!1}}});this.sections=[{id:"",text:"User",icon:"icon-user",link:"/user",options:{exact:!0}}].concat(o)}ngOnInit(){this.app.view.currentSidebar=this,this.router.events.forEach(()=>{this.showMobileNavig=!1}).catch(n=>{console.error(n)})}ngOnDestroy(){this.app.view.currentSidebar=void 0}trackByFn(n,t){return t.id}toggleMobileNavig(){this.showMobileNavig=!this.showMobileNavig}}return n.\u0275fac=function(t){return new(t||n)(c.Mb(l.e),c.Mb(a.c))},n.\u0275cmp=c.Gb({type:n,selectors:[["app-user-sidebar"]],decls:5,vars:5,consts:[[1,"navigation"],[1,"list"],[1,"header",3,"click"],["class","collapse",4,"ngIf"],[1,"collapse"],["class","item","routerLinkActive","active",3,"routerLink","routerLinkActiveOptions",4,"ngFor","ngForOf","ngForTrackBy"],["routerLinkActive","active",1,"item",3,"routerLink","routerLinkActiveOptions"]],template:function(n,t){1&n&&(c.Sb(0,"section",0),c.Sb(1,"div",1),c.Sb(2,"div",2),c.Zb("click",(function(){return t.collapsed.main=!t.collapsed.main})),c.Fc(3,"User"),c.Rb(),c.Dc(4,z,2,2,"div",3),c.Rb(),c.Rb()),2&n&&(c.Eb("show",t.showMobileNavig),c.Ab(1),c.Eb("active",t.collapsed.main),c.Ab(3),c.jc("ngIf",!t.collapsed.main))},directives:[o.t,o.s,a.f,a.e],styles:['@charset "UTF-8";[_nghost-%COMP%]{position:relative;flex:0 1 100%;display:flex;flex-direction:column;height:100%}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]{padding:15px;flex-grow:1;width:100%;overflow-y:auto;overflow-x:hidden;background-color:var(--control);color:var(--on-control)}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]{display:flex;flex-flow:column wrap;margin-bottom:15px}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]{color:var(--on-control-ambient);font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-bottom:5px;cursor:pointer;border-right:3px solid transparent}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]:hover{color:var(--on-control-ambient-hover);border-right-color:var(--primary)}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]:after{font-family:jam;content:"\ue804";padding-left:4px}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]{color:var(--on-control);padding:5px 0;display:flex;flex-flow:row nowrap;align-items:center;border-right:3px solid transparent;transition:all .1s ease-in-out;transform-origin:left center}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]   app-coverart-image[_ngcontent-%COMP%]{margin-right:6px}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{width:25px;display:block}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]:hover{color:var(--on-control-hover);border-right-color:var(--primary)}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .item.active[_ngcontent-%COMP%]{transform:scale(1.1)}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]{margin-top:8px;padding-left:4px}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]{color:var(--on-control);font-size:14px;font-weight:700}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .active[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]:after{content:"\ue807"}@media (max-width:768px){[_nghost-%COMP%]{height:auto}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]{display:none;position:fixed;z-index:10;max-height:calc(100% - 60px);overflow-y:auto;flex-flow:row wrap;border-bottom:1px solid var(--control-box-border)}[_nghost-%COMP%]   .navigation.show[_ngcontent-%COMP%]{display:flex}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .index-list[_ngcontent-%COMP%]{display:none}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]{flex:1}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]{border-right-width:0}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]:after{content:""}}']}),n})();var I=e("E9Yb"),D=e("XFci"),L=e("QhIf"),T=e("khyI"),U=e("jtIS"),G=e("sbl8"),Z=e("WDtg"),J=e("1U9M"),H=e("oyw4"),W=e("AHRB"),X=e("Ir1b"),B=e("Nejy"),E=e("PRhZ"),K=e("6plP"),q=e("4HtZ"),Q=e("/w5H"),V=e("xlge"),$=e("8sYl"),Y=e("rRf+"),nn=e("c36T"),tn=e("WXCC"),en=e("ApzM"),on=e("jwGM"),sn=e("rxhz"),cn=e("wAuK"),gn=e("lLkq"),an=e("LcLR"),rn=e("sgvu"),ln=e("uLy5"),Mn=e("2pzp"),Cn=e("JBM9"),On=e("UAU/"),hn=e("R0FO"),Pn=e("gjEl"),dn=e("8cVO"),_n=e("vi5Q"),pn=e("8ApH"),bn=e("pnwl"),un=e("GKVu"),fn=e("1VP0"),mn=e("ivK/"),vn=e("1vo4"),xn=e("nF5c"),wn=e("gOm6");let yn=(()=>{class n{}return n.\u0275mod=c.Kb({type:n}),n.\u0275inj=c.Jb({factory:function(t){return new(t||n)},imports:[[s.e,i.a,o.c,F]]}),n})();c.xc(g,[s.w,s.n,s.v,s.c,s.o,s.r,s.a,s.t,s.u,s.q,s.i,s.j,s.s,s.g,s.f,s.p,s.b,s.d,s.l,s.m,s.k,I.a,D.a,L.a,T.a,U.a,G.a,Z.a,J.a,H.a,u.a,W.a,X.a,B.a,E.a,K.a,q.a,C.a,Q.a,V.a,$.a,Y.a,nn.a,tn.a,en.a,on.a,sn.a,cn.a,gn.a,an.a,rn.a,ln.a,Mn.a,Cn.a,On.a,hn.a,Pn.a,dn.a,_n.a,o.q,o.r,o.s,o.t,o.A,o.w,o.x,o.y,o.z,o.u,o.v,a.h,a.d,a.f,a.e,a.i,g,N,k,d,P],[pn.a,bn.a,un.a,fn.a,mn.a,vn.a,xn.a,wn.a,o.b,o.G,o.p,o.k,o.E,o.g,o.C,o.F,o.d,o.f,o.i,o.j,o.l])}}]);