(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"9N29":function(n,t,e){"use strict";e.r(t),e.d(t,"UserModule",(function(){return xn}));var o=e("ofXK"),s=e("3Pt+"),i=e("FpXt"),c=e("fXoL");let g=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=c.Jb({type:n,selectors:[["app-user"]],decls:5,vars:0,consts:[[1,"left"],[1,"split-pane-divider-left"],[1,"middle"]],template:function(n,t){1&n&&(c.Vb(0,"div",0),c.Qb(1,"app-user-sidebar"),c.Ub(),c.Qb(2,"app-splitter",1),c.Vb(3,"div",2),c.Qb(4,"router-outlet"),c.Ub())},styles:["[_nghost-%COMP%]{width:100%;height:100%;flex:1;display:flex;flex-flow:row nowrap;overflow:hidden;align-items:flex-start;align-content:flex-start}[_nghost-%COMP%]   .left[_ngcontent-%COMP%]{width:15%;height:100%}[_nghost-%COMP%]   .middle[_ngcontent-%COMP%]{width:60%;flex-grow:1;height:100%}[_nghost-%COMP%]   .right[_ngcontent-%COMP%]{width:25%;height:100%}@media (max-width:1600px){[_nghost-%COMP%]   .left[_ngcontent-%COMP%]{width:20%}[_nghost-%COMP%]   .middle[_ngcontent-%COMP%]{width:55%;flex-grow:1;height:100%}[_nghost-%COMP%]   .right[_ngcontent-%COMP%]{width:25%;height:100%}}@media (max-width:1400px){[_nghost-%COMP%]   .left[_ngcontent-%COMP%]{width:25%}[_nghost-%COMP%]   .right[_ngcontent-%COMP%], [_nghost-%COMP%]   .split-pane-divider-right[_ngcontent-%COMP%]{display:none}}@media (max-width:768px){[_nghost-%COMP%]{overflow:auto;flex-flow:row wrap}[_nghost-%COMP%]   app-splitter[_ngcontent-%COMP%]{display:none}[_nghost-%COMP%]   .left[_ngcontent-%COMP%]{width:100%!important;height:auto}[_nghost-%COMP%]   .middle[_ngcontent-%COMP%]{height:auto}[_nghost-%COMP%]   .right[_ngcontent-%COMP%]{width:100%!important;height:auto}}@media (max-width:522px){[_nghost-%COMP%]{overflow:hidden;height:auto}}"]}),n})();var a=e("tyNb"),r=e("auXs"),l=e("bQbs"),C=e("6O88"),M=e("9S5+");function P(n,t){if(1&n){const n=c.Wb();c.Vb(0,"div",7),c.Vb(1,"div",8),c.Ic(2),c.Qb(3,"br"),c.Ic(4),c.Ub(),c.Vb(5,"div",9),c.Ic(6),c.Qb(7,"br"),c.Vb(8,"span"),c.Ic(9),c.Ub(),c.Ub(),c.Vb(10,"div",10),c.Vb(11,"span",11),c.Ic(12,"valid until:"),c.Ub(),c.Qb(13,"br"),c.Ic(14),c.hc(15,"date"),c.Ub(),c.Vb(16,"div",12),c.Vb(17,"a",13),c.dc("click",(function(){c.yc(n);const e=t.$implicit;return c.gc(2).remove(e)})),c.Qb(18,"i",14),c.Ub(),c.Ub(),c.Ub()}if(2&n){const n=t.$implicit;c.Cb(2),c.Kc(" ",n.agent,""),c.Cb(2),c.Kc(" ",n.os," "),c.Cb(2),c.Kc(" ",n.client,""),c.Cb(3),c.Jc(n.mode),c.Cb(5),c.Kc(" ",c.jc(15,5,n.expires,"long")," ")}}function O(n,t){if(1&n&&(c.Vb(0,"div",3),c.Vb(1,"div",4),c.Vb(2,"div",5),c.Ic(3,"Sessions"),c.Ub(),c.Gc(4,P,19,8,"div",6),c.Ub(),c.Ub()),2&n){const n=c.gc();c.Cb(4),c.nc("ngForOf",n.sessions)}}let d=(()=>{class n{constructor(n,t,e){this.jam=n,this.auth=t,this.notify=e}ngOnInit(){this.auth.isLoggedIn()&&this.refresh()}remove(n){const t=n.id;this.jam.user.sessions_delete({id:t}).then(()=>{this.sessions=this.sessions.filter(n=>n.id!==t),this.notify.success("Session Login removed")}).catch(n=>{this.notify.error(n)})}refresh(){this.jam.user.sessions_list().then(n=>{this.sessions=n}).catch(n=>{this.notify.error(n)})}}return n.\u0275fac=function(t){return new(t||n)(c.Pb(C.k),c.Pb(C.g),c.Pb(l.i))},n.\u0275cmp=c.Jb({type:n,selectors:[["app-sessions-page"]],decls:3,vars:1,consts:[[1,"sessions"],["section","Session Logins"],["class","content",4,"ngIf"],[1,"content"],[1,"session-list"],[1,"section-title"],["class","session",4,"ngFor","ngForOf"],[1,"session"],[1,"agent"],[1,"title"],[1,"expires"],[1,"label"],[1,"remove"],["title","Remove this login",3,"click"],[1,"icon-remove"]],template:function(n,t){1&n&&(c.Vb(0,"div",0),c.Qb(1,"app-view-header-slim",1),c.Gc(2,O,5,1,"div",2),c.Ub()),2&n&&(c.Cb(2),c.nc("ngIf",t.sessions))},directives:[M.a,o.t,o.s],pipes:[o.f],styles:['[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]{height:100%;overflow-y:auto;overflow-x:hidden}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{padding:15px 15px 60px}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]{text-transform:uppercase;letter-spacing:1.25px;font-size:13.2px;margin-bottom:10px;color:var(--on-control-ambient)}@media (max-width:522px){[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{padding-left:10px;padding-right:10px}}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]{display:flex;flex-flow:column wrap;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:100%;padding-top:5px;background-color:var(--background);color:var(--on-background)}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]{min-height:48px;display:flex;flex-flow:row nowrap;align-items:center;align-content:space-evenly;width:100%;padding:10px;line-height:1.25em;border-bottom:0 solid var(--background-border);border-top:1px solid var(--background-border)}@media (max-width:1000px){[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]{height:auto}}@media (max-width:522px){[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]{font-size:.9em}}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]:hover{background-color:var(--background-hover)}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]:last-child{border-bottom-width:1px}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .small-screen-icon[_ngcontent-%COMP%]{display:none}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{color:var(--on-background-active)}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:var(--on-background);font-size:.8em}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{padding:0;display:inline-block;margin:0 10px 0 0}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{font-size:.8em;vertical-align:middle}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   a.title-link[_ngcontent-%COMP%]{font-size:inherit;margin-right:10px;color:var(--on-background-active)}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:var(--on-background)}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{color:var(--on-background-hover)}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .handle[_ngcontent-%COMP%]{width:0;margin-left:0;cursor:move}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .handle[_ngcontent-%COMP%]   span.grippy[_ngcontent-%COMP%]{display:inline-block;width:26px;height:8px;transform:rotate(90deg);margin-left:-8px}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .handle[_ngcontent-%COMP%]   span.grippy[_ngcontent-%COMP%], [_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .handle[_ngcontent-%COMP%]   span.grippy[_ngcontent-%COMP%]:before{background-image:radial-gradient(#7b7b7b 40%,transparent 0);background-size:4px 4px;background-position:0 100%;background-repeat:repeat-x}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .handle[_ngcontent-%COMP%]   span.grippy[_ngcontent-%COMP%]:before{content:"";display:block;width:100%;height:33%}@media (max-width:1000px){[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]{height:auto;min-height:48px}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{display:block}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:inline-block;margin-left:0}}@media (max-width:400px){[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]{flex-flow:row wrap;align-items:inherit;width:100%;font-size:.9em}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .small-screen-icon[_ngcontent-%COMP%]{display:inline-block}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .handle[_ngcontent-%COMP%]{order:2;width:25%;text-align:center}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .handle[_ngcontent-%COMP%]   span.grippy[_ngcontent-%COMP%]{transform:rotate(0deg)}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{order:6;margin-left:0;margin-right:0;padding-right:0;padding-left:0;width:100%}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{margin-left:0;margin-right:0;padding-right:0;padding-left:0;overflow:hidden;text-overflow:ellipsis}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{width:100%;margin-left:0;margin-right:0;overflow:hidden;text-overflow:ellipsis}}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .agent[_ngcontent-%COMP%]{width:140px;font-size:.8em;padding-right:10px}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .expires[_ngcontent-%COMP%]{width:260px;font-size:.8em;padding-right:10px}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{flex-grow:1;padding-right:10px}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:.7em;text-transform:uppercase}@media (max-width:400px){[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .agent[_ngcontent-%COMP%], [_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .expires[_ngcontent-%COMP%]{width:100%}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{order:0;width:calc(100% - 30px)}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .remove[_ngcontent-%COMP%]{order:1}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .agent[_ngcontent-%COMP%]{order:2}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .expires[_ngcontent-%COMP%]{order:3}}']}),n})(),h=(()=>{class n{constructor(n,t,e,o){this.router=n,this.app=t,this.settings=e,this.player=o}onChange(){this.settings.applySettings()}}return n.\u0275fac=function(t){return new(t||n)(c.Pb(a.c),c.Pb(l.e),c.Pb(l.m),c.Pb(l.k))},n.\u0275cmp=c.Jb({type:n,selectors:[["app-page-settings"]],decls:26,vars:7,consts:[[1,"settings"],["section","Settings"],[1,"content"],[1,"section-title"],[1,"select"],["type","radio","name","theme",3,"ngModel","value","ngModelChange"],["type","checkbox","title","Show Waveform of Current Track",3,"ngModel","ngModelChange"],["type","checkbox","value","1",3,"ngModel","ngModelChange"],["type","checkbox","value","1","title","Show Notifications On Tracks Change",3,"ngModel","ngModelChange"]],template:function(n,t){1&n&&(c.Vb(0,"div",0),c.Qb(1,"app-view-header-slim",1),c.Vb(2,"div",2),c.Vb(3,"div",3),c.Ic(4,"Design"),c.Ub(),c.Vb(5,"div"),c.Vb(6,"fieldset"),c.Vb(7,"label",4),c.Vb(8,"input",5),c.dc("ngModelChange",(function(n){return t.app.settings.theme=n}))("ngModelChange",(function(){return t.onChange()})),c.Ub(),c.Ic(9,"Dark"),c.Ub(),c.Vb(10,"label",4),c.Vb(11,"input",5),c.dc("ngModelChange",(function(n){return t.app.settings.theme=n}))("ngModelChange",(function(){return t.onChange()})),c.Ub(),c.Ic(12,"Light"),c.Ub(),c.Ub(),c.Ub(),c.Vb(13,"div",3),c.Ic(14,"Player"),c.Ub(),c.Vb(15,"label"),c.Vb(16,"input",6),c.dc("ngModelChange",(function(n){return t.app.settings.showWaveform=n}))("ngModelChange",(function(){return t.onChange()})),c.Ub(),c.Ic(17," Show Waveform of Current Track "),c.Ub(),c.Vb(18,"div",3),c.Ic(19,"Playing"),c.Ub(),c.Vb(20,"label"),c.Vb(21,"input",7),c.dc("ngModelChange",(function(n){return t.app.settings.playingTrackInTitle=n}))("ngModelChange",(function(){return t.onChange()})),c.Ub(),c.Ic(22," Show Playing Track Name in Window Title "),c.Ub(),c.Vb(23,"label"),c.Vb(24,"input",8),c.dc("ngModelChange",(function(n){return t.app.settings.notificationSong=n}))("ngModelChange",(function(){return t.onChange()})),c.Ub(),c.Ic(25," Show Notification Popup On Track Change "),c.Ub(),c.Ub(),c.Ub()),2&n&&(c.Cb(8),c.nc("ngModel",t.app.settings.theme)("value","dark"),c.Cb(3),c.nc("ngModel",t.app.settings.theme)("value","light"),c.Cb(5),c.nc("ngModel",t.app.settings.showWaveform),c.Cb(5),c.nc("ngModel",t.app.settings.playingTrackInTitle),c.Cb(3),c.nc("ngModel",t.app.settings.notificationSong))},directives:[M.a,s.q,s.c,s.i,s.l,s.a],styles:["[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]{height:100%;overflow-y:auto;overflow-x:hidden}[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{padding:0 15px 15px}[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]{text-transform:uppercase;letter-spacing:1.25px;font-size:13.2px;margin-bottom:10px;color:var(--on-control-ambient)}@media (max-width:522px){[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{padding-left:10px;padding-right:10px}}[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{display:block;padding-bottom:15px;color:var(--on-background-active)}[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%]{margin-top:-1px;display:inline-block;vertical-align:middle}[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   fieldset[_ngcontent-%COMP%]{margin-bottom:15px;width:auto;display:inline}[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   label.select[_ngcontent-%COMP%]{width:auto;padding-bottom:0}[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   label.select[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{margin-right:10px}"]}),n})();e("tk/3");var _=e("XNiG"),p=e("1G5W"),b=e("24wo");function f(n,t){1&n&&c.Qb(0,"i",15)}function u(n,t){1&n&&(c.Vb(0,"span"),c.Ic(1,"Random Image"),c.Ub())}function m(n,t){1&n&&(c.Vb(0,"div"),c.Qb(1,"i",16),c.Ic(2," Stream Audio"),c.Ub())}function v(n,t){1&n&&(c.Vb(0,"div"),c.Qb(1,"i",16),c.Ic(2," Manage Podcasts"),c.Ub())}function x(n,t){1&n&&(c.Vb(0,"div"),c.Qb(1,"i",16),c.Ic(2," Upload Audio"),c.Ub())}function w(n,t){1&n&&(c.Vb(0,"div"),c.Qb(1,"i",16),c.Ic(2," Server Administration"),c.Ub())}function y(n,t){if(1&n){const n=c.Wb();c.Vb(0,"div",3),c.Vb(1,"div"),c.Vb(2,"div",4),c.Vb(3,"div",5),c.Ic(4,"Name"),c.Ub(),c.Vb(5,"div"),c.Ic(6),c.Ub(),c.Ub(),c.Vb(7,"div",4),c.Vb(8,"div",5),c.Ic(9,"Avatar"),c.Ub(),c.Vb(10,"div",6),c.dc("drop",(function(t){return c.yc(n),c.gc().onDropFile(t)}))("dragover",(function(t){return c.yc(n),c.gc().onDragOverFile(t)})),c.Vb(11,"div",7),c.Ic(12," Drag an Image File here "),c.Ub(),c.Qb(13,"app-coverart-image",8),c.Vb(14,"button",9),c.dc("click",(function(){return c.yc(n),c.gc().randomAvatar()})),c.Gc(15,f,1,0,"i",10),c.Gc(16,u,2,0,"span",11),c.Ub(),c.Vb(17,"form"),c.Vb(18,"input",12),c.dc("change",(function(t){return c.yc(n),c.gc().selectFile(t)})),c.Ub(),c.Vb(19,"label",13),c.Ic(20,"Choose a file"),c.Ub(),c.Ub(),c.Ub(),c.Ub(),c.Vb(21,"div"),c.Vb(22,"div",5),c.Ic(23,"Permissions:"),c.Ub(),c.Vb(24,"div",14),c.Gc(25,m,3,0,"div",11),c.Gc(26,v,3,0,"div",11),c.Gc(27,x,3,0,"div",11),c.Gc(28,w,3,0,"div",11),c.Ub(),c.Ub(),c.Ub(),c.Ub()}if(2&n){const n=c.gc();c.Cb(6),c.Jc(n.auth.user.name),c.Cb(7),c.nc("coverArtObj",n.auth.user)("size",100)("round",!0)("refreshRandom",n.refreshRandom),c.Cb(2),c.nc("ngIf",n.refreshing),c.Cb(1),c.nc("ngIf",!n.refreshing),c.Cb(9),c.nc("ngIf",n.auth.user.roles.stream),c.Cb(1),c.nc("ngIf",n.auth.user.roles.podcast),c.Cb(1),c.nc("ngIf",n.auth.user.roles.upload),c.Cb(1),c.nc("ngIf",n.auth.user.roles.admin)}}let k=(()=>{class n{constructor(n,t,e,o){this.app=n,this.auth=t,this.jam=e,this.notify=o,this.refreshing=!1,this.unsubscribe=new _.a,this.refreshRandom=this.randomRefreshString()}ngOnDestroy(){this.unsubscribe.next(),this.unsubscribe.complete()}onDropFile(n){n.preventDefault(),this.uploadFile(n.dataTransfer.files)}onDragOverFile(n){n.stopPropagation(),n.preventDefault()}selectFile(n){this.uploadFile(n.target.files)}uploadFile(n){0!==n.length&&this.jam.user.imageUpload_update({id:this.auth.user.id},n[0]).pipe(Object(p.a)(this.unsubscribe)).subscribe(n=>{},n=>{this.notify.error(n)},()=>{this.refreshRandom=this.randomRefreshString(),this.notify.success("Upload done")})}randomRefreshString(){return Math.floor(9999999*Math.random()).toString()}randomAvatar(){this.refreshing||(this.refreshing=!0,this.jam.user.image_random({}).then(()=>{this.refreshing=!1,this.refreshRandom=this.randomRefreshString(),this.notify.success("Image randomized")}).catch(n=>{this.refreshing=!1,this.notify.error(n)}))}}return n.\u0275fac=function(t){return new(t||n)(c.Pb(l.e),c.Pb(C.g),c.Pb(C.k),c.Pb(l.i))},n.\u0275cmp=c.Jb({type:n,selectors:[["app-user-page"]],decls:3,vars:1,consts:[[1,"user"],["section","User"],["class","content",4,"ngIf"],[1,"content"],[1,"section"],[1,"section-title"],[1,"drop-zone",3,"drop","dragover"],[1,"placeholder"],[3,"coverArtObj","size","round","refreshRandom"],[1,"button-primary",3,"click"],["class","icon-spin icon-spinner",4,"ngIf"],[4,"ngIf"],["id","file","type","file","placeholder","Upload image","accept",".png,.jpeg,.jpg",1,"inputfile",3,"change"],["for","file",1,"button-primary"],[1,"roles"],[1,"icon-spin","icon-spinner"],[1,"icon-checkmark"]],template:function(n,t){1&n&&(c.Vb(0,"div",0),c.Qb(1,"app-view-header-slim",1),c.Gc(2,y,29,11,"div",2),c.Ub()),2&n&&(c.Cb(2),c.nc("ngIf",t.auth.user))},directives:[M.a,o.t,b.a,s.w,s.j,s.k],styles:["[_nghost-%COMP%]   .user[_ngcontent-%COMP%]{height:100%;overflow-y:auto;overflow-x:hidden}[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{padding:0 15px 15px}[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]{text-transform:uppercase;letter-spacing:1.25px;font-size:13.2px;margin-bottom:10px;color:var(--on-control-ambient)}@media (max-width:522px){[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{padding-left:10px;padding-right:10px}}[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]{padding-bottom:30px}[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .drop-zone[_ngcontent-%COMP%]{vertical-align:bottom;display:inline-block;min-width:200px;min-height:140px;margin-bottom:15px;margin-right:15px;border:2px dotted var(--secondary);padding-left:15px;padding-right:15px;padding-bottom:15px;text-align:center}[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .drop-zone[_ngcontent-%COMP%]   app-coverart-image[_ngcontent-%COMP%]{margin:0 auto 10px}[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .drop-zone[_ngcontent-%COMP%]   .inputfile[_ngcontent-%COMP%]{width:.1px;height:.1px;opacity:0;overflow:hidden;position:absolute;z-index:-1}[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .drop-zone[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-bottom:10px}[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .drop-zone[_ngcontent-%COMP%]   .placeholder[_ngcontent-%COMP%]{width:100%;padding-top:15px;padding-bottom:15px;text-align:center;color:var(--on-control-ambient);font-size:.8em;text-transform:uppercase}"]}),n})();const U=[{path:"",component:g,children:[{path:"",pathMatch:"full",component:k,canActivate:[r.a],data:{name:"User"}},{path:"settings",component:h,canActivate:[r.a],data:{name:"Settings"}},{path:"sessions",component:d,canActivate:[r.a],data:{name:"Sessions"}}]}],V=a.g.forChild(U),I=function(n){return[n]};function z(n,t){if(1&n&&(c.Vb(0,"a",6),c.Qb(1,"i"),c.Vb(2,"span"),c.Ic(3),c.Ub(),c.Ub()),2&n){const n=t.$implicit;c.nc("routerLink",c.sc(5,I,n.link))("routerLinkActiveOptions",n.options),c.Cb(1),c.Eb(n.icon),c.Cb(2),c.Jc(n.text)}}function F(n,t){if(1&n&&(c.Vb(0,"div",4),c.Gc(1,z,4,7,"a",5),c.Ub()),2&n){const n=c.gc();c.Cb(1),c.nc("ngForOf",n.sections)("ngForTrackBy",n.trackByFn)}}let S=(()=>{class n{constructor(n,t){this.app=n,this.router=t,this.collapsed={},this.sections=[],this.showMobileNavig=!1;const e=U[0].children.filter(n=>n.path.length>0&&n.data&&n.data.name).map(n=>{const t=n.data&&n.data.link?n.data.link:n.path;return{id:t,text:n.data?n.data.name:"",icon:n.data&&n.data.icon?n.data.icon:"icon-admin",link:`/user/${t}`,options:{exact:!1}}});this.sections=[{id:"",text:"User",icon:"icon-user",link:"/user",options:{exact:!0}}].concat(e)}ngOnInit(){this.app.view.currentSidebar=this,this.router.events.forEach(()=>{this.showMobileNavig=!1}).catch(n=>{console.error(n)})}ngOnDestroy(){this.app.view.currentSidebar=void 0}trackByFn(n,t){return t.id}toggleMobileNavig(){this.showMobileNavig=!this.showMobileNavig}}return n.\u0275fac=function(t){return new(t||n)(c.Pb(l.e),c.Pb(a.c))},n.\u0275cmp=c.Jb({type:n,selectors:[["app-user-sidebar"]],decls:5,vars:5,consts:[[1,"navigation"],[1,"list"],[1,"header",3,"click"],["class","collapse",4,"ngIf"],[1,"collapse"],["class","item","routerLinkActive","active",3,"routerLink","routerLinkActiveOptions",4,"ngFor","ngForOf","ngForTrackBy"],["routerLinkActive","active",1,"item",3,"routerLink","routerLinkActiveOptions"]],template:function(n,t){1&n&&(c.Vb(0,"section",0),c.Vb(1,"div",1),c.Vb(2,"div",2),c.dc("click",(function(){return t.collapsed.main=!t.collapsed.main})),c.Ic(3,"User"),c.Ub(),c.Gc(4,F,2,2,"div",3),c.Ub(),c.Ub()),2&n&&(c.Gb("show",t.showMobileNavig),c.Cb(1),c.Gb("active",t.collapsed.main),c.Cb(3),c.nc("ngIf",!t.collapsed.main))},directives:[o.t,o.s,a.f,a.e],styles:['@charset "UTF-8";[_nghost-%COMP%]{position:relative;flex:0 1 100%;display:flex;flex-direction:column;height:100%}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]{padding:15px;flex-grow:1;width:100%;overflow-y:auto;overflow-x:hidden;background-color:var(--control);color:var(--on-control)}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]{display:flex;flex-flow:column wrap;margin-bottom:15px}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]{color:var(--on-control-ambient);font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-bottom:5px;cursor:pointer;border-right:3px solid transparent}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]:hover{color:var(--on-control-ambient-hover);border-right-color:var(--primary)}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]:after{font-family:jam;content:"\ue804";padding-left:4px}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]{color:var(--on-control);padding:5px 0;display:flex;flex-flow:row nowrap;align-items:center;border-right:3px solid transparent;transition:all .1s ease-in-out;transform-origin:left center}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]   app-coverart-image[_ngcontent-%COMP%]{margin-right:6px}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{width:25px;display:block}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]:hover{color:var(--on-control-hover);border-right-color:var(--primary)}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .item.active[_ngcontent-%COMP%]{transform:scale(1.1)}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]{margin-top:8px;padding-left:4px}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]{color:var(--on-control);font-size:14px;font-weight:700}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .active[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]:after{content:"\ue807"}@media (max-width:768px){[_nghost-%COMP%]{height:auto}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]{display:none;position:fixed;z-index:10;max-height:calc(100% - 60px);overflow-y:auto;flex-flow:row wrap;border-bottom:1px solid var(--control-box-border)}[_nghost-%COMP%]   .navigation.show[_ngcontent-%COMP%]{display:flex}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .index-list[_ngcontent-%COMP%]{display:none}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]{flex:1}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]{border-right-width:0}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]:after{content:""}}']}),n})();var A=e("E9Yb"),j=e("XFci"),Q=e("QhIf"),G=e("khyI"),L=e("jtIS"),R=e("sbl8"),N=e("WDtg"),T=e("1U9M"),D=e("oyw4"),J=e("AHRB"),W=e("Ir1b"),K=e("Nejy"),B=e("PRhZ"),X=e("6plP"),E=e("4HtZ"),q=e("/w5H"),H=e("xlge"),$=e("8sYl"),Y=e("rRf+"),Z=e("c36T"),nn=e("WXCC"),tn=e("ApzM"),en=e("jwGM"),on=e("rxhz"),sn=e("wAuK"),cn=e("lLkq"),gn=e("LcLR"),an=e("sgvu"),rn=e("uLy5"),ln=e("2pzp"),Cn=e("JBM9"),Mn=e("UAU/"),Pn=e("R0FO"),On=e("gjEl"),dn=e("8cVO"),hn=e("vi5Q"),_n=e("8ApH"),pn=e("gOm6"),bn=e("pnwl"),fn=e("GKVu"),un=e("1VP0"),mn=e("ivK/"),vn=e("nF5c");let xn=(()=>{class n{}return n.\u0275mod=c.Nb({type:n}),n.\u0275inj=c.Mb({factory:function(t){return new(t||n)},imports:[[s.e,i.a,o.c,V]]}),n})();c.Bc(g,[s.w,s.n,s.v,s.c,s.o,s.r,s.a,s.t,s.u,s.q,s.i,s.j,s.s,s.g,s.f,s.p,s.b,s.d,s.l,s.m,s.k,A.a,j.a,Q.a,G.a,L.a,R.a,N.a,T.a,D.a,b.a,J.a,W.a,K.a,B.a,X.a,E.a,M.a,q.a,H.a,$.a,Y.a,Z.a,nn.a,tn.a,en.a,on.a,sn.a,cn.a,gn.a,an.a,rn.a,ln.a,Cn.a,Mn.a,Pn.a,On.a,dn.a,hn.a,o.q,o.r,o.s,o.t,o.A,o.w,o.x,o.y,o.z,o.u,o.v,a.h,a.d,a.f,a.e,a.i,g,S,k,h,d],[_n.a,pn.a,bn.a,fn.a,un.a,mn.a,vn.a,o.b,o.G,o.p,o.k,o.E,o.g,o.C,o.F,o.d,o.f,o.i,o.j,o.l])}}]);