var navLinkArray = ["link-home", "link-projects", "link-resume", "link-about"];
//var navItemArray = ["justeenlee.com","projects","resume","about"];

var currentPath = window.location.pathname.split("/")[(window.location.pathname.split("/").length) - 2];

var navLinkColorAtTop, navColorAtTop, navColorAtContent;
var curNavLinkColor = "#F51488";

function move(input) {
    var dot = $("#indicator-dot");
    //so that all navigation have the same tags
    if (input == "currentPath") {
        input = currentPath;
    }
    if ((input == "Portfolio") || (input == "justeenlee.com") || (input == "")) {
        input = "index";
    }
    console.log(input);
    if (window.innerWidth > 680) {
        if (input == "index") {
            dot.css("left", "17.6%");
        } else if (input == "resume") {
            dot.css("left", "59.5%");
        } else if (input == "about") {
            dot.css("left", "79%");
        } else {
            // projects
            dot.css("left", "40%");
        }
        $("#indicator-dot").css("opacity", 1);
    } else {
        $("#indicator-dot").css("opacity", 0);
    }
}

//auto run function to set up when page is loaded
(function () {
    initAll();
    console.log("current path = " + currentPath);
    navColorAtTop = $("#navBand").css("backgroundColor");
    navLinkColorAtTop = $("#link-home").css("color");
    move(currentPath);
    setFullWidth();
    setNavLinkColor();
    setInitialNavProperty();
})();

function initAll() {
    $("#link-projects").text("WORK");
}

function centerIssueImg() {
    var issueImgArray = $(".issue-img");
    //    console.log(issueImgArray);    
    for (var i = 0; i < issueImgArray.length; i++) {
        var newMarginLeft = issueImgArray[i].clientWidth / (-2);
        console.log(newMarginLeft);
        issueImgArray[i].style.marginLeft = newMarginLeft + "px";
        //$("#title-panel").css("margin-left", newMarginLeft);
    }
}

$(window).scroll(function () {
    check();
    setNavLinkColor();
    if ($(".issue-img") != null) {
        centerIssueImg();
    }
});

$(window).resize(function () {

    if (window.innerWidth > 679) {
        $("#indicator-dot").css("opacity", 1);
        move("currentPath");
        setFullWidth();
    } else {
        $("#indicator-dot").css("opacity", 0);
    }
});

function setFullWidth() {
    var newWidth = window.innerWidth;
    var newMarginLeft = (-(newWidth / 2)) + "px";
    $("#title-panel").width(newWidth);
    $("#title-panel").css("margin-left", newMarginLeft);
    //    $("#navigation").width(newWidth);
    //    $("#navigation").css("margin-left", newMarginLeft);
    //    $("#navigation").css("left", newWidth*0.5);
    $(".band").width(newWidth);
    $(".band").css("margin-left", newMarginLeft);
    //$(".band").css("left", "50%");
    $(".project-overview").width(newWidth);
    $(".project-overview").css("margin-left", newMarginLeft);


}



var toChangeNavColor = false;

function check() {
    if ((currentPath != "") &&
        (currentPath != "index") &&
        (currentPath != "projects") &&
        (currentPath != "resume") &&
        (currentPath != "about") &&
        (currentPath != "motion") &&
        (currentPath != "expression") &&
        (currentPath != "tv")) {
        //if it's an actual project, change color = true
        toChangeNavColor = true;
    } else {
        toChangeNavColor = false;
    }
    //    console.log("change color = " + toChangeNavColor);
}

//triggered when scrolling
//set nav color from start + update navigation text color and cf color,opacity
function setNavLinkColor() {
    var i = 0;
    if (toChangeNavColor) {
        var currentViewTopEdgePosition = $(window).scrollTop();
        if (currentViewTopEdgePosition > 625) {
            setNavAtContentColor();
        } else {
            for (var i = 0; i < navLinkArray.length; i++) {
                var linkName = "#" + navLinkArray[i];
                $(linkName).css("color", navLinkColorAtTop);
            }
            $("#indicator-dot").css("backgroundColor", navLinkColorAtTop);
            $("#navBand").css("backgroundColor", navColorAtTop);
        }
    }
    if (window.innerWidth < 679) {
        $("#indicator-dot").css("opacity", 0);
    }
    //    if (currentPath == "about") {
    //        //$("#navigation").css("backgroundColor", "#222");
    //    } else if (currentPath == "resume") {
    //        $("#navBand").css("backgroundColor", "yellow");
    //    }
}

