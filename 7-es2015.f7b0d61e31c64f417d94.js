(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{oe2F:function(n,t,e){"use strict";e.r(t),e.d(t,"PodcastSearchPageModule",(function(){return f}));var o=e("ofXK"),c=e("3Pt+"),s=e("tyNb"),a=e("auXs"),g=e("FpXt"),r=e("bQbs"),p=e("6O88"),i=e("NJqk"),d=e("fXoL"),C=e("xlge"),P=e("WXCC");function M(n,t){1&n&&d.Qb(0,"app-loading")}function O(n,t){1&n&&(d.Vb(0,"div"),d.Ic(1,"No Results"),d.Ub())}function _(n,t){if(1&n&&d.Qb(0,"img",24),2&n){const n=d.gc().$implicit;d.nc("src",n.logoUrl,d.Ac)}}function h(n,t){if(1&n&&(d.Vb(0,"option",25),d.Ic(1),d.Ub()),2&n){const n=t.$implicit;d.nc("value",n),d.Cb(1),d.Lc("",n.url.hostname,"",n.url.pathname,"")}}function l(n,t){if(1&n){const n=d.Wb();d.Vb(0,"div",12),d.Vb(1,"div",13),d.Gc(2,_,1,1,"img",14),d.Ub(),d.Vb(3,"div",15),d.Vb(4,"div",16),d.Ic(5,"Podcast"),d.Ub(),d.Vb(6,"div",17),d.Ic(7),d.Ub(),d.Vb(8,"div",18),d.Ic(9),d.Ub(),d.Vb(10,"div",19),d.Vb(11,"select",20),d.Gc(12,h,2,3,"option",21),d.Ub(),d.Vb(13,"button",22),d.dc("click",(function(){d.yc(n);const e=t.$implicit;return d.gc(2).subscribe(e.selected)})),d.Qb(14,"i",23),d.Ic(15," Subscribe"),d.Ub(),d.Ub(),d.Ub(),d.Ub()}if(2&n){const n=t.$implicit;d.Cb(2),d.nc("ngIf",n.logoUrl),d.Cb(5),d.Jc(n.name),d.Cb(2),d.Jc(n.description),d.Cb(2),d.nc("ngModel",n.selected),d.Cb(1),d.nc("ngForOf",n.pods)}}function b(n,t){if(1&n&&(d.Vb(0,"div",10),d.Gc(1,O,2,0,"div",8),d.Vb(2,"div"),d.Gc(3,l,16,5,"div",11),d.Ub(),d.Ub()),2&n){const n=d.gc();d.Cb(1),d.nc("ngIf",0===n.podcasts.length),d.Cb(2),d.nc("ngForOf",n.podcasts)}}const u=function(){return{standalone:!0}},m=[{path:"",component:(()=>{class n{constructor(n,t,e,o,c){this.app=n,this.jam=t,this.navig=e,this.notify=o,this.podcastService=c,this.searchValue="",this.isSearching=!1,this.searchValue=""}subscribe(n){this.jam.podcast.create({url:n.url.toString()}).then(()=>{this.notify.success("Podcast subscribed")}).catch(n=>{this.notify.error(n)})}search(n){this.podcasts=void 0,n&&n.length>0&&(this.isSearching=!0,this.podcastService.searchPodcast(n,t=>{this.searchValue===n&&(this.buildSearchResults(t),this.isSearching=!1)},n=>{this.isSearching=!1}))}buildSearchResults(n){const t={};n.forEach(n=>{const e=new URL(n.url);if(e.hostname.includes("feedburner.com"))return;let o=t[n.title];o||(o={name:n.title,logoUrl:n.logo_url,description:n.description,pods:[]},t[n.title]=o),o.description&&0!==o.description.length||(o.description=n.description),o.logoUrl&&0!==o.logoUrl.length||(o.logoUrl=n.logo_url),o.pods.push({result:n,url:e})}),this.podcasts=Object.keys(t).map(n=>{const e=t[n];return e.selected=e.pods.find(n=>n.url.pathname.includes("mp3")),e.selected||(e.selected=e.pods[0]),e})}}return n.\u0275fac=function(t){return new(t||n)(d.Pb(r.e),d.Pb(p.k),d.Pb(r.h),d.Pb(r.i),d.Pb(i.e))},n.\u0275cmp=d.Jb({type:n,selectors:[["app-page-podcast-search"]],decls:12,vars:5,consts:[[1,"search-podcasts"],["icon","icon-podcast","section","New Podcasts"],[1,"input-box"],["name","podcast-search","placeholder","Search Podcast or paste feed url","type","text",3,"ngModel","ngModelOptions","ngModelChange","keydown.enter"],[1,"icon-search",3,"click"],[1,"reference"],["href","https://gpodder.net","target","_blank","rel","noopener"],[1,"content"],[4,"ngIf"],["class","podcasts",4,"ngIf"],[1,"podcasts"],["class","search-podcast-plate",4,"ngFor","ngForOf"],[1,"search-podcast-plate"],[1,"art"],[3,"src",4,"ngIf"],[1,"meta"],[1,"type"],[1,"name"],[1,"description"],[1,"actions"],["placeholder","Feed URL","panelClass","url-dropdown-menu",3,"ngModel"],[3,"value",4,"ngFor","ngForOf"],[1,"button-on-background",3,"click"],[1,"icon-list-add"],[3,"src"],[3,"value"]],template:function(n,t){1&n&&(d.Vb(0,"div",0),d.Vb(1,"app-view-header-icon-section",1),d.Vb(2,"div",2),d.Vb(3,"input",3),d.dc("ngModelChange",(function(n){return t.searchValue=n}))("keydown.enter",(function(){return t.search(t.searchValue)})),d.Ub(),d.Vb(4,"i",4),d.dc("click",(function(){return t.search(t.searchValue)})),d.Ub(),d.Ub(),d.Vb(5,"div",5),d.Ic(6,"Powered by "),d.Vb(7,"a",6),d.Ic(8,"gpodder.net"),d.Ub(),d.Ub(),d.Ub(),d.Vb(9,"div",7),d.Gc(10,M,1,0,"app-loading",8),d.Gc(11,b,4,2,"div",9),d.Ub(),d.Ub()),2&n&&(d.Cb(3),d.nc("ngModel",t.searchValue)("ngModelOptions",d.rc(4,u)),d.Cb(7),d.nc("ngIf",t.isSearching),d.Cb(1),d.nc("ngIf",t.podcasts))},directives:[C.a,c.c,c.i,c.l,o.t,P.a,o.s,c.t,c.n,c.v],styles:["[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]{height:100%;overflow-y:auto;overflow-x:hidden}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .input-box[_ngcontent-%COMP%]{border-radius:3px;padding-left:3px;padding-right:3px;align-items:center;background-color:var(--input);border:1px solid var(--input-border)}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .input-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{flex:1;border:none;outline:none;min-height:20px;background-color:var(--input);color:var(--on-input)}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .input-box[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:var(--on-input);font-size:14px;cursor:pointer}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .input-box[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]:hover{color:var(--on-input-hover)}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .input-box[_ngcontent-%COMP%]{width:100%;display:flex;min-height:30px}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .input-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{max-width:calc(100% - 24px)}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .reference[_ngcontent-%COMP%]{padding-top:5px;font-size:.8em}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{padding:0 15px 15px}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]{text-transform:uppercase;letter-spacing:1.25px;font-size:13.2px;margin-bottom:10px;color:var(--on-control-ambient)}@media (max-width:522px){[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{padding-left:10px;padding-right:10px}}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]{width:100%;margin-top:30px}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]{margin-top:15px;margin-bottom:15px;display:block}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]{border-bottom:1px solid var(--background-border);padding:15px;display:flex;flex-flow:row wrap}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .art[_ngcontent-%COMP%]{min-width:100px;min-height:100px;display:block;cursor:pointer}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .art[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{min-width:100px;min-height:100px;width:100px;height:auto}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]{margin-left:15px;display:flex;flex-flow:column wrap;position:relative;width:calc(100% - 120px)}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:100%;text-overflow:ellipsis;overflow:hidden}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .type[_ngcontent-%COMP%]{text-transform:uppercase}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .state[_ngcontent-%COMP%], [_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .type[_ngcontent-%COMP%], [_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .year[_ngcontent-%COMP%]{letter-spacing:1px;font-size:.8em}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]{font-size:24px;font-weight:100;color:var(--on-background-active)}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:var(--on-background-active)}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{color:var(--on-background)}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%]{font-size:14px;line-height:1.2em}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]{margin-top:auto}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-bottom:5px;margin-right:5px;height:27px;font-weight:500;padding:1px 15px 0}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{transform:scale(1.3);transform-origin:center}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border:1px solid transparent;padding:4px 9px 7px;border-radius:50%;display:none;position:absolute;right:1px;bottom:0}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{background-color:var(--control-hover);color:var(--on-background-hover)}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]:hover   .actions[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], [_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]:hover   app-fav-icon[_ngcontent-%COMP%]{display:inline}@media (max-width:400px){[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]{padding-left:0;padding-right:0}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]{font-size:.8em}[_nghost-%COMP%]   .search-podcasts[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .podcasts[_ngcontent-%COMP%]   .search-podcast-plate[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]{font-size:16px}}"]}),n})(),canActivate:[a.a],data:{name:"Podcast Search"}}];let f=(()=>{class n{}return n.\u0275mod=d.Nb({type:n}),n.\u0275inj=d.Mb({factory:function(t){return new(t||n)},imports:[[o.c,c.e,g.a,s.g.forChild(m)]]}),n})()}}]);