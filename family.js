var filterId,
  _jData,
  htmlStr = "",
  topNodeIco = "fa-solid fa-users fa-lg",
  _baseUrl = "https://shrihari-lib.netlify.app/",
  Lineage = (function () {
    var e, t, a, i;
    function r(r) {
      this._params = r;
      var n = document.createElement("div");
      if (
        (n.setAttribute("class", "overlay"),
        (n.innerHTML =
          '<div class="overlay__inner"><div class="overlay__content"><span class="loader"></span></div></div>'),
        document.body.appendChild(n),
        void 0 === this._params.data ||
          null === typeof this._params.data ||
          "" == typeof this._params.data)
      )
        throw SyntaxError('You must pass "Data"');
      if (
        void 0 === this._params.container ||
        null === typeof this._params.container ||
        "" == this._params.container
      )
        throw SyntaxError('You must pass "Container"');
      if (
        ((this._params.elem = document.getElementById(this._params.container)),
        null == this._params.elem)
      )
        throw SyntaxError(
          'You must pass "Container" to generate tree, if you have passed the param check it existing in DOM or not.'
        );
      (function () {
        var r = document.createElement("link");
        (r.href = _baseUrl + "lineage.min.css"),
          (r.rel = "stylesheet"),
          document.head.appendChild(r);
        var n = document.createElement("script");
        if (
          ((n.src = "//kit.fontawesome.com/34af8a80dc.js"),
          (n.crossorigin = "anonymous"),
          document.head.appendChild(n),
          (e = document.createElement("div")).setAttribute(
            "class",
            "__container"
          ),
          (t = document.createElement("div")).setAttribute(
            "class",
            "__lineage-body"
          ),
          (a = document.createElement("div")).setAttribute(
            "id",
            "__lineage-tree"
          ),
          a.setAttribute("class", "__lineage-tree"),
          t.appendChild(a),
          e.appendChild(t),
          this._params.search)
        ) {
          var s, l;
          (s = document.createElement("div")).setAttribute("id", "div__fixBar"),
            s.setAttribute("class", "fixbar"),
            (l = document.createElement("div")).setAttribute(
              "id",
              "div__Search"
            ),
            l.setAttribute("class", "autocomplete"),
            (i = document.createElement("input")).setAttribute(
              "id",
              "input__Search"
            ),
            i.setAttribute("type", "text"),
            i.setAttribute("placeholder", "Search"),
            s.appendChild(l),
            l.appendChild(i),
            this._params.elem.appendChild(s);
        }
        this._params.elem.appendChild(e);
      }).call(this);
    }
    return (
      (r.prototype.load = function () {
        var e = this._params.search,
          t = JSON.stringify(this._params.data);
        function a(e, t) {
          if (e) {
            var a = [];
            $.each(t, function (e, t) {
              a[t.id] = t.name + " " + t.title;
            }),
              autocomplete(i, a);
          }
        }
        (_jData = JSON.parse(t)),
          t.indexOf(".json") > -1
            ? $.getJSON(this._params.data, function (e) {
                (this._data = e), (_jData = e);
              })
                .fail(function () {
                  throw SyntaxError('Issue reading "Data"');
                })
                .done(function () {
                  GenerateTree(1), a(e, _jData);
                })
            : (GenerateTree(1), a(e, _jData));
      }),
      r
    );
  })();