//also set navLinkColorAtTop with this function
function setInitialNavProperty() {
    if ((currentPath == "motion") ||
        (currentPath == "expression") ||
        (currentPath == "ux")) {
        for (var i = 0; i < navLinkArray.length; i++) {
            var linkName = "#" + navLinkArray[i];
            $(linkName).css("color", "#555");
        }
        $("#indicator-dot").css("backgroundColor", "#555");
        $("#cf").css("opacity", ".7");
    }
    if (currentPath == "projects") {
        for (var i = 0; i < navLinkArray.length; i++) {
            var linkName = "#" + navLinkArray[i];
            $(linkName).css("color", "#F51488");
        }
    }
    //090116 hard code indicator color
    if (currentPath == "" ||
        currentPath == "index" ||
        currentPath == "projects" ||
        currentPath == "about" ||
        currentPath == "resume") {
        $("#indicator-dot").css("backgroundColor", "#F51488");
    } else if (currentPath == "pinterest") {
        $("#indicator-dot").css("backgroundColor", "#BD081C");
    } else if (currentPath == "objectui" ||
        currentPath == "experiment" ||
        currentPath == "calor" ||
        currentPath == "gestureai"
    ) {
        $("#indicator-dot").css("backgroundColor", "#232323");
    } else if (currentPath == "tv") {
        $("#indicator-dot").css("backgroundColor", "white");
    } else if (currentPath == "parsons") {
        $("#indicator-dot").css("backgroundColor", "#fa4b2a");
    } else if (currentPath == "turo") {
        $("#indicator-dot").css("backgroundColor", "#ff984d");
    } else if (currentPath == "motionxr") {
        $("#indicator-dot").css("backgroundColor", "#292929");
    } else {
        $("#indicator-dot").css("backgroundColor", "#FFFFFF");
    }
}

function setCurNavLinkColor(cur) {
    if (cur == "index") {
        $("#link-home").css("color", curNavLinkColor);
    } else if (cur == "resume") {
        $("#link-resume").css("color", curNavLinkColor);
    } else if (cur == "about") {
        $("#link-about").css("color", curNavLinkColor);
    } else {
        // projects
        $("#link-projects").css("color", curNavLinkColor);
    }
}


//only each project is set here, others set in css
function setNavAtContentColor() {
    for (var i = 0; i < navLinkArray.length; i++) {
        var linkName = "#" + navLinkArray[i];
        $(linkName).css("color", "#555");
    }
    $("#indicator-dot").css("backgroundColor", "#555");
    $("#navBand").css("backgroundColor", "#FbFbFb");
    //$("#navBand").css("opacity", "0");
}


function openVideo(whichProject) {
    $("#video-Screen").css("display", "inline");

    switch (whichProject) {
        case 0:
            document.getElementById('video-showing').innerHTML = '<iframe src="https://player.vimeo.com/video/256180377?autoplay=1&byline=0&portrait=0&loop=1" width="100%" height="450px" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
            console.log("video 0 show up!");
            break;
        case 1:
            document.getElementById('video-showing').innerHTML = '<iframe src="http://player.vimeo.com/video/247730544?autoplay=1&byline=0&amp;portrait=0&amp;color=deae62&amp;rel=0;" width="100%" height="450px" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
            console.log("video 1 show up!");
            break;
        case 2:
            document.getElementById('video-showing').innerHTML = '<iframe src="http://player.vimeo.com/video/241288153?autoplay=1&byline=0&amp;portrait=0&amp;color=deae62&amp;rel=0;" width="100%" height="450px" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
            console.log("video 2 show up!");
            break;
    }

}


function closeVideo() {
    $("#video-Screen").css("display", "none");
    document.getElementById('video-showing').innerHTML = "";
}









//=============headroom================
/*!
 * headroom.js v0.9.3 - Give your page some headroom. Hide your header until you need it
 * Copyright (c) 2016 Nick Williams
 * License: MIT
 */

