"use strict";(self.webpackChunkjamberry=self.webpackChunkjamberry||[]).push([[79],{29079:function(n,t,e){e.r(t),e.d(t,{UserModule:function(){return L}});var o=e(38583),s=e(90665),i=e(72271),g=e(37716);let c=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=g.Xpm({type:n,selectors:[["app-user"]],decls:5,vars:0,consts:[[1,"left"],[1,"split-pane-divider-left"],[1,"middle"]],template:function(n,t){1&n&&(g.TgZ(0,"div",0),g._UZ(1,"app-user-sidebar"),g.qZA(),g._UZ(2,"app-splitter",1),g.TgZ(3,"div",2),g._UZ(4,"router-outlet"),g.qZA())},styles:["[_nghost-%COMP%]{width:100%;height:100%;flex:1;display:flex;flex-flow:row nowrap;overflow:hidden;align-items:flex-start;align-content:flex-start}[_nghost-%COMP%]   .left[_ngcontent-%COMP%]{width:15%;height:100%}[_nghost-%COMP%]   .middle[_ngcontent-%COMP%]{width:60%;flex-grow:1;height:100%}[_nghost-%COMP%]   .right[_ngcontent-%COMP%]{width:25%;height:100%}@media (max-width: 1600px){[_nghost-%COMP%]   .left[_ngcontent-%COMP%]{width:20%}[_nghost-%COMP%]   .middle[_ngcontent-%COMP%]{width:55%;flex-grow:1;height:100%}[_nghost-%COMP%]   .right[_ngcontent-%COMP%]{width:25%;height:100%}}@media (max-width: 1400px){[_nghost-%COMP%]   .left[_ngcontent-%COMP%]{width:25%}[_nghost-%COMP%]   .right[_ngcontent-%COMP%], [_nghost-%COMP%]   .split-pane-divider-right[_ngcontent-%COMP%]{display:none}}@media (max-width: 768px){[_nghost-%COMP%]{overflow:auto;flex-flow:row wrap}[_nghost-%COMP%]   app-splitter[_ngcontent-%COMP%]{display:none}[_nghost-%COMP%]   .left[_ngcontent-%COMP%]{width:100%!important;height:auto}[_nghost-%COMP%]   .middle[_ngcontent-%COMP%]{height:auto}[_nghost-%COMP%]   .right[_ngcontent-%COMP%]{width:100%!important;height:auto}}@media (max-width: 522px){[_nghost-%COMP%]{overflow:hidden;height:auto}}"]}),n})();var r=e(76277),a=e(34661),l=e(75723),p=e(60918),d=e(95197);function _(n,t){if(1&n){const n=g.EpF();g.TgZ(0,"div",7),g.TgZ(1,"div",8),g._uU(2),g._UZ(3,"br"),g._uU(4),g.qZA(),g.TgZ(5,"div",9),g._uU(6),g._UZ(7,"br"),g.TgZ(8,"span"),g._uU(9),g.qZA(),g.qZA(),g.TgZ(10,"div",10),g.TgZ(11,"span",11),g._uU(12,"valid until:"),g.qZA(),g._UZ(13,"br"),g._uU(14),g.ALo(15,"date"),g.qZA(),g.TgZ(16,"div",12),g.TgZ(17,"a",13),g.NdJ("click",function(){const t=g.CHM(n).$implicit;return g.oxw(2).remove(t)}),g._UZ(18,"i",14),g.qZA(),g.qZA(),g.qZA()}if(2&n){const n=t.$implicit;g.xp6(2),g.hij(" ",n.agent,""),g.xp6(2),g.hij(" ",n.os," "),g.xp6(2),g.hij(" ",n.client,""),g.xp6(3),g.Oqu(n.mode),g.xp6(5),g.hij(" ",g.xi3(15,5,n.expires,"long")," ")}}function h(n,t){if(1&n&&(g.TgZ(0,"div",3),g.TgZ(1,"div",4),g.TgZ(2,"div",5),g._uU(3,"Sessions"),g.qZA(),g.YNc(4,_,19,8,"div",6),g.qZA(),g.qZA()),2&n){const n=g.oxw();g.xp6(4),g.Q6J("ngForOf",n.sessions)}}let O=(()=>{class n{constructor(n,t,e){this.jam=n,this.auth=t,this.notify=e}ngOnInit(){this.auth.isLoggedIn()&&this.refresh()}remove(n){const t=n.id;this.jam.session.remove({id:t}).then(()=>{this.sessions&&(this.sessions=this.sessions.filter(n=>n.id!==t)),this.notify.success("Session Login removed")}).catch(n=>{this.notify.error(n)})}refresh(){this.jam.session.list().then(n=>{this.sessions=n}).catch(n=>{this.notify.error(n)})}}return n.\u0275fac=function(t){return new(t||n)(g.Y36(l.K4),g.Y36(l.$X),g.Y36(p.c))},n.\u0275cmp=g.Xpm({type:n,selectors:[["app-sessions-page"]],decls:3,vars:1,consts:[[1,"sessions"],["section","Session Logins"],["class","content",4,"ngIf"],[1,"content"],[1,"session-list"],[1,"section-title"],["class","session",4,"ngFor","ngForOf"],[1,"session"],[1,"agent"],[1,"title"],[1,"expires"],[1,"label"],[1,"remove"],["title","Remove this login",3,"click"],[1,"icon-remove"]],template:function(n,t){1&n&&(g.TgZ(0,"div",0),g._UZ(1,"app-view-header-slim",1),g.YNc(2,h,5,1,"div",2),g.qZA()),2&n&&(g.xp6(2),g.Q6J("ngIf",t.sessions))},directives:[d.p,o.O5,o.sg],pipes:[o.uU],styles:['[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]{height:100%;overflow-y:auto;overflow-x:hidden}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{padding:15px 15px 60px}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]{text-transform:uppercase;letter-spacing:1.25px;font-size:13.2px;margin-bottom:10px;color:var(--on-control-ambient)}@media (max-width: 522px){[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{padding-left:10px;padding-right:10px}}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]{display:flex;flex-flow:column wrap;-webkit-user-select:none;-moz-user-select:none;user-select:none;width:100%;padding-top:5px;background-color:var(--background);color:var(--on-background)}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]{min-height:48px;display:flex;flex-flow:row nowrap;align-items:center;align-content:space-evenly;width:100%;padding:10px;line-height:1.25em;border-top-width:1px;border-top-style:solid;border-bottom-width:0;border-bottom-style:solid;border-bottom-color:var(--background-border);border-top-color:var(--background-border)}@media (max-width: 1000px){[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]{height:auto}}@media (max-width: 522px){[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]{font-size:.9em}}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]:hover{background-color:var(--background-hover)}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]:last-child{border-bottom-width:1px}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .small-screen-icon[_ngcontent-%COMP%]{display:none}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{color:var(--on-background-active)}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:var(--on-background);font-size:.8em}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{padding:0;display:inline-block;margin:0 10px 0 0}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{font-size:.8em;vertical-align:middle}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   a.title-link[_ngcontent-%COMP%]{font-size:inherit;margin-right:10px;color:var(--on-background-active)}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:var(--on-background)}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{color:var(--on-background-hover)}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .handle[_ngcontent-%COMP%]{width:0;margin-left:0;cursor:move}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .handle[_ngcontent-%COMP%]   span.grippy[_ngcontent-%COMP%]{display:inline-block;width:26px;height:8px;transform:rotate(90deg);margin-left:-8px}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .handle[_ngcontent-%COMP%]   span.grippy[_ngcontent-%COMP%], [_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .handle[_ngcontent-%COMP%]   span.grippy[_ngcontent-%COMP%]:before{background-image:radial-gradient(#7b7b7b 40%,transparent 40%);background-size:4px 4px;background-position:0 100%;background-repeat:repeat-x}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .handle[_ngcontent-%COMP%]   span.grippy[_ngcontent-%COMP%]:before{content:"";display:block;width:100%;height:33%}@media (max-width: 1000px){[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]{height:auto;min-height:48px}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{display:block}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:inline-block;margin-left:0}}@media (max-width: 400px){[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]{flex-flow:row wrap;align-items:inherit;width:100%;font-size:.9em}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .small-screen-icon[_ngcontent-%COMP%]{display:inline-block}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .handle[_ngcontent-%COMP%]{order:2;width:25%;text-align:center}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .handle[_ngcontent-%COMP%]   span.grippy[_ngcontent-%COMP%]{transform:rotate(0)}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{order:6;margin-left:0;margin-right:0;padding-right:0;padding-left:0;width:100%}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{margin-left:0;margin-right:0;padding-right:0;padding-left:0;overflow:hidden;text-overflow:ellipsis}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{width:100%;margin-left:0;margin-right:0;overflow:hidden;text-overflow:ellipsis}}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .agent[_ngcontent-%COMP%]{width:140px;font-size:.8em;padding-right:10px}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .expires[_ngcontent-%COMP%]{width:260px;font-size:.8em;padding-right:10px}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{flex-grow:1;padding-right:10px}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:.7em;text-transform:uppercase}@media (max-width: 400px){[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .agent[_ngcontent-%COMP%], [_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .expires[_ngcontent-%COMP%]{width:100%}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{order:0;width:calc(100% - 30px)}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .remove[_ngcontent-%COMP%]{order:1}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .agent[_ngcontent-%COMP%]{order:2}[_nghost-%COMP%]   .sessions[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .session-list[_ngcontent-%COMP%]   .session[_ngcontent-%COMP%]   .expires[_ngcontent-%COMP%]{order:3}}']}),n})();var M=e(24450);function C(n,t){if(1&n){const n=g.EpF();g.TgZ(0,"label",8),g.TgZ(1,"input",9),g.NdJ("ngModelChange",function(t){return g.CHM(n),g.oxw().app.settings.theme=t})("ngModelChange",function(){return g.CHM(n),g.oxw().onChange()}),g.qZA(),g._uU(2),g.ALo(3,"titlecase"),g.qZA()}if(2&n){const n=t.$implicit,e=g.oxw();g.xp6(1),g.Q6J("ngModel",e.app.settings.theme)("value",n.name),g.xp6(1),g.Oqu(g.lcZ(3,3,n.name))}}let P=(()=>{class n{constructor(n,t,e,o){this.router=n,this.app=t,this.settings=e,this.player=o,this.themes=M.c6.themes}onChange(){this.settings.applySettings()}}return n.\u0275fac=function(t){return new(t||n)(g.Y36(r.F0),g.Y36(p.zi),g.Y36(p.G2),g.Y36(p.lk))},n.\u0275cmp=g.Xpm({type:n,selectors:[["app-page-settings"]],decls:21,vars:4,consts:[[1,"settings"],["section","Settings"],[1,"content"],[1,"section-title"],["class","select",4,"ngFor","ngForOf"],["type","checkbox","title","Show Waveform of Current Track",3,"ngModel","ngModelChange"],["type","checkbox","value","1",3,"ngModel","ngModelChange"],["type","checkbox","value","1","title","Show Notifications On Tracks Change",3,"ngModel","ngModelChange"],[1,"select"],["type","radio","name","theme",3,"ngModel","value","ngModelChange"]],template:function(n,t){1&n&&(g.TgZ(0,"div",0),g._UZ(1,"app-view-header-slim",1),g.TgZ(2,"div",2),g.TgZ(3,"div",3),g._uU(4,"Design"),g.qZA(),g.TgZ(5,"div"),g.TgZ(6,"fieldset"),g.YNc(7,C,4,5,"label",4),g.qZA(),g.qZA(),g.TgZ(8,"div",3),g._uU(9,"Player"),g.qZA(),g.TgZ(10,"label"),g.TgZ(11,"input",5),g.NdJ("ngModelChange",function(n){return t.app.settings.showWaveform=n})("ngModelChange",function(){return t.onChange()}),g.qZA(),g._uU(12," Show Waveform of Current Track "),g.qZA(),g.TgZ(13,"div",3),g._uU(14,"Playing"),g.qZA(),g.TgZ(15,"label"),g.TgZ(16,"input",6),g.NdJ("ngModelChange",function(n){return t.app.settings.playingTrackInTitle=n})("ngModelChange",function(){return t.onChange()}),g.qZA(),g._uU(17," Show Playing Track Name in Window Title "),g.qZA(),g.TgZ(18,"label"),g.TgZ(19,"input",7),g.NdJ("ngModelChange",function(n){return t.app.settings.notificationSong=n})("ngModelChange",function(){return t.onChange()}),g.qZA(),g._uU(20," Show Notification Popup On Track Change "),g.qZA(),g.qZA(),g.qZA()),2&n&&(g.xp6(7),g.Q6J("ngForOf",t.themes),g.xp6(4),g.Q6J("ngModel",t.app.settings.showWaveform),g.xp6(5),g.Q6J("ngModel",t.app.settings.playingTrackInTitle),g.xp6(3),g.Q6J("ngModel",t.app.settings.notificationSong))},directives:[d.p,o.sg,s.Wl,s.JJ,s.On,s._,s.Fj],pipes:[o.rS],styles:["[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]{height:100%;overflow-y:auto;overflow-x:hidden}[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{padding:15px 15px 60px}[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]{text-transform:uppercase;letter-spacing:1.25px;font-size:13.2px;margin-bottom:10px;color:var(--on-control-ambient)}@media (max-width: 522px){[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{padding-left:10px;padding-right:10px}}[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{display:block;padding-bottom:15px;color:var(--on-background-active)}[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%]{margin-top:-1px;display:inline-block;vertical-align:middle}[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   fieldset[_ngcontent-%COMP%]{margin-bottom:15px;width:auto;display:inline}[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   label.select[_ngcontent-%COMP%]{width:auto;padding-top:4px;padding-bottom:4px}[_nghost-%COMP%]   .settings[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   label.select[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{margin-right:10px}"]}),n})();e(91841);var u=e(69100),m=e(79765),f=e(46782),v=e(97254);function x(n,t){1&n&&g._UZ(0,"i",8)}function b(n,t){1&n&&(g.TgZ(0,"span"),g._uU(1,"Random Image"),g.qZA())}let Z=(()=>{class n{constructor(n,t,e,o){this.app=n,this.auth=t,this.jam=e,this.notify=o,this.refreshing=!1,this.unsubscribe=new m.xQ,this.refreshRandom=(0,u.O)()}ngOnDestroy(){this.unsubscribe.next(),this.unsubscribe.complete()}onDropFile(n){var t;n.preventDefault(),this.uploadFile(null===(t=n.dataTransfer)||void 0===t?void 0:t.files)}onDragOverFile(n){n.stopPropagation(),n.preventDefault()}selectFile(n){this.uploadFile(n.target.files)}uploadFile(n){n&&0!==n.length&&this.auth.user&&this.jam.user.uploadUserImage({id:this.auth.user.id},n[0]).pipe((0,f.R)(this.unsubscribe)).subscribe(n=>{},n=>{this.notify.error(n)},()=>{this.refreshRandom=(0,u.O)(),this.notify.success("Upload done")})}randomAvatar(){this.refreshing||!this.auth.user||(this.refreshing=!0,this.jam.user.generateUserImage({id:this.auth.user.id}).then(()=>{this.refreshing=!1,this.refreshRandom=(0,u.O)(),this.notify.success("Image randomized")}).catch(n=>{this.refreshing=!1,this.notify.error(n)}))}}return n.\u0275fac=function(t){return new(t||n)(g.Y36(p.zi),g.Y36(l.$X),g.Y36(l.K4),g.Y36(p.c))},n.\u0275cmp=g.Xpm({type:n,selectors:[["app-user-avatar"]],decls:11,vars:6,consts:[[1,"drop-zone",3,"drop","dragover"],[1,"placeholder"],[3,"coverArtObj","size","round","refreshRandom"],[1,"button-primary",3,"click"],["class","icon-spin icon-spinner",4,"ngIf"],[4,"ngIf"],["id","file","type","file","placeholder","Upload image","accept",".png,.jpeg,.jpg",1,"inputfile",3,"change"],["for","file",1,"button-primary"],[1,"icon-spin","icon-spinner"]],template:function(n,t){1&n&&(g.TgZ(0,"div",0),g.NdJ("drop",function(n){return t.onDropFile(n)})("dragover",function(n){return t.onDragOverFile(n)}),g.TgZ(1,"div",1),g._uU(2," Drag an Image File here "),g.qZA(),g._UZ(3,"app-coverart-image",2),g.TgZ(4,"button",3),g.NdJ("click",function(){return t.randomAvatar()}),g.YNc(5,x,1,0,"i",4),g.YNc(6,b,2,0,"span",5),g.qZA(),g.TgZ(7,"form"),g.TgZ(8,"input",6),g.NdJ("change",function(n){return t.selectFile(n)}),g.qZA(),g.TgZ(9,"label",7),g._uU(10,"Choose a file"),g.qZA(),g.qZA(),g.qZA()),2&n&&(g.xp6(3),g.Q6J("coverArtObj",t.auth.user)("size",100)("round",!0)("refreshRandom",t.refreshRandom),g.xp6(2),g.Q6J("ngIf",t.refreshing),g.xp6(1),g.Q6J("ngIf",!t.refreshing))},directives:[v.A,o.O5,s._Y,s.JL,s.F],styles:["[_nghost-%COMP%]   .drop-zone[_ngcontent-%COMP%]{vertical-align:bottom;display:inline-block;min-width:220px;min-height:140px;border-width:2px;margin-bottom:15px;margin-right:15px;border-style:dotted;border-color:var(--secondary);padding-left:15px;padding-right:15px;padding-bottom:15px;text-align:center}[_nghost-%COMP%]   .drop-zone[_ngcontent-%COMP%]   app-coverart-image[_ngcontent-%COMP%]{margin:0 auto 10px}[_nghost-%COMP%]   .drop-zone[_ngcontent-%COMP%]   .inputfile[_ngcontent-%COMP%]{width:.1px;height:.1px;opacity:0;overflow:hidden;position:absolute;z-index:-1}[_nghost-%COMP%]   .drop-zone[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-bottom:10px;min-width:80%;display:inline-block}[_nghost-%COMP%]   .drop-zone[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{display:inline-block;min-width:80%}[_nghost-%COMP%]   .drop-zone[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{width:100%;display:block}[_nghost-%COMP%]   .drop-zone[_ngcontent-%COMP%]   .placeholder[_ngcontent-%COMP%]{width:100%;padding-top:15px;padding-bottom:15px;text-align:center;color:var(--on-control-ambient);font-size:.8em;text-transform:uppercase}"]}),n})();var w=e(67111),y=e(89888),k=e(81362);let T=(()=>{class n{constructor(n,t,e){this.jam=n,this.auth=t,this.notify=e,this.base=[],this.favorites=[],this.played=[]}ngOnInit(){this.auth.isLoggedIn()&&this.refresh()}refresh(){this.jam.stats.user().then(t=>{this.favorites=n.buildStats(t.favorite,"/favorites"),this.played=n.buildStats(t.played,"/recently-played"),this.base=(0,y.$m)([{text:"Bookmarks",link:"/library/bookmarks",value:t.bookmark},{text:"Playlists",link:"/library/playlists",value:t.playlist}],!0)}).catch(n=>{this.notify.error(n)})}static buildStats(n,t=""){return(0,y.$m)([{text:"Artists",link:"artists",value:n.artistTypes.album},...[{type:(0,w.tr)(l.VZ.album),value:n.albumTypes.album},{type:(0,w.tr)(l.VZ.compilation),value:n.albumTypes.compilation}].map(n=>{var t,e;return{text:null===(t=n.type)||void 0===t?void 0:t.text,link:`${null===(e=n.type)||void 0===e?void 0:e.id}`,value:n.value}}),{text:"Series",link:"series",value:n.series},...[{type:(0,w.tr)(l.VZ.audiobook),value:n.albumTypes.audiobook},{type:(0,w.tr)(l.VZ.soundtrack),value:n.albumTypes.soundtrack},{type:(0,w.tr)(l.VZ.live),value:n.albumTypes.live},{type:(0,w.tr)(l.VZ.bootleg),value:n.albumTypes.bootleg},{type:(0,w.tr)(l.VZ.ep),value:n.albumTypes.ep},{type:(0,w.tr)(l.VZ.single),value:n.albumTypes.single}].map(n=>{var t,e;return{text:null===(t=n.type)||void 0===t?void 0:t.text,link:`${null===(e=n.type)||void 0===e?void 0:e.id}`,value:n.value}}),{text:"Folders",link:"folders",value:n.folder},{text:"Tracks",link:"tracks",value:n.track}].map(n=>Object.assign(Object.assign({},n),{link:`/library/${n.link}${t}`})))}}return n.\u0275fac=function(t){return new(t||n)(g.Y36(l.K4),g.Y36(l.$X),g.Y36(p.c))},n.\u0275cmp=g.Xpm({type:n,selectors:[["app-user-stats"]],decls:9,vars:3,consts:[[1,"section-title"],[3,"stats"]],template:function(n,t){1&n&&(g.TgZ(0,"div",0),g._uU(1,"Stats"),g.qZA(),g._UZ(2,"app-stats",1),g.TgZ(3,"div",0),g._uU(4,"Favorites"),g.qZA(),g._UZ(5,"app-stats",1),g.TgZ(6,"div",0),g._uU(7,"Played"),g.qZA(),g._UZ(8,"app-stats",1)),2&n&&(g.xp6(2),g.Q6J("stats",t.base),g.xp6(3),g.Q6J("stats",t.favorites),g.xp6(3),g.Q6J("stats",t.played))},directives:[k._],styles:["[_nghost-%COMP%]   .section-title[_ngcontent-%COMP%]{text-transform:uppercase;letter-spacing:1.25px;font-size:13.2px;margin-top:15px;margin-bottom:10px;color:var(--on-control-ambient)}"]}),n})();function A(n,t){1&n&&(g.TgZ(0,"div"),g._UZ(1,"i",11),g._uU(2," Stream Audio"),g.qZA())}function q(n,t){1&n&&(g.TgZ(0,"div"),g._UZ(1,"i",11),g._uU(2," Manage Podcasts"),g.qZA())}function U(n,t){1&n&&(g.TgZ(0,"div"),g._UZ(1,"i",11),g._uU(2," Upload Audio"),g.qZA())}function z(n,t){1&n&&(g.TgZ(0,"div"),g._UZ(1,"i",11),g._uU(2," Server Administration"),g.qZA())}function J(n,t){if(1&n&&(g.TgZ(0,"div",3),g.TgZ(1,"div",4),g.TgZ(2,"div",5),g.TgZ(3,"div",6),g.TgZ(4,"div",7),g._uU(5,"Name"),g.qZA(),g.TgZ(6,"div"),g._uU(7),g.qZA(),g.qZA(),g.TgZ(8,"div",6),g.TgZ(9,"div",7),g._uU(10,"Permissions"),g.qZA(),g.TgZ(11,"div",8),g.YNc(12,A,3,0,"div",9),g.YNc(13,q,3,0,"div",9),g.YNc(14,U,3,0,"div",9),g.YNc(15,z,3,0,"div",9),g.qZA(),g.qZA(),g.qZA(),g.TgZ(16,"div",10),g.TgZ(17,"div",7),g._uU(18,"Avatar"),g.qZA(),g._UZ(19,"app-user-avatar"),g.qZA(),g.qZA(),g.TgZ(20,"div",6),g._UZ(21,"app-user-stats"),g.qZA(),g.qZA()),2&n){const n=g.oxw();g.xp6(7),g.Oqu(n.auth.user.name),g.xp6(5),g.Q6J("ngIf",null==n.auth.user||null==n.auth.user.roles?null:n.auth.user.roles.stream),g.xp6(1),g.Q6J("ngIf",null==n.auth.user||null==n.auth.user.roles?null:n.auth.user.roles.podcast),g.xp6(1),g.Q6J("ngIf",null==n.auth.user||null==n.auth.user.roles?null:n.auth.user.roles.upload),g.xp6(1),g.Q6J("ngIf",null==n.auth.user||null==n.auth.user.roles?null:n.auth.user.roles.admin)}}const F=[{path:"",component:c,children:[{path:"",pathMatch:"full",component:(()=>{class n{constructor(n){this.auth=n}}return n.\u0275fac=function(t){return new(t||n)(g.Y36(l.$X))},n.\u0275cmp=g.Xpm({type:n,selectors:[["app-user-page"]],decls:3,vars:1,consts:[[1,"user"],["section","User"],["class","content",4,"ngIf"],[1,"content"],[1,"row"],[1,"column","first"],[1,"section"],[1,"section-title"],[1,"roles"],[4,"ngIf"],[1,"column"],[1,"icon-checkmark"]],template:function(n,t){1&n&&(g.TgZ(0,"div",0),g._UZ(1,"app-view-header-slim",1),g.YNc(2,J,22,5,"div",2),g.qZA()),2&n&&(g.xp6(2),g.Q6J("ngIf",t.auth.user))},directives:[d.p,o.O5,Z,T],styles:["[_nghost-%COMP%]   .user[_ngcontent-%COMP%]{height:100%;overflow-y:auto;overflow-x:hidden}[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{padding:15px 15px 60px}[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]{text-transform:uppercase;letter-spacing:1.25px;font-size:13.2px;margin-bottom:10px;color:var(--on-control-ambient)}@media (max-width: 522px){[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{padding-left:10px;padding-right:10px}}[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]{padding-bottom:30px}[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]{display:flex;flex-direction:row}[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]   .column.first[_ngcontent-%COMP%]{padding-right:30px}[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]   .column[_ngcontent-%COMP%]{flex:1}@media (max-width: 400px){[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]{flex-direction:column}[_nghost-%COMP%]   .user[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]   .column.first[_ngcontent-%COMP%]{padding-right:0}}"]}),n})(),canActivate:[a.aH],data:{name:"User"}},{path:"settings",component:P,canActivate:[a.aH],data:{name:"Settings"}},{path:"sessions",component:O,canActivate:[a.aH],data:{name:"Sessions"}}]}],N=r.Bz.forChild(F),Y=function(n){return[n]};function I(n,t){if(1&n&&(g.TgZ(0,"a",6),g._UZ(1,"i"),g.TgZ(2,"span"),g._uU(3),g.qZA(),g.qZA()),2&n){const n=t.$implicit;g.Q6J("routerLink",g.VKq(5,Y,n.link))("routerLinkActiveOptions",n.options),g.xp6(1),g.Tol(n.icon),g.xp6(2),g.Oqu(n.text)}}function S(n,t){if(1&n&&(g.TgZ(0,"div",4),g.YNc(1,I,4,7,"a",5),g.qZA()),2&n){const n=g.oxw();g.xp6(1),g.Q6J("ngForOf",n.sections)("ngForTrackBy",n.trackByFn)}}let j=(()=>{class n{constructor(n,t){this.app=n,this.router=t,this.collapsed={},this.sections=[],this.showMobileNavig=!1;const e=F[0],o=((null==e?void 0:e.children)||[]).filter(n=>{var t;return n.path&&n.path.length>0&&(null===(t=n.data)||void 0===t?void 0:t.name)}).map(n=>{var t;const e=(null===(t=n.data)||void 0===t?void 0:t.link)?n.data.link:n.path;return{id:e,text:n.data?n.data.name:"",icon:n.data&&n.data.icon?n.data.icon:"icon-admin",link:`/user/${e}`,options:{exact:!1}}});this.sections=[{id:"",text:"User",icon:"icon-user",link:"/user",options:{exact:!0}}].concat(o)}ngOnInit(){this.app.view.currentSidebar=this,this.router.events.forEach(()=>{this.showMobileNavig=!1}).catch(n=>{console.error(n)})}ngOnDestroy(){this.app.view.currentSidebar=void 0}trackByFn(n,t){return t.id}toggleMobileNavig(){this.showMobileNavig=!this.showMobileNavig}}return n.\u0275fac=function(t){return new(t||n)(g.Y36(p.zi),g.Y36(r.F0))},n.\u0275cmp=g.Xpm({type:n,selectors:[["app-user-sidebar"]],decls:5,vars:5,consts:[[1,"navigation"],[1,"list"],[1,"header",3,"click"],["class","collapse",4,"ngIf"],[1,"collapse"],["class","item","routerLinkActive","active",3,"routerLink","routerLinkActiveOptions",4,"ngFor","ngForOf","ngForTrackBy"],["routerLinkActive","active",1,"item",3,"routerLink","routerLinkActiveOptions"]],template:function(n,t){1&n&&(g.TgZ(0,"section",0),g.TgZ(1,"div",1),g.TgZ(2,"div",2),g.NdJ("click",function(){return t.collapsed.main=!t.collapsed.main}),g._uU(3,"User"),g.qZA(),g.YNc(4,S,2,2,"div",3),g.qZA(),g.qZA()),2&n&&(g.ekj("show",t.showMobileNavig),g.xp6(1),g.ekj("active",t.collapsed.main),g.xp6(3),g.Q6J("ngIf",!t.collapsed.main))},directives:[o.O5,o.sg,r.yS,r.Od],styles:['@charset "UTF-8";[_nghost-%COMP%]{position:relative;flex:0 1 100%;display:flex;flex-direction:column;height:100%}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]{padding:15px;flex-grow:1;width:100%;overflow-y:auto;overflow-x:hidden;background-color:var(--control);color:var(--on-control)}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]{display:flex;flex-flow:column wrap;margin-bottom:15px}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]{color:var(--on-control-ambient);font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-bottom:5px;cursor:pointer;border-right-width:3px;border-right-style:solid;border-right-color:transparent}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]:hover{color:var(--on-control-ambient-hover);border-right-color:var(--primary)}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]:after{font-family:"jam";content:"\\e804";padding-left:4px}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]{color:var(--on-control);padding:5px 0;display:flex;flex-flow:row nowrap;align-items:center;border-right-width:3px;border-right-style:solid;border-right-color:transparent;transition:all .1s ease-in-out;transform-origin:left center}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]   app-coverart-image[_ngcontent-%COMP%]{margin-right:6px}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{width:25px;display:block}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]:hover{color:var(--on-control-hover);border-right-color:var(--primary)}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .item.active[_ngcontent-%COMP%]{transform:scale(1.1)}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]{margin-top:8px;padding-left:4px}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]{color:var(--on-control);font-size:14px;font-weight:bold}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .active[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]:after{content:"\\e807"}@media (max-width: 768px){[_nghost-%COMP%]{height:auto}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]{display:none;position:fixed;z-index:10;max-height:calc(100% - 60px);overflow-y:auto;flex-flow:row wrap;border-bottom:1px solid var(--control-box-border)}[_nghost-%COMP%]   .navigation.show[_ngcontent-%COMP%]{display:flex}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .index-list[_ngcontent-%COMP%]{display:none}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]{flex:1}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]{border-right-width:0}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]:after{content:""}}']}),n})();var Q=e(40150);let L=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=g.oAB({type:n}),n.\u0275inj=g.cJS({imports:[[s.u5,i.m,o.ez,N]]}),n})();g.B6R(c,[j,Q.H,r.lC],[])}}]);