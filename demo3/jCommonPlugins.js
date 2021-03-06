function getSelectedJobIds() {
    for (var a = "", b = $(".jobType"), c = 0; c < b.length; c++) {
        var d = b.eq(c)[0],
            e = d.id;
        $("#" + e).hasClass("checked") && (a += $("#" + e).attr("data") + ",")
    }
    return a.substring(0, a.length - 1)
}

function bindImsCall(a, b) {
    if (preventMultipleBinding) {
        var c = window.imsParams + "&jobid=" + a,
            d = window.imsUrl;
        ims().init({
            trigger: {
                selector: "#trig2",
                on: "click",
                loader: {
                    auto: "#trig2"
                }
            },
            url: d,
            postData: c,
            requestTimeout: 5e3,
            disableCloseByLayer: !0,
            disableCloseByEsc: !0,
            requestSuccess: function() {
                preventMultipleBinding = !1, b.html("Apply"), _gaq.push(["_trackEvent", "MultipleApply", "Multiple Apply Desktop", "Multiple Apply On Jobsearch"])
            },
            requestFail: function(a) {
                preventMultipleBinding = !1, b.html("Apply"), $.fn.lightBox.closeAll(), $("body").append('<div id="imsLBMain1" class="ltBx lightbox"></div>');
                var c = '<h2 class="expBox">Error processing request</h2><a id="closeLBExp" class="ltGlobalCls expClose" href="javascript:$.fn.lightBox.closeAll()">&nbsp;</a> <p id="data" class="lbCnt1 expTxt">There was some error processing your request. Please try again later.</p>';
                $("#imsLBMain1").html(c);
                var d = {
                    ltBox: $("#imsLBMain1"),
                    resetForm: !0,
                    layer: !1,
                    dimens: {
                        width: "700px"
                    },
                    open: {
                        success: function() {},
                        event: "click",
                        anim: {
                            className: "flipOpen"
                        }
                    },
                    close: {
                        nodes: {
                            target: "#imsLBMain1",
                            selector: "#closeLBExp"
                        },
                        layer: !0,
                        anim: {
                            className: "flipClose",
                            duration: 300
                        },
                        success: function() {
                            ims.lbOpened = !1, $("#imsLBMain1").remove()
                        }
                    }
                };
                $("<div>").lightBox(d).open()
            },
            crossDomain: window.crossDomainParams,
            autoInvoke: !0
        })
    }
}

function emailValid(a) {
    var b = $.trim(a),
        c = new RegExp(/^([a-zA-Z0-9_\-])+(\.([a-zA-Z0-9_\-])+)*@((\[(((([0-1])?([0-9])?[0-9])|(2[0-4][0-9])|(2[0-5][0-5])))\.(((([0-1])?([0-9])?[0-9])|(2[0-4][0-9])|(2[0-5][0-5])))\.(((([0-1])?([0-9])?[0-9])|(2[0-4][0-9])|(2[0-5][0-5])))\.(((([0-1])?([0-9])?[0-9])|(2[0-4][0-9])|(2[0-5][0-5]))\]))|((([a-zA-Z0-9])+(([\-])+([a-zA-Z0-9])+)*\.)+([a-zA-Z])+(([\-])+([a-zA-Z0-9])+)*))$/),
        d = b.split("@"),
        e = !0;
    return !d[1] || "naukri.com" != d[1].toLowerCase() && "naukari.com" != d[1].toLowerCase() && "n.com" != d[1].toLowerCase() && "nakuri.com" != d[1].toLowerCase() && "nokari.com" != d[1].toLowerCase() && "nokri.com" != d[1].toLowerCase() && "nou kri.com" != d[1].toLowerCase() && "noukari.com" != d[1].toLowerCase() && "noukri.com" != d[1].toLowerCase() && "nukri.com" != d[1].toLowerCase() && "indiatimes.com" != d[1].toLowerCase() || (e = !1), b ? c.test(b) && b.length > 6 && b.length <= 100 && e : !1
}

function getRecentSearchArray(a, b) {
    var c = [],
        d = b ? getCookie(a + "[" + b + "]") : "";
    return "" !== d && "undefined" !== d && (c = $.parseJSON(d)), c
}

function getSection() {
    return $('[name="qsb_section"]', qsbFormObj).val()
}

function init_saveJob(a) {
    $(".fav:not(.favReady)").on("click", function() {
        var b, c = $(this);
        if (b = c.hasClass("act") ? urlDeleteSavedJob : urlSaveJob, isLoginRequired) c.attr("jid") && (b += "&file=" + c.attr("jid")), openLoginBox({
            successCallback: function() {
                window.saveJobRedirectUrl = b
            }
        });
        else {
            c.attr("jid") && (b += "?file=" + c.attr("jid"));
            var d = {
                    type: "GET",
                    url: b,
                    timeout: 3e4,
                    beforeSend: function() {
                        c.toggleClass("act")
                    },
                    success: function(a) {},
                    error: function() {
                        c.toggleClass("act")
                    }
                },
                e = {};
            1 == a && (e = {
                dataType: "jsonp",
                jsonpCallback: "ajaxCallback"
            }), $.extend(d, e), $.ajax(d)
        }
    }), $(".fav").addClass("favReady")
}

function loginCallBack(a) {
    var b = urlSaveJob;
    return $.ajax({
        type: "GET",
        url: b,
        timeout: 3e4,
        beforeSend: function() {
            a.toggleClass("act")
        },
        success: function(a) {
            successAjaxSavedJob = 1
        },
        error: function() {
            a.toggleClass("act")
        }
    }), !0
}

function afterLogin(a) {}

function follow() {
    var a = {
        init: function(b) {
            var c = a;
            if (c.sel = b.selector || ".followBtn", c.evt = b.event || "click", c.lStatus = b.loginStatus && "" == window.rembered || null, c.fBtns = b.followingButtons || null, c.hfAPI = b.hitFollowAPI || null, c.actURL = b.actionURL, c.undURL = b.undoURL, c.cB = b.callBack || null, c.fBtns && c.fBtns.length > 0)
                for (var d = 0; d < c.fBtns.length; d++) c.hfAPI || c.toggleFollowButton($("#" + c.fBtns[d]), !0, {
                    FollowResponse: {
                        succeed: 1
                    },
                    FollowerCount: {
                        succeed: 1
                    }
                });
            c.bindEvent()
        },
        bindEvent: function() {
            var b = a;
            $(b.sel).on(b.evt, function() {
                var a = $(this),
                    c = b.actURL;
                isLoginRequired ? openLoginBox({
                    successCallback: function() {
                        followRedirectUrl = c
                    }
                }) : (a.hasClass("act") && (c = b.undURL), a.attr("rid") && (c += "?rid=" + a.attr("rid")), b.followAjaxCall(a, c, !0))
            })
        },
        toggleFollowButton: function(a, b, c) {
            c && c.FollowResponse.succeed && c.FollowerCount.succeed && (a.hasClass("act") ? (a.removeClass("act").html("Follow"), a.off("mouseover focus mouseout blur")) : (a.addClass("act").html("Unfollow"), b && a.html("Following"), a.on("mouseover focus", function() {
                $(this).html("Unfollow")
            }), a.on("mouseout blur", function() {
                $(this).html("Following")
            })))
        },
        followAjaxCall: function(b, c, d) {
            var e = a;
            $.ajax({
                dataType: "jsonp",
                url: c,
                timeout: 3e4,
                beforeSend: function() {
                    b.gLoader().block()
                },
                success: function(a) {
                    e.toggleFollowButton(b, d, a), e.cB(a)
                },
                error: function() {
                    e.cB({
                        ERROR: "AJAX_FAIL"
                    })
                },
                complete: function() {
                    b.gLoader().unblock()
                }
            })
        }
    };
    return {
        init: a.init
    }
}

function setTrackingforPosZero(a, b, c) {
    var d = $.trim(b.val());
    if (a.length && !$.trim(a.val()) && d) {
        var e = {
            tObject: [{
                text: d,
                pos: 0
            }],
            sourceId: c
        };
        a.val($.stringify(e))
    }
}

function applyProcessLogin(a) {
    var b = a.status;
    1 == b ? window.location.href = global.layers.loginLayer.data.applyUrl : processLogin(a)
}

function jsProcessLogin(a) {
    var b = a.status;
    1 == b ? 1 == global.layers.loginLayer.data.showLB ? -1 === document.location.href.indexOf("?") ? document.location.href = document.location.href + "?showLB=1" : document.location.href = document.location.href + "&showLB=1" : window.followRedirectUrl ? document.location.href = window.followRedirectUrl : window.saveJobRedirectUrl ? document.location.href = window.saveJobRedirectUrl : 1 == a.fnu ? document.location.href = global.mynaukricompleteprofileurl : processLogin(a) : processLogin(a), global.layers.loginLayer.data.showLB = 0
}

function wrapJsProcessLogin(a) {
    a.reloadToMNJ = 1, global.layers.loginLayer.data.callBack = wrapJsProcessLoginCallback, jsProcessLogin(a)
}

function wrapJsProcessLoginCallback(a) {
    1 == a.reloadToMNJ && (document.location.href = global.mynaukrihomeUrl)
}

function handlePZeroForm(a, b, c) {
    a.gLoader().block(), $.ajax({
        type: "GET",
        url: b,
        data: {
            email: c
        },
        dataType: "json"
    }).done(function(b) {
        a.gLoader().unblock(), "yes" === b.response ? (openLoginBox(), $("#eLogin").val(b.email), $(".ltGlobalTtl").html(b.msg)) : "no" === b.response && a[0].submit()
    })
}

function getRandomArbitrary(a, b) {
    return Math.random() * (b - a) + a
}

function createTags(a, b, c) {
    c = c || {};
    var d = global.refres[b],
        e = $('<div class="tagCloud ' + b + '"></div>'),
        f = "";
    if (c.selected) {
        var g = $.inArray(c.selected, d);
        d.splice(g, 1), f += '<a href="javascript:;" class="tagSelected">' + c.selected + "</a>"
    }
    a.append(e);
    var h = parseInt(getRandomArbitrary(0, d.length));
    c.count = !c.count || c.count > d.length ? d.length : c.count, end = h + c.count;
    for (var i = h, j = d.length; i < end; i++) {
        var k = global.searchUrl;
        if (k = "premmba" == premType ? global.premium.mbaUrl : global.premium.enggUrl, k += "-in-" + catUrlMap[b], k = k.toLowerCase(), k += "?qpremTag=" + b + "&qpremTagLabel=" + encodeURIComponent(d[i % j]) + "&premType=" + premType, "premengg" == premType) var l = "Engg jobs in " + d[i % j];
        else var l = "MBA jobs in " + d[i % j];
        f += '<a target="_blank" title="' + l + '" href="' + k + '">' + d[i % j] + "</a>"
    }
    e.append(f)
}

function init_checkBoxSrpTuple() {
    var a = $("form[name=multiRecoJobApply]");
    if (a.length) {
        var b = ($(".srp_head"), []);
        a.submit(function(a) {
            this.jobs_recomm_hidden.value = b.toString()
        }), $(".srp_container .jobType.unchecked").click(function() {
            var a = $(this);
            if (a.hasClass("checked") || 5 != b.length) {
                var c = a.attr("data");
                if (a.toggleClass("checked"), a.hasClass("checked")) b.push(c);
                else {
                    var d = b.indexOf(c); - 1 != d && b.splice(d, 1)
                }
            }
        })
    }
}

