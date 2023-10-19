
var Delighters = new (function() {
	var self = this,
			dels = this.dels = [],

			// default options
			options = {
				attribute: 	'data-delighter',
				classNames: ['delighter', 'started', 'ended'],
				start: 			0.75, // default start threshold
				end: 				0.75, // default end threshold
				autoInit: 	true 	// initialize when DOMContentLoaded
			};

	document.addEventListener("DOMContentLoaded", function() {
		if (options.autoInit) init();
	});

	function config(opts) {
		for (var name in opts) options[name] = opts[name];
	}
	
	function init() {		
		document.addEventListener('scroll', scroll)
		var els = document.querySelectorAll('[' + options.attribute + ']');

		for (var i=0; i<els.length; i++) {
			var el 			= els[i],
					def 		= el.getAttribute(options.attribute, 2),
					pairs 	= def.split(';'),
					del 		= {};
					del.start = options.start;
					del.end = options.end;
			
			for (var j=0; j<pairs.length; j++) {
				var pair 	= pairs[j].split(':'),
						name 	= pair[0],
						val 	= isNaN(pair[1] * 1)? pair[1] : pair[1] * 1;
				if (name) del[name] = (val === undefined)? true : val;
			}

			del.el = el;
			del.id = dels.length;
			dels.push(del);
			el.classList.add(options.classNames[0])
			if (del.debug) el.style.outline = 'solid red 4px';
		}
		scroll();
	}

	function scroll() {
		var viewportHeight = window.innerHeight;
		for (var i=0; i<dels.length; i++) {
			var del = dels[i],
					box = del.el.getBoundingClientRect(),
					factorStart = box.top / viewportHeight,
					factorEnd = box.bottom / viewportHeight;

			if (del.debug) {
				if (factorStart >= 0 && factorStart <= 1) {
					if (!del.startLine) {
						del.startLine = document.createElement('div')
						document.body.appendChild(del.startLine);
						del.startLine.style = 'position:fixed;height:0;width:100%;border-bottom:dotted red 2px;top:' + (del.start * 100) + 'vh';
					}
				}
				if (((factorEnd < del.end) || (factorStart > 1)) && del.startLine) {
					del.startLine.parentNode.removeChild(del.startLine);
					delete del.startLine;
				}
			}
			if (factorStart < del.start && !del.started) {
				del.started = true;
				del.el.classList.add(options.classNames[1])
			}
			else if (factorStart > del.start && del.started) {
				del.started = false;
				del.el.classList.remove(options.classNames[1])
			}
			if (factorEnd < del.end && !del.ended) {
				del.ended = true;
				del.el.classList.add(options.classNames[2])
			}
			else if (factorEnd > del.end && del.ended) {
				del.ended = false;
				del.el.classList.remove(options.classNames[2])
			}
		}
	}

	self.init = init;
	self.config = config;
})();
var Delighters = new function() {
    var t = this.dels = [],
        e = {
            attribute: "data-delighter",
            classNames: ["delighter", "started", "ended"],
            start: .75,
            end: .75,
            autoInit: !0
        };

    function s() {
        document.addEventListener("scroll", d);
        for (var s = document.querySelectorAll("[" + e.attribute + "]"), a = 0; a < s.length; a++) {
            var n = s[a],
                i = n.getAttribute(e.attribute, 2).split(";"),
                r = {};
            r.start = e.start, r.end = e.end;
            for (var l = 0; l < i.length; l++) {
                var o = i[l].split(":"),
                    c = o[0],
                    u = isNaN(1 * o[1]) ? o[1] : 1 * o[1];
                c && (r[c] = void 0 === u || u)
            }
            r.el = n, r.id = t.length, t.push(r), n.classList.add(e.classNames[0]), r.debug && (n.style.outline = "solid red 4px")
        }
        d()
    }

    function d() {
        for (var s = window.innerHeight, d = 0; d < t.length; d++) {
            var a = t[d],
                n = a.el.getBoundingClientRect(),
                i = n.top / s,
                r = n.bottom / s;
            a.debug && (i >= 0 && i <= 1 && (a.startLine || (a.startLine = document.createElement("div"), document.body.appendChild(a.startLine),
			 a.startLine.style = "position:fixed;height:0;width:100%;border-bottom:dotted red 2px;top:" + 100 * a.start + "vh")), 
			 (r < a.end || i > 1) && a.startLine && (a.startLine.parentNode.removeChild(a.startLine), delete a.startLine)),
			  i < a.start && !a.started ? (a.started = !0, a.el.classList.add(e.classNames[1])) : i > a.start && a.started && (a.started = !1, 
			  a.el.classList.remove(e.classNames[1])),
			   r < a.end && !a.ended ? (a.ended = !0, a.el.classList.add(e.classNames[2])) : r > a.end && a.ended && (a.ended = !1, a.el.classList.remove(e.classNames[2]))
        }
    }
    document.addEventListener("DOMContentLoaded", function() {
        e.autoInit && s()
    }), this.init = s, this.config = function(t) {
        for (var s in t) e[s] = t[s]
    }
};