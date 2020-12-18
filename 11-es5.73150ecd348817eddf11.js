!function(){function n(n){return function(n){if(Array.isArray(n))return t(n)}(n)||function(n){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(n))return Array.from(n)}(n)||function(n,e){if(!n)return;if("string"==typeof n)return t(n,e);var o=Object.prototype.toString.call(n).slice(8,-1);"Object"===o&&n.constructor&&(o=n.constructor.name);if("Map"===o||"Set"===o)return Array.from(n);if("Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))return t(n,e)}(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function t(n,t){(null==t||t>n.length)&&(t=n.length);for(var e=0,o=new Array(t);e<t;e++)o[e]=n[e];return o}function e(n,t){for(var e=0;e<t.length;e++){var o=t[e];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(n,o.key,o)}}function o(n,t,o){return t&&e(n.prototype,t),o&&e(n,o),n}function i(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{"9N29":function(t,e,s){"use strict";s.r(e),s.d(e,"UserModule",function(){return Y});var c,a=s("ofXK"),r=s("3Pt+"),g=s("FpXt"),l=s("fXoL"),M=((c=function n(){i(this,n)}).\u0275fac=function(n){return new(n||c)},c.\u0275cmp=l.Gb({type:c,selectors:[["app-user"]],decls:5,vars:0,consts:[[1,"left"],[1,"split-pane-divider-left"],[1,"middle"]],template:function(n,t){1&n&&(l.Sb(0,"div",0),l.Nb(1,"app-user-sidebar"),l.Rb(),l.Nb(2,"app-splitter",1),l.Sb(3,"div",2),l.Nb(4,"router-outlet"),l.Rb())},styles:["[_nghost-%COMP%]{width:100%;height:100%;flex:1;display:flex;flex-flow:row nowrap;overflow:hidden;align-items:flex-start;align-content:flex-start}[_nghost-%COMP%]   .left[_ngcontent-%COMP%]{width:15%;height:100%}[_nghost-%COMP%]   .middle[_ngcontent-%COMP%]{width:60%;flex-grow:1;height:100%}[_nghost-%COMP%]   .right[_ngcontent-%COMP%]{width:25%;height:100%}@media (max-width:1600px){[_nghost-%COMP%]   .left[_ngcontent-%COMP%]{width:20%}[_nghost-%COMP%]   .middle[_ngcontent-%COMP%]{width:55%;flex-grow:1;height:100%}[_nghost-%COMP%]   .right[_ngcontent-%COMP%]{width:25%;height:100%}}@media (max-width:1400px){[_nghost-%COMP%]   .left[_ngcontent-%COMP%]{width:25%}[_nghost-%COMP%]   .right[_ngcontent-%COMP%], [_nghost-%COMP%]   .split-pane-divider-right[_ngcontent-%COMP%]{display:none}}@media (max-width:768px){[_nghost-%COMP%]{overflow:auto;flex-flow:row wrap}[_nghost-%COMP%]   app-splitter[_ngcontent-%COMP%]{display:none}[_nghost-%COMP%]   .left[_ngcontent-%COMP%]{width:100%!important;height:auto}[_nghost-%COMP%]   .middle[_ngcontent-%COMP%]{height:auto}[_nghost-%COMP%]   .right[_ngcontent-%COMP%]{width:100%!important;height:auto}}@media (max-width:522px){[_nghost-%COMP%]{overflow:hidden;height:auto}}"]}),c),p=s("tyNb"),d=s("auXs"),O=s("bQbs"),h=s("6O88"),C=s("9S5+");function P(n,t){if(1&n){var e=l.Tb();l.Sb(0,"div",7),l.Sb(1,"div",8),l.Fc(2),l.Nb(3,"br"),l.Fc(4),l.Rb(),l.Sb(5,"div",9),l.Fc(6),l.Nb(7,"br"),l.Sb(8,"span"),l.Fc(9),l.Rb(),l.Rb(),l.Sb(10,"div",10),l.Sb(11,"span",11),l.Fc(12,"valid until:"),l.Rb(),l.Nb(13,"br"),l.Fc(14),l.dc(15,"date"),l.Rb(),l.Sb(16,"div",12),l.Sb(17,"a",13),l.Zb("click",function(){l.uc(e);var n=t.$implicit;return l.cc(2).remove(n)}),l.Nb(18,"i",14),l.Rb(),l.Rb(),l.Rb()}if(2&n){var o=t.$implicit;l.Ab(2),l.Hc(" ",o.agent,""),l.Ab(2),l.Hc(" ",o.os," "),l.Ab(2),l.Hc(" ",o.client,""),l.Ab(3),l.Gc(o.mode),l.Ab(5),l.Hc(" ",l.fc(15,5,o.expires,"long")," ")}}function _(n,t){if(1&n&&(l.Sb(0,"div",3),l.Sb(1,"div",4),l.Sb(2,"div",5),l.Fc(3,"Sessions"),l.Rb(),l.Dc(4,P,19,8,"div",6),l.Rb(),l.Rb()),2&n){var e=l.cc();l.Ab(4),l.jc("ngForOf",e.sessions)}}var u,b=((u=function(){function n(t,e,o){i(this,n),this.jam=t,this.auth=e,this.notify=o}return o(n,[{key:"ngOnInit",value:function(){this.auth.isLoggedIn()&&this.refresh()}},{key:"remove",value:function(n){var t=this,e=n.id;this.jam.session.remove({id:e}).then(function(){t.sessions&&(t.sessions=t.sessions.filter(function(n){return n.id!==e})),t.notify.success("Session Login removed")}).catch(function(n){t.notify.error(n)})}},{key:"refresh",value:function(){var n=this;this.jam.session.list().then(function(t){n.sessions=t}).catch(function(t){n.notify.error(t)})}}]),n}()).\u0275fac=function(n){return new(n||u)(l.Mb(h.k),l.Mb(h.g),l.Mb(O.h))},u.\u0275cmp=l.Gb({type:u,selectors:[["app-sessions-page"]],decls:3,vars:1,consts:[[1,"sessions"],["section","Session Logins"],["class","content",4,"ngIf"],[1,"content"],[1,"session-list"],[1,"section-title"],["class","session",4,"ngFor","ngForOf"],[1,"session"],[1,"agent"],[1,"title"],[1,"expires"],[1,"label"],[1,"remove"],["title","Remove this login",3,"click"],[1,"icon-remove"]],template:function(n,t){1&n&&(l.Sb(0,"div",0),l.Nb(1,"app-view-header-slim",1),l.Dc(2,_,5,1,"div",2),l.Rb()),2&n&&(l.Ab(2),l.jc("ngIf",t.sessions))},directives:[C.a,a.l,a.k],pipes:[a.d],styles:['[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]{height:100%;overflow-y:auto;overflow-x:hidden}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{padding:15px 15px 60px}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]{text-transform:uppercase;letter-spacing:1.25px;font-size:13.2px;margin-bottom:10px;color:var(--on-control-ambient)}@media (max-width:522px){[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{padding-left:10px;padding-right:10px}}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]{display:flex;flex-flow:column wrap;-webkit-user-select:none;-moz-user-select:none;user-select:none;width:100%;padding-top:5px;background-color:var(--background);color:var(--on-background)}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]{min-height:48px;display:flex;flex-flow:row nowrap;align-items:center;align-content:space-evenly;width:100%;padding:10px;line-height:1.25em;border-bottom:0 solid var(--background-border);border-top:1px solid var(--background-border)}@media (max-width:1000px){[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]{height:auto}}@media (max-width:522px){[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]{font-size:.9em}}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]:hover{background-color:var(--background-hover)}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]:last-child{border-bottom-width:1px}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .small-screen-icon[_ngcontent-%COMP%]{display:none}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{color:var(--on-background-active)}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:var(--on-background);font-size:.8em}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{padding:0;display:inline-block;margin:0 10px 0 0}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{font-size:.8em;vertical-align:middle}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   a.title-link[_ngcontent-%COMP%]{font-size:inherit;margin-right:10px;color:var(--on-background-active)}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:var(--on-background)}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{color:var(--on-background-hover)}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .handle[_ngcontent-%COMP%]{width:0;margin-left:0;cursor:move}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .handle[_ngcontent-%COMP%]   span.grippy[_ngcontent-%COMP%]{display:inline-block;width:26px;height:8px;transform:rotate(90deg);margin-left:-8px}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .handle[_ngcontent-%COMP%]   span.grippy[_ngcontent-%COMP%], [_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .handle[_ngcontent-%COMP%]   span.grippy[_ngcontent-%COMP%]:before{background-image:radial-gradient(#7b7b7b 40%,transparent 0);background-size:4px 4px;background-position:0 100%;background-repeat:repeat-x}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .handle[_ngcontent-%COMP%]   span.grippy[_ngcontent-%COMP%]:before{content:"";display:block;width:100%;height:33%}@media (max-width:1000px){[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]{height:auto;min-height:48px}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{display:block}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:inline-block;margin-left:0}}@media (max-width:400px){[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]{flex-flow:row wrap;align-items:inherit;width:100%;font-size:.9em}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .small-screen-icon[_ngcontent-%COMP%]{display:inline-block}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .handle[_ngcontent-%COMP%]{order:2;width:25%;text-align:center}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .handle[_ngcontent-%COMP%]   span.grippy[_ngcontent-%COMP%]{transform:rotate(0deg)}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{order:6;margin-left:0;margin-right:0;padding-right:0;padding-left:0;width:100%}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{margin-left:0;margin-right:0;padding-right:0;padding-left:0;overflow:hidden;text-overflow:ellipsis}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{width:100%;margin-left:0;margin-right:0;overflow:hidden;text-overflow:ellipsis}}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .agent[_ngcontent-%COMP%]{width:140px;font-size:.8em;padding-right:10px}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .expires[_ngcontent-%COMP%]{width:260px;font-size:.8em;padding-right:10px}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{flex-grow:1;padding-right:10px}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:.7em;text-transform:uppercase}@media (max-width:400px){[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .agent[_ngcontent-%COMP%], [_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .expires[_ngcontent-%COMP%]{width:100%}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{order:0;width:calc(100% - 30px)}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .remove[_ngcontent-%COMP%]{order:1}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .agent[_ngcontent-%COMP%]{order:2}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .expires[_ngcontent-%COMP%]{order:3}}']}),u),f=s("ZAI4");function v(n,t){if(1&n){var e=l.Tb();l.Sb(0,"label",8),l.Sb(1,"input",9),l.Zb("ngModelChange",function(n){return l.uc(e),l.cc().app.settings.theme=n})("ngModelChange",function(){return l.uc(e),l.cc().onChange()}),l.Rb(),l.Fc(2),l.dc(3,"titlecase"),l.Rb()}if(2&n){var o=t.$implicit,i=l.cc();l.Ab(1),l.jc("ngModel",i.app.settings.theme)("value",o.name),l.Ab(1),l.Gc(l.ec(3,3,o.name))}}var m,x=((m=function(){function n(t,e,o,s){i(this,n),this.router=t,this.app=e,this.settings=o,this.player=s,this.themes=f.b.themes}return o(n,[{key:"onChange",value:function(){this.settings.applySettings()}}]),n}()).\u0275fac=function(n){return new(n||m)(l.Mb(p.c),l.Mb(O.e),l.Mb(O.l),l.Mb(O.j))},m.\u0275cmp=l.Gb({type:m,selectors:[["app-page-settings"]],decls:21,vars:4,consts:[[1,"settings"],["section","Settings"],[1,"content"],[1,"section-title"],["class","select",4,"ngFor","ngForOf"],["type","checkbox","title","Show Waveform of Current Track",3,"ngModel","ngModelChange"],["type","checkbox","value","1",3,"ngModel","ngModelChange"],["type","checkbox","value","1","title","Show Notifications On Tracks Change",3,"ngModel","ngModelChange"],[1,"select"],["type","radio","name","theme",3,"ngModel","value","ngModelChange"]],template:function(n,t){1&n&&(l.Sb(0,"div",0),l.Nb(1,"app-view-header-slim",1),l.Sb(2,"div",2),l.Sb(3,"div",3),l.Fc(4,"Design"),l.Rb(),l.Sb(5,"div"),l.Sb(6,"fieldset"),l.Dc(7,v,4,5,"label",4),l.Rb(),l.Rb(),l.Sb(8,"div",3),l.Fc(9,"Player"),l.Rb(),l.Sb(10,"label"),l.Sb(11,"input",5),l.Zb("ngModelChange",function(n){return t.app.settings.showWaveform=n})("ngModelChange",function(){return t.onChange()}),l.Rb(),l.Fc(12," Show Waveform of Current Track "),l.Rb(),l.Sb(13,"div",3),l.Fc(14,"Playing"),l.Rb(),l.Sb(15,"label"),l.Sb(16,"input",6),l.Zb("ngModelChange",function(n){return t.app.settings.playingTrackInTitle=n})("ngModelChange",function(){return t.onChange()}),l.Rb(),l.Fc(17," Show Playing Track Name in Window Title "),l.Rb(),l.Sb(18,"label"),l.Sb(19,"input",7),l.Zb("ngModelChange",function(n){return t.app.settings.notificationSong=n})("ngModelChange",function(){return t.onChange()}),l.Rb(),l.Fc(20," Show Notification Popup On Track Change "),l.Rb(),l.Rb(),l.Rb()),2&n&&(l.Ab(7),l.jc("ngForOf",t.themes),l.Ab(4),l.jc("ngModel",t.app.settings.showWaveform),l.Ab(5),l.jc("ngModel",t.app.settings.playingTrackInTitle),l.Ab(3),l.jc("ngModel",t.app.settings.notificationSong))},directives:[C.a,a.k,r.a,r.e,r.h,r.k,r.b],pipes:[a.t],styles:["[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]{height:100%;overflow-y:auto;overflow-x:hidden}[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{padding:15px 15px 60px}[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]{text-transform:uppercase;letter-spacing:1.25px;font-size:13.2px;margin-bottom:10px;color:var(--on-control-ambient)}@media (max-width:522px){[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{padding-left:10px;padding-right:10px}}[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{display:block;padding-bottom:15px;color:var(--on-background-active)}[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%]{margin-top:-1px;display:inline-block;vertical-align:middle}[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   fieldset[_ngcontent-%COMP%]{margin-bottom:15px;width:auto;display:inline}[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   label.select[_ngcontent-%COMP%]{width:auto;padding-top:4px;padding-bottom:4px}[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   label.select[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{margin-right:10px}"]}),m);s("tk/3");var y=s("JffP"),w=s("XNiG"),k=s("1G5W"),S=s("24wo");function R(n,t){1&n&&l.Nb(0,"i",8)}function j(n,t){1&n&&(l.Sb(0,"span"),l.Fc(1,"Random Image"),l.Rb())}var F,A,N=((F=function(){function n(t,e,o,s){i(this,n),this.app=t,this.auth=e,this.jam=o,this.notify=s,this.refreshing=!1,this.unsubscribe=new w.a,this.refreshRandom=Object(y.a)()}return o(n,[{key:"ngOnDestroy",value:function(){this.unsubscribe.next(),this.unsubscribe.complete()}},{key:"onDropFile",value:function(n){var t;n.preventDefault(),this.uploadFile(null===(t=n.dataTransfer)||void 0===t?void 0:t.files)}},{key:"onDragOverFile",value:function(n){n.stopPropagation(),n.preventDefault()}},{key:"selectFile",value:function(n){this.uploadFile(n.target.files)}},{key:"uploadFile",value:function(n){var t=this;n&&0!==n.length&&this.auth.user&&this.jam.user.uploadUserImage({id:this.auth.user.id},n[0]).pipe(Object(k.a)(this.unsubscribe)).subscribe(function(n){},function(n){t.notify.error(n)},function(){t.refreshRandom=Object(y.a)(),t.notify.success("Upload done")})}},{key:"randomAvatar",value:function(){var n=this;!this.refreshing&&this.auth.user&&(this.refreshing=!0,this.jam.user.generateUserImage({id:this.auth.user.id}).then(function(){n.refreshing=!1,n.refreshRandom=Object(y.a)(),n.notify.success("Image randomized")}).catch(function(t){n.refreshing=!1,n.notify.error(t)}))}}]),n}()).\u0275fac=function(n){return new(n||F)(l.Mb(O.e),l.Mb(h.g),l.Mb(h.k),l.Mb(O.h))},F.\u0275cmp=l.Gb({type:F,selectors:[["app-user-avatar"]],decls:11,vars:6,consts:[[1,"drop-zone",3,"drop","dragover"],[1,"placeholder"],[3,"coverArtObj","size","round","refreshRandom"],[1,"button-primary",3,"click"],["class","icon-spin icon-spinner",4,"ngIf"],[4,"ngIf"],["id","file","type","file","placeholder","Upload image","accept",".png,.jpeg,.jpg",1,"inputfile",3,"change"],["for","file",1,"button-primary"],[1,"icon-spin","icon-spinner"]],template:function(n,t){1&n&&(l.Sb(0,"div",0),l.Zb("drop",function(n){return t.onDropFile(n)})("dragover",function(n){return t.onDragOverFile(n)}),l.Sb(1,"div",1),l.Fc(2," Drag an Image File here "),l.Rb(),l.Nb(3,"app-coverart-image",2),l.Sb(4,"button",3),l.Zb("click",function(){return t.randomAvatar()}),l.Dc(5,R,1,0,"i",4),l.Dc(6,j,2,0,"span",5),l.Rb(),l.Sb(7,"form"),l.Sb(8,"input",6),l.Zb("change",function(n){return t.selectFile(n)}),l.Rb(),l.Sb(9,"label",7),l.Fc(10,"Choose a file"),l.Rb(),l.Rb(),l.Rb()),2&n&&(l.Ab(3),l.jc("coverArtObj",t.auth.user)("size",100)("round",!0)("refreshRandom",t.refreshRandom),l.Ab(2),l.jc("ngIf",t.refreshing),l.Ab(1),l.jc("ngIf",!t.refreshing))},directives:[S.a,a.l,r.o,r.f,r.g],styles:["[_nghost-%COMP%]   .drop-zone[_ngcontent-%COMP%]{vertical-align:bottom;display:inline-block;min-width:220px;min-height:140px;margin-bottom:15px;margin-right:15px;border:2px dotted var(--secondary);padding-left:15px;padding-right:15px;padding-bottom:15px;text-align:center}[_nghost-%COMP%]   .drop-zone[_ngcontent-%COMP%]   app-coverart-image[_ngcontent-%COMP%]{margin:0 auto 10px}[_nghost-%COMP%]   .drop-zone[_ngcontent-%COMP%]   .inputfile[_ngcontent-%COMP%]{width:.1px;height:.1px;opacity:0;overflow:hidden;position:absolute;z-index:-1}[_nghost-%COMP%]   .drop-zone[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-bottom:10px}[_nghost-%COMP%]   .drop-zone[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], [_nghost-%COMP%]   .drop-zone[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{min-width:80%;display:inline-block}[_nghost-%COMP%]   .drop-zone[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{width:100%;display:block}[_nghost-%COMP%]   .drop-zone[_ngcontent-%COMP%]   .placeholder[_ngcontent-%COMP%]{width:100%;padding-top:15px;padding-bottom:15px;text-align:center;color:var(--on-control-ambient);font-size:.8em;text-transform:uppercase}"]}),F),z=s("Izb/"),I=s("PEb7"),T=s("nrPE"),D=((A=function(){function t(n,e,o){i(this,t),this.jam=n,this.auth=e,this.notify=o,this.base=[],this.favorites=[],this.played=[]}return o(t,[{key:"ngOnInit",value:function(){this.auth.isLoggedIn()&&this.refresh()}},{key:"refresh",value:function(){var n=this;this.jam.stats.user().then(function(e){n.favorites=t.buildStats(e.favorite,"/favorites"),n.played=t.buildStats(e.played,"/recently-played"),n.base=Object(I.f)([{text:"Bookmarks",link:"/library/bookmarks",value:e.bookmark},{text:"Playlists",link:"/library/playlists",value:e.playlist}],!0)}).catch(function(t){n.notify.error(t)})}}],[{key:"buildStats",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return Object(I.f)([{text:"Artists",link:"artists",value:t.artistTypes.album}].concat(n([{type:Object(z.f)(h.a.album),value:t.albumTypes.album},{type:Object(z.f)(h.a.compilation),value:t.albumTypes.compilation}].map(function(n){var t,e;return{text:null===(t=n.type)||void 0===t?void 0:t.text,link:""+(null===(e=n.type)||void 0===e?void 0:e.id),value:n.value}})),[{text:"Series",link:"series",value:t.series}],n([{type:Object(z.f)(h.a.audiobook),value:t.albumTypes.audiobook},{type:Object(z.f)(h.a.soundtrack),value:t.albumTypes.soundtrack},{type:Object(z.f)(h.a.live),value:t.albumTypes.live},{type:Object(z.f)(h.a.bootleg),value:t.albumTypes.bootleg},{type:Object(z.f)(h.a.ep),value:t.albumTypes.ep},{type:Object(z.f)(h.a.single),value:t.albumTypes.single}].map(function(n){var t,e;return{text:null===(t=n.type)||void 0===t?void 0:t.text,link:""+(null===(e=n.type)||void 0===e?void 0:e.id),value:n.value}})),[{text:"Folders",link:"folders",value:t.folder},{text:"Tracks",link:"tracks",value:t.track}]).map(function(n){return Object.assign(Object.assign({},n),{link:"/library/".concat(n.link).concat(e)})}))}}]),t}()).\u0275fac=function(n){return new(n||A)(l.Mb(h.k),l.Mb(h.g),l.Mb(O.h))},A.\u0275cmp=l.Gb({type:A,selectors:[["app-user-stats"]],decls:9,vars:3,consts:[[1,"section-title"],[3,"stats"]],template:function(n,t){1&n&&(l.Sb(0,"div",0),l.Fc(1,"Stats"),l.Rb(),l.Nb(2,"app-stats",1),l.Sb(3,"div",0),l.Fc(4,"Favorites"),l.Rb(),l.Nb(5,"app-stats",1),l.Sb(6,"div",0),l.Fc(7,"Played"),l.Rb(),l.Nb(8,"app-stats",1)),2&n&&(l.Ab(2),l.jc("stats",t.base),l.Ab(3),l.jc("stats",t.favorites),l.Ab(3),l.jc("stats",t.played))},directives:[T.a],styles:["[_nghost-%COMP%]   .section-title[_ngcontent-%COMP%]{text-transform:uppercase;letter-spacing:1.25px;font-size:13.2px;margin-top:15px;margin-bottom:10px;color:var(--on-control-ambient)}"]}),A);function L(n,t){1&n&&(l.Sb(0,"div"),l.Nb(1,"i",11),l.Fc(2," Stream Audio"),l.Rb())}function G(n,t){1&n&&(l.Sb(0,"div"),l.Nb(1,"i",11),l.Fc(2," Manage Podcasts"),l.Rb())}function U(n,t){1&n&&(l.Sb(0,"div"),l.Nb(1,"i",11),l.Fc(2," Upload Audio"),l.Rb())}function Z(n,t){1&n&&(l.Sb(0,"div"),l.Nb(1,"i",11),l.Fc(2," Server Administration"),l.Rb())}function E(n,t){if(1&n&&(l.Sb(0,"div",3),l.Sb(1,"div",4),l.Sb(2,"div",5),l.Sb(3,"div",6),l.Sb(4,"div",7),l.Fc(5,"Name"),l.Rb(),l.Sb(6,"div"),l.Fc(7),l.Rb(),l.Rb(),l.Sb(8,"div",6),l.Sb(9,"div",7),l.Fc(10,"Permissions"),l.Rb(),l.Sb(11,"div",8),l.Dc(12,L,3,0,"div",9),l.Dc(13,G,3,0,"div",9),l.Dc(14,U,3,0,"div",9),l.Dc(15,Z,3,0,"div",9),l.Rb(),l.Rb(),l.Rb(),l.Sb(16,"div",10),l.Sb(17,"div",7),l.Fc(18,"Avatar"),l.Rb(),l.Nb(19,"app-user-avatar"),l.Rb(),l.Rb(),l.Sb(20,"div",6),l.Nb(21,"app-user-stats"),l.Rb(),l.Rb()),2&n){var e=l.cc();l.Ab(7),l.Gc(e.auth.user.name),l.Ab(5),l.jc("ngIf",null==e.auth.user||null==e.auth.user.roles?null:e.auth.user.roles.stream),l.Ab(1),l.jc("ngIf",null==e.auth.user||null==e.auth.user.roles?null:e.auth.user.roles.podcast),l.Ab(1),l.jc("ngIf",null==e.auth.user||null==e.auth.user.roles?null:e.auth.user.roles.upload),l.Ab(1),l.jc("ngIf",null==e.auth.user||null==e.auth.user.roles?null:e.auth.user.roles.admin)}}var W,B=[{path:"",component:M,children:[{path:"",pathMatch:"full",component:(W=function n(t){i(this,n),this.auth=t},W.\u0275fac=function(n){return new(n||W)(l.Mb(h.g))},W.\u0275cmp=l.Gb({type:W,selectors:[["app-user-page"]],decls:3,vars:1,consts:[[1,"user"],["section","User"],["class","content",4,"ngIf"],[1,"content"],[1,"row"],[1,"column","first"],[1,"section"],[1,"section-title"],[1,"roles"],[4,"ngIf"],[1,"column"],[1,"icon-checkmark"]],template:function(n,t){1&n&&(l.Sb(0,"div",0),l.Nb(1,"app-view-header-slim",1),l.Dc(2,E,22,5,"div",2),l.Rb()),2&n&&(l.Ab(2),l.jc("ngIf",t.auth.user))},directives:[C.a,a.l,N,D],styles:["[_nghost-%COMP%]   .user[_ngcontent-%COMP%]{height:100%;overflow-y:auto;overflow-x:hidden}[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{padding:15px 15px 60px}[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]{text-transform:uppercase;letter-spacing:1.25px;font-size:13.2px;margin-bottom:10px;color:var(--on-control-ambient)}@media (max-width:522px){[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{padding-left:10px;padding-right:10px}}[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]{padding-bottom:30px}[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]{display:flex;flex-direction:row}[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]   .column.first[_ngcontent-%COMP%]{padding-right:30px}[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]   .column[_ngcontent-%COMP%]{flex:1}@media (max-width:400px){[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]{flex-direction:column}[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]   .column.first[_ngcontent-%COMP%]{padding-right:0}}"]}),W),canActivate:[d.a],data:{name:"User"}},{path:"settings",component:x,canActivate:[d.a],data:{name:"Settings"}},{path:"sessions",component:b,canActivate:[d.a],data:{name:"Sessions"}}]}],X=p.g.forChild(B),$=function(n){return[n]};function H(n,t){if(1&n&&(l.Sb(0,"a",6),l.Nb(1,"i"),l.Sb(2,"span"),l.Fc(3),l.Rb(),l.Rb()),2&n){var e=t.$implicit;l.jc("routerLink",l.oc(5,$,e.link))("routerLinkActiveOptions",e.options),l.Ab(1),l.Cb(e.icon),l.Ab(2),l.Gc(e.text)}}function J(n,t){if(1&n&&(l.Sb(0,"div",4),l.Dc(1,H,4,7,"a",5),l.Rb()),2&n){var e=l.cc();l.Ab(1),l.jc("ngForOf",e.sections)("ngForTrackBy",e.trackByFn)}}var K,Q,q=((K=function(){function n(t,e){i(this,n),this.app=t,this.router=e,this.collapsed={},this.sections=[],this.showMobileNavig=!1;var o=B[0],s=((null==o?void 0:o.children)||[]).filter(function(n){var t;return n.path&&n.path.length>0&&(null===(t=n.data)||void 0===t?void 0:t.name)}).map(function(n){var t,e=(null===(t=n.data)||void 0===t?void 0:t.link)?n.data.link:n.path;return{id:e,text:n.data?n.data.name:"",icon:n.data&&n.data.icon?n.data.icon:"icon-admin",link:"/user/"+e,options:{exact:!1}}});this.sections=[{id:"",text:"User",icon:"icon-user",link:"/user",options:{exact:!0}}].concat(s)}return o(n,[{key:"ngOnInit",value:function(){var n=this;this.app.view.currentSidebar=this,this.router.events.forEach(function(){n.showMobileNavig=!1}).catch(function(n){console.error(n)})}},{key:"ngOnDestroy",value:function(){this.app.view.currentSidebar=void 0}},{key:"trackByFn",value:function(n,t){return t.id}},{key:"toggleMobileNavig",value:function(){this.showMobileNavig=!this.showMobileNavig}}]),n}()).\u0275fac=function(n){return new(n||K)(l.Mb(O.e),l.Mb(p.c))},K.\u0275cmp=l.Gb({type:K,selectors:[["app-user-sidebar"]],decls:5,vars:5,consts:[[1,"navigation"],[1,"list"],[1,"header",3,"click"],["class","collapse",4,"ngIf"],[1,"collapse"],["class","item","routerLinkActive","active",3,"routerLink","routerLinkActiveOptions",4,"ngFor","ngForOf","ngForTrackBy"],["routerLinkActive","active",1,"item",3,"routerLink","routerLinkActiveOptions"]],template:function(n,t){1&n&&(l.Sb(0,"section",0),l.Sb(1,"div",1),l.Sb(2,"div",2),l.Zb("click",function(){return t.collapsed.main=!t.collapsed.main}),l.Fc(3,"User"),l.Rb(),l.Dc(4,J,2,2,"div",3),l.Rb(),l.Rb()),2&n&&(l.Eb("show",t.showMobileNavig),l.Ab(1),l.Eb("active",t.collapsed.main),l.Ab(3),l.jc("ngIf",!t.collapsed.main))},directives:[a.l,a.k,p.f,p.e],styles:['@charset "UTF-8";[_nghost-%COMP%]{position:relative;flex:0 1 100%;display:flex;flex-direction:column;height:100%}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]{padding:15px;flex-grow:1;width:100%;overflow-y:auto;overflow-x:hidden;background-color:var(--control);color:var(--on-control)}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]{display:flex;flex-flow:column wrap;margin-bottom:15px}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]{color:var(--on-control-ambient);font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-bottom:5px;cursor:pointer;border-right:3px solid transparent}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]:hover{color:var(--on-control-ambient-hover);border-right-color:var(--primary)}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]:after{font-family:jam;content:"\ue804";padding-left:4px}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]{color:var(--on-control);padding:5px 0;display:flex;flex-flow:row nowrap;align-items:center;border-right:3px solid transparent;transition:all .1s ease-in-out;transform-origin:left center}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]   app-coverart-image[_ngcontent-%COMP%]{margin-right:6px}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{width:25px;display:block}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]:hover{color:var(--on-control-hover);border-right-color:var(--primary)}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .item.active[_ngcontent-%COMP%]{transform:scale(1.1)}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]{margin-top:8px;padding-left:4px}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]{color:var(--on-control);font-size:14px;font-weight:700}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .active[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]:after{content:"\ue807"}@media (max-width:768px){[_nghost-%COMP%]{height:auto}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]{display:none;position:fixed;z-index:10;max-height:calc(100% - 60px);overflow-y:auto;flex-flow:row wrap;border-bottom:1px solid var(--control-box-border)}[_nghost-%COMP%]   .navigation.show[_ngcontent-%COMP%]{display:flex}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .index-list[_ngcontent-%COMP%]{display:none}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]{flex:1}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]{border-right-width:0}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]:after{content:""}}']}),K),V=s("uLy5"),Y=((Q=function n(){i(this,n)}).\u0275mod=l.Kb({type:Q}),Q.\u0275inj=l.Jb({factory:function(n){return new(n||Q)},imports:[[r.c,g.a,a.b,X]]}),Q);l.xc(M,[q,V.a,p.h],[])}}])}();