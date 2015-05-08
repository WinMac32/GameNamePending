/*
 * JSFace Object Oriented Programming Library
 * https://github.com/tnhu/jsface
 *
 * Copyright (c) Tan Nhu
 * Licensed under MIT license (https://github.com/tnhu/jsface/blob/master/LICENSE.txt)
 */
(function(q,x,y,z,F,A,B,G,C,r){function D(a){return a&&typeof a===x&&!(typeof a.length===y&&!a.propertyIsEnumerable(z))&&a||null}function E(a){return a&&typeof a===x&&typeof a.length===y&&!a.propertyIsEnumerable(z)&&a||null}function u(a){return a&&"function"===typeof a&&a||null}function v(a){return u(a)&&a.prototype&&a===a.prototype.constructor&&a||null}function w(a,c,b){if(E(c))for(var f=c.length;0<=--f;)w(a,c[f],b);else{b=b||{constructor:1,$super:1,prototype:1,$superp:1};var f=v(a),k=v(c),d=a.prototype,g,h;if(D(c)||f)for(g in c){h=g;var l=c[g],e=a;b&&b.hasOwnProperty(h)||(e[h]=l)}if(k)for(g in h=c.prototype,h){var l=g,e=h[g],n=a;b&&b.hasOwnProperty(l)||(n[l]=e)}f&&k&&w(d,c.prototype,b)}}function t(a,c){c||(a=(c=a,0));var b,f,k,d,g,h,l=0,e,n={constructor:1,$singleton:1,$statics:1,prototype:1,$super:1,$superp:1,main:1,toString:0},p=t.plugins,m;c=("function"===typeof c?c():c)||{};b=c.hasOwnProperty("constructor")?c.constructor:0;f=c.$singleton;k=c.$statics;for(d in p)n[d]=1;b=f?function(){}:b?b:function(){};h=(a=!a||a instanceof Array?a:[a])&&a.length;m=a[0];!f&&h&&((g=m.prototype&&m===m.prototype.constructor&&m)?(e=function(){},e.prototype=g.prototype,e.prototype.constructor=e,b.prototype=new e,b.prototype.constructor=b,g.prototype.constructor=g):b.prototype=m);for(g=f?b:b.prototype;l<h;){e=a[l++];for(d in e)n[d]||(b[d]=e[d]);if(!f&&0!=l)for(d in e.prototype)n[d]||(g[d]=e.prototype[d])}for(d in c)n[d]||(g[d]=c[d]);for(d in k)b[d]=k[d];e=a&&m||a;b.$super=e;b.$superp=e&&e.prototype||e;for(d in p)p[d](b,a,c);"function"===typeof c.main&&c.main.call(b,b);return b}t.plugins={$ready:function c(b,f,k,d){for(var g=k.$ready,h=f?f.length:0,l=h,e=h&&f[0].$super,n,p,m;h--;)for(p=0;p<B&&(m=A[p],n=f[h],n===m[0]&&(m[1].call(n,b,f,k),l--),l);p++);e&&c(b,[e],k,!0);!d&&u(g)&&(g.call(b,b,f,k),A.push([b,g]),B++)}};r={Class:t,extend:w,mapOrNil:D,arrayOrNil:E,functionOrNil:u,classOrNil:v};"undefined"!==typeof module&&module.exports?module.exports=r:(C=q.Class,q.Class=t,q.jsface=r,r.noConflict=function(){q.Class=C})})(this,"object","number","length",Object.prototype.toString,[],0);