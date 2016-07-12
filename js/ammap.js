if (!AmCharts) var AmCharts = {};
AmCharts.inheriting = {};
AmCharts.Class = function (a) {
    var b = function () {
        arguments[0] !== AmCharts.inheriting && (this.events = {}, this.construct.apply(this, arguments))
    };
    a.inherits ? (b.prototype = new a.inherits(AmCharts.inheriting), b.base = a.inherits.prototype, delete a.inherits) : (b.prototype.createEvents = function () {
        for (var a = 0, b = arguments.length; a < b; a++) this.events[arguments[a]] = []
    }, b.prototype.listenTo = function (a, b, c) {
        a.events[b].push({
            handler: c,
            scope: this
        })
    }, b.prototype.addListener = function (a, b, c) {
        this.events[a].push({
            handler: b,
            scope: c
        })
    },
        b.prototype.removeListener = function (a, b, c) {
            a = a.events[b];
            for (b = a.length - 1; 0 <= b; b--) a[b].handler === c && a.splice(b, 1)
        }, b.prototype.fire = function (a, b) {
            for (var c = this.events[a], g = 0, h = c.length; g < h; g++) {
                var k = c[g];
                k.handler.call(k.scope, b)
            }
        });
    for (var c in a) b.prototype[c] = a[c];
    return b
};
AmCharts.charts = [];
AmCharts.addChart = function (a) {
    AmCharts.charts.push(a)
};
AmCharts.removeChart = function (a) {
    for (var b = AmCharts.charts, c = b.length - 1; 0 <= c; c--) b[c] == a && b.splice(c, 1)
};
AmCharts.IEversion = 0;
AmCharts.isModern = !0;
AmCharts.navigator = navigator.userAgent.toLowerCase(); -1 != AmCharts.navigator.indexOf("msie") && (AmCharts.IEversion = parseInt(AmCharts.navigator.split("msie")[1]), document.documentMode && (AmCharts.IEversion = Number(document.documentMode)), 9 > AmCharts.IEversion && (AmCharts.isModern = !1));
AmCharts.dx = 0;
AmCharts.dy = 0;
if (document.addEventListener || window.opera) AmCharts.isNN = !0, AmCharts.isIE = !1, AmCharts.dx = 0.5, AmCharts.dy = 0.5;
document.attachEvent && (AmCharts.isNN = !1, AmCharts.isIE = !0, AmCharts.isModern || (AmCharts.dx = 0, AmCharts.dy = 0));
window.chrome && (AmCharts.chrome = !0);
AmCharts.handleResize = function () {
    for (var a = AmCharts.charts, b = 0; b < a.length; b++) {
        var c = a[b];
        c && c.div && c.handleResize()
    }
};
AmCharts.handleMouseUp = function (a) {
    for (var b = AmCharts.charts, c = 0; c < b.length; c++) {
        var d = b[c];
        d && d.handleReleaseOutside(a)
    }
};
AmCharts.handleMouseMove = function (a) {
    for (var b = AmCharts.charts, c = 0; c < b.length; c++) {
        var d = b[c];
        d && d.handleMouseMove(a)
    }
};
AmCharts.resetMouseOver = function () {
    for (var a = AmCharts.charts, b = 0; b < a.length; b++) {
        var c = a[b];
        c && (c.mouseIsOver = !1)
    }
};
AmCharts.onReadyArray = [];
AmCharts.ready = function (a) {
    AmCharts.onReadyArray.push(a)
};
AmCharts.handleLoad = function () {
    for (var a = AmCharts.onReadyArray, b = 0; b < a.length; b++) (0, a[b])()
};
AmCharts.useUTC = !1;
AmCharts.updateRate = 40;
AmCharts.uid = 0;
AmCharts.getUniqueId = function () {
    AmCharts.uid++;
    return "AmChartsEl-" + AmCharts.uid
};
AmCharts.isNN && (document.addEventListener("mousemove", AmCharts.handleMouseMove, !0), window.addEventListener("resize", AmCharts.handleResize, !0), document.addEventListener("mouseup", AmCharts.handleMouseUp, !0), window.addEventListener("load", AmCharts.handleLoad, !0));
AmCharts.isIE && (document.attachEvent("onmousemove", AmCharts.handleMouseMove), window.attachEvent("onresize", AmCharts.handleResize), document.attachEvent("onmouseup", AmCharts.handleMouseUp), window.attachEvent("onload", AmCharts.handleLoad));
AmCharts.clear = function () {
    var a = AmCharts.charts;
    if (a)
        for (var b = 0; b < a.length; b++) a[b].clear();
    AmCharts.charts = null;
    AmCharts.isNN && (document.removeEventListener("mousemove", AmCharts.handleMouseMove, !0), window.removeEventListener("resize", AmCharts.handleResize, !0), document.removeEventListener("mouseup", AmCharts.handleMouseUp, !0), window.removeEventListener("load", AmCharts.handleLoad, !0));
    AmCharts.isIE && (document.detachEvent("onmousemove", AmCharts.handleMouseMove), window.detachEvent("onresize", AmCharts.handleResize),
        document.detachEvent("onmouseup", AmCharts.handleMouseUp), window.detachEvent("onload", AmCharts.handleLoad))
};
AmCharts.toBoolean = function (a, b) {
    if (void 0 === a) return b;
    switch (String(a).toLowerCase()) {
        case "true":
        case "yes":
        case "1":
            return !0;
        case "false":
        case "no":
        case "0":
        case null:
            return !1;
        default:
            return Boolean(a)
    }
};
AmCharts.removeFromArray = function (a, b) {
    var c;
    for (c = a.length - 1; 0 <= c; c--) a[c] == b && a.splice(c, 1)
};
AmCharts.getStyle = function (a, b) {
    var c = "";
    document.defaultView && document.defaultView.getComputedStyle ? c = document.defaultView.getComputedStyle(a, "").getPropertyValue(b) : a.currentStyle && (b = b.replace(/\-(\w)/g, function (a, b) {
        return b.toUpperCase()
    }), c = a.currentStyle[b]);
    return c
};
AmCharts.removePx = function (a) {
    return Number(a.substring(0, a.length - 2))
};
AmCharts.getURL = function (a, b) {
    if (a)
        if ("_self" != b && b)
            if ("_top" == b && window.top) window.top.location.href = a;
            else if ("_parent" == b && window.parent) window.parent.location.href = a;
            else {
                var c = document.getElementsByName(b)[0];
                c ? c.src = a : window.open(a)
            } else window.location.href = a
};
AmCharts.ifArray = function (a) {
    return a && 0 < a.length ? !0 : !1
};
AmCharts.callMethod = function (a, b) {
    var c;
    for (c = 0; c < b.length; c++) {
        var d = b[c];
        if (d) {
            if (d[a]) d[a]();
            var f = d.length;
            if (0 < f) {
                var e;
                for (e = 0; e < f; e++) {
                    var g = d[e];
                    if (g && g[a]) g[a]()
                }
            }
        }
    }
};
AmCharts.toNumber = function (a) {
    return "number" == typeof a ? a : Number(String(a).replace(/[^0-9\-.]+/g, ""))
};
AmCharts.toColor = function (a) {
    if ("" !== a && void 0 !== a)
        if (-1 != a.indexOf(",")) {
            a = a.split(",");
            var b;
            for (b = 0; b < a.length; b++) {
                var c = a[b].substring(a[b].length - 6, a[b].length);
                a[b] = "#" + c
            }
        } else a = a.substring(a.length - 6, a.length), a = "#" + a;
    return a
};
AmCharts.toCoordinate = function (a, b, c) {
    var d;
    void 0 !== a && (a = String(a), c && c < b && (b = c), d = Number(a), -1 != a.indexOf("!") && (d = b - Number(a.substr(1))), -1 != a.indexOf("%") && (d = b * Number(a.substr(0, a.length - 1)) / 100));
    return d
};
AmCharts.fitToBounds = function (a, b, c) {
    a < b && (a = b);
    a > c && (a = c);
    return a
};
AmCharts.isDefined = function (a) {
    return void 0 === a ? !1 : !0
};
AmCharts.stripNumbers = function (a) {
    return a.replace(/[0-9]+/g, "")
};
AmCharts.roundTo = function (a, b) {
    if (0 > b) return a;
    var c = Math.pow(10, b);
    return Math.round(a * c) / c
};
AmCharts.toFixed = function (a, b) {
    var c = String(Math.round(a * Math.pow(10, b)));
    if (0 < b) {
        var d = c.length;
        if (d < b) {
            var f;
            for (f = 0; f < b - d; f++) c = "0" + c
        }
        d = c.substring(0, c.length - b);
        "" === d && (d = 0);
        return d + "." + c.substring(c.length - b, c.length)
    }
    return String(c)
};
AmCharts.formatDuration = function (a, b, c, d, f, e) {
    var g = AmCharts.intervals,
        h = e.decimalSeparator;
    if (a >= g[b].contains) {
        var k = a - Math.floor(a / g[b].contains) * g[b].contains;
        "ss" == b && (k = AmCharts.formatNumber(k, e), 1 == k.split(h)[0].length && (k = "0" + k));
        ("mm" == b || "hh" == b) && 10 > k && (k = "0" + k);
        c = k + "" + d[b] + "" + c;
        a = Math.floor(a / g[b].contains);
        b = g[b].nextInterval;
        return AmCharts.formatDuration(a, b, c, d, f, e)
    }
    "ss" == b && (a = AmCharts.formatNumber(a, e), 1 == a.split(h)[0].length && (a = "0" + a));
    ("mm" == b || "hh" == b) && 10 > a && (a = "0" + a);
    c = a + "" +
        d[b] + "" + c;
    if (g[f].count > g[b].count)
        for (a = g[b].count; a < g[f].count; a++) b = g[b].nextInterval, "ss" == b || "mm" == b || "hh" == b ? c = "00" + d[b] + "" + c : "DD" == b && (c = "0" + d[b] + "" + c);
    ":" == c.charAt(c.length - 1) && (c = c.substring(0, c.length - 1));
    return c
};
AmCharts.formatNumber = function (a, b, c, d, f) {
    a = AmCharts.roundTo(a, b.precision);
    isNaN(c) && (c = b.precision);
    var e = b.decimalSeparator;
    b = b.thousandsSeparator;
    var g;
    g = 0 > a ? "-" : "";
    a = Math.abs(a);
    var h = String(a),
        k = !1; -1 != h.indexOf("e") && (k = !0);
    0 <= c && !k && (h = AmCharts.toFixed(a, c));
    var l = "";
    if (k) l = h;
    else {
        var h = h.split("."),
            k = String(h[0]),
            m;
        for (m = k.length; 0 <= m; m -= 3) l = m != k.length ? 0 !== m ? k.substring(m - 3, m) + b + l : k.substring(m - 3, m) + l : k.substring(m - 3, m);
        void 0 !== h[1] && (l = l + e + h[1]);
        void 0 !== c && 0 < c && "0" != l && (l = AmCharts.addZeroes(l,
            e, c))
    }
    l = g + l;
    "" === g && !0 === d && 0 !== a && (l = "+" + l);
    !0 === f && (l += "%");
    return l
};
AmCharts.addZeroes = function (a, b, c) {
    a = a.split(b);
    void 0 === a[1] && 0 < c && (a[1] = "0");
    return a[1].length < c ? (a[1] += "0", AmCharts.addZeroes(a[0] + b + a[1], b, c)) : void 0 !== a[1] ? a[0] + b + a[1] : a[0]
};
AmCharts.scientificToNormal = function (a) {
    var b;
    a = String(a).split("e");
    var c;
    if ("-" == a[1].substr(0, 1)) {
        b = "0.";
        for (c = 0; c < Math.abs(Number(a[1])) - 1; c++) b += "0";
        b += a[0].split(".").join("")
    } else {
        var d = 0;
        b = a[0].split(".");
        b[1] && (d = b[1].length);
        b = a[0].split(".").join("");
        for (c = 0; c < Math.abs(Number(a[1])) - d; c++) b += "0"
    }
    return b
};
AmCharts.toScientific = function (a, b) {
    if (0 === a) return "0";
    var c = Math.floor(Math.log(Math.abs(a)) * Math.LOG10E);
    Math.pow(10, c);
    mantissa = String(mantissa).split(".").join(b);
    return String(mantissa) + "e" + c
};
AmCharts.randomColor = function () {
    return "#" + ("00000" + (16777216 * Math.random() << 0).toString(16)).substr(-6)
};
AmCharts.hitTest = function (a, b, c) {
    var d = !1,
        f = a.x,
        e = a.x + a.width,
        g = a.y,
        h = a.y + a.height,
        k = AmCharts.isInRectangle;
    d || (d = k(f, g, b));
    d || (d = k(f, h, b));
    d || (d = k(e, g, b));
    d || (d = k(e, h, b));
    d || !0 === c || (d = AmCharts.hitTest(b, a, !0));
    return d
};
AmCharts.isInRectangle = function (a, b, c) {
    return a >= c.x - 5 && a <= c.x + c.width + 5 && b >= c.y - 5 && b <= c.y + c.height + 5 ? !0 : !1
};
AmCharts.isPercents = function (a) {
    if (-1 != String(a).indexOf("%")) return !0
};
AmCharts.findPosX = function (a) {
    var b = a,
        c = a.offsetLeft;
    if (a.offsetParent) {
        for (; a = a.offsetParent;) c += a.offsetLeft;
        for (;
            (b = b.parentNode) && b != document.body;) c -= b.scrollLeft || 0
    }
    return c
};
AmCharts.findPosY = function (a) {
    var b = a,
        c = a.offsetTop;
    if (a.offsetParent) {
        for (; a = a.offsetParent;) c += a.offsetTop;
        for (;
            (b = b.parentNode) && b != document.body;) c -= b.scrollTop || 0
    }
    return c
};
AmCharts.findIfFixed = function (a) {
    if (a.offsetParent)
        for (; a = a.offsetParent;)
            if ("fixed" == AmCharts.getStyle(a, "position")) return !0;
    return !1
};
AmCharts.findIfAuto = function (a) {
    return a.style && "auto" == AmCharts.getStyle(a, "overflow") ? !0 : a.parentNode ? AmCharts.findIfAuto(a.parentNode) : !1
};
AmCharts.findScrollLeft = function (a, b) {
    a.scrollLeft && (b += a.scrollLeft);
    return a.parentNode ? AmCharts.findScrollLeft(a.parentNode, b) : b
};
AmCharts.findScrollTop = function (a, b) {
    a.scrollTop && (b += a.scrollTop);
    return a.parentNode ? AmCharts.findScrollTop(a.parentNode, b) : b
};
AmCharts.formatValue = function (a, b, c, d, f, e, g, h) {
    if (b) {
        void 0 === f && (f = "");
        var k;
        for (k = 0; k < c.length; k++) {
            var l = c[k],
                m = b[l];
            void 0 !== m && (m = e ? AmCharts.addPrefix(m, h, g, d) : AmCharts.formatNumber(m, d), a = a.replace(RegExp("\\[\\[" + f + "" + l + "\\]\\]", "g"), m))
        }
    }
    return a
};
AmCharts.formatDataContextValue = function (a, b) {
    if (a) {
        var c = a.match(/\[\[.*?\]\]/g),
            d;
        for (d = 0; d < c.length; d++) {
            var f = c[d],
                f = f.substr(2, f.length - 4);
            void 0 !== b[f] && (a = a.replace(RegExp("\\[\\[" + f + "\\]\\]", "g"), b[f]))
        }
    }
    return a
};
AmCharts.massReplace = function (a, b) {
    for (var c in b)
        if (b.hasOwnProperty(c)) {
            var d = b[c];
            void 0 === d && (d = "");
            a = a.replace(c, d)
        }
    return a
};
AmCharts.cleanFromEmpty = function (a) {
    return a.replace(/\[\[[^\]]*\]\]/g, "")
};
AmCharts.addPrefix = function (a, b, c, d, f) {
    var e = AmCharts.formatNumber(a, d),
        g = "",
        h, k, l;
    if (0 === a) return "0";
    0 > a && (g = "-");
    a = Math.abs(a);
    if (1 < a)
        for (h = b.length - 1; -1 < h; h--) {
            if (a >= b[h].number && (k = a / b[h].number, l = Number(d.precision), 1 > l && (l = 1), c = AmCharts.roundTo(k, l), l = AmCharts.formatNumber(c, {
                precision: -1,
                decimalSeparator: d.decimalSeparator,
                thousandsSeparator: d.thousandsSeparator
            }), !f || k == c)) {
                e = g + "" + l + "" + b[h].prefix;
                break
            }
        } else
        for (h = 0; h < c.length; h++)
            if (a <= c[h].number) {
                k = a / c[h].number;
                l = Math.abs(Math.round(Math.log(k) *
                    Math.LOG10E));
                k = AmCharts.roundTo(k, l);
                e = g + "" + k + "" + c[h].prefix;
                break
            }
    return e
};
AmCharts.remove = function (a) {
    a && a.remove()
};
AmCharts.copyProperties = function (a, b) {
    for (var c in a) a.hasOwnProperty(c) && "events" != c && void 0 !== a[c] && "function" != typeof a[c] && (b[c] = a[c])
};
AmCharts.recommended = function () {
    var a = "js";
    document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") || swfobject && swfobject.hasFlashPlayerVersion("8") && (a = "flash");
    return a
};
AmCharts.getEffect = function (a) {
    ">" == a && (a = "easeOutSine");
    "<" == a && (a = "easeInSine");
    "elastic" == a && (a = "easeOutElastic");
    return a
};
AmCharts.extend = function (a, b) {
    for (var c in b) void 0 !== b[c] && (a.hasOwnProperty(c) || (a[c] = b[c]))
};
AmCharts.fixNewLines = function (a) {
    if (!AmCharts.isModern) {
        var b = RegExp("\\n", "g");
        a && (a = a.replace(b, "<br />"))
    }
    return a
};
AmCharts.deleteObject = function (a, b) {
    if (a) {
        if (void 0 === b || null === b) b = 20;
        if (0 !== b)
            if ("[object Array]" === Object.prototype.toString.call(a))
                for (var c = 0; c < a.length; c++) AmCharts.deleteObject(a[c], b - 1), a[c] = null;
            else try {
                for (c in a) a[c] && ("object" == typeof a[c] && AmCharts.deleteObject(a[c], b - 1), "function" != typeof a[c] && (a[c] = null))
            } catch (d) { }
    }
};
AmCharts.bounce = function (a, b, c, d, f) {
    return (b /= f) < 1 / 2.75 ? 7.5625 * d * b * b + c : b < 2 / 2.75 ? d * (7.5625 * (b -= 1.5 / 2.75) * b + 0.75) + c : b < 2.5 / 2.75 ? d * (7.5625 * (b -= 2.25 / 2.75) * b + 0.9375) + c : d * (7.5625 * (b -= 2.625 / 2.75) * b + 0.984375) + c
};
AmCharts.easeInSine = function (a, b, c, d, f) {
    return -d * Math.cos(b / f * (Math.PI / 2)) + d + c
};
AmCharts.easeOutSine = function (a, b, c, d, f) {
    return d * Math.sin(b / f * (Math.PI / 2)) + c
};
AmCharts.easeOutElastic = function (a, b, c, d, f) {
    a = 1.70158;
    var e = 0,
        g = d;
    if (0 === b) return c;
    if (1 == (b /= f)) return c + d;
    e || (e = 0.3 * f);
    g < Math.abs(d) ? (g = d, a = e / 4) : a = e / (2 * Math.PI) * Math.asin(d / g);
    return g * Math.pow(2, -10 * b) * Math.sin(2 * (b * f - a) * Math.PI / e) + d + c
};
AmCharts.AmDraw = AmCharts.Class({
    construct: function (a, b, c, d) {
        AmCharts.SVG_NS = "http://www.w3.org/2000/svg";
        AmCharts.SVG_XLINK = "http://www.w3.org/1999/xlink";
        AmCharts.hasSVG = !!document.createElementNS && !!document.createElementNS(AmCharts.SVG_NS, "svg").createSVGRect;
        1 > b && (b = 10);
        1 > c && (c = 10);
        this.div = a;
        this.width = b;
        this.height = c;
        this.rBin = document.createElement("div");
        AmCharts.hasSVG ? (AmCharts.SVG = !0, d = this.createSvgElement("svg"), d.style.position = "absolute", d.style.width = b + "px", d.style.height = c + "px", AmCharts.rtl &&
            (d.setAttribute("direction", "rtl"), d.style.left = "auto", d.style.right = "0px"), d.setAttribute("version", "1.1"), a.appendChild(d), this.container = d, this.R = new AmCharts.SVGRenderer(this)) : AmCharts.isIE && AmCharts.VMLRenderer && (AmCharts.VML = !0, AmCharts.vmlStyleSheet || (document.namespaces.add("amvml", "urn:schemas-microsoft-com:vml"), b = document.createStyleSheet(), b.addRule(".amvml", "behavior:url(#default#VML); display:inline-block; antialias:true"), AmCharts.vmlStyleSheet = b), this.container = a, this.R = new AmCharts.VMLRenderer(this,
            d), this.R.disableSelection(a))
    },
    createSvgElement: function (a) {
        return document.createElementNS(AmCharts.SVG_NS, a)
    },
    circle: function (a, b, c, d) {
        var f = new AmCharts.AmDObject("circle", this);
        f.attr({
            r: c,
            cx: a,
            cy: b
        });
        this.addToContainer(f.node, d);
        return f
    },
    setSize: function (a, b) {
        0 < a && 0 < b && (this.container.style.width = a + "px", this.container.style.height = b + "px")
    },
    rect: function (a, b, c, d, f, e, g) {
        var h = new AmCharts.AmDObject("rect", this);
        AmCharts.VML && (f = 100 * f / Math.min(c, d), c += 2 * e, d += 2 * e, h.bw = e, h.node.style.marginLeft = -e, h.node.style.marginTop = -e);
        1 > c && (c = 1);
        1 > d && (d = 1);
        h.attr({
            x: a,
            y: b,
            width: c,
            height: d,
            rx: f,
            ry: f,
            "stroke-width": e
        });
        this.addToContainer(h.node, g);
        return h
    },
    image: function (a, b, c, d, f, e) {
        var g = new AmCharts.AmDObject("image", this);
        g.attr({
            x: b,
            y: c,
            width: d,
            height: f
        });
        this.R.path(g, a);
        this.addToContainer(g.node, e);
        return g
    },
    addToContainer: function (a, b) {
        b || (b = this.container);
        b.appendChild(a)
    },
    text: function (a, b, c) {
        return this.R.text(a, b, c)
    },
    path: function (a, b, c, d) {
        var f = new AmCharts.AmDObject("path", this);
        d ||
            (d = "100,100");
        f.attr({
            cs: d
        });
        c ? f.attr({
            dd: a
        }) : f.attr({
            d: a
        });
        this.addToContainer(f.node, b);
        return f
    },
    set: function (a) {
        return this.R.set(a)
    },
    remove: function (a) {
        if (a) {
            var b = this.rBin;
            b.appendChild(a);
            b.innerHTML = ""
        }
    },
    renderFix: function () {
        var a = this.container,
            b = a.style,
            c;
        try {
            c = a.getScreenCTM() || a.createSVGMatrix()
        } catch (d) {
            c = a.createSVGMatrix()
        }
        a = 1 - c.e % 1;
        c = 1 - c.f % 1;
        0.5 < a && (a -= 1);
        0.5 < c && (c -= 1);
        a && (b.left = a + "px");
        c && (b.top = c + "px")
    },
    update: function () {
        this.R.update()
    }
});
AmCharts.AmDObject = AmCharts.Class({
    construct: function (a, b) {
        this.D = b;
        this.R = b.R;
        this.node = this.R.create(this, a);
        this.y = this.x = 0;
        this.scale = 1
    },
    attr: function (a) {
        this.R.attr(this, a);
        return this
    },
    getAttr: function (a) {
        return this.node.getAttribute(a)
    },
    setAttr: function (a, b) {
        this.R.setAttr(this, a, b);
        return this
    },
    clipRect: function (a, b, c, d) {
        this.R.clipRect(this, a, b, c, d)
    },
    translate: function (a, b, c, d) {
        d || (a = Math.round(a), b = Math.round(b));
        this.R.move(this, a, b, c);
        this.x = a;
        this.y = b;
        this.scale = c;
        this.angle && this.rotate(this.angle)
    },
    rotate: function (a, b) {
        this.R.rotate(this, a, b);
        this.angle = a
    },
    animate: function (a, b, c) {
        for (var d in a)
            if (a.hasOwnProperty(d)) {
                var f = d,
                    e = a[d];
                c = AmCharts.getEffect(c);
                this.R.animate(this, f, e, b, c)
            }
    },
    push: function (a) {
        if (a) {
            var b = this.node;
            b.appendChild(a.node);
            var c = a.clipPath;
            c && b.appendChild(c);
            (a = a.grad) && b.appendChild(a)
        }
    },
    text: function (a) {
        this.R.setText(this, a)
    },
    remove: function () {
        this.R.remove(this)
    },
    clear: function () {
        var a = this.node;
        if (a.hasChildNodes())
            for (; 1 <= a.childNodes.length;) a.removeChild(a.firstChild)
    },
    hide: function () {
        this.setAttr("visibility", "hidden")
    },
    show: function () {
        this.setAttr("visibility", "visible")
    },
    getBBox: function () {
        return this.R.getBBox(this)
    },
    toFront: function () {
        var a = this.node;
        if (a) {
            this.prevNextNode = a.nextSibling;
            var b = a.parentNode;
            b && b.appendChild(a)
        }
    },
    toPrevious: function () {
        var a = this.node;
        a && this.prevNextNode && (a = a.parentNode) && a.insertBefore(this.prevNextNode, null)
    },
    toBack: function () {
        var a = this.node;
        if (a) {
            this.prevNextNode = a.nextSibling;
            var b = a.parentNode;
            if (b) {
                var c = b.firstChild;
                c && b.insertBefore(a, c)
            }
        }
    },
    mouseover: function (a) {
        this.R.addListener(this, "mouseover", a);
        return this
    },
    mouseout: function (a) {
        this.R.addListener(this, "mouseout", a);
        return this
    },
    click: function (a) {
        this.R.addListener(this, "click", a);
        return this
    },
    dblclick: function (a) {
        this.R.addListener(this, "dblclick", a);
        return this
    },
    mousedown: function (a) {
        this.R.addListener(this, "mousedown", a);
        return this
    },
    mouseup: function (a) {
        this.R.addListener(this, "mouseup", a);
        return this
    },
    touchstart: function (a) {
        this.R.addListener(this,
            "touchstart", a);
        return this
    },
    touchend: function (a) {
        this.R.addListener(this, "touchend", a);
        return this
    },
    contextmenu: function (a) {
        this.node.addEventListener ? this.node.addEventListener("contextmenu", a, !0) : this.R.addListener(this, "contextmenu", a);
        return this
    },
    stop: function (a) {
        (a = this.animationX) && AmCharts.removeFromArray(this.R.animations, a);
        (a = this.animationY) && AmCharts.removeFromArray(this.R.animations, a)
    },
    length: function () {
        return this.node.childNodes.length
    },
    gradient: function (a, b, c) {
        this.R.gradient(this,
            a, b, c)
    },
    pattern: function (a, b) {
        a && this.R.pattern(this, a, b)
    }
});
AmCharts.SVGRenderer = AmCharts.Class({
    construct: function (a) {
        this.D = a;
        this.animations = []
    },
    create: function (a, b) {
        return document.createElementNS(AmCharts.SVG_NS, b)
    },
    attr: function (a, b) {
        for (var c in b) b.hasOwnProperty(c) && this.setAttr(a, c, b[c])
    },
    setAttr: function (a, b, c) {
        void 0 !== c && a.node.setAttribute(b, c)
    },
    animate: function (a, b, c, d, f) {
        var e = a.node;
        a["an_" + b] && AmCharts.removeFromArray(this.animations, a["an_" + b]);
        "translate" == b ? (e = (e = e.getAttribute("transform")) ? String(e).substring(10, e.length - 1) : "0,0", e =
            e.split(", ").join(" "), e = e.split(" ").join(","), 0 === e && (e = "0,0")) : e = Number(e.getAttribute(b));
        c = {
            obj: a,
            frame: 0,
            attribute: b,
            from: e,
            to: c,
            time: d,
            effect: f
        };
        this.animations.push(c);
        a["an_" + b] = c
    },
    update: function () {
        var a, b = this.animations;
        for (a = b.length - 1; 0 <= a; a--) {
            var c = b[a],
                d = 1E3 * c.time / AmCharts.updateRate,
                f = c.frame + 1,
                e = c.obj,
                g = c.attribute,
                h, k, l;
            f <= d ? (c.frame++, "translate" == g ? (h = c.from.split(","), g = Number(h[0]), h = Number(h[1]), isNaN(h) && (h = 0), k = c.to.split(","), l = Number(k[0]), k = Number(k[1]), l = 0 === l - g ? l :
                Math.round(AmCharts[c.effect](0, f, g, l - g, d)), c = 0 === k - h ? k : Math.round(AmCharts[c.effect](0, f, h, k - h, d)), g = "transform", c = "translate(" + l + "," + c + ")") : (k = Number(c.from), h = Number(c.to), l = h - k, c = AmCharts[c.effect](0, f, k, l, d), isNaN(c) && (c = h), 0 === l && this.animations.splice(a, 1)), this.setAttr(e, g, c)) : ("translate" == g ? (k = c.to.split(","), l = Number(k[0]), k = Number(k[1]), e.translate(l, k)) : (h = Number(c.to), this.setAttr(e, g, h)), this.animations.splice(a, 1))
        }
    },
    getBBox: function (a) {
        if (a = a.node) try {
            return a.getBBox()
        } catch (b) { }
        return {
            width: 0,
            height: 0,
            x: 0,
            y: 0
        }
    },
    path: function (a, b) {
        a.node.setAttributeNS(AmCharts.SVG_XLINK, "xlink:href", b)
    },
    clipRect: function (a, b, c, d, f) {
        var e = a.node,
            g = a.clipPath;
        g && this.D.remove(g);
        var h = e.parentNode;
        h && (e = document.createElementNS(AmCharts.SVG_NS, "clipPath"), g = AmCharts.getUniqueId(), e.setAttribute("id", g), this.D.rect(b, c, d, f, 0, 0, e), h.appendChild(e), b = "#", AmCharts.baseHref && !AmCharts.isIE && (b = window.location.href + b), this.setAttr(a, "clip-path", "url(" + b + g + ")"), this.clipPathC++, a.clipPath = e)
    },
    text: function (a, b,
        c) {
        var d = new AmCharts.AmDObject("text", this.D);
        a = String(a).split("\n");
        var f = b["font-size"],
            e;
        for (e = 0; e < a.length; e++) {
            var g = this.create(null, "tspan");
            g.appendChild(document.createTextNode(a[e]));
            g.setAttribute("y", (f + 2) * e + Math.round(f / 2));
            g.setAttribute("x", 0);
            d.node.appendChild(g)
        }
        d.node.setAttribute("y", Math.round(f / 2));
        this.attr(d, b);
        this.D.addToContainer(d.node, c);
        return d
    },
    setText: function (a, b) {
        var c = a.node;
        c && (c.removeChild(c.firstChild), c.appendChild(document.createTextNode(b)))
    },
    move: function (a,
        b, c, d) {
        b = "translate(" + b + "," + c + ")";
        d && (b = b + " scale(" + d + ")");
        this.setAttr(a, "transform", b)
    },
    rotate: function (a, b) {
        var c = a.node.getAttribute("transform"),
            d = "rotate(" + b + ")";
        c && (d = c + " " + d);
        this.setAttr(a, "transform", d)
    },
    set: function (a) {
        var b = new AmCharts.AmDObject("g", this.D);
        this.D.container.appendChild(b.node);
        if (a) {
            var c;
            for (c = 0; c < a.length; c++) b.push(a[c])
        }
        return b
    },
    addListener: function (a, b, c) {
        a.node["on" + b] = c
    },
    gradient: function (a, b, c, d) {
        var f = a.node,
            e = a.grad;
        e && this.D.remove(e);
        b = document.createElementNS(AmCharts.SVG_NS,
            b);
        e = AmCharts.getUniqueId();
        b.setAttribute("id", e);
        if (!isNaN(d)) {
            var g = 0,
                h = 0,
                k = 0,
                l = 0;
            90 == d ? k = 100 : 270 == d ? l = 100 : 180 == d ? g = 100 : 0 === d && (h = 100);
            b.setAttribute("x1", g + "%");
            b.setAttribute("x2", h + "%");
            b.setAttribute("y1", k + "%");
            b.setAttribute("y2", l + "%")
        }
        for (d = 0; d < c.length; d++) g = document.createElementNS(AmCharts.SVG_NS, "stop"), h = 100 * d / (c.length - 1), 0 === d && (h = 0), g.setAttribute("offset", h + "%"), g.setAttribute("stop-color", c[d]), b.appendChild(g);
        f.parentNode.appendChild(b);
        c = "#";
        AmCharts.baseHref && !AmCharts.isIE &&
            (c = window.location.href + c);
        f.setAttribute("fill", "url(" + c + e + ")");
        a.grad = b
    },
    pattern: function (a, b, c) {
        var d = a.node;
        isNaN(c) && (c = 1);
        var f = a.patternNode;
        f && this.D.remove(f);
        var f = document.createElementNS(AmCharts.SVG_NS, "pattern"),
            e = AmCharts.getUniqueId(),
            g = b;
        b.url && (g = b.url);
        var h = Number(b.width);
        isNaN(h) && (h = 4);
        var k = Number(b.height);
        isNaN(k) && (k = 4);
        h /= c;
        k /= c;
        c = b.x;
        isNaN(c) && (c = 0);
        var l = -Math.random() * Number(b.randomX);
        isNaN(l) || (c = l);
        l = b.y;
        isNaN(l) && (l = 0);
        b = -Math.random() * Number(b.randomY);
        isNaN(b) ||
            (l = b);
        f.setAttribute("id", e);
        f.setAttribute("width", h);
        f.setAttribute("height", k);
        f.setAttribute("patternUnits", "userSpaceOnUse");
        f.setAttribute("xlink:href", g);
        this.D.image(g, 0, 0, h, k, f).translate(c, l);
        g = "#";
        AmCharts.baseHref && !AmCharts.isIE && (g = window.location.href + g);
        d.setAttribute("fill", "url(" + g + e + ")");
        a.patternNode = f;
        d.parentNode.appendChild(f)
    },
    remove: function (a) {
        a.clipPath && this.D.remove(a.clipPath);
        a.grad && this.D.remove(a.grad);
        a.patternNode && this.D.remove(a.patternNode);
        this.D.remove(a.node)
    }
});
AmCharts.AmChart = AmCharts.Class({
    construct: function () {
        this.version = "3.1.1";
        AmCharts.addChart(this);
        this.createEvents("dataUpdated", "init", "rendered", "drawn");
        this.height = this.width = "100%";
        this.dataChanged = !0;
        this.chartCreated = !1;
        this.previousWidth = this.previousHeight = 0;
        this.backgroundColor = "#FFFFFF";
        this.borderAlpha = this.backgroundAlpha = 0;
        this.color = this.borderColor = "#000000";
        this.fontFamily = "Verdana";
        this.fontSize = 11;
        this.usePrefixes = !1;
        this.numberFormatter = {
            precision: -1,
            decimalSeparator: ".",
            thousandsSeparator: ","
        };
        this.percentFormatter = {
            precision: 2,
            decimalSeparator: ".",
            thousandsSeparator: ","
        };
        this.labels = [];
        this.allLabels = [];
        this.titles = [];
        this.marginRight = this.marginLeft = this.autoMarginOffset = 0;
        this.timeOuts = [];
        var a = document.createElement("div"),
            b = a.style;
        b.overflow = "hidden";
        b.position = "relative";
        b.textAlign = "left";
        this.chartDiv = a;
        a = document.createElement("div");
        b = a.style;
        b.overflow = "hidden";
        b.position = "relative";
        b.textAlign = "left";
        this.legendDiv = a;
        this.balloon = new AmCharts.AmBalloon;
        this.balloon.chart = this;
        this.titleHeight = 0;
        this.hideBalloonTime = 150;
        this.handDrawScatter = 2;
        this.handDrawThickness = 1;
        this.prefixesOfBigNumbers = [{
            number: 1E3,
            prefix: "k"
        }, {
            number: 1E6,
            prefix: "M"
        }, {
            number: 1E9,
            prefix: "G"
        }, {
            number: 1E12,
            prefix: "T"
        }, {
            number: 1E15,
            prefix: "P"
        }, {
            number: 1E18,
            prefix: "E"
        }, {
            number: 1E21,
            prefix: "Z"
        }, {
            number: 1E24,
            prefix: "Y"
        }];
        this.prefixesOfSmallNumbers = [{
            number: 1E-24,
            prefix: "y"
        }, {
            number: 1E-21,
            prefix: "z"
        }, {
            number: 1E-18,
            prefix: "a"
        }, {
            number: 1E-15,
            prefix: "f"
        }, {
            number: 1E-12,
            prefix: "p"
        }, {
            number: 1E-9,
            prefix: "n"
        }, {
            number: 1E-6,
            prefix: "\u03bc"
        }, {
            number: 0.001,
            prefix: "m"
        }];
        this.panEventsEnabled = !1;
        AmCharts.bezierX = 3;
        AmCharts.bezierY = 6;
        this.product = "amcharts";
        this.animations = []
    },
    drawChart: function () {
        this.drawBackground();
        this.redrawLabels();
        this.drawTitles()
    },
    drawBackground: function () {
        AmCharts.remove(this.background);
        var a = this.container,
            b = this.backgroundColor,
            c = this.backgroundAlpha,
            d = this.set;
        AmCharts.isModern || 0 !== c || (c = 0.001);
        var f = this.updateWidth();
        this.realWidth = f;
        var e = this.updateHeight();
        this.realHeight =
            e;
        this.background = b = AmCharts.polygon(a, [0, f - 1, f - 1, 0], [0, 0, e - 1, e - 1], b, c, 1, this.borderColor, this.borderAlpha);
        d.push(b);
        if (b = this.backgroundImage) this.path && (b = this.path + b), this.bgImg = a = a.image(b, 0, 0, f, e), d.push(a)
    },
    drawTitles: function () {
        var a = this.titles;
        if (AmCharts.ifArray(a)) {
            var b = 20,
                c;
            for (c = 0; c < a.length; c++) {
                var d = a[c],
                    f = d.color;
                void 0 === f && (f = this.color);
                var e = d.size;
                isNaN(d.alpha);
                var g = this.marginLeft,
                    f = AmCharts.text(this.container, d.text, f, this.fontFamily, e);
                f.translate(g + (this.realWidth - this.marginRight -
                    g) / 2, b);
                g = !0;
                void 0 !== d.bold && (g = d.bold);
                g && f.attr({
                    "font-weight": "bold"
                });
                b += e + 6;
                this.freeLabelsSet.push(f)
            }
        }
    },
    write: function (a) {
        var b = this.balloon;
        b && !b.chart && (b.chart = this);
        a = "object" != typeof a ? document.getElementById(a) : a;
        a.innerHTML = "";
        this.div = a;
        a.style.overflow = "hidden";
        a.style.textAlign = "left";
        var b = this.chartDiv,
            c = this.legendDiv,
            d = this.legend,
            f = c.style,
            e = b.style;
        this.measure();
        var g, h;
        if (d) switch (d.position) {
            case "bottom":
                a.appendChild(b);
                a.appendChild(c);
                break;
            case "top":
                a.appendChild(c);
                a.appendChild(b);
                break;
            case "absolute":
                g = document.createElement("div");
                h = g.style;
                h.position = "relative";
                h.width = a.style.width;
                h.height = a.style.height;
                a.appendChild(g);
                f.position = "absolute";
                e.position = "absolute";
                void 0 !== d.left && (f.left = d.left + "px");
                void 0 !== d.right && (f.right = d.right + "px");
                void 0 !== d.top && (f.top = d.top + "px");
                void 0 !== d.bottom && (f.bottom = d.bottom + "px");
                d.marginLeft = 0;
                d.marginRight = 0;
                g.appendChild(b);
                g.appendChild(c);
                break;
            case "right":
                g = document.createElement("div");
                h = g.style;
                h.position =
                    "relative";
                h.width = a.style.width;
                h.height = a.style.height;
                a.appendChild(g);
                f.position = "relative";
                e.position = "absolute";
                g.appendChild(b);
                g.appendChild(c);
                break;
            case "left":
                g = document.createElement("div");
                h = g.style;
                h.position = "relative";
                h.width = a.style.width;
                h.height = a.style.height;
                a.appendChild(g);
                f.position = "absolute";
                e.position = "relative";
                g.appendChild(b);
                g.appendChild(c);
                break;
            case "outside":
                a.appendChild(b)
        } else a.appendChild(b);
        this.listenersAdded || (this.addListeners(), this.listenersAdded = !0);
        this.initChart()
    },
    createLabelsSet: function () {
        AmCharts.remove(this.labelsSet);
        this.labelsSet = this.container.set();
        this.freeLabelsSet.push(this.labelsSet)
    },
    initChart: function () {
        this.divIsFixed = AmCharts.findIfFixed(this.chartDiv);
        this.previousHeight = this.divRealHeight;
        this.previousWidth = this.divRealWidth;
        this.destroy();
        this.startInterval();
        var a = 0;
        document.attachEvent && !window.opera && (a = 1);
        this.dmouseX = this.dmouseY = 0;
        var b = document.getElementsByTagName("html")[0];
        b && window.getComputedStyle && (b = window.getComputedStyle(b,
            null)) && (this.dmouseY = AmCharts.removePx(b.getPropertyValue("margin-top")), this.dmouseX = AmCharts.removePx(b.getPropertyValue("margin-left")));
        this.mouseMode = a;
        a = new AmCharts.AmDraw(this.chartDiv, this.realWidth, this.realHeight, this);
        a.handDrawn = this.handDrawn;
        a.handDrawScatter = this.handDrawScatter;
        a.handDrawThickness = this.handDrawThickness;
        this.container = a;
        if (AmCharts.VML || AmCharts.SVG) a = this.container, this.set = a.set(), this.gridSet = a.set(), this.graphsBehindSet = a.set(), this.bulletBehindSet = a.set(), this.columnSet =
            a.set(), this.graphsSet = a.set(), this.trendLinesSet = a.set(), this.axesLabelsSet = a.set(), this.axesSet = a.set(), this.cursorSet = a.set(), this.scrollbarsSet = a.set(), this.bulletSet = a.set(), this.freeLabelsSet = a.set(), this.balloonsSet = a.set(), this.balloonsSet.setAttr("id", "balloons"), this.zoomButtonSet = a.set(), this.linkSet = a.set(), this.brrr(), this.renderFix()
    },
    measure: function () {
        var a = this.div,
            b = this.chartDiv,
            c = a.offsetWidth,
            d = a.offsetHeight,
            f = this.container;
        a.clientHeight && (c = a.clientWidth, d = a.clientHeight);
        var e = AmCharts.removePx(AmCharts.getStyle(a, "padding-left")),
            g = AmCharts.removePx(AmCharts.getStyle(a, "padding-right")),
            h = AmCharts.removePx(AmCharts.getStyle(a, "padding-top")),
            k = AmCharts.removePx(AmCharts.getStyle(a, "padding-bottom"));
        isNaN(e) || (c -= e);
        isNaN(g) || (c -= g);
        isNaN(h) || (d -= h);
        isNaN(k) || (d -= k);
        e = a.style;
        a = e.width;
        e = e.height; -1 != a.indexOf("px") && (c = AmCharts.removePx(a)); -1 != e.indexOf("px") && (d = AmCharts.removePx(e));
        a = AmCharts.toCoordinate(this.width, c);
        e = AmCharts.toCoordinate(this.height, d);
        if (a != this.previousWidth || e != this.previousHeight) b.style.width = a + "px", b.style.height = e + "px", f && f.setSize(a, e), this.balloon.setBounds(2, 2, a - 2, e);
        this.realWidth = a;
        this.realHeight = e;
        this.divRealWidth = c;
        this.divRealHeight = d
    },
    destroy: function () {
        this.chartDiv.innerHTML = "";
        this.clearTimeOuts();
        this.interval && clearInterval(this.interval);
        this.interval = NaN
    },
    clearTimeOuts: function () {
        var a = this.timeOuts;
        if (a) {
            var b;
            for (b = 0; b < a.length; b++) clearTimeout(a[b])
        }
        this.timeOuts = []
    },
    clear: function (a) {
        AmCharts.callMethod("clear", [this.chartScrollbar, this.scrollbarV, this.scrollbarH, this.chartCursor]);
        this.chartCursor = this.scrollbarH = this.scrollbarV = this.chartScrollbar = null;
        this.clearTimeOuts();
        this.container && (this.container.remove(this.chartDiv), this.container.remove(this.legendDiv));
        a || AmCharts.removeChart(this)
    },
    setMouseCursor: function (a) {
        "auto" == a && AmCharts.isNN && (a = "default");
        this.chartDiv.style.cursor = a;
        this.legendDiv.style.cursor = a
    },
    redrawLabels: function () {
        this.labels = [];
        var a = this.allLabels;
        this.createLabelsSet();
        var b;
        for (b = 0; b < a.length; b++) this.drawLabel(a[b])
    },
    drawLabel: function (a) {
        if (this.container) {
            var b = a.y,
                c = a.text,
                d = a.align,
                f = a.size,
                e = a.color,
                g = a.rotation,
                h = a.alpha,
                k = a.bold,
                l = AmCharts.toCoordinate(a.x, this.realWidth),
                b = AmCharts.toCoordinate(b, this.realHeight);
            l || (l = 0);
            b || (b = 0);
            void 0 === e && (e = this.color);
            isNaN(f) && (f = this.fontSize);
            d || (d = "start");
            "left" == d && (d = "start");
            "right" == d && (d = "end");
            "center" == d && (d = "middle", g ? b = this.realHeight - b + b / 2 : l = this.realWidth / 2 - l);
            void 0 === h && (h = 1);
            void 0 === g && (g = 0);
            b += f / 2;
            c = AmCharts.text(this.container, c, e, this.fontFamily, f, d, k, h);
            c.translate(l, b);
            0 !== g && c.rotate(g);
            a.url && (c.setAttr("cursor", "pointer"), c.click(function () {
                AmCharts.getURL(a.url)
            }));
            this.labelsSet.push(c);
            this.labels.push(c)
        }
    },
    addLabel: function (a, b, c, d, f, e, g, h, k, l) {
        a = {
            x: a,
            y: b,
            text: c,
            align: d,
            size: f,
            color: e,
            alpha: h,
            rotation: g,
            bold: k,
            url: l
        };
        this.container && this.drawLabel(a);
        this.allLabels.push(a)
    },
    clearLabels: function () {
        var a = this.labels,
            b;
        for (b = a.length - 1; 0 <= b; b--) a[b].remove();
        this.labels = [];
        this.allLabels = []
    },
    updateHeight: function () {
        var a = this.divRealHeight,
            b = this.legend;
        if (b) {
            var c = this.legendDiv.offsetHeight,
                b = b.position;
            if ("top" == b || "bottom" == b) a -= c, 0 > a && (a = 0), this.chartDiv.style.height = a + "px"
        }
        return a
    },
    updateWidth: function () {
        var a = this.divRealWidth,
            b = this.divRealHeight,
            c = this.legend;
        if (c) {
            var d = this.legendDiv,
                f = d.offsetWidth,
                e = d.offsetHeight,
                d = d.style,
                g = this.chartDiv.style,
                c = c.position;
            if ("right" == c || "left" == c) a -= f, 0 > a && (a = 0), g.width = a + "px", "left" == c ? g.left = f + "px" : d.left = a + "px", d.top = (b - e) / 2 + "px"
        }
        return a
    },
    getTitleHeight: function () {
        var a = 0,
            b = this.titles;
        if (0 < b.length) {
            var a = 15,
                c;
            for (c = 0; c < b.length; c++) a += b[c].size + 6
        }
        return a
    },
    addTitle: function (a, b, c, d, f) {
        isNaN(b) && (b = this.fontSize + 2);
        a = {
            text: a,
            size: b,
            color: c,
            alpha: d,
            bold: f
        };
        this.titles.push(a);
        return a
    },
    addMouseWheel: function () {
        var a = this;
        window.addEventListener && (window.addEventListener("DOMMouseScroll", function (b) {
            a.handleWheel.call(a, b)
        }, !1), document.addEventListener("mousewheel", function (b) {
            a.handleWheel.call(a, b)
        }, !1))
    },
    handleWheel: function (a) {
        if (this.mouseIsOver) {
            var b =
                0;
            a || (a = window.event);
            a.wheelDelta ? b = a.wheelDelta / 120 : a.detail && (b = -a.detail / 3);
            b && this.handleWheelReal(b);
            a.preventDefault && a.preventDefault();
            a.returnValue = !1
        }
    },
    handleWheelReal: function (a) { },
    addListeners: function () {
        var a = this,
            b = a.chartDiv;
        document.addEventListener ? (a.panEventsEnabled && "ontouchstart" in document.documentElement && (b.addEventListener("touchstart", function (b) {
            a.handleTouchMove.call(a, b);
            a.handleTouchStart.call(a, b)
        }, !0), b.addEventListener("touchmove", function (b) {
            a.handleTouchMove.call(a,
                b)
        }, !0), b.addEventListener("touchend", function (b) {
            a.handleTouchEnd.call(a, b)
        }, !0)), b.addEventListener("mousedown", function (b) {
            a.handleMouseDown.call(a, b)
        }, !0), b.addEventListener("mouseover", function (b) {
            a.handleMouseOver.call(a, b)
        }, !0), b.addEventListener("mouseout", function (b) {
            a.handleMouseOut.call(a, b)
        }, !0)) : (b.attachEvent("onmousedown", function (b) {
            a.handleMouseDown.call(a, b)
        }), b.attachEvent("onmouseover", function (b) {
            a.handleMouseOver.call(a, b)
        }), b.attachEvent("onmouseout", function (b) {
            a.handleMouseOut.call(a,
                b)
        }))
    },
    dispDUpd: function () {
        var a;
        this.dispatchDataUpdated && (this.dispatchDataUpdated = !1, a = "dataUpdated", this.fire(a, {
            type: a,
            chart: this
        }));
        this.chartCreated || (a = "init", this.fire(a, {
            type: a,
            chart: this
        }));
        this.chartRendered || (a = "rendered", this.fire(a, {
            type: a,
            chart: this
        }), this.chartRendered = !0);
        a = "drawn";
        this.fire(a, {
            type: a,
            chart: this
        })
    },
    brrr: function () {
        var a = this.product,
            b = a + ".com",
            c = window.location.hostname.split("."),
            d;
        2 <= c.length && (d = c[c.length - 2] + "." + c[c.length - 1]);
        AmCharts.remove(this.bbset);
        if (d !=
            b) {
            var b = b + "/?utm_source=swf&utm_medium=demo&utm_campaign=jsDemo" + a,
                f = "chart by ",
                c = 145;
            "ammap" == a && (f = "tool by ", c = 125);
            d = AmCharts.rect(this.container, c, 20, "#FFFFFF", 1);
            f = AmCharts.text(this.container, f + a + ".com", "#000000", "Verdana", 11, "start");
            f.translate(7, 9);
            d = this.container.set([d, f]);
            "ammap" == a && d.translate(this.realWidth - c, 0);
            this.bbset = d;
            this.linkSet.push(d);
            d.setAttr("cursor", "pointer");
            d.click(function () {
                window.location.href = "http://" + b
            });
            for (a = 0; a < d.length; a++) d[a].attr({
                cursor: "pointer"
            })
        }
    },
    validateSize: function () {
        var a = this;
        a.measure();
        var b = a.legend;
        if ((a.realWidth != a.previousWidth || a.realHeight != a.previousHeight) && 0 < a.realWidth && 0 < a.realHeight) {
            a.sizeChanged = !0;
            if (b) {
                clearTimeout(a.legendInitTO);
                var c = setTimeout(function () {
                    b.invalidateSize()
                }, 100);
                a.timeOuts.push(c);
                a.legendInitTO = c
            }
            a.marginsUpdated = "xy" != a.chartType ? !1 : !0;
            clearTimeout(a.initTO);
            c = setTimeout(function () {
                a.initChart()
            }, 150);
            a.timeOuts.push(c);
            a.initTO = c
        }
        a.renderFix();
        b && b.renderFix()
    },
    invalidateSize: function () {
        this.previousHeight =
            this.previousWidth = NaN;
        this.invalidateSizeReal()
    },
    invalidateSizeReal: function () {
        var a = this;
        a.marginsUpdated = !1;
        clearTimeout(a.validateTO);
        var b = setTimeout(function () {
            a.validateSize()
        }, 5);
        a.timeOuts.push(b);
        a.validateTO = b
    },
    validateData: function (a) {
        this.chartCreated && (this.dataChanged = !0, this.marginsUpdated = "xy" != this.chartType ? !1 : !0, this.initChart(a))
    },
    validateNow: function () {
        this.listenersAdded = !1;
        this.write(this.div)
    },
    showItem: function (a) {
        a.hidden = !1;
        this.initChart()
    },
    hideItem: function (a) {
        a.hidden = !0;
        this.initChart()
    },
    hideBalloon: function () {
        var a = this;
        clearInterval(a.hoverInt);
        clearTimeout(a.balloonTO);
        a.hoverInt = setTimeout(function () {
            a.hideBalloonReal.call(a)
        }, a.hideBalloonTime)
    },
    cleanChart: function () { },
    hideBalloonReal: function () {
        var a = this.balloon;
        a && a.hide()
    },
    showBalloon: function (a, b, c, d, f) {
        var e = this;
        clearTimeout(e.balloonTO);
        clearInterval(e.hoverInt);
        e.balloonTO = setTimeout(function () {
            e.showBalloonReal.call(e, a, b, c, d, f)
        }, 1)
    },
    showBalloonReal: function (a, b, c, d, f) {
        this.handleMouseMove();
        var e =
            this.balloon;
        e.enabled && (e.followCursor(!1), e.changeColor(b), !c || e.fixedPosition ? (e.setPosition(d, f), e.followCursor(!1)) : e.followCursor(!0), a && e.showBalloon(a))
    },
    handleTouchMove: function (a) {
        this.hideBalloon();
        var b = this.chartDiv;
        a.touches && (a = a.touches.item(0), this.mouseX = a.pageX - AmCharts.findPosX(b), this.mouseY = a.pageY - AmCharts.findPosY(b))
    },
    handleMouseOver: function (a) {
        AmCharts.resetMouseOver();
        this.mouseIsOver = !0
    },
    handleMouseOut: function (a) {
        AmCharts.resetMouseOver();
        this.mouseIsOver = !1
    },
    handleMouseMove: function (a) {
        if (this.mouseIsOver) {
            var b =
                this.chartDiv;
            a || (a = window.event);
            var c, d;
            if (a) {
                this.posX = AmCharts.findPosX(b);
                this.posY = AmCharts.findPosY(b);
                switch (this.mouseMode) {
                    case 1:
                        c = a.clientX - this.posX;
                        d = a.clientY - this.posY;
                        if (!this.divIsFixed) {
                            var b = document.body,
                                f, e;
                            b && (f = b.scrollLeft, y1 = b.scrollTop);
                            if (b = document.documentElement) e = b.scrollLeft, y2 = b.scrollTop;
                            f = Math.max(f, e);
                            e = Math.max(y1, y2);
                            c += f;
                            d += e
                        }
                        break;
                    case 0:
                        this.divIsFixed ? (c = a.clientX - this.posX, d = a.clientY - this.posY) : (c = a.pageX - this.posX, d = a.pageY - this.posY)
                }
                a.touches && (a = a.touches.item(0),
                    c = a.pageX - this.posX, d = a.pageY - this.posY);
                this.mouseX = c - this.dmouseX;
                this.mouseY = d - this.dmouseY
            }
        }
    },
    handleTouchStart: function (a) {
        this.handleMouseDown(a)
    },
    handleTouchEnd: function (a) {
        AmCharts.resetMouseOver();
        this.handleReleaseOutside(a)
    },
    handleReleaseOutside: function (a) { },
    handleMouseDown: function (a) {
        AmCharts.resetMouseOver();
        this.mouseIsOver = !0;
        a && a.preventDefault && a.preventDefault()
    },
    addLegend: function (a, b) {
        AmCharts.extend(a, new AmCharts.AmLegend);
        var c;
        c = "object" != typeof b ? document.getElementById(b) :
            b;
        this.legend = a;
        a.chart = this;
        c ? (a.div = c, a.position = "outside", a.autoMargins = !1) : a.div = this.legendDiv;
        c = this.handleLegendEvent;
        this.listenTo(a, "showItem", c);
        this.listenTo(a, "hideItem", c);
        this.listenTo(a, "clickMarker", c);
        this.listenTo(a, "rollOverItem", c);
        this.listenTo(a, "rollOutItem", c);
        this.listenTo(a, "rollOverMarker", c);
        this.listenTo(a, "rollOutMarker", c);
        this.listenTo(a, "clickLabel", c)
    },
    removeLegend: function () {
        this.legend = void 0;
        this.legendDiv.innerHTML = ""
    },
    handleResize: function () {
        (AmCharts.isPercents(this.width) ||
            AmCharts.isPercents(this.height)) && this.invalidateSizeReal();
        this.renderFix()
    },
    renderFix: function () {
        if (!AmCharts.VML) {
            var a = this.container;
            a && a.renderFix()
        }
    },
    getSVG: function () {
        if (AmCharts.hasSVG) return this.container
    },
    animate: function (a, b, c, d, f, e, g) {
        a["an_" + b] && AmCharts.removeFromArray(this.animations, a["an_" + b]);
        c = {
            obj: a,
            frame: 0,
            attribute: b,
            from: c,
            to: d,
            time: f,
            effect: e,
            suffix: g
        };
        a["an_" + b] = c;
        this.animations.push(c);
        return c
    },
    startInterval: function () {
        var a = this;
        clearInterval(a.interval);
        a.interval =
            setInterval(function () {
                a.updateAnimations.call(a)
            }, AmCharts.updateRate)
    },
    stopAnim: function (a) {
        AmCharts.removeFromArray(this.animations, a)
    },
    updateAnimations: function () {
        var a;
        this.container && this.container.update();
        for (a = this.animations.length - 1; 0 <= a; a--) {
            var b = this.animations[a],
                c = 1E3 * b.time / AmCharts.updateRate,
                d = b.frame + 1,
                f = b.obj,
                e = b.attribute;
            if (d <= c) {
                b.frame++;
                var g = Number(b.from),
                    h = Number(b.to) - g,
                    c = AmCharts[b.effect](0, d, g, h, c);
                0 === h ? this.animations.splice(a, 1) : f.node.style[e] = c + b.suffix
            } else f.node.style[e] =
                Number(b.to) + b.suffix, this.animations.splice(a, 1)
        }
    }
});
AmCharts.Slice = AmCharts.Class({
    construct: function () { }
});
AmCharts.SerialDataItem = AmCharts.Class({
    construct: function () { }
});
AmCharts.GraphDataItem = AmCharts.Class({
    construct: function () { }
});
AmCharts.Guide = AmCharts.Class({
    construct: function () { }
});
AmCharts.AmBalloon = AmCharts.Class({
    construct: function () {
        this.enabled = !0;
        this.fillColor = "#FFFFFF";
        this.fillAlpha = 0.8;
        this.borderThickness = 2;
        this.borderColor = "#FFFFFF";
        this.borderAlpha = 1;
        this.cornerRadius = 0;
        this.maximumWidth = 220;
        this.horizontalPadding = 8;
        this.verticalPadding = 4;
        this.pointerWidth = 6;
        this.pointerOrientation = "V";
        this.color = "#000000";
        this.adjustBorderColor = !0;
        this.show = this.follow = this.showBullet = !1;
        this.bulletSize = 3;
        this.shadowAlpha = 0.4;
        this.shadowColor = "#000000";
        this.fadeOutDuration = this.animationDuration =
            0.3;
        this.fixedPosition = !1;
        this.offsetY = 6;
        this.offsetX = 1;
        AmCharts.isModern || (this.offsetY *= 1.5)
    },
    draw: function () {
        var a = this.pointToX,
            b = this.pointToY;
        this.deltaSignX = this.deltaSignY = 1;
        var c = this.chart;
        AmCharts.VML && (this.fadeOutDuration = 0);
        this.xAnim && c.stopAnim(this.xAnim);
        this.yAnim && c.stopAnim(this.yAnim);
        if (!isNaN(a)) {
            var d = this.follow,
                f = c.container,
                e = this.set;
            AmCharts.remove(e);
            this.removeDiv();
            this.set = e = f.set();
            c.balloonsSet.push(e);
            if (this.show) {
                var g = this.l,
                    h = this.t,
                    k = this.r,
                    l = this.b,
                    m = this.balloonColor,
                    n = this.fillColor,
                    q = this.borderColor,
                    r = n;
                void 0 != m && (this.adjustBorderColor ? r = q = m : n = m);
                var A = this.horizontalPadding,
                    z = this.verticalPadding,
                    p = this.pointerWidth,
                    s = this.pointerOrientation,
                    y = this.cornerRadius,
                    t = c.fontFamily,
                    w = this.fontSize;
                void 0 == w && (w = c.fontSize);
                var m = document.createElement("div"),
                    u = m.style;
                u.position = "absolute";
                m.innerHTML = '<div style="max-width:' + this.maxWidth + "px; font-size:" + w + "px; color:" + this.color + "; font-family:" + t + '">' + this.text + "</div>";
                c.chartDiv.appendChild(m);
                this.textDiv =
                    m;
                w = m.offsetWidth;
                t = m.offsetHeight;
                m.clientHeight && (w = m.clientWidth, t = m.clientHeight);
                var t = t + 2 * z,
                    x = w + 2 * A;
                window.opera && (t += 2);
                var v, C = !1;
                v = this.offsetY;
                c.handDrawn && (v += c.handDrawScatter + 2);
                "H" != s ? (w = a - x / 2, b < h + t + 10 && "down" != s ? (C = !0, d && (b += v), v = b + p, this.deltaSignY = -1) : (d && (b -= v), v = b - t - p, this.deltaSignY = 1)) : (2 * p > t && (p = t / 2), v = b - t / 2, a < g + (k - g) / 2 ? (w = a + p, this.deltaSignX = -1) : (w = a - x - p, this.deltaSignX = 1));
                v + t >= l && (v = l - t);
                v < h && (v = h);
                w < g && (w = g);
                w + x > k && (w = k - x);
                var h = v + z,
                    l = w + A,
                    z = this.shadowAlpha,
                    D = this.shadowColor,
                    A = this.borderThickness,
                    B = this.bulletSize,
                    E;
                0 < y || 0 === p ? (0 < z && (a = AmCharts.rect(f, x, t, n, 0, A + 1, D, z, this.cornerRadius), AmCharts.isModern ? a.translate(1, 1) : a.translate(4, 4), e.push(a)), n = AmCharts.rect(f, x, t, n, this.fillAlpha, A, q, this.borderAlpha, this.cornerRadius), this.showBullet && (E = AmCharts.circle(f, B, r, this.fillAlpha), e.push(E))) : (r = [], y = [], "H" != s ? (g = a - w, g > x - p && (g = x - p), g < p && (g = p), r = [0, g - p, a - w, g + p, x, x, 0, 0], y = C ? [0, 0, b - v, 0, 0, t, t, 0] : [t, t, b - v, t, t, 0, 0, t]) : (r = b - v, r > t - p && (r = t - p), r < p && (r = p), y = [0, r - p, b - v, r + p, t, t,
                    0, 0
                ], r = a < g + (k - g) / 2 ? [0, 0, w < a ? 0 : a - w, 0, 0, x, x, 0] : [x, x, w + x > a ? x : a - w, x, x, 0, 0, x]), 0 < z && (a = AmCharts.polygon(f, r, y, n, 0, A, D, z), a.translate(1, 1), e.push(a)), n = AmCharts.polygon(f, r, y, n, this.fillAlpha, A, q, this.borderAlpha));
                this.bg = n;
                e.push(n);
                n.toFront();
                f = 1 * this.deltaSignX;
                u.left = l + "px";
                u.top = h + "px";
                e.translate(w - f, v);
                n = n.getBBox();
                this.bottom = v + t + 1;
                this.yPos = n.y + v;
                E && E.translate(this.pointToX - w + f, b - v);
                b = this.animationDuration;
                0 < this.animationDuration && !d && !isNaN(this.prevX) && (e.translate(this.prevX, this.prevY),
                    e.animate({
                        translate: w - f + "," + v
                    }, b, "easeOutSine"), m && (u.left = this.prevTX + "px", u.top = this.prevTY + "px", this.xAnim = c.animate({
                        node: m
                    }, "left", this.prevTX, l, b, "easeOutSine", "px"), this.yAnim = c.animate({
                        node: m
                    }, "top", this.prevTY, h, b, "easeOutSine", "px")));
                this.prevX = w - f;
                this.prevY = v;
                this.prevTX = l;
                this.prevTY = h
            }
        }
    },
    followMouse: function () {
        if (this.follow && this.show) {
            var a = this.chart.mouseX - this.offsetX * this.deltaSignX,
                b = this.chart.mouseY;
            this.pointToX = a;
            this.pointToY = b;
            if (a != this.previousX || b != this.previousY)
                if (this.previousX =
                    a, this.previousY = b, 0 === this.cornerRadius) this.draw();
                else {
                    var c = this.set;
                    if (c) {
                        var d = c.getBBox(),
                            a = a - d.width / 2,
                            f = b - d.height - 10;
                        a < this.l && (a = this.l);
                        a > this.r - d.width && (a = this.r - d.width);
                        f < this.t && (f = b + 10);
                        c.translate(a, f);
                        b = this.textDiv.style;
                        b.left = a + this.horizontalPadding + "px";
                        b.top = f + this.verticalPadding + "px"
                    }
                }
        }
    },
    changeColor: function (a) {
        this.balloonColor = a
    },
    setBounds: function (a, b, c, d) {
        this.l = a;
        this.t = b;
        this.r = c;
        this.b = d;
        this.destroyTO && clearTimeout(this.destroyTO)
    },
    showBalloon: function (a) {
        this.text =
            a;
        this.show = !0;
        this.destroyTO && clearTimeout(this.destroyTO);
        a = this.chart;
        this.fadeAnim1 && a.stopAnim(this.fadeAnim1);
        this.fadeAnim2 && a.stopAnim(this.fadeAnim2);
        this.draw()
    },
    hide: function () {
        var a = this,
            b = a.fadeOutDuration,
            c = a.chart;
        if (0 < b) {
            a.destroyTO = setTimeout(function () {
                a.destroy.call(a)
            }, 1E3 * b);
            a.follow = !1;
            a.show = !1;
            var d = a.set;
            d && (d.setAttr("opacity", a.fillAlpha), a.fadeAnim1 = d.animate({
                opacity: 0
            }, b, "easeInSine"));
            a.textDiv && (a.fadeAnim2 = c.animate({
                node: a.textDiv
            }, "opacity", 1, 0, b, "easeInSine", ""))
        } else a.show = !1, a.follow = !1, a.destroy()
    },
    setPosition: function (a, b, c) {
        this.pointToX = a;
        this.pointToY = b;
        c && (a == this.previousX && b == this.previousY || this.draw());
        this.previousX = a;
        this.previousY = b
    },
    followCursor: function (a) {
        var b = this;
        (b.follow = a) ? (b.pShowBullet = b.showBullet, b.showBullet = !1) : void 0 !== b.pShowBullet && (b.showBullet = b.pShowBullet);
        clearInterval(b.interval);
        var c = b.chart.mouseX,
            d = b.chart.mouseY;
        !isNaN(c) && a && (b.pointToX = c - b.offsetX * b.deltaSignX, b.pointToY = d, b.followMouse(), b.interval = setInterval(function () {
            b.followMouse.call(b)
        },
            40))
    },
    removeDiv: function () {
        if (this.textDiv) {
            var a = this.textDiv.parentNode;
            a && a.removeChild(this.textDiv)
        }
    },
    destroy: function () {
        clearInterval(this.interval);
        AmCharts.remove(this.set);
        this.removeDiv();
        this.set = null
    }
});
AmCharts.circle = function (a, b, c, d, f, e, g, h) {
    if (void 0 == f || 0 === f) f = 1;
    void 0 === e && (e = "#000000");
    void 0 === g && (g = 0);
    d = {
        fill: c,
        stroke: e,
        "fill-opacity": d,
        "stroke-width": f,
        "stroke-opacity": g
    };
    a = a.circle(0, 0, b).attr(d);
    h && a.gradient("radialGradient", [c, AmCharts.adjustLuminosity(c, -0.6)]);
    return a
};
AmCharts.text = function (a, b, c, d, f, e, g, h) {
    e || (e = "middle");
    "right" == e && (e = "end");
    isNaN(h) && (h = 1);
    void 0 !== b && (b = String(b), AmCharts.isIE && !AmCharts.isModern && (b = b.replace("&amp;", "&"), b = b.replace("&", "&amp;")));
    c = {
        fill: c,
        "font-family": d,
        "font-size": f,
        opacity: h
    };
    !0 === g && (c["font-weight"] = "bold");
    c["text-anchor"] = e;
    return a.text(b, c)
};
AmCharts.polygon = function (a, b, c, d, f, e, g, h, k, l, m) {
    isNaN(e) && (e = 0);
    isNaN(h) && (h = f);
    var n = d,
        q = !1;
    "object" == typeof n && 1 < n.length && (q = !0, n = n[0]);
    void 0 === g && (g = n);
    f = {
        fill: n,
        stroke: "#ef9c02",
        "fill-opacity": f,
        "stroke-width": e,
        "stroke-opacity": h
    };
    void 0 !== m && 0 < m && (f["stroke-dasharray"] = m);
    m = AmCharts.dx;
    e = AmCharts.dy;
    a.handDrawn && (c = AmCharts.makeHD(b, c, a.handDrawScatter), b = c[0], c = c[1]);
    g = Math.round;
    l && (g = AmCharts.doNothing);
    l = "M" + (g(b[0]) + m) + "," + (g(c[0]) + e);
    for (h = 1; h < b.length; h++) l += " L" + (g(b[h]) + m) + "," + (g(c[h]) +
        e);
    a = a.path(l + " Z").attr(f);
    q && a.gradient("linearGradient", d, k);
    return a
};
AmCharts.rect = function (a, b, c, d, f, e, g, h, k, l, m) {
    isNaN(e) && (e = 0);
    void 0 === k && (k = 0);
    void 0 === l && (l = 270);
    isNaN(f) && (f = 0);
    var n = d,
        q = !1;
    "object" == typeof n && (n = n[0], q = !0);
    void 0 === g && (g = n);
    void 0 === h && (h = f);
    b = Math.round(b);
    c = Math.round(c);
    var r = 0,
        A = 0;
    0 > b && (b = Math.abs(b), r = -b);
    0 > c && (c = Math.abs(c), A = -c);
    r += AmCharts.dx;
    A += AmCharts.dy;
    f = {
        fill: n,
        stroke: "#ef9c02",
        "fill-opacity": f,
        "stroke-opacity": h
    };
    void 0 !== m && 0 < m && (f["stroke-dasharray"] = m);
    a = a.rect(r, A, b, c, k, e).attr(f);
    q && a.gradient("linearGradient", d, l);
    return a
};
AmCharts.bullet = function (a, b, c, d, f, e, g, h, k, l, m) {
    var n;
    "circle" == b && (b = "round");
    switch (b) {
        case "round":
            n = AmCharts.circle(a, c / 2, d, f, e, g, h);
            break;
        case "square":
            n = AmCharts.polygon(a, [-c / 2, c / 2, c / 2, -c / 2], [c / 2, c / 2, -c / 2, -c / 2], d, f, e, g, h, l - 180);
            break;
        case "diamond":
            n = AmCharts.polygon(a, [-c / 2, 0, c / 2, 0], [0, -c / 2, 0, c / 2], d, f, e, g, h);
            break;
        case "triangleUp":
            n = AmCharts.triangle(a, c, 0, d, f, e, g, h);
            break;
        case "triangleDown":
            n = AmCharts.triangle(a, c, 180, d, f, e, g, h);
            break;
        case "triangleLeft":
            n = AmCharts.triangle(a, c, 270, d, f,
                e, g, h);
            break;
        case "triangleRight":
            n = AmCharts.triangle(a, c, 90, d, f, e, g, h);
            break;
        case "bubble":
            n = AmCharts.circle(a, c / 2, d, f, e, g, h, !0);
            break;
        case "yError":
            n = a.set();
            n.push(AmCharts.line(a, [0, 0], [-c / 2, c / 2], d, f, e));
            n.push(AmCharts.line(a, [-k, k], [-c / 2, -c / 2], d, f, e));
            n.push(AmCharts.line(a, [-k, k], [c / 2, c / 2], d, f, e));
            break;
        case "xError":
            n = a.set(), n.push(AmCharts.line(a, [-c / 2, c / 2], [0, 0], d, f, e)), n.push(AmCharts.line(a, [-c / 2, -c / 2], [-k, k], d, f, e)), n.push(AmCharts.line(a, [c / 2, c / 2], [-k, k], d, f, e))
    }
    n && n.pattern(m);
    return n
};
AmCharts.triangle = function (a, b, c, d, f, e, g, h) {
    if (void 0 === e || 0 === e) e = 1;
    void 0 === g && (g = "#000");
    void 0 === h && (h = 0);
    d = {
        fill: d,
        stroke: "#ef9c02",
        "fill-opacity": f,
        "stroke-width": e,
        "stroke-opacity": h
    };
    b /= 2;
    var k;
    0 === c && (k = " M" + -b + "," + b + " L0," + -b + " L" + b + "," + b + " Z");
    180 == c && (k = " M" + -b + "," + -b + " L0," + b + " L" + b + "," + -b + " Z");
    90 == c && (k = " M" + -b + "," + -b + " L" + b + ",0 L" + -b + "," + b + " Z");
    270 == c && (k = " M" + -b + ",0 L" + b + "," + b + " L" + b + "," + -b + " Z");
    return a.path(k).attr(d)
};
AmCharts.line = function (a, b, c, d, f, e, g, h, k, l, m) {
    if (a.handDrawn && !m) return AmCharts.handDrawnLine(a, b, c, d, f, e, g, h, k, l, m);
    e = {
        fill: "none",
        "stroke-width": e
    };
    void 0 !== g && 0 < g && (e["stroke-dasharray"] = g);
    isNaN(f) || (e["stroke-opacity"] = f);
    d && (e.stroke = "#ef9c02");
    d = Math.round;
    l && (d = AmCharts.doNothing);
    l = AmCharts.dx;
    f = AmCharts.dy;
    g = "M" + (d(b[0]) + l) + "," + (d(c[0]) + f);
    for (h = 1; h < b.length; h++) g += " L" + (d(b[h]) + l) + "," + (d(c[h]) + f);
    if (AmCharts.VML) return a.path(g, void 0, !0).attr(e);
    k && (g += " M0,0 L0,0");
    return a.path(g).attr(e)
};
AmCharts.makeHD = function (a, b, c) {
    for (var d = [], f = [], e = 1; e < a.length; e++)
        for (var g = Number(a[e - 1]), h = Number(b[e - 1]), k = Number(a[e]), l = Number(b[e]), m = Math.sqrt(Math.pow(k - g, 2) + Math.pow(l - h, 2)), m = Math.round(m / 50) + 1, k = (k - g) / m, l = (l - h) / m, n = 0; n <= m; n++) {
            var q = g + n * k + Math.random() * c,
                r = h + n * l + Math.random() * c;
            d.push(q);
            f.push(r)
        }
    return [d, f]
};
AmCharts.handDrawnLine = function (a, b, c, d, f, e, g, h, k, l, m) {
    var n = a.set();
    for (m = 1; m < b.length; m++)
        for (var q = [b[m - 1], b[m]], r = [c[m - 1], c[m]], r = AmCharts.makeHD(q, r, a.handDrawScatter), q = r[0], r = r[1], A = 1; A < q.length; A++) n.push(AmCharts.line(a, [q[A - 1], q[A]], [r[A - 1], r[A]], d, f, e + Math.random() * a.handDrawThickness - a.handDrawThickness / 2, g, h, k, l, !0));
    return n
};
AmCharts.doNothing = function (a) {
    return a
};
AmCharts.wedge = function (a, b, c, d, f, e, g, h, k, l, m, n) {
    var q = Math.round;
    e = q(e);
    g = q(g);
    h = q(h);
    var r = q(g / e * h),
        A = AmCharts.VML,
        z = 359.5 + e / 100;
    359.94 < z && (z = 359.94);
    f >= z && (f = z);
    var p = 1 / 180 * Math.PI,
        z = b + Math.sin(d * p) * h,
        s = c - Math.cos(d * p) * r,
        y = b + Math.sin(d * p) * e,
        t = c - Math.cos(d * p) * g,
        w = b + Math.sin((d + f) * p) * e,
        u = c - Math.cos((d + f) * p) * g,
        x = b + Math.sin((d + f) * p) * h,
        p = c - Math.cos((d + f) * p) * r,
        v = {
            fill: AmCharts.adjustLuminosity(l.fill, -0.2),
            "stroke-opacity": 0
        }, C = 0;
    180 < Math.abs(f) && (C = 1);
    d = a.set();
    var D;
    A && (z = q(10 * z), y = q(10 * y), w = q(10 *
        w), x = q(10 * x), s = q(10 * s), t = q(10 * t), u = q(10 * u), p = q(10 * p), b = q(10 * b), k = q(10 * k), c = q(10 * c), e *= 10, g *= 10, h *= 10, r *= 10, 1 > Math.abs(f) && 1 >= Math.abs(w - y) && 1 >= Math.abs(u - t) && (D = !0));
    f = "";
    var B;
    0 < k && (A ? (B = " M" + z + "," + (s + k) + " L" + y + "," + (t + k), D || (B += " A" + (b - e) + "," + (k + c - g) + "," + (b + e) + "," + (k + c + g) + "," + y + "," + (t + k) + "," + w + "," + (u + k)), B += " L" + x + "," + (p + k), 0 < h && (D || (B += " B" + (b - h) + "," + (k + c - r) + "," + (b + h) + "," + (k + c + r) + "," + x + "," + (k + p) + "," + z + "," + (k + s)))) : (B = " M" + z + "," + (s + k) + " L" + y + "," + (t + k) + (" A" + e + "," + g + ",0," + C + ",1," + w + "," + (u + k) + " L" +
        x + "," + (p + k)), 0 < h && (B += " A" + h + "," + r + ",0," + C + ",0," + z + "," + (s + k))), B += " Z", B = a.path(B, void 0, void 0, "1000,1000").attr(v), d.push(B), B = a.path(" M" + z + "," + s + " L" + z + "," + (s + k) + " L" + y + "," + (t + k) + " L" + y + "," + t + " L" + z + "," + s + " Z", void 0, void 0, "1000,1000").attr(v), k = a.path(" M" + w + "," + u + " L" + w + "," + (u + k) + " L" + x + "," + (p + k) + " L" + x + "," + p + " L" + w + "," + u + " Z", void 0, void 0, "1000,1000").attr(v), d.push(B), d.push(k));
    A ? (D || (f = " A" + q(b - e) + "," + q(c - g) + "," + q(b + e) + "," + q(c + g) + "," + q(y) + "," + q(t) + "," + q(w) + "," + q(u)), e = " M" + q(z) + "," + q(s) +
        " L" + q(y) + "," + q(t) + f + " L" + q(x) + "," + q(p)) : e = " M" + z + "," + s + " L" + y + "," + t + (" A" + e + "," + g + ",0," + C + ",1," + w + "," + u) + " L" + x + "," + p;
    0 < h && (A ? D || (e += " B" + (b - h) + "," + (c - r) + "," + (b + h) + "," + (c + r) + "," + x + "," + p + "," + z + "," + s) : e += " A" + h + "," + r + ",0," + C + ",0," + z + "," + s);
    a.handDrawn && (b = AmCharts.line(a, [z, y], [s, t], l.stroke, l.thickness * Math.random() * a.handDrawThickness, l["stroke-opacity"]), d.push(b));
    a = a.path(e + " Z", void 0, void 0, "1000,1000").attr(l);
    if (m) {
        b = [];
        for (c = 0; c < m.length; c++) b.push(AmCharts.adjustLuminosity(l.fill, m[c]));
        0 < b.length && a.gradient("linearGradient", b)
    }
    a.pattern(n);
    d.push(a);
    return d
};
AmCharts.adjustLuminosity = function (a, b) {
    a = String(a).replace(/[^0-9a-f]/gi, "");
    6 > a.length && (a = String(a[0]) + String(a[0]) + String(a[1]) + String(a[1]) + String(a[2]) + String(a[2]));
    b = b || 0;
    var c = "#",
        d, f;
    for (f = 0; 3 > f; f++) d = parseInt(a.substr(2 * f, 2), 16), d = Math.round(Math.min(Math.max(0, d + d * b), 255)).toString(16), c += ("00" + d).substr(d.length);
    return c
};
AmCharts.AmLegend = AmCharts.Class({
    construct: function () {
        this.createEvents("rollOverMarker", "rollOverItem", "rollOutMarker", "rollOutItem", "showItem", "hideItem", "clickMarker", "rollOverItem", "rollOutItem", "clickLabel");
        this.position = "bottom";
        this.borderColor = this.color = "#000000";
        this.borderAlpha = 0;
        this.markerLabelGap = 5;
        this.verticalGap = 10;
        this.align = "left";
        this.horizontalGap = 0;
        this.spacing = 10;
        this.markerDisabledColor = "#AAB3B3";
        this.markerType = "square";
        this.markerSize = 16;
        this.markerBorderThickness = this.markerBorderAlpha =
            1;
        this.marginBottom = this.marginTop = 0;
        this.marginLeft = this.marginRight = 20;
        this.autoMargins = !0;
        this.valueWidth = 50;
        this.switchable = !0;
        this.switchType = "x";
        this.switchColor = "#FFFFFF";
        this.rollOverColor = "#CC0000";
        this.reversedOrder = !1;
        this.labelText = "[[title]]";
        this.valueText = "[[value]]";
        this.useMarkerColorForLabels = !1;
        this.rollOverGraphAlpha = 1;
        this.textClickEnabled = !1;
        this.equalWidths = !0;
        this.dateFormat = "DD-MM-YYYY";
        this.backgroundColor = "#FFFFFF";
        this.backgroundAlpha = 0;
        this.useGraphSettings = !1;
        this.showEntries = !0
    },
    setData: function (a) {
        this.data = a;
        this.invalidateSize()
    },
    invalidateSize: function () {
        this.destroy();
        this.entries = [];
        this.valueLabels = [];
        AmCharts.ifArray(this.data) && this.drawLegend()
    },
    drawLegend: function () {
        var a = this.chart,
            b = this.position,
            c = this.width,
            d = a.divRealWidth,
            f = a.divRealHeight,
            e = this.div,
            g = this.data;
        isNaN(this.fontSize) && (this.fontSize = a.fontSize);
        if ("right" == b || "left" == b) this.maxColumns = 1, this.marginLeft = this.marginRight = 10;
        else if (this.autoMargins) {
            this.marginRight = a.marginRight;
            this.marginLeft =
                a.marginLeft;
            var h = a.autoMarginOffset;
            "bottom" == b ? (this.marginBottom = h, this.marginTop = 0) : (this.marginTop = h, this.marginBottom = 0)
        }
        c = void 0 !== c ? AmCharts.toCoordinate(c, d) : a.realWidth;
        "outside" == b ? (c = e.offsetWidth, f = e.offsetHeight, e.clientHeight && (c = e.clientWidth, f = e.clientHeight)) : (e.style.width = c + "px", e.className = "amChartsLegend");
        this.divWidth = c;
        this.container = new AmCharts.AmDraw(e, c, f, a);
        this.lx = 0;
        this.ly = 8;
        b = this.markerSize;
        b > this.fontSize && (this.ly = b / 2 - 1);
        0 < b && (this.lx += b + this.markerLabelGap);
        this.titleWidth =
            0;
        if (b = this.title) a = AmCharts.text(this.container, b, this.color, a.fontFamily, this.fontSize, "start", !0), a.translate(this.marginLeft, this.marginTop + this.verticalGap + this.ly + 1), a = a.getBBox(), this.titleWidth = a.width + 15, this.titleHeight = a.height + 6;
        this.index = this.maxLabelWidth = 0;
        if (this.showEntries) {
            for (a = 0; a < g.length; a++) this.createEntry(g[a]);
            for (a = this.index = 0; a < g.length; a++) this.createValue(g[a])
        }
        this.arrangeEntries();
        this.updateValues()
    },
    arrangeEntries: function () {
        var a = this.position,
            b = this.marginLeft +
                this.titleWidth,
            c = this.marginRight,
            d = this.marginTop,
            f = this.marginBottom,
            e = this.horizontalGap,
            g = this.div,
            h = this.divWidth,
            k = this.maxColumns,
            l = this.verticalGap,
            m = this.spacing,
            n = h - c - b,
            q = 0,
            r = 0,
            A = this.container,
            z = A.set();
        this.set = z;
        A = A.set();
        z.push(A);
        var p = this.entries,
            s, y;
        for (y = 0; y < p.length; y++) {
            s = p[y].getBBox();
            var t = s.width;
            t > q && (q = t);
            s = s.height;
            s > r && (r = s)
        }
        var w = t = 0,
            u = e;
        for (y = 0; y < p.length; y++) {
            var x = p[y];
            this.reversedOrder && (x = p[p.length - y - 1]);
            s = x.getBBox();
            var v;
            this.equalWidths ? v = e + w * (q + m + this.markerLabelGap) :
                (v = u, u = u + s.width + e + m);
            v + s.width > n && 0 < y && 0 !== w && (t++, w = 0, v = e, u = v + s.width + e + m);
            x.translate(v, (r + l) * t);
            w++;
            !isNaN(k) && w >= k && (w = 0, t++);
            A.push(x)
        }
        s = A.getBBox();
        k = s.height + 2 * l - 1;
        "left" == a || "right" == a ? (h = s.width + 2 * e, g.style.width = h + b + c + "px") : h = h - b - c - 1;
        c = AmCharts.polygon(this.container, [0, h, h, 0], [0, 0, k, k], this.backgroundColor, this.backgroundAlpha, 1, this.borderColor, this.borderAlpha);
        z.push(c);
        z.translate(b, d);
        c.toBack();
        b = e;
        if ("top" == a || "bottom" == a || "absolute" == a || "outside" == a) "center" == this.align ? b = e + (h -
            s.width) / 2 : "right" == this.align && (b = e + h - s.width);
        A.translate(b, l + 1);
        this.titleHeight > k && (k = this.titleHeight);
        a = k + d + f + 1;
        0 > a && (a = 0);
        g.style.height = Math.round(a) + "px"
    },
    createEntry: function (a) {
        if (!1 !== a.visibleInLegend) {
            var b = this.chart,
                c = a.markerType;
            c || (c = this.markerType);
            var d = a.color,
                f = a.alpha;
            a.legendKeyColor && (d = a.legendKeyColor());
            a.legendKeyAlpha && (f = a.legendKeyAlpha());
            var e;
            !0 === a.hidden && (e = d = this.markerDisabledColor);
            var g = a.pattern,
                h = a.customMarker;
            h || (h = this.customMarker);
            var k = this.container,
                l = this.markerSize,
                m = 0;
            if (this.useGraphSettings)
                if (c = a.type, "line" == c || "step" == c || "smoothedLine" == c || "ohlc" == c) this.switchType = void 0, g = k.set(), a.hidden || (d = a.lineColor, e = a.bulletBorderColor), m = AmCharts.line(k, [0, 2 * l], [l / 2, l / 2], d, a.lineAlpha, a.lineThickness, a.dashLength), g.push(m), a.bullet && (a.hidden || (d = a.bulletColor), m = AmCharts.bullet(k, a.bullet, a.bulletSize, d, a.bulletAlpha, a.bulletBorderThickness, e, a.bulletBorderAlpha)) && (m.translate(l + 1, l / 2), g.push(m)), m = l;
                else {
                    var n;
                    a.getGradRotation && (n = a.getGradRotation());
                    (g = this.createMarker("square", a.fillColors, a.fillAlphas, a.lineThickness, d, a.lineAlpha, n, g)) && g.translate(l / 2, l / 2)
                } else h ? (b.path && (h = b.path + h), g = k.image(h, 0, 0, l, l)) : (g = this.createMarker(c, d, f, void 0, void 0, void 0, void 0, g)) && g.translate(l / 2, l / 2);
            this.addListeners(g, a);
            k = k.set([g]);
            this.switchable && k.setAttr("cursor", "pointer");
            if (e = this.switchType) n = "x" == e ? this.createX() : this.createV(), n.dItem = a, !0 !== a.hidden ? "x" == e ? n.hide() : n.show() : "x" != e && n.hide(), this.switchable || n.hide(), this.addListeners(n,
                a), a.legendSwitch = n, k.push(n);
            e = this.color;
            a.showBalloon && this.textClickEnabled && void 0 !== this.selectedColor && (e = this.selectedColor);
            this.useMarkerColorForLabels && (e = d);
            !0 === a.hidden && (e = this.markerDisabledColor);
            d = AmCharts.massReplace(this.labelText, {
                "[[title]]": a.title
            });
            n = this.fontSize;
            g && l <= n && g.translate(l / 2, l / 2 + this.ly - n / 2 + (n + 2 - l) / 2);
            var q;
            d && (d = AmCharts.fixNewLines(d), a.legendTextReal = d, q = AmCharts.text(this.container, d, e, b.fontFamily, n, "start"), q.translate(this.lx + m, this.ly), k.push(q), b = q.getBBox().width,
                this.maxLabelWidth < b && (this.maxLabelWidth = b));
            this.entries[this.index] = k;
            a.legendEntry = this.entries[this.index];
            a.legendLabel = q;
            this.index++
        }
    },
    addListeners: function (a, b) {
        var c = this;
        a && a.mouseover(function () {
            c.rollOverMarker(b)
        }).mouseout(function () {
            c.rollOutMarker(b)
        }).click(function () {
            c.clickMarker(b)
        })
    },
    rollOverMarker: function (a) {
        this.switchable && this.dispatch("rollOverMarker", a);
        this.dispatch("rollOverItem", a)
    },
    rollOutMarker: function (a) {
        this.switchable && this.dispatch("rollOutMarker", a);
        this.dispatch("rollOutItem",
            a)
    },
    clickMarker: function (a) {
        this.switchable ? !0 === a.hidden ? this.dispatch("showItem", a) : this.dispatch("hideItem", a) : this.textClickEnabled && this.dispatch("clickMarker", a)
    },
    rollOverLabel: function (a) {
        a.hidden || (this.textClickEnabled && a.legendLabel && a.legendLabel.attr({
            fill: this.rollOverColor
        }), this.dispatch("rollOverItem", a))
    },
    rollOutLabel: function (a) {
        if (!a.hidden) {
            if (this.textClickEnabled && a.legendLabel) {
                var b = this.color;
                void 0 !== this.selectedColor && a.showBalloon && (b = this.selectedColor);
                this.useMarkerColorForLabels &&
                    (b = a.lineColor, void 0 === b && (b = a.color));
                a.legendLabel.attr({
                    fill: b
                })
            }
            this.dispatch("rollOutItem", a)
        }
    },
    clickLabel: function (a) {
        this.textClickEnabled ? a.hidden || this.dispatch("clickLabel", a) : this.switchable && (!0 === a.hidden ? this.dispatch("showItem", a) : this.dispatch("hideItem", a))
    },
    dispatch: function (a, b) {
        this.fire(a, {
            type: a,
            dataItem: b,
            target: this,
            chart: this.chart
        })
    },
    createValue: function (a) {
        var b = this,
            c = b.fontSize;
        if (!1 !== a.visibleInLegend) {
            var d = b.maxLabelWidth;
            b.equalWidths || (b.valueAlign = "left");
            "left" ==
                b.valueAlign && (d = a.legendEntry.getBBox().width);
            var f = d;
            if (b.valueText) {
                var e = b.color;
                b.useMarkerColorForValues && (e = a.color, a.legendKeyColor && (e = a.legendKeyColor()));
                !0 === a.hidden && (e = b.markerDisabledColor);
                var g = b.valueText,
                    d = d + b.lx + b.markerLabelGap + b.valueWidth,
                    h = "end";
                "left" == b.valueAlign && (d -= b.valueWidth, h = "start");
                e = AmCharts.text(b.container, g, e, b.chart.fontFamily, c, h);
                e.translate(d, b.ly);
                b.entries[b.index].push(e);
                f += b.valueWidth + 2 * b.markerLabelGap;
                e.dItem = a;
                b.valueLabels.push(e)
            }
            b.index++;
            e = b.markerSize;
            e < c + 7 && (e = c + 7, AmCharts.VML && (e += 3));
            c = b.container.rect(b.markerSize, 0, f, e, 0, 0).attr({
                stroke: "none",
                fill: "#ffffff",
                "fill-opacity": 0.005
            });
            c.dItem = a;
            b.entries[b.index - 1].push(c);
            c.mouseover(function () {
                b.rollOverLabel(a)
            }).mouseout(function () {
                b.rollOutLabel(a)
            }).click(function () {
                b.clickLabel(a)
            })
        }
    },
    createV: function () {
        var a = this.markerSize;
        return AmCharts.polygon(this.container, [a / 5, a / 2, a - a / 5, a / 2], [a / 3, a - a / 5, a / 5, a / 1.7], this.switchColor)
    },
    createX: function () {
        var a = this.markerSize - 3,
            b = {
                stroke: "#ef9c02",
                "stroke-width": 3
            }, c = this.container,
            d = AmCharts.line(c, [3, a], [3, a]).attr(b),
            a = AmCharts.line(c, [3, a], [a, 3]).attr(b);
        return this.container.set([d, a])
    },
    createMarker: function (a, b, c, d, f, e, g, h) {
        var k = this.markerSize,
            l = this.container;
        f || (f = this.markerBorderColor);
        f || (f = b);
        isNaN(d) && (d = this.markerBorderThickness);
        isNaN(e) && (e = this.markerBorderAlpha);
        return AmCharts.bullet(l, a, k, b, c, d, f, e, k, g, h)
    },
    validateNow: function () {
        this.invalidateSize()
    },
    updateValues: function () {
        var a = this.valueLabels,
            b = this.chart,
            c;
        for (c =
            0; c < a.length; c++) {
            var d = a[c],
                f = d.dItem,
                e = " ";
            if (void 0 !== f.type) {
                var g = f.currentDataItem,
                    h = this.periodValueText;
                f.legendPeriodValueText && (h = f.legendPeriodValueText);
                g ? (e = this.valueText, f.legendValueText && (e = f.legendValueText), e = b.formatString(e, g)) : h && (e = b.formatPeriodString(h, f))
            } else e = b.formatString(this.valueText, f);
            (g = f.legendLabel) && g.text(f.legendTextReal);
            d.text(e)
        }
    },
    renderFix: function () {
        if (!AmCharts.VML) {
            var a = this.container;
            a && a.renderFix()
        }
    },
    destroy: function () {
        this.div.innerHTML = "";
        AmCharts.remove(this.set)
    }
});
AmCharts.maps = {};
AmCharts.AmMap = AmCharts.Class({
    inherits: AmCharts.AmChart,
    construct: function () {
        this.version = "3.6.1";
        this.svgNotSupported = "This browser doesn't support SVG. Use Chrome, Firefox, Internet Explorer 9 or later.";
        this.createEvents("rollOverMapObject", "rollOutMapObject", "clickMapObject", "selectedObjectChanged", "homeButtonClicked", "zoomCompleted", "dragCompleted", "positionChanged", "writeDevInfo", "click");
        this.zoomDuration = 1;
        this.zoomControl = new AmCharts.ZoomControl;
        this.fitMapToContainer = !0;
        this.mouseWheelZoomEnabled =
            this.backgroundZoomsToTop = !1;
        this.allowClickOnSelectedObject = this.useHandCursorOnClickableOjects = this.showBalloonOnSelectedObject = !0;
        this.showObjectsAfterZoom = this.wheelBusy = !1;
        this.zoomOnDoubleClick = this.useObjectColorForBalloon = !0;
        this.allowMultipleDescriptionWindows = !1;
        this.dragMap = this.centerMap = this.linesAboveImages = !0;
        this.colorSteps = 5;
        this.showAreasInList = !0;
        this.showLinesInList = this.showImagesInList = !1;
        this.areasProcessor = new AmCharts.AreasProcessor(this);
        this.areasSettings = new AmCharts.AreasSettings;
        this.imagesProcessor = new AmCharts.ImagesProcessor(this);
        this.imagesSettings = new AmCharts.ImagesSettings;
        this.linesProcessor = new AmCharts.LinesProcessor(this);
        this.linesSettings = new AmCharts.LinesSettings;
        this.showDescriptionOnHover = !1;
        AmCharts.AmMap.base.construct.call(this);
        this.product = "ammap";
        this.areasClasses = {}
    },
    initChart: function () {
        this.zoomInstantly = !0;
        if (this.sizeChanged && AmCharts.hasSVG && this.chartCreated) {
            this.container.setSize(this.realWidth, this.realHeight);
            this.resizeMap();
            this.drawBackground();
            this.redrawLabels();
            this.drawTitles();
            this.processObjects();
            this.rescaleObjects();
            var a = this.container;
            this.zoomControl.init(this, a);
            this.drawBg();
            var b = this.smallMap;
            b && b.init(this, a);
            (b = this.valueLegend) && b.init(this, a);
            this.sizeChanged = !1;
            this.zoomToLongLat(this.zLevelTemp, this.zLongTemp, this.zLatTemp, !0);
            this.previousWidth = this.realWidth;
            this.previousHeight = this.realHeight;
            this.brrr();
            this.updateSmallMap();
            this.linkSet.toFront()
        } else (AmCharts.AmMap.base.initChart.call(this), AmCharts.hasSVG) ? (this.dataChanged &&
            (this.parseData(), this.dispatchDataUpdated = !0, this.dataChanged = !1, a = this.legend) && (a.position = "absolute", a.invalidateSize()), this.mouseWheelZoomEnabled && this.addMouseWheel(), this.createDescriptionsDiv(), this.svgAreas = [], this.svgAreasById = {}, this.drawChart()) : (document.createTextNode(this.svgNotSupported), this.chartDiv.style.textAlign = "", this.chartDiv.setAttribute("class", "ammapAlert"), this.chartDiv.innerHTML = this.svgNotSupported, clearInterval(this.interval))
    },
    invalidateSize: function () {
        var a = this.zoomLongitude();
        isNaN(a) || (this.zLongTemp = a);
        a = this.zoomLatitude();
        isNaN(a) || (this.zLatTemp = a);
        a = this.zoomLevel();
        isNaN(a) || (this.zLevelTemp = a);
        AmCharts.AmMap.base.invalidateSize.call(this)
    },
    handleWheelReal: function (a) {
        if (!this.wheelBusy) {
            this.stopAnimation();
            var b = this.zoomLevel(),
                c = this.zoomControl,
                d = c.zoomFactor;
            this.wheelBusy = !0;
            a = AmCharts.fitToBounds(0 < a ? b * d : b / d, c.minZoomLevel, c.maxZoomLevel);
            d = this.mouseX / this.mapWidth;
            c = this.mouseY / this.mapHeight;
            d = (this.zoomX() - d) * (a / b) + d;
            b = (this.zoomY() - c) * (a / b) + c;
            this.zoomTo(a,
                d, b)
        }
    },
    addLegend: function (a, b) {
        a.position = "absolute";
        a.autoMargins = !1;
        a.valueWidth = 0;
        a.switchable = !1;
        AmCharts.AmMap.base.addLegend.call(this, a, b)
    },
    handleLegendEvent: function () { },
    createDescriptionsDiv: function () {
        if (!this.descriptionsDiv) {
            var a = document.createElement("div");
            a.style.position = "absolute";
            a.style.left = AmCharts.findPosX(this.div) + "px";
            a.style.top = AmCharts.findPosY(this.div) + "px";
            this.descriptionsDiv = a
        }
        this.div.appendChild(this.descriptionsDiv)
    },
    drawChart: function () {
        AmCharts.AmMap.base.drawChart.call(this);
        var a = this.dataProvider;
        AmCharts.extend(a, new AmCharts.MapData);
        AmCharts.extend(this.areasSettings, new AmCharts.AreasSettings);
        AmCharts.extend(this.imagesSettings, new AmCharts.ImagesSettings);
        AmCharts.extend(this.linesSettings, new AmCharts.LinesSettings);
        this.mapContainer = this.container.set();
        this.graphsSet.push(this.mapContainer);
        var b = a.mapVar;
        b ? (this.svgData = b.svg, this.getBounds(), this.buildEverything()) : (a = a.mapURL) && this.loadXml(a);
        this.balloonsSet.toFront()
    },
    drawBg: function () {
        var a = this;
        AmCharts.remove(a.bgSet);
        var b = AmCharts.rect(a.container, a.realWidth, a.realHeight, "#000", 0.001);
        b.click(function () {
            a.handleBackgroundClick()
        });
        a.bgSet = b;
        a.set.push(b)
    },
    buildEverything: function () {
        var a = this;
        if (0 < a.realWidth && 0 < a.realHeight) {
            var b = a.container;
            a.zoomControl.init(this, b);
            a.drawBg();
            a.buildSVGMap();
            var c = a.smallMap;
            c && c.init(a, b);
            c = a.dataProvider;
            isNaN(c.zoomX) && isNaN(c.zoomY) && isNaN(c.zoomLatitude) && isNaN(c.zoomLongitude) && (a.centerMap ? (c.zoomLatitude = a.coordinateToLatitude(a.mapHeight / 2), c.zoomLongitude = a.coordinateToLongitude(a.mapWidth /
                2)) : (c.zoomX = 0, c.zoomY = 0), a.zoomInstantly = !0);
            a.selectObject(a.dataProvider);
            a.processAreas();
            (c = a.valueLegend) && c.init(a, b);
            if (b = a.objectList) a.clearObjectList(), b.init(a);
            clearInterval(a.mapInterval);
            a.mapInterval = setInterval(function () {
                a.update.call(a)
            }, AmCharts.updateRate);
            a.dispDUpd();
            a.linkSet.toFront();
            a.chartCreated = !0
        } else a.cleanChart()
    },
    hideGroup: function (a) {
        this.showHideGroup(a, !1)
    },
    showGroup: function (a) {
        this.showHideGroup(a, !0)
    },
    showHideGroup: function (a, b) {
        this.showHideReal(this.imagesProcessor.allObjects,
            a, b);
        this.showHideReal(this.areasProcessor.allObjects, a, b);
        this.showHideReal(this.linesProcessor.allObjects, a, b)
    },
    showHideReal: function (a, b, c) {
        var d;
        for (d = 0; d < a.length; d++) {
            var f = a[d];
            f.groupId == b && (c ? f.displayObject.show() : f.displayObject.hide())
        }
    },
    update: function () {
        this.zoomControl.update()
    },
    animateMap: function () {
        var a = this;
        a.totalFrames = 1E3 * a.zoomDuration / AmCharts.updateRate;
        a.totalFrames += 1;
        a.frame = 0;
        a.tweenPercent = 0;
        setTimeout(function () {
            a.updateSize.call(a)
        }, AmCharts.updateRate)
    },
    updateSize: function () {
        var a =
            this,
            b = a.totalFrames;
        a.frame <= b ? (a.frame++, b = AmCharts.easeOutSine(0, a.frame, 0, 1, b), 1 <= b ? (b = 1, a.wheelBusy = !1) : setTimeout(function () {
            a.updateSize.call(a)
        }, AmCharts.updateRate)) : (b = 1, a.wheelBusy = !1);
        a.tweenPercent = b;
        a.rescaleMapAndObjects()
    },
    rescaleMapAndObjects: function () {
        var a = this.initialScale,
            b = this.initialX,
            c = this.initialY,
            d = this.tweenPercent;
        this.mapContainer.translate(b + (this.finalX - b) * d, c + (this.finalY - c) * d, a + (this.finalScale - a) * d);
        this.rescaleObjects();
        this.positionChanged();
        this.updateSmallMap();
        1 == d && (a = {
            type: "zoomCompleted",
            chart: this
        }, this.fire(a.type, a))
    },
    updateSmallMap: function () {
        this.smallMap && this.smallMap.update()
    },
    rescaleObjects: function () {
        var a = this.mapContainer.scale,
            b = this.imagesProcessor.objectsToResize,
            c;
        for (c = 0; c < b.length; c++) {
            var d = b[c].image;
            d.translate(d.x, d.y, b[c].scale / a, !0)
        }
        b = this.linesProcessor;
        if (d = b.linesToResize)
            for (c = 0; c < d.length; c++) {
                var f = d[c];
                f.line.setAttr("stroke-width", f.thickness / a)
            }
        b = b.objectsToResize;
        for (c = 0; c < b.length; c++) d = b[c], d.translate(d.x, d.y, 1 / a)
    },
    handleTouchStart: function (a) {
        this.handleMouseMove(a);
        this.handleMouseDown(a)
    },
    handleTouchEnd: function (a) {
        this.previousDistance = NaN;
        this.handleReleaseOutside(a)
    },
    handleMouseDown: function (a) {
        AmCharts.resetMouseOver();
        this.mouseIsOver = !0;
        if (this.chartCreated && (this.dragMap && (this.stopAnimation(), this.isDragging = !0, this.mapContainerClickX = this.mapContainer.x, this.mapContainerClickY = this.mapContainer.y, this.panEventsEnabled || a && a.preventDefault && a.preventDefault()), a || (a = window.event), a.shiftKey && !0 ===
            this.developerMode && this.getDevInfo(), a && a.touches)) {
            var b = this.mouseX,
                c = this.mouseY,
                d = a.touches.item(1);
            d && (a = d.pageX - AmCharts.findPosX(this.div), d = d.pageY - AmCharts.findPosY(this.div), this.middleXP = (b + (a - b) / 2) / this.realWidth, this.middleYP = (c + (d - c) / 2) / this.realHeight)
        }
    },
    stopDrag: function () {
        this.isDragging && (this.isDragging = !1)
    },
    handleReleaseOutside: function () {
        this.stopDrag();
        this.zoomControl.draggerUp();
        this.mapWasDragged = !1;
        var a = this.mapContainer,
            b = this.mapContainerClickX,
            c = this.mapContainerClickY;
        isNaN(b) || isNaN(c) || !(2 < Math.abs(a.x - b) || Math.abs(a.y - c)) || (this.mapWasDragged = !0, a = {
            type: "dragCompleted",
            zoomX: this.zoomX(),
            zoomY: this.zoomY(),
            zoomLevel: this.zoomLevel(),
            chart: this
        }, this.fire(a.type, a));
        !this.mouseIsOver || this.mapWasDragged || this.skipClick || (a = {
            type: "click",
            x: this.mouseX,
            y: this.mouseY,
            chart: this
        }, this.fire(a.type, a), this.skipClick = !1);
        this.mapContainerClickY = this.mapContainerClickX = NaN;
        this.objectWasClicked = !1;
        this.zoomOnDoubleClick && this.mouseIsOver && (a = (new Date).getTime(), 200 >
            a - this.previousClickTime && 20 < a - this.previousClickTime && this.doDoubleClickZoom(), this.previousClickTime = a)
    },
    handleTouchMove: function (a) {
        this.handleMouseMove(a)
    },
    resetPinch: function () {
        this.mapWasPinched = !1
    },
    handleMouseMove: function (a) {
        var b = this;
        AmCharts.AmMap.base.handleMouseMove.call(b, a);
        var c = b.previuosMouseX,
            d = b.previuosMouseY,
            f = b.mouseX,
            e = b.mouseY;
        isNaN(c) && (c = f);
        isNaN(d) && (d = e);
        b.mouse2X = NaN;
        b.mouse2Y = NaN;
        if (a && a.touches) {
            var g = a.touches.item(1);
            g && (b.mouse2X = g.pageX - AmCharts.findPosX(b.div),
                b.mouse2Y = g.pageY - AmCharts.findPosY(b.div))
        }
        var g = b.mapContainer,
            h = b.mouse2X,
            k = b.mouse2Y;
        b.pinchTO && clearTimeout(b.pinchTO);
        b.pinchTO = setTimeout(function () {
            b.resetPinch.call(b)
        }, 1E3);
        if (!isNaN(h)) {
            b.stopDrag();
            a.preventDefault && a.preventDefault();
            var h = Math.sqrt(Math.pow(h - f, 2) + Math.pow(k - e, 2)),
                l = b.previousDistance,
                k = Math.max(b.realWidth, b.realHeight);
            5 > Math.abs(l - h) && (b.isDragging = !0);
            if (!isNaN(l)) {
                var m = 5 * Math.abs(l - h) / k,
                    k = g.scale,
                    k = l < h ? k + k * m : k - k * m,
                    l = b.zoomLevel(),
                    n = b.middleXP,
                    m = b.middleYP,
                    q = b.realHeight /
                        b.mapHeight,
                    r = b.realWidth / b.mapWidth,
                    n = (b.zoomX() - n * r) * (k / l) + n * r,
                    m = (b.zoomY() - m * q) * (k / l) + m * q;
                0.1 < Math.abs(k - l) && (b.zoomTo(k, n, m, !0), b.mapWasPinched = !0, clearTimeout(b.pinchTO))
            }
            b.previousDistance = h
        }
        b.isDragging && (b.hideBalloon(), b.positionChanged(), g.translate(g.x + (f - c), g.y + (e - d), g.scale), b.updateSmallMap(), a && a.preventDefault && a.preventDefault());
        b.previuosMouseX = f;
        b.previuosMouseY = e
    },
    selectObject: function (a) {
        var b = this;
        a || (a = b.dataProvider);
        var c = a.linkToObject;
        a.useTargetsZoomValues && c && (a.zoomX =
            c.zoomX, a.zoomY = c.zoomY, a.zoomLatitude = c.zoomLatitude, a.zoomLongitude = c.zoomLongitude, a.zoomLevel = c.zoomLevel);
        var d = b.selectedObject;
        d && b.returnInitialColor(d);
        b.selectedObject = a;
        var f = !1;
        "MapArea" == a.objectType && a.autoZoomReal && (f = !0);
        if (c && !f && ("string" == typeof c && (c = b.getObjectById(c)), isNaN(a.zoomLevel) && isNaN(a.zoomX) && isNaN(a.zoomY))) {
            if (b.extendMapData(c)) return;
            b.selectObject(c);
            return
        }
        b.allowMultipleDescriptionWindows || b.closeAllDescriptions();
        clearTimeout(b.selectedObjectTimeOut);
        clearTimeout(b.processObjectsTimeOut);
        c = b.zoomDuration;
        !f && isNaN(a.zoomLevel) && isNaN(a.zoomX) && isNaN(a.zoomY) ? (b.showDescriptionAndGetUrl(), b.processObjects()) : (b.selectedObjectTimeOut = setTimeout(function () {
            b.showDescriptionAndGetUrl.call(b)
        }, 1E3 * c + 200), b.showObjectsAfterZoom ? b.processObjectsTimeOut = setTimeout(function () {
            b.processObjects.call(b)
        }, 1E3 * c + 200) : b.processObjects());
        c = a.displayObject;
        f = b.areasSettings.selectedOutlineColor;
        if (c) {
            c.toFront();
            c.setAttr("stroke", "#ef9c02");
            var e = a.selectedColorReal;
            void 0 !== e && c.setAttr("fill",
                e);
            void 0 !== f && c.setAttr("stroke", f);
            if (e = a.imageLabel) {
                var g = a.selectedLabelColorReal;
                void 0 !== g && e.setAttr("fill", g)
            }
            a.selectable || (c.setAttr("cursor", "default"), e && e.setAttr("cursor", "default"))
        } else b.returnInitialColorReal(a); if (c = a.groupId)
            for (e = b.getGroupById(c), g = 0; g < e.length; g++) {
                var h = e[g];
                if (c = h.displayObject) {
                    var k = h.selectedColorReal;
                    void 0 !== f && c.setAttr("stroke", f);
                    void 0 !== k ? c.setAttr("fill", k) : b.returnInitialColor(h)
                }
            }
        b.zoomToSelectedObject();
        d != a && (a = {
            type: "selectedObjectChanged",
            chart: b
        }, b.fire(a.type, a))
    },
    returnInitialColor: function (a, b) {
        this.returnInitialColorReal(a);
        b && (a.isFirst = !1);
        var c = a.groupId;
        if (c) {
            var c = this.getGroupById(c),
                d;
            for (d = 0; d < c.length; d++) this.returnInitialColorReal(c[d]), b && (c[d].isFirst = !1)
        }
    },
    closeAllDescriptions: function () {
        this.descriptionsDiv.innerHTML = ""
    },
    returnInitialColorReal: function (a) {
        a.isOver = !1;
        var b = a.displayObject;
        if (b) {
            b.toPrevious();
            if ("MapImage" == a.objectType) {
                var c = a.tempScale;
                isNaN(c) || b.translate(b.x, b.y, c, !0);
                a.tempScale = NaN
            }
            c = a.colorReal;
            a.showAsSelected && (c = a.selectedColorReal);
            "bubble" == a.type && (c = void 0);
            void 0 !== c && b.setAttr("fill", c);
            var d = a.image;
            d && d.setAttr("fill", c);
            b.setAttr("stroke", "#645d5f");
            "MapArea" == a.objectType && b.setAttr("fill-opacity", a.alphaReal);
            (c = a.pattern) && b.pattern(c, this.mapScale);
            (b = a.imageLabel) && !a.labelInactive && b.setAttr("fill", a.labelColorReal)
        }
    },
    zoomToRectangle: function (a, b, c, d) {
        var f = this.realWidth,
            e = this.realHeight,
            g = this.mapSet.scale,
            h = this.zoomControl,
            f = AmCharts.fitToBounds(c / f > d / e ? 0.8 *
                f / (c * g) : 0.8 * e / (d * g), h.minZoomLevel, h.maxZoomLevel);
        this.zoomToMapXY(f, (a + c / 2) * g, (b + d / 2) * g)
    },
    zoomToLatLongRectangle: function (a, b, c, d) {
        var f = this.dataProvider,
            e = this.zoomControl,
            g = Math.abs(c - a),
            h = Math.abs(b - d),
            k = Math.abs(f.rightLongitude - f.leftLongitude),
            f = Math.abs(f.topLatitude - f.bottomLatitude),
            e = AmCharts.fitToBounds(g / k > h / f ? 0.8 * k / g : 0.8 * f / h, e.minZoomLevel, e.maxZoomLevel);
        this.zoomToLongLat(e, a + (c - a) / 2, d + (b - d) / 2)
    },
    getGroupById: function (a) {
        var b = [];
        this.getGroup(this.imagesProcessor.allObjects, a, b);
        this.getGroup(this.linesProcessor.allObjects, a, b);
        this.getGroup(this.areasProcessor.allObjects, a, b);
        return b
    },
    zoomToGroup: function (a) {
        a = "object" == typeof a ? a : this.getGroupById(a);
        var b, c, d, f, e;
        for (e = 0; e < a.length; e++) {
            var g = a[e].displayObject.getBBox(),
                h = g.y,
                k = g.y + g.height,
                l = g.x,
                g = g.x + g.width;
            if (h < b || isNaN(b)) b = h;
            if (k > f || isNaN(f)) f = k;
            if (l < c || isNaN(c)) c = l;
            if (g > d || isNaN(d)) d = g
        }
        a = this.mapSet.getBBox();
        c -= a.x;
        d -= a.x;
        f -= a.y;
        b -= a.y;
        this.zoomToRectangle(c, b, d - c, f - b)
    },
    getGroup: function (a, b, c) {
        if (a) {
            var d;
            for (d =
                0; d < a.length; d++) {
                var f = a[d];
                f.groupId == b && c.push(f)
            }
        }
    },
    zoomToStageXY: function (a, b, c, d) {
        if (!this.objectWasClicked) {
            var f = this.zoomControl;
            a = AmCharts.fitToBounds(a, f.minZoomLevel, f.maxZoomLevel);
            f = this.zoomLevel();
            c = this.coordinateToLatitude((c - this.mapContainer.y) / f);
            b = this.coordinateToLongitude((b - this.mapContainer.x) / f);
            this.zoomToLongLat(a, b, c, d)
        }
    },
    zoomToLongLat: function (a, b, c, d) {
        b = this.longitudeToCoordinate(b);
        c = this.latitudeToCoordinate(c);
        this.zoomToMapXY(a, b, c, d)
    },
    zoomToMapXY: function (a, b,
        c, d) {
        var f = this.mapWidth,
            e = this.mapHeight;
        this.zoomTo(a, -(b / f) * a + this.realWidth / f / 2, -(c / e) * a + this.realHeight / e / 2, d)
    },
    zoomToObject: function (a) {
        var b = a.zoomLatitude,
            c = a.zoomLongitude,
            d = a.zoomLevel,
            f = this.zoomInstantly,
            e = a.zoomX,
            g = a.zoomY,
            h = this.realWidth,
            k = this.realHeight;
        isNaN(d) || (isNaN(b) || isNaN(c) ? this.zoomTo(d, e, g, f) : this.zoomToLongLat(d, c, b, f));
        this.zoomInstantly = !1;
        "MapImage" == a.objectType && isNaN(a.zoomX) && isNaN(a.zoomY) && isNaN(a.zoomLatitude) && isNaN(a.zoomLongitude) && !isNaN(a.latitude) && !isNaN(a.longitude) &&
            this.zoomToLongLat(a.zoomLevel, a.longitude, a.latitude);
        "MapArea" == a.objectType && (e = a.displayObject.getBBox(), b = this.mapScale, c = e.x * b, d = e.y * b, f = e.width * b, e = e.height * b, h = a.autoZoomReal && isNaN(a.zoomLevel) ? f / h > e / k ? 0.8 * h / f : 0.8 * k / e : a.zoomLevel, k = this.zoomControl, h = AmCharts.fitToBounds(h, k.minZoomLevel, k.maxZoomLevel), isNaN(a.zoomX) && isNaN(a.zoomY) && isNaN(a.zoomLatitude) && isNaN(a.zoomLongitude) && (a = this.mapSet.getBBox(), this.zoomToMapXY(h, -a.x * b + c + f / 2, -a.y * b + d + e / 2)))
    },
    zoomToSelectedObject: function () {
        this.zoomToObject(this.selectedObject)
    },
    zoomTo: function (a, b, c, d) {
        var f = this.zoomControl;
        a = AmCharts.fitToBounds(a, f.minZoomLevel, f.maxZoomLevel);
        f = this.zoomLevel();
        isNaN(b) && (b = this.realWidth / this.mapWidth, b = (this.zoomX() - 0.5 * b) * (a / f) + 0.5 * b);
        isNaN(c) && (c = this.realHeight / this.mapHeight, c = (this.zoomY() - 0.5 * c) * (a / f) + 0.5 * c);
        this.stopAnimation();
        isNaN(a) || (f = this.mapContainer, this.initialX = f.x, this.initialY = f.y, this.initialScale = f.scale, this.finalX = this.mapWidth * b, this.finalY = this.mapHeight * c, this.finalScale = a, this.finalX != this.initialX || this.finalY !=
            this.initialY || this.finalScale != this.initialScale ? d ? (this.tweenPercent = 1, this.rescaleMapAndObjects(), this.wheelBusy = !1) : this.animateMap() : this.wheelBusy = !1)
    },
    loadXml: function (a) {
        var b;
        b = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
        b.overrideMimeType && b.overrideMimeType("text/xml");
        b.open("GET", a, !1);
        b.send();
        this.parseXMLObject(b.responseXML);
        this.svgData && this.buildEverything()
    },
    stopAnimation: function () {
        this.frame = this.totalFrames
    },
    processObjects: function () {
        var a =
            this.container,
            b = this.stageObjectsContainer;
        b && b.remove();
        this.stageObjectsContainer = b = a.set();
        this.trendLinesSet.push(b);
        var c = this.mapObjectsContainer;
        c && c.remove();
        this.mapObjectsContainer = c = a.set();
        this.mapContainer.push(c);
        c.toFront();
        b.toFront();
        if (a = this.selectedObject) this.imagesProcessor.reset(), this.linesProcessor.reset(), this.linesAboveImages ? (this.imagesProcessor.process(a), this.linesProcessor.process(a)) : (this.linesProcessor.process(a), this.imagesProcessor.process(a));
        this.rescaleObjects()
    },
    processAreas: function () {
        this.areasProcessor.process(this.dataProvider)
    },
    buildSVGMap: function () {
        var a = this.svgData.g.path,
            b = this.container,
            c = b.set();
        void 0 === a.length && (a = [a]);
        var d;
        for (d = 0; d < a.length; d++) {
            var f = a[d],
                e = f.title,
                g = b.path(f.d);
            g.id = f.id;
            this.svgAreasById[f.id] = {
                area: g,
                title: e,
                className: f["class"]
            };
            this.svgAreas.push(g);
            c.push(g)
        }
        this.mapSet = c;
        this.mapContainer.push(c);
        this.resizeMap()
    },
    addObjectEventListeners: function (a, b) {
        var c = this;
        a.mouseup(function (a) {
            c.clickMapObject(b, a)
        }).mouseover(function (a) {
            c.rollOverMapObject(b, !0, a)
        }).mouseout(function (a) {
            c.rollOutMapObject(b, a)
        }).touchend(function (a) {
            c.clickMapObject(b, a)
        }).touchstart(function (a) {
            c.rollOverMapObject(b, !0, a)
        })
    },
    checkIfSelected: function (a) {
        var b = this.selectedObject;
        if (b == a) return !0;
        if (b = b.groupId) {
            var b = this.getGroupById(b),
                c;
            for (c = 0; c < b.length; c++)
                if (b[c] == a) return !0
        }
        return !1
    },
    clearMap: function () {
        this.chartDiv.innerHTML = "";
        this.clearObjectList()
    },
    clearObjectList: function () {
        var a = this.objectList;
        a && (a.div.innerHTML = "")
    },
    checkIfLast: function (a) {
        if (a) {
            var b =
                a.parentNode;
            if (b && b.lastChild == a) return !0
        }
        return !1
    },
    showAsRolledOver: function (a) {
        var b = a.displayObject;
        if (!a.showAsSelected && b && !a.isOver) {
            b.node.onmouseout = function () { };
            b.node.onmouseover = function () { };
            b.node.onclick = function () { };
            a.isFirst || (b.toFront(), a.isFirst = !0);
            var c = a.rollOverColorReal,
                d;
            void 0 != c && ("MapImage" == a.objectType ? (d = a.image) && d.setAttr("fill", c) : b.setAttr("fill", c));
            (d = a.imageLabel) && !a.labelInactive && (c = a.labelRollOverColorReal, void 0 != c && d.setAttr("fill", c));
            c = a.rollOverOutlineColorReal;
            void 0 != c && ("MapImage" == a.objectType ? (d = a.image) && d.setAttr("stroke", "#ffffff") : b.setAttr("stroke", "#ffffff"));
            "MapArea" == a.objectType && (d = a.rollOverAlphaReal, isNaN(d) || b.setAttr("fill-opacity", d), (d = this.areasSettings.rollOverPattern) && b.pattern(d, this.mapScale));
            "MapImage" == a.objectType && (d = a.rollOverScaleReal, isNaN(d) || 1 == d || (a.tempScale = b.scale, b.translate(b.x, b.y, b.scale * d, !0)));
            this.useHandCursorOnClickableOjects && this.checkIfClickable(a) && b.setAttr("cursor", "pointer");
            this.addObjectEventListeners(b, a);
            a.isOver = !0
        }
    },
    rollOverMapObject: function (a, b, c) {
        if (this.chartCreated) {
            this.handleMouseMove();
            var d = this.previouslyHovered;
            d && d != a ? (!1 === this.checkIfSelected(d) && (this.returnInitialColor(d, !0), this.previouslyHovered = null), this.hideBalloon()) : clearTimeout(this.hoverInt);
            if (!1 === this.checkIfSelected(a)) {
                if (d = a.groupId) {
                    var d = this.getGroupById(d),
                        f;
                    for (f = 0; f < d.length; f++) d[f] != a && this.showAsRolledOver(d[f])
                }
                this.showAsRolledOver(a)
            } else (d = a.displayObject) && d.setAttr("cursor", "default"); if (this.showDescriptionOnHover) this.showDescription(a);
            else if ((this.showBalloonOnSelectedObject || !this.checkIfSelected(a)) && !1 !== b && (f = this.balloon, b = a.colorReal, d = "", void 0 !== b && this.useObjectColorForBalloon || (b = f.fillColor), (f = a.balloonTextReal) && (d = this.formatString(f, a)), this.balloonLabelFunction && (d = this.balloonLabelFunction(a, this)), d && "" !== d)) {
                var e, g;
                "MapArea" == a.objectType && (g = this.getAreaCenterLatitude(a), e = this.getAreaCenterLongitude(a), g = this.latitudeToY(g), e = this.longitudeToX(e));
                this.showBalloon(d, b, this.mouseIsOver, e, g)
            }
            c = {
                type: "rollOverMapObject",
                mapObject: a,
                chart: this,
                event: c
            };
            this.fire(c.type, c);
            this.previouslyHovered = a
        }
    },
    longitudeToX: function (a) {
        return this.longitudeToCoordinate(a) * this.zoomLevel() + this.mapContainer.x
    },
    latitudeToY: function (a) {
        return this.latitudeToCoordinate(a) * this.zoomLevel() + this.mapContainer.y
    },
    rollOutMapObject: function (a, b) {
        this.hideBalloon();
        if (this.chartCreated && a.isOver) {
            this.checkIfSelected(a) || this.returnInitialColor(a);
            var c = {
                type: "rollOutMapObject",
                mapObject: a,
                chart: this,
                event: b
            };
            this.fire(c.type, c)
        }
    },
    formatString: function (a,
        b) {
        var c = this.numberFormatter,
            d = this.percentFormatter,
            f = b.title;
        void 0 == f && (f = "");
        var e = b.value,
            e = isNaN(e) ? "" : AmCharts.formatNumber(e, c),
            c = b.percents,
            c = isNaN(c) ? "" : AmCharts.formatNumber(c, d),
            d = b.description;
        void 0 == d && (d = "");
        var g = b.customData;
        void 0 == g && (g = "");
        return a = AmCharts.massReplace(a, {
            "[[title]]": f,
            "[[value]]": e,
            "[[percent]]": c,
            "[[description]]": d,
            "[[customData]]": g
        })
    },
    clickMapObject: function (a, b) {
        this.hideBalloon();
        if (this.chartCreated && !this.mapWasDragged && this.checkIfClickable(a) && !this.mapWasPinched) {
            this.selectObject(a);
            var c = {
                type: "clickMapObject",
                mapObject: a,
                chart: this,
                event: b
            };
            this.fire(c.type, c);
            this.objectWasClicked = !0
        }
    },
    checkIfClickable: function (a) {
        var b = this.allowClickOnSelectedObject;
        return this.selectedObject == a && b ? !0 : this.selectedObject != a || b ? !0 === a.selectable || "MapArea" == a.objectType && a.autoZoomReal || a.url || a.linkToObject || 0 < a.images.length || 0 < a.lines.length || !isNaN(a.zoomLevel) || !isNaN(a.zoomX) || !isNaN(a.zoomY) || a.description ? !0 : !1 : !1
    },
    handleResize: function () {
        (AmCharts.isPercents(this.width) || AmCharts.isPercents(this.height)) &&
            this.invalidateSize();
        this.renderFix()
    },
    resizeMap: function () {
        var a = this.mapSet;
        if (a)
            if (this.fitMapToContainer) {
                var b = a.getBBox(),
                    c = this.realWidth,
                    d = this.realHeight,
                    f = b.width,
                    e = b.height,
                    c = f / c > e / d ? c / f : d / e;
                a.translate(-b.x * c, -b.y * c, c);
                this.mapScale = c;
                this.mapHeight = e * c;
                this.mapWidth = f * c
            } else b = group.transform.match(/([\-]?[\d.]+)/g), a.translate(b[0], b[1], b[2])
    },
    zoomIn: function () {
        this.skipClick = !0;
        var a = this.zoomLevel() * this.zoomControl.zoomFactor;
        this.zoomTo(a)
    },
    zoomOut: function () {
        this.skipClick = !0;
        var a = this.zoomLevel() / this.zoomControl.zoomFactor;
        this.zoomTo(a)
    },
    moveLeft: function () {
        this.skipClick = !0;
        var a = this.zoomX() + this.zoomControl.panStepSize;
        this.zoomTo(this.zoomLevel(), a, this.zoomY())
    },
    moveRight: function () {
        this.skipClick = !0;
        var a = this.zoomX() - this.zoomControl.panStepSize;
        this.zoomTo(this.zoomLevel(), a, this.zoomY())
    },
    moveUp: function () {
        this.skipClick = !0;
        var a = this.zoomY() + this.zoomControl.panStepSize;
        this.zoomTo(this.zoomLevel(), this.zoomX(), a)
    },
    moveDown: function () {
        this.skipClick = !0;
        var a =
            this.zoomY() - this.zoomControl.panStepSize;
        this.zoomTo(this.zoomLevel(), this.zoomX(), a)
    },
    zoomX: function () {
        return this.mapSet ? Math.round(1E4 * this.mapContainer.x / this.mapWidth) / 1E4 : NaN
    },
    zoomY: function () {
        return this.mapSet ? Math.round(1E4 * this.mapContainer.y / this.mapHeight) / 1E4 : NaN
    },
    goHome: function () {
        this.selectObject(this.dataProvider);
        var a = {
            type: "homeButtonClicked",
            chart: this
        };
        this.fire(a.type, a)
    },
    zoomLevel: function () {
        return Math.round(1E5 * this.mapContainer.scale) / 1E5
    },
    showDescriptionAndGetUrl: function () {
        var a =
            this.selectedObject;
        if (a) {
            this.showDescription();
            var b = a.url;
            if (b) AmCharts.getURL(b, a.urlTarget);
            else if (b = a.linkToObject) {
                if ("string" == typeof b) {
                    var c = this.getObjectById(b);
                    if (c) {
                        this.selectObject(c);
                        return
                    }
                }
                b && a.passZoomValuesToTarget && (b.zoomLatitude = this.zoomLatitude(), b.zoomLongitude = this.zoomLongitude(), b.zoomLevel = this.zoomLevel());
                this.extendMapData(b) || this.selectObject(b)
            }
        }
    },
    extendMapData: function (a) {
        var b = a.objectType;
        if ("MapImage" != b && "MapArea" != b && "MapLine" != b) return AmCharts.extend(a,
            new AmCharts.MapData), this.dataProvider = a, this.zoomInstantly = !0, this.validateData(), !0
    },
    showDescription: function (a) {
        a || (a = this.selectedObject);
        this.allowMultipleDescriptionWindows || this.closeAllDescriptions();
        if (a.description) {
            var b = a.descriptionWindow;
            b && b.close();
            b = new AmCharts.DescriptionWindow;
            a.descriptionWindow = b;
            var c = a.descriptionWindowWidth,
                d = a.descriptionWindowHeight,
                f = a.descriptionWindowX,
                e = a.descriptionWindowY;
            isNaN(f) && (f = this.mouseX, f = f > this.realWidth / 2 ? f - c - 20 : f + 20);
            isNaN(e) && (e = this.mouseY);
            b.maxHeight = d;
            b.show(this, this.descriptionsDiv, a.description, a.title);
            a = b.div.style;
            a.width = c + "px";
            a.maxHeight = d + "px";
            a.left = f + "px";
            a.top = e + "px"
        }
    },
    parseXMLObject: function (a) {
        var b = {
            root: {}
        };
        this.parseXMLNode(b, "root", a);
        this.svgData = b.root.svg;
        this.getBounds()
    },
    getBounds: function () {
        var a = this.dataProvider;
        try {
            var b = this.svgData.defs["amcharts:ammap"];
            a.leftLongitude = Number(b.leftLongitude);
            a.rightLongitude = Number(b.rightLongitude);
            a.topLatitude = Number(b.topLatitude);
            a.bottomLatitude = Number(b.bottomLatitude);
            a.projection = b.projection
        } catch (c) { }
    },
    latitudeToCoordinate: function (a) {
        var b, c = this.dataProvider;
        if (this.mapSet) {
            b = c.topLatitude;
            var d = c.bottomLatitude;
            "mercator" == c.projection && (a = this.mercatorLatitudeToCoordinate(a), b = this.mercatorLatitudeToCoordinate(b), d = this.mercatorLatitudeToCoordinate(d));
            b = (a - b) / (d - b) * this.mapHeight
        }
        return b
    },
    longitudeToCoordinate: function (a) {
        var b, c = this.dataProvider;
        this.mapSet && (b = c.leftLongitude, b = (a - b) / (c.rightLongitude - b) * this.mapWidth);
        return b
    },
    mercatorLatitudeToCoordinate: function (a) {
        89.5 <
            a && (a = 89.5); -89.5 > a && (a = -89.5);
        a = AmCharts.degreesToRadians(a);
        a = 0.5 * Math.log((1 + Math.sin(a)) / (1 - Math.sin(a)));
        return AmCharts.radiansToDegrees(a / 2)
    },
    zoomLatitude: function () {
        return this.coordinateToLatitude((-this.mapContainer.y + this.previousHeight / 2) / this.zoomLevel())
    },
    zoomLongitude: function () {
        return this.coordinateToLongitude((-this.mapContainer.x + this.previousWidth / 2) / this.zoomLevel())
    },
    getAreaCenterLatitude: function (a) {
        a = a.displayObject.getBBox();
        var b = this.mapScale;
        a = -this.mapSet.getBBox().y *
            b + (a.y + a.height / 2) * b;
        return this.coordinateToLatitude(a)
    },
    getAreaCenterLongitude: function (a) {
        a = a.displayObject.getBBox();
        var b = this.mapScale;
        a = -this.mapSet.getBBox().x * b + (a.x + a.width / 2) * b;
        return this.coordinateToLongitude(a)
    },
    coordinateToLatitude: function (a) {
        var b;
        if (this.mapSet) {
            var c = this.dataProvider,
                d = c.bottomLatitude,
                f = c.topLatitude;
            b = this.mapHeight;
            "mercator" == c.projection ? (c = this.mercatorLatitudeToCoordinate(d), f = this.mercatorLatitudeToCoordinate(f), a = 2 * Math.atan(Math.exp(2 * (a * (c - f) / b + f) * Math.PI /
                180)) - 0.5 * Math.PI, b = AmCharts.radiansToDegrees(a)) : b = a / b * (d - f) + f
        }
        return Math.round(1E6 * b) / 1E6
    },
    coordinateToLongitude: function (a) {
        var b, c = this.dataProvider;
        this.mapSet && (b = a / this.mapWidth * (c.rightLongitude - c.leftLongitude) + c.leftLongitude);
        return Math.round(1E6 * b) / 1E6
    },
    milesToPixels: function (a) {
        var b = this.dataProvider;
        return a * (this.mapWidth / (b.rightLongitude - b.leftLongitude)) / 69.172
    },
    kilometersToPixels: function (a) {
        var b = this.dataProvider;
        return a * (this.mapWidth / (b.rightLongitude - b.leftLongitude)) /
            111.325
    },
    handleBackgroundClick: function (a) {
        if (this.backgroundZoomsToTop && !this.mapWasDragged) {
            var b = this.dataProvider;
            if (this.checkIfClickable(b)) this.clickMapObject(b);
            else {
                a = b.zoomX;
                var c = b.zoomY,
                    d = b.zoomLongitude,
                    f = b.zoomLatitude,
                    b = b.zoomLevel;
                isNaN(a) || isNaN(c) || this.zoomTo(b, a, c);
                isNaN(d) || isNaN(f) || this.zoomToLongLat(b, d, f, !0)
            }
        }
    },
    parseXMLNode: function (a, b, c, d) {
        void 0 === d && (d = "");
        var f, e, g;
        if (c) {
            var h = c.childNodes.length;
            for (f = 0; f < h; f++) {
                e = c.childNodes[f];
                var k = e.nodeName,
                    l = e.nodeValue ? this.trim(e.nodeValue) :
                        "",
                    m = !1;
                e.attributes && 0 < e.attributes.length && (m = !0);
                if (0 !== e.childNodes.length || "" !== l || !1 !== m)
                    if (3 == e.nodeType || 4 == e.nodeType) {
                        if ("" !== l) {
                            e = 0;
                            for (g in a[b]) a[b].hasOwnProperty(g) && e++;
                            e ? a[b]["#text"] = l : a[b] = l
                        }
                    } else if (1 == e.nodeType) {
                        var n;
                        void 0 !== a[b][k] ? void 0 === a[b][k].length ? (n = a[b][k], a[b][k] = [], a[b][k].push(n), a[b][k].push({}), n = a[b][k][1]) : "object" == typeof a[b][k] && (a[b][k].push({}), n = a[b][k][a[b][k].length - 1]) : (a[b][k] = {}, n = a[b][k]);
                        if (e.attributes && e.attributes.length)
                            for (l = 0; l < e.attributes.length; l++) n[e.attributes[l].name] =
                                e.attributes[l].value;
                        void 0 !== a[b][k].length ? this.parseXMLNode(a[b][k], a[b][k].length - 1, e, d + "  ") : this.parseXMLNode(a[b], k, e, d + "  ")
                    }
            }
            e = 0;
            c = "";
            for (g in a[b]) "#text" == g ? c = a[b][g] : e++;
            0 === e && void 0 === a[b].length && (a[b] = c)
        }
    },
    doDoubleClickZoom: function () {
        if (!this.mapWasDragged) {
            var a = this.zoomLevel() * this.zoomControl.zoomFactor;
            this.zoomToStageXY(a, this.mouseX, this.mouseY)
        }
    },
    getDevInfo: function () {
        var a = this.zoomLevel(),
            a = {
                chart: this,
                type: "writeDevInfo",
                zoomLevel: a,
                zoomX: this.zoomX(),
                zoomY: this.zoomY(),
                zoomLatitude: this.zoomLatitude(),
                zoomLongitude: this.zoomLongitude(),
                latitude: this.coordinateToLatitude((this.mouseY - this.mapContainer.y) / a),
                longitude: this.coordinateToLongitude((this.mouseX - this.mapContainer.x) / a),
                left: this.mouseX,
                top: this.mouseY,
                right: this.realWidth - this.mouseX,
                bottom: this.realHeight - this.mouseY,
                percentLeft: Math.round(100 * (this.mouseX / this.realWidth)) + "%",
                percentTop: Math.round(100 * (this.mouseY / this.realHeight)) + "%",
                percentRight: Math.round(100 * ((this.realWidth - this.mouseX) / this.realWidth)) +
                    "%",
                percentBottom: Math.round(100 * ((this.realHeight - this.mouseY) / this.realHeight)) + "%"
            }, b = "zoomLevel:" + a.zoomLevel + ", zoomLongitude:" + a.zoomLongitude + ", zoomLatitude:" + a.zoomLatitude + "\n",
            b = b + ("zoomX:" + a.zoomX + ", zoomY:" + a.zoomY + "\n"),
            b = b + ("latitude:" + a.latitude + ", longitude:" + a.longitude + "\n"),
            b = b + ("left:" + a.left + ", top:" + a.top + "\n"),
            b = b + ("right:" + a.right + ", bottom:" + a.bottom + "\n"),
            b = b + ('left:"' + a.percentLeft + '", top:"' + a.percentTop + '"\n'),
            b = b + ('right:"' + a.percentRight + '", bottom:"' + a.percentBottom +
                '"\n');
        a.str = b;
        this.fire(a.type, a);
        return a
    },
    getXY: function (a, b, c) {
        void 0 !== a && (-1 != String(a).indexOf("%") ? (a = Number(a.split("%").join("")), c && (a = 100 - a), a = Number(a) * b / 100) : c && (a = b - a));
        return a
    },
    getObjectById: function (a) {
        var b = this.dataProvider;
        if (b.areas) {
            var c = this.getObject(a, b.areas);
            if (c) return c
        }
        if (c = this.getObject(a, b.images)) return c;
        if (a = this.getObject(a, b.lines)) return a
    },
    getObject: function (a, b) {
        if (b) {
            var c;
            for (c = 0; c < b.length; c++) {
                var d = b[c];
                if (d.id == a) return d;
                if (d.areas) {
                    var f = this.getObject(a,
                        d.areas);
                    if (f) return f
                }
                if (f = this.getObject(a, d.images)) return f;
                if (d = this.getObject(a, d.lines)) return d
            }
        }
    },
    parseData: function () {
        var a = this.dataProvider;
        this.processObject(a.areas, a, "area");
        this.processObject(a.images, a, "image");
        this.processObject(a.lines, a, "line")
    },
    processObject: function (a, b, c) {
        if (a) {
            var d;
            for (d = 0; d < a.length; d++) {
                var f = a[d];
                f.parentObject = b;
                "area" == c && AmCharts.extend(f, new AmCharts.MapArea);
                "image" == c && AmCharts.extend(f, new AmCharts.MapImage);
                "line" == c && AmCharts.extend(f, new AmCharts.MapLine);
                f.areas && this.processObject(f.areas, f, "area");
                f.images && this.processObject(f.images, f, "image");
                f.lines && this.processObject(f.lines, f, "line")
            }
        }
    },
    positionChanged: function () {
        var a = {
            type: "positionChanged",
            zoomX: this.zoomX(),
            zoomY: this.zoomY(),
            zoomLevel: this.zoomLevel(),
            chart: this
        };
        this.fire(a.type, a)
    },
    getX: function (a, b) {
        return this.getXY(a, this.realWidth, b)
    },
    getY: function (a, b) {
        return this.getXY(a, this.realHeight, b)
    },
    trim: function (a) {
        if (a) {
            var b;
            for (b = 0; b < a.length; b++)
                if (-1 === " \n\r\t\f\x0B\u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000".indexOf(a.charAt(b))) {
                    a =
                        a.substring(b);
                    break
                }
            for (b = a.length - 1; 0 <= b; b--)
                if (-1 === " \n\r\t\f\x0B\u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000".indexOf(a.charAt(b))) {
                    a = a.substring(0, b + 1);
                    break
                }
            return -1 === " \n\r\t\f\x0B\u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000".indexOf(a.charAt(0)) ? a : ""
        }
    },
    brrr: function () {
        var a = "",
            c = window.location.hostname.split("."),
            d;
        2 <= c.length && (d = c[c.length - 2] + "." + c[c.length - 1]);
        AmCharts.remove(this.bbset);
        if (d != b) {
            var b = b + "/?utm_source=swf&utm_medium=demo&utm_campaign=jsDemo" + a,
                f = "chart by ",
                c = 145;
            "ammap" == a && (f = "tool by ", c = 125);
            d = AmCharts.rect(this.container, c, 20, "#FFFFFF", 1);
            f = AmCharts.text(this.container, f + a + ".com", "#000000", "Verdana", 11, "start");
            f.translate(7, 9);
            d = this.container.set([d, f]);
            "ammap" == a && d.translate(this.realWidth - c, 0);
            this.bbset = d;
            this.linkSet.push(d);
            d.setAttr("cursor", "pointer");
            d.click(function () {
                window.location.href = "http://" + b
            });
            for (a = 0; a < d.length; a++) d[a].attr({
                cursor: "pointer"
            })
        }
    }
});
AmCharts.ZoomControl = AmCharts.Class({
    construct: function () {
        this.panStepSize = 0.1;
        this.zoomFactor = 2;
        this.maxZoomLevel = 64;
        this.minZoomLevel = 1;
        this.zoomControlEnabled = this.panControlEnabled = !0;
        this.buttonRollOverColor = "#CC0000";
        this.buttonFillColor = "#990000";
        this.buttonFillAlpha = 1;
        this.buttonBorderColor = "#FFFFFF";
        this.buttonBorderThickness = this.buttonBorderAlpha = 1;
        this.buttonIconColor = "#FFFFFF";
        this.buttonColorHover = "#FF0000";
        this.gridColor = this.homeIconColor = "#FFFFFF";
        this.gridBackgroundColor = "#000000";
        this.gridBackgroundAlpha = 0.15;
        this.gridAlpha = 1;
        this.buttonSize = 18;
        this.iconSize = 11;
        this.buttonCornerRadius = 0;
        this.gridHeight = 150;
        this.top = this.left = 10
    },
    init: function (a, b) {
        var c = this;
        c.chart = a;
        AmCharts.remove(c.set);
        var d = b.set();
        d.translate(a.getX(c.left), a.getY(c.top));
        var f = c.buttonSize,
            e = c.buttonFillColor,
            g = c.buttonFillAlpha,
            h = c.buttonBorderThickness,
            k = c.buttonBorderColor,
            l = c.buttonBorderAlpha,
            m = c.buttonCornerRadius,
            n = c.buttonRollOverColor,
            q = c.gridHeight,
            r = c.zoomFactor,
            A = c.minZoomLevel,
            z = c.maxZoomLevel;
        c.previousDY = NaN;
        var p;
        if (c.zoomControlEnabled) {
            p = b.set();
            d.push(p);
            c.set = d;
            c.zoomSet = p;
            var s = AmCharts.rect(b, f + 6, q + 2 * f + 6, c.gridBackgroundColor, c.gridBackgroundAlpha, 0, 0, 0, 4);
            s.translate(-3, -3);
            s.mouseup(function () {
                c.handleBgUp()
            });
            p.push(s);
            s = new AmCharts.SimpleButton;
            s.setIcon(a.pathToImages + "plus.gif", c.iconSize);
            s.setClickHandler(a.zoomIn, a);
            s.init(b, f, f, e, g, h, k, l, m, n);
            p.push(s.set);
            s = new AmCharts.SimpleButton;
            s.setIcon(a.pathToImages + "minus.gif", c.iconSize);
            s.setClickHandler(a.zoomOut, a);
            s.init(b,
                f, f, e, g, h, k, l, m, n);
            s.set.translate(0, q + f);
            p.push(s.set);
            var y = Math.log(z / A) / Math.log(r) + 1,
                s = q / y,
                t;
            for (t = 1; t < y; t++) {
                var w = f + t * s,
                    w = AmCharts.line(b, [1, f - 2], [w, w], c.gridColor, c.gridAlpha, 1);
                p.push(w)
            }
            y = new AmCharts.SimpleButton;
            y.setDownHandler(c.draggerDown, c);
            y.setClickHandler(c.draggerUp, c);
            y.init(b, f, s, e, g, h, k, l, m, n);
            p.push(y.set);
            c.dragger = y.set;
            c.previousY = NaN;
            q -= s;
            A = Math.log(A / 100) / Math.log(r);
            r = Math.log(z / 100) / Math.log(r);
            c.realStepSize = q / (r - A);
            c.realGridHeight = q;
            c.stepMax = r
        }
        c.panControlEnabled &&
            (r = b.set(), d.push(r), p && p.translate(f, 4 * f), p = new AmCharts.SimpleButton, p.setIcon(a.pathToImages + "panLeft.gif", c.iconSize), p.setClickHandler(a.moveLeft, a), p.init(b, f, f, e, g, h, k, l, m, n), p.set.translate(0, f), r.push(p.set), p = new AmCharts.SimpleButton, p.setIcon(a.pathToImages + "panRight.gif", c.iconSize), p.setClickHandler(a.moveRight, a), p.init(b, f, f, e, g, h, k, l, m, n), p.set.translate(2 * f, f), r.push(p.set), p = new AmCharts.SimpleButton, p.setIcon(a.pathToImages + "panUp.gif", c.iconSize), p.setClickHandler(a.moveUp, a),
            p.init(b, f, f, e, g, h, k, l, m, n), p.set.translate(f, 0), r.push(p.set), p = new AmCharts.SimpleButton, p.setIcon(a.pathToImages + "panDown.gif", c.iconSize), p.setClickHandler(a.moveDown, a), p.init(b, f, f, e, g, h, k, l, m, n), p.set.translate(f, 2 * f), r.push(p.set), g = new AmCharts.SimpleButton, g.setIcon(a.pathToImages + "homeIcon.gif", c.iconSize), g.setClickHandler(a.goHome, a), g.init(b, f, f, e, 0, 0, k, 0, m, n), g.set.translate(f, f), r.push(g.set), d.push(r))
    },
    draggerDown: function () {
        this.chart.stopDrag();
        this.isDragging = !0
    },
    draggerUp: function () {
        this.isDragging = !1
    },
    handleBgUp: function () {
        var a = this.chart,
            b = 100 * Math.pow(this.zoomFactor, this.stepMax - (a.mouseY - this.zoomSet.y - this.set.y - this.buttonSize - this.realStepSize / 2) / this.realStepSize);
        a.zoomTo(b)
    },
    update: function () {
        var a, b = this.zoomFactor,
            c = this.realStepSize,
            d = this.stepMax,
            f = this.dragger,
            e = this.buttonSize,
            g = this.chart;
        this.isDragging ? (g.stopDrag(), a = f.y + (g.mouseY - this.previousY), a = AmCharts.fitToBounds(a, e, this.realGridHeight + e), c = 100 * Math.pow(b, d - (a - e) / c), g.zoomTo(c, NaN, NaN, !0)) : (a = Math.log(g.zoomLevel() /
            100) / Math.log(b), a = (d - a) * c + e);
        this.previousY = g.mouseY;
        this.previousDY != a && f && (f.translate(0, a), this.previousDY = a)
    }
});
AmCharts.SimpleButton = AmCharts.Class({
    construct: function () { },
    init: function (a, b, c, d, f, e, g, h, k, l) {
        var m = this;
        m.rollOverColor = l;
        m.color = d;
        l = a.set();
        m.set = l;
        d = AmCharts.rect(a, b, c, d, f, e, g, h, k);
        l.push(d);
        if (f = m.iconPath) e = m.iconSize, a = a.image(f, (b - e) / 2, (c - e) / 2, e, e), l.push(a), a.mousedown(function () {
            m.handleDown()
        }).mouseup(function () {
            m.handleUp()
        }).mouseover(function () {
            m.handleOver()
        }).mouseout(function () {
            m.handleOut()
        });
        d.mousedown(function () {
            m.handleDown()
        }).mouseup(function () {
            m.handleUp()
        }).mouseover(function () {
            m.handleOver()
        }).mouseout(function () {
            m.handleOut()
        });
        m.bg = d
    },
    setIcon: function (a, b) {
        this.iconPath = a;
        this.iconSize = b
    },
    setClickHandler: function (a, b) {
        this.clickHandler = a;
        this.scope = b
    },
    setDownHandler: function (a, b) {
        this.downHandler = a;
        this.scope = b
    },
    handleUp: function () {
        var a = this.clickHandler;
        a && a.call(this.scope)
    },
    handleDown: function () {
        var a = this.downHandler;
        a && a.call(this.scope)
    },
    handleOver: function () {
        this.bg.setAttr("fill", this.rollOverColor)
    },
    handleOut: function () {
        this.bg.setAttr("fill", this.color)
    }
});
AmCharts.SmallMap = AmCharts.Class({
    construct: function () {
        this.mapColor = "#e6e6e6";
        this.rectangleColor = "#FFFFFF";
        this.top = this.right = 10;
        this.minimizeButtonWidth = 16;
        this.backgroundColor = "#9A9A9A";
        this.backgroundAlpha = 1;
        this.borderColor = "#FFFFFF";
        this.borderThickness = 3;
        this.borderAlpha = 1;
        this.size = 0.2
    },
    init: function (a, b) {
        var c = this;
        c.chart = a;
        c.container = b;
        c.width = a.realWidth * c.size;
        c.height = a.realHeight * c.size;
        AmCharts.remove(c.set);
        var d = b.set();
        c.set = d;
        var f = b.set();
        c.allSet = f;
        d.push(f);
        c.buildSVGMap();
        var e = c.borderThickness,
            g = c.borderColor,
            h = AmCharts.rect(b, c.width + e, c.height + e, c.backgroundColor, c.backgroundAlpha, e, g, c.borderAlpha);
        h.translate(-e / 2, -e / 2);
        f.push(h);
        h.toBack();
        var k, l, h = c.minimizeButtonWidth,
            m = new AmCharts.SimpleButton;
        m.setIcon(a.pathToImages + "arrowDown.gif", h);
        m.setClickHandler(c.minimize, c);
        m.init(b, h, h, g, 1, 1, g, 1);
        m = m.set;
        c.downButtonSet = m;
        d.push(m);
        var n = new AmCharts.SimpleButton;
        n.setIcon(a.pathToImages + "arrowUp.gif", h);
        n.setClickHandler(c.maximize, c);
        n.init(b, h, h, g, 1, 1, g,
            1);
        g = n.set;
        c.upButtonSet = g;
        g.hide();
        d.push(g);
        var q, r;
        isNaN(c.top) || (k = a.getY(c.top) + e, r = 0);
        isNaN(c.bottom) || (k = a.getY(c.bottom, !0) - c.height - e, r = c.height - h + e / 2);
        isNaN(c.left) || (l = a.getX(c.left) + e, q = -e / 2);
        isNaN(c.right) || (l = a.getX(c.right, !0) - c.width - e, q = c.width - h + e / 2);
        e = b.set();
        e.clipRect(1, 1, c.width, c.height);
        f.push(e);
        c.rectangleC = e;
        d.translate(l, k);
        m.translate(q, r);
        g.translate(q, r);
        f.mouseup(function () {
            c.handleMouseUp()
        });
        c.drawRectangle()
    },
    minimize: function () {
        this.downButtonSet.hide();
        this.upButtonSet.show();
        this.allSet.hide()
    },
    maximize: function () {
        this.downButtonSet.show();
        this.upButtonSet.hide();
        this.allSet.show()
    },
    buildSVGMap: function () {
        var a = this.chart,
            b = {
                fill: this.mapColor,
                stroke: "#645d5f",
                "stroke-opacity": 1
            }, c = a.svgData.g.path,
            d = this.container,
            f = d.set(),
            e;
        for (e = 0; e < c.length; e++) {
            var g = d.path(c[e].d).attr(b);
            f.push(g)
        }
        this.allSet.push(f);
        b = f.getBBox();
        c = this.size * a.mapScale;
        d = -b.x * c;
        e = -b.y * c;
        var h = g = 0;
        a.centerMap && (g = (this.width - b.width * c) / 2, h = (this.height - b.height * c) / 2);
        this.mapWidth = b.width *
            c;
        this.mapHeight = b.height * c;
        this.dx = g;
        this.dy = h;
        f.translate(d + g, e + h, c)
    },
    update: function () {
        var a = this.chart,
            b = a.zoomLevel(),
            c = this.width,
            d = a.mapContainer,
            a = c / (a.realWidth * b),
            c = c / b,
            b = this.height / b,
            f = this.rectangle;
        f.translate(-d.x * a + this.dx, -d.y * a + this.dy);
        0 < c && 0 < b && (f.setAttr("width", c), f.setAttr("height", b));
        this.rWidth = c;
        this.rHeight = b
    },
    drawRectangle: function () {
        var a = this.rectangle;
        AmCharts.remove(a);
        a = AmCharts.rect(this.container, 10, 10, "#000", 0, 1, this.rectangleColor, 1);
        this.rectangleC.push(a);
        this.rectangle =
            a
    },
    handleMouseUp: function () {
        var a = this.chart,
            b = a.zoomLevel();
        a.zoomTo(b, -((a.mouseX - this.set.x - this.dx - this.rWidth / 2) / this.mapWidth) * b, -((a.mouseY - this.set.y - this.dy - this.rHeight / 2) / this.mapHeight) * b)
    }
});
AmCharts.AreasProcessor = AmCharts.Class({
    construct: function (a) {
        this.chart = a
    },
    process: function (a) {
        this.updateAllAreas();
        this.allObjects = [];
        a = a.areas;
        var b = this.chart,
            c, d = a.length,
            f, e, g = 0,
            h = b.svgAreasById,
            k = 0,
            l = 0;
        for (f = 0; f < d; f++) e = a[f], e = e.value, k < e && (k = e), l > e && (l = e), isNaN(e) || (g += Math.abs(e));
        isNaN(b.minValue) || (l = b.minValue);
        isNaN(b.maxValue) || (k = b.maxValue);
        b.maxValueReal = k;
        b.minValueReal = l;
        for (f = 0; f < d; f++) e = a[f], isNaN(e.value) ? e.percents = void 0 : e.percents = 100 * ((e.value - l) / g);
        for (f = 0; f < d; f++) {
            e = a[f];
            g = h[e.id];
            c = b.areasSettings;
            if (g && g.className) {
                var m = b.areasClasses[g.className];
                m && (c = m, AmCharts.extend(c, new AmCharts.AreasSettings))
            }
            var n = c.color,
                q = c.alpha,
                r = c.outlineThickness,
                A = c.rollOverColor,
                z = c.selectedColor,
                p = c.rollOverAlpha,
                s = c.outlineColor,
                y = c.outlineAlpha,
                t = c.balloonText,
                w = c.selectable,
                u = c.pattern,
                x = c.rollOverOutlineColor;
            this.allObjects.push(e);
            e.chart = b;
            e.baseSettings = c;
            e.autoZoomReal = void 0 == e.autoZoom ? c.autoZoom : e.autoZoom;
            m = e.color;
            void 0 == m && (m = n);
            var v = e.alpha;
            isNaN(v) && (v = q);
            q = e.rollOverAlpha;
            isNaN(q) && (q = p);
            isNaN(q) && (q = v);
            p = e.rollOverColor;
            void 0 == p && (p = A);
            A = e.pattern;
            void 0 == A && (A = u);
            u = e.selectedColor;
            void 0 == u && (u = z);
            (z = e.balloonText) || (z = t);
            if (void 0 != c.colorSolid && !isNaN(e.value)) {
                var t = (e.value - l) / (k - l),
                    C = 100 / (b.colorSteps - 1),
                    t = Math.ceil(100 * t / C) * C / 100;
                e.colorReal = AmCharts.getColorFade(m, c.colorSolid, t)
            }
            void 0 != e.color && (e.colorReal = e.color);
            void 0 == e.selectable && (e.selectable = w);
            void 0 == e.colorReal && (e.colorReal = n);
            n = e.outlineColor;
            void 0 == n && (n = s);
            s = e.outlineAlpha;
            isNaN(s) && (s = y);
            y = e.outlineThickness;
            isNaN(y) && (y = r);
            r = e.rollOverOutlineColor;
            void 0 == r && (r = x);
            e.alphaReal = v;
            e.rollOverColorReal = p;
            e.rollOverAlphaReal = q;
            e.balloonTextReal = z;
            e.selectedColorReal = u;
            e.outlineColorReal = n;
            e.outlineAlphaReal = s;
            e.rollOverOutlineColorReal = r;
            e.patternReal = A;
            AmCharts.processDescriptionWindow(c, e);
            if (g && (c = g.area, (g = g.title) && !e.title && (e.title = g), c)) {
                e.displayObject = c;
                e.mouseEnabled && b.addObjectEventListeners(c, e);
                var D;
                void 0 != m && (D = m);
                void 0 != e.colorReal && (D = e.showAsSelected ||
                    b.selectedObject == e ? e.selectedColorReal : e.colorReal);
                c.setAttr("fill", D);
                c.setAttr("stroke", "#645d5f");
                c.setAttr("stroke-opacity", s);
                c.setAttr("stroke-width", y);
                c.setAttr("fill-opacity", v);
                A && c.pattern(A, b.mapScale)
            }
        }
    },
    updateAllAreas: function () {
        var a = this.chart,
            b = a.areasSettings,
            c = b.unlistedAreasColor,
            d = b.unlistedAreasAlpha,
            f = b.unlistedAreasOutlineColor,
            e = b.unlistedAreasOutlineAlpha,
            g = a.svgAreas,
            a = a.dataProvider,
            h = a.areas,
            k = {}, l;
        for (l = 0; l < h.length; l++) k[h[l].id] = h[l];
        for (l = 0; l < g.length; l++)
            if (h = g[l], void 0 !=
                c && h.setAttr("fill", c), isNaN(d) || h.setAttr("fill-opacity", d), void 0 != f && h.setAttr("stroke", f), isNaN(e) || h.setAttr("stroke-opacity", e), h.setAttr("stroke-width", b.outlineThickness), a.getAreasFromMap && !k[h.id]) {
                var m = new AmCharts.MapArea;
                m.parentObject = a;
                m.id = h.id;
                a.areas.push(m)
            }
    }
});
AmCharts.AreasSettings = AmCharts.Class({
    construct: function () {
        this.alpha = 1;
        this.autoZoom = !1;
        this.balloonText = "[[title]]";
        this.color = "#363434";
        this.colorSolid = "#990000";
        this.unlistedAreasAlpha = 1;
        this.unlistedAreasColor = "#DDDDDD";
        this.outlineColor = "#FFFFFF";
        this.outlineAlpha = 1;
        this.outlineThickness = 0.5;
        this.selectedColor = this.rollOverOutlineColor = "#CC0000";
        this.unlistedAreasOutlineColor = "#FFFFFF";
        this.unlistedAreasOutlineAlpha = 1;
        this.descriptionWindowWidth = 250
    }
});
AmCharts.ImagesProcessor = AmCharts.Class({
    construct: function (a) {
        this.chart = a;
        this.reset()
    },
    process: function (a) {
        var b = a.images,
            c;
        for (c = 0; c < b.length; c++) this.createImage(b[c], c);
        a.parentObject && a.remainVisible && this.process(a.parentObject)
    },
    createImage: function (a, b) {
        var c = this.chart,
            d = c.container,
            f = c.mapObjectsContainer,
            e = c.stageObjectsContainer,
            g = c.imagesSettings;
        a.remove();
        var h = g.color,
            k = g.alpha,
            l = g.rollOverColor,
            m = g.selectedColor,
            n = g.balloonText,
            q = g.outlineColor,
            r = g.outlineAlpha,
            A = g.outlineThickness,
            z = g.selectedScale,
            p = g.labelPosition,
            s = g.labelColor,
            y = g.labelFontSize,
            t = g.labelRollOverColor,
            w = g.selectedLabelColor;
        a.index = b;
        a.chart = c;
        a.baseSettings = c.imagesSettings;
        var u = d.set();
        a.displayObject = u;
        var x = a.color;
        void 0 == x && (x = h);
        h = a.alpha;
        isNaN(h) && (h = k);
        k = a.outlineAlpha;
        isNaN(k) && (k = r);
        r = a.rollOverColor;
        void 0 == r && (r = l);
        l = a.selectedColor;
        void 0 == l && (l = m);
        (m = a.balloonText) || (m = n);
        n = a.outlineColor;
        void 0 == n && (n = q);
        void 0 == n && (n = x);
        q = a.outlineThickness;
        isNaN(q) && (q = A);
        (A = a.labelPosition) || (A = p);
        p =
            a.labelColor;
        void 0 == p && (p = s);
        s = a.labelRollOverColor;
        void 0 == s && (s = t);
        t = a.selectedLabelColor;
        void 0 == t && (t = w);
        w = a.labelFontSize;
        isNaN(w) && (w = y);
        y = a.selectedScale;
        isNaN(y) && (y = z);
        isNaN(a.rollOverScale);
        a.colorReal = x;
        a.alphaReal = h;
        a.rollOverColorReal = r;
        a.balloonTextReal = m;
        a.selectedColorReal = l;
        a.labelColorReal = p;
        a.labelRollOverColorReal = s;
        a.selectedLabelColorReal = t;
        a.labelFontSizeReal = w;
        a.labelPositionReal = A;
        a.selectedScaleReal = y;
        a.rollOverScaleReal = y;
        AmCharts.processDescriptionWindow(g, a);
        a.centeredReal =
            void 0 == a.centered ? g.centered : a.centered;
        w = a.type;
        t = a.imageURL;
        r = a.svgPath;
        s = a.width;
        l = a.height;
        g = a.scale;
        isNaN(a.percentWidth) || (s = a.percentWidth / 100 * c.realWidth);
        isNaN(a.percentHeight) || (l = a.percentHeight / 100 * c.realHeight);
        var v;
        t || w || r || (w = "circle", s = 1, k = h = 0);
        p = z = 0;
        y = a.selectedColorReal;
        w ? (isNaN(s) && (s = 10), isNaN(l) && (l = 10), "kilometers" == a.widthAndHeightUnits && (s = c.kilometersToPixels(a.width), l = c.kilometersToPixels(a.height)), "miles" == a.widthAndHeightUnits && (s = c.milesToPixels(a.width), l = c.milesToPixels(a.height)),
            v = this.createPredefinedImage(x, n, q, w, s, l), p = z = 0, a.centeredReal && (z = isNaN(a.right) ? -s / 2 : s / 2, p = isNaN(a.bottom) ? -l / 2 : l / 2), v.translate(z, p)) : t ? (isNaN(s) && (s = 10), isNaN(l) && (l = 10), v = d.image(t, 0, 0, s, l), v.node.setAttribute("preserveAspectRatio", "none"), v.setAttr("opacity", h), a.centeredReal && (z = isNaN(a.right) ? -s / 2 : s / 2, p = isNaN(a.bottom) ? -l / 2 : l / 2, v.translate(z, p))) : r && (v = d.path(r), n = v.getBBox(), a.centeredReal ? (z = -n.x * g - n.width * g / 2, isNaN(a.right) || (z = -z), p = -n.y * g - n.height * g / 2, isNaN(a.bottom) || (p = -p)) : z = p = 0, v.translate(z,
            p, g), v.x = z, v.y = p);
        v && (u.push(v), a.image = v, v.setAttr("stroke-opacity", k), v.setAttr("fill-opacity", h), v.setAttr("fill", x));
        !a.showAsSelected && c.selectedObject != a || void 0 == y || v.setAttr("fill", y);
        x = null;
        void 0 !== a.label && (x = AmCharts.text(d, a.label, a.labelColorReal, c.fontFamily, a.labelFontSizeReal, a.labelAlign), h = a.labelBackgroundAlpha, (k = a.labelBackgroundColor) && 0 < h && (v = x.getBBox(), d = AmCharts.rect(d, v.width + 16, v.height + 10, k, h), d.translate(-3, -v.height / 2 - 5), u.push(d)), a.imageLabel = x, !a.labelInactive &&
            a.mouseEnabled && c.addObjectEventListeners(x, a), u.push(x));
        isNaN(a.latitude) || isNaN(a.longitude) ? e.push(u) : f.push(u);
        u && (u.rotation = a.rotation);
        this.updateSizeAndPosition(a);
        a.mouseEnabled && c.addObjectEventListeners(u, a)
    },
    updateSizeAndPosition: function (a) {
        var b = this.chart,
            c = a.displayObject,
            d = b.getX(a.left),
            f = b.getY(a.top),
            e = a.image.getBBox();
        isNaN(a.right) || (d = b.getX(a.right, !0) - e.width * a.scale);
        isNaN(a.bottom) || (f = b.getY(a.bottom, !0) - e.height * a.scale);
        var g = a.longitude,
            h = a.latitude,
            e = this.objectsToResize;
        this.allSvgObjects.push(c);
        this.allObjects.push(a);
        var k = a.imageLabel;
        if (!isNaN(d) && !isNaN(f)) c.translate(d, f);
        else if (!isNaN(h) && !isNaN(g) && (d = b.longitudeToCoordinate(g), f = b.latitudeToCoordinate(h), c.translate(d, f, NaN, !0), a.fixedSize)) {
            d = 1;
            if (a.showAsSelected || b.selectedObject == a) d = a.selectedScaleReal;
            e.push({
                image: c,
                scale: d
            })
        }
        this.positionLabel(k, a, a.labelPositionReal)
    },
    positionLabel: function (a, b, c) {
        if (a) {
            var d = b.image,
                f = 0,
                e = 0,
                g = 0,
                h = 0;
            d && (h = d.getBBox(), e = d.y, f = d.x, g = h.width, h = h.height, b.svgPath &&
                (g *= b.scale, h *= b.scale));
            var k = a.getBBox(),
                d = k.width,
                k = k.height;
            "right" == c && (f += g + d / 2 + 5, e += h / 2 - 2);
            "left" == c && (f += -d / 2 - 5, e += h / 2 - 2);
            "top" == c && (e -= k / 2 + 3, f += g / 2);
            "bottom" == c && (e += h + k / 2, f += g / 2);
            "middle" == c && (f += g / 2, e += h / 2);
            a.translate(f + b.labelShiftX, e + b.labelShiftY)
        }
    },
    createPredefinedImage: function (a, b, c, d, f, e) {
        var g = this.chart.container,
            h;
        switch (d) {
            case "circle":
                h = AmCharts.circle(g, f / 2, a, 1, c, b, 1);
                break;
            case "rectangle":
                h = AmCharts.rect(g, f, e, a, 1, c, b, 1);
                h.translate(-f / 2, -e / 2);
                break;
            case "bubble":
                h = AmCharts.circle(g,
                    f / 2, a, 1, c, b, 1, !0)
        }
        return h
    },
    reset: function () {
        this.objectsToResize = [];
        this.allSvgObjects = [];
        this.allObjects = [];
        this.allLabels = []
    }
});
AmCharts.ImagesSettings = AmCharts.Class({
    construct: function () {
        this.balloonText = "[[title]]";
        this.alpha = 1;
        this.borderAlpha = 0;
        this.borderThickness = 1;
        this.labelPosition = "right";
        this.labelColor = "#000000";
        this.labelFontSize = 11;
        this.color = "#000000";
        this.labelRollOverColor = "#00CC00";
        this.centered = !0;
        this.rollOverScale = this.selectedScale = 1;
        this.descriptionWindowWidth = 250
    }
});
AmCharts.LinesProcessor = AmCharts.Class({
    construct: function (a) {
        this.chart = a;
        this.reset()
    },
    process: function (a) {
        var b = a.lines,
            c = this.chart,
            d = c.linesSettings,
            f = this.objectsToResize,
            e = c.mapObjectsContainer,
            g = c.stageObjectsContainer,
            h = d.thickness,
            k = d.dashLength,
            l = d.arrow,
            m = d.arrowSize,
            n = d.arrowColor,
            q = d.arrowAlpha,
            r = d.color,
            A = d.alpha,
            z = d.rollOverColor,
            p = d.selectedColor,
            s = d.rollOverAlpha,
            y = d.balloonText,
            t = c.container,
            w;
        for (w = 0; w < b.length; w++) {
            var u = b[w];
            u.chart = c;
            u.baseSettings = d;
            var x = t.set();
            u.displayObject =
                x;
            this.allSvgObjects.push(x);
            this.allObjects.push(u);
            u.mouseEnabled && c.addObjectEventListeners(x, u);
            if (u.remainVisible || c.selectedObject == u.parentObject) {
                var v = u.thickness;
                isNaN(v) && (v = h);
                var C = u.dashLength;
                isNaN(C) && (C = k);
                var D = u.color;
                void 0 == D && (D = r);
                var B = u.alpha;
                isNaN(B) && (B = A);
                var E = u.rollOverAlpha;
                isNaN(E) && (E = s);
                isNaN(E) && (E = B);
                var G = u.rollOverColor;
                void 0 == G && (G = z);
                var Q = u.selectedColor;
                void 0 == Q && (Q = p);
                var N = u.balloonText;
                N || (N = y);
                var H = u.arrow;
                if (!H || "none" == H && "none" != l) H = l;
                var J = u.arrowColor;
                void 0 == J && (J = n);
                void 0 == J && (J = D);
                var K = u.arrowAlpha;
                isNaN(K) && (K = q);
                isNaN(K) && (K = B);
                var I = u.arrowSize;
                isNaN(I) && (I = m);
                u.alphaReal = B;
                u.colorReal = D;
                u.rollOverColorReal = G;
                u.rollOverAlphaReal = E;
                u.balloonTextReal = N;
                u.selectedColorReal = Q;
                u.thicknessReal = v;
                AmCharts.processDescriptionWindow(d, u);
                var E = this.processCoordinates(u.x, c.realWidth),
                    G = this.processCoordinates(u.y, c.realHeight),
                    O = u.longitudes,
                    N = u.latitudes,
                    R = O.length,
                    L;
                if (0 < R)
                    for (E = [], L = 0; L < R; L++) E.push(c.longitudeToCoordinate(O[L]));
                R = N.length;
                if (0 <
                    R)
                    for (G = [], L = 0; L < R; L++) G.push(c.latitudeToCoordinate(N[L]));
                if (0 < E.length) {
                    AmCharts.dx = 0;
                    AmCharts.dy = 0;
                    O = AmCharts.line(t, E, G, D, 1, v, C, !1, !1, !0);
                    C = AmCharts.line(t, E, G, D, 0.001, 3, C, !1, !1, !0);
                    AmCharts.dx = 0.5;
                    AmCharts.dy = 0.5;
                    x.push(O);
                    x.push(C);
                    x.setAttr("opacity", B);
                    if ("none" != H) {
                        var F, M, P;
                        if ("end" == H || "both" == H) B = E[E.length - 1], C = G[G.length - 1], 1 < E.length ? (D = E[E.length - 2], F = G[G.length - 2]) : (D = B, F = C), F = 180 * Math.atan((C - F) / (B - D)) / Math.PI, M = B, P = C, F = 0 > B - D ? F - 90 : F + 90;
                        "both" == H && (B = AmCharts.polygon(t, [-I / 2, 0, I /
                            2
                        ], [1.5 * I, 0, 1.5 * I], J, K, 1, J, K), x.push(B), B.translate(M, P), B.rotate(F), u.fixedSize && f.push(B));
                        if ("start" == H || "both" == H) B = E[0], P = G[0], 1 < E.length ? (C = E[1], M = G[1]) : (C = B, M = P), F = 180 * Math.atan((P - M) / (B - C)) / Math.PI, M = B, F = 0 > B - C ? F - 90 : F + 90;
                        "middle" == H && (B = E[E.length - 1], C = G[G.length - 1], 1 < E.length ? (D = E[E.length - 2], F = G[G.length - 2]) : (D = B, F = C), M = D + (B - D) / 2, P = F + (C - F) / 2, F = 180 * Math.atan((C - F) / (B - D)) / Math.PI, F = 0 > B - D ? F - 90 : F + 90);
                        B = AmCharts.polygon(t, [-I / 2, 0, I / 2], [1.5 * I, 0, 1.5 * I], J, K, 1, J, K);
                        x.push(B);
                        B.translate(M, P);
                        B.rotate(F);
                        u.fixedSize && f.push(B)
                    }
                    u.fixedSize && O && this.linesToResize.push({
                        line: O,
                        thickness: v
                    });
                    u.showAsSelected && !isNaN(Q) && O.setAttr("stroke", Q);
                    0 < N.length ? e.push(x) : g.push(x)
                }
            }
        }
        a.parentObject && a.remainVisible && this.process(a.parentObject)
    },
    processCoordinates: function (a, b) {
        var c = [],
            d;
        for (d = 0; d < a.length; d++) {
            var f = a[d],
                e = Number(f);
            isNaN(e) && (e = Number(f.replace("%", "")) * b / 100);
            isNaN(e) || c.push(e)
        }
        return c
    },
    reset: function () {
        this.objectsToResize = [];
        this.allSvgObjects = [];
        this.allObjects = [];
        this.linesToResize = []
    }
});
AmCharts.LinesSettings = AmCharts.Class({
    construct: function () {
        this.balloonText = "[[title]]";
        this.thickness = 1;
        this.dashLength = 0;
        this.arrowSize = 10;
        this.arrowAlpha = 1;
        this.arrow = "none";
        this.color = "#990000";
        this.descriptionWindowWidth = 250
    }
});
AmCharts.MapObject = AmCharts.Class({
    construct: function () {
        this.fixedSize = this.mouseEnabled = !0;
        this.images = [];
        this.lines = [];
        this.areas = [];
        this.remainVisible = !0;
        this.passZoomValuesToTarget = !1
    }
});
AmCharts.MapArea = AmCharts.Class({
    inherits: AmCharts.MapObject,
    construct: function () {
        this.objectType = "MapArea";
        AmCharts.MapArea.base.construct.call(this)
    }
});
AmCharts.MapLine = AmCharts.Class({
    inherits: AmCharts.MapObject,
    construct: function () {
        this.longitudes = [];
        this.latitudes = [];
        this.x = [];
        this.y = [];
        this.objectType = "MapLine";
        this.arrow = "none";
        AmCharts.MapLine.base.construct.call(this)
    }
});
AmCharts.MapImage = AmCharts.Class({
    inherits: AmCharts.MapObject,
    construct: function () {
        this.scale = 1;
        this.widthAndHeightUnits = "pixels";
        this.objectType = "MapImage";
        this.labelShiftY = this.labelShiftX = 0;
        AmCharts.MapImage.base.construct.call(this)
    },
    remove: function () {
        var a = this.displayObject;
        a && a.remove();
        (a = this.imageLabel) && a.remove()
    }
});
AmCharts.degreesToRadians = function (a) {
    return a / 180 * Math.PI
};
AmCharts.radiansToDegrees = function (a) {
    return 180 * (a / Math.PI)
};
AmCharts.getColorFade = function (a, b, c) {
    var d = AmCharts.hex2RGB(b);
    b = d[0];
    var f = d[1],
        d = d[2],
        e = AmCharts.hex2RGB(a);
    a = e[0];
    var g = e[1],
        e = e[2];
    a += Math.round((b - a) * c);
    g += Math.round((f - g) * c);
    e += Math.round((d - e) * c);
    return "rgb(" + a + "," + g + "," + e + ")"
};
AmCharts.hex2RGB = function (a) {
    return [parseInt(a.substring(1, 3), 16), parseInt(a.substring(3, 5), 16), parseInt(a.substring(5, 7), 16)]
};
AmCharts.processDescriptionWindow = function (a, b) {
    var c = a.descriptionWindowX,
        d = a.descriptionWindowY,
        f = a.descriptionWindowWidth,
        e = a.descriptionWindowHeight,
        g = b.descriptionWindowX;
    isNaN(g) && (g = c);
    c = b.descriptionWindowY;
    isNaN(c) && (c = d);
    d = b.descriptionWindowWidth;
    isNaN(d) && (d = f);
    f = b.descriptionWindowHeight;
    isNaN(f) && (f = e);
    b.descriptionWindowX = g;
    b.descriptionWindowY = c;
    b.descriptionWindowWidth = d;
    b.descriptionWindowHeight = f
};
AmCharts.MapData = AmCharts.Class({
    inherits: AmCharts.MapObject,
    construct: function () {
        AmCharts.MapData.base.construct.call(this);
        this.projection = "mercator";
        this.topLatitude = 90;
        this.bottomLatitude = -90;
        this.leftLongitude = -180;
        this.rightLongitude = 180;
        this.zoomLevel = 1;
        this.objectType = "MapData";
        this.getAreasFromMap = !1
    }
});
AmCharts.DescriptionWindow = AmCharts.Class({
    construct: function () { },
    show: function (a, b, c, d) {
        var f = this,
            e = document.createElement("div");
        e.style.position = "absolute";
        e.className = "ammapDescriptionWindow";
        f.div = e;
        b.appendChild(e);
        var g = document.createElement("img");
        g.className = "ammapDescriptionWindowCloseButton";
        g.src = a.pathToImages + "xIcon.gif";
        g.style.cssFloat = "right";
        g.onclick = function () {
            f.close()
        };
        g.onmouseover = function () {
            g.src = a.pathToImages + "xIconH.gif"
        };
        g.onmouseout = function () {
            g.src = a.pathToImages +
                "xIcon.gif"
        };
        e.appendChild(g);
        b = document.createElement("div");
        b.className = "ammapDescriptionTitle";
        b.onmousedown = function () {
            f.div.style.zIndex = 1E3
        };
        e.appendChild(b);
        d = document.createTextNode(d);
        b.appendChild(d);
        d = b.offsetHeight;
        b = document.createElement("div");
        b.className = "ammapDescriptionText";
        b.style.maxHeight = f.maxHeight - d - 20 + "px";
        e.appendChild(b);
        b.innerHTML = c
    },
    close: function () {
        try {
            this.div.parentNode.removeChild(this.div)
        } catch (a) { }
    }
});
AmCharts.ValueLegend = AmCharts.Class({
    construct: function () {
        this.showAsGradient = !1;
        this.minValue = 0;
        this.height = 12;
        this.width = 200;
        this.bottom = this.left = 10;
        this.borderColor = "#FFFFFF";
        this.borderAlpha = this.borderThickness = 1;
        this.color = "#000000";
        this.fontSize = 11
    },
    init: function (a, b) {
        var c = a.areasSettings.color,
            d = a.areasSettings.colorSolid,
            f = a.colorSteps;
        AmCharts.remove(this.set);
        var e = b.set();
        this.set = e;
        var g = 0,
            h = this.minValue,
            k = this.fontSize,
            l = a.fontFamily,
            m = this.color;
        void 0 == h && (h = a.minValueReal);
        void 0 !==
            h && (g = AmCharts.text(b, h, m, l, k, "left"), g.translate(0, k / 2 - 1), e.push(g), g = g.getBBox().height);
        h = this.maxValue;
        void 0 === h && (h = a.maxValueReal);
        void 0 !== h && (g = AmCharts.text(b, h, m, l, k, "right"), g.translate(this.width, k / 2 - 1), e.push(g), g = g.getBBox().height);
        if (this.showAsGradient) c = AmCharts.rect(b, this.width, this.height, [c, d], 1, this.borderThickness, this.borderColor, 1, 0, 0), c.translate(0, g), e.push(c);
        else
            for (k = this.width / f, l = 0; l < f; l++) m = AmCharts.getColorFade(c, d, 1 * l / (f - 1)), m = AmCharts.rect(b, k, this.height, m,
                1, this.borderThickness, this.borderColor, 1), m.translate(k * l, g), e.push(m);
        d = c = 0;
        f = e.getBBox();
        g = a.getY(this.bottom, !0);
        k = a.getY(this.top);
        l = a.getX(this.right, !0);
        m = a.getX(this.left);
        isNaN(k) || (c = k);
        isNaN(g) || (c = g - f.height);
        isNaN(m) || (d = m);
        isNaN(l) || (d = l - f.width);
        e.translate(d, c)
    }
});
AmCharts.ObjectList = AmCharts.Class({
    construct: function (a) {
        this.div = "object" != typeof a ? document.getElementById(a) : a
    },
    init: function (a) {
        this.chart = a;
        var b = document.createElement("div");
        b.className = "ammapObjectList";
        this.div.appendChild(b);
        this.addObjects(a.dataProvider, b)
    },
    addObjects: function (a, b) {
        var c = this.chart,
            d = document.createElement("ul"),
            f;
        if (a.areas)
            for (f = 0; f < a.areas.length; f++) {
                var e = a.areas[f];
                void 0 === e.showInList && (e.showInList = c.showAreasInList);
                this.addObject(e, d)
            }
        if (a.images)
            for (f = 0; f <
                a.images.length; f++) e = a.images[f], void 0 === e.showInList && (e.showInList = c.showImagesInList), this.addObject(e, d);
        if (a.lines)
            for (f = 0; f < a.lines.length; f++) e = a.lines[f], void 0 === e.showInList && (e.showInList = c.showLinesInList), this.addObject(e, d);
        0 < d.childNodes.length && b.appendChild(d)
    },
    addObject: function (a, b) {
        var c = this;
        if (a.showInList && void 0 !== a.title) {
            var d = document.createElement("li"),
                f = document.createTextNode(a.title),
                e = document.createElement("a");
            e.appendChild(f);
            d.appendChild(e);
            b.appendChild(d);
            this.addObjects(a, d);
            e.onmouseover = function () {
                c.chart.rollOverMapObject(a, !1)
            };
            e.onmouseout = function () {
                c.chart.rollOutMapObject(a)
            };
            e.onclick = function () {
                c.chart.clickMapObject(a)
            }
        }
    }
});