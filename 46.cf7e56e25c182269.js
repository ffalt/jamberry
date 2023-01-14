"use strict";(self.webpackChunkjamberry=self.webpackChunkjamberry||[]).push([[46],{1046:(x,c,a)=>{a.r(c),a.d(c,{AboutPageModule:()=>r});var i=a(1180),u=a(6895),s=a(433),l=a(1491),v=a(6434),h=a(2170),t=a(4650),m=a(1902),p=a(9291),C=a(3689),P=a(5197);function O(o,e){if(1&o&&(t.TgZ(0,"span"),t._uU(1),t.qZA()),2&o){const n=e.$implicit;t.xp6(1),t.Oqu(n)}}function f(o,e){if(1&o&&(t.TgZ(0,"div"),t.YNc(1,O,2,1,"span",14),t.qZA()),2&o){const n=t.oxw();t.xp6(1),t.Q6J("ngForOf",null==n.player.audioSupport?null:n.player.audioSupport.formats)}}function Z(o,e){1&o&&(t.TgZ(0,"div"),t._uU(1,"Jamserver API"),t.qZA())}function _(o,e){if(1&o&&(t.TgZ(0,"div")(1,"div",3),t._uU(2,"Server"),t.qZA(),t.TgZ(3,"div",4)(4,"div"),t._uU(5,"Location"),t.qZA(),t.TgZ(6,"div")(7,"a",15),t._uU(8),t.qZA()()(),t.TgZ(9,"div",4),t.YNc(10,Z,2,0,"div",12),t.TgZ(11,"div"),t._uU(12),t.qZA()()()),2&o){const n=t.oxw();t.xp6(7),t.Q6J("title",n.auth.auth.server)("href",n.auth.auth.server,t.LSH),t.xp6(1),t.Oqu(n.auth.auth.server),t.xp6(2),t.Q6J("ngIf",n.auth.auth.version),t.xp6(2),t.Oqu(n.auth.auth.version)}}function M(o,e){if(1&o&&(t.TgZ(0,"div",4)(1,"div"),t._uU(2),t.qZA(),t.TgZ(3,"div"),t._uU(4),t.qZA()()),2&o){const n=e.$implicit;t.xp6(2),t.Oqu(n.desc),t.xp6(2),t.Oqu(n.name)}}class g{constructor(e,n,A,y){(0,i.Z)(this,"hotkeysService",void 0),(0,i.Z)(this,"app",void 0),(0,i.Z)(this,"auth",void 0),(0,i.Z)(this,"player",void 0),(0,i.Z)(this,"keyCmds",[]),(0,i.Z)(this,"VERSION",t.q4F),this.hotkeysService=e,this.app=n,this.auth=A,this.player=y,this.keyCmds=e.hotkeys.filter(d=>"?"!==d.combo.toString()).map(d=>({name:d.combo.toString(),desc:(d.description||"").toString()}))}}(0,i.Z)(g,"\u0275fac",function(e){return new(e||g)(t.Y36(m.tm),t.Y36(p.zi),t.Y36(C.$X),t.Y36(p.lk))}),(0,i.Z)(g,"\u0275cmp",t.Xpm({type:g,selectors:[["app-page-about"]],decls:63,vars:5,consts:[[1,"about"],["section","About"],[1,"content"],[1,"section-title"],[1,"key-value-row"],["href","https://github.com/ffalt/jamberry/","target","_blank","rel","noopener"],["href","https://github.com/ffalt/jamberry/blob/main/LICENSE","target","_blank","rel","noopener"],["href","https://github.com/ffalt/jamberry/issues","target","_blank","rel","noopener"],["href","http://fontello.com/","target","_blank","rel","noopener"],["href","http://www.flaticon.com/free-icon/strawberry-with-heart-shape_33090","target","_blank","rel","noopener"],["href","http://www.schillmania.com/projects/soundmanager2/","target","_blank","rel","noopener"],["href","https://angular.io/","target","_blank","rel","noopener"],[4,"ngIf"],["class","key-value-row",4,"ngFor","ngForOf"],[4,"ngFor","ngForOf"],["target","_blank",3,"title","href"]],template:function(e,n){1&e&&(t.TgZ(0,"div",0),t._UZ(1,"app-view-header-slim",1),t.TgZ(2,"div",2)(3,"div")(4,"div",3),t._uU(5,"Jamberry"),t.qZA(),t.TgZ(6,"div",4)(7,"div"),t._uU(8,"Version"),t.qZA(),t.TgZ(9,"div")(10,"a",5),t._uU(11),t.qZA()()(),t.TgZ(12,"div",4)(13,"div"),t._uU(14,"Licence"),t.qZA(),t.TgZ(15,"div")(16,"a",6),t._uU(17,"MIT"),t.qZA()()(),t.TgZ(18,"div",4)(19,"div"),t._uU(20,"Report Issues"),t.qZA(),t.TgZ(21,"div")(22,"a",7),t._uU(23,"github"),t.qZA()()()(),t.TgZ(24,"div")(25,"div",3),t._uU(26,"Thanks"),t.qZA(),t.TgZ(27,"div",4)(28,"div"),t._uU(29,"Icons"),t.qZA(),t.TgZ(30,"div")(31,"a",8),t._uU(32,"fontello"),t.qZA()()(),t.TgZ(33,"div",4)(34,"div"),t._uU(35,"Logo Icon"),t.qZA(),t.TgZ(36,"div")(37,"a",9),t._uU(38,"freepik"),t.qZA()()(),t.TgZ(39,"div",4)(40,"div"),t._uU(41,"Audio Library"),t.qZA(),t.TgZ(42,"div")(43,"a",10),t._uU(44,"soundmanager2"),t.qZA()()(),t.TgZ(45,"div",4)(46,"div"),t._uU(47,"Platform"),t.qZA(),t.TgZ(48,"div")(49,"a",11),t._uU(50),t.qZA()()()(),t.TgZ(51,"div")(52,"div",3),t._uU(53,"Your Browser"),t.qZA(),t.TgZ(54,"div",4)(55,"div"),t._uU(56,"Supported Audio Formats"),t.qZA(),t.YNc(57,f,2,1,"div",12),t.qZA()(),t.YNc(58,_,13,5,"div",12),t.TgZ(59,"div")(60,"div",3),t._uU(61,"Keyboard Shortcuts"),t.qZA(),t.YNc(62,M,5,2,"div",13),t.qZA()()()),2&e&&(t.xp6(11),t.Oqu(n.app.version),t.xp6(39),t.hij("angular ",n.VERSION.full,""),t.xp6(7),t.Q6J("ngIf",null==n.player.audioSupport?null:n.player.audioSupport.formats),t.xp6(1),t.Q6J("ngIf",n.auth.auth),t.xp6(4),t.Q6J("ngForOf",n.keyCmds))},dependencies:[u.sg,u.O5,P.p],styles:["[_nghost-%COMP%]   .about[_ngcontent-%COMP%]{height:100%;overflow-y:auto;overflow-x:hidden}[_nghost-%COMP%]   .about[_ngcontent-%COMP%]   app-view-header-slim[_ngcontent-%COMP%]{padding-left:60px;padding-right:60px}[_nghost-%COMP%]   .about[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{padding:0 60px 60px}[_nghost-%COMP%]   .about[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]{text-transform:uppercase;letter-spacing:1.25px;font-size:13.2px;margin-bottom:10px;color:var(--on-control-ambient)}@media (max-width: 522px){[_nghost-%COMP%]   .about[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{padding-left:10px;padding-right:10px}}@media (max-width: 522px){[_nghost-%COMP%]   .about[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{padding-left:15px;padding-right:15px}}[_nghost-%COMP%]   .about[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]{padding-top:30px;padding-bottom:15px}[_nghost-%COMP%]   .about[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .key-value-row[_ngcontent-%COMP%]{border-top-width:1px;border-top-style:solid;border-top-color:var(--background-border);display:flex;flex-flow:row nowrap;flex-wrap:nowrap;align-items:center}[_nghost-%COMP%]   .about[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .key-value-row[_ngcontent-%COMP%]:last-of-type{border-bottom-color:var(--background-border);border-bottom-width:1px;border-bottom-style:solid}[_nghost-%COMP%]   .about[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .key-value-row[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:first-of-type{width:30%;min-width:100px}[_nghost-%COMP%]   .about[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .key-value-row[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:last-of-type{padding-left:15px;width:60%;color:var(--on-background-active)}[_nghost-%COMP%]   .about[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .key-value-row[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:last-of-type   a[_ngcontent-%COMP%]{color:var(--on-background-active)}[_nghost-%COMP%]   .about[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .key-value-row[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:last-of-type   a[_ngcontent-%COMP%]:hover{color:var(--on-background)}[_nghost-%COMP%]   .about[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .key-value-row[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{padding-top:10px;padding-bottom:10px}[_nghost-%COMP%]   .about[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .key-value-row[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{display:inline-block;padding-right:15px}"]}));const b=[{path:"",component:g,canActivate:[v.aH],data:{name:"About"}}];class r{}(0,i.Z)(r,"\u0275fac",function(e){return new(e||r)}),(0,i.Z)(r,"\u0275mod",t.oAB({type:r})),(0,i.Z)(r,"\u0275inj",t.cJS({imports:[u.ez,s.u5,h.m,l.Bz.forChild(b)]}))}}]);