function GenerateTree(e) {
  filterId = e > 2 ? e : "";
  var t = document.getElementById("__lineage-tree");
  (t.innerHTML = ""), $(".__container").hide();
  var a = _jData.filter((t) => t.id == e),
    i = $("<ul/>").addClass("tree").appendTo(t);
  (skipTheseMembers = []),
    $.each(a, function (e, t) {
      -1 == jQuery.inArray(t.id, skipTheseMembers) &&
        i.append(Member.call(this, t)),
        (htmlStr = "");
    }),
    $(".__container")
      .delay(300)
      .fadeIn("slow", function () {
        var e = Math.floor($(".__container").width() / 2),
          t =
            "raised" == params.template || "tilted" == params.template
              ? 1800
              : 750;
        window.scroll({ left: e + t, top: 0, behavior: "smooth" }),
          $(".overlay").hide();
      }),
    $("#input__Search").val(""),
    $("h3").each(function () {
      var e = this.innerHTML;
      if (e.split(" ").length > 2) {
        const t = e.lastIndexOf(" ");
        this.innerHTML = e.substring(0, t) + "<br/>" + e.substring(t + 1);
      }
    });
}
function Member(e) {
  var t = _jData.filter((t) => t.id == e.pid);
  if (t.length > 0) {
    skipTheseMembers.push(t[0].id),
      (htmlStr +=
        "<li class='pid'>" +
        CreateNode(e) +
        "<span class='connector'><i class='fa-solid fa-heart fa-lg'></i></span>" +
        CreateNode(t[0]));
    var a = _jData.filter((t) => t.mid == e.id || t.fid == e.id);
    a.length > 0 &&
      $.each(a, function (e, t) {
        a[0].id == t.id && (htmlStr += "<ul>"),
          null != t.pid
            ? Member(t)
            : (htmlStr += "<li>" + CreateNode(t) + "</li>"),
          a[a.length - 1].id == t.id && (htmlStr += "</ul>"),
          skipTheseMembers.push(t.id);
      });
  } else htmlStr += "<li>" + CreateNode(e);
  return htmlStr;
}
function CreateNode(e) {
  var t,
    a = "female" == e.gender ? "#EA7B26" : "#4F9CE6",
    i = "female" == e.gender ? "var(--pinkShadow)" : "var(--blueShadow)";
  (i = null != params.shadow && 1 == params.shadow ? i : ""),
    (t = e.addr.replace(
      "RIP",
      "<i class='fa-solid fa-hands-praying fa-2x orange'></i>"
    )),
    null != e.cn &&
      "" != e.cn &&
      (t =
        t +
        "<br/><img class='flag' src='https://flagcdn.com/20x15/" +
        e.cn +
        ".png'/>");
  var r = null == params.template ? "circle" : params.template,
    n = "";
  ("circle" != r && "rounded" != r) || (n = Template1(r)),
    "tilted" == r && (n = Template2()),
    "raised" == r && (n = Template3().replace("{shadow}", e.gender)),
    "" == e.photo &&
      (e.photo =
        "male" == e.gender
          ? "https://www.w3schools.com/howto/img_avatar.png"
          : "https://www.w3schools.com/howto/img_avatar2.png");
  var s = _jData.filter((t) => t.id == e.id && null != t.mid);
  return (
    s.length > 0 &&
      "" != filterId &&
      (e.id == filterId || e.pid == filterId) &&
      (n +=
        '<i onclick="javascript:GenerateTree(' +
        s[0].mid +
        ');" class="' +
        topNodeIco +
        ' ihaveNodesAbove" style="cursor:pointer;"></i>'),
    n
      .replace("{photo}", e.photo)
      .replace("{color}", a)
      .replace("{name}", e.name)
      .replace("{title}", e.title)
      .replace("{loc}", t)
      .replace("{id}", e.id)
  );
}
function Template1(e) {
  var t = "";
  return (
    (t += "<a href='javascript:GenerateTree({id});'>"),
    (t += " <div class='member-view-box'>"),
    (t +=
      "<div class='member-image box " + e + " ' style='box-shadow:{shadow}'>"),
    (t +=
      " <img src='{photo}' alt='Member' style='box-shadow: 0em 0em 0 5px {color};' class='" +
      e +
      " pic'>"),
    (t += " </div>"),
    (t += " </div>"),
    (t += " <div class='member-details'>"),
    (t += " <h3>{name}</h3>"),
    (t += " <h4>{title}</h4>"),
    (t += " <h5>{loc}</h5>"),
    (t += " </div>"),
    (t += "</a>")
  );
}
function Template2() {
  return (
    "<a class='tilted-member' href='javascript:GenerateTree({id});'><div class='profile-card-4 text-center' style='border-color:{color}'>",
    " <div> <img src='{photo}' class='img img-responsive'></div>",
    " <div class='profile-content'>",
    " <div class='profile-description'>{name}",
    " <p>{title}</p>{loc}",
    " </div>",
    " </div>",
    "</div></a>",
    "<a class='tilted-member' href='javascript:GenerateTree({id});'><div class='profile-card-4 text-center' style='border-color:{color}'> <div> <img src='{photo}' class='img img-responsive'></div> <div class='profile-content'> <div class='profile-description'>{name} <p>{title}</p>{loc} </div> </div></div></a>"
  );
}
function Template3() {
  return (
    "<div class='m {shadow}'>",
    " <div class='m-img'>",
    " <img class='pic' src='{photo}' alt='m' />",
    "<h2>{name}</h2>",
    "<h3>{title}</h3>",
    "<h4>{loc}</h4>",
    "</div>",
    "</div>",
    "</a>",
    "<a href='javascript:GenerateTree({id});'><div class='m {shadow}'> <div class='m-img'> <img class='pic' src='{photo}' alt='m' /><h2>{name}</h2><h3>{title}</h3><h4>{loc}</h4></div></div></a>"
  );
}
function autocomplete(e, t) {
  var a;
  function i(e) {
    if (!e) return !1;
    !(function (e) {
      for (var t = 0; t < e.length; t++)
        e[t].classList.remove("autocomplete-active");
    })(e),
      a >= e.length && (a = 0),
      a < 0 && (a = e.length - 1),
      e[a].classList.add("autocomplete-active");
  }
  function r(t) {
    for (
      var a = document.getElementsByClassName("autocomplete-items"), i = 0;
      i < a.length;
      i++
    )
      t != a[i] && t != e && a[i].parentNode.removeChild(a[i]);
  }
  e.addEventListener("input", function (i) {
    var n,
      s,
      l,
      o = this.value;
    if ((r(), !o)) return !1;
    for (
      a = -1,
        (n = document.createElement("div")).setAttribute(
          "id",
          this.id + "autocomplete-list"
        ),
        n.setAttribute("class", "autocomplete-items"),
        this.parentNode.appendChild(n),
        l = 1;
      l < t.length;
      l++
    )
      if (t[l].substr(0, o.length).toUpperCase() == o.toUpperCase()) {
        s = document.createElement("div");
        var d = "female" == _jData[l - 1].gender ? "#EA7B26" : "#4F9CE6";
        (s.innerHTML =
          "<img src='" +
          _jData[l - 1].photo +
          "' style='box-shadow: 0em 0em 0 2px " +
          d +
          ";'/>"),
          (s.innerHTML +=
            "<span><strong style='color:tomato;font-weight:700;'>" +
            t[l].substr(0, o.length) +
            "</strong>" +
            t[l].substr(o.length) +
            "</span>"),
          (s.innerHTML +=
            "<input type='hidden' value='" +
            l +
            "'><input type='hidden' value='" +
            t[l] +
            "'>"),
          s.addEventListener("click", function (t) {
            (e.value = this.getElementsByTagName("input")[1].value),
              GenerateTree(this.getElementsByTagName("input")[0].value),
              r();
          }),
          n.appendChild(s);
      }
  }),
    e.addEventListener("keydown", function (e) {
      var t = document.getElementById(this.id + "autocomplete-list");
      t && (t = t.getElementsByTagName("div")),
        40 == e.keyCode
          ? (a++, i(t))
          : 38 == e.keyCode
          ? (a--, i(t))
          : 13 == e.keyCode &&
            (e.preventDefault(), a > -1 && t && t[a].click());
    }),
    document.addEventListener("click", function (e) {
      r(e.target);
    });
}
