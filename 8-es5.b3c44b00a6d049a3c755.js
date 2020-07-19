function _classCallCheck(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(n,t){for(var e=0;e<t.length;e++){var o=t[e];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(n,o.key,o)}}function _createClass(n,t,e){return t&&_defineProperties(n.prototype,t),e&&_defineProperties(n,e),n}(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{oe2F:function(n,t,e){"use strict";e.r(t),e.d(t,"PodcastSearchPageModule",(function(){return x}));var o=e("ofXK"),c=e("3Pt+"),s=e("tyNb"),a=e("auXs"),r=e("FpXt"),g=e("bQbs"),i=e("6O88"),p=e("NJqk"),d=e("fXoL"),C=e("xlge"),M=e("WXCC");function P(n,t){1&n&&d.Nb(0,"app-loading",10),2&n&&d.jc("time",0)}function _(n,t){1&n&&(d.Sb(0,"div"),d.Ec(1,"No Results"),d.Rb())}function O(n,t){if(1&n&&d.Nb(0,"img",26),2&n){var e=d.cc().$implicit;d.kc("alt",e.name),d.jc("src",e.logoUrl,d.wc)}}function h(n,t){if(1&n&&(d.Sb(0,"option",27),d.Ec(1),d.Rb()),2&n){var e=t.$implicit;d.jc("ngValue",e),d.Ab(1),d.Fc(e.displayURL)}}function l(n,t){if(1&n){var e=d.Tb();d.Sb(0,"div",14),d.Sb(1,"div",15),d.Cc(2,O,1,2,"img",16),d.Rb(),d.Sb(3,"div",17),d.Sb(4,"div",18),d.Ec(5,"Podcast"),d.Rb(),d.Sb(6,"div",19),d.Ec(7),d.Rb(),d.Sb(8,"div",20),d.Ec(9),d.Rb(),d.Sb(10,"div",21),d.Sb(11,"select",22),d.Zb("ngModelChange",(function(n){return d.uc(e),t.$implicit.selected=n})),d.Cc(12,h,2,2,"option",23),d.Rb(),d.Sb(13,"button",24),d.Zb("click",(function(){d.uc(e);var n=t.$implicit;return d.cc(2).subscribe(n.selected)})),d.Nb(14,"i",25),d.Ec(15," Subscribe"),d.Rb(),d.Rb(),d.Rb(),d.Rb()}if(2&n){var o=t.$implicit;d.Ab(2),d.jc("ngIf",o.logoUrl),d.Ab(5),d.Fc(o.name),d.Ab(2),d.Fc(o.description),d.Ab(2),d.jc("ngModel",o.selected),d.Ab(1),d.jc("ngForOf",o.pods)}}function u(n,t){if(1&n&&(d.Sb(0,"div",11),d.Cc(1,_,2,0,"div",12),d.Sb(2,"div"),d.Cc(3,l,16,5,"div",13),d.Rb(),d.Rb()),2&n){var e=d.cc();d.Ab(1),d.jc("ngIf",0===e.podcasts.length),d.Ab(2),d.jc("ngForOf",e.podcasts)}}var b,f,m=function(){return{standalone:!0}},v=[{path:"",component:(b=function(){function n(t,e,o,c,s){_classCallCheck(this,n),this.app=t,this.jam=e,this.navig=o,this.notify=c,this.podcastService=s,this.searchValue="",this.isSearching=!1,this.searchValue=""}return _createClass(n,[{key:"subscribe",value:function(n){var t=this;this.jam.podcast.create({url:n.url.toString()}).then((function(){t.notify.success("Podcast subscribed")})).catch((function(n){t.notify.error(n)}))}},{key:"search",value:function(n){var t=this;this.podcasts=void 0,n&&n.length>0&&(this.isSearching=!0,this.podcastService.searchPodcast(n,(function(e){t.searchValue===n&&(t.buildSearchResults(e),t.isSearching=!1)}),(function(n){t.isSearching=!1})))}},{key:"buildSearchResults",value:function(n){var t={};n.forEach((function(n){var e=new URL(n.url);if(!e.hostname.includes("feedburner.com")){var o=t[n.title];o||(o={name:n.title,logoUrl:n.logo_url,description:n.description,pods:[]},t[n.title]=o),o.description&&0!==o.description.length||(o.description=n.description),o.logoUrl&&0!==o.logoUrl.length||(o.logoUrl=n.logo_url),o.pods.find((function(n){return n.url.toString()===e.toString()}))||o.pods.push({result:n,url:e,displayURL:e.toString()})}})),this.podcasts=Object.keys(t).map((function(n){var e=t[n];return e.selected=e.pods.find((function(n){return n.url.pathname.includes("mp3")})),e.selected||(e.selected=e.pods[0]),e}))}}]),n}(),b.\u0275fac=function(n){return new(n||b)(d.Mb(g.e),d.Mb(i.JamService),d.Mb(g.g),d.Mb(g.h),d.Mb(p.f))},b.\u0275cmp=d.Gb({type:b,selectors:[["app-page-podcast-search"]],decls:12,vars:5,consts:[[1,"search-podcasts"],["icon","icon-podcast","section","New Podcasts"],[1,"input-box"],["name","podcast-search","placeholder","Search Podcast or paste feed url","type","text",3,"ngModel","ngModelOptions","ngModelChange","keydown.enter"],[1,"icon-search",3,"click"],[1,"reference"],["href","https://gpodder.net","target","_blank","rel","noopener"],[1,"content"],[3,"time",4,"ngIf"],["class","podcasts",4,"ngIf"],[3,"time"],[1,"podcasts"],[4,"ngIf"],["class","search-podcast-plate",4,"ngFor","ngForOf"],[1,"search-podcast-plate"],[1,"art"],[3,"src","alt",4,"ngIf"],[1,"meta"],[1,"type"],[1,"name"],[1,"description"],[1,"actions"],["placeholder","Feed URL","panelClass","url-dropdown-menu",3,"ngModel","ngModelChange"],[3,"ngValue",4,"ngFor","ngForOf"],[1,"button-on-background",3,"click"],[1,"icon-list-add"],[3,"src","alt"],[3,"ngValue"]],template:function(n,t){1&n&&(d.Sb(0,"div",0),d.Sb(1,"app-view-header-icon-section",1),d.Sb(2,"div",2),d.Sb(3,"input",3),d.Zb("ngModelChange",(function(n){return t.searchValue=n}))("keydown.enter",(function(){return t.search(t.searchValue)})),d.Rb(),d.Sb(4,"i",4),d.Zb("click",(function(){return t.search(t.searchValue)})),d.Rb(),d.Rb(),d.Sb(5,"div",5),d.Ec(6,"Powered by "),d.Sb(7,"a",6),d.Ec(8,"gpodder.net"),d.Rb(),d.Rb(),d.Rb(),d.Sb(9,"div",7),d.Cc(10,P,1,1,"app-loading",8),d.Cc(11,u,4,2,"div",9),d.Rb(),d.Rb()),2&n&&(d.Ab(3),d.jc("ngModel",t.searchValue)("ngModelOptions",d.nc(4,m)),d.Ab(7),d.jc("ngIf",t.isSearching),d.Ab(1),d.jc("ngIf",t.podcasts))},directives:[C.a,c.c,c.i,c.l,o.t,M.a,o.s,c.t,c.n,c.v],styles:["[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]{height:100%;overflow-y:auto;overflow-x:hidden}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .input-box[_ngcontent-%COMP%]{border-radius:3px;padding-left:3px;padding-right:3px;align-items:center;background-color:var(--input);border:1px solid var(--input-border)}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .input-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{flex:1;border:none;outline:none;min-height:20px;background-color:var(--input);color:var(--on-input)}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .input-box[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:var(--on-input);font-size:14px;cursor:pointer}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .input-box[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]:hover{color:var(--on-input-hover)}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .input-box[_ngcontent-%COMP%]{width:100%;display:flex;min-height:30px}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .input-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{max-width:calc(100% - 24px)}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .reference[_ngcontent-%COMP%]{padding-top:5px;font-size:.8em}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{padding:0 15px 15px}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]{text-transform:uppercase;letter-spacing:1.25px;font-size:13.2px;margin-bottom:10px;color:var(--on-control-ambient)}@media (max-width:522px){[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{padding-left:10px;padding-right:10px}}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]{width:100%;margin-top:30px}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]{margin-top:15px;margin-bottom:15px;display:block;max-width:100%}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]{border-bottom:1px solid var(--background-border);padding:15px;display:flex;flex-flow:row wrap}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .art[_ngcontent-%COMP%]{min-width:100px;min-height:100px;display:block;cursor:pointer}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .art[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{min-width:100px;min-height:100px;width:100px;height:auto}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]{margin-left:15px;display:flex;flex-flow:column wrap;position:relative;width:calc(100% - 120px)}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:100%;text-overflow:ellipsis;overflow:hidden}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .type[_ngcontent-%COMP%]{text-transform:uppercase}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .state[_ngcontent-%COMP%], [_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .type[_ngcontent-%COMP%], [_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .year[_ngcontent-%COMP%]{letter-spacing:1px;font-size:.8em}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]{font-size:24px;font-weight:100;color:var(--on-background-active)}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:var(--on-background-active)}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{color:var(--on-background)}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%]{font-size:14px;line-height:1.2em}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]{margin-top:auto}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-bottom:5px;margin-right:5px;height:27px;font-weight:500;padding:1px 15px 0}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{transform:scale(1.3);transform-origin:center}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border:1px solid transparent;padding:4px 9px 7px;border-radius:50%;display:none;position:absolute;right:1px;bottom:0}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{background-color:var(--control-hover);color:var(--on-background-hover)}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]:hover   .actions[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], [_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]:hover   app-fav-icon[_ngcontent-%COMP%]{display:inline}@media (max-width:400px){[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]{padding-left:0;padding-right:0}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]{font-size:.8em}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]{font-size:16px}}"]}),b),canActivate:[a.a],data:{name:"Podcast Search"}}],x=((f=function n(){_classCallCheck(this,n)}).\u0275mod=d.Kb({type:f}),f.\u0275inj=d.Jb({factory:function(n){return new(n||f)},imports:[[o.c,c.e,r.a,s.g.forChild(v)]]}),f)}}]);