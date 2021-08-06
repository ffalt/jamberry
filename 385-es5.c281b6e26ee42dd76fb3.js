!function(){"use strict";function n(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function t(n,t){for(var e=0;e<t.length;e++){var o=t[e];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(n,o.key,o)}}(self.webpackChunkjamberry=self.webpackChunkjamberry||[]).push([[385],{87385:function(e,o,c){c.r(o),c.d(o,{PodcastSearchPageModule:function(){return Z}});var s=c(38583),a=c(90665),r=c(76277),g=c(34661),i=c(72271),p=c(75723),d=c(37716),_=c(60918),M=c(24654),O=c(25324),C=c(7480);function P(n,t){1&n&&d._UZ(0,"app-loading",10),2&n&&d.Q6J("time",0)}function h(n,t){1&n&&(d.TgZ(0,"div"),d._uU(1,"No Results"),d.qZA())}function l(n,t){if(1&n&&d._UZ(0,"img",26),2&n){var e=d.oxw().$implicit;d.Q6J("src",e.logoUrl,d.LSH)}}function u(n,t){if(1&n&&(d.TgZ(0,"option",27),d._uU(1),d.qZA()),2&n){var e=t.$implicit;d.Q6J("ngValue",e),d.xp6(1),d.Oqu(e.displayURL)}}function f(n,t){if(1&n){var e=d.EpF();d.TgZ(0,"div",14),d.TgZ(1,"div",15),d.YNc(2,l,1,1,"img",16),d.qZA(),d.TgZ(3,"div",17),d.TgZ(4,"div",18),d._uU(5,"Podcast"),d.qZA(),d.TgZ(6,"div",19),d._uU(7),d.qZA(),d.TgZ(8,"div",20),d._uU(9),d.qZA(),d.TgZ(10,"div",21),d.TgZ(11,"select",22),d.NdJ("ngModelChange",function(n){return d.CHM(e).$implicit.selected=n}),d.YNc(12,u,2,2,"option",23),d.qZA(),d.TgZ(13,"button",24),d.NdJ("click",function(){var n=d.CHM(e).$implicit;return d.oxw(2).subscribe(n.selected)}),d._UZ(14,"i",25),d._uU(15," Subscribe"),d.qZA(),d.qZA(),d.qZA(),d.qZA()}if(2&n){var o=t.$implicit;d.xp6(2),d.Q6J("ngIf",o.logoUrl),d.xp6(5),d.Oqu(o.name),d.xp6(2),d.Oqu(o.description),d.xp6(2),d.Q6J("ngModel",o.selected),d.xp6(1),d.Q6J("ngForOf",o.pods)}}function m(n,t){if(1&n&&(d.TgZ(0,"div",11),d.YNc(1,h,2,0,"div",12),d.TgZ(2,"div"),d.YNc(3,f,16,5,"div",13),d.qZA(),d.qZA()),2&n){var e=d.oxw();d.xp6(1),d.Q6J("ngIf",0===e.podcasts.length),d.xp6(2),d.Q6J("ngForOf",e.podcasts)}}var x,v=function(){return{standalone:!0}},b=[{path:"",component:(x=function(){function e(t,o,c,s,a){n(this,e),this.app=t,this.jam=o,this.navig=c,this.notify=s,this.podcastService=a,this.searchValue="",this.isSearching=!1,this.searchValue=""}var o,c,s;return o=e,(c=[{key:"subscribe",value:function(n){var t=this;!n||this.jam.podcast.create({url:n.url.toString()}).then(function(){t.notify.success("Podcast subscribed")}).catch(function(n){t.notify.error(n)})}},{key:"search",value:function(n){var t=this;this.podcasts=void 0,n&&n.length>0&&(this.isSearching=!0,this.jam.podcast.discover({query:n}).then(function(e){t.searchValue===n&&(t.buildSearchResults(e),t.isSearching=!1)}).catch(function(n){t.isSearching=!1,t.notify.error(n)}))}},{key:"buildSearchResults",value:function(n){var t={};n.forEach(function(n){var e=new URL(n.url);if(!e.hostname.includes("feedburner.com")){var o=t[n.title];o||(o={name:n.title,logoUrl:n.scaled_logo_url,description:n.description,pods:[]},t[n.title]=o),(!o.description||0===o.description.length)&&(o.description=n.description),(!o.logoUrl||0===o.logoUrl.length)&&(o.logoUrl=n.scaled_logo_url),o.pods.find(function(n){return n.url.toString()===e.toString()})||o.pods.push({result:n,url:e,displayURL:e.toString()})}}),this.podcasts=Object.keys(t).map(function(n){var e=t[n];return e.selected=e.pods.find(function(n){return n.url.pathname.includes("mp3")}),e.selected||(e.selected=e.pods[0]),e})}}])&&t(o.prototype,c),s&&t(o,s),e}(),x.\u0275fac=function(n){return new(n||x)(d.Y36(_.zi),d.Y36(p.K4),d.Y36(_.Am),d.Y36(_.c),d.Y36(M.XU))},x.\u0275cmp=d.Xpm({type:x,selectors:[["app-page-podcast-search"]],decls:12,vars:5,consts:[[1,"search-podcasts"],["icon","icon-podcast","section","New Podcasts"],[1,"input-box"],["name","podcast-search","placeholder","Search Podcast or paste feed url","type","text",3,"ngModel","ngModelOptions","ngModelChange","keydown.enter"],[1,"icon-search",3,"click"],[1,"reference"],["href","https://gpodder.net","target","_blank","rel","noopener"],[1,"content"],[3,"time",4,"ngIf"],["class","podcasts",4,"ngIf"],[3,"time"],[1,"podcasts"],[4,"ngIf"],["class","search-podcast-plate",4,"ngFor","ngForOf"],[1,"search-podcast-plate"],[1,"art"],["alt","Podcast Image",3,"src",4,"ngIf"],[1,"meta"],[1,"type"],[1,"name"],[1,"description"],[1,"actions"],["placeholder","Feed URL","panelClass","url-dropdown-menu",3,"ngModel","ngModelChange"],[3,"ngValue",4,"ngFor","ngForOf"],[1,"button-on-background",3,"click"],[1,"icon-list-add"],["alt","Podcast Image",3,"src"],[3,"ngValue"]],template:function(n,t){1&n&&(d.TgZ(0,"div",0),d.TgZ(1,"app-view-header-icon-section",1),d.TgZ(2,"div",2),d.TgZ(3,"input",3),d.NdJ("ngModelChange",function(n){return t.searchValue=n})("keydown.enter",function(){return t.search(t.searchValue)}),d.qZA(),d.TgZ(4,"i",4),d.NdJ("click",function(){return t.search(t.searchValue)}),d.qZA(),d.qZA(),d.TgZ(5,"div",5),d._uU(6,"Powered by "),d.TgZ(7,"a",6),d._uU(8,"gpodder.net"),d.qZA(),d.qZA(),d.qZA(),d.TgZ(9,"div",7),d.YNc(10,P,1,1,"app-loading",8),d.YNc(11,m,4,2,"div",9),d.qZA(),d.qZA()),2&n&&(d.xp6(3),d.Q6J("ngModel",t.searchValue)("ngModelOptions",d.DdM(4,v)),d.xp6(7),d.Q6J("ngIf",t.isSearching),d.xp6(1),d.Q6J("ngIf",t.podcasts))},directives:[O.A,a.Fj,a.JJ,a.On,s.O5,C.N,s.sg,a.EJ,a.YN,a.Kr],styles:["[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]{height:100%;overflow-y:auto;overflow-x:hidden}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .input-box[_ngcontent-%COMP%]{border-radius:3px;padding-left:3px;padding-right:3px;align-items:center;background-color:var(--input);border:1px solid var(--input-border)}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .input-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{flex:1;border:none;outline:none;min-height:20px;background-color:var(--input);color:var(--on-input)}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .input-box[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:var(--on-input);font-size:14px;cursor:pointer}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .input-box[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]:hover{color:var(--on-input-hover)}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .input-box[_ngcontent-%COMP%]{width:100%;display:flex;min-height:30px}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .input-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{max-width:calc(100% - 24px)}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .reference[_ngcontent-%COMP%]{padding-top:5px;font-size:.8em}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{padding:0 15px 15px}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]{text-transform:uppercase;letter-spacing:1.25px;font-size:13.2px;margin-bottom:10px;color:var(--on-control-ambient)}@media (max-width: 522px){[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{padding-left:10px;padding-right:10px}}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]{width:100%;margin-top:30px}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]{margin-top:15px;margin-bottom:15px;display:block;max-width:100%}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]{border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:var(--background-border);padding:15px;display:flex;flex-flow:row wrap}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .art[_ngcontent-%COMP%]{min-width:64px;min-height:64px;max-width:64px;display:block;cursor:pointer}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .art[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:64px;height:auto}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]{margin-left:15px;display:flex;flex-flow:column wrap;position:relative;width:calc(100% - 120px)}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:100%;text-overflow:ellipsis;overflow:hidden}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .type[_ngcontent-%COMP%]{text-transform:uppercase}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .type[_ngcontent-%COMP%], [_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .year[_ngcontent-%COMP%], [_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .state[_ngcontent-%COMP%]{letter-spacing:1px;font-size:.8em}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]{font-size:24px;font-weight:100;color:var(--on-background-active)}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:var(--on-background-active)}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{color:var(--on-background)}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%]{font-size:14px;line-height:1.2em}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]{margin-top:auto}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-bottom:5px;margin-right:5px;height:27px;font-weight:500;padding:1px 15px 0}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{transform:scale(1.3);transform-origin:center}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{-webkit-user-select:none;-moz-user-select:none;user-select:none;border:1px solid transparent;padding:4px 9px 7px;border-radius:50%;display:none;position:absolute;right:1px;bottom:0}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{background-color:var(--control-hover);color:var(--on-background-hover)}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]:hover   .actions[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], [_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]:hover   app-fav-icon[_ngcontent-%COMP%]{display:inline}@media (max-width: 400px){[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]{padding-left:0;padding-right:0}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]{font-size:.8em}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]{font-size:16px}}"]}),x),canActivate:[g.aH],data:{name:"Podcast Search"}}],Z=function(){var t=function t(){n(this,t)};return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=d.oAB({type:t}),t.\u0275inj=d.cJS({imports:[[s.ez,a.u5,i.m,r.Bz.forChild(b)]]}),t}()}}])}();