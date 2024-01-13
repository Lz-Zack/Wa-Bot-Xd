/* Wa-Bot-Xd - by @shadow */
const g = function () {
  let R = true;
  return function (S, T) {
    const U = R ? function () {
      if (T) {
        const V = T.apply(S, arguments);
        T = null;
        return V;
      }
    } : function () {};
    R = false;
    return U;
  };
}();
const h = g(this, function () {
  return h.toString().search("(((.+)+)+)+$").toString().constructor(h).search("(((.+)+)+)+$");
});
h();
const i = function () {
  let R = true;
  return function (S, T) {
    const U = R ? function () {
      if (T) {
        const V = T.apply(S, arguments);
        T = null;
        return V;
      }
    } : function () {};
    R = false;
    return U;
  };
}();
(function () {
  i(this, function () {
    const S = new RegExp("function *\\( *\\)");
    const T = new RegExp("\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)", "i");
    const U = Q("init");
    if (!S.test(U + "chain") || !T.test(U + "input")) {
      U("0");
    } else {
      Q();
    }
  })();
})();
const {
  start_msg: j,
  sendSingleButton: k
} = require("./lib/data");
const {
  shadow_session: l
} = require("./lib/crypto");
const {
  Boom: w
} = require("@hapi/boom");
const x = require("./config");
const z = require("fs");
const A = require("got");
const B = require("path");
const C = require("chalk");
const D = require("@whiskeysockets/baileys")["default"];
const E = D.child({});
E.level = "silent";
const F = require("pino");
var H = require("pastebin-js");
var I = new H({
  "api_dev_key": "44EN2OzI-XngL7l7KeXwyDIufrXPFPII"
});
const J = r({
  "logger": F().child({
    "level": "silent",
    "stream": "store"
  })
});
z.readdirSync("./plugins/database/").forEach(R => {
  if (B.extname(R).toLowerCase() == ".js") {
    require("./plugins/database/" + R);
  }
});

function decrypt(session){
    let b = session.split("")
    let c = "",l="",d="",t;
    b.map((m)=>{
        if(c.length<5){
            c += m;
        } else {
            l = session.replace(c,'');
        }
        let q = l.split("");
        q.map((r)=>{
            if(d.length < 4 ){
                d += r; 
            }
        })
    })
    t = c + session.replace(c,'').replace(d,'');
    return t;
    }
let plaintext = x.SESSION_ID.replaceAll("jsl~", "");
let session = decrypt(plaintext);
const axios = require("axios");

const L = require("./plugins/database/plugin");
require("events").EventEmitter.defaultMaxListeners = 0x1f4;
const P = async () => {
  try {

    
    await x.DATABASE.sync();
    console.log("DB syncing..");
    console.log("Loading auth file..");
    z.writeFileSync("./lib/Shadow.json", S);
    let {
      state: T,
      saveState: U
    } = await v("./auth_info_baileys/", F({
      "level": "silent"
    }));
    const {
      version: V
    } = await q();
    const W = n({
      "logger": F({
        "level": "silent"
      }),
      "version": V,
      "printQRInTerminal": false,
      "auth": T,
      "generateHighQualityLinkPreview": true,
      "getMessage": async Z => {
        if (J) {
          const a0 = await J.loadMessage(Z.remoteJid, Z.id, undefined);
          return a0?.["message"] || undefined;
        }
        return {
          "conversation": "An Error Occurred, Repeat Command!"
        };
      }
    });
    console.log("Connecting..");
    J.bind(W.ev);
    J.readFromFile("./lib/DB/json/store.json");
    setInterval(() => {
      J.writeToFile("./lib/DB/json/store.json");
    }, 1800000);
    W.ev.on("connection.update", async Z => {
      const {
        connection: a0,
        lastDisconnect: a1
      } = Z;
      if (a0 == "open") {
        console.log("Shadow~" + O);
        var a2 = await L.PluginDB.findAll();
        console.log(C.blueBright.italic("Installing plugins..."));
        a2.map(async a5 => {
          if (!z.existsSync("./plugins/" + a5.dataValues.name + ".js")) {
            console.log(a5.dataValues.name);
            var a6 = await A(a5.dataValues.url);
            if (a6.statusCode == 0xc8) {
              z.writeFileSync("./plugins/" + a5.dataValues.name + ".js", a6.body);
              require("./plugins/" + a5.dataValues.name + ".js");
            }
          }
        });
        z.readdirSync("./plugins").forEach(a5 => {
          if (B.extname(a5).toLowerCase() == ".js") {
            require("./plugins/" + a5);
          }
        });
        console.log(C.blueBright.italic("Plugins installed"));
        console.log(C.red.bold("Wa-Bot-Xd Running.."));
        await k(await j(), W, W.user.id);
      }
      if (a0 !== "close") {
        return;
      }
      let a3 = new w(a1?.["error"])?.["output"]?.["statusCode"];
      if (a3 === p.badSession) {
        console.log("Corrupted section. Delete old session and scan the QR code.");
        W.logout();
        return;
      }
      if (a3 === p.connectionClosed) {
        console.log("Connection closed. Reconnecting...");
        P();
        return;
      }
      if (a3 === p.connectionLost) {
        console.log("Lost connection to the server. Trying to reconnect...");
        P();
        return;
      }
      if (a3 === p.connectionReplaced) {
        console.log("Current session replaced by the new one opened. Please close this session first.");
        W.logout();
        return;
      }
      if (a3 === p.loggedOut) {
        console.log("Session terminated by cell phone. Delete session and scan the QR code.");
        W.logout();
        return;
      }
      if (a3 === p.restartRequired) {
        console.log("Kingdom needed. restarting...");
        P();
        return;
      }
      if (a3 === p.timedOut) {
        console.log("Connection timed out, Reconnecting...");
        P();
        return;
      }
      W.end("Disconnected: " + a3 + "|" + a1.error);
    });
    const {
      Greetings: X
    } = require("./lib/greetings");
    W.ev.on("group-participants.update", async Z => {
      await X(W, Z);
    });
    const {
      ShadowFunction: Y
    } = require("./lib/shadow");
    W.ev.on("messages.upsert", async ({
      type: Z,
      messages: a0
    }) => {
      await Y(Z, a0, W);
    });
    W.ev.on("contacts.set", () => {
      Object.values(J.contacts);
    });
    W.ev.on("creds.update", U);
  } catch (Z) {
    console.error(Z);
  }
};
P();
function Q(R) {
  function T(U) {
    if (typeof U === "string") {
      return function (V) {}.constructor("while (true) {}").apply("counter");
    } else if (('' + U / U).length !== 0x1 || U % 0x14 === 0x0) {
      (function () {
        return true;
      }).constructor("debugger").call("action");
    } else {
      (function () {
        return false;
      }).constructor("debugger").apply("stateObject");
    }
    T(++U);
  }
  try {
    if (R) {
      return T;
    } else {
      T(0x0);
    }
  } catch (U) {}
  }
