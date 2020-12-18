!function(){function n(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function t(n,t){for(var e=0;e<t.length;e++){var o=t[e];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(n,o.key,o)}}(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{oe2F:function(e,o,c){"use strict";c.r(o),c.d(o,"PodcastSearchPageModule",function(){return S});var a=c("ofXK"),s=c("3Pt+"),r=c("tyNb"),g=c("auXs"),i=c("FpXt"),p=c("bQbs"),d=c("6O88"),M=c("NJqk"),P=c("fXoL"),C=c("xlge"),O=c("WXCC");function _(n,t){1&n&&P.Nb(0,"app-loading",10),2&n&&P.jc("time",0)}function h(n,t){1&n&&(P.Sb(0,"div"),P.Fc(1,"No Results"),P.Rb())}function l(n,t){if(1&n&&P.Nb(0,"img",26),2&n){var e=P.cc().$implicit;P.jc("src",e.logoUrl,P.wc)}}function u(n,t){if(1&n&&(P.Sb(0,"option",27),P.Fc(1),P.Rb()),2&n){var e=t.$implicit;P.jc("ngValue",e),P.Ab(1),P.Gc(e.displayURL)}}function b(n,t){if(1&n){var e=P.Tb();P.Sb(0,"div",14),P.Sb(1,"div",15),P.Dc(2,l,1,1,"img",16),P.Rb(),P.Sb(3,"div",17),P.Sb(4,"div",18),P.Fc(5,"Podcast"),P.Rb(),P.Sb(6,"div",19),P.Fc(7),P.Rb(),P.Sb(8,"div",20),P.Fc(9),P.Rb(),P.Sb(10,"div",21),P.Sb(11,"select",22),P.Zb("ngModelChange",function(n){return t.$implicit.selected=n}),P.Dc(12,u,2,2,"option",23),P.Rb(),P.Sb(13,"button",24),P.Zb("click",function(){P.uc(e);var n=t.$implicit;return P.cc(2).subscribe(n.selected)}),P.Nb(14,"i",25),P.Fc(15," Subscribe"),P.Rb(),P.Rb(),P.Rb(),P.Rb()}if(2&n){var o=t.$implicit;P.Ab(2),P.jc("ngIf",o.logoUrl),P.Ab(5),P.Gc(o.name),P.Ab(2),P.Gc(o.description),P.Ab(2),P.jc("ngModel",o.selected),P.Ab(1),P.jc("ngForOf",o.pods)}}function f(n,t){if(1&n&&(P.Sb(0,"div",11),P.Dc(1,h,2,0,"div",12),P.Sb(2,"div"),P.Dc(3,b,16,5,"div",13),P.Rb(),P.Rb()),2&n){var e=P.cc();P.Ab(1),P.jc("ngIf",0===e.podcasts.length),P.Ab(2),P.jc("ngForOf",e.podcasts)}}var m,v,x=function(){return{standalone:!0}},w=[{path:"",component:(m=function(){function e(t,o,c,a,s){n(this,e),this.app=t,this.jam=o,this.navig=c,this.notify=a,this.podcastService=s,this.searchValue="",this.isSearching=!1,this.searchValue=""}var o,c,a;return o=e,(c=[{key:"subscribe",value:function(n){var t=this;n&&this.jam.podcast.create({url:n.url.toString()}).then(function(){t.notify.success("Podcast subscribed")}).catch(function(n){t.notify.error(n)})}},{key:"search",value:function(n){var t=this;this.podcasts=void 0,n&&n.length>0&&(this.isSearching=!0,this.jam.podcast.discover({query:n}).then(function(e){t.searchValue===n&&(t.buildSearchResults(e),t.isSearching=!1)}).catch(function(n){t.isSearching=!1,t.notify.error(n)}))}},{key:"buildSearchResults",value:function(n){var t={};n.forEach(function(n){var e=new URL(n.url);if(!e.hostname.includes("feedburner.com")){var o=t[n.title];o||(o={name:n.title,logoUrl:n.scaled_logo_url,description:n.description,pods:[]},t[n.title]=o),o.description&&0!==o.description.length||(o.description=n.description),o.logoUrl&&0!==o.logoUrl.length||(o.logoUrl=n.scaled_logo_url),o.pods.find(function(n){return n.url.toString()===e.toString()})||o.pods.push({result:n,url:e,displayURL:e.toString()})}}),this.podcasts=Object.keys(t).map(function(n){var e=t[n];return e.selected=e.pods.find(function(n){return n.url.pathname.includes("mp3")}),e.selected||(e.selected=e.pods[0]),e})}}])&&t(o.prototype,c),a&&t(o,a),e}(),m.\u0275fac=function(n){return new(n||m)(P.Mb(p.e),P.Mb(d.k),P.Mb(p.g),P.Mb(p.h),P.Mb(M.f))},m.\u0275cmp=P.Gb({type:m,selectors:[["app-page-podcast-search"]],decls:12,vars:5,consts:[[1,"search-podcasts"],["icon","icon-podcast","section","New Podcasts"],[1,"input-box"],["name","podcast-search","placeholder","Search Podcast or paste feed url","type","text",3,"ngModel","ngModelOptions","ngModelChange","keydown.enter"],[1,"icon-search",3,"click"],[1,"reference"],["href","https://gpodder.net","target","_blank","rel","noopener"],[1,"content"],[3,"time",4,"ngIf"],["class","podcasts",4,"ngIf"],[3,"time"],[1,"podcasts"],[4,"ngIf"],["class","search-podcast-plate",4,"ngFor","ngForOf"],[1,"search-podcast-plate"],[1,"art"],["alt","Podcast Image",3,"src",4,"ngIf"],[1,"meta"],[1,"type"],[1,"name"],[1,"description"],[1,"actions"],["placeholder","Feed URL","panelClass","url-dropdown-menu",3,"ngModel","ngModelChange"],[3,"ngValue",4,"ngFor","ngForOf"],[1,"button-on-background",3,"click"],[1,"icon-list-add"],["alt","Podcast Image",3,"src"],[3,"ngValue"]],template:function(n,t){1&n&&(P.Sb(0,"div",0),P.Sb(1,"app-view-header-icon-section",1),P.Sb(2,"div",2),P.Sb(3,"input",3),P.Zb("ngModelChange",function(n){return t.searchValue=n})("keydown.enter",function(){return t.search(t.searchValue)}),P.Rb(),P.Sb(4,"i",4),P.Zb("click",function(){return t.search(t.searchValue)}),P.Rb(),P.Rb(),P.Sb(5,"div",5),P.Fc(6,"Powered by "),P.Sb(7,"a",6),P.Fc(8,"gpodder.net"),P.Rb(),P.Rb(),P.Rb(),P.Sb(9,"div",7),P.Dc(10,_,1,1,"app-loading",8),P.Dc(11,f,4,2,"div",9),P.Rb(),P.Rb()),2&n&&(P.Ab(3),P.jc("ngModel",t.searchValue)("ngModelOptions",P.nc(4,x)),P.Ab(7),P.jc("ngIf",t.isSearching),P.Ab(1),P.jc("ngIf",t.podcasts))},directives:[C.a,s.b,s.e,s.h,a.l,O.a,a.k,s.m,s.i,s.n],styles:["[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]{height:100%;overflow-y:auto;overflow-x:hidden}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .input-box[_ngcontent-%COMP%]{border-radius:3px;padding-left:3px;padding-right:3px;align-items:center;background-color:var(--input);border:1px solid var(--input-border)}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .input-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{flex:1;border:none;outline:none;min-height:20px;background-color:var(--input);color:var(--on-input)}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .input-box[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:var(--on-input);font-size:14px;cursor:pointer}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .input-box[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]:hover{color:var(--on-input-hover)}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .input-box[_ngcontent-%COMP%]{width:100%;display:flex;min-height:30px}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .input-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{max-width:calc(100% - 24px)}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .reference[_ngcontent-%COMP%]{padding-top:5px;font-size:.8em}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{padding:0 15px 15px}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]{text-transform:uppercase;letter-spacing:1.25px;font-size:13.2px;margin-bottom:10px;color:var(--on-control-ambient)}@media (max-width:522px){[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{padding-left:10px;padding-right:10px}}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]{width:100%;margin-top:30px}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]{margin-top:15px;margin-bottom:15px;display:block;max-width:100%}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]{border-bottom:1px solid var(--background-border);padding:15px;display:flex;flex-flow:row wrap}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .art[_ngcontent-%COMP%]{min-width:64px;min-height:64px;max-width:64px;display:block;cursor:pointer}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .art[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:64px;height:auto}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]{margin-left:15px;display:flex;flex-flow:column wrap;position:relative;width:calc(100% - 120px)}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:100%;text-overflow:ellipsis;overflow:hidden}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .type[_ngcontent-%COMP%]{text-transform:uppercase}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .state[_ngcontent-%COMP%], [_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .type[_ngcontent-%COMP%], [_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .year[_ngcontent-%COMP%]{letter-spacing:1px;font-size:.8em}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]{font-size:24px;font-weight:100;color:var(--on-background-active)}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:var(--on-background-active)}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{color:var(--on-background)}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%]{font-size:14px;line-height:1.2em}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]{margin-top:auto}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-bottom:5px;margin-right:5px;height:27px;font-weight:500;padding:1px 15px 0}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{transform:scale(1.3);transform-origin:center}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{-webkit-user-select:none;-moz-user-select:none;user-select:none;border:1px solid transparent;padding:4px 9px 7px;border-radius:50%;display:none;position:absolute;right:1px;bottom:0}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{background-color:var(--control-hover);color:var(--on-background-hover)}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]:hover   .actions[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], [_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]:hover   app-fav-icon[_ngcontent-%COMP%]{display:inline}@media (max-width:400px){[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]{padding-left:0;padding-right:0}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]{font-size:.8em}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]{font-size:16px}}"]}),m),canActivate:[g.a],data:{name:"Podcast Search"}}],S=((v=function t(){n(this,t)}).\u0275mod=P.Kb({type:v}),v.\u0275inj=P.Jb({factory:function(n){return new(n||v)},imports:[[a.b,s.c,i.a,r.g.forChild(w)]]}),v)}}])}();