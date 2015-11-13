define(['jquery'], function() {
    function setCookie(a, b, c, d, e, f) {
        var g = new Date;
        g.setTime(g.getTime()), c && (c = 1e3 * c * 60 * 60 * 24);
        var h = new Date(g.getTime() + c);
        document.cookie = a + "=" + encodeURI(b) + (c ? ";expires=" + h.toGMTString() : "") + (d ? ";path=" + d : "") + (e ? ";domain=" + e : "") + (f ? ";secure" : "")
    }

    function getCookie(a) {
        var b = document.cookie.indexOf(a + "="),
            c = b + a.length + 1;
        if (!b && a != document.cookie.substring(0, a.length)) return "";
        if (-1 == b) return "";
        var d = document.cookie.indexOf(";", c);
        return -1 == d && (d = document.cookie.length), decodeURI(document.cookie.substring(c, d))
    }

    function delSingleCookie(a) {
        document.cookie = a + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC"
    }

    function deleteCookie(a) {
        if ("[object Array]" == Object.prototype.toString.call(a))
            for (var b in a) delSingleCookie(a[b]);
        else delSingleCookie(a)
    }

    function profileCompleteness() {
        function a(a) {
            function b() {
                var a = document.createElement("canvas");
                return !(!a.getContext || !a.getContext("2d"))
            }
            if (window.requestAnimationFrame && b()) {
                ! function() {
                    var a = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
                    window.requestAnimationFrame = a
                }();
                var c = a.getContext("2d"),
                    d = parseInt(a.getAttribute("perc")),
                    e = a.width / 2,
                    f = a.height / 2,
                    g = 15 * e / 100,
                    h = a.width / 2 - 2 * g,
                    i = 0,
                    j = Math.PI / 2,
                    k = 2 * Math.PI;
                c.lineWidth = g, c.strokeStyle = "#14b9d6", c.stroke(),
                    function l(b) {
                        c.clearRect(0, 0, a.width, a.height), c.beginPath(), c.arc(e, f, h, -j, k * b - j, !1), c.stroke(), i++, d >= i && requestAnimationFrame(function() {
                            l(i / 100)
                        }), c.beginPath(), c.arc(e, f, h - g / 2, -j, 2 * Math.PI), c.fillStyle = "#323a45", c.fill(), c.font = e / 2.5 + "px Arial", c.fillStyle = "#FFFFFF", c.textAlign = "center", c.textBaseline = "middle", c.fillText(i - 1 + "%", e, f)
                    }()
            } else a.parentNode.innerHTML = a.getAttribute("perc") + "%"
        }
        for (var b = document.getElementsByTagName("canvas"), c = 0, d = b.length; d > c; c++) b[c].getAttribute("perc") && "" !== b[c].getAttribute("perc") && a(b[c])
    }

    function processLogin(a) {
        1 == a.status ? global.layers.loginLayer.data.callBack ? global.layers.loginLayer.data.callBack(a) : document.location.reload() : loginErr(a)
    }

    function setLoginCallback(a) {
        global.layers.loginLayer.data.callBack = a || null
    }

    function openLoginBox(a) {
        void 0 !== a && void 0 !== a.successCallback && (loginSuccessCallback = a.successCallback), $("#login_Layer").lightBox().open()
    }

    function loginErr(a) {
        var b = a.msg,
            c = !1,
            d = "Invalid Details. Please check the EmailID-Password combination.";
        switch (2 == $("#uSel_Hid").val() && (d = "Invalid Details. Please check the Username-Password combination."), b) {
            case 1:
                d = "Invalid Details. Please check the Username-Password combination.";
                break;
            case 3:
                d = "Your session has Expired, Please login again";
                break;
            case 4:
                d = "Invalid Details. Please check the EmailID-Password combination.";
                break;
            case 5:
                d = "An account already exists on Naukri.com with this email ID - Login Here.";
                break;
            case 6:
                d = "Login attempts limit reached. Please try again after 24 hours.";
                break;
            case 7:
                c = !1;
                break;
            case 8:
                d = "Reset attempts limit reached. Please try again after 24 hours."
        }
        $("#fLogin_err").html(d).css({
            display: "inline-block",
            "text-align": "center"
        })
    }! function(a) {
        function b() {}

        function c(a) {
            g = [a]
        }

        function d(a, b, c) {
            return a && a.apply(b.context || b, c)
        }

        function e(a) {
            return /\?/.test(a) ? "&" : "?"
        }

        function f(f) {
            function n(a) {
                X++ || (Y(), S && (A[U] = {
                    s: [a]
                }), O && (a = O.apply(f, [a])), d(L, f, [a, v, f]), d(N, f, [f, v]))
            }

            function F(a) {
                X++ || (Y(), S && a != w && (A[U] = a), d(M, f, [f, a]), d(N, f, [f, a]))
            }
            f = a.extend({}, C, f);
            var G, H, I, J, K, L = f.success,
                M = f.error,
                N = f.complete,
                O = f.dataFilter,
                P = f.callbackParameter,
                Q = f.callback,
                R = f.cache,
                S = f.pageCache,
                T = f.charset,
                U = f.url,
                V = f.data,
                W = f.timeout,
                X = 0,
                Y = b;
            return y && y(function(a) {
                a.done(L).fail(M), L = a.resolve, M = a.reject
            }).promise(f), f.abort = function() {
                !X++ && Y()
            }, d(f.beforeSend, f, [f]) === !1 || X ? f : (U = U || j, V = V ? "string" == typeof V ? V : a.param(V, f.traditional) : j, U += V ? e(U) + V : j, P && (U += e(U) + encodeURIComponent(P) + "=?"), !R && !S && (U += e(U) + "_" + (new Date).getTime() + "="), U = U.replace(/=\?(&|$)/, "=" + Q + "$1"), S && (G = A[U]) ? G.s ? n(G.s[0]) : F(G) : (x[Q] = c, I = a(u)[0], I.id = m + B++, T && (I[i] = T), D && D.version() < 11.6 ? (J = a(u)[0]).text = "document.getElementById('" + I.id + "')." + p + "()" : I[h] = h, E && (I.htmlFor = I.id, I.event = o), I[q] = I[p] = I[r] = function(a) {
                if (!I[s] || !/i/.test(I[s])) {
                    try {
                        I[o] && I[o]()
                    } catch (b) {}
                    a = g, g = 0, a ? n(a[0]) : F(k)
                }
            }, I.src = U, Y = function() {
                K && clearTimeout(K), I[r] = I[q] = I[p] = null, z[t](I), J && z[t](J)
            }, z[l](I, H = z.firstChild), J && z[l](J, H), K = W > 0 && setTimeout(function() {
                F(w)
            }, W)), f)
        }
        var g, h = "async",
            i = "charset",
            j = "",
            k = "error",
            l = "insertBefore",
            m = "_jqjsp",
            n = "on",
            o = n + "click",
            p = n + k,
            q = n + "load",
            r = n + "readystatechange",
            s = "readyState",
            t = "removeChild",
            u = "<script>",
            v = "success",
            w = "timeout",
            x = window,
            y = a.Deferred,
            z = a("head")[0] || document.documentElement,
            A = {},
            B = 0,
            C = {
                callback: m,
                url: location.href
            },
            D = x.opera,
            E = !!a("<div>").html("<!--[if IE]><i><![endif]-->").find("i").length;
        f.setup = function(b) {
            a.extend(C, b)
        }, a.jsonp = f
    }(jQuery), jQuery.extend({
            stringify: function(a) {
                var b = typeof a;
                if ("object" != b || null === a) return "string" == b && (a = '"' + a + '"'), String(a);
                var c, d, e = [],
                    f = a && a.constructor == Array;
                for (c in a) d = a[c], b = typeof d, a.hasOwnProperty(c) && ("string" == b ? d = '"' + d + '"' : "object" == b && null !== d && (d = jQuery.stringify(d)), e.push((f ? "" : '"' + c + '":') + String(d)));
                return (f ? "[" : "{") + String(e) + (f ? "]" : "}")
            }
        }),
        function() {
            function a(b, c, d) {
                this.maxSize_ = b || -1, this.debug_ = c || !1, this.storage_ = d || new a.BasicCacheStorage, this.fillFactor_ = .75, this.stats_ = {}, this.stats_.hits = 0, this.stats_.misses = 0, this.log_("Initialized cache with size " + b)
            }
            a.Priority = {
                LOW: 1,
                NORMAL: 2,
                HIGH: 4
            }, a.BasicCacheStorage = function() {
                this.items_ = {}, this.count_ = 0
            }, a.BasicCacheStorage.prototype.get = function(a) {
                return this.items_[a]
            }, a.BasicCacheStorage.prototype.set = function(a, b) {
                "undefined" == typeof this.get(a) && this.count_++, this.items_[a] = b
            }, a.BasicCacheStorage.prototype.size = function() {
                return this.count_
            }, a.BasicCacheStorage.prototype.remove = function(a) {
                var b = this.get(a);
                return "undefined" != typeof b && this.count_--, delete this.items_[a], b
            }, a.BasicCacheStorage.prototype.keys = function() {
                var a, b = [];
                for (a in this.items_) b.push(a);
                return b
            }, a.LocalStorageCacheStorage = function(a) {
                this.prefix_ = "cache-storage." + (a || "default") + ".";
                var b = this.prefix_.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
                this.regexp_ = new RegExp("^" + b)
            }, a.LocalStorageCacheStorage.prototype.get = function(a) {
                var b = window.localStorage[this.prefix_ + a];
                return b ? JSON.parse(b) : null
            }, a.LocalStorageCacheStorage.prototype.set = function(a, b) {
                window.localStorage[this.prefix_ + a] = JSON.stringify(b)
            }, a.LocalStorageCacheStorage.prototype.size = function() {
                return this.keys().length
            }, a.LocalStorageCacheStorage.prototype.remove = function(a) {
                var b = this.get(a);
                return delete window.localStorage[this.prefix_ + a], b
            }, a.LocalStorageCacheStorage.prototype.keys = function() {
                var a, b = [];
                for (a in window.localStorage) a.match(this.regexp_) && b.push(a.replace(this.prefix_, ""));
                return b
            }, a.prototype.getItem = function(a) {
                var b = this.storage_.get(a);
                null != b && (this.isExpired_(b) ? (this.removeItem(a), b = null) : b.lastAccessed = (new Date).getTime());
                var c = b ? b.value : null;
                return c ? (this.stats_.hits++, this.log_("Cache HIT for key " + a)) : (this.stats_.misses++, this.log_("Cache MISS for key " + a)), c
            }, a._CacheItem = function(b, c, d) {
                if (!b) throw new Error("key cannot be null or empty");
                this.key = b, this.value = c, d = d || {}, d.expirationAbsolute && (d.expirationAbsolute = d.expirationAbsolute.getTime()), d.priority || (d.priority = a.Priority.NORMAL), this.options = d, this.lastAccessed = (new Date).getTime()
            }, a.prototype.setItem = function(b, c, d) {
                if (null != this.storage_.get(b) && this.removeItem(b), this.addItem_(new a._CacheItem(b, c, d)), this.log_("Setting key " + b), this.maxSize_ > 0 && this.size() > this.maxSize_) {
                    var e = this;
                    setTimeout(function() {
                        e.purge_.call(e)
                    }, 0)
                }
            }, a.prototype.clear = function() {
                for (var a = this.storage_.keys(), b = 0; b < a.length; b++) this.removeItem(a[b]);
                this.log_("Cache cleared")
            }, a.prototype.getStats = function() {
                return this.stats_
            }, a.prototype.toHtmlString = function() {
                for (var a = this.size() + " item(s) in cache<br /><ul>", b = this.storage_.keys(), c = 0; c < b.length; c++) {
                    var d = this.storage_.get(b[c]);
                    a = a + "<li>" + d.key.toString() + " = " + d.value.toString() + "</li>"
                }
                return a += "</ul>"
            }, a.prototype.resize = function(a) {
                this.log_("Resizing Cache from " + this.maxSize_ + " to " + a);
                var b = this.maxSize_;
                this.maxSize_ = a, a > 0 && (0 > b || b > a) && this.size() > a && this.purge_(), this.log_("Resizing done")
            }, a.prototype.purge_ = function() {
                var a = new Array,
                    b = Math.round(this.maxSize_ * this.fillFactor_);
                this.maxSize_ < 0 && (b = this.size() * this.fillFactor_);
                for (var c = this.storage_.keys(), d = 0; d < c.length; d++) {
                    var e = c[d],
                        f = this.storage_.get(e);
                    this.isExpired_(f) ? this.removeItem(e) : a.push(f)
                }
                if (a.length > b)
                    for (a = a.sort(function(a, b) {
                            return a.options.priority != b.options.priority ? b.options.priority - a.options.priority : b.lastAccessed - a.lastAccessed
                        }); a.length > b;) {
                        var g = a.pop();
                        this.removeItem(g.key)
                    }
                this.log_("Purged cached")
            }, a.prototype.addItem_ = function(a, b) {
                try {
                    this.storage_.set(a.key, a)
                } catch (c) {
                    if (b) throw this.log_("Failed setting again, giving up: " + c.toString()), c;
                    this.log_("Error adding item, purging and trying again: " + c.toString()), this.purge_(), this.addItem_(a, !0)
                }
            }, a.prototype.removeItem = function(a) {
                var b = this.storage_.remove(a);
                return this.log_("removed key " + a), b && b.options && b.options.callback && setTimeout(function() {
                    b.options.callback.call(null, b.key, b.value)
                }, 0), b ? b.value : null
            }, a.prototype.removeWhere = function(a) {
                for (var b = this.storage_.keys(), c = 0; c < b.length; c++) {
                    var d = b[c],
                        e = this.storage_.get(d);
                    a(d, e.value) === !0 && this.removeItem(d)
                }
            }, a.prototype.size = function() {
                return this.storage_.size()
            }, a.prototype.isExpired_ = function(a) {
                var b = (new Date).getTime(),
                    c = !1;
                if (a.options.expirationAbsolute && a.options.expirationAbsolute < b && (c = !0), !c && a.options.expirationSliding) {
                    var d = a.lastAccessed + 1e3 * a.options.expirationSliding;
                    b > d && (c = !0)
                }
                return c
            }, a.prototype.log_ = function(a) {
                this.debug_
            };
            var b = this;
            "undefined" != typeof module && module.exports ? module.exports = a : "function" == typeof define && define.amd ? define(function() {
                return a
            }) : b.Cache = a
        }(), Cache.UserDataCacheStorage = function(a) {
            var a = a,
                b = document.createElement("div");
            b.style.display = "none", document.getElementsByTagName("head")[0].appendChild(b), b.addBehavior("#default#userdata"), this.get = function(c) {
                b.load(a);
                var d = b.getAttribute(c);
                return d ? $.parseJSON(d) : null
            }, this.set = function(c, d) {
                b.load(a), b.setAttribute(c, $.stringify(d)), b.save(a)
            }, this.size = function() {
                return b.XMLDocument.documentElement.attributes.length
            }, this.remove = function(c) {
                b.load(a), b.removeAttribute(c), b.save(a)
            }, this.keys = function() {
                b.load(a);
                for (var c, d = -1, e = []; c = b.XMLDocument.documentElement.attributes[++d];) e.push(c.name);
                return e
            }
        }, ncCacheFactory = function() {}, ncCacheFactory.getCache = function(a, b) {
            if ("undefined" == typeof a || parseInt(a) <= 0) throw new "Invalid app id: " + a;
            b = b || "localStorage";
            var c = window.navigator.userAgent.match(/MSIE 7/),
                d = null;
            if ("localStorage" == b && (c ? d = new Cache.UserDataCacheStorage(String(a)) : "undefined" != typeof window.localStorage && (d = new Cache.LocalStorageCacheStorage(String(a)))), null == d) throw "Unsupported storage type: " + b;
            return new Cache(-1, !1, d)
        };
    var ieObj = {
        scrollHandler: function(a, b, c, d) {
            if (d.length) {
                var e, f = b.height(),
                    g = b.scrollTop(),
                    h = f + g,
                    i = d.position().top + b.scrollTop(),
                    j = i + d.outerHeight();
                return j >= h ? (e = j - f > 0 ? j - f : 0, b.scrollTop(e)) : i < b.scrollTop() && (e = i, b.scrollTop(e)), e
            }
        }
    };
    $.support.placeholder = function() {
        var a = document.createElement("input");
        return "placeholder" in a
    }(jQuery), navigator.userAgent.match(/(iPhone|iPod|iPad)/i) && $("body").css({
        cursor: "pointer"
    }), commonValidator = function() {
        var a = {
            validate: function(b) {
                var c = a;
                c.befSbt = b.beforeSubmit || null, c.disSbt = b.disableSubmit || null, c.lastErr = null, c.isVld = null, c.erArry = {}, c.noVld = !1, c.errs = b.errors || commonErrList, c.cFocus = b.clearOnFocus || !1, c.eFocus = b.focusOnError !== !1 ? !0 : !1;
                var d = b.inlineErrors !== !1 ? !0 : !1;
                if (b.messageBox) var e = b.messageBox.id || null,
                    f = b.messageBox.content || null,
                    g = b.messageBox.hideOthers || !1;
                else var e, f = null;
                if (b.styles) {
                    var h = b.styles.errorClass || null,
                        i = b.styles.okClass || null,
                        j = b.styles.softMandClass || null;
                    k = b.styles.parentObjectClass || null, l = b.styles.maxLevel || 1
                } else var h = "err",
                    i = "ok",
                    j = "softMand",
                    k = null,
                    l = 1;
                var m = b.formNames || null,
                    n = b.defaultEvents || null,
                    o = b.submitButton || null,
                    p = b.fireDelay || 0;
                if (m.constructor === Array)
                    for (var q = 0; q < m.length; q++) c.validInit(m[q], o, h, i, j, k, l, e, f, g, d, n, p);
                else c.validInit(m, o, h, i, j, k, l, e, f, g, d, n, p)
            },
            validInit: function(b, c, d, e, f, g, h, i, j, k, l, m, n) {
                var o, p, q, r = a,
                    s = $("form[name=" + b + "]").get(0);
                if (!s) {
                    var t = new Error(b);
                    throw t.name = "CommonValidator Form", t
                }
                if (r.fName = b, r[b] = {
                        pExist: g,
                        pLevel: h
                    }, r.checkEvents(s, d, e, f, l, m), c)
                    for (p = r.getSbtBtns($(s), c), o = 0; o < p.length; o++) "submit" != p[o].attr("type") && ("" != p[o].attr("rel") && "noValidate" == p[o].attr("rel") ? p[o].on("click", function() {
                        r.noVld = !0, $(s).submit()
                    }) : p[o].on("click", function() {
                        setTimeout(function() {
                            r.isVld = r.checkSubmit(s, c, d, e, f, i, j, k, l)
                        }, parseInt(n))
                    }));
                $(s).submit(function() {
                    return 0 === parseInt(n) ? (q = r.noVld ? !0 : r.checkSubmit(s, c, d, e, f, i, j, k, l), r.befSbt && r.befSbt(), r.disSbt ? !1 : q) : (setTimeout(function() {
                        q = r.noVld ? !0 : r.checkSubmit(s, c, d, e, f, i, j, k, l), r.befSbt && r.befSbt(), !r.disSbt && q && (r.sanitizeDefaultValues(s), $(s).get(0).submit())
                    }, parseInt(n)), !1)
                })
            },
            setDefaultValues: function(b) {
                var c, d = a,
                    e = $(b ? b : "form[name=" + d.fName + "]"),
                    f = d.getFrmElms($(e), !0);
                for (c = 0; c < f.length; c++)("" == f[c].val() || f[c].val() == f[c].attr("placeholder")) && (f[c].val(f[c].attr("placeholder")), f[c].css({
                    color: "#a9a9a9"
                })), f[c].on("focus blur", function(a) {
                    g(a, $(this))
                });
                var g = function(a, b) {
                    b.val() == b.attr("placeholder") && "focus" == a.type ? (b.val(""), b.css({
                        color: ""
                    })) : "" != b.val() && b.val() != b.attr("placeholder") || "blur" != a.type || (b.val(b.attr("placeholder")), b.css({
                        color: "#a9a9a9"
                    }))
                }
            },
            sanitizeDefaultValues: function(b) {
                var c, d = a,
                    e = $(b ? b : "form[name=" + d.fName + "]"),
                    f = d.getFrmElms($(e), !0);
                for (c = 0; c < f.length; c++) f[c].val() == f[c].attr("placeholder") && f[c].val("")
            },
            checkEvents: function(b, c, d, e, f, g) {
                var h, i, j = a,
                    k = null,
                    l = j.getFrmElms($(b), !1);
                for (h = 0; h < l.length; h++) {
                    var m = l[h].attr("rel").split("|")[0];
                    if ((l[h].attr("rel").split("|")[1] || g) && (g && (g.constructor === Array ? "" : g = new Array(g)), k = l[h].attr("rel").split("|")[1] ? l[h].attr("rel").split("|")[1].split(",") : g))
                        for (i = 0; i < k.length; i++) l[h].on(k[i], function(a, b, c, d, e, g) {
                            return function(h) {
                                j.checkValids(a, b, h, c, d, e, g, f)
                            }
                        }(m, l[h], b, c, d, e));
                    j.cFocus && l[h].on("focus", function(a, b, c, d, e, f) {
                        return function(g) {
                            j.clearError(g, a, b, c, d, e, f, !0)
                        }
                    }(m, l[h], b, c, d, e))
                }
            },
            checkSubmit: function(b, c, d, e, f, g, h, i, j) {
                var k, l, m, n, o, p = a,
                    q = !1,
                    r = p.getFrmElms($(b), !1),
                    s = p.getSbtBtns($(b), c);
                for (i ? $(".mgBox").hide() : "", $(b).attr("chk", !1), p.erArry = {}, k = 0; k < s.length; k++) "" != s[k].attr("rel") && $.trim(s[k].attr("rel")).length && "noValidate" != s[k].attr("rel") && (o = "custom:" + s[k].attr("rel").split("|")[0], n = p.checkValids(o, s[k], "submit", b, d, e, f, j), q || n || (q = !0));
                for (l = r.length - 1; l >= 0; l--) m = r[l].attr("rel").split("|")[0], n = p.checkValids(m, r[l], "submit", b, d, e, f, j), q || n || (q = !0);
                if (p.lastErr && "true" == $(b).attr("chk")) {
                    if (g) {
                        if ($("#" + g + "_cMsgCnt") ? $("#" + g + "_cMsgCnt").remove() : "", h) {
                            var t, u = [],
                                v = $("<div>");
                            v.attr("id", g + "_cMsgCnt");
                            for (t in p.erArry) u.push(p.erArry[t]);
                            if (h.customContent) {
                                var w = h.customContent,
                                    x = $("<p>");
                                x.html(w), v.append(x)
                            }
                            if (h.errorMessages) {
                                var l, y = $("<ul>");
                                for (l = u.length - 1; l >= 0; l--) {
                                    var z = $("<li>");
                                    z.html(u[l]), y.append(z)
                                }
                                v.append(y)
                            }
                            if (h.errorCount) {
                                var A = h.errorCount,
                                    B = $("<p>");
                                A = 1 != A ? A.replace("[errCount]", u.length) : "Total " + u.length + " errors found in the form.", B.html(A), v.append(B)
                            }
                            $("#" + g).append(v)
                        }
                        $("#" + g).show()
                    }
                    p.eFocus && (p.lastErr.obj ? $(p.lastErr.objCont).focus() : p.lastErr.focus())
                } else g ? $("#" + g).hide() : "";
                return !q
            },
            clearError: function(b, c, d, e, f, g, h) {
                var i, j = a,
                    k = c.split(","),
                    l = "";
                for (i = 0; i < k.length; i++) l = j.errs[k[i].split(":")[1]] || k[i].split(":")[1], l.constructor === Function && (l = l()), j.heighlightErrOk(l, d, e, "rem", f, g, h)
            },
            isValid: function(b) {
                var c, d, e = a,
                    f = $(b ? "#" + b : "form[name=" + e.fName + "]"),
                    g = !1;
                if ("form" == f.get(0).nodeName.toLowerCase()) {
                    var h = e.getFrmElms(f, !1);
                    for (c = h.length - 1; c >= 0; c--) "button" != h[c].attr("type") && "submit" != h[c].attr("type") && "" != h[c].attr("rel") && h[c].attr("rel").split("|")[0].indexOf("softReq") < 0 && (d = h[c].attr("rel").split("|")[0], g || e.checkValids(d, h[c]) && (g = !0));
                    return !g
                }
                if ("" != f.attr("rel")) {
                    var i = f.attr("rel").split("|")[0];
                    return !e.checkValids(i, f)
                }
            },
            isValidSrv: function(b) {
                function c(a, b, c, f, g, h, i, j, k, l, m) {
                    switch (a) {
                        case "required":
                            return e.reqChk(b, m);
                        case "alphaDS":
                            return e.alphadsChk(b, m);
                        case "alpha":
                            return e.alphaChk(b, m);
                        case "num":
                            return e.numChk(b, m);
                        case "float":
                            return e.floatChk(b, m);
                        case "alphanum":
                            return e.alphanumChk(b, m);
                        case "email":
                            return e.emailChk(b, m);
                        case "specialChar":
                            return e.splChk(b, m);
                        case "charRange":
                            return e.rangeChk(b, g, h, k);
                        case "valRange":
                            return e.rangeVChk(b, i, j, k);
                        case "checked":
                            return e.checkedChkSrv(b);
                        case "selected":
                            return e.selectedChkSrv(b, f);
                        case "custom":
                            var n = d.errs[m];
                            fn = this[n.func];
                            var o = fn.apply(this, n.fields);
                            return "object" == typeof o && 0 == o.msg && (o = ""), o
                    }
                }
                var d = a,
                    e = d.validators;
                d.errs = b.custom || {}, d.errs.__proto__ = commonErrList;
                for (var f = b.name, g = b.val || "", h = b.custom || null, i = "", j = arr[f], k = j.rel.split(","), l = j.defVal || null, m = j.defSelected || "-1", n = j.minL || null, o = j.maxL || null, p = j.minV || null, q = j.maxV || null, r = j.scope || "in", s = 0; s < k.length;)
                    if (c(k[s].split(":")[0], g, l, m, n, o, p, q, r, h, k[s].split(":")[1])) {
                        if (i += f + ":" + k[s].split(":")[0] + ">" + k[s].split(":")[1] + ">", "custom" != k[s].split(":")[0]) {
                            var t = d.errs[k[s].split(":")[1]].msg ? d.errs[k[s].split(":")[1]].msg : d.errs[k[s].split(":")[1]];
                            i += t.replace("[currVal]", g).replace("[MinL]", n).replace("[MaxL]", o).replace("[MinV]", p).replace("[MaxV]", q)
                        } else i += c("custom", g, "", "", "", "", "", "", "", h, k[s].split(":")[1]);
                        s = k.length + 1, i += ","
                    } else s++;
                return i += ";", 0 == i.lastIndexOf(";") && (i = ""), i
            },
            checkValids: function(b, c, d, e, f, g, h, i) {
                var j, k = a,
                    l = !1,
                    m = 0,
                    n = !1,
                    o = !1;
                if (2 == arguments.length ? (l = !0, m = 1) : 9 != d.keyCode && 16 != d.keyCode && 17 != d.keyCode && 18 != d.keyCode && 35 != d.keyCode && 36 != d.keyCode && 27 != d.keyCode && 20 != d.keyCode && 13 != d.keyCode && (m = 1), 1 == m) {
                    var p, q = !1,
                        r = "",
                        s = b.split(",");
                    for (p = 0; p < s.length; p++)
                        if (!q) switch (s[p].split(":")[0]) {
                            case "softReq":
                                j = c.attr("placeholder") && c.val() == c.attr("placeholder") ? "" : c.val(), l ? n ? "" : n = k.validators.reqChk(j, s[p].split(":")[1]) : (q = k.validators.reqChk(j, s[p].split(":")[1]), r = s[p].split(":")[1], o = q ? !0 : !1);
                                break;
                            case "required":
                                j = c.attr("placeholder") && c.val() == c.attr("placeholder") ? "" : c.val(), l ? n ? "" : n = k.validators.reqChk(j, s[p].split(":")[1]) : (q = k.validators.reqChk(j, s[p].split(":")[1]), r = s[p].split(":")[1]);
                                break;
                            case "alphaDS":
                                c.attr("placeholder") && c.val() == c.attr("placeholder") ? q = !1 : l ? n ? "" : n = k.validators.alphadsChk(c.val(), s[p].split(":")[1]) : (q = k.validators.alphadsChk(c.val(), s[p].split(":")[1]), r = s[p].split(":")[1]);
                                break;
                            case "alpha":
                                c.attr("placeholder") && c.val() == c.attr("placeholder") ? q = !1 : l ? n ? "" : n = k.validators.alphaChk(c.val(), s[p].split(":")[1]) : (q = k.validators.alphaChk(c.val(), s[p].split(":")[1]), r = s[p].split(":")[1]);
                                break;
                            case "num":
                                c.attr("placeholder") && c.val() == c.attr("placeholder") ? q = !1 : l ? n ? "" : n = k.validators.numChk(c.val(), s[p].split(":")[1]) : (q = k.validators.numChk(c.val(), s[p].split(":")[1]), r = s[p].split(":")[1]);
                                break;
                            case "float":
                                c.attr("placeholder") && c.val() == c.attr("placeholder") ? q = !1 : l ? n ? "" : n = k.validators.floatChk(c.val(), s[p].split(":")[1]) : (q = k.validators.floatChk(c.val(), s[p].split(":")[1]), r = s[p].split(":")[1]);
                                break;
                            case "alphanum":
                                c.attr("placeholder") && c.val() == c.attr("placeholder") ? q = !1 : l ? n ? "" : n = k.validators.alphanumChk(c.val(), s[p].split(":")[1]) : (q = k.validators.alphanumChk(c.val(), s[p].split(":")[1]), r = s[p].split(":")[1]);
                                break;
                            case "email":
                                c.attr("placeholder") && c.val() == c.attr("placeholder") ? q = !1 : l ? n ? "" : n = k.validators.emailChk(c.val(), s[p].split(":")[1]) : (q = k.validators.emailChk(c.val(), s[p].split(":")[1]), r = s[p].split(":")[1]);
                                break;
                            case "specialChar":
                                c.attr("placeholder") && c.val() == c.attr("placeholder") ? q = !1 : l ? n ? "" : n = k.validators.splChk(c.val(), s[p].split(":")[1]) : (q = k.validators.splChk(c.val(), s[p].split(":")[1]), r = s[p].split(":")[1]);
                                break;
                            case "charRange":
                                if (c.attr("placeholder") && c.val() == c.attr("placeholder")) q = !1;
                                else {
                                    var t = c,
                                        u = t.attr(t.attr("minL") ? "minL" : "minlength"),
                                        v = t.attr(t.attr("maxL") ? "maxL" : "maxlength"),
                                        w = "";
                                    w = t.attr("scope") && "" != t.attr("scope") ? t.attr("scope") : "in", l ? n ? "" : n = k.validators.rangeChk(t.val(), u, v, w) : (q = k.validators.rangeChk(t.val(), u, v, w), r = s[p].split(":")[1])
                                }
                                break;
                            case "valRange":
                                if (c.attr("placeholder") && c.val() == c.attr("placeholder")) q = !1;
                                else {
                                    var t = c,
                                        x = parseFloat(t.attr("minval") ? t.attr("minval") : t.attr("minV")),
                                        y = parseFloat(t.attr("maxval") ? t.attr("maxval") : t.attr("maxV")),
                                        w = "";
                                    w = t.attr("scope") && "" != t.attr("scope") ? t.attr("scope") : "in", l ? n ? "" : n = k.validators.rangeVChk(t.val(), x, y, w) : (q = k.validators.rangeVChk(t.val(), x, y, w), r = s[p].split(":")[1])
                                }
                                break;
                            case "checked":
                                if (l) {
                                    if ("checkbox" == c.attr("type")) {
                                        for (var e, z = c;
                                            "form" != z.get(0).nodeName.toLowerCase();) z = z.parent();
                                        n ? "" : n = k.validators.checkedChk(c, z.get(0))
                                    } else if ("radio" == c.attr("type")) {
                                        for (var e, z = c;
                                            "form" != z.get(0).nodeName.toLowerCase();) z = z.parent();
                                        n ? "" : n = k.validators.checkedRadChk(c, z.get(0))
                                    }
                                } else "checkbox" == c.attr("type") ? q = k.validators.checkedChk(c, e) : "radio" == c.attr("type") && (q = k.validators.checkedRadChk(c, e)), r = s[p].split(":")[1];
                                break;
                            case "selected":
                                l ? n ? "" : n = k.validators.selectedChk(c) : (q = k.validators.selectedChk(c), r = s[p].split(":")[1]);
                                break;
                            case "custom":
                                if (j = c.attr("placeholder") && c.val() == c.attr("placeholder") ? "" : c.val(), l) {
                                    var A = k.errs[s[p].split(":")[1]],
                                        B = A(c, !0);
                                    B.constructor === Object ? B = B.msg : "", B ? B = !0 : B, n ? "" : n = B
                                } else if (k.errs[s[p].split(":")[1]]) var A = k.errs[s[p].split(":")[1]],
                                    B = A(c);
                                q = B && B.constructor === Object ? B.msg : B, r = B
                        }
                        return l ? n : q && !o ? (k.heighlightErrOk(r, c, e, "err", f, g, h, i), k.lastErr = c, !1) : q && o ? (k.heighlightErrOk(r, c, e, "sMnd", f, g, h, i), k.lastErr = k.lastErr, !0) : (k.heighlightErrOk(r, c, e, "ok", f, g, h, i), !0)
                }
            },
            heighlightErrOk: function(b, c, d, e, f, g, h, i) {
                var j, k = a,
                    l = null,
                    m = k.errs[b] || b,
                    n = c.attr("id") + "_err",
                    o = c.attr("name") + "_err",
                    p = $(d).find(".erLbl"),
                    q = c.attr("id") || c.attr("name"),
                    r = null,
                    s = $(d).attr("name");
                if (b && b.constructor === Object && !k.errs[b] && (m = b.msg, b.id ? n = o = b.id : "", b.errorField ? r = b.errorField : ""), m && m.constructor === Object) {
                    var t = m;
                    m = t.msg, t.id ? n = o = t.id : "", t.errorField ? r = t.errorField : ""
                }
                for (j = 0; j < p.length; j++)(p.eq(j).attr("id") == n || p.eq(j).attr("id") == o) && (l = p.eq(j));
                var u, v = null;
                if (k[s].pExist)
                    for (u = 0; u < k[s].pLevel; u++)
                        if (c.parents().eq(u).hasClass(k[s].pExist)) {
                            v = c.parents().eq(u);
                            break
                        }
                if ("err" == e) {
                    if (v && v.length > 0) v.removeClass(f + " " + g + " " + h).addClass(f);
                    else {
                        if (r) {
                            var w = $(d).find(r);
                            w.removeClass(f + " " + g + " " + h).addClass(f)
                        } else c.removeClass(f + " " + g + " " + h).addClass(f);
                        l && (l.removeClass(g + " " + h), !l.hasClass(f) && i ? l.addClass(f) : "")
                    }
                    if (l) {
                        {
                            var x = c.attr("minL") || c.attr("minlength"),
                                y = c.attr("maxL") || c.attr("maxlength"),
                                z = c.attr("minV") || c.attr("minval"),
                                A = c.attr("maxV") || c.attr("maxval");
                            l.attr("id")
                        }
                        m = m.replace("[MinL]", x).replace("[MaxL]", y).replace("[MinV]", z).replace("[MaxV]", A).replace("[currVal]", c.val() ? c.val().toString().replace("<", "&lt;").replace(">", "&gt;") : ""), i ? l.html(m) : "", k.erArry[q] = m
                    }
                    $(d).attr("chk", "true")
                } else if ("ok" == e) {
                    if (v && v.length > 0) v.removeClass(f + " " + g + " " + h).addClass(g);
                    else if (r) {
                        var w = $(d).find(r);
                        w.removeClass(f + " " + g + " " + h).addClass(g)
                    } else c.removeClass(f + " " + g + " " + h).addClass(g);
                    l && (l.html(""), l.removeClass(f + " " + h))
                } else if ("sMnd" == e) {
                    if (v && v.length > 0 ? v.removeClass(f + " " + g + " " + h).addClass(h) : (c.removeClass(f + " " + g + " " + h).addClass(h), l && (l.removeClass(f + " " + g), !l.hasClass(h) && i ? l.addClass(h) : "")), l) {
                        {
                            var x = c.attr("minL") || c.attr("minlength"),
                                y = c.attr("maxL") || c.attr("maxlength"),
                                z = c.attr("minV") || c.attr("minval"),
                                A = c.attr("maxV") || c.attr("maxval");
                            l.attr("id")
                        }
                        m = m.toString().replace("[MinL]", x).replace("[MaxL]", y).replace("[MinV]", z).replace("[MaxV]", A).replace("[currVal]", c.val().replace(/</g, "&lt;").replace(/>/g, "&gt;")), i ? l.html(m) : "", k.erArry[q] = m
                    }
                } else "rem" == e && (v && v.length > 0 ? v.removeClass(f + " " + h) : (c.removeClass(f + " " + h), l && l.removeClass(f + " " + h)), l && l.html(""))
            },
            validators: {
                reqChk: function(b, c) {
                    var d = /^\s*$/;
                    return a.errs[c] && (d = new RegExp(a.errs[c].regEx || d)), d.test(b) ? !0 : !1
                },
                alphadsChk: function(b, c) {
                    var d = /^[a-zA-Z.\s]+$/;
                    return a.errs[c] && (d = new RegExp(a.errs[c].regEx || d)), "" != b ? (b = $.trim(b), 0 == b.indexOf(".") ? !0 : d.test(b) ? !1 : !0) : !1
                },
                alphaChk: function(b, c) {
                    var d = /^[a-zA-Z]+$/;
                    return a.errs[c] && (d = new RegExp(a.errs[c].regEx || d)), "" != b ? d.test($.trim(b)) ? !1 : !0 : !1
                },
                numChk: function(b, c) {
                    var d = /^[-]?[0-9]+$/;
                    return a.errs[c] && (d = new RegExp(a.errs[c].regEx || d)), "" != b ? d.test($.trim(b)) ? !1 : !0 : !1
                },
                floatChk: function(b, c) {
                    var d = /^[-]?[0-9]+(\.[0-9]+)?([eE][+-]?[0-9]+)?$/;
                    return a.errs[c] && (d = new RegExp(a.errs[c].regEx || d)), "" != b ? d.test($.trim(b)) ? !1 : !0 : !1
                },
                alphanumChk: function(b, c) {
                    var d = /^[a-zA-Z0-9]+$/;
                    return a.errs[c] && (d = new RegExp(a.errs[c].regEx || d)), "" != b ? d.test($.trim(b)) ? !1 : !0 : !1
                },
                emailChk: function(b, c) {
                    var d = /^([0-9a-zA-Z]([\.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,4})$/;
                    return a.errs[c] && (d = new RegExp(a.errs[c].regEx || d)), "" != b ? d.test($.trim(b)) ? !1 : !0 : !1
                },
                splChk: function(b, c) {
                    var d = /^[a-zA-Z\d\s]+$/;
                    return a.errs[c] && (d = new RegExp(a.errs[c].regEx || d)), "" != b ? d.test($.trim(b)) ? !1 : !0 : !1
                },
                rangeChk: function(a, b, c, d) {
                    if (c && "" != c || (c = a.length + 1), "" == a) return !1;
                    var d = d || "in",
                        a = new String(a);
                    if ("in" == d) return a.length < b || a.length > c ? b + ":" + c : !1;
                    if ("out" == d) {
                        if (!(a.length > b)) return !1;
                        if (a.length < c) return b + ":" + c
                    }
                },
                rangeVChk: function(a, b, c, d) {
                    if ("" == a) return !1;
                    var d = d || "in";
                    if ("in" == d) return parseFloat($.trim(a)) < b || parseFloat($.trim(a)) > c ? b + ":" + c : !1;
                    if ("out" == d) {
                        if (!(parseFloat($.trim(a)) > b)) return !1;
                        if (parseFloat($.trim(a)) < c) return b + ":" + c
                    }
                },
                checkedRadChk: function(a, b) {
                    var c, d = !1,
                        e = $(b).find("input[type=radio]");
                    for (c = 0; c < e.length; c++) e.eq(c).attr("name") == a.attr("name") && (e.eq(c).is(":checked") ? d = !0 : "");
                    return ret = d ? !1 : !0
                },
                checkedChk: function(a, b) {
                    var c, d = !1,
                        e = $(b).find("input[type=checkbox]");
                    for (c = 0; c < e.length; c++) e.eq(c).attr("name") == a.attr("name") && (e.eq(c).is(":checked") ? d = !0 : "");
                    return ret = d ? !1 : !0
                },
                checkedChkSrv: function(a) {
                    return null == a || "" == a ? !0 : !1
                },
                selectedChk: function(a) {
                    return 0 != a.get(0).selectedIndex ? !1 : !0
                },
                selectedChkSrv: function(a, b) {
                    return a == b ? !0 : !1
                }
            },
            getFrmElms: function(a, b) {
                var c, d = [],
                    e = a.get(0).elements;
                for (c = 0; c < e.length; c++) {
                    var f = e[c].nodeName.toLowerCase();
                    b ? "input" != f && "select" != f && "textarea" != f || "submit" == $(e[c]).attr("type") || "" == $(e[c]).attr("placeholder") || d.push($(e[c])) : "input" != f && "select" != f && "textarea" != f || "submit" == $(e[c]).attr("type") || !$(e[c]).attr("rel") || "" == $(e[c]).attr("rel") || d.push($(e[c]))
                }
                return d
            },
            getSbtBtns: function(a, b) {
                var c, d = [],
                    e = a.find("input[type=submit], button[type=submit]");
                if (e.length > 0 && d.push(e), b)
                    if (b.constructor === Array)
                        for (c = 0; c < b.length; c++) d.push($("#" + b[c]));
                    else d.push($("#" + b));
                return d
            },
            hideElement: function(b) {
                var c, d = a,
                    b = b || null;
                if (b)
                    if (b.constructor === Array)
                        for (c = 0; c < b.length; c++) d.processAltRel(b[c], "h");
                    else d.processAltRel(b, "h")
            },
            showElement: function(b) {
                var c, d = a,
                    b = b || null;
                if (b)
                    if (b.constructor === Array)
                        for (c = 0; c < b.length; c++) d.processAltRel(b[c], "s");
                    else d.processAltRel(b, "s")
            },
            processAltRel: function(a, b) {
                "s" == b ? $("#" + a).attr("rel", $("#" + a).attr("altrel")) : "h" == b && ($("#" + a).attr("altrel") ? "" : $("#" + a).attr("altrel", $("#" + a).attr("rel")), $("#" + a).removeAttr("rel"))
            },
            supportPlaceholder: function() {
                var a = document.createElement("input");
                return "placeholder" in a
            },
            fillVal: function(a) {
                if (a.constructor === Object)
                    for (var b in a) $("#" + b).val(a[b]).css({
                        color: ""
                    })
            }
        };
        return {
            validate: a.validate,
            showElement: a.showElement,
            hideElement: a.hideElement,
            isValid: a.isValid,
            checkValids: a.checkValids,
            fillVal: a.fillVal,
            setDefaultValues: a.setDefaultValues,
            sanitizeDefaultValues: a.sanitizeDefaultValues,
            isValidSrv: a.isValidSrv,
            validators: a.validators
        }
    };
    var blobNotifyElm = $("#blobNotificationURL");
    blobNotifyElm.length && (gnb_json = {}, gnb_json.notificationURL = blobNotifyElm.val(), gnb_json.domain = blobNotifyElm.attr("domain"));
    var setJobRecommendation = function() {
            var a = gnb_json.notificationURL,
                b = parseInt(getCookie("nCont")),
                c = parseInt(getCookie("tCont")),
                d = $("#rJobCntr"),
                e = 1 / 24,
                f = document.getElementById("blobId");
            getCookie("tStp") && (a = gnb_json.notificationURL + "?tStp=" + getCookie("tStp")), isNaN(c) ? $.ajax({
                url: a,
                dataType: "jsonp",
                success: function(a) {
                    var b = parseInt(a.newCont),
                        c = parseInt(a.totalCont);
                    (!b || 0 > b) && (b = 0), (!c || 0 > c) && (c = 0), setCookie("nCont", b, e, "/", gnb_json.domain), setCookie("tCont", c, e, "/", gnb_json.domain), setCookie("ntfy_Sts", 0, e, "/", gnb_json.domain), b ? (d.show().html(b), f.innerHTML = b + " new jobs for you") : c ? f.innerHTML = c + " new jobs for you" : (f.innerHTML = "Currently no new jobs for you", f.href = "javascript:;", f.parentNode.style.width = "180px")
                }
            }) : !b || 0 > b ? !c || 0 > b ? (f.innerHTML = "Currently no new jobs for you", f.href = "javascript:;", f.parentNode.style.width = "180px") : f.innerHTML = c + " new jobs for you" : (d.show().html(b), "1" === getCookie("ntfy_Sts") && d.hide(), f.innerHTML = b + " new jobs for you"), f.onclick = function() {
                setCookie("ntfy_Sts", 1, e, "/", gnb_json.domain), setCookie("tStp", +new Date, 60, "/", gnb_json.domain), setCookie("nCont", 0, e, "/", gnb_json.domain), d.hide()
            }
        },
        gnbInit = !1,
        gnbResponsive = function() {
            if (0 == gnbInit) {
                var a = !1,
                    b = !1;
                $(document).on("touchstart", function(b) {
                    $(b.target).hasClass("mbMenuIcon") || $(b.target).closest("ul").hasClass("midSec") || document.documentElement.clientWidth < 768 && ($(".midSec").hide(), a = !1)
                }), $(".mbMenuIcon").on("click", function() {
                    var c = $(".midSec");
                    if ("none" == c.css("display")) {
                        if (c.show(), window.gnb_json && !b) {
                            var d = $(".headGNB .logged").find(".logout").prepend('<span class="topIcon jobs Login">&nbsp;</span>').parent();
                            c.append(d), b = !0
                        }
                        a = !0
                    } else c.hide()
                }), gnbInit = !0
            }
        };
    if (window.gnb_json) var gnb = function() {
        var a = null,
            b = function(a) {
                for (var b in a) "cont" === b && ("object" == typeof a.cont ? (a.cont["static"] = $(a.cont["static"]), a.cont.cNode = $(a.cont.cNode)) : a.cont = $(a.cont)), this[b] = a[b]
            };
        b.prototype = {
            foo: function(a, b, c) {
                if ("string" == typeof c) {
                    var d = this["_" + b];
                    d && (a = a.find(d))
                }
                this[b].call(a, c, this)
            },
            on: function(a) {
                $.fn.on.apply(this, a)
            },
            label: function(a) {
                this.html(a)
            },
            html: function(a) {
                this.html(a)
            },
            attr: function(a, b) {
                var c = b._attr;
                for (var d in a) this.find(c["_" + d] || c._).attr(d, a[d])
            },
            "class": function(a) {
                this.addClass(a)
            },
            active: function(a) {
                a && this.addClass(a)
            },
            status: function(a) {
                this.prepend('<span class="' + a + '"></span>')
            },
            _attr: {
                _: "a"
            },
            _label: "a",
            _status: "a",
            getInner: function(a) {
                var b = a.find("cloneCont");
                return b = b.length ? b : a
            },
            getCont: function() {
                if ("cNode" in this.cont) {
                    var a = this.cont.cNode.clone();
                    return this.getInner(this.cont["static"]).append(a), a
                }
                return this.getInner(this.cont)
            },
            init: function(a) {
                var c = this.getCont(),
                    d = this;
                return $.each(a || [], function(a, e) {
                    var f = d.cNode.clone();
                    c.append(f);
                    for (var g in e)
                        if ("list" === g) {
                            var h = new b($.extend(!0, {}, d.menu)),
                                i = e.list;
                            i[0] instanceof Array ? (h.cont["static"].addClass("c" + i.length), $.each(i || [], function(a, b) {
                                f.append(h.init(b))
                            })) : f.append(h.init(i))
                        } else d.foo(f, g, e[g])
                }), this.cont["static"] || this.cont
            }
        }; {
            var c = function() {
                    var a = document.documentElement.getBoundingClientRect().right;
                    $.each($(".subMenu"), function(b, c) {
                        $(c).removeClass("fixedRight"), c.getBoundingClientRect().right > a && $(c).addClass("fixedRight")
                    })
                },
                d = function(c, d) {
                    a && !d && a.remove();
                    var e, f = c.logo;
                    "object" == typeof f && (e = $("<a>").attr({
                        href: f.href,
                        itemprop: "url"
                    }).addClass("fl " + f["class"]), e.append('<img itemprop="logo" src="' + f.imageURL + '"/>'));
                    var g = {
                            cont: {
                                "static": '<div class="subMenu"></div>',
                                cNode: "<ul></ul>"
                            },
                            cNode: $("<li><a></a></li>"),
                            group: function() {
                                this.parent().addClass("group"), this.prev().addClass("lastSib"), this.addClass("header1")
                            }
                        },
                        h = null;
                    c.right_logged ? h = new b({
                        cont: '<ul class="rghtSec fr menu logged">',
                        cNode: $('<li><a href="#"><div class="topIcon"><span>&nbsp;</span></div><div class="mTxt"></div></a></li>'),
                        _label: "div.mTxt",
                        topIcon: function(a) {
                            this.find(".topIcon").addClass(a)
                        },
                        img_path: function(a) {
                            this.find(".topIcon.user span").css({
                                "background-image": "url(" + a + ")"
                            })
                        },
                        menu: g,
                        subMenuParam: function(a) {
                            this.find(".subMenu").addClass(a.addnewClass).append(a.innerHtml)
                        }
                    }).init(c.right_logged) : c.right && (h = new b({
                        cont: '<ul class="rghtSec fr menu nonLogged">',
                        cNode: $('<li><a href="#" class="immediate"></a></li>'),
                        menu: g
                    }).init(c.right));
                    var i = new b({
                            cont: '<ul class="midSec menu"></ul>',
                            cNode: $('<li><a href="#"><span class="topIcon jobs">&nbsp;</span><div class="mTxt"></div></a></li>'),
                            _label: "div.mTxt",
                            topIcon: function(a) {
                                this.find("span.topIcon").addClass(a)
                            },
                            menu: g
                        }),
                        j = $('<div class="headGNB cloneCont wrap" itemscope itemtype="http://schema.org/Organization"></div>');
                    return j.append(e, i.init(c.menu), h, $("<div>").addClass("septr")), a = j
                },
                e = function() {
                    return function(b, c) {
                        return c ? a[0].outerHTML : (b && $(b).prepend(a), a)
                    }
                }();
            ! function() {
                d(gnb_json), $(window).resize(c).load(c), $(function() {
                    gnb.getHeader("body .headGNBWrap"), gnb_json.showNotification && (setJobRecommendation(), gnbResponsive())
                })
            }()
        }
        return {
            getHeader: e,
            init_Struct: d,
            headerStruct: a
        }
    }();
    ! function(a) {
        function b(b, d) {
            var e, f, g, h = b.nodeName.toLowerCase();
            return "area" === h ? (e = b.parentNode, f = e.name, b.href && f && "map" === e.nodeName.toLowerCase() ? (g = a("img[usemap=#" + f + "]")[0], !!g && c(g)) : !1) : (/input|select|textarea|button|object/.test(h) ? !b.disabled : "a" === h ? b.href || d : d) && c(b)
        }

        function c(b) {
            return a.expr.filters.visible(b) && !a(b).parents().addBack().filter(function() {
                return "hidden" === a.css(this, "visibility")
            }).length
        }
        a.expr[":"].focusable = function(c) {
            return b(c, !isNaN(a.attr(c, "tabindex")))
        };
        var d = {
            is_options_valid: function(a) {
                return a && a.ltBox && 1 === a.ltBox.prop("nodeType") ? !0 : !1
            },
            is_animtion_support: function() {
                return null === window.navigator.userAgent.match(/MSIE (7|8|9)/)
            },
            switchClass: function(a, b) {
                this.removeClass(a).addClass(b)
            }
        };
        a.fn.lightBox = function(b) {
            var c = null;
            return d.is_options_valid(b) && a.each(this, function(d, f) {
                var g = a(f);
                c = new e(b, g), g.data("lt_Box", c)
            }), this.data("lt_Box") || c
        };
        var e = function(a, b) {
                var c = b.data("lt_Box");
                c && c.options.ltBox[0] === a.ltBox[0] && c.reInit(), a.trigger = b, this.init(a)
            },
            f = function() {
                function b() {
                    var b = 999;
                    return a(".ltCont .ltLayer").each(function() {
                        var c = parseInt(a(this).css("z-index"));
                        c > b && (b = c)
                    }), b
                }
                var c = "lightBox",
                    e = {
                        ltBox: null,
                        dimens: {
                            height: "auto",
                            width: "auto"
                        },
                        resetForm: !1,
                        fixed: !1,
                        open: {
                            success: function() {},
                            event: "click",
                            anim: {
                                className: ""
                            }
                        },
                        close: {
                            esc: !0,
                            layer: !0,
                            nodes: {
                                target: "",
                                event: "click",
                                selector: ""
                            },
                            success: function() {},
                            returnFocus: !0,
                            anim: {
                                className: "",
                                duration: 0
                            }
                        }
                    },
                    f = function() {
                        var b = a('<div class="ltCont close"></div>').attr("tabIndex", 0),
                            c = a('<div class="ltLayer close"></div>');
                        return b.append(c), a(window).bind("resize", function() {
                            try {
                                if (f.stack.length) {
                                    var a = f.stack[0];
                                    g.call(a)
                                }
                            } catch (b) {}
                        }), a("html").keydown(function(a) {
                            27 === a.keyCode && f.stack.length && f.stack[0].options.close.esc && f.stack[0].close()
                        }), c.click(function() {
                            f.stack.length && f.stack[0].options.close.layer && f.stack[0].close()
                        }), {
                            stack: [],
                            cont: b,
                            layer: c
                        }
                    }();
                a(function() {
                    a("body").append(f.cont)
                }), a.fn.lightBox.close = function(a) {
                    var b, c;
                    b = 0, c = 0, a = a || {}, a.all && (b = f.stack.length - 1), a.allPrevious ? (b = f.stack.length - 1, c = 1) : a.index && (c = b = a.index);
                    for (var d = b; d >= c; d--) d in f.stack ? f.stack[d].close(d, a.noAnim) : ""
                }, a.fn.lightBox.closeAll = function(b) {
                    a.fn.lightBox.close(b || {
                        all: !0
                    })
                };
                var g = (function() {
                        f.cont.keydown(function(a) {
                            if (f.stack.length && 9 === a.keyCode) {
                                var b = f.stack[0].options.ltBox.find(":focusable"),
                                    c = b.first(),
                                    d = b.last();
                                return a.target !== d[0] && a.target !== a.currentTarget || a.shiftKey ? a.target !== c[0] && a.target !== a.currentTarget || !a.shiftKey ? void a.stopPropagation() : (d ? d.focus() : "", !1) : (c ? c.focus() : "", !1)
                            }
                        }), a("html").keydown(function(a) {
                            return 9 === a.keyCode && f.stack.length ? (f.cont.focus(), !1) : void 0
                        })
                    }(), function() {
                        a(".ltCont").css({
                            width: "auto",
                            height: "auto"
                        });
                        var b = document.documentElement || document.body,
                            c = a(window).height(),
                            d = a(document).height(),
                            e = a(window).width(),
                            g = a(document).width(),
                            h = window.pageYOffset ? pageYOffset : b.scrollTop,
                            i = (window.pageXOffset ? pageXOffset : b.scrollLeft, c - this.options.ltBox.height()),
                            j = 0,
                            k = e - this.options.ltBox.width(),
                            l = 0;
                        return i > 0 ? j = (this.options.fixed ? 0 : h) + i / 2 : (j = 0, window.scrollTo(0, j)), l = k > 0 ? k / 2 : 0, f.cont.css({
                            width: g + "px",
                            height: d + "px"
                        }), this.options.ltBox.css({
                            top: j + "px",
                            left: l + "px"
                        }), !0
                    }),
                    h = function() {
                        this.options.ltBox.css({
                            position: this.options.fixed ? "fixed" : "absolute",
                            width: this.options.dimens.width,
                            height: this.options.dimens.height
                        })
                    },
                    i = function(b) {
                        this.options = a.extend(!0, {}, e, b)
                    },
                    j = function() {
                        var a = this.options.ltBox.parent();
                        a.hasClass("ltCont") || f.cont.append(this.options.ltBox)
                    },
                    k = {
                        open: function() {
                            var a = [this.options.close.anim.className, this.options.open.anim.className];
                            d.switchClass.call(this.options.ltBox, a[0], a[1])
                        },
                        close: function(a) {
                            var b = [this.options.close.anim.className, this.options.open.anim.className];
                            d.switchClass.call(this.options.ltBox, b[1], b[0]);
                            var c = 0;
                            d.is_animtion_support() && (c = this.options.close.anim.duration), setTimeout(function() {
                                a.cb()
                            }, c)
                        }
                    },
                    l = function() {
                        f.stack.length || (f.cont.removeClass("close"), d.switchClass.call(f.layer, "close", "open")), n.call(this);
                        var c = b();
                        f.layer.css("zIndex", c + 3), f.cont.css("zIndex", c + 1), this.options.ltBox.css("zIndex", c + 3), this.options.ltBox.addClass("lightbox_open"), g.call(this), k.open.call(this), m.call(this), -1 === a.inArray(this, f.stack) && f.stack.unshift(this), this.options.open.success()
                    },
                    m = function() {
                        var a = document.documentElement.scrollTop,
                            b = this.options.open.firstFocus;
                        b ? b.focus() : f.cont.focus(), document.documentElement.scrollTop = a
                    },
                    n = function() {
                        if (this.options.resetForm)
                            for (var a = this.options.ltBox.find("form"), b = 0; b < a.length; b++) a[b].reset()
                    },
                    o = function(b, c) {
                        {
                            var e = this;
                            f.stack
                        }
                        if (b = b || a(f.stack).index(this), f.stack.length && !(0 > b)) {
                            f.stack.splice(b, 1);
                            var h = {
                                cb: function() {
                                    if (e.options.ltBox.removeClass("lightbox_open"), f.stack.length) {
                                        var a = f.stack[0];
                                        f.layer.css("zIndex", a.options.ltBox.css("zIndex")), g.call(a)
                                    } else f.cont.addClass("close");
                                    p.call(e), n.call(e), e.options.close.success()
                                }
                            };
                            c ? h.cb() : k.close.call(this, h), f.stack.length || d.switchClass.call(f.layer, "open", "close")
                        }
                    },
                    p = function() {
                        if (!f.stack.length) {
                            var b = this.options.close.returnFocus;
                            b === !0 ? this.options.trigger.focus() : a(b).focus()
                        }
                    },
                    q = function() {
                        var a = this;
                        this.options.trigger.on(this.options.open.event + "." + c, function() {
                            a.open()
                        }), r.call(this, this.options.close.nodes)
                    },
                    r = function(b) {
                        var c = this;
                        if ("array" === a.type(b)) return void a.each(b, function(a, b) {
                            r.call(c, b)
                        });
                        var d = null;
                        b.constructor === jQuery ? (d = a.extend({}, e.close.nodes), d.target = b) : d = {
                            target: a(b.target),
                            event: b.event,
                            selector: b.selector
                        }, d.target.on(d.event, d.selector, function() {
                            c.close()
                        })
                    },
                    s = function(a) {
                        i.call(this, a), j.call(this), h.call(this), q.call(this), this.options.ltBox.addClass(this.options.close.anim.className)
                    },
                    t = function() {
                        this.options.trigger.off(this.options.open.event + "." + c)
                    };
                return {
                    init: s,
                    reInit: t,
                    resize: g,
                    open: l,
                    close: o
                }
            }();
        e.prototype = f
    }(jQuery), $(document).click(function(a) {
        $(a.target).parents(".singleDD").length || $(".singleDD .sDrop").slideUp(200)
    });
    var previousOpen;
    ! function(a) {
        a.fn.singleDD = function(b) {
            function c() {
                var b = this;
                b.inpWrap.on("click", ".sdTxt, .smArw, .arw", function() {
                    if ("block" == b.dropCont.css("display")) b.dropCont.slideUp(g.animationSpeed, function() {
                        g.onClose ? g.onClose() : ""
                    });
                    else if (b.currentActive) {
                        if (b.inpWrap[0].focus(), b.width = g.width && "auto" != g.width ? g.width : b.elm.width() + "px", b.dropCont.css({
                                width: b.width
                            }).slideDown(g.animationSpeed, function() {
                                b.innerDropLayer[0].csb && (b.innerDropLayer[0].csb.reset(), b.dropCont.find(".content").animate({
                                    scrollTop: "0px"
                                }, 500)), g.onOpen ? g.onOpen() : ""
                            }), g.changeDirection) {
                            null == h ? (mainEle = a(window).height(), eleTop = b.elm.find(".dWrap").offset().top - a(window).scrollTop()) : (mainEle = a(h).height(), eleTop = a(h).scrollTop() + b.elm.find(".dWrap").offset().top); {
                                g.width && "auto" != g.width ? g.width : elm.width() + "px"
                            }
                            b.dropCont.css(mainEle >= g.maxHeight ? mainEle >= eleTop + g.maxHeight ? {
                                top: b.elm.find(".dWrap").outerHeight(),
                                left: 0,
                                display: "block"
                            } : {
                                top: "-" + g.maxHeight + "px",
                                left: 0,
                                display: "block"
                            } : {
                                top: b.elm.find(".dWrap").outerHeight(),
                                left: 0,
                                display: "block"
                            })
                        } else b.dropCont.css({
                            top: b.elm.find(".dWrap").outerHeight(),
                            left: 0,
                            display: "block"
                        });
                        a(this).parents(".singleDD").addClass("zIndexIE7"), g.onOpen ? g.onOpen() : ""
                    }
                }).on("keydown", function(c) {
                    var d, e = b.keyCode(c),
                        f = b.dropCont.find(":first-child"),
                        h = b.dropCont.find("ul"),
                        i = (h.parents(".sDrop"), h.parent());
                    39 == e || 40 == e ? (d = b.nextSelection.call(b, b.currActiveItem), g.autoSelect && b.setValue.call(b, d), ieObj.scrollHandler(i, h.parent(), f, d)) : 37 == e || 38 == e ? (d = b.prevSelection.call(b, b.currActiveItem), g.autoSelect && b.setValue.call(b, d), ieObj.scrollHandler(i, h.parent(), f, d)) : (9 == e || 13 == e || 27 == e) && (g.autoSelect || b.setValue.call(b, b.currActiveItem), b.currentActive = !1, b.onblur(c, a(this)), b.currentActive = !0)
                }).on("focus", function(a) {
                    g.onFocus && g.onFocus(), b.disableScroll(a), b.currActiveItem = b.dropCont.find("li:first-child"), b.inpTextElm.val() ? "" : b.currActiveItem.addClass("sAct")
                }).on("blur", function(c) {
                    b.enableScroll(c), b.onblur(c, a(this))
                }).mousedown(function() {
                    return !1
                })
            }

            function d(b) {
                var d = this;
                d.elm = b;
                var e = b.attr("id"),
                    f = d.elm.find(".sdTxt"),
                    h = f.attr("name");
                d._this = d, d.inpTextElm = f.attr({
                    name: "",
                    readonly: "readonly",
                    autocomplete: "off",
                    tabIndex: "-1"
                }), d.inpWrap = d.elm.find(".dWrap").attr({
                    tabIndex: "0"
                });
                var i = g.customScroll ? 'class="nScroll"' : "";
                d.hidElm = a("<input>").attr({
                    type: "hidden",
                    id: e + "Hid",
                    name: h
                }), d.dropCont = a('<div class="sDrop"></div>'), d.innerDropLayer = a("<div " + i + "><ul></ul></div>").css({
                    maxHeight: g.maxHeight
                }), d.dropCont.append(d.innerDropLayer), d.currentActive = !1, d.inpWrap.append(d.hidElm), d.elm.append(d.dropCont), d.replaceData = function(a) {
                    d.prefillData(a), d.dropCont.find("ul").html(d.appendData(a.data))
                }, d.select = function(a) {
                    d.setVal_inHiddenField.call(d, g.data[a], a)
                }, d.deselect = function() {
                    d.setVal_inHiddenField.call(d, "", "")
                }, d.elm.on("mouseenter", function() {
                    d.currentActive = !0
                }).on("mouseleave", function() {
                    d.currentActive = !1
                }), c.call(d), d.dropCont.on("click", "li", function() {
                    var b = a(this).text(),
                        c = a(this).attr("id");
                    g.defaultIndex && 0 === a(this).index() ? d.setVal_inHiddenField("", "", !0) : d.setVal_inHiddenField(b, c), d.inpWrap[0].focus(), d.dropCont.slideUp(g.animationSpeed, function() {
                        g.onClose ? g.onClose() : ""
                    })
                }).on("mouseover", "li", function() {
                    a(this).addClass("sAct")
                }).on("mouseout", "li", function() {
                    a(this).removeClass("sAct")
                }).find("ul").html(d.appendData(g.data)), d.prefillData(g)
            }

            function e(a) {
                d.call(this, a)
            }
            var f = {
                    maxHeight: 200,
                    data: {},
                    defaultIndex: !0,
                    customScroll: !0,
                    placeholderColor: "#a9a9a9",
                    selectColor: "#333",
                    animationSpeed: 200,
                    autoSelect: !0
                },
                g = a.extend({}, f, b),
                h = b.wrap ? b.wrap : null,
                i = {
                    prefillData: function(a) {
                        var b = a.sortPrefix ? a.sortPrefix + a.prefillData : a.prefillData;
                        a.data[b] ? i.setVal_inHiddenField.call(this, a.data[b], a.prefillData) : 0 != a.isReset && this.setVal_inHiddenField("", "")
                    },
                    setVal_inHiddenField: function(a, b, c) {
                        var d, e = i.remDelimiter(b);
                        jQuery.support.placeholder || (a ? d = g.selectColor : (a = this.inpTextElm.attr("placeholder"), d = g.placeholderColor)), this.inpTextElm.val(a).css({
                            color: d
                        }), this.hidElm.val(e), (e || c) && (g.callBack ? g.callBack(e) : "")
                    },
                    disable: function() {
                        this.inpWrap.off("click keydown focus blur")
                    },
                    enable: function() {
                        c.call(this._this)
                    },
                    onblur: function(a, b) {
                        var c = this;
                        c.currentActive || (c.dropCont.slideUp(g.animationSpeed, function() {
                            g.onClose ? g.onClose() : ""
                        }), b.parents(".singleDD").removeClass("zIndexIE7"), g.onClose ? g.onClose() : "", previousOpen = c.dropCont)
                    },
                    setValue: function(a) {
                        var b = a.attr("id");
                        g.defaultIndex && 0 == a.index() ? i.setVal_inHiddenField.call(this, "", "") : a && a.length && i.setVal_inHiddenField.call(this, a.text(), b)
                    },
                    appendData: function(a) {
                        var b = "";
                        for (var c in a) b += g.textWrap ? '<li id="' + c + '"><' + g.textWrap + ">" + a[c] + "</" + g.textWrap + "></li>" : '<li id="' + c + '">' + a[c] + "</li>";
                        return b
                    },
                    keyCode: function(a) {
                        return a.keyCode || a.which
                    },
                    disb_Scroll_handler: function(a) {
                        var b = i.keyCode(a);
                        return 40 === b || 38 === b || 32 === b ? (a.preventDefault(), !1) : void 0
                    },
                    disableScroll: function() {
                        a(window).on("keydown", i.disb_Scroll_handler)
                    },
                    enableScroll: function() {
                        a(window).off("keydown", i.disb_Scroll_handler)
                    },
                    nextSelection: function(a) {
                        var b = a.next();
                        return b.length ? (a.removeClass("sAct"), this.currActiveItem = b, b.addClass("sAct")) : b = a, b
                    },
                    prevSelection: function(a) {
                        var b = a.prev();
                        return b.length && (a.removeClass("sAct"), this.currActiveItem = b, b.addClass("sAct")), b
                    },
                    remDelimiter: function(a) {
                        return a && g.sortPrefix ? a.toString().replace(new RegExp("^" + g.sortPrefix), "") : a
                    }
                };
            return e.prototype = i, this.each(function() {
                if (!a(this).data("singleDD")) {
                    var b = new e(a(this));
                    a(this).data("singleDD", b)
                }
            }), this.data("singleDD")
        }
    }(jQuery),
    function(a) {
        a.fn.tabs = function(b) {
            var c = a.extend({}, a.fn.tabs.defaults, b);
            return this.each(function() {
                var b = a(this),
                    d = b.children("ul").children(),
                    e = d.eq(c.active);
                c.disabled ? d.eq(c.disabled).addClass("disable") : "", jQuery.data(b, "tab", {
                    id: b.attr("id"),
                    prevAct: e.addClass("active")
                }), a("#" + e.attr("bind")).show(), a.each(d, function() {
                    a(this).hasClass("disable") || a(a(this)).on(c.openEvent, function() {
                        var d = a("#" + a(this).attr("bind"));
                        if ("block" != d.css("display")) {
                            var e = jQuery.data(b, "tab");
                            a("#" + e.id + " .tabCont").hide(), d.fadeIn(), e.prevAct.removeClass("active"), c.onClick ? c.onClick(a(this), e.prevAct) : "", e.prevAct = a(this).addClass("active")
                        }
                    })
                })
            })
        }, a.fn.tabs.defaults = {
            active: 0,
            disabled: !1,
            onClick: !1,
            openEvent: "click",
            heightStyle: "auto"
        }
    }(jQuery), customScroll = function() {
            if ($("body").append('<!--[if IE 7]><script type="text/javascript">$("body").addClass("ie7")</script><![endif]-->'), $("body").hasClass("ie7")) return {
                init: function() {}
            };
            var a = {
                    barSize: "0"
                },
                b = {
                    anchorScrollSpeed: 10,
                    pageScrollSpeed: 20,
                    clientX: 0,
                    clientY: 0,
                    type: {
                        0: "vertical",
                        1: "horizontal"
                    },
                    vertical: {
                        cSize: "clientHeight",
                        func: "height",
                        css1: "top",
                        css2: "height",
                        sSize: "scrollHeight",
                        sStart: "scrollTop"
                    },
                    horizontal: {
                        cSize: "clientWidth",
                        func: "width",
                        css1: "left",
                        css2: "width",
                        sSize: "scrollWidth",
                        sStart: "scrollLeft"
                    }
                },
                c = function() {
                    var a = function(a, c, e, f) {
                            var g = e.scrollToward,
                                h = 0,
                                i = e[a].bar[0];
                            if (c.hasClass("anchor")) {
                                h = b.anchorScrollSpeed;
                                var j = c.hasClass("head") ? -h : h
                            } else {
                                var k = e[a].bar[0].getBoundingClientRect(),
                                    l = ("vertical" == a ? f.clientY < k.top : f.clientX < k.left) ? "head" : "foot";
                                h = b.pageScrollSpeed;
                                var j = "head" == l ? -h : h
                            }
                            g.interval = setInterval(function() {
                                return document.elementFromPoint(b.clientX, b.clientY) == i ? void clearInterval(d.scrollToward.interval) : void e.scrollToward(a, j)
                            }, 100)
                        },
                        c = function(a, c) {
                            b.drag = {
                                dir: a,
                                obj: c,
                                prev_clientX: b.clientX,
                                prev_clientY: b.clientY
                            }
                        },
                        e = function(b) {
                            var d = this;
                            this[b].scroll.mousedown(function(b, e) {
                                var f = $(b.target || b.srcElement);
                                e = f.hasClass("bar") || f.hasClass("anchor") ? f.parent().attr("class").match(/vertical|horizontal/) : f.attr("class").match(/vertical|horizontal/), f.hasClass("bar") ? c(e, d) : a(e, f, d, b), b.preventDefault()
                            }).click(function(a) {
                                a.stopPropagation()
                            })
                        };
                    return {
                        mouseEvents: e
                    }
                },
                d = {
                    type: {
                        0: "vertical",
                        1: "horizontal"
                    },
                    injectStructure: function() {
                        function a(a) {
                            this[a] = {
                                scroll: $("<div>").addClass("csb matchParent " + a),
                                head: $("<div>").addClass("matchParent anchor head"),
                                foot: $("<div>").addClass("matchParent anchor foot"),
                                bar: $("<div>").addClass("bar")
                            }, this[a].scroll.append(this[a].head).append(this[a].bar).append(this[a].foot), this.cover.append(this[a].scroll), this.anchorSize = this[a].head[this.getProperty(a, "func")](), this[a].bar[0].style[this.getProperty(a, "css1")] = this.anchorSize + "px"
                        }
                        for (var b = document.createDocumentFragment(), c = this.elem[0].childNodes; c.length;) b.appendChild(c[0]);
                        this.cover = $("<div>").addClass("cover"), this.content = $("<div>").addClass("matchParent content"), this.content.append($(b));
                        var d = {
                            minWidth: this.elem.css("min-width"),
                            maxWidth: this.elem.css("max-width"),
                            minHeight: this.elem.css("min-height"),
                            maxHeight: this.elem.css("max-height")
                        };
                        this.content.css(d), this.cover[0].setAttribute("onscroll", "this.scrollLeft=this.scrollTop=0"), this.cover.append(this.content), this.elem.append(this.cover), a.call(this, this.type[0]), a.call(this, this.type[1])
                    },
                    getPaneSize: function(a) {
                        var b = this.getProperty(a, "func"),
                            c = this[a].head[b](),
                            d = this[a].scroll[b]() - 2 * c;
                        return {
                            aSize: c,
                            pSize: d > -1 ? d : 0
                        }
                    },
                    setRatio: function(a) {
                        var b = (this.getProperty(a, "css1"), this.getProperty(a, "css2")),
                            c = this.getProperty(a, "sSize"),
                            d = this.getProperty(a, "sStart"),
                            e = this.getPaneSize(a),
                            f = Math.max(this.params.barSize, Math.pow(e.pSize, 2) / this.content[0][c]);
                        this[a].bar[0].style[b] = f + "px";
                        var g = this.content[0][d];
                        this.content[0][d] = this.content[0][c], this[a].maxsSize = this.content[0][d], this.content[0][d] = g, this[a].RATIO = 0 != this[a].maxsSize ? (e.pSize - f) / this[a].maxsSize : 0
                    },
                    isScrollable: function(a) {
                        var b = this.getProperty(a, "sSize");
                        b = this.content[0][b];
                        var c = this.getProperty(a, "cSize");
                        return c = this.content[0][c], b > c
                    },
                    show: function(a) {
                        var c = a ? {
                            0: a
                        } : b.type;
                        for (key in c) a = c[key], this.isScrollable(a) ? (this[a].scroll.stop(!0, !0), this[a].scroll.fadeIn("slow")) : this.hide(a)
                    },
                    hide: function(a) {
                        var c = a ? {
                            0: a
                        } : b.type;
                        for (key in c) a = c[key], this[a].scroll.stop(!0, !0), this[a].scroll.fadeOut("slow")
                    },
                    onScrollSizeUpdate: function(a) {
                        this.setRatio(a), this.show()
                    },
                    setBarStart: function(a, b) {
                        {
                            var c = this.getProperty(a, "css1");
                            this.getProperty(a, "func")
                        }
                        b = b * this[a].RATIO + this.anchorSize, this[a].bar[0].style[c] = b + "px"
                    },
                    onScrollChange: function() {
                        if (!this.synching) {
                            this.synching = !0;
                            var a = this.getProperty("type");
                            for (key in a) {
                                var b = a[key],
                                    c = this[b]._sSize || 0,
                                    d = this[b]._sStart || 0,
                                    e = this.content[0][this.getProperty(b, "sSize")];
                                c != e && (this.onScrollSizeUpdate(b), this[b]._sSize = e);
                                var f = this.content[0][this.getProperty(b, "sStart")];
                                d != f && (this.setBarStart(b, f), this[b]._sStart = f)
                            }
                            this.synching = !1
                        }
                    },
                    getProperty: function(a, c) {
                        return c ? b[a][c] : b[a]
                    },
                    scrollTo: function(a, b) {
                        var c = this.getProperty(a, "sStart");
                        this.content[0][c] = b
                    },
                    scrollToward: function(a, b) {
                        {
                            var c = this.getProperty(a, "sStart");
                            this.content[0][c]
                        }
                        this.content[0][c] += (b > 0 ? Math.ceil : Math.floor)(b)
                    },
                    attachEvents: function() {
                        var a = this,
                            c = b.type;
                        for (key in c) {
                            var d = c[key];
                            this.mouseEvents(d)
                        }
                        this.onScrollChange(), this.content.on("scroll	", function() {
                            a.onScrollChange()
                        }), this.cover.mouseenter(function() {
                            a.show()
                        }).mouseleave(function() {
                            b.drag || a.hide()
                        })
                    }
                },
                e = function(a, b) {
                    a.csb = {
                        reset: function() {
                            b.onScrollChange()
                        },
                        scrollToHead: function() {},
                        scrollToHead: function() {},
                        scrollTo: function() {},
                        remove: function() {}
                    }
                },
                f = function(b, c) {
                    this.elem = b, this.params = $.extend({}, a, c), this.injectStructure(), this.attachEvents(), e(b[0], this)
                },
                g = c();
            for (key in g) d[key] = g[key];
            f.prototype = d;
            var h = function(a) {
                for (var b = $(".nScroll"), c = b.length - 1; c > -1; c--) b.eq(c).css({
                    overflow: "visisble"
                }), new f(b.eq(c), a);
                b.removeClass("nScroll").addClass("nScrollable")
            };
            return $(document).on("mouseup", function() {
                b.drag = null, clearInterval(d.scrollToward.interval)
            }).on("mousemove", function(a) {
                if (b.clientX = a.clientX, b.clientY = a.clientY, b.drag) {
                    var c = b.clientX - b.drag.prev_clientX,
                        d = b.clientY - b.drag.prev_clientY,
                        e = b.drag.obj,
                        f = b.drag.dir,
                        g = ("vertical" == f ? d : c) / e[f].RATIO;
                    e.scrollToward(b.drag.dir, g), b.drag.prev_clientX = b.clientX, b.drag.prev_clientY = b.clientY
                }
            }), {
                init: h
            }
        }(),
        function(a) {
            var b = function() {
                function b(a, c) {
                    return 0 == c ? a : b(c, a % c)
                }

                function c(a, c) {
                    return a / b(a, c) * c
                }
                var d = {
                        autoPlay: {
                            timeout: 1e3
                        },
                        duration: 600,
                        size: 0,
                        shifts: 2
                    },
                    e = function() {
                        var b = this.options.node;
                        this.arrow = {
                            prev: a('<span class="arrowCont prev"><em class="arrow"></em></span>'),
                            next: a('<span class="arrowCont next"><em class="arrow"></em></span>')
                        };
                        var d = a('<div class="windows"></div>');
                        b.append(this.arrow.prev, d, this.arrow.next), this.list = b.find(".list"), d.append(this.list);
                        var e = b.find(".item"),
                            f = 0;
                        if (this.options.autoPlay)
                            for (var f = c(this.options.shifts, e.length) / e.length, g = 0, h = f; h > g; g++) e.first().before(e.clone()), e.last().after(e.clone());
                        var i = {
                            width: e.outerWidth(!0),
                            height: e.outerHeight(!0)
                        };
                        this.item = i, this.windowSize = i.width * this.options.size, this.shiftRate = i.width * this.options.shifts;
                        var j = 0;
                        b.find(".item").each(function(a, b) {
                            b.style.left = j + "px", j += i.width
                        }), d.css({
                            width: this.windowSize,
                            height: i.height
                        }), this.pos = {
                            start: f * e.length
                        }, this.pos.next = this.options.autoPlay ? this.pos.start + f * e.length : e.length < this.options.size ? this.pos.start : e.length - this.options.size, this.pos.prev = this.pos.start - f * e.length
                    },
                    f = function() {
                        this.pos.scroll = this.pos.start, this.list.css({
                            left: -this.item.width * this.pos.start + "px"
                        })
                    },
                    g = function() {
                        this.pos.scroll >= this.pos.next ? this.arrow.next.addClass("disable") : this.arrow.next.removeClass("disable"), this.pos.scroll <= this.pos.prev ? this.arrow.prev.addClass("disable") : this.arrow.prev.removeClass("disable")
                    },
                    h = function() {
                        var a = this;
                        this.animation || (this.animation = !0, this.list.animate({
                            left: "-=" + this.shiftRate + "px"
                        }, this.options.duration, function() {
                            a.animation = !1, a.pos.scroll += a.options.shifts, a.options.autoPlay ? (a.pos.scroll == a.pos.next && f.call(a), setTimeout(function() {
                                a.mouseEnter || h.call(a)
                            }, a.options.autoPlay.timeout)) : g.call(a)
                        }))
                    },
                    i = function() {
                        var a = this;
                        this.animation || (this.animation = !0, this.list.animate({
                            left: "+=" + this.shiftRate + "px"
                        }, this.options.duration, function() {
                            a.animation = !1, a.pos.scroll -= a.options.shifts, a.options.autoPlay ? a.pos.scroll == a.pos.prev && f.call(a) : g.call(a)
                        }))
                    },
                    j = function() {
                        var b = this;
                        this.arrow.next.click(function() {
                            a(this).hasClass("disable") || h.call(b)
                        }), this.arrow.prev.click(function() {
                            a(this).hasClass("disable") || i.call(b)
                        }), this.options.autoPlay && this.options.node.mouseenter(function() {
                            b.mouseEnter = !0
                        }).mouseleave(function() {
                            b.mouseEnter = !1, h.call(b)
                        })
                    },
                    k = function(b) {
                        this.options = a.extend(!0, {}, d, b)
                    },
                    l = function(a) {
                        k.call(this, a), e.call(this), j.call(this), f.call(this), this.options.autoPlay ? h.call(this) : g.call(this)
                    },
                    m = function() {};
                return {
                    init: l,
                    reset_init: m
                }
            }();
            a.fn.carousel = function(b) {
                a.each(this, function(d, e) {
                    var f = null;
                    b && (b.node = a(e), f = new c(b), a(e).data("carousel", f))
                })
            };
            var c = function(a) {
                var b = a.node.data("carousel");
                b && b.reset_init(), this.init(a)
            };
            c.prototype = b
        }(jQuery);
    var tarun1 = "Jenkin-Test-1";
    $.fn.gLoader = function() {
            var a = {
                meta: {
                    obj: $(this),
                    srlW: 0
                },
                block: function() {
                    var b = a;
                    b.meta.srlW = b.scrollbarWidth(), b.appendGL(), b.styleIE7n8()
                },
                unblock: function() {
                    var b = a;
                    b.meta.obj.each(function() {
                        var a = $(this),
                            c = $(this).find("> #gL");
                        c.fadeOut({
                            complete: function() {
                                a.css({
                                    position: b.meta.obj.attr("cssProp").split(",")[0],
                                    overflow: b.meta.obj.attr("cssProp").split(",")[1]
                                }), c.remove()
                            }
                        })
                    })
                },
                appendGL: function() {
                    var b = a,
                        c = $("<div>").attr({
                            id: "gL"
                        });
                    b.meta.obj.each(function() {
                        var a = $(this),
                            d = b.objW(a),
                            e = b.objH(a);
                        if (0 === a.find("> #gL").length) {
                            var f = c.clone();
                            b.setClass(a, f), a.attr({
                                cssProp: a.css("position") + "," + a.css("overflow")
                            }), a.css({
                                position: "relative",
                                overflow: "hidden"
                            }).append(f.css({
                                width: d + b.srlW + "px",
                                height: e + "px",
                                top: b.scrollTop(a) + "px"
                            }).fadeIn()), $(window).on("resize", function() {
                                b.resize()
                            }), $(window).on("scroll", function() {
                                b.resize()
                            })
                        }
                    })
                },
                objW: function(a) {
                    return "body" == a.get(0).nodeName.toLowerCase() ? $(window).width() : $(a).outerWidth()
                },
                objH: function(a) {
                    return "body" == a.prop("tagName").toLowerCase() ? $(window).height() : $(a).outerHeight()
                },
                scrollbarWidth: function() {
                    var a, b, c;
                    return void 0 === c && (a = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"), b = a.children(), c = b.innerWidth() - b.height(99).innerWidth(), a.remove()), c
                },
                scrollTop: function(a) {
                    return "body" == a.prop("tagName").toLowerCase() ? $(window).scrollTop() : a.scrollTop()
                },
                setClass: function(b, c) {
                    var d = a,
                        e = d.objW(b),
                        f = d.objH(b),
                        g = "nLoader45";
                    e > 0 && f > 0 && (100 >= e || 100 >= f) ? g = "nLoader20" : e > 100 && f > 100 && (400 >= e || 400 >= f) && (g = "nLoader20"), c.removeClass(function(a, b) {
                        return (b.match(/gLoader\S+/g) || []).join(" ")
                    }).addClass(g)
                },
                resize: function() {
                    var b = a;
                    b.meta.obj.each(function() {
                        var a = $(this),
                            c = (b.objW(a), b.objH(a), null);
                        0 !== a.find("> #gL").length && (c = a.find("> #gL"), b.setClass(a, c), c.css({
                            width: b.objW(a) + b.srlW + "px",
                            height: b.objH(a) + "px",
                            top: b.scrollTop(a) + "px"
                        }))
                    })
                },
                styleIE7n8: function() {
                    var a = '<!--[if lt IE 9]><style type="text/css">.gLoader60,.gLoader50,.gLoader30,.gLoader15,.gLoader10{background-color:#fff; filter:alpha(opacity=80);}<![endif]-->';
                    $("head").append(a)
                }
            };
            return {
                block: a.block,
                unblock: a.unblock,
                resize: a.resize
            }
        }, $.fn.sticky = function(a) {
            function b() {
                (h || i) && (c = h ? h.inView().status : !1, d = h ? h.inView().position : "bottom", e = i ? i.inView().status : !1, f = i ? i.inView().position : "bottom"), n = "bottom" == k && (c && !e || !c && !e && "top" == d && "bottom" == f) ? !0 : "top" != k || c || "top" != d || "bottom" != f && "inside" != f ? !1 : !0, n ? (g.addClass(j), l && l.call(g)) : g.removeClass(j)
            }
            var c, d, e, f, g = $(this),
                h = a.topLimit || null,
                i = a.bottomLimit || null,
                j = (a.container || null, a["class"]),
                k = a.relatedTo || "bottom",
                l = a.callback || null,
                m = a.optElmToClick || null,
                n = !1;
            k = k.toLowerCase(), null != m && m.length > 0 && m.on("click", function() {
                setTimeout(function() {
                    b()
                }, 300)
            }), $(window).on("scroll", function() {
                b()
            }), b()
        }, $.fn.inViewCallback = function(a) {
            var b = this,
                c = a.inCallback,
                d = a.outCallback,
                e = "undefined" != typeof a.repeatInCbFlag ? a.repeatInCbFlag : !0,
                f = "undefined" != typeof a.repeatOutCbFlag ? a.repeatOutCbFlag : !0,
                g = b.attr("id"),
                h = !0,
                i = !1;
            $(window).scroll(function() {
                var a = b.inView().status;
                a != i && (i = a, i && g ? (e || (g = e), c ? c() : "") : !i && h && (f || (h = !1), d ? d() : ""))
            }), $(window).scroll()
        }, $.fn.inView = function(a) {
            var b, c, d = 0,
                e = 0,
                f = $(window),
                g = $(this),
                h = f.scrollTop(),
                i = f.scrollTop() + f.height(),
                j = g.length ? g.offset().top + g.outerHeight() : null;
            return a && (d = a.topOff || 0, e = a.bottomOff || 0), c = h > j + e ? "top" : j - d > i ? "bottom" : "inside", b = i >= j - d && j + e >= h ? !0 : !1, {
                status: b,
                position: c
            }
        },
        function(a) {
            a.fn.accordion = function(b) {
                function c(a) {
                    a.removeClass(b.icons.header).addClass(b.icons.activeHeader).next().slideDown(b.showHideSpeed, b.completeAnimation()).data("openState", 1).removeClass("close").addClass("open"), b.onClick ? b.onClick() : b.callBack ? b.callBack(a, "expand") : ""
                }

                function d(a) {
                    a.removeClass(b.icons.activeHeader).addClass(b.icons.header).next().slideUp(b.showHideSpeed, b.completeAnimation()).data("openState", 0).removeClass("open").addClass("close"), b.onClick ? b.onClick() : b.callBack ? b.callBack(a, "collapse") : ""
                }

                function e(b, e, f) {
                    b.each(function(b) {
                        -1 === a.inArray(b, e) && e.length || ("collapse" == f ? d(a(this)) : (k = a(this).next(), c(a(this))))
                    })
                }

                function f(a, b, c) {
                    b || 0 === b ? "object" == typeof b ? e(a.find(".acord_head"), b, c) : e(a.find(".acord_head"), [b], c) : e(a.find(".acord_head"), [], c)
                }

                function g(a) {
                    var e = (a.find("span"), a.next());
                    b.collapsible && !b.previousOpen ? e.data("openState") ? d(e.prev()) : (k.length && k.data("openState") && d(k.prev()), k = e, c(e.prev())) : b.collapsible && b.previousOpen ? e.data("openState") ? d(e.prev()) : c(e.prev()) : e.data("openState") || (k && d(k.prev()), k = e, c(e.prev()))
                }

                function h(c, d) {
                    "disable" == d ? c.addClass("disable").off(b.openEvent) : "enable" == d && c.removeClass("disable").on(b.openEvent, function() {
                        g(a(this))
                    })
                }

                function i(b, c, d) {
                    c || 0 === c ? "[object Array]" == Object.prototype.toString.call(c) ? c.length ? b.each(function(b) {
                        -1 != a.inArray(b, c) && h(a(this), d)
                    }) : h(b, d) : h(b.eq(c), d) : h(b, d)
                }
                var j = {
                    active: 0,
                    completeAnimation: function() {},
                    showHideSpeed: "fast",
                    openEvent: "click",
                    icons: {
                        header: "acordUp",
                        activeHeader: "acordDown"
                    }
                };
                b && b.active === !1 ? b.active = "false" : b && b.active && !b.active.length && (b.active = 0), b && b.disabled === !0 && (b.disabled = []);
                var k, b = a.fn.extend({}, j, b);
                return this.each(function() {
                    var c = a(this).find(".acord_head");
                    b.disabled ? i(c, b.disabled, "disable") : a(this).on(b.openEvent, ".acord_head", function() {
                        g(a(this))
                    }), c.each(function() {
                        a(this).addClass(b.icons.header).prepend('<span class="icon"></span>').next().addClass("close")
                    }), b.openAll ? e(c, [], "expand") : "false" != b.active && ("object" == typeof b.active ? e(c, b.active, "expand") : e(c, [b.active], "expand"))
                }), this.expand = function(b) {
                    f(a(this), b, "expand")
                }, this.collapse = function(b) {
                    f(a(this), b, "collapse")
                }, this.disabled = function(b) {
                    i(a(this).find(".acord_head"), b, "disable")
                }, this.enabled = function(b) {
                    i(a(this).find(".acord_head"), b, "enable")
                }, this
            }
        }(jQuery), profileCompleteness(), $(function() {
            function a() {
                d.validate({
                    formNames: ["loginForm"],
                    errors: common_ErrorList,
                    styles: {
                        errorClass: "err",
                        okClass: "ok",
                        softMandClass: "softMand",
                        parentObjectClass: "row",
                        maxLevel: 2
                    },
                    defaultEvents: ["blur"]
                })
            }

            function b(b, c) {
                switch ($("#lgnFrm input[name=pword]").attr("type", "text"), $("#lgnFrm .err").removeClass("err"), $("#uSel_Hid").val($("#logSel a").eq(0).attr("data-value")), b) {
                    case "reset":
                    case "setEmail":
                        $("#logActL").css({
                            left: "0px"
                        }), $("#logSel a").removeClass("act").eq(0).addClass("act"), $("#eRow").show(), $("#eLogin").val(c ? c : ""), d.showElement(["eLogin"]), $("#uRow").hide(), $("#uLogin").val(""), d.hideElement(["uLogin"]), $("#loginLB .ltGlobalTtl").html("Jobseeker login");
                        break;
                    case "setUser":
                        $("#logActL").css({
                            left: "50%"
                        }), $("#logSel a").removeClass("act").eq(1).addClass("act"), $("#uRow").show(), $("#uLogin").val(c), d.showElement(["uLogin"]), $("#eRow").hide(), $("#eLogin").val(""), d.hideElement(["eLogin"]), $("#loginLB .ltGlobalTtl").html("Jobseeker login")
                }
                a(), $("#fLogin_err").hide()
            }
            var c = {
                ltBox: $("#loginLB"),
                resetForm: !0,
                dimens: {
                    width: "700px"
                },
                open: {
                    success: function() {
                        "function" == typeof loginSuccessCallback && loginSuccessCallback()
                    },
                    event: "click",
                    anim: {
                        className: "flipOpen"
                    }
                },
                close: {
                    success: function() {
                        b("reset")
                    },
                    nodes: $("#loginLB .ltGlobalCls"),
                    anim: {
                        className: "flipClose",
                        duration: 300
                    },
                    returnFocus: !1
                }
            };
            $("#login_Layer").click(function(a) {
                a.preventDefault()
            }), $("#login_Layer").lightBox(c), $("#lgnFrm").submit(function() {
                $("#lgnUsername").val(1 == $("#uSel_Hid").val() ? $("#eLogin").val() : $("#uLogin").val())
            });
            var d = new commonValidator;
            $('[name="loginForm"]').length && a(), d.hideElement(["uLogin"]), $("#lgnFrm input[name=pword]").on("focus", function() {
                $(this).attr("type", "password")
            }), $("#lgnFrm input[name=pword]").on("blur", function() {
                "" === $.trim($(this).val()) && $(this).attr("type", "text")
            }), $("#lgnFrm").submit(function() {
                setTimeout(function() {
                    processLogin({
                        method: "processLogin",
                        status: 2,
                        message: null
                    })
                }, 1e4)
            }), $("#logSel a").on("click", function() {
                var a = $(this);
                $("#lgnFrm .err").removeClass("err"), a.siblings().removeClass("act"), a.addClass("act"), "eSel" == a.attr("id") ? ($("#eRow").show(), d.showElement(["eLogin"]), $("#uRow").hide(), d.hideElement(["uLogin"]), $("#logActL").css({
                    left: "0%"
                })) : "uSel" == a.attr("id") && ($("#uRow").show(), d.showElement(["uLogin"]), $("#eRow").hide(), d.hideElement(["eLogin"]), $("#logActL").css({
                    left: "50%"
                })), $("#uSel_Hid").val(a.attr("data-value"))
            })
        });
    var loginSuccessCallback = null;
	$('h1').append('plugins.js loaded');    
})
