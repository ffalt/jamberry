!function(p,l){function Q(U,ye){function rt(e){return n.preferFlash&&x&&!n.ignoreFlash&&n.flash[e]!==l&&n.flash[e]}function M(e){return function(i){var a=this._s;return a&&a._a?e.call(this,i):null}}this.setupOptions={url:U||null,flashVersion:8,debugMode:!0,debugFlash:!1,useConsole:!0,consoleOnly:!0,waitForWindowLoad:!1,bgColor:"#ffffff",useHighPerformance:!1,flashPollingInterval:null,html5PollingInterval:null,flashLoadTimeout:1e3,wmode:null,allowScriptAccess:"always",useFlashBlock:!1,useHTML5Audio:!0,forceUseGlobalHTML5Audio:!1,ignoreMobileRestrictions:!1,html5Test:/^(probably|maybe)$/i,preferFlash:!1,noSWFCache:!1,idPrefix:"sound"},this.defaultOptions={autoLoad:!1,autoPlay:!1,from:null,loops:1,onid3:null,onerror:null,onload:null,whileloading:null,onplay:null,onpause:null,onresume:null,whileplaying:null,onposition:null,onstop:null,onfinish:null,multiShot:!0,multiShotEvents:!1,position:null,pan:0,playbackRate:1,stream:!0,to:null,type:null,usePolicyFile:!1,volume:100},this.flash9Options={onfailure:null,isMovieStar:null,usePeakData:!1,useWaveformData:!1,useEQData:!1,onbufferchange:null,ondataerror:null},this.movieStarOptions={bufferTime:3,serverURL:null,onconnect:null,duration:null},this.audioFormats={mp3:{type:['audio/mpeg; codecs="mp3"',"audio/mpeg","audio/mp3","audio/MPA","audio/mpa-robust"],required:!0},mp4:{related:["aac","m4a","m4b"],type:['audio/mp4; codecs="mp4a.40.2"',"audio/aac","audio/x-m4a","audio/MP4A-LATM","audio/mpeg4-generic"],required:!1},ogg:{type:["audio/ogg; codecs=vorbis"],required:!1},opus:{type:["audio/ogg; codecs=opus","audio/opus"],required:!1},wav:{type:['audio/wav; codecs="1"',"audio/wav","audio/wave","audio/x-wav"],required:!1},flac:{type:["audio/flac"],required:!1}},this.movieID="sm2-container",this.id=ye||"sm2movie",this.debugID="soundmanager-debug",this.debugURLParam=/([#?&])debug=1/i,this.versionNumber="V2.97a.20170601",this.altURL=this.movieURL=this.version=null,this.enabled=this.swfLoaded=!1,this.oMC=null,this.sounds={},this.soundIDs=[],this.didFlashBlock=this.muted=!1,this.filePattern=null,this.filePatterns={flash8:/\.mp3(\?.*)?$/i,flash9:/\.mp3(\?.*)?$/i},this.features={buffering:!1,peakData:!1,waveformData:!1,eqData:!1,movieStar:!1},this.sandbox={},this.html5={usingFlash:null},this.flash={},this.ignoreFlash=this.html5Only=!1;var Yt,ut,Lt,bt,Pt,_,Z,w,St,lt,It,B,W,$,te,At,Et,dt,G,ft,q,Dt,z,Ht,ct,K,ee,Ct,kt,ne,tt,xt,X,pt,ht,O,ie,oe,ae,_t,ot,se,yt,at,re,R,vt,Ut,ue,g,Bt,x,qt,le,C,st,jt,Kt,n=this,Zt=null,c=null,P=navigator.userAgent,zt=p.location.href.toString(),v=document,H=[],J=!1,Y=!1,S=!1,F=!1,wt=!1,b=null,Rt=null,et=!1,Nt=!1,mt=0,nt=null,it=[],E=null,ve=Array.prototype.slice,I=!1,de=0,Vt=P.match(/(ipad|iphone|ipod)/i),Qt=P.match(/android/i),N=P.match(/msie|trident/i),Oe=P.match(/webkit/i),Ot=P.match(/safari/i)&&!P.match(/chrome/i),Wt=P.match(/opera/i),gt=P.match(/(mobile|pre\/|xoom)/i)||Vt||Qt,fe=!zt.match(/usehtml5audio/i)&&!zt.match(/sm2-ignorebadua/i)&&Ot&&!P.match(/silk/i)&&P.match(/OS\sX\s10_6_([3-7])/i),$t=v.hasFocus!==l?v.hasFocus():null,Mt=Ot&&(v.hasFocus===l||!v.hasFocus()),ce=!Mt,pe=/(mp3|mp4|mpa|m4a|m4b)/i,Gt=v.location?v.location.protocol.match(/http/i):null,ge=Gt?"":"//",he=/^\s*audio\/(?:x-)?(?:mpeg4|aac|flv|mov|mp4|m4v|m4a|m4b|mp4v|3gp|3g2)\s*(?:$|;)/i,me="mpeg4 aac flv mov mp4 m4v f4v m4a m4b mp4v 3gp 3g2".split(" "),Me=new RegExp("\\.("+me.join("|")+")(\\?.*)?$","i");this.mimePattern=/^\s*audio\/(?:x-)?(?:mp(?:eg|3))\s*(?:$|;)/i,this.useAltURL=!Gt,re=[null,"MEDIA_ERR_ABORTED","MEDIA_ERR_NETWORK","MEDIA_ERR_DECODE","MEDIA_ERR_SRC_NOT_SUPPORTED"];try{Kt=Audio!==l&&(Wt&&opera!==l&&10>opera.version()?new Audio(null):new Audio).canPlayType!==l}catch(e){Kt=!1}this.hasHTML5=Kt,this.setup=function(e){var i=!n.url;return e!==l&&S&&E&&n.ok(),St(e),I||(gt?(!n.setupOptions.ignoreMobileRestrictions||n.setupOptions.forceUseGlobalHTML5Audio)&&(it.push(G.globalHTML5),I=!0):n.setupOptions.forceUseGlobalHTML5Audio&&(it.push(G.globalHTML5),I=!0)),!jt&&gt&&(n.setupOptions.ignoreMobileRestrictions?it.push(G.ignoreMobile):(n.setupOptions.useHTML5Audio=!0,n.setupOptions.preferFlash=!1,Vt?n.ignoreFlash=!0:(Qt&&!P.match(/android\s2\.3/i)||!Qt)&&(I=!0))),e&&(i&&z&&e.url!==l&&n.beginDelayedInit(),z||e.url===l||"complete"!==v.readyState||setTimeout(q,1)),jt=!0,n},this.supported=this.ok=function(){return E?S&&!F:n.useHTML5Audio&&n.hasHTML5},this.getMovie=function(e){return ut(e)||v[e]||p[e]},this.createSound=function(e,i){function a(){return t=pt(t),n.sounds[t.id]=new Yt(t),n.soundIDs.push(t.id),n.sounds[t.id]}var t,u=null;if(!S||!n.ok())return!1;if(i!==l&&(e={id:e,url:i}),(t=w(e)).url=_t(t.url),t.id===l&&(t.id=n.setupOptions.idPrefix+de++),O(t.id,!0))return n.sounds[t.id];if(yt(t))(u=a())._setup_html5(t);else{if(n.html5Only||n.html5.usingFlash&&t.url&&t.url.match(/data:/i))return a();8<_&&null===t.isMovieStar&&(t.isMovieStar=!!(t.serverURL||t.type&&t.type.match(he)||t.url&&t.url.match(Me))),t=ht(t,void 0),u=a(),8===_?c._createSound(t.id,t.loops||1,t.usePolicyFile):(c._createSound(t.id,t.url,t.usePeakData,t.useWaveformData,t.useEQData,t.isMovieStar,!!t.isMovieStar&&t.bufferTime,t.loops||1,t.serverURL,t.duration||null,t.autoPlay,!0,t.autoLoad,t.usePolicyFile),t.serverURL||(u.connected=!0,t.onconnect&&t.onconnect.apply(u))),t.serverURL||!t.autoLoad&&!t.autoPlay||u.load(t)}return!t.serverURL&&t.autoPlay&&u.play(),u},this.destroySound=function(e,i){if(!O(e))return!1;var t,a=n.sounds[e];for(a.stop(),a._iO={},a.unload(),t=0;t<n.soundIDs.length;t++)if(n.soundIDs[t]===e){n.soundIDs.splice(t,1);break}return i||a.destruct(!0),delete n.sounds[e],!0},this.load=function(e,i){return!!O(e)&&n.sounds[e].load(i)},this.unload=function(e){return!!O(e)&&n.sounds[e].unload()},this.onposition=this.onPosition=function(e,i,a,t){return!!O(e)&&n.sounds[e].onposition(i,a,t)},this.clearOnPosition=function(e,i,a){return!!O(e)&&n.sounds[e].clearOnPosition(i,a)},this.start=this.play=function(e,i){var a=null,t=i&&!(i instanceof Object);if(!S||!n.ok())return!1;if(O(e,t))t&&(i={url:i});else{if(!t)return!1;t&&(i={url:i}),i&&i.url&&(i.id=e,a=n.createSound(i).play())}return null===a&&(a=n.sounds[e].play(i)),a},this.setPlaybackRate=function(e,i,a){return!!O(e)&&n.sounds[e].setPlaybackRate(i,a)},this.setPosition=function(e,i){return!!O(e)&&n.sounds[e].setPosition(i)},this.stop=function(e){return!!O(e)&&n.sounds[e].stop()},this.stopAll=function(){for(var e in n.sounds)n.sounds.hasOwnProperty(e)&&n.sounds[e].stop()},this.pause=function(e){return!!O(e)&&n.sounds[e].pause()},this.pauseAll=function(){var e;for(e=n.soundIDs.length-1;0<=e;e--)n.sounds[n.soundIDs[e]].pause()},this.resume=function(e){return!!O(e)&&n.sounds[e].resume()},this.resumeAll=function(){var e;for(e=n.soundIDs.length-1;0<=e;e--)n.sounds[n.soundIDs[e]].resume()},this.togglePause=function(e){return!!O(e)&&n.sounds[e].togglePause()},this.setPan=function(e,i){return!!O(e)&&n.sounds[e].setPan(i)},this.setVolume=function(e,i){var a,t;if(e!==l&&!isNaN(e)&&i===l){for(a=0,t=n.soundIDs.length;a<t;a++)n.sounds[n.soundIDs[a]].setVolume(e);return!1}return!!O(e)&&n.sounds[e].setVolume(i)},this.mute=function(e){var i=0;if(e instanceof String&&(e=null),e)return!!O(e)&&n.sounds[e].mute();for(i=n.soundIDs.length-1;0<=i;i--)n.sounds[n.soundIDs[i]].mute();return n.muted=!0},this.muteAll=function(){n.mute()},this.unmute=function(e){if(e instanceof String&&(e=null),e)return!!O(e)&&n.sounds[e].unmute();for(e=n.soundIDs.length-1;0<=e;e--)n.sounds[n.soundIDs[e]].unmute();return n.muted=!1,!0},this.unmuteAll=function(){n.unmute()},this.toggleMute=function(e){return!!O(e)&&n.sounds[e].toggleMute()},this.getMemoryUse=function(){var e=0;return c&&8!==_&&(e=parseInt(c._getMemoryUse(),10)),e},this.disable=function(e){var i;if(e===l&&(e=!1),F)return!1;for(F=!0,i=n.soundIDs.length-1;0<=i;i--)Ct(n.sounds[n.soundIDs[i]]);return Ct(n),Z(e),g.remove(p,"load",W),!0},this.canPlayMIME=function(e){var i;return n.hasHTML5&&(i=at({type:e})),!i&&E&&(i=e&&n.ok()?!!(8<_&&e.match(he)||e.match(n.mimePattern)):null),i},this.canPlayURL=function(e){var i;return n.hasHTML5&&(i=at({url:e})),!i&&E&&(i=e&&n.ok()?!!e.match(n.filePattern):null),i},this.canPlayLink=function(e){return!(e.type===l||!e.type||!n.canPlayMIME(e.type))||n.canPlayURL(e.href)},this.getSoundById=function(e,i){return e?n.sounds[e]:null},this.onready=function(e,i){if("function"!=typeof e)throw tt("needFunction","onready");return i||(i=p),It("onready",e,i),B(),!0},this.ontimeout=function(e,i){if("function"!=typeof e)throw tt("needFunction","ontimeout");return i||(i=p),It("ontimeout",e,i),B({type:"ontimeout"}),!0},this._wD=this._writeDebug=function(e,i){return!0},this._debug=function(){},this.reboot=function(e,i){var a,t,u;for(a=n.soundIDs.length-1;0<=a;a--)n.sounds[n.soundIDs[a]].destruct();if(c)try{N&&(Rt=c.innerHTML),b=c.parentNode.removeChild(c)}catch(d){}if(Rt=b=E=c=null,n.enabled=z=S=et=Nt=J=Y=F=I=n.swfLoaded=!1,n.soundIDs=[],n.sounds={},de=0,jt=!1,e)H=[];else for(a in H)if(H.hasOwnProperty(a))for(t=0,u=H[a].length;t<u;t++)H[a][t].fired=!1;return n.html5={usingFlash:null},n.flash={},n.html5Only=!1,n.ignoreFlash=!1,p.setTimeout(function(){i||n.beginDelayedInit()},20),n},this.reset=function(){return n.reboot(!0,!0)},this.getMoviePercent=function(){return c&&"PercentLoaded"in c?c.PercentLoaded():null},this.beginDelayedInit=function(){wt=!0,q(),setTimeout(function(){return!Nt&&(ct(),ft(),Nt=!0)},20),$()},this.destruct=function(){n.disable(!0)},Yt=function(e){var i,a,u,d,h,m,T,A,Xt,_e,Jt,t=this,D=!1,L=[],j=0,V=null;a=i=null,this.sID=this.id=e.id,this.url=e.url,this._iO=this.instanceOptions=this.options=w(e),this.pan=this.options.pan,this.volume=this.options.volume,this.isHTML5=!1,this._a=null,Jt=!this.url,this.id3={},this._debug=function(){},this.load=function(o){var r;if(o!==l?t._iO=w(o,t.options):(t._iO=o=t.options,V&&V!==t.url&&(t._iO.url=t.url,t.url=null)),t._iO.url||(t._iO.url=t.url),t._iO.url=_t(t._iO.url),!(r=t.instanceOptions=t._iO).url&&!t.url)return t;if(r.url===t.url&&0!==t.readyState&&2!==t.readyState)return 3===t.readyState&&r.onload&&st(t,function(){r.onload.apply(t,[!!t.duration])}),t;if(t.loaded=!1,t.readyState=1,t.playState=0,t.id3={},yt(r))t._setup_html5(r)._called_load||(t._html5_canplay=!1,t.url!==r.url&&(t._a.src=r.url,t.setPosition(0)),t._a.autobuffer="auto",t._a.preload="auto",t._a._called_load=!0);else{if(n.html5Only||t._iO.url&&t._iO.url.match(/data:/i))return t;try{t.isHTML5=!1,t._iO=ht(pt(r)),t._iO.autoPlay&&(t._iO.position||t._iO.from)&&(t._iO.autoPlay=!1),r=t._iO,8===_?c._load(t.id,r.url,r.stream,r.autoPlay,r.usePolicyFile):c._load(t.id,r.url,!!r.stream,!!r.autoPlay,r.loops||1,!!r.autoLoad,r.usePolicyFile)}catch(f){K({type:"SMSOUND_LOAD_JS_EXCEPTION",fatal:!0})}}return t.url=r.url,t},this.unload=function(){return 0!==t.readyState&&(t.isHTML5?(m(),t._a&&(t._a.pause(),V=vt(t._a))):8===_?c._unload(t.id,"about:blank"):c._unload(t.id),u()),t},this.destruct=function(o){t.isHTML5?(m(),t._a&&(t._a.pause(),vt(t._a),I||h(),t._a._s=null,t._a=null)):(t._iO.onfailure=null,c._destroySound(t.id)),o||n.destroySound(t.id,!0)},this.start=this.play=function(o,s){var r,f,y,k;if(r=!0,s=s===l||s,o||(o={}),t.url&&(t._iO.url=t.url),t._iO=w(t._iO,t.options),t._iO=w(o,t._iO),t._iO.url=_t(t._iO.url),t.instanceOptions=t._iO,!t.isHTML5&&t._iO.serverURL&&!t.connected)return t.getAutoPlay()||t.setAutoPlay(!0),t;if(yt(t._iO)&&(t._setup_html5(t._iO),T()),1===t.playState&&!t.paused&&!(r=t._iO.multiShot))return t.isHTML5&&t.setPosition(t._iO.position),t;if(o.url&&o.url!==t.url&&(t.readyState||t.isHTML5||8!==_||!Jt?t.load(t._iO):Jt=!1),!t.loaded)if(0===t.readyState){if(t.isHTML5||n.html5Only){if(!t.isHTML5)return t;t.load(t._iO)}else t._iO.autoPlay=!0,t.load(t._iO);t.instanceOptions=t._iO}else if(2===t.readyState)return t;return!t.isHTML5&&9===_&&0<t.position&&t.position===t.duration&&(o.position=0),t.paused&&0<=t.position&&(!t._iO.serverURL||0<t.position)?t.resume():(t._iO=w(o,t._iO),(!t.isHTML5&&null!==t._iO.position&&0<t._iO.position||null!==t._iO.from&&0<t._iO.from||null!==t._iO.to)&&0===t.instanceCount&&0===t.playState&&!t._iO.serverURL&&(r=function(){t._iO=w(o,t._iO),t.play(t._iO)},t.isHTML5&&!t._html5_canplay?t.load({_oncanplay:r}):t.isHTML5||t.loaded||t.readyState&&2===t.readyState||t.load({onload:r}),t._iO=_e()),(!t.instanceCount||t._iO.multiShotEvents||t.isHTML5&&t._iO.multiShot&&!I||!t.isHTML5&&8<_&&!t.getAutoPlay())&&t.instanceCount++,t._iO.onposition&&0===t.playState&&A(t),t.playState=1,t.paused=!1,t.position=t._iO.position===l||isNaN(t._iO.position)?0:t._iO.position,t.isHTML5||(t._iO=ht(pt(t._iO))),t._iO.onplay&&s&&(t._iO.onplay.apply(t),D=!0),t.setVolume(t._iO.volume,!0),t.setPan(t._iO.pan,!0),1!==t._iO.playbackRate&&t.setPlaybackRate(t._iO.playbackRate),t.isHTML5?2>t.instanceCount?(T(),r=t._setup_html5(),t.setPosition(t._iO.position),r.play()):(f=new Audio(t._iO.url),y=function(){g.remove(f,"ended",y),t._onfinish(t),vt(f),f=null},k=function(){g.remove(f,"canplay",k);try{f.currentTime=t._iO.position/1e3}catch(Te){}f.play()},g.add(f,"ended",y),t._iO.volume!==l&&(f.volume=Math.max(0,Math.min(1,t._iO.volume/100))),t.muted&&(f.muted=!0),t._iO.position?g.add(f,"canplay",k):f.play()):(r=c._start(t.id,t._iO.loops||1,9===_?t.position:t.position/1e3,t._iO.multiShot||!1),9!==_||r||t._iO.onplayerror&&t._iO.onplayerror.apply(t))),t},this.stop=function(o){var s=t._iO;return 1===t.playState&&(t._onbufferchange(0),t._resetOnPosition(0),t.paused=!1,t.isHTML5||(t.playState=0),Xt(),s.to&&t.clearOnPosition(s.to),t.isHTML5?t._a&&(o=t.position,t.setPosition(0),t.position=o,t._a.pause(),t.playState=0,t._onTimer(),m()):(c._stop(t.id,o),s.serverURL&&t.unload()),t.instanceCount=0,t._iO={},s.onstop&&s.onstop.apply(t)),t},this.setAutoPlay=function(o){t._iO.autoPlay=o,t.isHTML5||(c._setAutoPlay(t.id,o),o&&(t.instanceCount||1!==t.readyState||t.instanceCount++))},this.getAutoPlay=function(){return t._iO.autoPlay},this.setPlaybackRate=function(o){if(o=Math.max(.5,Math.min(4,o)),t.isHTML5)try{t._iO.playbackRate=o,t._a.playbackRate=o}catch(s){}return t},this.setPosition=function(o){o===l&&(o=0);var s=t.isHTML5?Math.max(o,0):Math.min(t.duration||t._iO.duration,Math.max(o,0));if(t.position=s,o=t.position/1e3,t._resetOnPosition(t.position),t._iO.position=s,t.isHTML5){if(t._a){if(t._html5_canplay){if(t._a.currentTime.toFixed(3)!==o.toFixed(3))try{t._a.currentTime=o,(0===t.playState||t.paused)&&t._a.pause()}catch(r){}}else if(o)return t;t.paused&&t._onTimer(!0)}}else o=9===_?t.position:o,t.readyState&&2!==t.readyState&&c._setPosition(t.id,o,t.paused||!t.playState,t._iO.multiShot);return t},this.pause=function(o){return t.paused||0===t.playState&&1!==t.readyState||(t.paused=!0,t.isHTML5?(t._setup_html5().pause(),m()):(o||o===l)&&c._pause(t.id,t._iO.multiShot),t._iO.onpause&&t._iO.onpause.apply(t)),t},this.resume=function(){var o=t._iO;return t.paused&&(t.paused=!1,t.playState=1,t.isHTML5?(t._setup_html5().play(),T()):(o.isMovieStar&&!o.serverURL&&t.setPosition(t.position),c._pause(t.id,o.multiShot)),!D&&o.onplay?(o.onplay.apply(t),D=!0):o.onresume&&o.onresume.apply(t)),t},this.togglePause=function(){return 0===t.playState?(t.play({position:9!==_||t.isHTML5?t.position/1e3:t.position}),t):(t.paused?t.resume():t.pause(),t)},this.setPan=function(o,s){return o===l&&(o=0),s===l&&(s=!1),t.isHTML5||c._setPan(t.id,o),t._iO.pan=o,s||(t.pan=o,t.options.pan=o),t},this.setVolume=function(o,s){return o===l&&(o=100),s===l&&(s=!1),t.isHTML5?t._a&&(n.muted&&!t.muted&&(t.muted=!0,t._a.muted=!0),t._a.volume=Math.max(0,Math.min(1,o/100))):c._setVolume(t.id,n.muted&&!t.muted||t.muted?0:o),t._iO.volume=o,s||(t.volume=o,t.options.volume=o),t},this.mute=function(){return t.muted=!0,t.isHTML5?t._a&&(t._a.muted=!0):c._setVolume(t.id,0),t},this.unmute=function(){t.muted=!1;var o=t._iO.volume!==l;return t.isHTML5?t._a&&(t._a.muted=!1):c._setVolume(t.id,o?t._iO.volume:t.options.volume),t},this.toggleMute=function(){return t.muted?t.unmute():t.mute()},this.onposition=this.onPosition=function(o,s,r){return L.push({position:parseInt(o,10),method:s,scope:r!==l?r:t,fired:!1}),t},this.clearOnPosition=function(o,s){var r;if(o=parseInt(o,10),!isNaN(o))for(r=0;r<L.length;r++)o!==L[r].position||s&&s!==L[r].method||(L[r].fired&&j--,L.splice(r,1))},this._processOnPosition=function(){var o,s;if(!(o=L.length)||!t.playState||j>=o)return!1;for(--o;0<=o;o--)!(s=L[o]).fired&&t.position>=s.position&&(s.fired=!0,j++,s.method.apply(s.scope,[s.position]));return!0},this._resetOnPosition=function(o){var s,r;if(!(s=L.length))return!1;for(--s;0<=s;s--)(r=L[s]).fired&&o<=r.position&&(r.fired=!1,j--);return!0},_e=function(){var f,y,o=t._iO,s=o.from,r=o.to;return y=function(){t.clearOnPosition(r,y),t.stop()},f=function(){null!==r&&!isNaN(r)&&t.onPosition(r,y)},null===s||isNaN(s)||(o.position=s,o.multiShot=!1,f()),o},A=function(){var o,s=t._iO.onposition;if(s)for(o in s)s.hasOwnProperty(o)&&t.onPosition(parseInt(o,10),s[o])},Xt=function(){var o,s=t._iO.onposition;if(s)for(o in s)s.hasOwnProperty(o)&&t.clearOnPosition(parseInt(o,10))},T=function(){t.isHTML5&&ie(t)},m=function(){t.isHTML5&&oe(t)},(u=function(o){o||(L=[],j=0),D=!1,t._hasTimer=null,t._a=null,t._html5_canplay=!1,t.bytesLoaded=null,t.bytesTotal=null,t.duration=t._iO&&t._iO.duration?t._iO.duration:null,t.durationEstimate=null,t.buffered=[],t.eqData=[],t.eqData.left=[],t.eqData.right=[],t.failures=0,t.isBuffering=!1,t.instanceOptions={},t.instanceCount=0,t.loaded=!1,t.metadata={},t.readyState=0,t.muted=!1,t.paused=!1,t.peakData={left:0,right:0},t.waveformData={left:[],right:[]},t.playState=0,t.position=null,t.id3={}})(),this._onTimer=function(o){var s,r=!1,f={};return(t._hasTimer||o)&&t._a&&(o||(0<t.playState||1===t.readyState)&&!t.paused)&&((s=t._get_html5_duration())!==i&&(i=s,t.duration=s,r=!0),t.durationEstimate=t.duration,(s=1e3*t._a.currentTime||0)!==a&&(a=s,r=!0),(r||o)&&t._whileplaying(s,f,f,f,f)),r},this._get_html5_duration=function(){var o=t._iO;return(o=t._a&&t._a.duration?1e3*t._a.duration:o&&o.duration?o.duration:null)&&!isNaN(o)&&o!==1/0?o:null},this._apply_loop=function(o,s){o.loop=1<s?"loop":""},this._setup_html5=function(o){o=w(t._iO,o);var f,s=I?Zt:t._a,r=decodeURI(o.url);if(I?r===decodeURI(Bt)&&(f=!0):r===decodeURI(V)&&(f=!0),s){if(s._s)if(I)s._s&&s._s.playState&&!f&&s._s.stop();else if(!I&&r===decodeURI(V))return t._apply_loop(s,o.loops),s;f||(V&&u(!1),s.src=o.url,Bt=V=t.url=o.url,s._called_load=!1)}else o.autoLoad||o.autoPlay?(t._a=new Audio(o.url),t._a.load()):t._a=Wt&&10>opera.version()?new Audio(null):new Audio,(s=t._a)._called_load=!1,I&&(Zt=s);return t.isHTML5=!0,t._a=s,s._s=t,d(),t._apply_loop(s,o.loops),o.autoLoad||o.autoPlay?t.load():(s.autobuffer=!1,s.preload="auto"),s},d=function(){if(t._a._added_events)return!1;var o;for(o in t._a._added_events=!0,C)C.hasOwnProperty(o)&&t._a&&t._a.addEventListener(o,C[o],!1);return!0},h=function(){var o;for(o in t._a._added_events=!1,C)C.hasOwnProperty(o)&&t._a&&t._a.removeEventListener(o,C[o],!1)},this._onload=function(o){var s=!!o||!t.isHTML5&&8===_&&t.duration;return t.loaded=s,t.readyState=s?3:2,t._onbufferchange(0),s||t.isHTML5||t._onerror(),t._iO.onload&&st(t,function(){t._iO.onload.apply(t,[s])}),!0},this._onerror=function(o,s){t._iO.onerror&&st(t,function(){t._iO.onerror.apply(t,[o,s])})},this._onbufferchange=function(o){return!(0===t.playState||o&&t.isBuffering||!o&&!t.isBuffering||(t.isBuffering=1===o,t._iO.onbufferchange&&t._iO.onbufferchange.apply(t,[o]),0))},this._onsuspend=function(){return t._iO.onsuspend&&t._iO.onsuspend.apply(t),!0},this._onfailure=function(o,s,r){t.failures++,t._iO.onfailure&&1===t.failures&&t._iO.onfailure(o,s,r)},this._onwarning=function(o,s,r){t._iO.onwarning&&t._iO.onwarning(o,s,r)},this._onfinish=function(){var o=t._iO.onfinish;t._onbufferchange(0),t._resetOnPosition(0),t.instanceCount&&(t.instanceCount--,t.instanceCount||(Xt(),t.playState=0,t.paused=!1,t.instanceCount=0,t.instanceOptions={},t._iO={},m(),t.isHTML5&&(t.position=0)),(!t.instanceCount||t._iO.multiShotEvents)&&o&&st(t,function(){o.apply(t)}))},this._whileloading=function(o,s,r,f){var y=t._iO;t.bytesLoaded=o,t.bytesTotal=s,t.duration=Math.floor(r),t.bufferLength=f,t.durationEstimate=t.isHTML5||y.isMovieStar?t.duration:y.duration?t.duration>y.duration?t.duration:y.duration:parseInt(t.bytesTotal/t.bytesLoaded*t.duration,10),t.isHTML5||(t.buffered=[{start:0,end:t.duration}]),(3!==t.readyState||t.isHTML5)&&y.whileloading&&y.whileloading.apply(t)},this._whileplaying=function(o,s,r,f,y){var k=t._iO;return!isNaN(o)&&null!==o&&(t.position=Math.max(0,o),t._processOnPosition(),!t.isHTML5&&8<_&&(k.usePeakData&&s!==l&&s&&(t.peakData={left:s.leftPeak,right:s.rightPeak}),k.useWaveformData&&r!==l&&r&&(t.waveformData={left:r.split(","),right:f.split(",")}),k.useEQData&&y!==l&&y&&y.leftEQ&&(o=y.leftEQ.split(","),t.eqData=o,t.eqData.left=o,y.rightEQ!==l&&y.rightEQ&&(t.eqData.right=y.rightEQ.split(",")))),1===t.playState&&(t.isHTML5||8!==_||t.position||!t.isBuffering||t._onbufferchange(0),k.whileplaying&&k.whileplaying.apply(t)),!0)},this._oncaptiondata=function(o){t.captiondata=o,t._iO.oncaptiondata&&t._iO.oncaptiondata.apply(t,[o])},this._onmetadata=function(o,s){var f,y,r={};for(f=0,y=o.length;f<y;f++)r[o[f]]=s[f];t.metadata=r,t._iO.onmetadata&&t._iO.onmetadata.call(t,t.metadata)},this._onid3=function(o,s){var f,y,r=[];for(f=0,y=o.length;f<y;f++)r[o[f]]=s[f];t.id3=w(t.id3,r),t._iO.onid3&&t._iO.onid3.apply(t)},this._onconnect=function(o){(t.connected=o=1===o)&&(t.failures=0,O(t.id)&&(t.getAutoPlay()?t.play(l,t.getAutoPlay()):t._iO.autoLoad&&t.load()),t._iO.onconnect&&t._iO.onconnect.apply(t,[o]))},this._ondataerror=function(o){0<t.playState&&t._iO.ondataerror&&t._iO.ondataerror.apply(t)}},Ht=function(){return v.body||v.getElementsByTagName("div")[0]},ut=function(e){return v.getElementById(e)},w=function(e,i){var t,u,a=e||{};for(u in t=i===l?n.defaultOptions:i)t.hasOwnProperty(u)&&a[u]===l&&(a[u]="object"!=typeof t[u]||null===t[u]?t[u]:w(a[u],t[u]));return a},st=function(e,i){e.isHTML5||8!==_?i():p.setTimeout(i,0)},lt={onready:1,ontimeout:1,defaultOptions:1,flash9Options:1,movieStarOptions:1},St=function(e,i){var a,t=!0,u=i!==l,d=n.setupOptions;for(a in e)if(e.hasOwnProperty(a))if("object"!=typeof e[a]||null===e[a]||e[a]instanceof Array||e[a]instanceof RegExp)u&&lt[i]!==l?n[i][a]=e[a]:d[a]!==l?(n.setupOptions[a]=e[a],n[a]=e[a]):lt[a]===l?t=!1:n[a]instanceof Function?n[a].apply(n,e[a]instanceof Array?e[a]:[e[a]]):n[a]=e[a];else{if(lt[a]!==l)return St(e[a],a);t=!1}return t},g=function(){function e(u){var d=(u=ve.call(u)).length;return a?(u[1]="on"+u[1],3<d&&u.pop()):3===d&&u.push(!1),u}function i(u,d){var h=u.shift(),m=[t[d]];a?h[m](u[0],u[1]):h[m].apply(h,u)}var a=p.attachEvent,t={add:a?"attachEvent":"addEventListener",remove:a?"detachEvent":"removeEventListener"};return{add:function(){i(e(arguments),"add")},remove:function(){i(e(arguments),"remove")}}}(),C={abort:M(function(){}),canplay:M(function(){var i,e=this._s;if(!e._html5_canplay){if(e._html5_canplay=!0,e._onbufferchange(0),i=e._iO.position===l||isNaN(e._iO.position)?null:e._iO.position/1e3,this.currentTime!==i)try{this.currentTime=i}catch(a){}e._iO._oncanplay&&e._iO._oncanplay()}}),canplaythrough:M(function(){var e=this._s;e.loaded||(e._onbufferchange(0),e._whileloading(e.bytesLoaded,e.bytesTotal,e._get_html5_duration()),e._onload(!0))}),durationchange:M(function(){var i,e=this._s;i=e._get_html5_duration(),isNaN(i)||i===e.duration||(e.durationEstimate=e.duration=i)}),ended:M(function(){this._s._onfinish()}),error:M(function(){var e=re[this.error.code]||null;this._s._onload(!1),this._s._onerror(this.error.code,e)}),loadeddata:M(function(){var e=this._s;e._loaded||Ot||(e.duration=e._get_html5_duration())}),loadedmetadata:M(function(){}),loadstart:M(function(){this._s._onbufferchange(1)}),play:M(function(){this._s._onbufferchange(0)}),playing:M(function(){this._s._onbufferchange(0)}),progress:M(function(e){var a,t,i=this._s,u=0;u=e.target.buffered,a=e.loaded||0;var d=e.total||1;if(i.buffered=[],u&&u.length){for(a=0,t=u.length;a<t;a++)i.buffered.push({start:1e3*u.start(a),end:1e3*u.end(a)});u=1e3*(u.end(0)-u.start(0)),a=Math.min(1,u/(1e3*e.target.duration))}isNaN(a)||(i._whileloading(a,d,i._get_html5_duration()),a&&d&&a===d&&C.canplaythrough.call(this,e))}),ratechange:M(function(){}),suspend:M(function(e){var i=this._s;C.progress.call(this,e),i._onsuspend()}),stalled:M(function(){}),timeupdate:M(function(){this._s._onTimer()}),waiting:M(function(){this._s._onbufferchange(1)})},yt=function(e){return!(!e||!(e.type||e.url||e.serverURL))&&!(e.serverURL||e.type&&rt(e.type))&&(e.type?at({type:e.type}):at({url:e.url})||n.html5Only||e.url.match(/data:/i))},vt=function(e){var i;return e&&(i=Ot?"about:blank":n.html5.canPlayType("audio/wav")?"data:audio/wave;base64,/UklGRiYAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQIAAAD//w==":"about:blank",e.src=i,e._called_unload!==l&&(e._called_load=!1)),I&&(Bt=null),i},at=function(e){if(!n.useHTML5Audio||!n.hasHTML5)return!1;var t,i=e.url||null,a=n.audioFormats;if((e=e.type||null)&&n.html5[e]!==l)return n.html5[e]&&!rt(e);if(!R){for(t in R=[],a)a.hasOwnProperty(t)&&(R.push(t),a[t].related&&(R=R.concat(a[t].related)));R=new RegExp("\\.("+R.join("|")+")(\\?.*)?$","i")}return(t=i?i.toLowerCase().match(R):null)&&t.length?t=t[1]:e&&(t=(-1!==(i=e.indexOf(";"))?e.substr(0,i):e).substr(6)),t&&n.html5[t]!==l?i=n.html5[t]&&!rt(t):(i=n.html5.canPlayType({type:e="audio/"+t}),i=(n.html5[t]=i)&&n.html5[e]&&!rt(e)),i},ue=function(){function e(m){var T,A=T=!1;if(!i||"function"!=typeof i.canPlayType)return T;if(m instanceof Array){for(h=0,T=m.length;h<T;h++)(n.html5[m[h]]||i.canPlayType(m[h]).match(n.html5Test))&&(A=!0,n.html5[m[h]]=!0,n.flash[m[h]]=!!m[h].match(pe));T=A}else T=!(!(m=!(!i||"function"!=typeof i.canPlayType)&&i.canPlayType(m))||!m.match(n.html5Test));return T}if(!n.useHTML5Audio||!n.hasHTML5)return E=n.html5.usingFlash=!0,!1;var a,t,d,h,i=Audio!==l?Wt&&10>opera.version()?new Audio(null):new Audio:null,u={};for(a in d=n.audioFormats)if(d.hasOwnProperty(a)&&(t="audio/"+a,u[a]=e(d[a].type),u[t]=u[a],a.match(pe)?(n.flash[a]=!0,n.flash[t]=!0):(n.flash[a]=!1,n.flash[t]=!1),d[a]&&d[a].related))for(h=d[a].related.length-1;0<=h;h--)u["audio/"+d[a].related[h]]=u[a],n.html5[d[a].related[h]]=u[a],n.flash[d[a].related[h]]=u[a];return u.canPlayType=i?e:null,n.html5=w(n.html5,u),n.html5.usingFlash=se(),E=n.html5.usingFlash,!0},G={},tt=function(){},pt=function(e){return 8===_&&1<e.loops&&e.stream&&(e.stream=!1),e},ht=function(e,i){return e&&!e.usePolicyFile&&(e.onid3||e.usePeakData||e.useWaveformData||e.useEQData)&&(e.usePolicyFile=!0),e},Lt=function(){return!1},Ct=function(e){for(var i in e)e.hasOwnProperty(i)&&"function"==typeof e[i]&&(e[i]=Lt)},kt=function(e){e===l&&(e=!1),(F||e)&&n.disable(e)},ne=function(e){if(e)if(e.match(/\.swf(\?.*)?$/i)){if(e.substr(e.toLowerCase().lastIndexOf(".swf?")+4))return e}else e.lastIndexOf("/")!==e.length-1&&(e+="/");return e=(e&&-1!==e.lastIndexOf("/")?e.substr(0,e.lastIndexOf("/")+1):"./")+n.movieURL,n.noSWFCache&&(e+="?ts="+(new Date).getTime()),e},Et=function(){8!==(_=parseInt(n.flashVersion,10))&&9!==_&&(n.flashVersion=_=8);var e=n.debugMode||n.debugFlash?"_debug.swf":".swf";n.useHTML5Audio&&!n.html5Only&&n.audioFormats.mp4.required&&9>_&&(n.flashVersion=_=9),n.version=n.versionNumber+(n.html5Only?" (HTML5-only mode)":9===_?" (AS3/Flash 9)":" (AS2/Flash 8)"),8<_?(n.defaultOptions=w(n.defaultOptions,n.flash9Options),n.features.buffering=!0,n.defaultOptions=w(n.defaultOptions,n.movieStarOptions),n.filePatterns.flash9=new RegExp("\\.(mp3|"+me.join("|")+")(\\?.*)?$","i"),n.features.movieStar=!0):n.features.movieStar=!1,n.filePattern=n.filePatterns[8!==_?"flash9":"flash8"],n.movieURL=(8===_?"soundmanager2.swf":"soundmanager2_flash9.swf").replace(".swf",e),n.features.peakData=n.features.waveformData=n.features.eqData=8<_},ee=function(e,i){c&&c._setPolling(e,i)},O=this.getSoundById,X=function(){var e=[];return n.debugMode&&e.push("sm2_debug"),n.debugFlash&&e.push("flash_debug"),n.useHighPerformance&&e.push("high_performance"),e.join(" ")},xt=function(){tt("fbHandler");var e=n.getMoviePercent(),i={type:"FLASHBLOCK"};n.html5Only||(n.ok()?n.oMC&&(n.oMC.className=[X(),"movieContainer","swf_loaded"+(n.didFlashBlock?" swf_unblocked":"")].join(" ")):(E&&(n.oMC.className=X()+" movieContainer "+(null===e?"swf_timedout":"swf_error")),n.didFlashBlock=!0,B({type:"ontimeout",ignoreInit:!0,error:i}),K(i)))},It=function(e,i,a){H[e]===l&&(H[e]=[]),H[e].push({method:i,scope:a||null,fired:!1})},B=function(e){if(e||(e={type:n.ok()?"onready":"ontimeout"}),!S&&e&&!e.ignoreInit||"ontimeout"===e.type&&(n.ok()||F&&!e.ignoreInit))return!1;var t,u={success:e&&e.ignoreInit?n.ok():!F},i=e&&e.type&&H[e.type]||[],a=[],d=(u=[u],E&&!n.ok());for(e.error&&(u[0].error=e.error),e=0,t=i.length;e<t;e++)!0!==i[e].fired&&a.push(i[e]);if(a.length)for(e=0,t=a.length;e<t;e++)a[e].method.apply(a[e].scope?a[e].scope:this,u),d||(a[e].fired=!0);return!0},W=function(){p.setTimeout(function(){n.useFlashBlock&&xt(),B(),"function"==typeof n.onload&&n.onload.apply(p),n.waitForWindowLoad&&g.add(p,"load",W)},1)},qt=function(){if(x!==l)return x;var a,u,e=!1,i=navigator,t=p.ActiveXObject;try{u=i.plugins}catch(d){u=void 0}if(u&&u.length)(i=i.mimeTypes)&&i["application/x-shockwave-flash"]&&i["application/x-shockwave-flash"].enabledPlugin&&i["application/x-shockwave-flash"].enabledPlugin.description&&(e=!0);else if(t!==l&&!P.match(/MSAppHost/i)){try{a=new t("ShockwaveFlash.ShockwaveFlash")}catch(d){a=null}e=!!a}return x=e},se=function(){var e,i,a=n.audioFormats;if(Vt&&P.match(/os (1|2|3_0|3_1)\s/i)?(n.hasHTML5=!1,n.html5Only=!0,n.oMC&&(n.oMC.style.display="none")):!n.useHTML5Audio||n.html5&&n.html5.canPlayType||(n.hasHTML5=!1),n.useHTML5Audio&&n.hasHTML5)for(i in ot=!0,a)a.hasOwnProperty(i)&&a[i].required&&(n.html5.canPlayType(a[i].type)?n.preferFlash&&(n.flash[i]||n.flash[a[i].type])&&(e=!0):(ot=!1,e=!0));return n.ignoreFlash&&(e=!1,ot=!0),n.html5Only=n.hasHTML5&&n.useHTML5Audio&&!e,!n.html5Only},_t=function(e){var i,a,t=0;if(e instanceof Array){for(i=0,a=e.length;i<a;i++)if(e[i]instanceof Object){if(n.canPlayMIME(e[i].type)){t=i;break}}else if(n.canPlayURL(e[i])){t=i;break}e[t].url&&(e[t]=e[t].url),e=e[t]}return e},ie=function(e){e._hasTimer||(e._hasTimer=!0,!gt&&n.html5PollingInterval&&(null===nt&&0===mt&&(nt=setInterval(ae,n.html5PollingInterval)),mt++))},oe=function(e){e._hasTimer&&(e._hasTimer=!1,!gt&&n.html5PollingInterval&&mt--)},ae=function(){var e;if(null===nt||mt)for(e=n.soundIDs.length-1;0<=e;e--)n.sounds[n.soundIDs[e]].isHTML5&&n.sounds[n.soundIDs[e]]._hasTimer&&n.sounds[n.soundIDs[e]]._onTimer();else clearInterval(nt),nt=null},K=function(e){e=e!==l?e:{},"function"==typeof n.onerror&&n.onerror.apply(p,[{type:e.type!==l?e.type:null}]),e.fatal!==l&&e.fatal&&n.disable()},le=function(){if(fe&&qt()){var i,a,e=n.audioFormats;for(a in e)if(e.hasOwnProperty(a)&&("mp3"===a||"mp4"===a)&&(n.html5[a]=!1,e[a]&&e[a].related))for(i=e[a].related.length-1;0<=i;i--)n.html5[e[a].related[i]]=!1}},this._setSandboxType=function(e){},this._externalInterfaceOK=function(e){n.swfLoaded||(n.swfLoaded=!0,Mt=!1,fe&&le(),setTimeout(Pt,N?100:1))},ct=function(e,i){function a(L,j){return'<param name="'+L+'" value="'+j+'" />'}if(J&&Y)return!1;if(n.html5Only)return Et(),n.oMC=ut(n.movieID),Pt(),Y=J=!0,!1;var m,T,A,t=i||n.url,u=n.altURL||t,d=Ht(),h=X(),D=null;if(D=(D=v.getElementsByTagName("html")[0])&&D.dir&&D.dir.match(/rtl/i),e=e===l?n.id:e,Et(),n.url=ne(Gt?t:u),i=n.url,n.wmode=!n.wmode&&n.useHighPerformance?"transparent":n.wmode,null!==n.wmode&&(P.match(/msie 8/i)||!N&&!n.useHighPerformance)&&navigator.platform.match(/win32|win64/i)&&(it.push(G.spcWmode),n.wmode=null),d={name:e,id:e,src:i,quality:"high",allowScriptAccess:n.allowScriptAccess,bgcolor:n.bgColor,pluginspage:ge+"www.macromedia.com/go/getflashplayer",title:"JS/Flash audio component (SoundManager 2)",type:"application/x-shockwave-flash",wmode:n.wmode,hasPriority:"true"},n.debugFlash&&(d.FlashVars="debug=1"),n.wmode||delete d.wmode,N)t=v.createElement("div"),T=['<object id="'+e+'" data="'+i+'" type="'+d.type+'" title="'+d.title+'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0">',a("movie",i),a("AllowScriptAccess",n.allowScriptAccess),a("quality",d.quality),n.wmode?a("wmode",n.wmode):"",a("bgcolor",n.bgColor),a("hasPriority","true"),n.debugFlash?a("FlashVars",d.FlashVars):"","</object>"].join("");else for(m in t=v.createElement("embed"),d)d.hasOwnProperty(m)&&t.setAttribute(m,d[m]);if(h=X(),d=Ht())if(n.oMC=ut(n.movieID)||v.createElement("div"),n.oMC.id)n.oMC.className=((A=n.oMC.className)?A+" ":"movieContainer")+(h?" "+h:""),n.oMC.appendChild(t),N&&((m=n.oMC.appendChild(v.createElement("div"))).className="sm2-object-box",m.innerHTML=T),Y=!0;else{if(n.oMC.id=n.movieID,n.oMC.className="movieContainer "+h,m=h=null,n.useFlashBlock||(n.useHighPerformance?h={position:"fixed",width:"8px",height:"8px",bottom:"0px",left:"0px",overflow:"hidden"}:(h={position:"absolute",width:"6px",height:"6px",top:"-9999px",left:"-9999px"},D&&(h.left=Math.abs(parseInt(h.left,10))+"px"))),Oe&&(n.oMC.style.zIndex=1e4),!n.debugFlash)for(A in h)h.hasOwnProperty(A)&&(n.oMC.style[A]=h[A]);try{N||n.oMC.appendChild(t),d.appendChild(n.oMC),N&&((m=n.oMC.appendChild(v.createElement("div"))).className="sm2-object-box",m.innerHTML=T),Y=!0}catch(L){throw Error(tt("domError")+" \n"+L.toString())}}return J=!0},ft=function(){return n.html5Only?(ct(),!1):!(c||!n.url||((c=n.getMovie(n.id))||(b?(N?n.oMC.innerHTML=Rt:n.oMC.appendChild(b),b=null,J=!0):ct(n.id,n.url),c=n.getMovie(n.id)),"function"==typeof n.oninitmovie&&setTimeout(n.oninitmovie,1),0))},$=function(){setTimeout(te,1e3)},At=function(){p.setTimeout(function(){n.setup({preferFlash:!1}).reboot(),n.didFlashBlock=!0,n.beginDelayedInit()},1)},te=function(){var e,i=!1;n.url&&!et&&(et=!0,g.remove(p,"load",$),x&&Mt&&!$t||(S||0<(e=n.getMoviePercent())&&100>e&&(i=!0),setTimeout(function(){e=n.getMoviePercent(),i?(et=!1,p.setTimeout($,1)):!S&&ce&&(null===e?n.useFlashBlock||0===n.flashLoadTimeout?n.useFlashBlock&&xt():!n.useFlashBlock&&ot?At():B({type:"ontimeout",ignoreInit:!0,error:{type:"INIT_FLASHBLOCK"}}):0!==n.flashLoadTimeout&&(!n.useFlashBlock&&ot?At():kt(!0)))},n.flashLoadTimeout)))},dt=function(){return $t||!Mt?(g.remove(p,"focus",dt),!0):($t=ce=!0,et=!1,$(),g.remove(p,"focus",dt),!0)},Z=function(e){if(S)return!1;if(n.html5Only)return S=!0,W(),!0;var a,i=!0;return n.useFlashBlock&&n.flashLoadTimeout&&!n.getMoviePercent()||(S=!0),a={type:!x&&E?"NO_FLASH":"INIT_TIMEOUT"},(F||e)&&(n.useFlashBlock&&n.oMC&&(n.oMC.className=X()+" "+(null===n.getMoviePercent()?"swf_timedout":"swf_error")),B({type:"ontimeout",error:a,ignoreInit:!0}),K(a),i=!1),F||(n.waitForWindowLoad&&!wt?g.add(p,"load",W):W()),i},bt=function(){var e,i=n.setupOptions;for(e in i)i.hasOwnProperty(e)&&(n[e]===l?n[e]=i[e]:n[e]!==i[e]&&(n.setupOptions[e]=n[e]))},Pt=function(){if(S)return!1;if(n.html5Only)return S||(g.remove(p,"load",n.beginDelayedInit),n.enabled=!0,Z()),!0;ft();try{c._externalInterfaceTest(!1),ee(!0,n.flashPollingInterval||(n.useHighPerformance?10:50)),n.debugMode||c._disableDebug(),n.enabled=!0,n.html5Only||g.add(p,"unload",Lt)}catch(e){return K({type:"JS_TO_FLASH_EXCEPTION",fatal:!0}),kt(!0),Z(),!1}return Z(),g.remove(p,"load",n.beginDelayedInit),!0},q=function(){return!z&&(z=!0,bt(),!x&&n.hasHTML5&&n.setup({useHTML5Audio:!0,preferFlash:!1}),ue(),!x&&E&&(it.push(G.needFlash),n.setup({flashLoadTimeout:1})),v.removeEventListener&&v.removeEventListener("DOMContentLoaded",q,!1),ft(),!0)},Ut=function(){return"complete"===v.readyState&&(q(),v.detachEvent("onreadystatechange",Ut)),!0},Dt=function(){wt=!0,q(),g.remove(p,"load",Dt)},qt(),g.add(p,"focus",dt),g.add(p,"load",$),g.add(p,"load",Dt),v.addEventListener?v.addEventListener("DOMContentLoaded",q,!1):v.attachEvent?v.attachEvent("onreadystatechange",Ut):K({type:"NO_DOM2_EVENTS",fatal:!0})}if(!p||!p.document)throw Error("SoundManager requires a browser with window and document objects.");var Tt=null;p.SM2_DEFER!==l&&SM2_DEFER||(Tt=new Q),"object"==typeof module&&module&&"object"==typeof module.exports?(module.exports.SoundManager=Q,module.exports.soundManager=Tt):"function"==typeof define&&define.amd&&define(function(){return{constructor:Q,getInstance:function(U){return!p.soundManager&&U instanceof Function&&(U=U(Q))instanceof Q&&(p.soundManager=U),p.soundManager}}}),p.SoundManager=Q,p.soundManager=Tt}(window);