! function (a, b) {
    "use strict";
    "function" == typeof define && define.amd ? define([], b) : "object" == typeof exports ? module.exports = b() : a.Headroom = b()
}(this, function () {
    "use strict";

    function a(a) {
        this.callback = a, this.ticking = !1
    }

    function b(a) {
        return a && "undefined" != typeof window && (a === window || a.nodeType)
    }

    function c(a) {
        if (arguments.length <= 0) throw new Error("Missing arguments in extend function");
        var d, e, f = a || {};
        for (e = 1; e < arguments.length; e++) {
            var g = arguments[e] || {};
            for (d in g) "object" != typeof f[d] || b(f[d]) ? f[d] = f[d] || g[d] : f[d] = c(f[d], g[d])
        }
        return f
    }

    function d(a) {
        return a === Object(a) ? a : {
            down: a,
            up: a
        }
    }

    function e(a, b) {
        b = c(b, e.options), this.lastKnownScrollY = 0, this.elem = a, this.tolerance = d(b.tolerance), this.classes = b.classes, this.offset = b.offset, this.scroller = b.scroller, this.initialised = !1, this.onPin = b.onPin, this.onUnpin = b.onUnpin, this.onTop = b.onTop, this.onNotTop = b.onNotTop, this.onBottom = b.onBottom, this.onNotBottom = b.onNotBottom
    }
    var f = {
        bind: !! function () {}.bind,
        classList: "classList" in document.documentElement,
        rAF: !!(window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame)
    };
    return window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame, a.prototype = {
        constructor: a,
        update: function () {
            this.callback && this.callback(), this.ticking = !1
        },
        requestTick: function () {
            this.ticking || (requestAnimationFrame(this.rafCallback || (this.rafCallback = this.update.bind(this))), this.ticking = !0)
        },
        handleEvent: function () {
            this.requestTick()
        }
    }, e.prototype = {
        constructor: e,
        init: function () {
            return e.cutsTheMustard ? (this.debouncer = new a(this.update.bind(this)), this.elem.classList.add(this.classes.initial), setTimeout(this.attachEvent.bind(this), 100), this) : void 0
        },
        destroy: function () {
            var a = this.classes;
            this.initialised = !1, this.elem.classList.remove(a.unpinned, a.pinned, a.top, a.notTop, a.initial), this.scroller.removeEventListener("scroll", this.debouncer, !1)
        },
        attachEvent: function () {
            this.initialised || (this.lastKnownScrollY = this.getScrollY(), this.initialised = !0, this.scroller.addEventListener("scroll", this.debouncer, !1), this.debouncer.handleEvent())
        },
        unpin: function () {
            var a = this.elem.classList,
                b = this.classes;
            !a.contains(b.pinned) && a.contains(b.unpinned) || (a.add(b.unpinned), a.remove(b.pinned), this.onUnpin && this.onUnpin.call(this))
        },
        pin: function () {
            var a = this.elem.classList,
                b = this.classes;
            a.contains(b.unpinned) && (a.remove(b.unpinned), a.add(b.pinned), this.onPin && this.onPin.call(this))
        },
        top: function () {
            var a = this.elem.classList,
                b = this.classes;
            a.contains(b.top) || (a.add(b.top), a.remove(b.notTop), this.onTop && this.onTop.call(this))
        },
        notTop: function () {
            var a = this.elem.classList,
                b = this.classes;
            a.contains(b.notTop) || (a.add(b.notTop), a.remove(b.top), this.onNotTop && this.onNotTop.call(this))
        },
        bottom: function () {
            var a = this.elem.classList,
                b = this.classes;
            a.contains(b.bottom) || (a.add(b.bottom), a.remove(b.notBottom), this.onBottom && this.onBottom.call(this))
        },
        notBottom: function () {
            var a = this.elem.classList,
                b = this.classes;
            a.contains(b.notBottom) || (a.add(b.notBottom), a.remove(b.bottom), this.onNotBottom && this.onNotBottom.call(this))
        },
        getScrollY: function () {
            return void 0 !== this.scroller.pageYOffset ? this.scroller.pageYOffset : void 0 !== this.scroller.scrollTop ? this.scroller.scrollTop : (document.documentElement || document.body.parentNode || document.body).scrollTop
        },
        getViewportHeight: function () {
            return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        },
        getElementPhysicalHeight: function (a) {
            return Math.max(a.offsetHeight, a.clientHeight)
        },
        getScrollerPhysicalHeight: function () {
            return this.scroller === window || this.scroller === document.body ? this.getViewportHeight() : this.getElementPhysicalHeight(this.scroller)
        },
        getDocumentHeight: function () {
            var a = document.body,
                b = document.documentElement;
            return Math.max(a.scrollHeight, b.scrollHeight, a.offsetHeight, b.offsetHeight, a.clientHeight, b.clientHeight)
        },
        getElementHeight: function (a) {
            return Math.max(a.scrollHeight, a.offsetHeight, a.clientHeight)
        },
        getScrollerHeight: function () {
            return this.scroller === window || this.scroller === document.body ? this.getDocumentHeight() : this.getElementHeight(this.scroller)
        },
        isOutOfBounds: function (a) {
            var b = 0 > a,
                c = a + this.getScrollerPhysicalHeight() > this.getScrollerHeight();
            return b || c
        },
        toleranceExceeded: function (a, b) {
            return Math.abs(a - this.lastKnownScrollY) >= this.tolerance[b]
        },
        shouldUnpin: function (a, b) {
            var c = a > this.lastKnownScrollY,
                d = a >= this.offset;
            return c && d && b
        },
        shouldPin: function (a, b) {
            var c = a < this.lastKnownScrollY,
                d = a <= this.offset;
            return c && b || d
        },
        update: function () {
            var a = this.getScrollY(),
                b = a > this.lastKnownScrollY ? "down" : "up",
                c = this.toleranceExceeded(a, b);
            this.isOutOfBounds(a) || (a <= this.offset ? this.top() : this.notTop(), a + this.getViewportHeight() >= this.getScrollerHeight() ? this.bottom() : this.notBottom(), this.shouldUnpin(a, c) ? this.unpin() : this.shouldPin(a, c) && this.pin(), this.lastKnownScrollY = a)
        }
    }, e.options = {
        tolerance: {
            up: 0,
            down: 0
        },
        offset: 0,
        scroller: window,
        classes: {
            pinned: "headroom--pinned",
            unpinned: "headroom--unpinned",
            top: "headroom--top",
            notTop: "headroom--not-top",
            bottom: "headroom--bottom",
            notBottom: "headroom--not-bottom",
            initial: "headroom"
        }
    }, e.cutsTheMustard = "undefined" != typeof f && f.rAF && f.bind && f.classList, e
});

