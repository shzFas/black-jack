var Scriptaculous = {
    Version: "1.8.2",
    require: function (r) {
        document.write('<script type="text/javascript" src="' + r + '"></script>');
    },
    REQUIRED_PROTOTYPE: "1.6.0.3",
    load: function () {
        function r(r) {
            var t = r.replace(/_.*|\./g, "");
            return (t = parseInt(t + "0".times(4 - t.length))), r.indexOf("_") > -1 ? t - 1 : t;
        }
        if ("undefined" == typeof Prototype || "undefined" == typeof Element || void 0 === Element.Methods || r(Prototype.Version) < r(Scriptaculous.REQUIRED_PROTOTYPE))
            throw "script.aculo.us requires the Prototype JavaScript framework >= " + Scriptaculous.REQUIRED_PROTOTYPE;
        var t = /scriptaculous\.js(\?.*)?$/;
        $$("head script[src]")
            .findAll(function (r) {
                return r.src.match(t);
            })
            .each(function (r) {
                var e = r.src.replace(t, ""),
                    c = r.src.match(/\?.*load=([a-z,]*)/);
                (c ? c[1] : "builder,effects,dragdrop,controls,slider,sound").split(",").each(function (r) {
                    Scriptaculous.require(e + r + ".js");
                });
            });
    },
};
Scriptaculous.load();