function zd_get_placements() {
    var a, b = zedoParam.customParam.split("^"),
        c = zmt_get_tag(zedoParam.naukriId, zedoParam.pageId),
        d = $("[zedoSlot]"),
        e = 0;
    for (var f in zedoParam.banners) {
        d.eq(e++).attr("id", zedoParam.banners[f].bannerId), window["inst" + f] = c.zmt_get_placement(zedoParam.banners[f].bannerId, zedoParam.banners[f].pageId, zedoParam.banners[f].position, zedoParam.banners[f].channelId, zedoParam.banners[f].sizeId, zedoParam.banners[f].flag, zedoParam.banners[f].width, zedoParam.banners[f].height);
        for (var g in b) "gc" === b[g].split(":")[0] ? a = b[g].split(":")[1].replace(/\'/g, "") : window["inst" + f]["zmt_add_" + $.trim(b[g].split(":")[0])](b[g].split(":")[1].replace(/\'/g, ""))
    }
    c.zmt_set_geo(a), c.zmt_set_async(), c.zmt_load(c), $("#zt_75638_2").sticky({
        topLimit: $("#zt_75638_2").prev(),
        "class": "sticky",
        relatedTo: "top",
        bottomLimit: $(".container>.srp_container .row").eq(-3)
    })
}

function iframe_callback(a) {
    if (void 0 !== a) {
        var b = a.data ? a.data : a;
        if (void 0 !== b.callbackKey) {
            var c = b.method;
            try {
                window[c](b)
            } catch (d) {
                throw Error("iframe_callback: error calling - " + c)
            }
        }
    }
}

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

function applyBtnAction(a) {
    parseInt(a) ? ($("#trig2").show(), $("body").on("click", "#trig2", function(a) {
        if ($(".jobType.checked").length) {
            var b = getSelectedJobIds();
            b && bindImsCall(b, $("#trig2"))
        } else {
            $(this).off("click");
            var c = $("#applyErrCont");
            c.addClass("red").find(".cnt").html("Please select job(s) to apply"), $("body,html").animate({
                scrollTop: c.position().top
            }, "500", "swing", function() {
                c.css({
                    marginBottom: "10px"
                }).slideDown()
            }), setTimeout(function() {
                c.slideUp()
            }, 5e3)
        }
    })) : $("#trig2").parent().next(".regular").html("Similar jobs for you.")
}
var _gaq = _gaq || [],
    preventMultipleBinding = !0;
window.global || (window.global = {}), global.dd = {}, global.dd.indDD = {
    8: "Accounting , Finance",
    32: "Advertising , PR , MR , Event Management",
    33: "Agriculture , Dairy",
    56: "Animation , Gaming",
    30: "Architecture , Interior Design",
    4: "Automobile , Auto Anciliary , Auto Components",
    46: "Aviation , Aerospace Firms",
    14: "Banking , Financial Services , Broking",
    7: "BPO , Call Centre , ITES",
    50: "Brewery , Distillery",
    65: "Broadcasting",
    60: "Ceramics , Sanitary ware",
    6: "Chemicals , PetroChemical , Plastic , Rubber",
    12: "Construction , Engineering , Cement , Metals",
    10: "Consumer Electronics , Appliances , Durables",
    18: "Courier , Transportation , Freight , Warehousing",
    26: "Education , Teaching , Training",
    55: "Electricals , Switchgears",
    13: "Export , Import",
    47: "Facility Management",
    41: "Fertilizers , Pesticides",
    9: "FMCG , Foods , Beverage",
    57: "Food Processing",
    31: "Fresher , Trainee , Entry Level",
    35: "Gems , Jewellery",
    49: "Glass , Glassware",
    42: "Government , Defence",
    61: "Heat Ventilation , Air Conditioning",
    16: "Industrial Products , Heavy Machinery",
    17: "Insurance",
    53: "Iron and Steel",
    15: "IT-Hardware & Networking",
    25: "IT-Software , Software Services",
    48: "KPO , Research , Analytics",
    36: "Legal",
    19: "Media , Entertainment , Internet",
    63: "Internet , Ecommerce",
    66: "Leather",
    20: "Medical , Healthcare , Hospitals",
    54: "Mining , Quarrying",
    37: "NGO , Social Services , Regulators , Industry Associations",
    21: "Office Equipment , Automation",
    23: "Oil and Gas , Energy , Power , Infrastructure",
    43: "Pulp and Paper",
    22: "Pharma , Biotech , Clinical Research",
    38: "Printing , Packaging",
    58: "Publishing",
    39: "Real Estate , Property",
    34: "Recruitment , Staffing",
    24: "Retail , Wholesale",
    40: "Security , Law Enforcement",
    28: "Semiconductors , Electronics",
    44: "Shipping , Marine",
    52: "Strategy , Management Consulting Firms",
    64: "Sugar",
    27: "Telecom,ISP",
    3: "Textiles , Garments , Accessories",
    2: "Travel , Hotels , Restaurants , Airlines , Railways",
    45: "Tyres",
    51: "Water Treatment , Waste Management",
    59: "Wellness , Fitness , Sports",
    29: "Other"
}, global.dd.fareaDD = {
    0: "Select",
    1: "Accounts, Finance, Tax, Company Secretary, Audit",
    2: "Architecture, Interior Design",
    3: "Design, Creative, User Experience",
    4: "Hotels, Restaurants",
    5: "Journalism, Editing, Content",
    6: "Financial Services, Banking, Investments, Insurance",
    7: "Strategy, Management Consulting, Corporate Planning",
    8: "ITES, BPO, KPO, LPO, Customer Service, Operations",
    9: "Self Employed, Entrepreneur, Independent Consultant",
    10: "Export, Import, Merchandising",
    11: "Executive Assistant, Front Office, Data Entry",
    12: "HR, Recruitment, Administration, IR",
    13: "Legal, Regulatory, Intellectual Property",
    14: "Supply Chain, Logistics, Purchase, Materials",
    15: "Marketing, Advertising, MR, PR, Media Planning",
    16: "Medical, Healthcare, R&D, Pharmaceuticals, Biotechnology",
    18: "Packaging",
    19: "Production, Manufacturing, Maintenance",
    20: "Site Engineering, Project Management",
    21: "Engineering Design, R&D",
    22: "Sales, Retail, Business Development",
    24: "IT Software - All Jobs",
    24.01: "Application Programming, Maintenance",
    24.02: "Client/Server Programming",
    24.03: "DBA, Datawarehousing",
    24.04: "ERP, CRM",
    24.05: "Embedded, EDA, VLSI, ASIC, Chip Design",
    24.06: "Network Administration, Security",
    24.07: "IT Software - Other",
    24.08: "QA & Testing",
    24.09: "System Programming",
    "24.10": "Telecom Software",
    24.11: "Systems, EDP, MIS",
    24.12: "eCommerce, Internet Technologies",
    24.13: "Mainframe",
    24.14: "Mobile",
    24.15: "Middleware",
    catid_1: "Top Management - Non IT Jobs",
    catid_2: "Top Management - IT Jobs",
    catid_22: "Freshers",
    catid_28: "Government, Defence",
    catid_29: "Overseas, International Jobs",
    catid_31: "Pharma, Biotechnology, Clinical Research",
    catid_57: "Retail, Wholesale",
    36: "Teaching, Education, Training, Counselling",
    37: "IT Hardware, Technical Support, Telecom Engineering",
    41: "Other",
    42: "Fashion Designing, Merchandising",
    43: "TV, Films, Production, Broadcasting",
    44: "Travel, Tours, Ticketing, Airlines",
    45: "Defence Forces, Security Services",
    81: "Analytics & Business Intelligence",
    82: "Shipping"
}, global.dd.roleDD = {
    1.01: "Accounts Executive/Accountant",
    1.02: "Cost Accountant",
    1.03: "Taxation(Direct) Manager",
    1.04: "Taxation(Indirect) Manager",
    1.05: "Accounts Manager",
    1.06: "Financial Accountant",
    1.07: "ICWA",
    1.08: "Chartered Accountant",
    1.09: "Finance Executive",
    "1.10": "Credit/Control Executive",
    1.11: "Investor Relationship-Executive/Manager",
    1.12: "Credit/Control Manager",
    1.13: "Financial Analyst",
    1.14: "Audit Manager",
    1.15: "Forex Manager",
    1.16: "Treasury Manager",
    1.17: "Finance/Budgeting Manager",
    1.18: "Head/VP/GM-Finance/Audit",
    1.19: "Head/VP/GM-Accounts",
    "1.20": "Head/VP/GM-CFO/Financial Controller",
    1.21: "Head/VP/GM-Regulatory Affairs",
    1.22: "Company Secretary",
    1.23: "Outside Consultant",
    1.24: "Fresher",
    1.26: "Trainee",
    2.01: "Architect",
    2.02: "Draughtsman",
    2.03: "Project Architect",
    2.04: "Naval Architect",
    2.05: "Landscape Architect",
    2.06: "Town Planner",
    2.08: "Interior Designer",
    2.09: "Outside Consultant",
    "2.10": "Fresher",
    2.12: "Trainee",
    3.01: "Art Director/Senior Art Director",
    3.02: "Visualiser",
    3.03: "Web Designer",
    3.04: "Copywriter",
    3.05: "Graphic Designer",
    3.06: "Creative Director",
    3.07: "National Creative Director/VP-Creative",
    3.08: "Commercial Artist",
    "3.10": "Fresher",
    3.11: "Trainee",
    4.01: "Bartender",
    4.02: "Commis",
    4.03: "Steward",
    4.04: "Captain",
    4.05: "Host/Hostess",
    4.06: "Butler",
    4.07: "Chef De Partis",
    4.08: "Executive Sous Chef/Chef De Cuisine",
    4.09: "Sous Chef",
    "4.10": "Banquet Sales Executive/ Manager",
    4.11: "Restaurant Manager",
    4.12: "F&B Manager",
    4.13: "General Manager",
    4.14: "Housekeeping Executive/Assistant.",
    4.15: "Housekeeping Manager",
    4.16: "Cashier",
    4.17: "Front Office/Guest Relations Executive/Manager",
    4.18: "Travel Desk Manager",
    4.19: "Lobby/Duty Manager",
    4.21: "Executive/Master Chef",
    4.22: "Head/VP/GM-F&B",
    4.23: "Head/VP/GM/National Manager-Sales",
    4.24: "Head/VP-Public Relations/Corporate Communication",
    4.25: "Head/VP/GM-Accounts",
    4.26: "CEO/MD/Director",
    4.27: "Health Club Assistant./Manager",
    4.28: "Masseur",
    4.31: "Fresher",
    4.32: "Trainee",
    5.01: "Content Developer",
    5.02: "Freelance Journalist",
    5.03: "Business Content Developer",
    5.04: "Fashion Content Developer",
    5.05: "Features Content Developer",
    5.06: "International Business Content Developer",
    5.07: "IT/Technical Content Developer",
    5.08: "Sports Content Developer",
    5.09: "Political Content Developer",
    "5.10": "Journalist",
    5.11: "Sub Editor/Reporter",
    5.12: "Senior Sub Editor/Senior Reporter",
    5.13: "Correspondent/Assistant Editor/Associate Editor",
    5.14: "Principal Correspondent/Features Writer/Resident Writer",
    5.15: "Chief of Bureau/Editor in Chief",
    5.16: "Investigative Journalist",
    5.17: "Proof Reader",
    5.18: "Business Editor",
    5.19: "Fashion Editor",
    "5.20": "Features Editor",
    5.21: "International Business Editor",
    5.22: "IT/Technical Editor",
    5.23: "Managing Editor",
    5.24: "Sports Editor",
    5.25: "Political Editor",
    5.27: "Trainee",
    5.28: "Fresher",
    6.01: "Customer Service Executive",
    6.02: "Customer Service Manager",
    6.03: "Collections Officer",
    6.04: "Collections Manager",
    6.05: "CRM/Phone/Internet Banking Executive",
    6.06: "Sales Officer",
    6.07: "Credit Officer",
    6.08: "Branch Manager",
    6.09: "Regional Manager",
    "6.10": "National Head",
    6.11: "Asset Operations/Documentation-Executive/Manager",
    6.12: "Domestic Private Banking-Executive/Manager",
    6.13: "Product Manager-Auto/Home Loans",
    6.14: "Cards-Sales Officer/Executive",
    6.15: "Cards-Operations Executive",
    6.16: "Cards-Operations Manager",
    6.17: "Collections Executive",
    6.18: "Card Approvals Officer",
    6.19: "Merchant Acquisition Executive",
    "6.20": "Business Alliances Manager",
    6.21: "Product Manager-Cards",
    6.22: "Back Office Executive",
    6.23: "Money Markets Dealer",
    6.24: "Forex Dealer",
    6.25: "Sales/Business Development Manager-Forex",
    6.26: "Forex Operations Manager",
    6.27: "Debt Instrument Dealer",
    6.28: "Sales/Business Development Manager-Debt Instruments",
    6.29: "Debt Operations Manager",
    "6.30": "Derivatives Dealer",
    6.31: "Sales/Business Development Manager-Derivatives",
    6.32: "Treasury Operations Manager",
    6.33: "Clearing Officer",
    6.34: "Cash Officer",
    6.35: "Operations Officer",
    6.36: "Operations Manager",
    6.37: "Depository Services-Executive/Manager",
    6.38: "Legal Officer",
    6.39: "Legal Manager",
    "6.40": "Operations Manager",
    6.41: "Trade Finance Operations Manager",
    6.42: "Technology Manager",
    6.43: "ATM Operations Manager",
    6.44: "Audit Manager",
    6.45: "Finance/Budgeting Manager",
    6.46: "Relationship Executive",
    6.47: "Client Servicing/Key Account Manager",
    6.48: "Credit Analyst-Corporate Banking",
    6.49: "Credit Manager-Corporate Banking",
    "6.50": "Bad Debts/Workouts Manager",
    6.52: "Debt Analyst",
    6.53: "Mergers & Acquisitions Analyst",
    6.54: "Equity Analyst",
    6.55: "Equity Manager",
    6.56: "Domestic Debt Manager",
    6.57: "Offshore Debt Manager",
    6.58: "Mergers & Acquisitions Manager",
    6.59: "Corporate Advisory Manager",
    "6.60": "Project Finance Manager",
    6.61: "Issues/IPO Manager",
    6.62: "Legal Officer",
    6.63: "Legal Manager",
    6.64: "Insurance Analyst",
    6.65: "Actuary Manager",
    6.66: "Underwriter",
    6.67: "Insurance Advisor",
    6.68: "Unit Manager",
    6.69: "Sales/Business Development-Manager",
    "6.70": "Branch Manager",
    6.71: "Product Manager",
    6.72: "Sales Head",
    6.73: "Regional Manager",
    6.74: "Legal Officer",
    6.75: "Legal Manager",
    6.77: "Insurance Analyst",
    6.78: "Actuary Manager",
    6.79: "Underwriter",
    "6.80": "Head-Underwriting",
    6.81: "Insurance Advisor",
    6.82: "Unit Manager",
    6.83: "Sales/Business Development-Manager",
    6.84: "Branch Manager",
    6.85: "Product Manager",
    6.86: "Sales Head",
    6.87: "Regional Manager",
    6.88: "Legal Officer",
    6.89: "Legal Manager",
    "6.90": "Banc Assurance",
    6.91: "Insurance Operations Officer",
    6.92: "Insurance Operations Manager",
    6.93: "CRM/Customer Service Executive",
    6.94: "CRM/Customer Service Manager",
    6.95: "Claims Executive",
    6.96: "Claims Manager",
    6.97: "Investment/Treasury Manager",
    "6.100": "Sales/Business Development Manager-Broking",
    6.98: "Analyst",
    6.99: "Broker/Trader",
    6.101: "Sales Executive/Investment Advisor",
    6.102: "Sales/Business Development Manager",
    6.103: "Marketing Manager",
    6.104: "Portfolio Manager",
    6.105: "Analyst",
    6.106: "CRM/Customer Service Executive",
    6.107: "CRM/Customer Service Manager",
    6.108: "Operations Executive",
    6.109: "Operations Manager",
    "6.110": "Fund Manager-Debt",
    6.111: "Fund Manager-Equity",
    6.112: "Private Equity/Hedge Fund/VC-Manager",
    6.113: "Head/VP/GM-Treasury",
    6.114: "Head/VP/GM-Legal",
    6.115: "Head/VP/GM-Operations",
    6.116: "Head/VP/GM-CFO/Financial Controller",
    6.117: "Head/VP/GM-Depository Services",
    6.118: "Head/VP/GM-Relationships",
    6.119: "Head/VP/GM-Credit Risk",
    "6.120": "Head/VP/GM-Equity",
    6.121: "Head/VP/GM-Domestic/Offshore Debt",
    6.122: "Head/VP/GM-Mergers & Acquisitions",
    6.123: "Head/VP/GM-Corporate Advisory",
    6.124: "Head/VP/GM-Project Finance",
    6.125: "Head/VP/GM-Investment Banking",
    6.126: "Head/VP/GM-Underwriting",
    6.127: "Head/VP/GM-Marketing",
    6.128: "Head/VP/GM-Insurance Operations",
    6.129: "Head/VP/GM-Claims",
    "6.130": "Head/VP/GM-Sales",
    6.131: "Head/VP/GM-Fund Management",
    6.132: "Head/VP/GM-Private Equity/Hedge Fund/VC",
    6.133: "Head/VP/GM-Broking",
    7.01: "Outside Consultant",
    7.02: "Senior Outside Consultant",
    7.03: "Corporate Planning/Strategy Manager",
    7.04: "Research Associate",
    7.05: "Business Analyst",
    7.06: "EA to Chairman/President/VP",
    7.07: "Head/VP/GM-Corporate Planning/Strategy",
    7.08: "VP/Principal/Partner",
    7.09: "CEO/MD/Director",
    7.11: "Trainees",
    7.12: "Freshers",
    8.01: "Associate/Senior Associate -(NonTechnical)",
    8.02: "Associate/Senior Associate -(Technical)",
    8.03: "Team Leader -(NonTechnical)",
    8.04: "Team Leader -(Technical)",
    8.05: "Assistant Manager/Manager -(NonTechnical)",
    8.06: "Assistant Manager/Manager-(Technical)",
    8.07: "Telecalling/Telemarketing Executive",
    8.08: "Associate/Senior Associate -(NonTechnical)",
    8.09: "Associate/Senior Associate -(Technical)",
    "8.10": "Team Leader -(NonTechnical)",
    8.11: "Team Leader -(Technical)",
    8.12: "Assistant Manager/Manager -(Technical)",
    8.13: "Assistant Manager/Manager-(NonTechnical)",
    8.14: "Process Flow Analyst",
    8.15: "Business/EDP Analyst",
    8.16: "Business Development Manager",
    8.17: "Transitions/Migrations Manager",
    8.18: "Operations Manager",
    8.19: "Infrastructure & Technology Manager",
    "8.20": "Dialer Manager",
    8.21: "Technical/Process Trainer",
    8.22: "Voice & Accent Trainer",
    8.23: "Soft Skills Trainer",
    8.24: "Quality Assurance/Quality Control Executive",
    8.25: "Quality Assurance/Quality Control Manager",
    8.26: "Quality Coach",
    8.27: "Team Leader-Quality Assurance/Quality Control",
    8.28: "Head/VP/GM-Operations",
    8.29: "Head/VP/GM-Training & Development",
    "8.30": "Head/VP/GM-Transitions",
    8.31: "Service Delivery Leader",
    8.32: "Head/VP/GM-Quality Assurance & Quality Control",
    8.33: "Medical Transcriptionist",
    8.34: "Fresher",
    8.35: "Trainee",
    8.36: "Outside Consultant",
    9.01: "CEO/MD/Director",
    9.02: "Outside Consultant",
    9.03: "Director",
    9.04: "VP/President/Partner",
    10.01: "Documentation/Shipping-Executive/Manager",
    10.02: "Production Executive",
    10.03: "Purchase Officer",
    10.04: "Floor Manager",
    10.05: "Production Manager",
    10.06: "Merchandiser",
    10.07: "Quality Assurance/Quality Control Executive",
    10.08: "Quality Assurance/Quality Control Manager",
    10.09: "Business Development Manager",
    "10.10": "Head/VP/GM-Documentation/Shipping",
    10.11: "Head/VP/GM-Production",
    10.12: "Head/VP/GM-Purchase",
    10.13: "VP/GM-Quality",
    10.14: "CEO/MD/Director",
    10.15: "Liason Officer/Manager",
    10.16: "Trader",
    10.17: "Agent",
    10.19: "Fresher",
    "10.20": "Trainee",
    11.01: "Stenographer/Data Entry Operator",
    11.02: "Receptionist",
    11.03: "Secretary/PA",
    11.05: "Fresher",
    11.06: "Trainee",
    12.01: "HR Executive",
    12.02: "HR Manager",
    12.03: "Recruitment Executive",
    12.04: "Recruitment Manager",
    12.05: "Pay Roll/Compensation Manager",
    12.06: "Performance Management Manager",
    12.07: "Industrial/Labour Relations Manager",
    12.08: "Training Manager",
    12.19: "Staffing Specialist/ Manpower Planning",
    "12.20": "HR Business Partner",
    12.21: "Payroll Executive",
    12.22: "Employee Relations Executive",
    12.23: "Employee Relations Manager",
    12.09: "Executive/ Sr Executive - Administration",
    "12.10": "Manager / Sr Manager - Administration",
    12.24: "Executive/ Sr Executive - Facility Management",
    12.25: "Manager / Sr Manager - Facility Management",
    12.26: "Travel Desk - Coordinator",
    12.27: "Transport Executive",
    12.28: "Transport Manager",
    12.11: "Head/VP/GM-HR",
    12.12: "Head/VP/GM-Training & Development",
    12.13: "Head/VP/GM-Administration & Facilities",
    12.14: "Head/VP/GM-Recruitment",
    12.29: "Head/VP/GM-Compensation & Benefits",
    "12.30": "Head/VP/GM-Facility Management",
    12.15: "Outside Consultant",
    12.16: "Other",
    12.17: "Trainee",
    12.18: "Fresher",
    13.01: "Apprentice/Intern",
    13.02: "Private Attorney/Lawyer",
    13.03: "Advisor/Outside Consultant",
    13.04: "Law Officer",
    13.05: "Legal Manager",
    13.06: "Company Secretary",
    13.07: "Head/VP/GM-Legal",
    13.08: "Drug Regulatory Director",
    13.09: "Documentation/Medical Writing",
    "13.10": "Regulatory Affairs Manager",
    13.11: "Head/VP/GM-Regulatory Affairs",
    13.14: "Fresher",
    13.15: "Trainee",
    14.01: "Store Keeper/Warehouse Assistant",
    14.02: "Warehouse Manager",
    14.03: "Carry Forward Agent (CFA)",
    14.04: "Logistics Executive",
    14.05: "Logistics Manager",
    14.06: "Transport/Distribution Manager",
    14.07: "Purchase Executive",
    14.08: "Purchase/Vendor Development Manager",
    14.09: "Material Management Executive/Manager",
    "14.10": "Commercial Manager",
    14.11: "Quality Assurance/Quality Control Executive",
    14.12: "Quality Assurance/Quality Control Manager",
    14.13: "Commodity Trading Manager",
    14.14: "Head/VP/GM-SCM/Logistics",
    14.15: "Head/VP/GM-Commercial",
    14.16: "Head/VP/GM-Purchase/Material Management",
    14.18: "Trainee",
    14.19: "Fresher",
    15.08: "Client Servicing Executive",
    15.09: "Client Servicing/Key Account Manager",
    "15.10": "Account Director",
    15.11: "Creative Director",
    15.12: "Media Planning Executive/Manager",
    15.13: "Media Buying Executive/Manager",
    15.14: "Events/Promotion Executive",
    15.15: "Events/Promotion Manager",
    15.01: "Corporate Communication Executive",
    15.02: "Direct Marketing Executive",
    15.03: "Direct Marketing Manager",
    15.04: "Product Executive",
    15.05: "Product/Brand Manager",
    15.06: "Business Alliances Manager",
    15.07: "Marketing Manager",
    15.36: "Zonal Marketing Manager",
    15.37: "Branch Marketing Manager",
    15.38: "Regional Marketing Manager",
    15.39: "Retail Marketing Manager",
    "15.40": "Rural Marketing Manager",
    15.41: "Assistant / Associate Marketing Manager",
    15.42: "International Marketing Manager",
    15.43: "Sourcing Manager",
    15.44: "Manager Marketing - Internal / External Communication",
    15.45: "Manager - Market Research / Consumer Insights / Industry Analysis",
    15.46: "Search Engine Marketing/SEM Specialist",
    15.47: "Search Engine Optimisation /SEO Specialist",
    15.48: "Search Engine Optimisation /SEO Lead",
    15.49: "Search Engine Optimisation /SEO Analyst",
    "15.50": "Affiliate Marketing Manager",
    15.51: "Email Marketing Manager",
    15.52: "PPC /Pay Per Click Specialist",
    15.53: "PPC /Pay Per Click Lead",
    15.54: "Display Marketing Executive",
    15.55: "Display Marketing Manager",
    15.56: "Social Media Marketing Manager",
    15.16: "Art Director/Senior Art Director",
    15.57: "Asst Art Director",
    15.17: "Visualiser",
    15.58: "Sr Visualiser",
    15.18: "Copywriter",
    15.19: "Graphic Designer",
    "15.20": "Marketing Research Executive/Manager",
    15.21: "Marketing Research Field Supervisor",
    15.22: "Public Relations Executive",
    15.23: "Public Relations & Media Relations Manager",
    15.24: "Head/Manager/GM-Media Planning",
    15.25: "Head/Manager/GM-Media Buying",
    15.26: "Head/VP/GM-Public Relations/Corporate Communication",
    15.27: "Head/VP/GM-Marketing",
    15.28: "Head/VP/GM-Business Alliances",
    15.29: "Head/VP/GM- Marketing Research",
    "15.30": "Head/VP/GM-Client Servicing",
    15.31: "National Creative Director/VP-Creative",
    15.59: "Head/VP/GM/ Mgr-Online/Digital Marketing",
    15.33: "Outside Consultant",
    15.34: "Trainee",
    15.35: "Fresher",
    16.01: "Clinical Research Associate/Scientist",
    16.02: "Clinical Research Manager",
    16.03: "Analytical Chemistry Associate/Scientist",
    16.04: "Analytical Chemistry Manager",
    16.05: "Chemical Research Associate/Scientist",
    16.06: "Chemical Research Manager",
    16.07: "Bio/Pharma Informatics-Associate/Scientist",
    16.08: "Formulation Scientist",
    16.09: "Microbiologist",
    "16.10": "Molecular Biology",
    16.12: "Nutritionist",
    16.13: "Research Scientist",
    16.14: "Bio-Technical Research Associate/Scientist",
    16.15: "Bio-Technical Research Manager",
    16.16: "Pharmacist/Chemist/Bio Chemist",
    16.17: "Bio-Statistician",
    16.18: "Chief Medical Officer/Head Medical Services",
    16.19: "Clinical Researcher",
    "16.20": "Intern",
    16.21: "Administration Services/Medical Facilities",
    16.22: "Lab Technician/Medical Technician/Lab Staff",
    16.23: "Medical Officer",
    16.24: "Nurse",
    16.25: "Medical Superintendent/Director",
    16.26: "Anaesthetist",
    16.27: "Cardiologist",
    16.28: "Dermatologist",
    16.29: "Dietician/Nutritionist",
    "16.30": "ENT Specialist",
    16.31: "General Practitioner",
    16.32: "Gynaeocologist",
    16.33: "Hepatologist",
    16.34: "Microbiologist",
    16.35: "Nephrologist",
    16.36: "Neurologist",
    16.37: "Oncologist",
    16.38: "Opthamologist",
    16.39: "Orthopaedist",
    "16.40": "Paramedic",
    16.41: "Pathologist",
    16.42: "Pediatrician",
    16.43: "Pharmacist/Chemist/Bio Chemist",
    16.44: "Physiotherapist",
    16.45: "Psychiatrist",
    16.46: "Radiologist",
    16.47: "Surgeon",
    16.48: "Medical Representative",
    16.49: "Drug Regulatory Director",
    "16.50": "Documentation/Medical Writing",
    16.51: "Regulatory Affairs Manager",
    18.01: "Scientist",
    18.02: "Packaging Development Executive/Manager",
    18.03: "Head/VP/GM-Packaging Development",
    18.04: "Fresher",
    18.05: "Trainee",
    18.07: "Outside Consultant",
    19.01: "Industrial Engineer",
    19.02: "Design Engineer/Manager",
    19.03: "Factory Head",
    19.04: "Engineering Manager",
    19.05: "Production Manager",
    19.06: "Quality Assurance/Quality Control Executive",
    19.07: "Quality Assurance/Quality Control Manager",
    19.08: "Product Development Executive",
    19.09: "Product Development Manager",
    "19.10": "Workman/Foreman/Technician",
    19.11: "Service/Maintenance Engineer",
    19.12: "Service/Maintenance Supervisor",
    19.13: "Project Manager-Production/Manufacturing/Maintenance",
    19.14: "Safety Officer/Manager",
    19.15: "Environment Engineer/Officer",
    19.16: "Health-Officer/Manager",
    19.17: "Head/VP/GM-Quality Assurance/Quality Control",
    19.18: "Head/VP/GM-Production/Manufacturing/Maintenance",
    19.19: "Head/VP/GM-Operations",
    "19.20": "SBU Head/Profit Centre Head",
    19.21: "Head/VP/GM-Regulatory Affairs",
    19.22: "Outside Consultant",
    19.23: "Trainee",
    19.24: "Fresher",
    20.01: "Project Manager-Telecom",
    20.02: "Project Manager-IT/Software",
    20.03: "Project Manager-Production/Manufacturing/Maintenance",
    20.04: "Civil Engineer-Telecom",
    20.05: "Civil Engineer-Municipal",
    20.06: "Civil Engineer-Water/Wastewater",
    20.07: "Civil Engineer-Land Development",
    20.08: "Civil Engineer-Aviation",
    20.09: "Civil Engineer-Highway/Roadway",
    "20.10": "Civil Engineer-Traffic",
    20.12: "Electrical Engineer-Telecom",
    20.13: "Electrical Engineer-Commercial",
    20.14: "Electrical Engineer-Industrial",
    20.15: "Electrical Engineer-Utility",
    20.17: "Geotechnical Engineer",
    20.18: "Mechanical Engineer-Telecom",
    20.19: "Mechanical Engineer-HVAC",
    "20.20": "Mechanical Engineer-Plumbing/Fire Protection",
    20.22: "Process Engineer-Plant Design",
    20.23: "Structural Engineer-Bridge",
    20.24: "Structural Engineer-Building",
    20.26: "Geographic Information Systems/GIS",
    20.27: "Construction-General Building",
    20.28: "Construction-Heavy",
    20.29: "Construction-Residential",
    "20.30": "Construction-Specialty",
    20.31: "Construction-Construction Management",
    20.33: "Maintenance Engineer",
    20.35: "Fresher",
    20.36: "Trainee",
    21.01: "R&D Executive",
    21.02: "Clinical Research Associate/Scientist",
    21.03: "Clinical Research Manager",
    21.04: "Analytical Chemistry Associate/Scientist",
    21.05: "Analytical Chemistry Manager",
    21.06: "Chemical Research Associate/Scientist",
    21.07: "Chemical Research Manager",
    21.08: "Bio/Pharma Informatics-Associate/Scientist",
    21.09: "Formulation Scientist",
    "21.10": "Microbiologist",
    21.11: "Molecular Biology",
    21.13: "Nutritionist",
    21.14: "Research Scientist",
    21.15: "Bio-Technical Research Associate/Scientist",
    21.16: "Bio-Technical Research Manager",
    21.17: "Pharmacist/Chemist/Bio Chemist",
    21.18: "Bio-Statistician",
    21.19: "Lab Technician/Medical Technician/Lab Staff",
    "21.20": "Product Development Executive",
    21.21: "Product Development Manager",
    21.22: "Drug Regulatory Director",
    21.23: "Documentation/Medical Writing",
    21.24: "Regulatory Affairs Manager",
    21.25: "Quality Assurance & Quality Control-Executive",
    21.26: "Quality Assurance & Quality Control-Manager",
    21.27: "Design Engineer",
    21.28: "Senior Design Engineer",
    21.29: "Technical Lead/Project Lead",
    "21.30": "Head/VP/GM-R&D",
    21.31: "Head/VP/GM-Production",
    21.32: "Head/VP/GM-Formulations",
    21.33: "Head/VP/GM-Quality Assurance/Quality Control",
    21.34: "Head/VP/GM-Regulatory Affairs",
    21.35: "Research Associate",
    21.36: "Fresher",
    21.38: "Trainee",
    21.39: "Postdoc Position/Fellowship",
    "21.40": "Practical Training/Internship",
    22.01: "Sales Executive/Officer",
    22.02: "Counter Sales",
    22.03: "Medical Representative",
    22.04: "Merchandiser",
    22.05: "Sales/Business Development Manager",
    22.06: "Sales Promotion Manager",
    22.07: "Retail Store Manager",
    22.08: "Branch Manager",
    22.09: "Regional Manager",
    22.28: "Area Sales Manager",
    "22.10": "Sales Executive/Officer",
    22.11: "Sales/Business Development Manager",
    22.12: "Client Servicing/Key Account Manager",
    22.13: "Branch Manager/Regional Manager",
    22.14: "Sales Executive/Officer",
    22.15: "Sales/Business Development Manager",
    22.16: "Sales Promotion Manager",
    22.17: "Banquet Sales Executive/Manager",
    22.18: "Institutional Sales/Business Development Manager",
    22.29: "Sales Executive / Officer",
    "22.30": "Sales / BD Manager",
    22.31: "Client Relationship Manager",
    22.32: "Key Account Manager",
    22.33: "Area / Territory Manager",
    22.34: "Regional Sales Manager",
    22.19: "Sales Trainer",
    "22.20": "Telesales/Telemarketing Executive/Officer",
    22.21: "Sales Promotion Manager",
    22.22: "Front Desk/Cashier/Billing",
    22.35: "Sales Coordinator",
    22.36: "Proposal Response Manager",
    22.37: "Bid Manager",
    22.38: "Collaterals / Flyers Manager",
    22.39: "RFI / RFP Manager",
    "22.40": "Pre Sales Consultant",
    22.41: "Post Sales Consultant",
    22.42: "Service Engineer",
    22.43: "Service Manager",
    22.23: "Head/VP/GM/National Manager -Sales",
    22.44: "Head / VP/ GM/ National Manager After Sales",
    22.26: "Trainee",
    22.27: "Fresher",
    24.01: "Software Developer",
    24.02: "Team Lead/Technical Lead",
    24.03: "System Analyst",
    24.04: "Technical Architect",
    24.05: "Database Architect/Designer",
    24.06: "Project Lead",
    24.07: "Testing Engineer",
    24.08: "Product Manager",
    24.09: "Graphic/Web Designer",
    "24.10": "Release Manager",
    24.11: "DBA",
    24.12: "Network Administrator",
    24.13: "System Administrator",
    24.14: "System Security",
    24.15: "Technical Support Engineer",
    24.16: "Maintenance Engineer",
    24.17: "Webmaster",
    24.18: "IT/Networking-Manager",
    24.19: "Management Information Systems(MIS)-Manager",
    "24.20": "System Integration Technician",
    24.21: "Business Analyst",
    24.22: "Datawarehousing Technician",
    24.23: "Outside Technical Consultant",
    24.24: "Functional Outside Consultant",
    24.25: "EDP Analyst",
    24.26: "Technical Writer",
    24.27: "Instructional Designer",
    24.28: "Technical Documenter",
    24.29: "Quality Assurance/Quality Control Executive",
    "24.30": "Quality Assurance/Quality Control Manager",
    24.31: "Project Manager-IT/Software",
    24.32: "Program Manager",
    24.33: "Head/VP/GM-Quality",
    24.34: "Head/VP/GM-Technology(IT)/CTO",
    24.35: "CIO",
    24.36: "Trainer/Faculty",
    24.37: "Trainee",
    24.38: "Fresher",
    24.39: "Outside Consultant",
    "24.40": "IT/Technical Content Developer",
    36.01: "Counselor",
    36.03: "Librarian",
    36.04: "Teacher/ Private Tutor",
    36.05: "Special Education Teacher",
    36.06: "Translator",
    36.07: "Transcriptionist",
    36.11: "Junior/Primary/Assistant Teacher",
    36.12: "Class Teacher / Classroom coordinator",
    36.13: "Head Teacher / Head Mistress / Head Master",
    36.14: "Nursery Teacher",
    36.15: "School Teacher",
    36.16: "Vice Principal",
    36.17: "Principal",
    36.18: "Curriculum Designer",
    36.19: "Lab Assistant ",
    "36.20": "Warden",
    36.21: "Trainer",
    36.22: "Soft Skill Trainer",
    36.23: "Technical / Process Trainer",
    36.24: "Voice and Accent Trainer",
    36.25: "English Teacher",
    36.26: "French Teacher",
    36.27: "German Teacher",
    36.28: "Hindi Teacher",
    36.29: "Sanskrit Teacher",
    "36.30": "Spanish Teacher",
    36.31: "Tamil Teacher",
    36.32: "Japanese Teacher",
    36.33: "Arabic Teacher",
    36.34: "Urdu Teacher",
    36.35: "Bengali Teacher",
    36.36: "Chinese Teacher",
    36.37: "Punjabi Teacher",
    36.38: "Italian Teacher",
    36.39: "Accounts Teacher",
    "36.40": "Biology Teacher",
    36.41: "Chemistry Teacher",
    36.42: "Commerce Teacher",
    36.43: "Computer Teacher",
    36.44: "Economics Teacher",
    36.45: "Geography Teacher",
    36.46: "History Teacher",
    36.47: "Social Studies Teacher",
    36.48: "Mathematics Teacher",
    36.49: "Physics Teacher",
    "36.50": "Science Teacher",
    36.51: "Arts Teacher",
    36.52: "Dance Teacher",
    36.53: "Drawing Teacher",
    36.54: "Music Teacher",
    36.55: "Sports / Physical Education Teacher",
    36.56: "Yoga Teacher",
    36.57: "Drama/Theater Teacher",
    36.58: "Home Science Teacher",
    36.02: "Lecturer/Professor",
    36.59: "Assistant Professor",
    "36.60": "Chancellor",
    36.61: "Vice - Chancellor",
    36.62: "Dean / Director ",
    36.63: "Chairman",
    36.64: "HOD",
    36.08: "Other",
    36.09: "Trainee",
    "36.10": "Fresher",
    37.01: "Customer Support Engineer/Technician",
    37.02: "Technical Support Manager",
    37.03: "Head/VP/GM-Technical Support",
    37.04: "RF Engineer",
    37.05: "RF Installation Engineer",
    37.06: "RF System Designer",
    37.07: "GPublic RelationsS Engineer",
    37.08: "GSM Engineer",
    37.09: "Embedded Technologies Engineer",
    "37.10": "Switching/Router Engineer",
    37.11: "Mechanical Engineer -Telecom",
    37.12: "Civil Engineer -Telecom",
    37.13: "Electrical Engineer -Telecom",
    37.14: "Network Planning Engineer",
    37.15: "Network Planning Manager",
    37.16: "Security Engineer",
    37.17: "Maintenance Engineer",
    37.18: "Hardware Design Engineer",
    37.19: "Technical Lead -Hardware Design",
    "37.20": "Hardware Installation Technician",
    37.21: "Quality Assurance/Quality Control Executive",
    37.22: "Quality Assurance/Quality Control Manager",
    37.23: "Network Administrator",
    37.24: "System Administrator",
    37.25: "Project Manager-Telecom",
    37.27: "Head/VP/GM-Operations",
    37.28: "Head/VP/GM-Quality",
    37.29: "CEO/MD/Director",
    "37.30": "SBU Head/Profit Centre Head",
    37.31: "CTO/Head/VP-Technology (Telecom/ISP)",
    37.32: "CIO",
    37.33: "Outside Consultant",
    37.35: "Trainee",
    37.36: "Fresher",
    39.01: "CEO/MD/Director",
    39.02: "CIO",
    39.03: "Creative Director",
    39.04: "National Creative Director/VP-Creative",
    39.05: "CTO/Head/VP-Technology (Telecom/ISP)",
    39.06: "Executive/Master Chef",
    39.07: "Head/VP/GM-Documentation/Shipping",
    39.08: "Head/VP/GM-Business Development",
    39.09: "Head/VP/GM-Relationships",
    "39.10": "Head/VP/GM-Transitions",
    39.11: "Head/VP/GM-HR",
    39.12: "Head/VP/GM-Training and Development",
    39.13: "Head/VP/GM-Technology (IT)/CTO",
    39.14: "Head/Manager/GM-Media Buying",
    39.15: "Head/Manager/GM-Media Planning",
    39.16: "Head/VP/GM-Operations",
    39.17: "Head/VP/GM-SCM/Logistics",
    39.18: "Head/VP/GM-Administration & Facilities",
    39.19: "Head/VP/GM-Commercial",
    "39.20": "Head/VP/GM-Marketing",
    39.21: "Head/VP/GM- Marketing Research",
    39.22: "Head/VP/GM- Purchase/Material Management",
    39.23: "Head/VP/GM -Accounts",
    39.24: "Head/VP/GM -F&B",
    39.25: "Head/VP/GM-Business Alliances",
    39.26: "Head/VP/GM-Finance/Audit",
    39.27: "Head/VP/GM-Investment Banking",
    39.29: "Head/VP/GM-Private Equity/Hedge Fund/VC",
    "39.30": "Head/VP/GM-Project Finance",
    39.31: "Head/VP/GM-Quality Assurance & Quality Control",
    39.32: "Head/VP/GM-Quality",
    39.33: "Head/VP/GM-Sales",
    39.34: "Head/VP/GM-Underwritting",
    39.36: "Head/VP/GM-Fund Management",
    39.37: "Head/VP/GM-Credit Risk",
    39.38: "Head/VP/GM-Depository Services",
    39.39: "Head/VP/GM-Legal",
    "39.40": "Head/VP/GM-Production/Manufacturing/Maintenance",
    39.41: "Head/VP/GM-Tour Management",
    39.42: "Head/VP/-Public Relations/Corporate Communication",
    39.43: "Head/VP/GM-Broking",
    39.44: "Head/VP/GM-CFO/Financial Controller",
    39.45: "Head/VP/GM-Credit",
    39.46: "Head/VP/GM-R&D",
    39.47: "Head/VP/GM-Regulatory Affairs",
    39.48: "Head/VP/GM-Claims",
    39.49: "Head/VP/GM-Client Servicing",
    "39.50": "Head/VP/GM-Equity",
    39.51: "Head/VP/GM-Mergers & Acquisitions",
    39.52: "Head/VP/GM-Packaging Development",
    39.53: "Head/VP/GM-Corporate Planning/Strategy",
    39.54: "Head/VP/GM-Production",
    39.55: "Head/VP/GM-Treasury",
    39.56: "Head/VP/GM-Corporate Advisory",
    39.57: "Head/VP/GM-Domestic Debt",
    39.58: "Head/VP/GM-Formulations",
    39.59: "Head/VP/GM-Insurance Operations",
    "39.60": "Head/VP/GM-Offshore Debt",
    39.61: "Head/VP/GM/National Manager-Sales",
    39.62: "SBU/Profit Center Head",
    39.63: "Service Delivery Leader",
    39.64: "VP/President/Partner",
    39.65: "Head/VP/GM-Recruitment",
    41.01: "Other",
    42.01: "Accessory Designer",
    42.02: "Apparel/Garment Designer",
    42.03: "Footwear Designer",
    42.04: "Merchandiser",
    42.05: "Textile Designer",
    42.06: "Jewellery Designer",
    42.07: "Freelancer",
    42.09: "Fresher",
    "42.10": "Trainee",
    43.01: "News Anchor/TV Presenter",
    43.02: "News Compiler",
    43.03: "Correspondent",
    43.04: "Senior/Principal Correspondent",
    43.05: "News Editor",
    43.06: "News/Features Head",
    43.07: "Spot Boy",
    43.08: "Animation/Graphic Artist",
    43.09: "Stunt Coordinator",
    "43.10": "Wardrobe/Make-Up/Hair Artist",
    43.11: "AV Editor",
    43.12: "Visualiser",
    43.13: "Sound Mixer/Engr",
    43.14: "Locations Manager",
    43.15: "Lighting Technician",
    43.16: "Special Effects Technician",
    43.17: "Photographer",
    43.18: "Camera Man/Technician",
    43.19: "Choreographer",
    "43.20": "Assistant Editor/Editor",
    43.21: "Head-Lighting",
    43.22: "Head-Special Effects",
    43.23: "Music Director",
    43.24: "Cinematographer",
    43.25: "Assistant Director/Director",
    43.26: "TV Producer",
    43.27: "Film Producer",
    43.29: "Fresher",
    "43.30": "Trainee",
    44.01: "Travel Agent",
    44.02: "Reservations Executive",
    44.03: "Reservations Manager",
    44.04: "Tour Mngmt Executive",
    44.05: "Tour Management Manager/Senior Manager",
    44.06: "Operations Executive",
    44.07: "Business Development Manager",
    44.08: "Marketing Manager",
    44.09: "Branch Manager",
    "44.10": "Regional Manager",
    44.11: "General Manager",
    44.12: "Cashier/Billing Manager",
    44.13: "Operations Manager",
    44.14: "Cabin Crew",
    44.15: "Ground Staff",
    44.16: "Aviation Engineer",
    44.17: "Maintenance Engineer",
    44.18: "SBU/Profit Center Head",
    44.19: "Head/VP/GM-Tour Management",
    "44.20": "CEO/MD/Director",
    44.22: "Fresher",
    44.23: "Trainee",
    44.24: "Outside Consultant",
    45.01: "Security Guard",
    45.02: "Security Supervisor",
    45.03: "Security Manager",
    45.04: "Policeman",
    45.05: "Army/Navy/Airforce Personnel",
    45.06: "Chief Security Officer",
    45.08: "Trainee",
    45.09: "Fresher",
    46.01: "DSA/Company Representative",
    46.02: "Independent Representative",
    46.03: "Life-Insurance Agent",
    46.04: "Non-Life Insurance Agent",
    46.05: "Real Estate Agent",
    46.06: "Travel Agent",
    81.01: "Data Analyst",
    81.02: "Financial Analyst",
    81.03: "Business Analyst",
    81.08: "Analytics Manager",
    81.04: "Head/VP/GM - Analytics & BI",
    81.05: "Fresher",
    81.06: "Trainee",
    81.07: "Other",
    82.01: "Deck Cadet ",
    82.02: "Trainee Cadet",
    82.03: "Marine Captain / Master Mariner",
    82.04: "Ship Captain",
    82.05: "Cabin Attendent",
    82.06: "Chief Mate",
    82.07: "Chief Operation Officer",
    82.08: "Seaman",
    82.09: "Able Seaman (AB)",
    "82.10": "Ordinary Seaman (OS)",
    82.11: "Chief Electro Technical Officer (ETO)",
    82.12: "Electrical Officer",
    82.13: "Radio Officer",
    82.14: "Chief Engineer",
    82.15: "Electrical Engineer",
    82.16: "Gas Engineer",
    82.17: "Reefer Engineer",
    82.18: "Trainee Engineer",
    82.19: "2nd Engineer",
    "82.20": "3rd Engineer",
    82.21: "4th Engineer",
    82.22: "5th Engineer",
    82.23: "Chief Mechanic / Machinist / Motorman",
    82.24: "Pumpman",
    82.25: "Crane Operator",
    82.26: "Deck Fitter / Oilers",
    82.27: "Engine Fitter",
    82.28: "Steward",
    82.29: "Chief Steward",
    "82.30": "Laundry Man",
    82.31: "Bosun",
    82.32: "Wiper",
    82.33: "Cook ",
    82.34: "Chief Cook",
    82.35: "Sous Chef",
    82.36: "Chef",
    82.37: "Bar Tender",
    82.38: "Musician",
    82.39: "Purser"
}, global.refres = {
    allmba: ["Banking", "Private Banking", "M&A", "Corporate Banking", "FMCG ", "Brand Management", "Advertising", "Product Management", "Corporate Strategy", "Consulting", "IT Consulting", "Business Analyst", "Business Intelligence", "Talent Acquisition", "Corporate HR", "Organization Development", "Leadership Hiring", "New Product Development", "Presales", "Solution Architect", "Project Manager", "Supply Chain Management", "Procurement", "Inventory Management", "Channel Management", "Process Excellence", "Transition Management", "Business Excellence", "Change Management", "Business Transformation"],
    bankfin: ["Banking", "Private Banking", "M&A", "Taxation", "Corporate Banking", "Wealth Management", "Derivatives", "Insurance", "Accounting", "Financial Planning & Analysis", "Forex", "SOX", "Risk Management", "Investment Banking", "Actuarial", "Financial Reporting", "Credit Analysis", "Financial Research", "Chief Financial Officer", "Valuation", "Equity Research", "Equity Analysis", "Treasury", "Private Equity", "Fixed Income", "Consulting - BFSI", "Fund Raising", "Credit Research", "Process Excellence", "Commercial Banking", "Infrastructure Finance", "Venture Capital"],
    salesmkgt: ["FMCG ", "Channel Management", "BFSI Sales", "Advertising", "Product Management", "Category Management", "International Marketing", "Brand Management", "Marketing Head", "CRM", "Consumer Internet", "Consumer Durables", "Product Marketing", "Market Research", "Corporate Communication", "Online Sales", "B2B Marketing", "General Management", "Online Marketing", "IT Sales", "Analytics", "Research", "Presales", "Media Buying", "Content Management", "Pharma Sales", "Corporate Sales", "Digital Sales"],
    cnsltg: ["Corporate Strategy", "Consulting", "IT Consulting", "Consulting BFSI", "Business Analyst", "Financial Analyst", "Transformation", "Process Excellence", "Reengineering", "Analytics", "Business Intelligence", "Web Analytics", "R Analyst", "Predictive Modeling", "Statistical Modeling", "SAS", "SPSS", "Six Sigma", "Big 4"],
    hr: ["Talent Acquisition", "Corporate HR", "Organization Development", "Leadership Hiring", "Learning and Development", "Compensation and Benefits", "HR Consulting", "HR Business Partner", "Talent Management", "Benefits and Rewards", "HR Head", "Training and Development", "HR Generalist", "Campus Hiring", "Industrial Relations", "Labour Relations", "Recruitment", "HR Analytics", "Manpower Planning", "HR Specialist", "Employee Relations"],
    itsys: ["IT Services", "IT Product", "Internet", "IT Consulting", "New Product Development", "Presales", "Solution Architect", "Project Manager", "Product Manager", "Program Manager", "Business Intelligence", "Risk Management", "SAP", "IT Change Management", "IT Compliance", "Cloud", "Service Delivery", "Salesforce", "BPR", "PMO"],
    scmop: ["Supply Chain Management", "Procurement", "Inventory Management", "Channel Management", "Vendor Management", "Quality Control", "Operations", "Logistics", "Sourcing", "Distribution", "Transportation", "Order Management", "Contract Management", "Capacity Planning", "Buying", "Modern Trade", "Six Sigma"],
    bpo: ["Process Excellence", "Transition Management", "Business Excellence", "Change Management", "Business Transformation", "Migration", "Compliance", "BID Management", "Customer Service", "F&A Operations", "FP&A", "Six Sigma", "MBB", "Blackbelt", "Management Reporting", "Financial Reporting", "Shared Services"],
    alleng: ["IT", "C++", "Java", ".Net", "Oracle", "SAP", "Infrastructure", "Energy", "Power", "Oil & Gas", "Telecom", "Networking", "Transmission", "Wireless", "VLSI", "VHDL", "Chip design", "Circuit Design", "Embedded", "Transmission", "Instrumentation", "Industrial Design", "Process Design", "Production ", "Heavy Engineering", "Plant Engineering", "Analytics", "Business Intelligence", "Business Analyst", "Web Analytics", "R&D"],
    it: ["IT Services", "IT Product", "Internet", "UI", "UX", "C++", "Java", ".Net", "Android", "HTML", "Cloud", "Data Structure", "iOS", "Hadoop", "JavaScript", "SQL", "Oracle", "PHP", "UI/UX", "AJAX", "Mobile", "SAP", "eCommerce", "Big Data", "Business Analyst", "Data Management", "SaaS", "Technical Architect", "Testing", "Hyperion", "Business Objects", "jQuery", "Program Management", "Project Management", "Virtualization", "Functional Consultant", "DBA", "Server Administration", "Mainframe", "CTO"],
    infra: ["Infrastructure", "Energy", "Power", "Oil & Gas", "Pipeline", "Mining", "Upstream / Downstream", "Construction", "Transmission", "Structural", "Fabrication", "Highway Design", "Surfacing", "Water treatment", "Civil Engineer", "Architecture", "Marine Engineering", "Engineering Drawing", "Quality Engineer", "EHS", "EPC", "R&D", "ETABS", "Utility", "FPGA", "MATLAB", "AutoCAD", "SCADA"],
    semielec: ["VLSI", "Telecom", "VHDL", "Networking", "Chip design", "Transmission", "Circuit Design", "Wireless", "CMOS", "Avaya", "Embedded", "CISCO", "MOSFET", "VAS", "PCB", "GSM/ UMTS/ CDMA", "DFT", "LAN/ WAN", "Transmission", "Optical", "Instrumentation", "3G/ 4G", "IO Design", "TMT", "AC/DC", "ITIL", "Fabrication", "Routers", "ASIC", "Verilog", "Physical Design", "Board Design", "Embedded", "Mixed Signal", "Analog Layout", "Verification Engineer"],
    prodmfg: ["Industrial Design", "Process Design", "Production ", "Heavy Engineering", "Plant Engineering", "Production engineering", "Maintenance Engineer", "Chief Engineer", "Quality", "Mechanical", "Metallurgy", "Instrumentation", "Automotive", "Automobile", "Transmission", "Project Manager", "EHS", "HVAC"],
    rnd: ["Analytics", "Business Intelligence", "Business Analyst", "Web Analytics", "Fraud Analyst", "Risk Analyst", "R Analyst", "Financial Analyst", "Predictive Modeling", "Statistical Modeling", "Decision Tree", "MIS", "Machine Learning", "SPSS/ SAS", "NLP", "Artificial Intelligence", "R&D", "Research", "Design", "Biotechnology", "Signal processing", "Scientist"]
}, window.global || (global = {}, global.premium = {}), window.global.layers || (window.global.layers = {}), global.layers.premium || (global.layers.premium = {
    data: {}
}), global.layers.premium.html = '<div id="premiumLayer" class="ltBx lightbox"> <div class="ltGlobalHd"> <h1 class="ltGlobalTtl">Jobs for IIT/IIM Graduates</h1> <a class="ltGlobalCls" href="javascript:">&nbsp;</a> </div> <div class="ltCntnt"> <div class="logoCont"> <em class="premiumLogo_large"></em> Hand Picked, High Quality Jobs for Top Talent </div><button id="mbaJobsBtn" class="blueBtn" title="View Premium Jobs for IIM MBA Graduates">View MBA Jobs</button><button id="engJobsBtn" class="blueBtn" title="View Premium Jobs for IIT Engineering Graduates">View Engineering Jobs</button></div> </div>', global.layers.advanceSearch || (global.layers.advanceSearch = {
    data: {}
}), global.layers.advanceSearch.disable || (global.layers.advanceSearch.html = '<div id="advanceSearchLayer" class="ltBx lightbox wrappendInputs"> <div class="ltGlobalHd"> <div class="ltGlobalTtl"> Advanced Search </div> <a class="ltGlobalCls" href="javascript:"> &nbsp; </a> </div> <div id="adv_msgBar" class="msgBar red dspN"> <div class="cnt"> Your input has been successfully submitted. </div> </div> <div class="ltCntnt"> <form id="advFrm" name="advanceSearchForm" method="post"> <div class="row"> <div class="rowL"> <label for="Sug_advKeyskills"> Keyskills </label> </div> <div class="rowR"> <div class="suggest" id="advKeyskills"> <div class="sWrap"> <div class="iconWrap"> <span class="nLoder"> </span> </div> <div class="inpWrap"><span class="srchIcon"></span> <input class="sugInp" name="qp" type="text" placeholder="Skills, Designation, Companies" rel="custom:2024" /> </div> </div> </div> </div> </div> <div class="row"> <div class="rowL"> <label for="Sug_advLocation"> Location </label> </div> <div class="rowR"> <div class="suggest" id="advLocation"> <div class="sWrap"> <div class="iconWrap"> <span class="nLoder"> </span> </div> <div class="inpWrap"><span class="locIcon"></span> <input name="ql" class="sugInp" id="Sug_advLocation" type="text" placeholder="Enter the cities you want to work in" rel="specialChar:2025" /> </div> </div> </div> </div> <i class="erLbl" id="Sug_advLocation_err"> </i> </div> <div class="row"> <div class="rowL"> <label for="adv_workExp_year"> Work Experience </label> </div> <div class="rowR twoLabeledField fullWidth"> <div class="singleDD dspIB" id="dd_adv_workExp_year"> <div class="dWrap cover"> <input id="adv_workExp_year" class="sdTxt w45" type="text" name="qe" placeholder="Select" readonly/> <span class="smArw"> </span> </div> </div> <label for="adv_workExp_year"> Years </label> <div class="singleDD dspIB" id="dd_adv_workExp_month"> <div class="dWrap cover"> <input id="adv_workExp_month" class="sdTxt w45" type="text" name="qem" placeholder="Select" readonly/> <span class="smArw"> </span> </div> </div> <label for="adv_workExp_month"> Month </label> </div> </div> <div class="row"> <div class="rowL"> <label for="adv_exp_sal"> Expected Salary </label> </div> <div class="rowR twoLabeledField halfWidth"> <div class="singleDD dspIB" id="dd_adv_exp_min"> <div class="dWrap cover"> <input id="adv_exp_min" class="sdTxt w45" type="text" name="qm" placeholder="Min" readonly/> <span class="smArw"> </span> </div> </div> <div class="singleDD dspIB" id="dd_adv_exp_max"> <div class="dWrap cover"> <input class="sdTxt w45" type="text" name="qx" placeholder="Max" readonly/> <span class="smArw"> </span> </div> </div> <label for="adv_exp_min"> in Lakhs </label> </div> </div> <div class="row"> <div class="rowL"> <label for="inp_ddAdvIndusrty"> Industry </label> </div> <div class="rowR"> <div id="ddAdvIndusrty" class="ddwn cover"> <div class="DDwrap"> <ul class="DDsearch"> <li class="frst"> <div class="DDinputWrap"> <input class="srchTxt" type="text" name="multipleqi" placeholder="Select the industry where you want to work" /> </div> </li> </ul> <span class="smArw"></span> </div> </div> <i class="notif" id="ddAdvIndusrty_err">You can select at max 2 industries</i> </div> </div> <div class="row"> <div class="rowL"> <label for="adv_jobCategory"> Job Category </label> </div> <div class="rowR"> <div class="singleDD" id="dd_adv_jobCategory"> <div class="dWrap cover"> <input id="adv_jobCategory" class="sdTxt w45" type="text" name="qf[]" placeholder="Select your areas of expertise" rel="" readonly /> <span class="smArw"> </span> </div> </div> </div> </div> <div class="row"> <div class="rowL"> <label> Job Type </label> </div> <div class="rowR"> <div class="multiToggle triple"> <div class="tab act" rel="0"><a href="javascript:"> All Jobs </a></div> <div class="tab" rel="1"><a href="javascript:"> Company Jobs </a></div> <div class="tab" rel="2"><a href="javascript:"> Consultant Jobs </a></div> <span class="actLayer"> </span> <input type="hidden" name="qk[]"/> </div> </div> </div> <div class="row"> <div class="rowL"> <label> Sort By </label> </div> <div class="rowR halfWidth"> <div class="multiToggle double"> <div class="tab act" rel="r"><a href="javascript:"> Relevance </a></div> <div class="tab" rel="f"><a href="javascript:"> Date </a></div> <span class="actLayer"> </span> <input type="hidden" name="qs" /> </div> </div> </div> <div class="row"> <button id="adv_submit" class="blueBtn" type="submit"> Search </button> </div> </form> </div> </div>'), global.layers.loginLayer || (global.layers.loginLayer = {
    data: {}
}), global.layers.loginLayer.html = '<div id="loginLB" class="ltBx lightbox"> <div class="ltGlobalHd"> <div class="ltGlobalTtl">Jobseeker Login</div> <a id="closeLB" class="ltGlobalCls" href="javascript:">&nbsp;</a> </div> <div class="ltCntnt"> <form id="lgnFrm" name="loginForm" target="login-iframe" action="' + global.layers.loginLayer.data.formAction + '" method="post" class="loginLay"> <input type="hidden" name="URL" value="' + global.layers.loginLayer.data.URL + '"> <input name="failURL" type="hidden" value="' + global.layers.loginLayer.data.failURL + '"/> <input name="Login" type="hidden" value="1"/> <input name="client" type="hidden" value="search"/><input name="remember_me" type="hidden" value="1"/> <input id="lgnUsername" name="USERNAME" type="hidden" value=""/> <div class="row"> <div id="logSel" class="selLogin"> <a data-value="1" id="eSel" class="act" href="javascript:">Email ID</a> <a data-value="2" id="uSel" href="javascript:">Username</a> <span id="logActL" class="actLayer"></span> <input id="uSel_Hid" name="matchEmail" type="hidden" value="1"/> </div> </div> <div class="row"> <i class="erLbl" id="fLogin_err"></i> </div> <div class="row" id="eRow"> <div class="rowL"><label for="eLogin">Email ID</label></div> <div class="rowR"> <input name="email" id="eLogin" maxlength="100" type="text" placeholder="Enter your active Email ID" rel="required:1005,custom:1001" /> <i class="erLbl" id="eLogin_err"></i> </div> </div> <div class="row dspN" id="uRow"> <div class="rowL"><label for="uLogin">Username</label></div> <div class="rowR"> <input name="user" id="uLogin" type="text" placeholder="Enter your Username" rel="required:1004" /> <i class="erLbl" id="uLogin_err"></i> </div> </div> <div class="row"> <div class="rowL"><label for="pLogin">Password</label></div> <div class="rowR"> <input name="PASSWORD" id="pLogin" maxlength="40" type="password" placeholder="Enter your password" rel="required:1003"/> <i class="erLbl" id="pLogin_err"></i> </div> </div> <div class="row forgot"><a target="_blank" href="' + global.layers.loginLayer.data.forgot_pswd_url + '">Forgot Password?</a></div> <div class="row"><button type="submit" value="Login" class="blueBtn">Login</button></div> <div class="row txtC">Not a member as yet? <a href="' + global.layers.loginLayer.data.registerURL + '">Register Now</a></div><div class="dClmr txtC">In case you are using a public/shared computer we recommend that you logout to prevent any un-authorized access to your account</a></div> </form> <iframe class="dspN" width="0" height="0" name="login-iframe" id="login-iframe"></iframe> </div> </div>';
for (key in global.layers); $("body").append(global.layers[key].html);
var common_ErrorList = {
        1001: function(a) {
            var b = $.trim(a.val()),
                c = !1;
            return emailValid(b) || (c = "Please enter a valid Email ID"), c
        },
        1002: function(a) {
            var b = $.trim(a.val()),
                c = $.trim($("#signUpEmail").val()),
                d = !1;
            return b && b != c && (d = "Email ID does not match"), d
        },
        1003: "Please enter your Password",
        1004: "Please enter your Username",
        1005: "Please enter your Email ID",
        1006: "Please re-enter your Email ID",
        1007: "Password chosen must be minimum 6 characters long",
        1008: function(a) {
            var b = $.trim(a.val()),
                c = !1;
            return emailValid(b) || (c = "Your email entries do not match"), c
        },
        1009: "Password can not be less than [MinL] characters",
        1010: {
            msg: "Special characters other than (hyphen underscore dot @) are not allowed",
            regEx: /^[a-zA-Z\d.@_-]+$/
        },
        1011: "Please enter your query",
        1012: function() {
            var a = !1;
            return 0 === $("#rtjFrm").find("input[type=checkbox]:checked").length && (a = "Please select atleast one option to continue"), {
                msg: a,
                id: "rtjErr"
            }
        },
        1013: "Please specify a reason",
        1014: "Required field",
        1015: "Please enter a valid Email ID",
        1016: function() {
            var a = $("#location").find(".sugInp"),
                b = $("#skill").find(".sugInp"),
                c = $.trim(b.val()),
                d = !1,
                e = /[^a-zA-Z\/,\s&()\.]/;
            return qsbForm.checkValids("required", b) && qsbForm.checkValids("required", a) ? d = $("#qsbForm").attr("data-error-message") && $("#qsbForm").attr("data-error-message").length > 0 ? $("#qsbForm").attr("data-error-message") : "Please enter Keywords or Location to search" : c && c.match(/^[~`!@#$%^&*()\-+\[\]{}|;:'",<.>/?\s_=\\]+$/) ? d = "Only special character(s) are not allowed in skill, Designation and Company field" : e.test(a.val()) && (d = "Please avoid entering any number/special character in location field."), {
                msg: d,
                id: "qsbError"
            }
        },
        1017: "Please enter your friend's Email ID",
        1018: "Please specify a Subject",
        1019: "Please enter a message",
        1020: function(a) {
            var b = !1;
            return a.val() && $("#maxsal_dd_cjaHid").val() || (b = "Please select the range"), {
                msg: b
            }
        },
        1021: {
            msg: "Special characters are not allowed",
            regEx: /^[a-zA-Z0-9 ]+$/
        },
        1022: "Keyskills should not be blank",
        1023: "Please give a name to your Job Alert",
        1024: "Please specify your Email ID",
        1025: function(a) {
            var b = !1;
            return a.val().match(/^[~`!@#$%^&*()\-+\[\]{}|;:'",<.>/?\s_=\\]+$/) ? b = "Only special character(s) are not allowed in skill, Designation and Company field" : $.trim(a.val()).length > 250 && (b = "You have exceeded the maximum limit of 250 characters"), b
        },
        1026: "Please enter your Current Designation",
        1027: "Special characters are not allowed",
        1028: function(a) {
            return a.val() && !$("#hid_jcCja").val() ? {
                msg: "Please select Job Categories and then Roles",
                id: "cjaRole_err"
            } : void 0
        },
        2020: "Please enter your name",
        2021: "Please enter alphabets only",
        2022: function(a) {
            var b, c = $.trim(a.val());
            return b = /^[0-9]{10}$/.test(+c) ? !1 : "Please enter 10 digit mobile number"
        },
        2023: "Please enter a valid mobile number",
        2024: function() {
            var a = $("#advKeyskills .sugInp,#advLocation .sugInp,#hid_ddAdvIndusrty,#dd_adv_jobCategoryHid"),
                b = !0;
            return $.each(a, function(a, c) {
                var d = cv_adv.checkValids("required", $(c)) || 0 === c.value;
                b = b && d
            }), b === !0 ? ($("#adv_msgBar .cnt").html("Please enter Keywords or Location or select Job Category or Industry to search"), $("#adv_msgBar").show(), a.parents(".row").addClass("comErr")) : $("#advKeyskills").find(".sugInp").val().match(/^[~`!@#$%^&*()\-+\[\]{}|;:'",<.>/?\s_=\\]+$/) ? ($("#adv_msgBar .cnt").html("Only special character(s) are not allowed in skill, Designation and Company field"), $("#adv_msgBar").show(), a.parents(".row").addClass("comErr"), b = !0) : ($("#adv_msgBar").hide(), a.parents(".row").removeClass("comErr")), b ? {
                msg: "Please enter Keywords or Location or select Job Category or Industry to search",
                id: "adv_commonError"
            } : b
        },
        2025: {
            msg: "Please enter a valid location",
            regEx: /^[a-zA-Z\/,\s&()\.]*$/
        },
        2026: function() {
            var a = !1,
                b = /[^a-zA-Z\/,\s&()\.]/;
            return b.test($("#locsugg").find(".sugInp").val()) && (a = "Please avoid entering any number/special character in location."), a
        },
        2027: function(a) {
            var b = "";
            return new RegExp(/^[a-zA-Z\d.@_-]+$/).test(a.val()) || (b = "White spaces & special characters other than (hyphen underscore dot @) are not allowed"), {
                msg: b
            }
        },
        2028: function(a) {
            var b = "";
            return new RegExp("yahoo.com").test(a.val()) && (b = "Email ids ending with 'yahoo.com' are not supported for this service. Kindly change email id"), {
                msg: b
            }
        }
    },
    multiToggle = function() {
        return {
            init: function() {
                $(".multiToggle:not(.multiToggleReady)").each(function(a, b) {
                    var c = $(b),
                        d = $(this),
                        e = {
                            activeLayer: $(this).find(".actLayer"),
                            tabs: c.find(".tab"),
                            activeTab: c.find(".tab.act"),
                            hiddenField: c.find("input[type=hidden]")
                        };
                    e.hiddenField.val(e.activeTab.attr("rel")), e.tabs.click(function() {
                        var a = e.tabs.length,
                            b = $(this),
                            c = e.tabs.index(b),
                            d = 100 / a * c;
                        e.activeLayer.css({
                            left: d + "%"
                        }), e.activeTab.removeClass("act"), e.activeTab = b.addClass("act"), e.hiddenField.val(this.getAttribute("rel"))
                    }), d.addClass("multiToggleReady")
                })
            }
        }
    }();
jQuery.extend({
    highlight: function(a, b, c, d) {
        if (3 === a.nodeType) {
            var e = a.data.match(b);
            if (e) {
                var f = document.createElement(c || "span");
                f.className = d || "highlight";
                var g = a.splitText(e.index);
                g.splitText(e[0].length);
                var h = g.cloneNode(!0);
                return f.appendChild(h), g.parentNode.replaceChild(f, g), 1
            }
        } else if (1 === a.nodeType && a.childNodes && !/(script|style)/i.test(a.tagName) && (a.tagName !== c.toUpperCase() || a.className !== d))
            for (var i = 0; i < a.childNodes.length; i++) i += jQuery.highlight(a.childNodes[i], b, c, d);
        return 0
    }
}), jQuery.fn.unhighlight = function(a) {
    var b = {
        className: "highlight",
        element: "span"
    };
    return jQuery.extend(b, a), this.find(b.element + "." + b.className).each(function() {
        var a = this.parentNode;
        a.replaceChild(this.firstChild, this), a.normalize()
    }).end()
}, jQuery.fn.highlight = function(a, b) {
    var c = {
        className: "highlight",
        element: "span",
        caseSensitive: !1,
        wordsOnly: !1
    };
    if (jQuery.extend(c, b), a.constructor === String && (a = [a]), a.sort(function(a, b) {
            return b.length - a.length
        }), a = jQuery.grep(a, function(a, b) {
            return "" != a
        }), a = jQuery.map(a, function(a, b) {
            return a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
        }), 0 == a.length) return this;
    var d = c.caseSensitive ? "" : "i",
        e = "(" + a.join("|") + ")";
    c.wordsOnly && (e = "\\b" + e + "\\b");
    var f = new RegExp(e, d);
    return this.each(function() {
        jQuery.highlight(this, f, c.element, c.className)
    })
}, $(function() {
    var a = {};
    a.dd_cja_expyr = "Select";
    for (var b = 0; 31 > b; b++) a["dd_cja_expyr" + b] = b;
    var c = {};
    c.dd_cja_expmn = "Select";
    for (var b = 0; 12 > b; b++) c["dd_cja_expmn" + b] = b;
    var d = {};
    d.dd_cja_min = "Min", d.dd_cja_min12477 = "<0.5";
    for (var b = 1; 50 >= b; b++) d["dd_cja_min" + b] = b;
    var e = {};
    e.dd_cja_max = "Max", e.dd_cja_max12477 = "<0.5";
    for (var b = 1; 50 >= b; b++) e["dd_cja_max" + b] = b;
    e.dd_cja_max10000000 = ">50", $(".wrappendInputs .cover").on("focus", "input", function(a) {
        $(a.delegateTarget).toggleClass("active")
    }), $(".wrappendInputs .cover").on("blur", "input", function(a) {
        $(a.delegateTarget).toggleClass("active")
    });
    var f = !0,
        g = function() {
            f = !1;
            var b = {
                    autoComplete: "http://suggest.naukri.com/suggest/autosuggest?",
                    relatedConcept: "http://suggest.naukri.com/suggest/autoconcepts?",
                    checkVersion: "http://suggest.naukri.com/suggest/v?",
                    prefetch: "http://suggest.naukri.com/suggest/prefetch?"
                },
                g = {
                    url: b,
                    maxSuggestions: 15,
                    startSearchAfter: 2,
                    maxHeight: 388,
                    multiSearch: !0,
                    appId: "12",
                    sourceId: 3003,
                    relatedConceptText: "Suggested Keywords",
                    prefetchData: {
                        key: "__infoEdge/prefetch",
                        userCookie: "MYNAUKRI[UNID]"
                    },
                    showTitleForSingleBucket: !0,
                    form: $("#advFrm")
                },
                h = $.extend({}, {
                    category: {
                        top: "top"
                    },
                    relatedConceptsCategory: {
                        skill: "Skills"
                    },
                    startSearchAfter: 2,
                    relatedConceptsLimit: 5,
                    showRecentSearch: !0
                }, g),
                i = $("#advKeyskills");
            i.suggestor(h);
            var j = $.extend({}, {
                    category: {
                        location: "Location"
                    },
                    startSearchAfter: 2,
                    showRelatedConcept: !1,
                    showRecentSearch: !1
                }, g),
                k = $("#advLocation");
            k.suggestor(j), $("#dd_adv_workExp_year").singleDD({
                data: a,
                maxHeight: 290,
                prefillData: "",
                sortPrefix: "dd_cja_expyr"
            }), $("#dd_adv_workExp_month").singleDD({
                data: c,
                maxHeight: 290,
                prefillData: "",
                sortPrefix: "dd_cja_expmn"
            });
            var l = $("#dd_adv_exp_min"),
                m = $("#dd_adv_exp_max");
            l.singleDD({
                data: d,
                maxHeight: 290,
                prefillData: "",
                callBack: function(a) {
                    var b = n.index(l.find("#dd_cja_min" + a));
                    $("#dd_adv_exp_max input").each(function(a, b) {
                        b.value = ""
                    }), m.find("li").remove();
                    var c = 0;
                    for (key in e)(0 == c || c >= b) && m.find("ul").append('<li id="' + key + '">' + e[key] + "</li>"), c++
                },
                sortPrefix: "dd_cja_min"
            }), m.singleDD({
                data: e,
                maxHeight: 290,
                prefillData: "",
                sortPrefix: "dd_cja_max"
            }), $("#dd_adv_jobCategory").singleDD({
                data: global.dd.fareaDD,
                maxHeight: 290,
                prefillData: ""
            });
            var n = $("#dd_adv_exp_min .sDrop li");
            $("#dd_adv_exp_max .sDrop li");
            multiToggle.init();
            var o = new DD({
                id: {
                    ddAdvIndusrty: [global.dd.indDD]
                },
                checkBox: !0,
                placeHolderText: "Select the desired industry where you want to work",
                maxTagsCount: 2,
                onTagCreate: function(a) {
                    "Maximum Tags Created" == a && setTimeout(function() {
                        o.hideDD()
                    }, 500)
                }
            });
            customScroll.init()
        };
    global.layers.advanceSearch.disable ? g() : ($(".target_advanceSeachLayer").click(function(a) {
        a.preventDefault()
    }), $(".target_advanceSeachLayer").lightBox({
        ltBox: $("#advanceSearchLayer"),
        resetForm: !1,
        dimens: {
            width: "700px"
        },
        open: {
            anim: {
                className: "flipOpen"
            },
            success: function() {
                f && g()
            }
        },
        close: {
            nodes: $("#advanceSearchLayer .ltGlobalCls"),
            anim: {
                className: "flipClose",
                duration: 300
            },
            returnFocus: !1
        }
    }));
    var h = $("[name=advanceSearchForm]");
    h.length && (cv_adv = new commonValidator, cv_adv.validate({
        formNames: ["advanceSearchForm"],
        errors: common_ErrorList,
        styles: {
            errorClass: "err",
            okClass: "ok",
            softMandClass: "softMand",
            parentObjectClass: "row",
            maxLevel: 10
        },
        beforeSubmit: function() {
            if (cv_adv.isValid()) {
                var a = $("#advKeyskills").find(".sugInp"),
                    b = a.val(),
                    c = "Skills,Designation & Companies",
                    d = $("#advLocation").find(".sugInp").val(),
                    e = "Enter the cities you want to work in",
                    f = $("#hid_ddAdvIndusrty").val(),
                    g = $("#dd_adv_jobCategoryHid").val();
                setTrackingforPosZero($("#hid_advKeyskills"), a);
                var i = {
                        1: "finance-jobs",
                        2: "interior-design-jobs",
                        3: "design-jobs",
                        4: "restaurants-jobs",
                        5: "journalism-jobs",
                        6: "bank-jobs",
                        7: "consultant-jobs",
                        8: "bpo-jobs",
                        9: "entrepreneur-jobs",
                        10: "import-export-jobs",
                        11: "data-entry-jobs",
                        12: "hr-jobs",
                        13: "legal-jobs",
                        14: "logistics-jobs",
                        15: "marketing-jobs",
                        16: "biotechnology-jobs",
                        18: "packaging-jobs",
                        19: "maintenance-jobs",
                        20: "project-management-jobs",
                        21: "design-engineer-jobs",
                        22: "sales-jobs",
                        24: "information-technology-jobs",
                        24.01: "maintenance-jobs",
                        24.02: "client-server-programming-jobs",
                        24.03: "dba-jobs",
                        24.04: "erp-jobs",
                        24.05: "vlsi-jobs",
                        24.06: "network-administrator-jobs",
                        24.07: "information-technology-jobs",
                        24.08: "testing-jobs",
                        24.09: "system-programming-jobs",
                        "24.10": "telecom-jobs",
                        24.11: "mis-jobs",
                        24.12: "internet-jobs",
                        24.13: "mainframe-jobs",
                        24.14: "mobile-jobs",
                        24.15: "middleware-jobs",
                        catid_1: "non-it-management-jobs",
                        catid_2: "it-management-jobs",
                        catid_22: "fresher-jobs",
                        catid_28: "govt-jobs",
                        catid_29: "jobs-in-overseas-international",
                        catid_31: "pharma-jobs",
                        catid_57: "retail-jobs",
                        36: "teaching-jobs",
                        37: "technical-support-jobs",
                        41: "other-jobs",
                        42: "fashion-designing-jobs",
                        43: "film-jobs",
                        44: "travel-jobs",
                        45: "security-jobs",
                        81: "analytics-jobs",
                        82: "shipping-jobs"
                    },
                    j = {
                        2: "airline-jobs",
                        3: "garments-jobs",
                        4: "automobile-jobs",
                        6: "petrochemical-jobs",
                        7: "bpo-jobs",
                        8: "finance-jobs",
                        9: "fmcg-jobs",
                        10: "consumer-durables-jobs",
                        12: "construction-engineering-jobs",
                        13: "import-export-jobs",
                        14: "bank-jobs",
                        15: "networking-jobs",
                        16: "industrial-jobs",
                        17: "insurance-jobs",
                        18: "courier-jobs",
                        19: "media-jobs",
                        20: "medical-jobs",
                        21: "automation-jobs",
                        22: "pharma-jobs",
                        23: "oil-and-gas-jobs",
                        24: "retail-jobs",
                        25: "information-technology-jobs",
                        26: "teaching-jobs",
                        27: "telecom-jobs",
                        28: "electronics-jobs",
                        29: "other-industry-jobs",
                        30: "interior-design-jobs",
                        31: "fresher-jobs",
                        32: "advertising-jobs",
                        33: "agriculture-jobs",
                        34: "recruitment-jobs",
                        35: "jewellery-jobs",
                        36: "legal-jobs",
                        37: "ngo-jobs",
                        38: "printing-jobs",
                        39: "real-estate-jobs",
                        40: "security-jobs",
                        41: "fertilizers-jobs",
                        42: "govt-jobs",
                        43: "paper-jobs",
                        44: "shipping-jobs",
                        45: "tyres-jobs",
                        46: "aviation-jobs",
                        47: "facility-management-jobs",
                        48: "kpo-jobs",
                        49: "glass-jobs",
                        50: "brewery-distillery-jobs",
                        51: "water-treatment-jobs",
                        52: "management-consulting-jobs",
                        53: "iron-steel-jobs",
                        54: "mining-jobs",
                        55: "electrical-jobs",
                        56: "animation-jobs",
                        57: "food-processing-jobs",
                        58: "publishing-jobs",
                        59: "sports-jobs",
                        60: "ceramics-jobs",
                        61: "air-conditioning-jobs",
                        63: "internet-jobs",
                        64: "sugar-jobs",
                        65: "broadcasting-jobs",
                        66: "leather-jobs"
                    };
                if ("" != f) {
                    f = $.parseJSON(f);
                    var k = f[0],
                        l = j[k]
                }
                if ("" != b || "" != d) var l = generateStaticURLFunction(b, d, c, e);
                else if ("" != g) var l = i[g];
                l = qsbDomainPath() + l, l += "?src=advance_search", $("#advFrm").get(0).setAttribute("action", l);
                for (var m = 0; m < f.length; m++) $("<input>").attr({
                    type: "hidden",
                    name: "qi[]",
                    value: f[m]
                }).appendTo("#advFrm");
                $("#hid_ddAdvIndusrty").remove(), h[0].submit()
            }
        }
    }))
});
var qsbForm = null,
    generateStaticURLFunction = null,
    qsbDomainPath = null,
    qsbFormObj = $("#qsbForm");
$(function() {
    function a() {
        var a = "guaranteed|100% garunteed|100 garunteed|100% guaranteed|100 guaranteed|100% Job Assistance|100 Job Assistance|Account no|Account number|Amount|Application fee|Arsehole|Ass|Ass fuck|Ass hole|Asshole|Attractive discounts|Auctus|Bastard|Bescumber|Bimbo|Bitch|Bomb blast|Boobs|Breast|Blow|Bullshit|Butt|By Industry Professionals|Certification Program|Certification Programme|Charges|Coccydynia|Cock|Cocksucker|Complimentary cover letter|Congratulations|Costs|Courses we offer|Criminal|Cunt|Dag|Degree Program|Degree Programme|Deposit cash|Deposit the cash|Detailed resume critique|Dick|Discount|Discover a bright future in ERP|Donkey|Dope|Dork|Early Bird Offer|Economy Pack|Electronic mail award promotion|Express Resume|Facial|Fart|FESTIVAL OFFER|For admission|For Enquiries|For Enquiries and Registration|For Registration|Freak|Free|Free Class|Free Demo|Free Demo Class|Free registration|Frenchify|Fuck|Fucking|Fucker|Fuckhole|Full Payment|Funds to an account|Gangbang|Garunteed placement|Gasbag|Get Certified|Get Trained|Get Trained Certified & Placed !|Goose|Guarantee|Guaranteed placement|Guaranty|High Paying|I luv You|Illegal|In favor of|In favour of|Interview knowhows|Jackpot lottery|Jerk|Job opportunities|LIC of India|Lick|Lottery|LOTTERY DRAW|Lotto|Loudmouth|Lucky winners|Microphallus|Mothafucka|Motherfucker|Murder|Murderer|New Batch|New Batches|NEW BATCHES STARTING|Nigerian local office|Nigga|Nigger|Nominated bank account|Nonsense|Nut|Offer letter|Opportunities!!!!!!!!!|Opportunity!!!|Paedophile|Participate as an investor|Partner naukri.com|Payment|Penis|Placement assistance|Porn|Premium Resume Development|Privately looking|Pussy|Pyt|Rape|Rapist|Redneck|Refugee camp|Refundable|Replacement Clause|Resume Critique|Resume Development|Resume Flash|Scam|Scholarship|Scum|Scumbag|Sex|Shit|Sicko|Skill oriented course|Smartass|Start-Up Kit|Student visa|Suck|Through Industry Professionals|Tight ass|Tits|Training Cum Placement|Turd|Twat|Twerp|Twit|Urgent Attention|Valid till|Value Pack|We charge|Will of god|Winning|Wish to invite|Wog|Wop|WORLDWIDE OPPORTUNITIES|Yid|Yob|You are a winner|sexual harassment|terror|terrorist|anus|assclown|asses|ass-hole|assbanger|assbite|asshead|asswipe|boob| bar girl|bar girls|bitchy|bisexual|sexual|blowjob|blowjobs|bollocks|call girl|call girls|cunnilingus|cuntface|cuntass|cum|dickbag|dickfuck|dickfucker|dickhead|dickjuice|dickweed|dumass|fag|faggot| female escort|fellatio|fuckbutt|fuckhead|fuckup|gay|gayass|gayfuck|gringo|guido| gooch|handjob|homo|hump|homosexual|homo|hot mms|humping|hell|hoe|ho|jackass|jagoff|jap|jizz|jerkoff|kyke|kraut|kunt|lesbian|lesbo|lezzie|muthafucka|male escort|motherfucking| nude|nude jobs|nude girl|nude girls|nude party girls|nude party girl|negro|nutsack|paki|pecker| party girls|party girl|piss|poontang|pedophile|pedo|prostitute|puta|queef|queer|schlong|shitass|shitbrains|shitter|shitting|suckass|titfuck|titty|titties|twat|vag|vagina|vajayjay|wank|whore|whorebag|whoreface|whores|xxx|xxxgirls|xxx girls|gigolo|prostitution|terrorism|sexy|nude boy|nude boys|nude party boys|nude party boy|premium",
            b = a.split("|");
        return b
    }

    function b(a, b, c) {
        return a.replace(new RegExp(b, "gi"), c)
    }

    function c(c, d) {
        if (void 0 !== d) {
            var e = new RegExp(d, "ig");
            c = c.replace(e, "").replace(/\s{2,}/g, " ")
        }
        for (c = c.toLowerCase(), c = c.replace(/\s{2,}/g, " "), c = c.replace(/\bjobs in\b/gi, ""), c = c.replace(/\bjobs\b/gi, ""), c = c.replace(/\blimited\b/gi, ""), c = c.replace(/\bcorporation\b/gi, ""), c = c.replace(/\bcareers\b/gi, ""), c = c.replace(/\band\b/gi, ""), c = c.replace(/\bor\b/gi, ""); - 1 !== c.indexOf("c++ c++");) c = c.replace("c++ c++", "c++");
        var f = a();
        for (var g in f) c = b(c, "\\b" + f[g].toLowerCase() + "\\b", "");
        return c = b(c, ",", " "), c = c.replace(/[^.+#\-'" a-zA-Z0-9]/gi, " ").replace(/and {1,}$/g, "")
    }

    function d(c, d) {
        if (void 0 !== d) {
            var e = new RegExp(d, "ig");
            c = c.replace(e, "")
        }
        c = c.replace(/\bjobs in\b/gi, ""), c = c.replace(/\bjobs\b/gi, ""), c = c.split("\\").join(" "), c = c.split("/").join(" "), c = c.split(".").join(" "), c = c.replace(/[^, a-zA-Z]/gi, "").replace(/,{1,}$/g, ""), c = b($.trim(c).toLowerCase(), "  ", " ");
        var f = a();
        for (var g in f) c = b(c, "\\b" + f[g].toLowerCase() + "\\b", "");
        var h = c.length;
        return "," === c.substring(h - 1, h) && (c = c.substring(0, h - 1)), c
    }

    function e(a, e, i, j) {
        var k = "",
            l = "",
            m = "",
            n = {
                "+": " plus ",
                "#": " sharp ",
                ".": " dot ",
                "-": " dash ",
                '"': " quotes ",
                "'": " quotes ",
                "/": " "
            };
        if (a = c(a, i), e = d(e, j), "" !== a) {
            var o = $.trim(a).toLowerCase(),
                p = o.split(",");
            for (var q in p) {
                for (var r in n) p[q] = b(p[q], "\\" + r, n[r]);
                p[q] = $.trim(b(p[q], "\\s{2,}", " "))
            }
            k = p.join(" ")
        }
        if ("" !== e) {
            var s = e.split(",");
            l = s[0]
        }
        var t = getSection();
        m = "psu" === t ? g(k, l, m) : "rp" === t ? h(k, l, m) : f(k, l, m), m = m.replace(/[\s]*plus[\s]+(plus[\s]*)+/gi, " + "), m = m.replace(/-/g, " ").replace(/\s{2,}/g, " ");
        var u;
        do u = m, m = u.replace(/\s(\w+\s)\1/, " $1"), m = m.replace(/^(\w+\s)\1/, "$1"), m = m.replace(/(\s\w+)\1$/, "$1"); while (m.length !== u.length);
        for (; - 1 !== m.indexOf(" + ");) m = m.replace(" + ", " plus plus ");
        return m = $.trim(m).replace(/\s/g, "-"), "" === m && (m = "jobs-in-india"), m
    }

    function f(a, b, c) {
        return "" === a && "" !== b ? c = c + "jobs in " + b : "" !== a && "" === b ? c = c + a + " jobs" : "" !== a && "" !== b && (c = c + a + " jobs in " + b), c
    }

    function g(a, b, c) {
        return "" === a && "" !== b ? c = c + "psu government jobs in " + b : "" !== a && "" === b ? c = c + "psu government jobs for " + a : "" !== a && "" !== b && (c = c + "psu government jobs for " + a + " in " + b), c
    }

    function h(a, b, c) {
        return "" == a && "" != b ? c = c + "recruiters in " + b : "" != a && "" == b ? c = c + a + " recruiters" : "" != a && "" != b && (c = c + a + " recruiters in " + b), c
    }

    function i(a, b, c) {
        var d = new Array("", "", "", ""),
            e = "",
            f = $("#skill").find(".sugInp"),
            g = $("#location").find(".sugInp"),
            h = f.val(),
            i = g.val(),
            j = $("#exp_ddHid").val(),
            k = $("#salary_ddHid").val(),
            l = $("#Sug_farea").val(),
            m = "";
        if ("undefined" == typeof h || h === f.attr("placeholder") || "" === h ? h = "" : e = h + ", ", "undefined" == typeof i || i === g.attr("placeholder") || "" === i ? i = "" : e += i + ", ", "undefined" != typeof j && "" !== j) {
            var n = 1 === j ? "yr" : "yrs";
            e += j + " " + n + ", "
        } else j = "";
        if ("undefined" != typeof k && "" !== k) {
            var o = 1 >= k || "12477" === k ? "Lakh" : "Lakhs";
            e += (1 > k || "12477" === k ? "<1" : k) + " " + o + ", "
        } else k = "";
        if ("undefined" == typeof l || l === $("#Sug_farea").attr("placeholder") ? l = "" : e += l + ", ", "" !== h || "" !== i || "" !== l) {
            e = e.replace(/\s{1,}/g, " ").replace(/,\s{1,}$/g, "");
            var p = e;
            h = encodeURIComponent(h), i = encodeURIComponent(i), e = encodeURIComponent(e), e.length > 30 && (p = p.substring(0, 27) + "..."), p = encodeURIComponent(p);
            var q = new Array(h, i, j, k, "qx", l, m, d[0], d[1], d[2], d[3], e, p);
            return {
                newSearchStr: e,
                newSearchStrTrimmed: p,
                data: q
            }
        }
    }

    function j(a, b, c) {
        var d = i(a, b, c),
            e = d.newSearchStr.replace(/\s{1,}/g, "").toLowerCase(),
            f = getRecentSearchArray(a, b);
        for (var g in f) f[g][11].replace(/\s{1,}/g, "").toLowerCase() === e && f.splice(g, 1);
        var h = d.data;
        f.push(h), f.length > 3 && f.shift();
        var j = jQuery.stringify(f);
        setCookie(a + "[" + b + "]", j, "1500", "/", I)
    }

    function k(a, b, c) {
        var d = getRecentSearchArray(b, c);
        if (!d) return null;
        var e = d[a];
        if (!e) return null;
        e[0] = decodeURIComponent(e[0]), e[0] = e[0].replace('/"/', '"');
        var f = [],
            g = ["qp", "ql", "qe", "qm", "", "farea"],
            h = 0;
        for (var i in g) {
            var j = g[i];
            if ("" !== j) {
                var k = e[h],
                    l = j + "=" + encodeURIComponent(k);
                f.push(l)
            }
            h++
        }
        return f.push("qsb_section=" + c), f.join("&")
    }

    function l() {
        for (var a = "rcnt_srch", b = getSection(), c = [], d = getRecentSearchArray(a, b), e = 0; e < d.length; e++) {
            var f = k(e, a, b);
            f && c.push(f)
        }
        return c
    }

    function m() {
        var a = 60,
            b = l(),
            c = new Date;
        if (b.length) {
            if (localStorage.getItem("rs")) {
                var d = $.parseJSON(localStorage.getItem("rs"));
                for (var e in b) {
                    for (var f, g = b[e].split("&"), h = "", i = 0; i < g.length; i++) {
                        var j = g[i].split("=");
                        h += decodeURIComponent(j[1]).replace(/[" "]+/g, "")
                    }
                    f = d[h] ? parseInt(d[h].qrefresh) : c.getTime();
                    var k = "&qrefresh=" + f;
                    b[e] = b[e] + k
                }
            } else
                for (var k = "&qrefresh=" + c.getTime(), e = 0; e < b.length; e++) b[e] = b[e] + k;
            for (var m = Object.create(b), e = 0; e < m.length; e++) m[e] = encodeURIComponent(m[e]);
            $.ajax({
                url: window.srchCountUrl,
                method: "GET",
                data: "param=" + JSON.stringify(m),
                success: function(b) {
                    var d = $.parseJSON(b),
                        e = parseInt(c.getTime()) + parseInt(60 * a * 1e3),
                        f = {
                            rs: {}
                        },
                        g = $(".recentSearches .p0L10 li"),
                        h = l();
                    for (var i in h) {
                        for (var j = h[i].split("&"), k = "", m = 0; m < j.length; m++) {
                            var n = j[m].split("=");
                            k += decodeURIComponent(n[1]).replace(/[" "]+/g, "")
                        }
                        if (f.rs[k] = {}, f.rs[k].count = d[i], localStorage.getItem("rs")) {
                            var o = $.parseJSON(localStorage.getItem("rs"));
                            o[k] ? f.rs[k].qrefresh = o[k].qrefresh : f.rs[k].qrefresh = c.getTime()
                        } else f.rs[k].qrefresh = c.getTime();
                        f.rs[k].expires = e, $(g[i]).find("span.count") && $(g[i]).find("span.count").remove();
                        var p = d[d.length - i - 1];
                        parseInt(p) > 999 && (p = "999+"), p ? $(g[i]).find("a").append('<span class="count">' + p + "</span>") : ""
                    }
                    json = f.rs;
                    try {
                        $(".recentSearches .p0L10 .count").addClass("animate"), localStorage.setItem("rs", JSON.stringify(json))
                    } catch (q) {}
                },
                error: function(a) {}
            })
        }
    }

    function n() {
        function a(a) {
            var b = 0;
            for (var c in a) a.hasOwnProperty(c) && b++;
            return b
        }
        try {
            if (!localStorage.getItem("rs") && window.sendSrchCountAjax) m();
            else {
                var b = $.parseJSON(localStorage.getItem("rs")),
                    c = new Date,
                    d = a(b),
                    e = l(),
                    f = 0;
                for (var g in e) {
                    for (var h = e[g].split("&"), i = "", j = 0; j < h.length; j++) {
                        var k = h[j].split("=");
                        i += decodeURIComponent(k[1]).replace(/[" "]+/g, "")
                    }
                    b.hasOwnProperty(i) && (f += 1)
                }
                for (var n in b) {
                    if (parseInt(b[n].expires) < c.getTime() || f != d) return void(window.sendSrchCountAjax ? m() : "");
                    break
                }
                b = $.parseJSON(localStorage.getItem("rs"));
                for (var o = $(".recentSearches .p0L10 li"), g = 0; g < o.length; g++) {
                    for (var h = e[o.length - 1 - g].split("&"), i = "", j = 0; j < h.length; j++) {
                        var k = h[j].split("=");
                        i += decodeURIComponent(k[1]).replace(/[" "]+/g, "")
                    }
                    var p = b[i].count;
                    parseInt(p) > 999 && (p = "999+"), $(o[g]).find("span.count") ? $(o[g]).find("span.count").remove() : "", 0 == b[i].count ? $(o[g]).find("a").append("") : $(o[g]).find("a").append('<span class="count">' + p + "</span>"), $(".recentSearches .p0L10 .count").addClass("animate")
                }
            }
        } catch (q) {
            window.sendSrchCountAjax ? m() : ""
        }
    }

    function o(a, b, c, d) {
        var f = getRecentSearchArray(b, c),
            g = l(),
            h = f[a];
        h[1] = decodeURIComponent(h[1]), h[0] = decodeURIComponent(h[0]), h[0] = h[0].replace('/"/', '"');
        var i = qsbFormObj.attr("data-action");
        ("" !== h[0] || "" !== h[1]) && (i = q(), "premium" !== J && "premiumMba" !== c && "premiumEngg" !== c || "undefined" == typeof J || (i += "premium-"), i += e(h[0], h[1]));
        var j = "";
        if ($("input[name=xz]", qsbFormObj).length > 0) {
            j = $("input[name=xz]", qsbFormObj).val();
            var k = j.split("_");
            k[1] = "13", j = k.join("_")
        }
        var m = ["qp", "ql", "qe", "qm", "", "farea"],
            n = $("<form id='rcnt_srch_frm' method='post' />").attr("action", i),
            o = 0;
        for (var p in m) {
            var r = m[p];
            if ("" !== r) {
                var s = h[o],
                    t = $('<input type="hidden" />').attr("name", r).val(s);
                n.append(t)
            }
            o++
        }
        if (g.length && window.sendSrchCountAjax) {
            for (var u = $.parseJSON(localStorage.getItem("rs")), v = g[g.length - 1 - d].split("&"), w = "", o = 0; o < v.length; o++) {
                var x = v[o].split("=");
                w += decodeURIComponent(x[1]).replace(/[" "]+/g, "")
            }
            var y = parseInt(u[w].qrefresh),
                z = u[w].count;
            if (z) {
                var A = $('<input type="hidden" />').attr("name", "qrefresh").val(y);
                n.append(A);
                var B = $('<input type="hidden" />').attr("name", "src").val("rcntSrchWithCount");
                n.append(B)
            }
            if (!z) {
                var B = $('<input type="hidden" />').attr("name", "src").val("rcntSrchWithoutCount");
                n.append(B)
            }
            u[w].qrefresh = (new Date).getTime(), u[w].count = 0, localStorage.setItem("rs", JSON.stringify(u))
        }
        var C = $('<input type="hidden" name="xz" />').val(j);
        n.append(C), n.append($('<input type="hidden" />').attr("name", "qsb_section").val(c));
        var D = f.splice(a, 1)[0];
        f.push(D);
        var E = jQuery.stringify(f);
        setCookie(b + "[" + c + "]", E, "1500", "/", I), $(".recentSearches").append(n), n.submit()
    }

    function p(a, b) {
        if ($(".recentSearches").length) {
            var c = getRecentSearchArray(a, b);
            if ("undefined" === c || !c.length) return void $(".recentSearches").hide();
            var d = "";
            for (var e in c) {
                var f = decodeURIComponent(c[e][11]),
                    g = decodeURIComponent(c[e][12]);
                g = $("<div />").text(g).html(), f = f.replace(/\"/g, " "), d = '<li title="' + f + '"><a data-count="' + e + '" href="javascript:void(0);"><span class="rsLabel">' + g + "</span></a></li>" + d
            }
            d = '<h2 class="noBorder_large_title">Recent Searches</h2><ul class="p0L10">' + d + "</ul>";
            var h = $(d);
            $("a", h).click(function() {
                var a = $(this).parent().index();
                return o($(this).attr("data-count"), H, b, a), !1
            }), $(".recentSearches").append(h).show()
        }
    }

    function q() {
        return void 0 == qsbFormObj || 0 == qsbFormObj.length ? $(".target_advanceSeachLayer").attr("data-domain") : qsbFormObj.attr("data-domain")
    }
    if (window.qsbModel) {
        var r = {
                autoComplete: qsbModel.autoSuggestURL,
                relatedConcept: qsbModel.relatedConcept,
                checkVersion: qsbModel.caching,
                prefetch: qsbModel.prefetchingURL
            },
            s = {
                url: r,
                whiteListSpecialChar: "#+./&",
                multiSearch: qsbModel.multiSearch,
                maxHeight: qsbModel.maxHeight,
                maxSuggestions: qsbModel.maxSuggestions,
                scrollStyle: !1,
                relatedConceptText: "Suggested Keywords",
                appId: qsbModel.appID,
                sourceId: 3e3,
                prefetchData: {
                    key: "__infoEdge/prefetch",
                    userCookie: "MYNAUKRI[UNID]"
                },
                width: "100%",
                showTitleForSingleBucket: !0,
                form: $("#qsbForm")
            },
            t = $("#skill");
        if (t.length > 0) {
            var u = $.extend({}, {
                category: {
                    top: "top"
                },
                relatedConceptsCategory: {
                    skill: "Skills"
                },
                startSearchAfter: t.attr("data-start_search_after"),
                trackUserInteraction: !0,
                relatedConceptsLimit: 5,
                showRecentSearch: !0
            }, s);
            skillInstance = t.suggestor(u)
        }
        var v = $("#location");
        if (v.length) {
            var w = qsbModel.plocationCategory || {
                    location: "Location"
                },
                x = getSection();
            "ni" === x && (w = {
                internationallocation: "Location"
            });
            var y = $.extend({}, s, {
                startSearchAfter: v.attr("data-start_search_after"),
                showRelatedConcept: !1,
                category: w,
                showRecentSearch: !1
            });
            locInstance = v.suggestor(y)
        }
    } - 1 == navigator.appVersion.indexOf("MSIE 7.") && (qsbFormObj.find(".sugInp").on("focus", function() {
        $("html").addClass("scrnBlr")
    }), $(".headGNBWrap, .blrLyr, .blrLyr .close").on("click", function() {
        $("html").removeClass("scrnBlr")
    }));
    var z = $("#salary_dd"),
        A = $("#exp_dd"),
        B = -1;
    void 0 != z.data("suggestor_min") && (B = z.data("suggestor_min"));
    var C = {};
    C.a = "Select";
    var D = " Lac";
    1 > B && (C.a12477 = "<1 Lac", B = 1, D = "");
    for (var E = B; 50 >= E; E++) C["a" + E] = E + D, D = "";
    C.a10000000 = "50+";
    var F = {};
    F.a = "Select", F.a0 = "0 Year";
    for (var G = 1; 30 >= G; G++) F["a" + G] = G;
    A.length > 0 && A.singleDD({
        data: F,
        maxHeight: 316,
        prefillData: A.attr("data-value"),
        sortPrefix: "a"
    }), z.length > 0 && z.singleDD({
        data: C,
        maxHeight: 316,
        prefillData: z.attr("data-value"),
        sortPrefix: "a"
    }), generateStaticURLFunction = e;
    var H = "rcnt_srch",
        I = window.qsbModel ? qsbModel.cookieDomainName || "" : "";
    if (qsbDomainPath = q, qsbFormObj.length > 0) {
        var J = getSection();
        p(H, J), window.sendSrchCountAjax && n(), qsbForm = new commonValidator, qsbForm.validate({
            formNames: ["qsbForm"],
            errors: common_ErrorList,
            styles: {
                errorClass: "err",
                okClass: "ok",
                parentObjectClass: "qsbSec",
                maxLevel: 7
            },
            beforeSubmit: function() {
                var a = $("#skill").find(".sugInp"),
                    b = $.trim(a.val()).replace(/,$/, "");
                a.val($.trim(a.val()).replace(/,$/, "")), skillInstance.posIndex = 0, skillInstance.setTrackingObject.call(skillInstance, b)
            }
        }), qsbFormObj.on("submit", function(a) {
            if (a.preventDefault(), qsbForm.isValid() === !1) return !1;
            var b = q();
            "premium" !== J && "premiumMba" !== x && "premiumEngg" !== x || "undefined" == typeof J || (b += "premium-");
            var c = $("#skill").find(".sugInp"),
                d = $("#location").find(".sugInp");
            b += e(c.val(), d.val(), c.attr("placeholder"), d.attr("placeholder")), qsbFormObj.attr("action", b), j(H, J, 0), qsbForm.sanitizeDefaultValues(), qsbFormObj[0].submit()
        })
    }
}), global.loginState = {
    logout: 0,
    loggedIn: 1,
    remem: 2
};
var getLoginState = function() {
        return "" != global.username && "" == global.isRemembered ? global.loginState.loggedIn : "" != global.username && "" != global.isRemembered ? global.loginState.remem : global.loginState.logout
    },
    successAjaxSavedJob = 0,
    loginState = getLoginState(),
    isLoginRequired = loginState == global.loginState.logout;
init_saveJob(), $(".loginBtn").on("click", function() {
    var a = $(this);
    global.layers.loginLayer.data.showLB = 1, openLoginBox({
        successCallback: function() {
            afterLogin(a)
        }
    })
}), $(function() {
    customScroll.init(), $(".footer .nCarousel").carousel({
        shifts: 2,
        size: 4,
        duration: 1e3
    })
}), $(function() {
    var a = $('[name="formpZero"]');
    if (a.length) {
        var b = new commonValidator;
        b.validate({
            formNames: ["formpZero"],
            errors: common_ErrorList,
            styles: {
                errorClass: "err",
                okClass: "ok",
                softMandClass: "softMand",
                parentObjectClass: "row",
                maxLevel: 2
            },
            submitButton: ["p0submit"]
        }), a.on("submit", function(c) {
            c.preventDefault();
            var d = $("#emailId").val();
            $("#email2").val(d), b.isValid() && handlePZeroForm(a, $("#checkP0EmailUrl").val(), d)
        })
    }
}), $(function() {
    var a = $(".target_premiumLayer");
    a.click(function(b) {
        b.preventDefault(), "premmba" == getCookie("premType") ? window.location.href = global.premium.mbaUrl : "premengg" == getCookie("premType") ? window.location.href = global.premium.enggUrl : a.lightBox().open()
    }), a.lightBox({
        ltBox: $("#premiumLayer"),
        dimens: {
            width: "700px"
        },
        open: {
            anim: {
                className: "flipOpen"
            },
            event: ""
        },
        close: {
            nodes: $("#premiumLayer .ltGlobalCls"),
            layer: !0,
            anim: {
                className: "flipClose",
                duration: 300
            }
        }
    }), $("#mbaJobsBtn").click(function() {
        setCookie("premType", "premmba", "1500", "/", premCookieDomainName), window.location.href = global.premium.mbaUrl
    }), $("#engJobsBtn").click(function() {
        setCookie("premType", "premengg", "1500", "/", premCookieDomainName);
        var a = document.URL; - 1 != a.indexOf("jobs-for-iit-engineering-graduates") ? $(".target_premiumLayer").lightBox().close() : window.location.href = global.premium.enggUrl
    })
});
var catUrlMap = {
    alleng: "all-jobs",
    allmba: "all-categories",
    bankfin: "finance-banking",
    salesmkgt: "marketing-sales",
    cnsltg: "consulting",
    hr: "hr-human-resource",
    itsys: "it-systems",
    scmop: "operations",
    bpo: "bpo-kpo",
    it: "it-information-technology",
    infra: "energy-infra",
    semielec: "electronics",
    prodmfg: "production",
    rnd: "analytics"
};
if (init_checkBoxSrpTuple(), setCookie("MYNAUKBMS[resolution]", $(window).width()), window.zedoParam && !$.isEmptyObject(zedoParam)) var zedoSlots = $("[zedoSlot]"),
    count = 0,
    zmt_mtag = zmt_get_tag(zedoParam.naukriId, zedoParam.pageId);
window.onmessage = function(a) {
    iframe_callback(a)
};
var fileOps = function() {
    var a = {
        cF: function(b) {
            var c = a,
                d = e = c.gF(b).name,
                e = c.gF(b).ext,
                f = !1;
            switch (e) {
                case "js":
                    for (var g = $("script"), h = 0; h < g.length; h++) {
                        var i = g.eq(h).attr("src");
                        i && i.indexOf(d) >= 0 ? f = !0 : ""
                    }
                    break;
                case "css":
                    for (var j = $("link"), k = 0; k < j.length; k++) {
                        var l = j.eq(k).attr("href");
                        l && l.indexOf(d) >= 0 ? f = !0 : ""
                    }
            }
            return f
        },
        iF: function(b, c) {
            function d() {
                h && "loading" !== h || (h = "loaded", c && c(b, h))
            }

            function e() {
                var a;
                h && "loading" !== h || (a = scr.readyState, "complete" === a && d())
            }

            function f() {
                h && "loading" !== h || (h = "error", c && c(b, h))
            }
            var g = a,
                h = !1;
            if (g.cF(b)) return void(c && c(b, "exist"));
            var i, j, k = g.gF(b).ext;
            switch (k) {
                case "js":
                    i = $("<script>").attr({
                        type: "text/javascript"
                    });
                    break;
                case "css":
                    i = $("<link>").attr({
                        type: "text/css",
                        rel: "stylesheet"
                    })
            }
            j = i.get(0), j.onload = d, j.onreadystatechange = e, j.onerror = f, $("head").append(i), "js" == k ? i.attr({
                src: b
            }) : i.attr({
                href: b
            }), h = "loading"
        },
        gF: function(a) {
            var b = new RegExp(/\.([0-9a-z]+)(?:[\?#]|$)/i),
                c = a.match(b)[1],
                d = a.substring(a.lastIndexOf("/") + 1, a.lastIndexOf(c));
            return {
                name: d + c,
                ext: c
            }
        }
    };
    return {
        checkFile: a.cF,
        injectFile: a.iF
    }
}();
$(function() {
    var a = $(".multipleJobsApply .srp_head");
    a.length && a.sticky({
        topLimit: $(".container>.srp_container .row").eq(1),
        "class": "sticky",
        relatedTo: "top",
        bottomLimit: $(".container>.srp_container .row").eq(-3)
    })
});
