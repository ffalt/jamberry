!function(){"use strict";function n(n){return function(n){if(Array.isArray(n))return t(n)}(n)||function(n){if("undefined"!=typeof Symbol&&null!=n[Symbol.iterator]||null!=n["@@iterator"])return Array.from(n)}(n)||function(n,e){if(!n)return;if("string"==typeof n)return t(n,e);var o=Object.prototype.toString.call(n).slice(8,-1);"Object"===o&&n.constructor&&(o=n.constructor.name);if("Map"===o||"Set"===o)return Array.from(n);if("Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))return t(n,e)}(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function t(n,t){(null==t||t>n.length)&&(t=n.length);for(var e=0,o=new Array(t);e<t;e++)o[e]=n[e];return o}function e(n,t){for(var e=0;e<t.length;e++){var o=t[e];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(n,o.key,o)}}function o(n,t,o){return t&&e(n.prototype,t),o&&e(n,o),n}function s(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}(self.webpackChunkjamberry=self.webpackChunkjamberry||[]).push([[79],{29079:function(t,e,i){i.r(e),i.d(e,{UserModule:function(){return $}});var c,r=i(38583),g=i(90665),a=i(7838),l=i(37716),p=((c=function n(){s(this,n)}).\u0275fac=function(n){return new(n||c)},c.\u0275cmp=l.Xpm({type:c,selectors:[["app-user"]],decls:5,vars:0,consts:[[1,"left"],[1,"split-pane-divider-left"],["role","main",1,"middle"]],template:function(n,t){1&n&&(l.TgZ(0,"aside",0),l._UZ(1,"app-user-sidebar"),l.qZA(),l._UZ(2,"app-splitter",1),l.TgZ(3,"main",2),l._UZ(4,"router-outlet"),l.qZA())},styles:["[_nghost-%COMP%]{width:100%;height:100%;flex:1;display:flex;flex-flow:row nowrap;overflow:hidden;align-items:flex-start;align-content:flex-start}[_nghost-%COMP%]   .left[_ngcontent-%COMP%]{width:15%;height:100%}[_nghost-%COMP%]   .middle[_ngcontent-%COMP%]{width:60%;flex-grow:1;height:100%}[_nghost-%COMP%]   .right[_ngcontent-%COMP%]{width:25%;height:100%}@media (max-width: 1600px){[_nghost-%COMP%]   .left[_ngcontent-%COMP%]{width:20%}[_nghost-%COMP%]   .middle[_ngcontent-%COMP%]{width:55%;flex-grow:1;height:100%}[_nghost-%COMP%]   .right[_ngcontent-%COMP%]{width:25%;height:100%}}@media (max-width: 1400px){[_nghost-%COMP%]   .left[_ngcontent-%COMP%]{width:25%}[_nghost-%COMP%]   .right[_ngcontent-%COMP%], [_nghost-%COMP%]   .split-pane-divider-right[_ngcontent-%COMP%]{display:none}}@media (max-width: 768px){[_nghost-%COMP%]{overflow:auto;flex-flow:row wrap}[_nghost-%COMP%]   app-splitter[_ngcontent-%COMP%]{display:none}[_nghost-%COMP%]   .left[_ngcontent-%COMP%]{width:100%!important;height:auto}[_nghost-%COMP%]   .middle[_ngcontent-%COMP%]{height:auto}[_nghost-%COMP%]   .right[_ngcontent-%COMP%]{width:100%!important;height:auto}}@media (max-width: 522px){[_nghost-%COMP%]{overflow:hidden;height:auto}}"]}),c),d=i(76277),u=i(34661),_=i(75723),h=i(60918),C=i(95197);function O(n,t){if(1&n){var e=l.EpF();l.TgZ(0,"div",7),l.TgZ(1,"div",8),l._uU(2),l._UZ(3,"br"),l._uU(4),l.qZA(),l.TgZ(5,"div",9),l._uU(6),l._UZ(7,"br"),l.TgZ(8,"span"),l._uU(9),l.qZA(),l.qZA(),l.TgZ(10,"div",10),l.TgZ(11,"span",11),l._uU(12,"valid until:"),l.qZA(),l._UZ(13,"br"),l._uU(14),l.ALo(15,"date"),l.qZA(),l.TgZ(16,"div",12),l.TgZ(17,"button",13),l.NdJ("click",function(){var n=l.CHM(e).$implicit;return l.oxw(2).remove(n)}),l._UZ(18,"i",14),l.qZA(),l.qZA(),l.qZA()}if(2&n){var o=t.$implicit;l.xp6(2),l.hij(" ",o.agent,""),l.xp6(2),l.hij(" ",o.os," "),l.xp6(2),l.hij(" ",o.client,""),l.xp6(3),l.Oqu(o.mode),l.xp6(5),l.hij(" ",l.xi3(15,5,o.expires,"long")," ")}}function M(n,t){if(1&n&&(l.TgZ(0,"div",3),l.TgZ(1,"div",4),l.TgZ(2,"div",5),l._uU(3,"Sessions"),l.qZA(),l.YNc(4,O,19,8,"div",6),l.qZA(),l.qZA()),2&n){var e=l.oxw();l.xp6(4),l.Q6J("ngForOf",e.sessions)}}var P=function(){var n=function(){function n(t,e,o){s(this,n),this.jam=t,this.auth=e,this.notify=o}return o(n,[{key:"ngOnInit",value:function(){this.auth.isLoggedIn()&&this.refresh()}},{key:"remove",value:function(n){var t=this,e=n.id;this.jam.session.remove({id:e}).then(function(){t.sessions&&(t.sessions=t.sessions.filter(function(n){return n.id!==e})),t.notify.success("Session Login removed")}).catch(function(n){t.notify.error(n)})}},{key:"refresh",value:function(){var n=this;this.jam.session.list().then(function(t){n.sessions=t}).catch(function(t){n.notify.error(t)})}}]),n}();return n.\u0275fac=function(t){return new(t||n)(l.Y36(_.K4),l.Y36(_.$X),l.Y36(h.c))},n.\u0275cmp=l.Xpm({type:n,selectors:[["app-sessions-page"]],decls:3,vars:1,consts:[[1,"sessions"],["section","Session Logins"],["class","content",4,"ngIf"],[1,"content"],[1,"session-list"],[1,"section-title"],["class","session",4,"ngFor","ngForOf"],[1,"session"],[1,"agent"],[1,"title"],[1,"expires"],[1,"label"],[1,"remove"],["title","Remove this login",3,"click"],["aria-hidden","true",1,"icon-remove"]],template:function(n,t){1&n&&(l.TgZ(0,"div",0),l._UZ(1,"app-view-header-slim",1),l.YNc(2,M,5,1,"div",2),l.qZA()),2&n&&(l.xp6(2),l.Q6J("ngIf",t.sessions))},directives:[C.p,r.O5,r.sg],pipes:[r.uU],styles:['[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]{height:100%;overflow-y:auto;overflow-x:hidden}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{padding:15px 15px 60px}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]{text-transform:uppercase;letter-spacing:1.25px;font-size:13.2px;margin-bottom:10px;color:var(--on-control-ambient)}@media (max-width: 522px){[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{padding-left:10px;padding-right:10px}}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]{display:flex;flex-flow:column wrap;-webkit-user-select:none;-moz-user-select:none;user-select:none;width:100%;padding-top:5px;background-color:var(--background);color:var(--on-background)}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]{min-height:48px;display:flex;flex-flow:row nowrap;align-items:center;align-content:space-evenly;width:100%;padding:10px;line-height:1.25em;margin-bottom:1px;border-top-width:1px;border-top-style:solid;border-bottom-width:0;border-bottom-style:solid;border-bottom-color:var(--background-border);border-top-color:var(--background-border)}@media (max-width: 1000px){[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]{height:auto}}@media (max-width: 522px){[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]{font-size:.9em}}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]:hover{background-color:var(--background-hover)}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]:last-child{border-bottom-width:1px}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .small-screen-icon[_ngcontent-%COMP%]{display:none}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{color:var(--on-background-active)}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:var(--on-background);font-size:.8em}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{padding:0;display:inline-block;margin:0 10px 0 0}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{font-size:.8em;vertical-align:middle}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   a.title-link[_ngcontent-%COMP%]{font-size:inherit;margin-right:10px;color:var(--on-background-active)}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:var(--on-background)}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{color:var(--on-background-hover)}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .handle[_ngcontent-%COMP%]{width:0;margin-left:0;cursor:move}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .handle[_ngcontent-%COMP%]   span.grippy[_ngcontent-%COMP%]{display:inline-block;width:26px;height:8px;transform:rotate(90deg);margin-left:-8px}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .handle[_ngcontent-%COMP%]   span.grippy[_ngcontent-%COMP%], [_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .handle[_ngcontent-%COMP%]   span.grippy[_ngcontent-%COMP%]:before{background-image:radial-gradient(#7b7b7b 40%,transparent 40%);background-size:4px 4px;background-position:0 100%;background-repeat:repeat-x}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .handle[_ngcontent-%COMP%]   span.grippy[_ngcontent-%COMP%]:before{content:"";display:block;width:100%;height:33%}@media (max-width: 1000px){[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]{height:auto;min-height:48px}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{display:block}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:inline-block;margin-left:0}}@media (max-width: 400px){[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]{flex-flow:row wrap;align-items:inherit;width:100%;font-size:.9em}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .small-screen-icon[_ngcontent-%COMP%]{display:inline-block}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .handle[_ngcontent-%COMP%]{order:2;width:25%;text-align:center}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .handle[_ngcontent-%COMP%]   span.grippy[_ngcontent-%COMP%]{transform:rotate(0)}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{order:6;margin-left:0;margin-right:0;padding-right:0;padding-left:0;width:100%}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{margin-left:0;margin-right:0;padding-right:0;padding-left:0;overflow:hidden;text-overflow:ellipsis}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{width:100%;margin-left:0;margin-right:0;overflow:hidden;text-overflow:ellipsis}}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .agent[_ngcontent-%COMP%]{width:140px;font-size:.8em;padding-right:10px}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .expires[_ngcontent-%COMP%]{width:260px;font-size:.8em;padding-right:10px}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{flex-grow:1;padding-right:10px}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:.7em;text-transform:uppercase}@media (max-width: 400px){[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .agent[_ngcontent-%COMP%], [_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .expires[_ngcontent-%COMP%]{width:100%}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{order:0;width:calc(100% - 30px)}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .remove[_ngcontent-%COMP%]{order:1}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .agent[_ngcontent-%COMP%]{order:2}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .expires[_ngcontent-%COMP%]{order:3}}']}),n}(),f=i(24450);function m(n,t){if(1&n){var e=l.EpF();l.TgZ(0,"label",8),l.TgZ(1,"input",9),l.NdJ("ngModelChange",function(n){return l.CHM(e),l.oxw().app.settings.theme=n})("ngModelChange",function(){return l.CHM(e),l.oxw().onChange()}),l.qZA(),l._uU(2),l.ALo(3,"titlecase"),l.qZA()}if(2&n){var o=t.$implicit,s=l.oxw();l.xp6(1),l.Q6J("ngModel",s.app.settings.theme)("value",o.name),l.xp6(1),l.Oqu(l.lcZ(3,3,o.name))}}var v=function(){var n=function(){function n(t,e,o,i){s(this,n),this.router=t,this.app=e,this.settings=o,this.player=i,this.themes=f.c6.themes}return o(n,[{key:"onChange",value:function(){this.settings.applySettings()}}]),n}();return n.\u0275fac=function(t){return new(t||n)(l.Y36(d.F0),l.Y36(h.zi),l.Y36(h.G2),l.Y36(h.lk))},n.\u0275cmp=l.Xpm({type:n,selectors:[["app-page-settings"]],decls:21,vars:4,consts:[[1,"settings"],["section","Settings"],[1,"content"],[1,"section-title"],["class","select",4,"ngFor","ngForOf"],["type","checkbox","title","Show Waveform of Current Track",3,"ngModel","ngModelChange"],["type","checkbox","value","1",3,"ngModel","ngModelChange"],["type","checkbox","value","1","title","Show Notifications On Tracks Change",3,"ngModel","ngModelChange"],[1,"select"],["type","radio","name","theme",3,"ngModel","value","ngModelChange"]],template:function(n,t){1&n&&(l.TgZ(0,"div",0),l._UZ(1,"app-view-header-slim",1),l.TgZ(2,"div",2),l.TgZ(3,"div",3),l._uU(4,"Design"),l.qZA(),l.TgZ(5,"div"),l.TgZ(6,"fieldset"),l.YNc(7,m,4,5,"label",4),l.qZA(),l.qZA(),l.TgZ(8,"div",3),l._uU(9,"Player"),l.qZA(),l.TgZ(10,"label"),l.TgZ(11,"input",5),l.NdJ("ngModelChange",function(n){return t.app.settings.showWaveform=n})("ngModelChange",function(){return t.onChange()}),l.qZA(),l._uU(12," Show Waveform of Current Track "),l.qZA(),l.TgZ(13,"div",3),l._uU(14,"Playing"),l.qZA(),l.TgZ(15,"label"),l.TgZ(16,"input",6),l.NdJ("ngModelChange",function(n){return t.app.settings.playingTrackInTitle=n})("ngModelChange",function(){return t.onChange()}),l.qZA(),l._uU(17," Show Playing Track Name in Window Title "),l.qZA(),l.TgZ(18,"label"),l.TgZ(19,"input",7),l.NdJ("ngModelChange",function(n){return t.app.settings.notificationSong=n})("ngModelChange",function(){return t.onChange()}),l.qZA(),l._uU(20," Show Notification Popup On Track Change "),l.qZA(),l.qZA(),l.qZA()),2&n&&(l.xp6(7),l.Q6J("ngForOf",t.themes),l.xp6(4),l.Q6J("ngModel",t.app.settings.showWaveform),l.xp6(5),l.Q6J("ngModel",t.app.settings.playingTrackInTitle),l.xp6(3),l.Q6J("ngModel",t.app.settings.notificationSong))},directives:[C.p,r.sg,g.Wl,g.JJ,g.On,g._,g.Fj],pipes:[r.rS],styles:["[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]{height:100%;overflow-y:auto;overflow-x:hidden}[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{padding:15px 15px 60px}[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]{text-transform:uppercase;letter-spacing:1.25px;font-size:13.2px;margin-bottom:10px;color:var(--on-control-ambient)}@media (max-width: 522px){[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{padding-left:10px;padding-right:10px}}[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{display:block;padding-bottom:15px;color:var(--on-background-active)}[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%]{margin-top:-1px;display:inline-block;vertical-align:middle}[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   fieldset[_ngcontent-%COMP%]{margin-bottom:15px;width:auto;display:inline}[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   label.select[_ngcontent-%COMP%]{width:auto;padding-top:4px;padding-bottom:4px}[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   label.select[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{margin-right:10px}"]}),n}();i(91841);var x=i(69100),b=i(79765),y=i(46782),Z=i(97254);function w(n,t){1&n&&l._UZ(0,"i",8)}function k(n,t){1&n&&(l.TgZ(0,"span"),l._uU(1,"Random Image"),l.qZA())}var A=function(){var n=function(){function n(t,e,o,i){s(this,n),this.app=t,this.auth=e,this.jam=o,this.notify=i,this.refreshing=!1,this.unsubscribe=new b.xQ,this.refreshRandom=(0,x.O)()}return o(n,[{key:"ngOnDestroy",value:function(){this.unsubscribe.next(),this.unsubscribe.complete()}},{key:"onDropFile",value:function(n){var t;n.preventDefault(),this.uploadFile(null===(t=n.dataTransfer)||void 0===t?void 0:t.files)}},{key:"onDragOverFile",value:function(n){n.stopPropagation(),n.preventDefault()}},{key:"selectFile",value:function(n){this.uploadFile(n.target.files)}},{key:"uploadFile",value:function(n){var t=this;n&&0!==n.length&&this.auth.user&&this.jam.user.uploadUserImage({id:this.auth.user.id},n[0]).pipe((0,y.R)(this.unsubscribe)).subscribe(function(n){},function(n){t.notify.error(n)},function(){t.refreshRandom=(0,x.O)(),t.notify.success("Upload done")})}},{key:"randomAvatar",value:function(){var n=this;this.refreshing||!this.auth.user||(this.refreshing=!0,this.jam.user.generateUserImage({id:this.auth.user.id}).then(function(){n.refreshing=!1,n.refreshRandom=(0,x.O)(),n.notify.success("Image randomized")}).catch(function(t){n.refreshing=!1,n.notify.error(t)}))}}]),n}();return n.\u0275fac=function(t){return new(t||n)(l.Y36(h.zi),l.Y36(_.$X),l.Y36(_.K4),l.Y36(h.c))},n.\u0275cmp=l.Xpm({type:n,selectors:[["app-user-avatar"]],decls:11,vars:6,consts:[[1,"drop-zone",3,"drop","dragover"],[1,"placeholder"],[3,"coverArtObj","size","round","refreshRandom"],[1,"button-primary",3,"click"],["class","icon-spin icon-spinner",4,"ngIf"],[4,"ngIf"],["id","file","type","file","placeholder","Upload image","accept",".png,.jpeg,.jpg",1,"inputfile",3,"change"],["for","file",1,"button-primary"],[1,"icon-spin","icon-spinner"]],template:function(n,t){1&n&&(l.TgZ(0,"div",0),l.NdJ("drop",function(n){return t.onDropFile(n)})("dragover",function(n){return t.onDragOverFile(n)}),l.TgZ(1,"div",1),l._uU(2," Drag an Image File here "),l.qZA(),l._UZ(3,"app-coverart-image",2),l.TgZ(4,"button",3),l.NdJ("click",function(){return t.randomAvatar()}),l.YNc(5,w,1,0,"i",4),l.YNc(6,k,2,0,"span",5),l.qZA(),l.TgZ(7,"form"),l.TgZ(8,"input",6),l.NdJ("change",function(n){return t.selectFile(n)}),l.qZA(),l.TgZ(9,"label",7),l._uU(10,"Choose a file"),l.qZA(),l.qZA(),l.qZA()),2&n&&(l.xp6(3),l.Q6J("coverArtObj",t.auth.user)("size",100)("round",!0)("refreshRandom",t.refreshRandom),l.xp6(2),l.Q6J("ngIf",t.refreshing),l.xp6(1),l.Q6J("ngIf",!t.refreshing))},directives:[Z.A,r.O5,g._Y,g.JL,g.F],styles:["[_nghost-%COMP%]   .drop-zone[_ngcontent-%COMP%]{vertical-align:bottom;display:inline-block;min-width:220px;min-height:140px;border-width:2px;margin-bottom:15px;margin-right:15px;border-style:dotted;border-color:var(--secondary);padding-left:15px;padding-right:15px;padding-bottom:15px;text-align:center}[_nghost-%COMP%]   .drop-zone[_ngcontent-%COMP%]   app-coverart-image[_ngcontent-%COMP%]{margin:0 auto 10px}[_nghost-%COMP%]   .drop-zone[_ngcontent-%COMP%]   .inputfile[_ngcontent-%COMP%]{width:.1px;height:.1px;opacity:0;overflow:hidden;position:absolute;z-index:-1}[_nghost-%COMP%]   .drop-zone[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-bottom:10px;min-width:80%;display:inline-block}[_nghost-%COMP%]   .drop-zone[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{display:inline-block;min-width:80%}[_nghost-%COMP%]   .drop-zone[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{width:100%;display:block}[_nghost-%COMP%]   .drop-zone[_ngcontent-%COMP%]   .placeholder[_ngcontent-%COMP%]{width:100%;padding-top:15px;padding-bottom:15px;text-align:center;color:var(--on-control-ambient);font-size:.8em;text-transform:uppercase}"]}),n}(),T=i(67111),U=i(89888),q=i(81362),z=function(){var t=function(){function t(n,e,o){s(this,t),this.jam=n,this.auth=e,this.notify=o,this.base=[],this.favorites=[],this.played=[]}return o(t,[{key:"ngOnInit",value:function(){this.auth.isLoggedIn()&&this.refresh()}},{key:"refresh",value:function(){var n=this;this.jam.stats.user().then(function(e){n.favorites=t.buildStats(e.favorite,"/favorites"),n.played=t.buildStats(e.played,"/recently-played"),n.base=(0,U.$m)([{text:"Bookmarks",link:"/library/bookmarks",value:e.bookmark},{text:"Playlists",link:"/library/playlists",value:e.playlist}],!0)}).catch(function(t){n.notify.error(t)})}}],[{key:"buildStats",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return(0,U.$m)([{text:"Artists",link:"artists",value:t.artistTypes.album}].concat(n([{type:(0,T.tr)(_.VZ.album),value:t.albumTypes.album},{type:(0,T.tr)(_.VZ.compilation),value:t.albumTypes.compilation}].map(function(n){var t,e;return{text:null===(t=n.type)||void 0===t?void 0:t.text,link:"".concat(null===(e=n.type)||void 0===e?void 0:e.id),value:n.value}})),[{text:"Series",link:"series",value:t.series}],n([{type:(0,T.tr)(_.VZ.audiobook),value:t.albumTypes.audiobook},{type:(0,T.tr)(_.VZ.soundtrack),value:t.albumTypes.soundtrack},{type:(0,T.tr)(_.VZ.live),value:t.albumTypes.live},{type:(0,T.tr)(_.VZ.bootleg),value:t.albumTypes.bootleg},{type:(0,T.tr)(_.VZ.ep),value:t.albumTypes.ep},{type:(0,T.tr)(_.VZ.single),value:t.albumTypes.single}].map(function(n){var t,e;return{text:null===(t=n.type)||void 0===t?void 0:t.text,link:"".concat(null===(e=n.type)||void 0===e?void 0:e.id),value:n.value}})),[{text:"Folders",link:"folders",value:t.folder},{text:"Tracks",link:"tracks",value:t.track}]).map(function(n){return Object.assign(Object.assign({},n),{link:"/library/".concat(n.link).concat(e)})}))}}]),t}();return t.\u0275fac=function(n){return new(n||t)(l.Y36(_.K4),l.Y36(_.$X),l.Y36(h.c))},t.\u0275cmp=l.Xpm({type:t,selectors:[["app-user-stats"]],decls:9,vars:3,consts:[[1,"section-title"],[3,"stats"]],template:function(n,t){1&n&&(l.TgZ(0,"div",0),l._uU(1,"Stats"),l.qZA(),l._UZ(2,"app-stats",1),l.TgZ(3,"div",0),l._uU(4,"Favorites"),l.qZA(),l._UZ(5,"app-stats",1),l.TgZ(6,"div",0),l._uU(7,"Played"),l.qZA(),l._UZ(8,"app-stats",1)),2&n&&(l.xp6(2),l.Q6J("stats",t.base),l.xp6(3),l.Q6J("stats",t.favorites),l.xp6(3),l.Q6J("stats",t.played))},directives:[q._],styles:["[_nghost-%COMP%]   .section-title[_ngcontent-%COMP%]{text-transform:uppercase;letter-spacing:1.25px;font-size:13.2px;margin-top:15px;margin-bottom:10px;color:var(--on-control-ambient)}"]}),t}();function J(n,t){1&n&&(l.TgZ(0,"div"),l._UZ(1,"i",11),l._uU(2," Stream Audio"),l.qZA())}function S(n,t){1&n&&(l.TgZ(0,"div"),l._UZ(1,"i",11),l._uU(2," Manage Podcasts"),l.qZA())}function I(n,t){1&n&&(l.TgZ(0,"div"),l._UZ(1,"i",11),l._uU(2," Upload Audio"),l.qZA())}function j(n,t){1&n&&(l.TgZ(0,"div"),l._UZ(1,"i",11),l._uU(2," Server Administration"),l.qZA())}function Y(n,t){if(1&n&&(l.TgZ(0,"div",3),l.TgZ(1,"div",4),l.TgZ(2,"div",5),l.TgZ(3,"div",6),l.TgZ(4,"div",7),l._uU(5,"Name"),l.qZA(),l.TgZ(6,"div"),l._uU(7),l.qZA(),l.qZA(),l.TgZ(8,"div",6),l.TgZ(9,"div",7),l._uU(10,"Permissions"),l.qZA(),l.TgZ(11,"div",8),l.YNc(12,J,3,0,"div",9),l.YNc(13,S,3,0,"div",9),l.YNc(14,I,3,0,"div",9),l.YNc(15,j,3,0,"div",9),l.qZA(),l.qZA(),l.qZA(),l.TgZ(16,"div",10),l.TgZ(17,"div",7),l._uU(18,"Avatar"),l.qZA(),l._UZ(19,"app-user-avatar"),l.qZA(),l.qZA(),l.TgZ(20,"div",6),l._UZ(21,"app-user-stats"),l.qZA(),l.qZA()),2&n){var e=l.oxw();l.xp6(7),l.Oqu(e.auth.user.name),l.xp6(5),l.Q6J("ngIf",null==e.auth.user||null==e.auth.user.roles?null:e.auth.user.roles.stream),l.xp6(1),l.Q6J("ngIf",null==e.auth.user||null==e.auth.user.roles?null:e.auth.user.roles.podcast),l.xp6(1),l.Q6J("ngIf",null==e.auth.user||null==e.auth.user.roles?null:e.auth.user.roles.upload),l.xp6(1),l.Q6J("ngIf",null==e.auth.user||null==e.auth.user.roles?null:e.auth.user.roles.admin)}}var F=[{path:"",component:p,children:[{path:"",pathMatch:"full",component:function(){var n=function n(t){s(this,n),this.auth=t};return n.\u0275fac=function(t){return new(t||n)(l.Y36(_.$X))},n.\u0275cmp=l.Xpm({type:n,selectors:[["app-user-page"]],decls:3,vars:1,consts:[[1,"user"],["section","User"],["class","content",4,"ngIf"],[1,"content"],[1,"row"],[1,"column","first"],[1,"section"],[1,"section-title"],[1,"roles"],[4,"ngIf"],[1,"column"],[1,"icon-checkmark"]],template:function(n,t){1&n&&(l.TgZ(0,"div",0),l._UZ(1,"app-view-header-slim",1),l.YNc(2,Y,22,5,"div",2),l.qZA()),2&n&&(l.xp6(2),l.Q6J("ngIf",t.auth.user))},directives:[C.p,r.O5,A,z],styles:["[_nghost-%COMP%]   .user[_ngcontent-%COMP%]{height:100%;overflow-y:auto;overflow-x:hidden}[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{padding:15px 15px 60px}[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]{text-transform:uppercase;letter-spacing:1.25px;font-size:13.2px;margin-bottom:10px;color:var(--on-control-ambient)}@media (max-width: 522px){[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{padding-left:10px;padding-right:10px}}[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]{padding-bottom:30px}[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]{display:flex;flex-direction:row}[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]   .column.first[_ngcontent-%COMP%]{padding-right:30px}[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]   .column[_ngcontent-%COMP%]{flex:1}@media (max-width: 400px){[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]{flex-direction:column}[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]   .column.first[_ngcontent-%COMP%]{padding-right:0}}"]}),n}(),canActivate:[u.aH],data:{name:"User"}},{path:"settings",component:v,canActivate:[u.aH],data:{name:"Settings"}},{path:"sessions",component:P,canActivate:[u.aH],data:{name:"Sessions",icon:"icon-laptop"}}]}],N=d.Bz.forChild(F),Q=i(40327),X=function(){var n=function n(){s(this,n),this.sections=[];var t=F[0],e=((null==t?void 0:t.children)||[]).filter(function(n){var t;return n.path&&n.path.length>0&&(null===(t=n.data)||void 0===t?void 0:t.name)}).map(function(n){var t,e=(null===(t=n.data)||void 0===t?void 0:t.link)?n.data.link:n.path;return{name:n.data?n.data.name:"",icon:n.data&&n.data.icon?n.data.icon:"icon-admin",link:"/user/".concat(e)}});this.sections=[{name:"User",entries:[{name:"Profile",icon:"icon-user",link:"/user",options:{exact:!0}}].concat(e)}]};return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=l.Xpm({type:n,selectors:[["app-user-sidebar"]],decls:1,vars:1,consts:[[3,"sections"]],template:function(n,t){1&n&&l._UZ(0,"app-sidebar",0),2&n&&l.Q6J("sections",t.sections)},directives:[Q.k],styles:["[_nghost-%COMP%]{width:100%;height:100%;display:block}"]}),n}(),R=i(40150),$=function(){var n=function n(){s(this,n)};return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=l.oAB({type:n}),n.\u0275inj=l.cJS({imports:[[g.u5,a.m,r.ez,N]]}),n}();l.B6R(p,[X,R.H,d.lC],[])}}])}();