var nav = document.querySelector("header");
var headroom = new Headroom(nav);
headroom.init();




//=============vimeo================
/*
! @vimeo/player v1.0.4 | 
(c) 2016 Vimeo | 
MIT License | 
https://github.com/vimeo/player.js 
*/
/*! @vimeo/player v1.0.4 | (c) 2016 Vimeo | MIT License | https://github.com/vimeo/player.js */
! function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e.Vimeo = e.Vimeo || {}, e.Vimeo.Player = t())
}(this, function () {
    "use strict";

    function e(e, t) {
        return t = {
            exports: {}
        }, e(t, t.exports), t.exports
    }

    function t(e, t, n) {
        var r = T.get(e.element) || {};
        t in r || (r[t] = []), r[t].push(n), T.set(e.element, r)
    }

    function n(e, t) {
        var n = T.get(e.element) || {};
        return n[t] || []
    }

    function r(e, t, n) {
        var r = T.get(e.element) || {};
        if (!r[t]) return !0;
        if (!n) return r[t] = [], T.set(e.element, r), !0;
        var o = r[t].indexOf(n);
        return o !== -1 && r[t].splice(o, 1), T.set(e.element, r), r[t] && 0 === r[t].length
    }

    function o(e, t) {
        var n = T.get(e);
        T.set(t, n), T.delete(e)
    }

    function i(e, t) {
        return 0 === e.indexOf(t.toLowerCase()) ? e : "" + t.toLowerCase() + e.substr(0, 1).toUpperCase() + e.substr(1)
    }

    function a(e) {
        return e instanceof window.HTMLElement
    }

    function u(e) {
        return !isNaN(parseFloat(e)) && isFinite(e) && Math.floor(e) == e
    }

    function s(e) {
        return /^(https?:)?\/\/(player.)?vimeo.com/.test(e)
    }

    function c() {
        var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
            t = e.id,
            n = e.url,
            r = t || n;
        if (!r) throw new Error("An id or url must be passed, either in an options object or as a data-vimeo-id or data-vimeo-url attribute.");
        if (u(r)) return "https://vimeo.com/" + r;
        if (s(r)) return r.replace("http:", "https:");
        if (t) throw new TypeError("“" + t + "” is not a valid video id.");
        throw new TypeError("“" + r + "” is not a vimeo.com url.")
    }

    function f(e) {
        for (var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1], n = _, r = Array.isArray(n), o = 0, n = r ? n : n[Symbol.iterator]();;) {
            var i;
            if (r) {
                if (o >= n.length) break;
                i = n[o++]
            } else {
                if (o = n.next(), o.done) break;
                i = o.value
            }
            var a = i,
                u = e.getAttribute("data-vimeo-" + a);
            (u || "" === u) && (t[a] = "" === u ? 1 : u)
        }
        return t
    }

    function l(e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
        return new Promise(function (n, r) {
            if (!s(e)) throw new TypeError("“" + e + "” is not a vimeo.com url.");
            var o = "https://vimeo.com/api/oembed.json?url=" + encodeURIComponent(e);
            for (var i in t) t.hasOwnProperty(i) && (o += "&" + i + "=" + encodeURIComponent(t[i]));
            var a = "XDomainRequest" in window ? new XDomainRequest : new XMLHttpRequest;
            a.open("GET", o, !0), a.onload = function () {
                if (404 === a.status) return void r(new Error("“" + e + "” was not found."));
                if (403 === a.status) return void r(new Error("“" + e + "” is not embeddable."));
                try {
                    var t = JSON.parse(a.responseText);
                    n(t)
                } catch (e) {
                    r(e)
                }
            }, a.onerror = function () {
                var e = a.status ? " (" + a.status + ")" : "";
                r(new Error("There was an error fetching the embed code from Vimeo" + e + "."))
            }, a.send()
        })
    }

    function h(e, t) {
        var n = e.html;
        if (!t) throw new TypeError("An element must be provided");
        if (null !== t.getAttribute("data-vimeo-initialized")) return t.querySelector("iframe");
        var r = document.createElement("div");
        r.innerHTML = n;
        var o = r.firstChild;
        return t.appendChild(o), t.setAttribute("data-vimeo-initialized", "true"), o
    }

    function d() {
        var e = arguments.length <= 0 || void 0 === arguments[0] ? document : arguments[0],
            t = [].slice.call(e.querySelectorAll("[data-vimeo-id], [data-vimeo-url]")),
            n = function (e) {
                "console" in window && console.error && console.error("There was an error creating an embed: " + e)
            },
            r = function () {
                if (i) {
                    if (a >= o.length) return "break";
                    u = o[a++]
                } else {
                    if (a = o.next(), a.done) return "break";
                    u = a.value
                }
                var e = u;
                try {
                    if (null !== e.getAttribute("data-vimeo-defer")) return "continue";
                    var t = f(e),
                        r = c(t);
                    l(r, t).then(function (t) {
                        return h(t, e)
                    }).catch(n)
                } catch (e) {
                    n(e)
                }
            };
        e: for (var o = t, i = Array.isArray(o), a = 0, o = i ? o : o[Symbol.iterator]();;) {
            var u, s = r();
            switch (s) {
                case "break":
                    break e;
                case "continue":
                    continue
            }
        }
    }

    function p(e) {
        return "string" == typeof e && (e = JSON.parse(e)), e
    }

    function v(e, t, n) {
        if (e.element.contentWindow.postMessage) {
            var r = {
                method: t
            };
            void 0 !== n && (r.value = n);
            var o = parseFloat(navigator.userAgent.toLowerCase().replace(/^.*msie (\d+).*$/, "$1"));
            o >= 8 && o < 10 && (r = JSON.stringify(r)), e.element.contentWindow.postMessage(r, e.origin)
        }
    }

    function y(e, t) {
        t = p(t);
        var o = [],
            i = void 0;
        if (t.event) {
            if ("error" === t.event)
                for (var a = n(e, t.data.method), u = a, s = Array.isArray(u), c = 0, u = s ? u : u[Symbol.iterator]();;) {
                    var f;
                    if (s) {
                        if (c >= u.length) break;
                        f = u[c++]
                    } else {
                        if (c = u.next(), c.done) break;
                        f = c.value
                    }
                    var l = f,
                        h = new Error(t.data.message);
                    h.name = t.data.name, l.reject(h), r(e, t.data.method, l)
                }
            o = n(e, "event:" + t.event), i = t.data
        } else t.method && (o = n(e, t.method), i = t.value, r(e, t.method));
        for (var d = o, v = Array.isArray(d), y = 0, d = v ? d : d[Symbol.iterator]();;) {
            var m;
            if (v) {
                if (y >= d.length) break;
                m = d[y++]
            } else {
                if (y = d.next(), y.done) break;
                m = y.value
            }
            var g = m;
            try {
                if ("function" == typeof g) {
                    g.call(e, i);
                    continue
                }
                g.resolve(i)
            } catch (e) {}
        }
    }
    var m = "undefined" != typeof Array.prototype.indexOf,
        g = "undefined" != typeof window.postMessage;
    if (!m || !g) throw new Error("Sorry, the Vimeo Player API is not available in this browser.");
    var w = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {},
        b = (e(function (e, t) {
            ! function (e) {
                function t(e, t) {
                    function r(e) {
                        return this && this.constructor === r ? (this._keys = [], this._values = [], this._itp = [], this.objectOnly = t, void(e && n.call(this, e))) : new r(e)
                    }
                    return t || w(e, "size", {
                        get: y
                    }), e.constructor = r, r.prototype = e, r
                }

                function n(e) {
                    this.add ? e.forEach(this.add, this) : e.forEach(function (e) {
                        this.set(e[0], e[1])
                    }, this)
                }

                function r(e) {
                    return this.has(e) && (this._keys.splice(g, 1), this._values.splice(g, 1), this._itp.forEach(function (e) {
                        g < e[0] && e[0]--
                    })), -1 < g
                }

                function o(e) {
                    return this.has(e) ? this._values[g] : void 0
                }

                function i(e, t) {
                    if (this.objectOnly && t !== Object(t)) throw new TypeError("Invalid value used as weak collection key");
                    if (t != t || 0 === t)
                        for (g = e.length; g-- && !b(e[g], t););
                    else g = e.indexOf(t);
                    return -1 < g
                }

                function a(e) {
                    return i.call(this, this._values, e)
                }

                function u(e) {
                    return i.call(this, this._keys, e)
                }

                function s(e, t) {
                    return this.has(e) ? this._values[g] = t : this._values[this._keys.push(e) - 1] = t, this
                }

                function c(e) {
                    return this.has(e) || this._values.push(e), this
                }

                function f() {
                    (this._keys || 0).length = this._values.length = 0
                }

                function l() {
                    return v(this._itp, this._keys)
                }

                function h() {
                    return v(this._itp, this._values)
                }

                function d() {
                    return v(this._itp, this._keys, this._values)
                }

                function p() {
                    return v(this._itp, this._values, this._values)
                }

                function v(e, t, n) {
                    var r = [0],
                        o = !1;
                    return e.push(r), {
                        next: function () {
                            var i, a = r[0];
                            return !o && a < t.length ? (i = n ? [t[a], n[a]] : t[a], r[0]++) : (o = !0, e.splice(e.indexOf(r), 1)), {
                                done: o,
                                value: i
                            }
                        }
                    }
                }

                function y() {
                    return this._values.length
                }

                function m(e, t) {
                    for (var n = this.entries();;) {
                        var r = n.next();
                        if (r.done) break;
                        e.call(t, r.value[1], r.value[0], this)
                    }
                }
                var g, w = Object.defineProperty,
                    b = function (e, t) {
                        return e === t || e !== e && t !== t
                    };
                "undefined" == typeof WeakMap && (e.WeakMap = t({
                    delete: r,
                    clear: f,
                    get: o,
                    has: u,
                    set: s
                }, !0)), "undefined" != typeof Map && "function" == typeof (new Map).values && (new Map).values().next || (e.Map = t({
                    delete: r,
                    has: u,
                    get: o,
                    set: s,
                    keys: l,
                    values: h,
                    entries: d,
                    forEach: m,
                    clear: f
                })), "undefined" != typeof Set && "function" == typeof (new Set).values && (new Set).values().next || (e.Set = t({
                    has: a,
                    add: c,
                    delete: r,
                    clear: f,
                    keys: h,
                    values: h,
                    entries: p,
                    forEach: m
                })), "undefined" == typeof WeakSet && (e.WeakSet = t({
                    delete: r,
                    add: c,
                    clear: f,
                    has: a
                }, !0))
            }("undefined" != typeof t && "undefined" != typeof w ? w : window)
        }), e(function (e) {
            ! function (t, n, r) {
                n[t] = n[t] || r(), "undefined" != typeof e && e.exports ? e.exports = n[t] : "function" == typeof define && define.amd && define(function () {
                    return n[t]
                })
            }("Promise", "undefined" != typeof w ? w : w, function () {
                function e(e, t) {
                    h.add(e, t), l || (l = p(h.drain))
                }

                function t(e) {
                    var t, n = typeof e;
                    return null == e || "object" != n && "function" != n || (t = e.then), "function" == typeof t && t
                }

                function n() {
                    for (var e = 0; e < this.chain.length; e++) r(this, 1 === this.state ? this.chain[e].success : this.chain[e].failure, this.chain[e]);
                    this.chain.length = 0
                }

                function r(e, n, r) {
                    var o, i;
                    try {
                        n === !1 ? r.reject(e.msg) : (o = n === !0 ? e.msg : n.call(void 0, e.msg), o === r.promise ? r.reject(TypeError("Promise-chain cycle")) : (i = t(o)) ? i.call(o, r.resolve, r.reject) : r.resolve(o))
                    } catch (e) {
                        r.reject(e)
                    }
                }

                function o(r) {
                    var a, s = this;
                    if (!s.triggered) {
                        s.triggered = !0, s.def && (s = s.def);
                        try {
                            (a = t(r)) ? e(function () {
                                var e = new u(s);
                                try {
                                    a.call(r, function () {
                                        o.apply(e, arguments)
                                    }, function () {
                                        i.apply(e, arguments)
                                    })
                                } catch (t) {
                                    i.call(e, t)
                                }
                            }): (s.msg = r, s.state = 1, s.chain.length > 0 && e(n, s))
                        } catch (e) {
                            i.call(new u(s), e)
                        }
                    }
                }

                function i(t) {
                    var r = this;
                    r.triggered || (r.triggered = !0, r.def && (r = r.def), r.msg = t, r.state = 2, r.chain.length > 0 && e(n, r))
                }

                function a(e, t, n, r) {
                    for (var o = 0; o < t.length; o++) ! function (o) {
                        e.resolve(t[o]).then(function (e) {
                            n(o, e)
                        }, r)
                    }(o)
                }

                function u(e) {
                    this.def = e, this.triggered = !1
                }

                function s(e) {
                    this.promise = e, this.state = 0, this.triggered = !1, this.chain = [], this.msg = void 0
                }

                function c(t) {
                    if ("function" != typeof t) throw TypeError("Not a function");
                    if (0 !== this.__NPO__) throw TypeError("Not a promise");
                    this.__NPO__ = 1;
                    var r = new s(this);
                    this.then = function (t, o) {
                        var i = {
                            success: "function" != typeof t || t,
                            failure: "function" == typeof o && o
                        };
                        return i.promise = new this.constructor(function (e, t) {
                            if ("function" != typeof e || "function" != typeof t) throw TypeError("Not a function");
                            i.resolve = e, i.reject = t
                        }), r.chain.push(i), 0 !== r.state && e(n, r), i.promise
                    }, this.catch = function (e) {
                        return this.then(void 0, e)
                    };
                    try {
                        t.call(void 0, function (e) {
                            o.call(r, e)
                        }, function (e) {
                            i.call(r, e)
                        })
                    } catch (e) {
                        i.call(r, e)
                    }
                }
                var f, l, h, d = Object.prototype.toString,
                    p = "undefined" != typeof setImmediate ? function (e) {
                        return setImmediate(e)
                    } : setTimeout;
                try {
                    Object.defineProperty({}, "x", {}), f = function (e, t, n, r) {
                        return Object.defineProperty(e, t, {
                            value: n,
                            writable: !0,
                            configurable: r !== !1
                        })
                    }
                } catch (e) {
                    f = function (e, t, n) {
                        return e[t] = n, e
                    }
                }
                h = function () {
                    function e(e, t) {
                        this.fn = e, this.self = t, this.next = void 0
                    }
                    var t, n, r;
                    return {
                        add: function (o, i) {
                            r = new e(o, i), n ? n.next = r : t = r, n = r, r = void 0
                        },
                        drain: function () {
                            var e = t;
                            for (t = n = l = void 0; e;) e.fn.call(e.self), e = e.next
                        }
                    }
                }();
                var v = f({}, "constructor", c, !1);
                return c.prototype = v, f(v, "__NPO__", 0, !1), f(c, "resolve", function (e) {
                    var t = this;
                    return e && "object" == typeof e && 1 === e.__NPO__ ? e : new t(function (t, n) {
                        if ("function" != typeof t || "function" != typeof n) throw TypeError("Not a function");
                        t(e)
                    })
                }), f(c, "reject", function (e) {
                    return new this(function (t, n) {
                        if ("function" != typeof t || "function" != typeof n) throw TypeError("Not a function");
                        n(e)
                    })
                }), f(c, "all", function (e) {
                    var t = this;
                    return "[object Array]" != d.call(e) ? t.reject(TypeError("Not an array")) : 0 === e.length ? t.resolve([]) : new t(function (n, r) {
                        if ("function" != typeof n || "function" != typeof r) throw TypeError("Not a function");
                        var o = e.length,
                            i = Array(o),
                            u = 0;
                        a(t, e, function (e, t) {
                            i[e] = t, ++u === o && n(i)
                        }, r)
                    })
                }), f(c, "race", function (e) {
                    var t = this;
                    return "[object Array]" != d.call(e) ? t.reject(TypeError("Not an array")) : new t(function (n, r) {
                        if ("function" != typeof n || "function" != typeof r) throw TypeError("Not a function");
                        a(t, e, function (e, t) {
                            n(t)
                        }, r)
                    })
                }), c
            })
        })),
        E = b && "object" == typeof b && "default" in b ? b.default : b,
        T = new WeakMap,
        _ = ["id", "url", "width", "maxwidth", "height", "maxheight", "portrait", "title", "byline", "color", "autoplay", "autopause", "loop", "responsive"],
        k = function (e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        },
        x = new WeakMap,
        j = new WeakMap,
        Player = function () {
            function Player(e) {
                var t = this,
                    n = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
                if (k(this, Player), window.jQuery && e instanceof jQuery && (e.length > 1 && window.console && console.warn && console.warn("A jQuery object with multiple elements was passed, using the first element."), e = e[0]), "string" == typeof e && (e = document.getElementById(e)), !a(e)) throw new TypeError("You must pass either a valid element or a valid id.");
                if ("IFRAME" !== e.nodeName) {
                    var r = e.querySelector("iframe");
                    r && (e = r)
                }
                if ("IFRAME" === e.nodeName && !s(e.getAttribute("src") || "")) throw new Error("The player element passed isn’t a Vimeo embed.");
                if (x.has(e)) return x.get(e);
                this.element = e, this.origin = "*";
                var i = new E(function (r, i) {
                    var a = function (e) {
                        if (s(e.origin) && t.element.contentWindow === e.source) {
                            "*" === t.origin && (t.origin = e.origin);
                            var n = p(e.data),
                                o = "event" in n && "ready" === n.event,
                                i = "method" in n && "ping" === n.method;
                            return o || i ? (t.element.setAttribute("data-ready", "true"), void r()) : void y(t, n)
                        }
                    };
                    if (window.addEventListener ? window.addEventListener("message", a, !1) : window.attachEvent && window.attachEvent("onmessage", a), "IFRAME" !== t.element.nodeName) {
                        var u = f(e, n),
                            d = c(u);
                        l(d, u).then(function (n) {
                            var r = h(n, e);
                            return t.element = r, o(e, r), n
                        }).catch(function (e) {
                            return i(e)
                        })
                    }
                });
                return j.set(this, i), x.set(this.element, this), "IFRAME" === this.element.nodeName && v(this, "ping"), this
            }
            return Player.prototype.then = function (e) {
                var t = arguments.length <= 1 || void 0 === arguments[1] ? function () {} : arguments[1];
                return this.ready().then(e, t)
            }, Player.prototype.callMethod = function (e) {
                var n = this,
                    r = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
                return new E(function (o, i) {
                    return n.ready().then(function () {
                        t(n, e, {
                            resolve: o,
                            reject: i
                        }), v(n, e, r)
                    })
                })
            }, Player.prototype.get = function (e) {
                var n = this;
                return new E(function (r, o) {
                    return e = i(e, "get"), n.ready().then(function () {
                        t(n, e, {
                            resolve: r,
                            reject: o
                        }), v(n, e)
                    })
                })
            }, Player.prototype.set = function (e, n) {
                var r = this;
                return E.resolve(n).then(function (n) {
                    if (e = i(e, "set"), void 0 === n || null === n) throw new TypeError("There must be a value to set.");
                    return r.ready().then(function () {
                        return new E(function (o, i) {
                            t(r, e, {
                                resolve: o,
                                reject: i
                            }), v(r, e, n)
                        })
                    })
                })
            }, Player.prototype.on = function (e, r) {
                if (!e) throw new TypeError("You must pass an event name.");
                if (!r) throw new TypeError("You must pass a callback function.");
                if ("function" != typeof r) throw new TypeError("The callback must be a function.");
                var o = n(this, "event:" + e);
                0 === o.length && this.callMethod("addEventListener", e).catch(function () {}), t(this, "event:" + e, r)
            }, Player.prototype.off = function (e, t) {
                if (!e) throw new TypeError("You must pass an event name.");
                if (t && "function" != typeof t) throw new TypeError("The callback must be a function.");
                var n = r(this, "event:" + e, t);
                n && this.callMethod("removeEventListener", e).catch(function (e) {})
            }, Player.prototype.loadVideo = function (e) {
                return this.callMethod("loadVideo", e)
            }, Player.prototype.ready = function () {
                var e = j.get(this);
                return E.resolve(e)
            }, Player.prototype.enableTextTrack = function (e, t) {
                if (!e) throw new TypeError("You must pass a language.");
                return this.callMethod("enableTextTrack", {
                    language: e,
                    kind: t
                })
            }, Player.prototype.disableTextTrack = function () {
                return this.callMethod("disableTextTrack")
            }, Player.prototype.pause = function () {
                return this.callMethod("pause")
            }, Player.prototype.play = function () {
                return this.callMethod("play")
            }, Player.prototype.unload = function () {
                return this.callMethod("unload")
            }, Player.prototype.getAutopause = function () {
                return this.get("autopause")
            }, Player.prototype.setAutopause = function (e) {
                return this.set("autopause", e)
            }, Player.prototype.getColor = function () {
                return this.get("color")
            }, Player.prototype.setColor = function (e) {
                return this.set("color", e)
            }, Player.prototype.getCurrentTime = function () {
                return this.get("currentTime")
            }, Player.prototype.setCurrentTime = function (e) {
                return this.set("currentTime", e)
            }, Player.prototype.getDuration = function () {
                return this.get("duration")
            }, Player.prototype.getEnded = function () {
                return this.get("ended")
            }, Player.prototype.getLoop = function () {
                return this.get("loop")
            }, Player.prototype.setLoop = function (e) {
                return this.set("loop", e)
            }, Player.prototype.getPaused = function () {
                return this.get("paused")
            }, Player.prototype.getTextTracks = function () {
                return this.get("textTracks")
            }, Player.prototype.getVideoEmbedCode = function () {
                return this.get("videoEmbedCode")
            }, Player.prototype.getVideoId = function () {
                return this.get("videoId")
            }, Player.prototype.getVideoTitle = function () {
                return this.get("videoTitle")
            }, Player.prototype.getVideoWidth = function () {
                return this.get("videoWidth")
            }, Player.prototype.getVideoHeight = function () {
                return this.get("videoHeight")
            }, Player.prototype.getVideoUrl = function () {
                return this.get("videoUrl")
            }, Player.prototype.getVolume = function () {
                return this.get("volume")
            }, Player.prototype.setVolume = function (e) {
                return this.set("volume", e)
            }, Player
        }();
    return d(), Player
});
