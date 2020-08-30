!function(){function n(n,t){for(var e=0;e<t.length;e++){var o=t[e];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(n,o.key,o)}}function t(t,e,o){return e&&n(t.prototype,e),o&&n(t,o),t}function e(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{"9N29":function(n,o,s){"use strict";s.r(o),s.d(o,"UserModule",(function(){return Nn}));var i,c=s("ofXK"),g=s("3Pt+"),a=s("FpXt"),r=s("fXoL"),l=((i=function n(){e(this,n)}).\u0275fac=function(n){return new(n||i)},i.\u0275cmp=r.Gb({type:i,selectors:[["app-user"]],decls:5,vars:0,consts:[[1,"left"],[1,"split-pane-divider-left"],[1,"middle"]],template:function(n,t){1&n&&(r.Sb(0,"div",0),r.Nb(1,"app-user-sidebar"),r.Rb(),r.Nb(2,"app-splitter",1),r.Sb(3,"div",2),r.Nb(4,"router-outlet"),r.Rb())},styles:["[_nghost-%COMP%]{width:100%;height:100%;flex:1;display:flex;flex-flow:row nowrap;overflow:hidden;align-items:flex-start;align-content:flex-start}[_nghost-%COMP%]   .left[_ngcontent-%COMP%]{width:15%;height:100%}[_nghost-%COMP%]   .middle[_ngcontent-%COMP%]{width:60%;flex-grow:1;height:100%}[_nghost-%COMP%]   .right[_ngcontent-%COMP%]{width:25%;height:100%}@media (max-width:1600px){[_nghost-%COMP%]   .left[_ngcontent-%COMP%]{width:20%}[_nghost-%COMP%]   .middle[_ngcontent-%COMP%]{width:55%;flex-grow:1;height:100%}[_nghost-%COMP%]   .right[_ngcontent-%COMP%]{width:25%;height:100%}}@media (max-width:1400px){[_nghost-%COMP%]   .left[_ngcontent-%COMP%]{width:25%}[_nghost-%COMP%]   .right[_ngcontent-%COMP%], [_nghost-%COMP%]   .split-pane-divider-right[_ngcontent-%COMP%]{display:none}}@media (max-width:768px){[_nghost-%COMP%]{overflow:auto;flex-flow:row wrap}[_nghost-%COMP%]   app-splitter[_ngcontent-%COMP%]{display:none}[_nghost-%COMP%]   .left[_ngcontent-%COMP%]{width:100%!important;height:auto}[_nghost-%COMP%]   .middle[_ngcontent-%COMP%]{height:auto}[_nghost-%COMP%]   .right[_ngcontent-%COMP%]{width:100%!important;height:auto}}@media (max-width:522px){[_nghost-%COMP%]{overflow:hidden;height:auto}}"]}),i),M=s("tyNb"),C=s("auXs"),O=s("bQbs"),h=s("6O88"),P=s("9S5+");function d(n,t){if(1&n){var e=r.Tb();r.Sb(0,"div",7),r.Sb(1,"div",8),r.Fc(2),r.Nb(3,"br"),r.Fc(4),r.Rb(),r.Sb(5,"div",9),r.Fc(6),r.Nb(7,"br"),r.Sb(8,"span"),r.Fc(9),r.Rb(),r.Rb(),r.Sb(10,"div",10),r.Sb(11,"span",11),r.Fc(12,"valid until:"),r.Rb(),r.Nb(13,"br"),r.Fc(14),r.dc(15,"date"),r.Rb(),r.Sb(16,"div",12),r.Sb(17,"a",13),r.Zb("click",(function(){r.uc(e);var n=t.$implicit;return r.cc(2).remove(n)})),r.Nb(18,"i",14),r.Rb(),r.Rb(),r.Rb()}if(2&n){var o=t.$implicit;r.Ab(2),r.Hc(" ",o.agent,""),r.Ab(2),r.Hc(" ",o.os," "),r.Ab(2),r.Hc(" ",o.client,""),r.Ab(3),r.Gc(o.mode),r.Ab(5),r.Hc(" ",r.fc(15,5,o.expires,"long")," ")}}function _(n,t){if(1&n&&(r.Sb(0,"div",3),r.Sb(1,"div",4),r.Sb(2,"div",5),r.Fc(3,"Sessions"),r.Rb(),r.Dc(4,d,19,8,"div",6),r.Rb(),r.Rb()),2&n){var e=r.cc();r.Ab(4),r.jc("ngForOf",e.sessions)}}var p,u,b=((u=function(){function n(t,o,s){e(this,n),this.jam=t,this.auth=o,this.notify=s}return t(n,[{key:"ngOnInit",value:function(){this.auth.isLoggedIn()&&this.refresh()}},{key:"remove",value:function(n){var t=this,e=n.id;this.jam.session.remove({id:e}).then((function(){t.sessions&&(t.sessions=t.sessions.filter((function(n){return n.id!==e}))),t.notify.success("Session Login removed")})).catch((function(n){t.notify.error(n)}))}},{key:"refresh",value:function(){var n=this;this.jam.session.list().then((function(t){n.sessions=t})).catch((function(t){n.notify.error(t)}))}}]),n}()).\u0275fac=function(n){return new(n||u)(r.Mb(h.JamService),r.Mb(h.JamAuthService),r.Mb(O.h))},u.\u0275cmp=r.Gb({type:u,selectors:[["app-sessions-page"]],decls:3,vars:1,consts:[[1,"sessions"],["section","Session Logins"],["class","content",4,"ngIf"],[1,"content"],[1,"session-list"],[1,"section-title"],["class","session",4,"ngFor","ngForOf"],[1,"session"],[1,"agent"],[1,"title"],[1,"expires"],[1,"label"],[1,"remove"],["title","Remove this login",3,"click"],[1,"icon-remove"]],template:function(n,t){1&n&&(r.Sb(0,"div",0),r.Nb(1,"app-view-header-slim",1),r.Dc(2,_,5,1,"div",2),r.Rb()),2&n&&(r.Ab(2),r.jc("ngIf",t.sessions))},directives:[P.a,c.t,c.s],pipes:[c.f],styles:['[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]{height:100%;overflow-y:auto;overflow-x:hidden}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{padding:15px 15px 60px}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]{text-transform:uppercase;letter-spacing:1.25px;font-size:13.2px;margin-bottom:10px;color:var(--on-control-ambient)}@media (max-width:522px){[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{padding-left:10px;padding-right:10px}}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]{display:flex;flex-flow:column wrap;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:100%;padding-top:5px;background-color:var(--background);color:var(--on-background)}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]{min-height:48px;display:flex;flex-flow:row nowrap;align-items:center;align-content:space-evenly;width:100%;padding:10px;line-height:1.25em;border-bottom:0 solid var(--background-border);border-top:1px solid var(--background-border)}@media (max-width:1000px){[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]{height:auto}}@media (max-width:522px){[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]{font-size:.9em}}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]:hover{background-color:var(--background-hover)}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]:last-child{border-bottom-width:1px}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .small-screen-icon[_ngcontent-%COMP%]{display:none}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{color:var(--on-background-active)}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:var(--on-background);font-size:.8em}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{padding:0;display:inline-block;margin:0 10px 0 0}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{font-size:.8em;vertical-align:middle}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   a.title-link[_ngcontent-%COMP%]{font-size:inherit;margin-right:10px;color:var(--on-background-active)}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:var(--on-background)}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{color:var(--on-background-hover)}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .handle[_ngcontent-%COMP%]{width:0;margin-left:0;cursor:move}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .handle[_ngcontent-%COMP%]   span.grippy[_ngcontent-%COMP%]{display:inline-block;width:26px;height:8px;transform:rotate(90deg);margin-left:-8px}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .handle[_ngcontent-%COMP%]   span.grippy[_ngcontent-%COMP%], [_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .handle[_ngcontent-%COMP%]   span.grippy[_ngcontent-%COMP%]:before{background-image:radial-gradient(#7b7b7b 40%,transparent 0);background-size:4px 4px;background-position:0 100%;background-repeat:repeat-x}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .handle[_ngcontent-%COMP%]   span.grippy[_ngcontent-%COMP%]:before{content:"";display:block;width:100%;height:33%}@media (max-width:1000px){[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]{height:auto;min-height:48px}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{display:block}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:inline-block;margin-left:0}}@media (max-width:400px){[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]{flex-flow:row wrap;align-items:inherit;width:100%;font-size:.9em}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .small-screen-icon[_ngcontent-%COMP%]{display:inline-block}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .handle[_ngcontent-%COMP%]{order:2;width:25%;text-align:center}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .handle[_ngcontent-%COMP%]   span.grippy[_ngcontent-%COMP%]{transform:rotate(0deg)}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{order:6;margin-left:0;margin-right:0;padding-right:0;padding-left:0;width:100%}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{margin-left:0;margin-right:0;padding-right:0;padding-left:0;overflow:hidden;text-overflow:ellipsis}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{width:100%;margin-left:0;margin-right:0;overflow:hidden;text-overflow:ellipsis}}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .agent[_ngcontent-%COMP%]{width:140px;font-size:.8em;padding-right:10px}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .expires[_ngcontent-%COMP%]{width:260px;font-size:.8em;padding-right:10px}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{flex-grow:1;padding-right:10px}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:.7em;text-transform:uppercase}@media (max-width:400px){[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .agent[_ngcontent-%COMP%], [_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .expires[_ngcontent-%COMP%]{width:100%}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{order:0;width:calc(100% - 30px)}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .remove[_ngcontent-%COMP%]{order:1}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .agent[_ngcontent-%COMP%]{order:2}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .expires[_ngcontent-%COMP%]{order:3}}']}),u),f=((p=function(){function n(t,o,s,i){e(this,n),this.router=t,this.app=o,this.settings=s,this.player=i}return t(n,[{key:"onChange",value:function(){this.settings.applySettings()}}]),n}()).\u0275fac=function(n){return new(n||p)(r.Mb(M.c),r.Mb(O.e),r.Mb(O.l),r.Mb(O.j))},p.\u0275cmp=r.Gb({type:p,selectors:[["app-page-settings"]],decls:26,vars:7,consts:[[1,"settings"],["section","Settings"],[1,"content"],[1,"section-title"],[1,"select"],["type","radio","name","theme",3,"ngModel","value","ngModelChange"],["type","checkbox","title","Show Waveform of Current Track",3,"ngModel","ngModelChange"],["type","checkbox","value","1",3,"ngModel","ngModelChange"],["type","checkbox","value","1","title","Show Notifications On Tracks Change",3,"ngModel","ngModelChange"]],template:function(n,t){1&n&&(r.Sb(0,"div",0),r.Nb(1,"app-view-header-slim",1),r.Sb(2,"div",2),r.Sb(3,"div",3),r.Fc(4,"Design"),r.Rb(),r.Sb(5,"div"),r.Sb(6,"fieldset"),r.Sb(7,"label",4),r.Sb(8,"input",5),r.Zb("ngModelChange",(function(n){return t.app.settings.theme=n}))("ngModelChange",(function(){return t.onChange()})),r.Rb(),r.Fc(9,"Dark"),r.Rb(),r.Sb(10,"label",4),r.Sb(11,"input",5),r.Zb("ngModelChange",(function(n){return t.app.settings.theme=n}))("ngModelChange",(function(){return t.onChange()})),r.Rb(),r.Fc(12,"Light"),r.Rb(),r.Rb(),r.Rb(),r.Sb(13,"div",3),r.Fc(14,"Player"),r.Rb(),r.Sb(15,"label"),r.Sb(16,"input",6),r.Zb("ngModelChange",(function(n){return t.app.settings.showWaveform=n}))("ngModelChange",(function(){return t.onChange()})),r.Rb(),r.Fc(17," Show Waveform of Current Track "),r.Rb(),r.Sb(18,"div",3),r.Fc(19,"Playing"),r.Rb(),r.Sb(20,"label"),r.Sb(21,"input",7),r.Zb("ngModelChange",(function(n){return t.app.settings.playingTrackInTitle=n}))("ngModelChange",(function(){return t.onChange()})),r.Rb(),r.Fc(22," Show Playing Track Name in Window Title "),r.Rb(),r.Sb(23,"label"),r.Sb(24,"input",8),r.Zb("ngModelChange",(function(n){return t.app.settings.notificationSong=n}))("ngModelChange",(function(){return t.onChange()})),r.Rb(),r.Fc(25," Show Notification Popup On Track Change "),r.Rb(),r.Rb(),r.Rb()),2&n&&(r.Ab(8),r.jc("ngModel",t.app.settings.theme)("value","dark"),r.Ab(3),r.jc("ngModel",t.app.settings.theme)("value","light"),r.Ab(5),r.jc("ngModel",t.app.settings.showWaveform),r.Ab(5),r.jc("ngModel",t.app.settings.playingTrackInTitle),r.Ab(3),r.jc("ngModel",t.app.settings.notificationSong))},directives:[P.a,g.q,g.c,g.i,g.l,g.a],styles:["[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]{height:100%;overflow-y:auto;overflow-x:hidden}[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{padding:0 15px 15px}[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]{text-transform:uppercase;letter-spacing:1.25px;font-size:13.2px;margin-bottom:10px;color:var(--on-control-ambient)}@media (max-width:522px){[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{padding-left:10px;padding-right:10px}}[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{display:block;padding-bottom:15px;color:var(--on-background-active)}[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%]{margin-top:-1px;display:inline-block;vertical-align:middle}[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   fieldset[_ngcontent-%COMP%]{margin-bottom:15px;width:auto;display:inline}[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   label.select[_ngcontent-%COMP%]{width:auto;padding-bottom:0}[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   label.select[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{margin-right:10px}"]}),p);s("tk/3");var v=s("JffP"),m=s("XNiG"),x=s("1G5W"),w=s("24wo");function y(n,t){1&n&&r.Nb(0,"i",15)}function k(n,t){1&n&&(r.Sb(0,"span"),r.Fc(1,"Random Image"),r.Rb())}function S(n,t){1&n&&(r.Sb(0,"div"),r.Nb(1,"i",16),r.Fc(2," Stream Audio"),r.Rb())}function R(n,t){1&n&&(r.Sb(0,"div"),r.Nb(1,"i",16),r.Fc(2," Manage Podcasts"),r.Rb())}function F(n,t){1&n&&(r.Sb(0,"div"),r.Nb(1,"i",16),r.Fc(2," Upload Audio"),r.Rb())}function A(n,t){1&n&&(r.Sb(0,"div"),r.Nb(1,"i",16),r.Fc(2," Server Administration"),r.Rb())}function j(n,t){if(1&n){var e=r.Tb();r.Sb(0,"div",3),r.Sb(1,"div"),r.Sb(2,"div",4),r.Sb(3,"div",5),r.Fc(4,"Name"),r.Rb(),r.Sb(5,"div"),r.Fc(6),r.Rb(),r.Rb(),r.Sb(7,"div",4),r.Sb(8,"div",5),r.Fc(9,"Avatar"),r.Rb(),r.Sb(10,"div",6),r.Zb("drop",(function(n){return r.uc(e),r.cc().onDropFile(n)}))("dragover",(function(n){return r.uc(e),r.cc().onDragOverFile(n)})),r.Sb(11,"div",7),r.Fc(12," Drag an Image File here "),r.Rb(),r.Nb(13,"app-coverart-image",8),r.Sb(14,"button",9),r.Zb("click",(function(){return r.uc(e),r.cc().randomAvatar()})),r.Dc(15,y,1,0,"i",10),r.Dc(16,k,2,0,"span",11),r.Rb(),r.Sb(17,"form"),r.Sb(18,"input",12),r.Zb("change",(function(n){return r.uc(e),r.cc().selectFile(n)})),r.Rb(),r.Sb(19,"label",13),r.Fc(20,"Choose a file"),r.Rb(),r.Rb(),r.Rb(),r.Rb(),r.Sb(21,"div"),r.Sb(22,"div",5),r.Fc(23,"Permissions:"),r.Rb(),r.Sb(24,"div",14),r.Dc(25,S,3,0,"div",11),r.Dc(26,R,3,0,"div",11),r.Dc(27,F,3,0,"div",11),r.Dc(28,A,3,0,"div",11),r.Rb(),r.Rb(),r.Rb(),r.Rb()}if(2&n){var o=r.cc();r.Ab(6),r.Gc(o.auth.user.name),r.Ab(7),r.jc("coverArtObj",o.auth.user)("size",100)("round",!0)("refreshRandom",o.refreshRandom),r.Ab(2),r.jc("ngIf",o.refreshing),r.Ab(1),r.jc("ngIf",!o.refreshing),r.Ab(9),r.jc("ngIf",null==o.auth.user||null==o.auth.user.roles?null:o.auth.user.roles.stream),r.Ab(1),r.jc("ngIf",null==o.auth.user||null==o.auth.user.roles?null:o.auth.user.roles.podcast),r.Ab(1),r.jc("ngIf",null==o.auth.user||null==o.auth.user.roles?null:o.auth.user.roles.upload),r.Ab(1),r.jc("ngIf",null==o.auth.user||null==o.auth.user.roles?null:o.auth.user.roles.admin)}}var z,N=((z=function(){function n(t,o,s,i){e(this,n),this.app=t,this.auth=o,this.jam=s,this.notify=i,this.refreshing=!1,this.unsubscribe=new m.a,this.refreshRandom=Object(v.a)()}return t(n,[{key:"ngOnDestroy",value:function(){this.unsubscribe.next(),this.unsubscribe.complete()}},{key:"onDropFile",value:function(n){var t;n.preventDefault(),this.uploadFile(null===(t=n.dataTransfer)||void 0===t?void 0:t.files)}},{key:"onDragOverFile",value:function(n){n.stopPropagation(),n.preventDefault()}},{key:"selectFile",value:function(n){this.uploadFile(n.target.files)}},{key:"uploadFile",value:function(n){var t=this;n&&0!==n.length&&this.auth.user&&this.jam.user.uploadUserImage({id:this.auth.user.id},n[0]).pipe(Object(x.a)(this.unsubscribe)).subscribe((function(n){}),(function(n){t.notify.error(n)}),(function(){t.refreshRandom=Object(v.a)(),t.notify.success("Upload done")}))}},{key:"randomAvatar",value:function(){var n=this;!this.refreshing&&this.auth.user&&(this.refreshing=!0,this.jam.user.generateUserImage({id:this.auth.user.id}).then((function(){n.refreshing=!1,n.refreshRandom=Object(v.a)(),n.notify.success("Image randomized")})).catch((function(t){n.refreshing=!1,n.notify.error(t)})))}}]),n}()).\u0275fac=function(n){return new(n||z)(r.Mb(O.e),r.Mb(h.JamAuthService),r.Mb(h.JamService),r.Mb(O.h))},z.\u0275cmp=r.Gb({type:z,selectors:[["app-user-page"]],decls:3,vars:1,consts:[[1,"user"],["section","User"],["class","content",4,"ngIf"],[1,"content"],[1,"section"],[1,"section-title"],[1,"drop-zone",3,"drop","dragover"],[1,"placeholder"],[3,"coverArtObj","size","round","refreshRandom"],[1,"button-primary",3,"click"],["class","icon-spin icon-spinner",4,"ngIf"],[4,"ngIf"],["id","file","type","file","placeholder","Upload image","accept",".png,.jpeg,.jpg",1,"inputfile",3,"change"],["for","file",1,"button-primary"],[1,"roles"],[1,"icon-spin","icon-spinner"],[1,"icon-checkmark"]],template:function(n,t){1&n&&(r.Sb(0,"div",0),r.Nb(1,"app-view-header-slim",1),r.Dc(2,j,29,11,"div",2),r.Rb()),2&n&&(r.Ab(2),r.jc("ngIf",t.auth.user))},directives:[P.a,c.t,w.a,g.w,g.j,g.k],styles:["[_nghost-%COMP%]   .user[_ngcontent-%COMP%]{height:100%;overflow-y:auto;overflow-x:hidden}[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{padding:0 15px 15px}[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]{text-transform:uppercase;letter-spacing:1.25px;font-size:13.2px;margin-bottom:10px;color:var(--on-control-ambient)}@media (max-width:522px){[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{padding-left:10px;padding-right:10px}}[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]{padding-bottom:30px}[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .drop-zone[_ngcontent-%COMP%]{vertical-align:bottom;display:inline-block;min-width:200px;min-height:140px;margin-bottom:15px;margin-right:15px;border:2px dotted var(--secondary);padding-left:15px;padding-right:15px;padding-bottom:15px;text-align:center}[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .drop-zone[_ngcontent-%COMP%]   app-coverart-image[_ngcontent-%COMP%]{margin:0 auto 10px}[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .drop-zone[_ngcontent-%COMP%]   .inputfile[_ngcontent-%COMP%]{width:.1px;height:.1px;opacity:0;overflow:hidden;position:absolute;z-index:-1}[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .drop-zone[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-bottom:10px}[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .drop-zone[_ngcontent-%COMP%]   .placeholder[_ngcontent-%COMP%]{width:100%;padding-top:15px;padding-bottom:15px;text-align:center;color:var(--on-control-ambient);font-size:.8em;text-transform:uppercase}"]}),z),I=[{path:"",component:l,children:[{path:"",pathMatch:"full",component:N,canActivate:[C.a],data:{name:"User"}},{path:"settings",component:f,canActivate:[C.a],data:{name:"Settings"}},{path:"sessions",component:b,canActivate:[C.a],data:{name:"Sessions"}}]}],D=M.g.forChild(I),T=function(n){return[n]};function L(n,t){if(1&n&&(r.Sb(0,"a",6),r.Nb(1,"i"),r.Sb(2,"span"),r.Fc(3),r.Rb(),r.Rb()),2&n){var e=t.$implicit;r.jc("routerLink",r.oc(5,T,e.link))("routerLinkActiveOptions",e.options),r.Ab(1),r.Cb(e.icon),r.Ab(2),r.Gc(e.text)}}function U(n,t){if(1&n&&(r.Sb(0,"div",4),r.Dc(1,L,4,7,"a",5),r.Rb()),2&n){var e=r.cc();r.Ab(1),r.jc("ngForOf",e.sections)("ngForTrackBy",e.trackByFn)}}var G,Z,J=((G=function(){function n(t,o){e(this,n),this.app=t,this.router=o,this.collapsed={},this.sections=[],this.showMobileNavig=!1;var s=I[0],i=((null==s?void 0:s.children)||[]).filter((function(n){var t;return n.path&&n.path.length>0&&(null===(t=n.data)||void 0===t?void 0:t.name)})).map((function(n){var t,e=(null===(t=n.data)||void 0===t?void 0:t.link)?n.data.link:n.path;return{id:e,text:n.data?n.data.name:"",icon:n.data&&n.data.icon?n.data.icon:"icon-admin",link:"/user/"+e,options:{exact:!1}}}));this.sections=[{id:"",text:"User",icon:"icon-user",link:"/user",options:{exact:!0}}].concat(i)}return t(n,[{key:"ngOnInit",value:function(){var n=this;this.app.view.currentSidebar=this,this.router.events.forEach((function(){n.showMobileNavig=!1})).catch((function(n){console.error(n)}))}},{key:"ngOnDestroy",value:function(){this.app.view.currentSidebar=void 0}},{key:"trackByFn",value:function(n,t){return t.id}},{key:"toggleMobileNavig",value:function(){this.showMobileNavig=!this.showMobileNavig}}]),n}()).\u0275fac=function(n){return new(n||G)(r.Mb(O.e),r.Mb(M.c))},G.\u0275cmp=r.Gb({type:G,selectors:[["app-user-sidebar"]],decls:5,vars:5,consts:[[1,"navigation"],[1,"list"],[1,"header",3,"click"],["class","collapse",4,"ngIf"],[1,"collapse"],["class","item","routerLinkActive","active",3,"routerLink","routerLinkActiveOptions",4,"ngFor","ngForOf","ngForTrackBy"],["routerLinkActive","active",1,"item",3,"routerLink","routerLinkActiveOptions"]],template:function(n,t){1&n&&(r.Sb(0,"section",0),r.Sb(1,"div",1),r.Sb(2,"div",2),r.Zb("click",(function(){return t.collapsed.main=!t.collapsed.main})),r.Fc(3,"User"),r.Rb(),r.Dc(4,U,2,2,"div",3),r.Rb(),r.Rb()),2&n&&(r.Eb("show",t.showMobileNavig),r.Ab(1),r.Eb("active",t.collapsed.main),r.Ab(3),r.jc("ngIf",!t.collapsed.main))},directives:[c.t,c.s,M.f,M.e],styles:['@charset "UTF-8";[_nghost-%COMP%]{position:relative;flex:0 1 100%;display:flex;flex-direction:column;height:100%}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]{padding:15px;flex-grow:1;width:100%;overflow-y:auto;overflow-x:hidden;background-color:var(--control);color:var(--on-control)}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]{display:flex;flex-flow:column wrap;margin-bottom:15px}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]{color:var(--on-control-ambient);font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-bottom:5px;cursor:pointer;border-right:3px solid transparent}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]:hover{color:var(--on-control-ambient-hover);border-right-color:var(--primary)}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]:after{font-family:jam;content:"\ue804";padding-left:4px}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]{color:var(--on-control);padding:5px 0;display:flex;flex-flow:row nowrap;align-items:center;border-right:3px solid transparent;transition:all .1s ease-in-out;transform-origin:left center}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]   app-coverart-image[_ngcontent-%COMP%]{margin-right:6px}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{width:25px;display:block}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]:hover{color:var(--on-control-hover);border-right-color:var(--primary)}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .item.active[_ngcontent-%COMP%]{transform:scale(1.1)}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]{margin-top:8px;padding-left:4px}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]{color:var(--on-control);font-size:14px;font-weight:700}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .active[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]:after{content:"\ue807"}@media (max-width:768px){[_nghost-%COMP%]{height:auto}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]{display:none;position:fixed;z-index:10;max-height:calc(100% - 60px);overflow-y:auto;flex-flow:row wrap;border-bottom:1px solid var(--control-box-border)}[_nghost-%COMP%]   .navigation.show[_ngcontent-%COMP%]{display:flex}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .index-list[_ngcontent-%COMP%]{display:none}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]{flex:1}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]{border-right-width:0}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]:after{content:""}}']}),G),H=s("E9Yb"),W=s("XFci"),E=s("QhIf"),X=s("khyI"),B=s("jtIS"),K=s("sbl8"),q=s("WDtg"),Q=s("1U9M"),V=s("oyw4"),$=s("AHRB"),Y=s("Ir1b"),nn=s("Nejy"),tn=s("PRhZ"),en=s("6plP"),on=s("4HtZ"),sn=s("/w5H"),cn=s("xlge"),gn=s("8sYl"),an=s("rRf+"),rn=s("c36T"),ln=s("WXCC"),Mn=s("ApzM"),Cn=s("jwGM"),On=s("rxhz"),hn=s("wAuK"),Pn=s("lLkq"),dn=s("LcLR"),_n=s("sgvu"),pn=s("uLy5"),un=s("2pzp"),bn=s("JBM9"),fn=s("UAU/"),vn=s("R0FO"),mn=s("gjEl"),xn=s("8cVO"),wn=s("vi5Q"),yn=s("8ApH"),kn=s("pnwl"),Sn=s("GKVu"),Rn=s("1VP0"),Fn=s("ivK/"),An=s("1vo4"),jn=s("nF5c"),zn=s("gOm6"),Nn=((Z=function n(){e(this,n)}).\u0275mod=r.Kb({type:Z}),Z.\u0275inj=r.Jb({factory:function(n){return new(n||Z)},imports:[[g.e,a.a,c.c,D]]}),Z);r.xc(l,[g.w,g.n,g.v,g.c,g.o,g.r,g.a,g.t,g.u,g.q,g.i,g.j,g.s,g.g,g.f,g.p,g.b,g.d,g.l,g.m,g.k,H.a,W.a,E.a,X.a,B.a,K.a,q.a,Q.a,V.a,w.a,$.a,Y.a,nn.a,tn.a,en.a,on.a,P.a,sn.a,cn.a,gn.a,an.a,rn.a,ln.a,Mn.a,Cn.a,On.a,hn.a,Pn.a,dn.a,_n.a,pn.a,un.a,bn.a,fn.a,vn.a,mn.a,xn.a,wn.a,c.q,c.r,c.s,c.t,c.A,c.w,c.x,c.y,c.z,c.u,c.v,M.h,M.d,M.f,M.e,M.i,l,J,N,f,b],[yn.a,kn.a,Sn.a,Rn.a,Fn.a,An.a,jn.a,zn.a,c.b,c.G,c.p,c.k,c.E,c.g,c.C,c.F,c.d,c.f,c.i,c.j,c.l])}}])}();