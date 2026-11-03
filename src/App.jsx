import React, { useState, useRef, useEffect } from "react";

// ─── DATOS INICIALES ──────────────────────────────────────────────────────────
var PRODS = [
  {id:1,name:"Encendedor BIC",cat:"Descartables",price:850,costo:420,stock:240,min:50,unit:"unidad",ean:"7702004026105"},
  {id:2,name:"Encendedor Cricket",cat:"Descartables",price:720,costo:360,stock:18,min:30,unit:"unidad",ean:""},
  {id:3,name:"Pila AA Duracell x2",cat:"Pilas",price:1200,costo:600,stock:180,min:40,unit:"blister",ean:"5000394004085"},
  {id:4,name:"Pila AAA Duracell x2",cat:"Pilas",price:1100,costo:550,stock:95,min:40,unit:"blister",ean:""},
  {id:5,name:"Pila 9V Duracell",cat:"Pilas",price:1800,costo:900,stock:12,min:20,unit:"unidad",ean:""},
  {id:6,name:"Cinta Embalaje 48mm",cat:"Embalaje",price:650,costo:300,stock:320,min:60,unit:"rollo",ean:""},
  {id:7,name:"Cinta Transp. 18mm",cat:"Embalaje",price:280,costo:130,stock:210,min:50,unit:"rollo",ean:""},
  {id:8,name:"Chicles Beldent x12",cat:"Golosinas",price:1500,costo:800,stock:88,min:30,unit:"display",ean:""},
  {id:9,name:"Caramelos Sugus x50",cat:"Golosinas",price:2200,costo:1100,stock:45,min:20,unit:"bolsa",ean:""},
  {id:10,name:"Lapicera Bic Cristal",cat:"Libreria",price:450,costo:200,stock:7,min:20,unit:"unidad",ean:""},
];
var CLIENTS = [
  {id:1,name:"Kiosco Don Pedro",owner:"Pedro Gomez",phone:"11-4523-8876",address:"Corrientes 1234",email:"donpedro@gmail.com",active:true,user:"donpedro",pass:"pedro123"},
  {id:2,name:"Kiosco La Esquina",owner:"Maria Lopez",phone:"11-3312-9900",address:"Rivadavia 567",email:"laesquina@gmail.com",active:true,user:"laesquina",pass:"maria123"},
  {id:3,name:"Kiosco Sol y Luna",owner:"Carlos Ruiz",phone:"11-5567-4421",address:"San Martin 89",email:"solyluna@gmail.com",active:true,user:"solyluna",pass:"carlos123"},
  {id:4,name:"Minimercado Tres Ases",owner:"Ana Torres",phone:"11-7890-1122",address:"Belgrano 432",email:"tresases@gmail.com",active:false,user:"tresases",pass:"ana123"},
];
var ORDERS = [
  {id:1001,cId:1,cName:"Kiosco Don Pedro",date:"2026-01-10",status:"entregado",items:[{pId:1,name:"Encendedor BIC",qty:48,price:850},{pId:3,name:"Pila AA Duracell x2",qty:24,price:1200}],total:69600,pagos:[]},
  {id:1002,cId:2,cName:"Kiosco La Esquina",date:"2026-01-18",status:"entregado",items:[{pId:6,name:"Cinta Embalaje 48mm",qty:20,price:650}],total:13000,pagos:[]},
  {id:1003,cId:3,cName:"Kiosco Sol y Luna",date:"2026-02-05",status:"entregado",items:[{pId:2,name:"Encendedor Cricket",qty:36,price:720},{pId:8,name:"Chicles Beldent x12",qty:10,price:1500}],total:40920,pagos:[]},
  {id:1004,cId:1,cName:"Kiosco Don Pedro",date:"2026-02-14",status:"entregado",items:[{pId:9,name:"Caramelos Sugus x50",qty:12,price:2200}],total:26400,pagos:[]},
  {id:1005,cId:2,cName:"Kiosco La Esquina",date:"2026-03-03",status:"entregado",items:[{pId:1,name:"Encendedor BIC",qty:60,price:850}],total:51000,pagos:[]},
  {id:1006,cId:3,cName:"Kiosco Sol y Luna",date:"2026-03-15",status:"entregado",items:[{pId:7,name:"Cinta Transp. 18mm",qty:40,price:280}],total:11200,pagos:[]},
  {id:1007,cId:1,cName:"Kiosco Don Pedro",date:"2026-04-04",status:"entregado",items:[{pId:8,name:"Chicles Beldent x12",qty:15,price:1500}],total:22500,pagos:[]},
  {id:1008,cId:2,cName:"Kiosco La Esquina",date:"2026-04-23",status:"pendiente",items:[{pId:6,name:"Cinta Embalaje 48mm",qty:12,price:650},{pId:8,name:"Chicles Beldent x12",qty:6,price:1500}],total:16800,pagos:[]},
  {id:1009,cId:3,cName:"Kiosco Sol y Luna",date:"2026-04-25",status:"en camino",items:[{pId:2,name:"Encendedor Cricket",qty:24,price:720},{pId:5,name:"Pila 9V Duracell",qty:10,price:1800}],total:35280,pagos:[]},
  {id:1010,cId:1,cName:"Kiosco Don Pedro",date:"2026-04-27",status:"pendiente",items:[{pId:9,name:"Caramelos Sugus x50",qty:8,price:2200}],total:17600,pagos:[]},
];
var MSGS = [
  {id:1,cId:1,from:"client",text:"Buen dia! Tienen encendedores BIC?",date:"2026-04-26 09:12"},
  {id:2,cId:1,from:"admin",text:"Hola Pedro! Si, tenemos 240 unidades.",date:"2026-04-26 09:45"},
  {id:3,cId:2,from:"client",text:"Cuando me llega el pedido 1008?",date:"2026-04-27 08:30"},
  {id:4,cId:3,from:"client",text:"Queria hacer un pedido grande.",date:"2026-04-25 15:00"},
  {id:5,cId:3,from:"admin",text:"Perfecto Carlos, coordinamos!",date:"2026-04-25 16:20"},
];

// ─── CONSTANTES DE ESTILO ─────────────────────────────────────────────────────
var MESES = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
var ST = {
  pendiente:{bg:"#FFF3CD",c:"#856404",l:"Pendiente"},
  "en camino":{bg:"#CCE5FF",c:"#004085",l:"En camino"},
  entregado:{bg:"#D4EDDA",c:"#155724",l:"Entregado"},
  cobrado:{bg:"#E8D5FF",c:"#5B21B6",l:"Cobrado"},
  cancelado:{bg:"#F8D7DA",c:"#721C24",l:"Cancelado"},
};
var NAV_ADMIN = [
  {id:"dashboard",   l:"Dashboard",     icon:"📊"},
  {id:"scanner",     l:"Escanear EAN",  icon:"📷"},
  {id:"stock",       l:"Inventario",    icon:"📦"},
  {id:"orders",      l:"Pedidos",       icon:"🛒"},
  {id:"cuentacte",   l:"Cuenta cte.",   icon:"💰"},
  {id:"clients",     l:"Clientes",      icon:"👥"},
  {id:"messages",    l:"Mensajes",      icon:"💬"},
  {id:"precios",     l:"Precios",       icon:"💲"},
  {id:"ajuste",      l:"Ajuste stock",  icon:"📋"},
  {id:"ofertas",     l:"Ofertas",       icon:"🏷️"},
  {id:"reportes",    l:"Reportes",      icon:"📈"},
  {id:"rentabilidad",l:"Rentabilidad",  icon:"💹"},
  {id:"prospeccion", l:"Prospeccion",   icon:"🗺️"},
  {id:"config",      l:"Config",        icon:"⚙️"},
];
var P0 = "#F5A623";
var S0 = "#1A1A1A";
var CARD = {background:"#fff",borderRadius:12,padding:20,boxShadow:"0 1px 4px rgba(0,0,0,.07)",marginBottom:14};
var INP = {width:"100%",border:"1.5px solid #e0ddd8",borderRadius:8,padding:"8px 11px",fontSize:13,background:"#fafaf8",outline:"none",boxSizing:"border-box"};
var LBL = {fontSize:11,fontWeight:700,color:"#555",textTransform:"uppercase",marginBottom:3,display:"block"};
var TH = {textAlign:"left",fontSize:11,fontWeight:700,color:"#888",textTransform:"uppercase",padding:"8px 10px",borderBottom:"2px solid #f0ede8",whiteSpace:"nowrap"};
var TD = {padding:"9px 10px",borderBottom:"1px solid #f5f5f0",fontSize:13};
var BRAND_PRESETS = [
  {p:"#F5A623",s:"#1A1A1A",l:"Naranja"},
  {p:"#2563EB",s:"#1E3A8A",l:"Azul"},
  {p:"#16A34A",s:"#14532D",l:"Verde"},
  {p:"#DC2626",s:"#7F1D1D",l:"Rojo"},
  {p:"#7C3AED",s:"#4C1D95",l:"Violeta"},
  {p:"#0891B2",s:"#164E63",l:"Celeste"},
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function getPagos(o) { return o.pagos || []; }
function getSaldo(o) { return o.total - getPagos(o).reduce(function(a,p){ return a+p.amount; },0); }
function hoy() { return new Date().toISOString().slice(0,10); }
function getCats(prods) {
  var seen = {};
  prods.forEach(function(p){ seen[p.cat]=1; });
  return ["Todos"].concat(Object.keys(seen));
}
function getDelivered(orders) {
  return orders.filter(function(o){ return o.status==="entregado"||o.status==="cobrado"; });
}
function calcDias(p, orders) {
  var del = getDelivered(orders);
  if (!del.length) return null;
  var sold = 0;
  del.forEach(function(o){ o.items.forEach(function(it){ if(it.pId===p.id) sold+=it.qty; }); });
  if (!sold) return null;
  var dates = del.map(function(o){ return new Date(o.date); }).sort(function(a,b){ return a-b; });
  var span = Math.max(1, Math.ceil((dates[dates.length-1]-dates[0])/86400000)+1);
  return Math.round(p.stock/(sold/span));
}


// ─── PERSISTENCIA LOCAL ──────────────────────────────────────────────────────
// Todos los datos quedan guardados en este dispositivo (localStorage, claves "dapp_*").
function lsGet(key, fallback) {
  try {
    var raw = window.localStorage.getItem(key);
    if (raw !== null) return JSON.parse(raw);
  } catch(e) {}
  return fallback;
}
function lsSet(key, val) {
  try { window.localStorage.setItem(key, JSON.stringify(val)); return true; }
  catch(e) {
    try { window.dispatchEvent(new Event("dapp-storage-full")); } catch(e2) {}
    return false;
  }
}
function usePersist(key, initial) {
  var [val, setVal] = useState(function(){ return lsGet(key, initial); });
  useEffect(function(){ lsSet(key, val); }, [key, val]);
  return [val, setVal];
}

// Reduce las fotos antes de guardarlas (una foto de celular pesa varios MB y llena el almacenamiento)
function resizeImage(file, maxSide, cb, asPng) {
  var reader = new FileReader();
  reader.onload = function(ev) {
    var src = ev.target.result;
    var img = new Image();
    img.onload = function() {
      try {
        var k = Math.min(1, maxSide / Math.max(img.width, img.height));
        var cw = Math.max(1, Math.round(img.width * k)), ch = Math.max(1, Math.round(img.height * k));
        var cv = document.createElement("canvas");
        cv.width = cw; cv.height = ch;
        var ctx = cv.getContext("2d");
        if (!asPng) { ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, cw, ch); }
        ctx.drawImage(img, 0, 0, cw, ch);
        cb(asPng ? cv.toDataURL("image/png") : cv.toDataURL("image/jpeg", 0.72));
      } catch(e) { cb(src); }
    };
    img.onerror = function(){ cb(src); };
    img.src = src;
  };
  reader.readAsDataURL(file);
}

// ─── PEDIDOS POR WHATSAPP: INTERPRETACIÓN DEL MENSAJE ────────────────────────
var WA_UNITS = "(?:x|u|un|und|unid|unidad|unidades|caja|cajas|bulto|bultos|pack|packs|display|displays|blister|blisters|bolsa|bolsas|rollo|rollos)";
var WA_PREFIX = /^‎?\[?\d{1,2}[\/.\-]\d{1,2}[\/.\-]\d{2,4},?\s+\d{1,2}:\d{2}(?::\d{2})?\s*(?:[ap]\.?\s?m\.?)?\]?\s*(?:-\s*)?([^:]{1,60}?):\s*/i;

function normTxt(s) {
  return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}
function tokMatch(q, t) {
  if (q === t) return true;
  if (q.length >= 3 && t.length >= 3) { return t.indexOf(q) === 0 || q.indexOf(t) === 0; }
  return false;
}
function nameScore(qTok, pTok) {
  if (!qTok.length || !pTok.length) return 0;
  var mq = 0, mp = 0;
  qTok.forEach(function(q){ if (pTok.some(function(t){ return tokMatch(q, t); })) mq++; });
  pTok.forEach(function(t){ if (qTok.some(function(q){ return tokMatch(q, t); })) mp++; });
  if (!mq) return 0;
  return 0.6 * (mq / qTok.length) + 0.4 * (mp / pTok.length);
}
function matchProduct(name, prods) {
  var clean = normTxt(name);
  if (!clean) return {p:null, score:0, second:0};
  var digits = clean.replace(/\s/g, "");
  if (/^\d{8,14}$/.test(digits)) {
    var byEan = prods.find(function(p){ return p.ean && String(p.ean) === digits; });
    if (byEan) return {p:byEan, score:1, second:0};
  }
  var qTok = clean.split(" ");
  var best = null, bs = 0, second = 0;
  prods.forEach(function(p){
    var s = nameScore(qTok, normTxt(p.name).split(" "));
    if (s > bs) { second = bs; bs = s; best = p; }
    else if (s > second) { second = s; }
  });
  return {p:best, score:bs, second:second};
}
function splitLeadingQty(s) {
  var re = new RegExp("^(\\d{1,5})(?=[\\s.:)\\-xu×]|$)\\s*(?:" + WA_UNITS + "\\b\\.?)?\\s*(?:de\\s+)?[-:.)]*\\s*(.+)$", "i");
  var m = s.match(re);
  if (!m) return null;
  return {qty:parseInt(m[1], 10), name:m[2].trim()};
}
function splitTrailingQty(s) {
  var re = new RegExp("(\\d{1,5})\\s*(?:" + WA_UNITS + "\\b\\.?)?\\s*$", "i");
  var m = s.match(re);
  if (!m) return null;
  var raw = s.slice(0, m.index);
  if (!raw.replace(/\s+$/, "")) return null;
  // el número no puede ir pegado a una letra o dígito (salvo "x12")
  if (/[a-z0-9]$/i.test(raw) && !/(^|\s)[x×]$/i.test(raw)) return null;
  var name = raw.replace(/\s+$/, "").replace(/(^|\s)[x×]$/i, "").replace(/[\s\-:]+$/, "");
  if (!name) return null;
  return {qty:parseInt(m[1], 10), name:name};
}
function interpretSegment(seg, prods) {
  var s = seg.trim().replace(/^[^a-z0-9À-ſ]+/i, "").replace(/^\d{1,2}\s*\)\s*/, "").replace(/[^a-z0-9À-ſ]+$/i, "");
  if (!s) return {ignored:true, raw:seg.trim()};
  var cands = [];
  var a = splitLeadingQty(s);  if (a) cands.push({qty:a.qty, name:a.name, pri:3});
  var b = splitTrailingQty(s); if (b) cands.push({qty:b.qty, name:b.name, pri:2});
  cands.push({qty:1, name:s, pri:1, implicit:true});
  var best = null;
  cands.forEach(function(c){
    c.m = matchProduct(c.name, prods);
    if (!best || c.m.score > best.m.score + 0.0001 || (Math.abs(c.m.score - best.m.score) <= 0.0001 && c.pri > best.pri)) best = c;
  });
  var mt = best.m;
  var matched = !!mt.p && mt.score >= 0.45;
  if (!matched && !/\d/.test(seg)) return {ignored:true, raw:seg.trim()};
  var clear = matched && mt.score >= 0.75 && (mt.score - mt.second) >= 0.12;
  var why = "";
  if (!matched) why = "no encontré el producto";
  else if (!clear) why = "revisá: varios productos parecidos";
  else if (best.implicit) why = "sin cantidad, puse 1";
  return {raw:seg.trim(), qty:best.qty, pId:matched ? mt.p.id : "", flag:!!why, why:why};
}
function parseWhatsAppOrder(text, prods) {
  var sender = "", lines = [], ignored = [];
  String(text || "").split(/\r?\n/).forEach(function(rawLine){
    var line = rawLine.replace(/[‎‏]/g, "");
    var mp = line.match(WA_PREFIX);
    if (mp) { if (!sender) sender = mp[1].trim(); line = line.slice(mp[0].length); }
    line.split(/[;,]+/).forEach(function(seg){
      if (!seg.trim()) return;
      var r = interpretSegment(seg, prods);
      if (r.ignored) ignored.push(r.raw); else lines.push(r);
    });
  });
  return {sender:sender, lines:lines, ignored:ignored};
}
function detectClient(text, sender, clients) {
  var nt = " " + normTxt(text) + " ";
  var best = null, bs = 0;
  clients.forEach(function(c){
    var s = 0;
    [c.name, c.owner].forEach(function(nm){
      var n = normTxt(nm);
      if (n && nt.indexOf(" " + n + " ") >= 0) s = Math.max(s, 2);
    });
    if (sender) {
      var sTok = normTxt(sender).split(" ").filter(function(t){ return t.length >= 3; });
      var cTok = normTxt((c.owner || "") + " " + (c.name || "")).split(" ");
      var hit = sTok.filter(function(t){ return cTok.indexOf(t) >= 0; }).length;
      if (sTok.length && hit) s = Math.max(s, hit / sTok.length);
    }
    if (s > bs) { bs = s; best = c; }
  });
  return bs >= 0.5 ? best : null;
}
function buildCatalogText(prods, brand) {
  var out = ["*" + ((brand && brand.nombre) || "Distribuidora") + " - Lista de precios*", ""];
  var groups = {}, order = [];
  prods.filter(function(p){ return p.stock > 0; }).forEach(function(p){
    var c = p.cat || "Otros";
    if (!groups[c]) { groups[c] = []; order.push(c); }
    groups[c].push(p);
  });
  order.forEach(function(c){
    out.push("*" + c + "*");
    groups[c].forEach(function(p){
      out.push("• " + p.name + " - $" + Number(p.price || 0).toLocaleString("es-AR") + (p.unit ? " / " + p.unit : ""));
    });
    out.push("");
  });
  var first = order.length ? groups[order[0]][0].name : "producto";
  out.push("Para pedir, respondé con cantidad y producto. Ej: 24 " + first);
  return out.join("\n");
}

// ─── MOBILE HOOK ─────────────────────────────────────────────────────────────
function useIsMobile() {
  var [mob, setMob] = useState(function(){ return typeof window!=="undefined" && window.innerWidth < 768; });
  useEffect(function(){
    function onResize(){ setMob(window.innerWidth < 768); }
    window.addEventListener("resize", onResize);
    return function(){ window.removeEventListener("resize", onResize); };
  }, []);
  return mob;
}

// ─── IMAGEN PRODUCTO ─────────────────────────────────────────────────────────
function ImgPickerInline(props) {
  // props: src, onChange(base64)  — inline button, no modal needed
  var ref = useRef(null);
  return (
    <div style={{display:"flex",alignItems:"center",gap:10}}>
      {props.src
        ? <img src={props.src} alt="" style={{width:48,height:48,borderRadius:8,objectFit:"cover",border:"1px solid #e0ddd8",flexShrink:0}}/>
        : <div style={{width:48,height:48,borderRadius:8,background:"#f0ede8",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,color:"#ccc",flexShrink:0}}>📷</div>
      }
      <div>
        <button type="button" onClick={function(){ ref.current && ref.current.click(); }}
          style={{background:"#f0ede8",border:"none",borderRadius:7,padding:"6px 12px",fontSize:12,fontWeight:700,cursor:"pointer",color:S0}}>
          {props.src ? "Cambiar foto" : "Agregar foto"}
        </button>
        {props.src && (
          <button type="button" onClick={function(){ props.onChange(""); }}
            style={{background:"none",border:"none",fontSize:11,color:"#aaa",cursor:"pointer",marginLeft:6}}>quitar</button>
        )}
        <input ref={ref} type="file" accept="image/*" style={{display:"none"}}
          onChange={function(e){
            var file = e.target.files[0];
            if (!file) return;
            resizeImage(file, 360, function(url){ props.onChange(url); });
            e.target.value = "";
          }}
        />
      </div>
    </div>
  );
}

// ─── COMPONENTES BASE ─────────────────────────────────────────────────────────
function Tag(props) {
  var s = ST[props.s] || {bg:"#eee",c:"#333",l:props.s};
  return (<span style={{display:"inline-block",padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:700,background:s.bg,color:s.c}}>{s.l}</span>);
}
function Dias(props) {
  var d = props.d;
  if (d===null||d===undefined) return (<span style={{color:"#aaa",fontSize:11}}>-</span>);
  if (d<=0)  return (<span style={{background:"#f8d7da",color:"#721c24",borderRadius:20,padding:"2px 8px",fontSize:11,fontWeight:700}}>Agotado</span>);
  if (d<=7)  return (<span style={{background:"#f8d7da",color:"#721c24",borderRadius:20,padding:"2px 8px",fontSize:11,fontWeight:700}}>Critico {d}d</span>);
  if (d<=15) return (<span style={{background:"#fff3cd",color:"#856404",borderRadius:20,padding:"2px 8px",fontSize:11,fontWeight:700}}>Bajo {d}d</span>);
  return (<span style={{background:"#d4edda",color:"#155724",borderRadius:20,padding:"2px 8px",fontSize:11,fontWeight:700}}>OK {d}d</span>);
}
function Btn(props) {
  var bg = props.bg || S0;
  var tc = props.tc || "#f0ede8";
  var st = Object.assign({},{background:bg,color:tc,border:"none",borderRadius:8,padding:"9px 16px",fontSize:13,fontWeight:700,cursor:"pointer"},props.style||{});
  return (<button onClick={props.onClick} style={st}>{props.label}</button>);
}
function Modal(props) {
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200}}>
      <div style={{background:"#fff",borderRadius:16,padding:28,width:props.w||440,maxHeight:"90vh",overflowY:"auto",boxShadow:"0 24px 60px rgba(0,0,0,.3)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
          <div style={{fontWeight:800,fontSize:18}}>{props.title}</div>
          <button onClick={props.onClose} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:"#aaa"}}>✕</button>
        </div>
        {props.children}
      </div>
    </div>
  );
}

// ─── PRIMER INGRESO: CREAR ADMIN ──────────────────────────────────────────────
function SetupAdmin(props) {
  var [negocio,setNegocio] = useState("");
  var [u,setU] = useState("");
  var [p,setP] = useState("");
  var [p2,setP2] = useState("");
  var [demo,setDemo] = useState(false);
  var [err,setErr] = useState("");
  function go() {
    if (!negocio.trim()) { setErr("Escribí el nombre de tu negocio."); return; }
    if (u.trim().length < 3) { setErr("El usuario debe tener al menos 3 caracteres."); return; }
    if (p.length < 6) { setErr("La clave debe tener al menos 6 caracteres."); return; }
    if (p !== p2) { setErr("Las dos claves no coinciden."); return; }
    props.onCreate({negocio:negocio.trim(), user:u.trim(), pass:p, demo:demo});
  }
  var si = {width:"100%",padding:"10px",marginBottom:"10px",borderRadius:"8px",border:"1px solid #ddd",fontSize:14,boxSizing:"border-box"};
  function chg(setter){ return function(e){ setter(e.target.value); setErr(""); }; }
  return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#f0f2f5",fontFamily:"Arial,sans-serif",padding:20,boxSizing:"border-box"}}>
      <div style={{background:"#fff",padding:"32px 26px",borderRadius:12,boxShadow:"0 4px 20px rgba(0,0,0,.12)",width:"100%",maxWidth:340}}>
        <div style={{textAlign:"center",marginBottom:20}}>
          <div style={{fontSize:40}}>📦</div>
          <div style={{fontWeight:800,fontSize:20,marginTop:6}}>Bienvenido a DistribuApp</div>
          <div style={{fontSize:12,color:"#888",marginTop:6,lineHeight:1.5}}>Creá tu acceso de administrador. Tus datos se guardan en este dispositivo.</div>
        </div>
        <label style={LBL}>Nombre de tu negocio</label>
        <input style={si} placeholder="Ej: Distribuidora El Sol" value={negocio} onChange={chg(setNegocio)}/>
        <label style={LBL}>Usuario</label>
        <input style={si} placeholder="Ej: admin" value={u} onChange={chg(setU)} autoCapitalize="none"/>
        <label style={LBL}>Clave (mínimo 6 caracteres)</label>
        <input style={si} type="password" value={p} onChange={chg(setP)}/>
        <label style={LBL}>Repetir clave</label>
        <input style={si} type="password" value={p2} onChange={chg(setP2)} onKeyDown={function(e){ if (e.key==="Enter") go(); }}/>
        <label style={{display:"flex",alignItems:"center",gap:8,fontSize:12,color:"#666",margin:"4px 0 14px",cursor:"pointer"}}>
          <input type="checkbox" checked={demo} onChange={function(e){ setDemo(e.target.checked); }}/>
          Cargar datos de ejemplo (para probar la app)
        </label>
        {err && (<p style={{color:"#c0392b",fontSize:12,marginBottom:10}}>{err}</p>)}
        <button onClick={go} style={{width:"100%",padding:"12px",background:S0,color:"#fff",border:"none",borderRadius:8,cursor:"pointer",fontSize:14,fontWeight:700}}>Crear acceso y entrar</button>
      </div>
    </div>
  );
}

// ─── LOGIN SELECTOR ───────────────────────────────────────────────────────────
function LoginSelector(props) {
  var [mode,setMode] = useState(null); // "admin" | "client"
  var [u,setU] = useState("");
  var [p,setP] = useState("");
  var [err,setErr] = useState("");

  function goAdmin() {
    var a = props.admin;
    if (a && u.trim().toLowerCase()===String(a.user).toLowerCase() && p===a.pass) { props.onLoginAdmin(); }
    else { setErr("Credenciales incorrectas"); }
  }
  function goClient() {
    var c = props.clients.find(function(x){ return x.user===u&&x.pass===p&&x.active; });
    if (c) { props.onLoginClient(c); }
    else { setErr("Usuario o contrasena incorrectos"); }
  }

  var si = {width:"100%",padding:"10px",marginBottom:"10px",borderRadius:"8px",border:"1px solid #ddd",fontSize:14,boxSizing:"border-box"};

  if (!props.admin) { return (<SetupAdmin onCreate={props.onSetupAdmin}/>); }

  if (!mode) {
    return (
      <div style={{height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#f0f2f5",fontFamily:"Arial,sans-serif"}}>
        <div style={{textAlign:"center",maxWidth:420,width:"100%",padding:"0 20px"}}>
          <div style={{fontSize:48,marginBottom:8}}>📦</div>
          <div style={{fontWeight:800,fontSize:26,marginBottom:4}}>DistribuApp</div>
          <div style={{fontSize:14,color:"#888",marginBottom:36}}>Selecciona tu tipo de acceso</div>
          <div style={{display:"grid",gridTemplateColumns:props.clients.length>0?"1fr 1fr":"1fr",gap:14}}>
            <button onClick={function(){setMode("admin");setErr("");setU("");setP("");}} style={{background:"#1A1A1A",color:"#f0ede8",border:"none",borderRadius:14,padding:"24px 16px",cursor:"pointer",textAlign:"center"}}>
              <div style={{fontSize:32,marginBottom:8}}>🏢</div>
              <div style={{fontWeight:800,fontSize:15}}>Panel Admin</div>
              <div style={{fontSize:11,color:"#888",marginTop:4}}>Gestión completa</div>
            </button>
            <button onClick={function(){setMode("client");setErr("");setU("");setP("");}} style={{display:props.clients.length>0?"block":"none",background:"#fff",border:"2px solid #F5A623",borderRadius:14,padding:"24px 16px",cursor:"pointer",textAlign:"center"}}>
              <div style={{fontSize:32,marginBottom:8}}>🛒</div>
              <div style={{fontWeight:800,fontSize:15}}>Portal Cliente</div>
              <div style={{fontSize:11,color:"#888",marginTop:4}}>Pedidos y catálogo</div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  var isAdmin = mode==="admin";
  return (
    <div style={{height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#f0f2f5",fontFamily:"Arial,sans-serif"}}>
      <div style={{background:"#fff",padding:"40px",borderRadius:"12px",boxShadow:"0 4px 20px rgba(0,0,0,.12)",width:"300px"}}>
        <button onClick={function(){setMode(null);setErr("");}} style={{background:"none",border:"none",color:"#aaa",cursor:"pointer",fontSize:12,marginBottom:16,display:"flex",alignItems:"center",gap:4}}>
          ← Volver
        </button>
        <div style={{textAlign:"center",marginBottom:24}}>
          <div style={{fontSize:40}}>{isAdmin?"🏢":"🛒"}</div>
          <div style={{fontWeight:800,fontSize:20,marginTop:8}}>{isAdmin?"Panel Admin":"Portal Cliente"}</div>
          <div style={{fontSize:11,color:"#aaa",marginTop:4}}>{isAdmin?"":(props.clients.some(function(c){return c.user==="donpedro";})?"demo: donpedro / pedro123":"")}</div>
        </div>
        <input style={si} placeholder="Usuario" value={u} onChange={function(e){setU(e.target.value);setErr("");}} onKeyDown={function(e){if(e.key==="Enter")isAdmin?goAdmin():goClient();}} autoCapitalize="none"/>
        <input style={si} type="password" placeholder="Contraseña" value={p} onChange={function(e){setP(e.target.value);setErr("");}} onKeyDown={function(e){if(e.key==="Enter")isAdmin?goAdmin():goClient();}}/>
        {err && (<p style={{color:"red",fontSize:12,marginBottom:8}}>{err}</p>)}
        <button onClick={isAdmin?goAdmin:goClient} style={{width:"100%",padding:"11px",background:isAdmin?S0:P0,color:isAdmin?"#fff":S0,border:"none",borderRadius:"8px",cursor:"pointer",fontSize:14,fontWeight:700}}>
          Ingresar
        </button>
        {isAdmin&&(
          <button onClick={function(){ if (window.confirm("Si olvidaste la clave, la única forma es borrar TODOS los datos de este dispositivo y empezar de cero. Si tenés una copia de seguridad, podés restaurarla después. ¿Borrar todo?")) props.onReset(); }} style={{background:"none",border:"none",color:"#aaa",fontSize:11,cursor:"pointer",marginTop:14,width:"100%",textDecoration:"underline"}}>
            Olvidé mi clave
          </button>
        )}
      </div>
    </div>
  );
}

// ─── VISTAS ADMIN ─────────────────────────────────────────────────────────────
function ViewDashboard(props) {
  var orders = props.orders, prods = props.prods, clients = props.clients;
  var setTab = props.setTab, setSelOrd = props.setSelOrd;
  var delivered = getDelivered(orders);
  var totalV = delivered.reduce(function(a,o){return a+o.total;},0);
  var pendN = orders.filter(function(o){return o.status==="pendiente";}).length;
  var lowStock = prods.filter(function(p){return p.stock<=p.min;});
  var hoyMs = new Date().getTime();
  var diasInactivo = 15;
  var inactivos = clients.filter(function(c){
    if (!c.active) return false;
    var ultimoPedido = null;
    orders.forEach(function(o){ if(o.cId===c.id){var f=new Date(o.date).getTime();if(!ultimoPedido||f>ultimoPedido)ultimoPedido=f;} });
    if (!ultimoPedido) return true;
    return Math.floor((hoyMs-ultimoPedido)/86400000)>diasInactivo;
  }).map(function(c){
    var ultimoPedido=null;
    orders.forEach(function(o){if(o.cId===c.id){var f=new Date(o.date).getTime();if(!ultimoPedido||f>ultimoPedido)ultimoPedido=f;}});
    return Object.assign({},c,{diasSinPedido:ultimoPedido?Math.floor((hoyMs-ultimoPedido)/86400000):null});
  });
  return (
    <div>
      <div style={{fontSize:22,fontWeight:800,marginBottom:20}}>Buen dia!</div>
      {inactivos.length>0 && (
        <div style={{background:"#f8d7da",border:"1px solid #f5c6cb",borderRadius:10,padding:"12px 16px",marginBottom:14}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
            <div style={{fontWeight:700,fontSize:14,color:"#721c24"}}>Clientes sin pedidos hace más de {diasInactivo} días ({inactivos.length})</div>
            <Btn label="Ver clientes" bg="#721c24" tc="#fff" onClick={function(){setTab("clients");}} style={{fontSize:12,padding:"5px 12px"}}/>
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
            {inactivos.map(function(c){
              return (<div key={c.id} style={{background:"#fff",borderRadius:8,padding:"8px 12px",fontSize:12,border:"1px solid #f5c6cb"}}><div style={{fontWeight:700,color:"#721c24"}}>{c.name}</div><div style={{color:"#888",marginTop:2}}>{c.diasSinPedido===null?"Nunca pidió":"Hace "+c.diasSinPedido+" días"}</div></div>);
            })}
          </div>
        </div>
      )}
      {lowStock.length>0 && (
        <div style={{background:"#fff3cd",border:"1px solid "+P0,borderRadius:10,padding:"10px 16px",display:"flex",alignItems:"center",gap:10,fontSize:13,marginBottom:16}}>
          Stock bajo en {lowStock.length} productos.
          <Btn label="Ver" bg={P0} tc={S0} onClick={function(){setTab("stock");}} style={{marginLeft:"auto",padding:"5px 12px",fontSize:12}}/>
        </div>
      )}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:18}}>
        {[{l:"Ventas",v:"$"+totalV.toLocaleString()},{l:"Pendientes",v:pendN},{l:"Clientes activos",v:clients.filter(function(c){return c.active;}).length},{l:"Stock bajo",v:lowStock.length}].map(function(s,i){
          return (<div key={i} style={CARD}><div style={{fontWeight:800,fontSize:26,marginBottom:4}}>{s.v}</div><div style={{fontSize:11,color:"#888",fontWeight:700,textTransform:"uppercase"}}>{s.l}</div></div>);
        })}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        <div style={CARD}>
          <div style={{fontWeight:800,fontSize:14,marginBottom:12}}>Últimos pedidos</div>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr><th style={TH}>Cliente</th><th style={TH}>Total</th><th style={TH}>Estado</th></tr></thead>
            <tbody>{orders.slice(0,5).map(function(o){return (<tr key={o.id} style={{cursor:"pointer"}} onClick={function(){setSelOrd(o);setTab("orders");}}><td style={TD}>{o.cName}</td><td style={TD}><b>${o.total.toLocaleString()}</b></td><td style={TD}><Tag s={o.status}/></td></tr>);})}</tbody>
          </table>
        </div>
        <div style={CARD}>
          <div style={{fontWeight:800,fontSize:14,marginBottom:12}}>Stock crítico</div>
          {lowStock.length===0 ? (<div style={{color:"#888",fontSize:13}}>Todo en orden</div>) : (
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead><tr><th style={TH}>Producto</th><th style={TH}>Stock</th><th style={TH}>Días</th></tr></thead>
              <tbody>{lowStock.map(function(p){return (<tr key={p.id}><td style={TD}>{p.name}</td><td style={Object.assign({},TD,{color:"#dc3545",fontWeight:700})}>{p.stock}</td><td style={TD}><Dias d={calcDias(p,orders)}/></td></tr>);})}</tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

function ViewStock(props) {
  var prods=props.prods, setProds=props.setProds, orders=props.orders;
  var [catF,setCatF]=useState("Todos"), [editId,setEditId]=useState(null);
  var [showNew,setShowNew]=useState(false), [showImport,setShowImport]=useState(false);
  var [importRows,setImportRows]=useState([]), [importMsg,setImportMsg]=useState("");
  var [editImgProd,setEditImgProd]=useState(null);
  function saveImg(pid,val){setProds(function(ps){return ps.map(function(p){return p.id===pid?Object.assign({},p,{img:val}):p;});});setEditImgProd(null);}
  var [nP,setNP]=useState({name:"",cat:"",price:"",costo:"",stock:"",min:"10",unit:"unidad",ean:"",img:""});
  var cats=getCats(prods);
  var filtP=catF==="Todos"?prods:prods.filter(function(p){return p.cat===catF;});
  function saveNew(){if(!nP.name||!nP.price)return;var prod={id:Date.now(),name:nP.name,cat:nP.cat,price:parseInt(nP.price)||0,costo:parseInt(nP.costo)||0,stock:parseInt(nP.stock)||0,min:parseInt(nP.min)||10,unit:nP.unit,ean:nP.ean,img:nP.img||""};setProds(function(ps){return ps.concat([prod]);});setNP({name:"",cat:"",price:"",costo:"",stock:"",min:"10",unit:"unidad",ean:"",img:""});setShowNew(false);}
  function saveEdit(pid){var el=document.getElementById("se"+pid);var v=el?parseInt(el.value)||0:0;setProds(function(ps){return ps.map(function(x){return x.id===pid?Object.assign({},x,{stock:v}):x;});});setEditId(null);}
  function handleFile(e){var file=e.target.files[0];if(!file)return;e.target.value="";var reader=new FileReader();reader.onload=function(ev){var text=ev.target.result;var lines=text.trim().split("\n");var sep=lines[0].indexOf(";")>=0?";":",";var headers=lines[0].split(sep).map(function(h){return h.trim().toLowerCase().replace(/"/g,"");});function col(row,names){for(var i=0;i<names.length;i++){var idx=headers.indexOf(names[i]);if(idx>=0)return(row[idx]||"").replace(/"/g,"").trim();}return"";}var rows=[];for(var i=1;i<lines.length;i++){var parts=lines[i].split(sep);if(!parts.some(function(p){return p.trim();}))continue;var nombre=col(parts,["nombre","name","producto","descripcion","texto breve","material"]);var ean=col(parts,["ean","codigo","barcode","cod"]);var precio=parseFloat(col(parts,["precio","price","pvp","venta"]).replace(",","."))||0;var costo=parseFloat(col(parts,["costo","cost","compra"]).replace(",","."))||0;var stock=parseInt(col(parts,["stock","cantidad","qty","uxb"]))||0;var cat=col(parts,["categoria","cat","rubro"]);if(!nombre&&!ean)continue;var existing=prods.find(function(p){return(ean&&p.ean===ean)||(nombre&&p.name.toLowerCase()===nombre.toLowerCase());});rows.push({nombre:nombre,ean:ean,precio:precio,costo:costo,stock:stock,cat:cat,existing:existing||null});}setImportRows(rows);setImportMsg("");};reader.readAsText(file);}
  function applyImport(){var updated=0,added=0;setProds(function(ps){var list=ps.slice();importRows.forEach(function(r){if(r.existing){list=list.map(function(p){if(p.id!==r.existing.id)return p;updated++;return Object.assign({},p,{stock:r.stock||p.stock,price:r.precio||p.price,costo:r.costo||p.costo});});}else{added++;list.push({id:Date.now()+Math.random(),name:r.nombre,cat:r.cat,price:r.precio,costo:r.costo,stock:r.stock,min:10,unit:"unidad",ean:r.ean});}});return list;});setImportMsg("Importados: "+updated+" actualizados, "+added+" nuevos.");setImportRows([]);}
  function descargarPlantilla(){var csv="nombre,ean,categoria,precio,costo,stock\nEncendedor BIC,7702004026105,Descartables,850,420,100\nPila AA Duracell,5000394004085,Pilas,1200,600,50\n";var blob=new Blob([csv],{type:"text/csv"});var url=URL.createObjectURL(blob);var a=document.createElement("a");a.href=url;a.download="plantilla_stock.csv";a.click();URL.revokeObjectURL(url);}
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div style={{fontSize:22,fontWeight:800}}>Inventario</div>
        <div style={{display:"flex",gap:8}}>
          <Btn label="Importar CSV" bg="#eee" tc="#333" onClick={function(){setShowImport(true);setImportRows([]);setImportMsg("");}}/>
          <Btn label="+ Nuevo producto" onClick={function(){setShowNew(true);}}/>
        </div>
      </div>
      <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>
        {cats.map(function(c){return (<button key={c} onClick={function(){setCatF(c);}} style={{padding:"5px 12px",borderRadius:20,border:"1.5px solid",borderColor:catF===c?S0:"#ddd",background:catF===c?S0:"#fff",color:catF===c?"#fff":"#666",fontSize:12,fontWeight:600,cursor:"pointer"}}>{c}</button>);})}
      </div>
      <div style={CARD}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr><th style={TH}>Foto</th><th style={TH}>Producto</th><th style={TH}>Cat.</th><th style={TH}>Precio</th><th style={TH}>Costo</th><th style={TH}>Stock</th><th style={TH}>Días</th><th style={TH}></th></tr></thead>
          <tbody>
            {filtP.map(function(p){var low=p.stock<=p.min;return (
              <tr key={p.id}>
                <td style={TD}>{p.img?(<img src={p.img} alt="" style={{width:36,height:36,borderRadius:6,objectFit:"cover",border:"1px solid #e0ddd8"}}/>):(<span style={{fontSize:18,color:"#ddd"}}>📷</span>)}</td>
                <td style={Object.assign({},TD,{fontWeight:600})}>{p.name}</td>
                <td style={TD}><span style={{background:"#f0ede8",borderRadius:6,padding:"2px 7px",fontSize:11}}>{p.cat}</span></td>
                <td style={TD}>${p.price.toLocaleString()}</td>
                <td style={Object.assign({},TD,{color:"#856404"})}>{p.costo?"$"+p.costo.toLocaleString():"-"}</td>
                <td style={TD}>{editId===p.id?(<div style={{display:"flex",gap:5}}><input type="number" defaultValue={p.stock} id={"se"+p.id} style={{width:65,border:"1.5px solid #e0ddd8",borderRadius:6,padding:"4px 7px",fontSize:13}}/><button style={{background:P0,color:S0,border:"none",borderRadius:6,padding:"4px 9px",fontSize:12,fontWeight:700,cursor:"pointer"}} onClick={function(){saveEdit(p.id);}}>OK</button></div>):(<span style={{fontWeight:700,color:low?"#dc3545":"#155724"}}>{p.stock} {p.unit}</span>)}</td>
                <td style={TD}><Dias d={calcDias(p,orders)}/></td>
                <td style={TD}><div style={{display:"flex",gap:5}}><button style={{background:"none",border:"1px solid #ddd",borderRadius:6,padding:"3px 9px",fontSize:12,cursor:"pointer"}} onClick={function(){setEditId(editId===p.id?null:p.id);}}>{editId===p.id?"✕":"Editar"}</button><button style={{background:"none",border:"1px solid #ddd",borderRadius:6,padding:"3px 9px",fontSize:12,cursor:"pointer"}} onClick={function(){setEditImgProd(p);}}>📷</button></div></td>
              </tr>
            );})}
          </tbody>
        </table>
      </div>
      {showNew && (
        <Modal title="Nuevo producto" onClose={function(){setShowNew(false);}}>
          <div style={{marginBottom:12}}><label style={LBL}>Foto del producto</label><ImgPickerInline src={nP.img||""} onChange={function(v){setNP(function(x){return Object.assign({},x,{img:v});})}}/></div>
          {[{l:"Nombre",k:"name"},{l:"EAN",k:"ean"},{l:"Precio venta ($)",k:"price",t:"number"},{l:"Precio costo ($)",k:"costo",t:"number"},{l:"Stock inicial",k:"stock",t:"number"},{l:"Stock mínimo",k:"min",t:"number"},{l:"Categoría",k:"cat"},{l:"Unidad",k:"unit"}].map(function(f){return (<div key={f.k} style={{marginBottom:10}}><label style={LBL}>{f.l}</label><input type={f.t||"text"} style={INP} value={nP[f.k]||""} onChange={function(e){var k=f.k;setNP(function(x){return Object.assign({},x,{[k]:e.target.value});});}}/></div>);})}
          <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:8}}><Btn label="Cancelar" bg="#eee" tc="#333" onClick={function(){setShowNew(false);}}/><Btn label="Guardar" onClick={saveNew}/></div>
        </Modal>
      )}
      {editImgProd && (
        <Modal title={"Foto: "+editImgProd.name} onClose={function(){setEditImgProd(null);}}>
          <div style={{marginBottom:16}}><ImgPickerInline src={editImgProd.img||""} onChange={function(v){saveImg(editImgProd.id,v);}}/></div>
          <div style={{textAlign:"right"}}><Btn label="Cerrar" bg="#eee" tc="#333" onClick={function(){setEditImgProd(null);}}/></div>
        </Modal>
      )}
      {showImport && (
        <Modal title="Importar desde CSV" onClose={function(){setShowImport(false);setImportRows([]);setImportMsg("");}} w={680}>
          <div style={{background:"#f0ede8",borderRadius:8,padding:"10px 14px",marginBottom:14,fontSize:12,color:"#666"}}>Columnas: <b>nombre, ean, categoria, precio, costo, stock</b>. Sep. coma o punto y coma.</div>
          <div style={{display:"flex",gap:10,marginBottom:14,alignItems:"center"}}>
            <label style={{background:S0,color:"#f0ede8",border:"none",borderRadius:8,padding:"9px 16px",fontSize:13,fontWeight:700,cursor:"pointer"}}>Seleccionar archivo<input type="file" accept=".csv,.txt" style={{display:"none"}} onChange={handleFile}/></label>
            <button onClick={descargarPlantilla} style={{background:"none",border:"1px solid #ddd",borderRadius:8,padding:"8px 14px",fontSize:12,cursor:"pointer",color:"#666"}}>Descargar plantilla</button>
          </div>
          {importMsg&&(<div style={{background:"#d4edda",color:"#155724",borderRadius:8,padding:"10px 14px",marginBottom:12,fontWeight:700,fontSize:13}}>{importMsg}</div>)}
          {importRows.length>0&&(<div>
            <div style={{fontWeight:700,fontSize:13,marginBottom:8}}>Vista previa - {importRows.length} filas</div>
            <div style={{maxHeight:300,overflowY:"auto",border:"1px solid #f0ede8",borderRadius:8,marginBottom:14}}>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead style={{position:"sticky",top:0,background:"#f7f4f0"}}><tr><th style={TH}>Estado</th><th style={TH}>Nombre</th><th style={TH}>EAN</th><th style={TH}>Precio</th><th style={TH}>Costo</th><th style={TH}>Stock</th></tr></thead>
                <tbody>{importRows.map(function(r,i){return (<tr key={i} style={{background:i%2===0?"#fff":"#fafaf8"}}><td style={TD}>{r.existing?(<span style={{background:"#cce5ff",color:"#004085",borderRadius:20,padding:"2px 8px",fontSize:11,fontWeight:700}}>Actualizar</span>):(<span style={{background:"#d4edda",color:"#155724",borderRadius:20,padding:"2px 8px",fontSize:11,fontWeight:700}}>Nuevo</span>)}</td><td style={Object.assign({},TD,{fontWeight:600})}>{r.nombre||"-"}</td><td style={Object.assign({},TD,{fontSize:11,color:"#888"})}>{r.ean||"-"}</td><td style={TD}>{r.precio?"$"+r.precio.toLocaleString():"-"}</td><td style={TD}>{r.costo?"$"+r.costo.toLocaleString():"-"}</td><td style={Object.assign({},TD,{fontWeight:700})}>{r.stock}</td></tr>);})}</tbody>
              </table>
            </div>
            <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}><Btn label="Cancelar" bg="#eee" tc="#333" onClick={function(){setImportRows([]);}}/><Btn label={"Importar "+importRows.length+" productos"} bg={P0} tc={S0} onClick={applyImport}/></div>
          </div>)}
        </Modal>
      )}
    </div>
  );
}

function ViewScanner(props) {
  var prods=props.prods, setProds=props.setProds;
  var [code,setCode]=useState(""), [found,setFound]=useState(null), [notFound,setNotFound]=useState(false);
  var [qty,setQty]=useState(1), [precio,setPrecio]=useState("");
  var [newP,setNewP]=useState({name:"",cat:"",costo:"",min:"10",unit:"unidad"});
  var [log,setLog]=useState([]), [msg,setMsg]=useState("");
  function buscar(c){var clean=String(c).trim();if(!clean)return;setCode(clean);setFound(null);setNotFound(false);setMsg("");var ex=prods.find(function(p){return p.ean===clean||p.name.toLowerCase()===clean.toLowerCase();});if(ex){setFound(ex);setQty(1);setPrecio(String(ex.price));}else{setNotFound(true);setQty(1);setPrecio("");setNewP({name:"",cat:"",costo:"",min:"10",unit:"unidad"});}}
  function confirmarIngreso(){var p2=parseInt(precio)||found.price;var pid=found.id;var q=parseInt(qty)||1;setProds(function(ps){return ps.map(function(p){return p.id===pid?Object.assign({},p,{stock:p.stock+q,price:p2}):p;});});setLog(function(l){return [{time:new Date().toLocaleTimeString("es-AR",{hour:"2-digit",minute:"2-digit"}),ean:code,name:found.name,qty:q,tipo:"ingreso"}].concat(l);});setMsg("+"+q+" unidades a "+found.name);setFound(null);setCode("");setQty(1);}
  function confirmarAlta(){if(!newP.name)return;var prod={id:Date.now(),name:newP.name,cat:newP.cat,price:parseInt(precio)||0,costo:parseInt(newP.costo)||0,stock:parseInt(qty)||0,min:parseInt(newP.min)||10,unit:newP.unit,ean:code};setProds(function(ps){return ps.concat([prod]);});setLog(function(l){return [{time:new Date().toLocaleTimeString("es-AR",{hour:"2-digit",minute:"2-digit"}),ean:code,name:newP.name,qty:parseInt(qty)||0,tipo:"alta"}].concat(l);});setMsg(newP.name+" dado de alta");setNotFound(false);setCode("");setQty(1);}
  return (
    <div>
      <div style={{fontSize:22,fontWeight:800,marginBottom:6}}>Escanear EAN</div>
      <div style={{fontSize:13,color:"#888",marginBottom:18}}>Con pistola USB: clic en el campo y escanea. Con teclado: ingresa el EAN o nombre y Enter.</div>
      <div style={CARD}>
        <div style={{fontWeight:700,fontSize:14,marginBottom:10}}>Buscar producto</div>
        <div style={{display:"flex",gap:8}}>
          <input autoFocus style={Object.assign({},INP,{flex:1,fontSize:15})} value={code} placeholder="EAN o nombre..." onChange={function(e){setCode(e.target.value);}} onKeyDown={function(e){if(e.key==="Enter")buscar(code);}}/>
          <Btn label="Buscar" bg={S0} tc="#f0ede8" onClick={function(){buscar(code);}}/>
          <Btn label="Limpiar" bg="#eee" tc="#333" onClick={function(){setCode("");setFound(null);setNotFound(false);setMsg("");}}/>
        </div>
        <div style={{fontSize:11,color:"#aaa",marginTop:8}}>EANs de prueba: 7702004026105 (BIC) | 5000394004085 (Pila AA)</div>
      </div>
      {msg&&(<div style={{background:"#d4edda",color:"#155724",borderRadius:10,padding:"12px 16px",marginBottom:14,fontWeight:700,fontSize:14}}>{msg}</div>)}
      {found&&(
        <div style={Object.assign({},CARD,{border:"2px solid #d4edda"})}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
            <div><div style={{fontSize:11,color:"#888"}}>EAN: {code}</div><div style={{fontWeight:800,fontSize:20}}>{found.name}</div><div style={{fontSize:13,color:"#666"}}>{found.cat}</div></div>
            <div style={{textAlign:"right"}}><div style={{fontSize:11,color:"#888",fontWeight:700,textTransform:"uppercase"}}>Stock actual</div><div style={{fontSize:36,fontWeight:800,color:found.stock<=found.min?"#dc3545":"#155724"}}>{found.stock}</div><div style={{fontSize:11,color:"#888"}}>{found.unit}</div></div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
            <div><label style={LBL}>Cantidad a ingresar</label><div style={{display:"flex",alignItems:"center",gap:8,border:"1.5px solid #e0ddd8",borderRadius:8,padding:"4px 12px",background:"#fafaf8"}}><button onClick={function(){setQty(function(q){return Math.max(1,q-1);});}} style={{background:"none",border:"none",fontSize:22,cursor:"pointer",fontWeight:800,color:S0}}>-</button><input type="number" min={1} value={qty} onChange={function(e){setQty(parseInt(e.target.value)||1);}} style={{flex:1,border:"none",background:"none",textAlign:"center",fontSize:22,fontWeight:800,outline:"none"}}/><button onClick={function(){setQty(function(q){return q+1;});}} style={{background:"none",border:"none",fontSize:22,cursor:"pointer",fontWeight:800,color:S0}}>+</button></div><div style={{display:"flex",gap:6,marginTop:8}}>{[6,12,24,48].map(function(n){return (<button key={n} onClick={function(){setQty(n);}} style={{flex:1,padding:"5px 0",border:"1px solid #ddd",borderRadius:6,background:qty===n?S0:"#f7f4f0",color:qty===n?"#fff":"#666",fontSize:12,fontWeight:700,cursor:"pointer"}}>{n}</button>);})}</div></div>
            <div><label style={LBL}>Precio de venta ($)</label><input type="number" style={INP} value={precio} onChange={function(e){setPrecio(e.target.value);}} placeholder={"Actual: $"+found.price.toLocaleString()}/><div style={{fontSize:11,color:"#aaa",marginTop:4}}>Deja en blanco para mantener</div></div>
          </div>
          <div style={{display:"flex",gap:10}}><Btn label="Cancelar" bg="#eee" tc="#333" onClick={function(){setFound(null);setCode("");}}/><Btn label={"Confirmar +"+qty+" unidad"+(qty!==1?"es":"")} bg={S0} tc="#f0ede8" onClick={confirmarIngreso} style={{flex:1}}/></div>
        </div>
      )}
      {notFound&&(
        <div style={Object.assign({},CARD,{border:"2px solid #fff3cd"})}>
          <div style={{fontSize:12,color:"#856404",marginBottom:4}}>EAN no encontrado: <b>{code}</b></div>
          <div style={{fontWeight:800,fontSize:16,marginBottom:14}}>Dar de alta nuevo producto</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}}>
            <div style={{gridColumn:"1/-1"}}><label style={LBL}>Nombre *</label><input style={INP} value={newP.name} onChange={function(e){setNewP(function(x){return Object.assign({},x,{name:e.target.value});})}}/></div>
            <div><label style={LBL}>Precio venta ($)</label><input type="number" style={INP} value={precio} onChange={function(e){setPrecio(e.target.value);}}/></div>
            <div><label style={LBL}>Precio costo ($)</label><input type="number" style={INP} value={newP.costo} onChange={function(e){setNewP(function(x){return Object.assign({},x,{costo:e.target.value});})}}/></div>
            <div><label style={LBL}>Categoría</label><input style={INP} value={newP.cat} onChange={function(e){setNewP(function(x){return Object.assign({},x,{cat:e.target.value});})}}/></div>
            <div><label style={LBL}>Stock inicial</label><input type="number" style={INP} value={qty} onChange={function(e){setQty(parseInt(e.target.value)||0);}}/></div>
            <div><label style={LBL}>Unidad</label><input style={INP} value={newP.unit} onChange={function(e){setNewP(function(x){return Object.assign({},x,{unit:e.target.value});})}}/></div>
            <div><label style={LBL}>Stock mínimo</label><input type="number" style={INP} value={newP.min} onChange={function(e){setNewP(function(x){return Object.assign({},x,{min:e.target.value});})}}/></div>
          </div>
          <div style={{display:"flex",gap:10}}><Btn label="Cancelar" bg="#eee" tc="#333" onClick={function(){setNotFound(false);setCode("");}}/><Btn label="Dar de alta" bg={S0} tc="#f0ede8" onClick={confirmarAlta} style={{flex:1}}/></div>
        </div>
      )}
      {log.length>0&&(
        <div style={CARD}>
          <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>Sesión actual</div>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr><th style={TH}>Hora</th><th style={TH}>EAN</th><th style={TH}>Producto</th><th style={TH}>Cant.</th><th style={TH}>Tipo</th></tr></thead>
            <tbody>{log.map(function(e,i){return (<tr key={i} style={{background:i%2===0?"#fff":"#fafaf8"}}><td style={Object.assign({},TD,{fontSize:12,color:"#888"})}>{e.time}</td><td style={Object.assign({},TD,{fontFamily:"monospace",fontSize:11})}>{e.ean||"-"}</td><td style={Object.assign({},TD,{fontWeight:600})}>{e.name}</td><td style={Object.assign({},TD,{fontWeight:700,color:"#155724"})}>+{e.qty}</td><td style={TD}><span style={{background:e.tipo==="alta"?"#cce5ff":"#d4edda",color:e.tipo==="alta"?"#004085":"#155724",borderRadius:20,padding:"2px 8px",fontSize:11,fontWeight:700}}>{e.tipo==="alta"?"Alta nueva":"Ingreso"}</span></td></tr>);})}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── PEDIDOS POR WHATSAPP (ventana del admin) ─────────────────────────────────
function ModalWhatsApp(props) {
  var prods=props.prods, clients=props.clients, orders=props.orders;
  var [tab,setTab]=useState("recibir");
  var [texto,setTexto]=useState("");
  var [cId,setCId]=useState("");
  var [lines,setLines]=useState(null);
  var [ignored,setIgnored]=useState([]);
  var [msg,setMsg]=useState("");
  var catalogo=buildCatalogText(prods,props.brand||{});

  function interpretar(){
    var r=parseWhatsAppOrder(texto,prods);
    setLines(r.lines); setIgnored(r.ignored);
    if(!cId){var c=detectClient(texto,r.sender,clients);if(c)setCId(String(c.id));}
  }
  function setLine(i,patch){setLines(function(ls){return ls.map(function(l,k){return k===i?Object.assign({},l,patch):l;});});}
  function delLine(i){setLines(function(ls){return ls.filter(function(l,k){return k!==i;});});}
  var items=(lines||[]).filter(function(l){return l.pId&&l.qty>0;}).map(function(l){
    var p=prods.find(function(x){return x.id===l.pId;});
    return {pId:p.id,name:p.name,qty:l.qty,price:p.price};
  });
  var total=items.reduce(function(a,i){return a+i.qty*i.price;},0);
  var cli=clients.find(function(c){return String(c.id)===cId;});
  var pendientes=(lines||[]).filter(function(l){return l.flag;}).length;
  var ready=!!cli&&items.length>0;
  function crear(){
    if(!ready)return;
    var nums=orders.map(function(o){return o.id;}).filter(function(i){return i<100000;});
    var id=(nums.length?Math.max.apply(null,nums):1000)+1;
    var o={id:id,cId:cli.id,cName:cli.name,date:hoy(),status:"pendiente",items:items,total:total,pagos:[]};
    props.setOrders(function(os){return [o].concat(os);});
    props.onCreated(o);
  }
  function copiar(){
    function ok(){setMsg("Lista copiada. Pegala en el chat o grupo de WhatsApp.");}
    function manual(){
      var ta=document.getElementById("wa-cat");
      if(ta){ta.focus();ta.select();try{document.execCommand("copy");ok();}catch(e){setMsg("Seleccioná el texto y copialo manualmente.");}}
    }
    try{if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(catalogo).then(ok,manual);return;}}catch(e){}
    manual();
  }
  function abrirWa(){
    if(catalogo.length>1800){copiar();setMsg("La lista es larga: quedó copiada. Abrí WhatsApp y pegala.");return;}
    window.open("https://wa.me/?text="+encodeURIComponent(catalogo),"_blank");
  }
  function tabBtn(id,l){
    return (<button key={id} onClick={function(){setTab(id);setMsg("");}} style={{flex:1,padding:"9px 6px",border:"none",borderBottom:tab===id?"3px solid "+P0:"3px solid transparent",background:"none",fontWeight:tab===id?800:500,fontSize:13,color:tab===id?S0:"#888",cursor:"pointer"}}>{l}</button>);
  }
  var aviso=function(t){return (<div style={{background:"#fff3cd",color:"#856404",borderRadius:8,padding:"10px 12px",fontSize:13}}>{t}</div>);};

  return (
    <Modal title="Pedidos por WhatsApp" onClose={props.onClose} w={620}>
      <div style={{display:"flex",marginBottom:14,borderBottom:"2px solid #f0ede8"}}>{tabBtn("recibir","📥 Recibir pedido")}{tabBtn("enviar","📤 Enviar lista")}</div>

      {tab==="recibir"&&(
        <div>
          {prods.length===0?aviso("Primero cargá tus productos en Inventario."):clients.length===0?aviso("Primero cargá al cliente en la sección Clientes."):(
            <div>
              <div style={{fontSize:12,color:"#888",marginBottom:8,lineHeight:1.5}}>En WhatsApp mantené apretado el mensaje del cliente y tocá Copiar. Pegalo acá y tocá Interpretar. Podés pegar varios mensajes juntos.</div>
              <textarea style={Object.assign({},INP,{minHeight:110,resize:"vertical",fontFamily:"inherit"})} placeholder={"Ej:\n24 encendedor bic\n10 pila aa duracell\n6 chicles beldent"} value={texto} onChange={function(e){setTexto(e.target.value);}}/>
              <div style={{display:"flex",gap:8,margin:"10px 0 14px"}}>
                <Btn label="Interpretar pedido" bg={P0} tc={S0} onClick={interpretar}/>
                {lines&&(<Btn label="Limpiar" bg="#eee" tc="#333" onClick={function(){setTexto("");setLines(null);setIgnored([]);}}/>)}
              </div>
              {lines&&(
                <div>
                  <label style={LBL}>Cliente</label>
                  <select style={Object.assign({},INP,{marginBottom:12})} value={cId} onChange={function(e){setCId(e.target.value);}}>
                    <option value="">— Elegir cliente —</option>
                    {clients.map(function(c){return (<option key={c.id} value={String(c.id)}>{c.name}{c.owner?" ("+c.owner+")":""}</option>);})}
                  </select>
                  {lines.length===0&&(<div style={{color:"#888",fontSize:13,padding:"10px 0"}}>No encontré productos con cantidad en ese texto.</div>)}
                  {lines.map(function(l,i){
                    var p=prods.find(function(x){return x.id===l.pId;});
                    return (
                      <div key={i} style={{border:"1.5px solid "+(l.flag?"#f0c36d":"#e0ddd8"),background:l.flag?"#fffbf0":"#fff",borderRadius:10,padding:10,marginBottom:8}}>
                        <div style={{display:"flex",justifyContent:"space-between",gap:8,marginBottom:6}}>
                          <div style={{fontSize:11,color:"#999",wordBreak:"break-word"}}>"{l.raw}"{l.flag&&l.why?(<span style={{color:"#b45309",fontWeight:700}}>{" · "+l.why}</span>):null}</div>
                          <button onClick={function(){delLine(i);}} style={{background:"none",border:"none",color:"#bbb",fontSize:16,cursor:"pointer",lineHeight:1,flexShrink:0}}>✕</button>
                        </div>
                        <select style={INP} value={l.pId||""} onChange={function(e){setLine(i,{pId:parseInt(e.target.value)||"",flag:false});}}>
                          <option value="">— Elegir producto —</option>
                          {prods.map(function(x){return (<option key={x.id} value={x.id}>{x.name}</option>);})}
                        </select>
                        <div style={{display:"flex",alignItems:"center",gap:10,marginTop:8}}>
                          <span style={{fontSize:11,fontWeight:700,color:"#555"}}>CANT.</span>
                          <input type="number" min="1" style={Object.assign({},INP,{width:80})} value={l.qty} onChange={function(e){setLine(i,{qty:parseInt(e.target.value)||0,flag:false});}}/>
                          <div style={{marginLeft:"auto",fontWeight:800,fontSize:14}}>{p?"$"+(l.qty*p.price).toLocaleString("es-AR"):"—"}</div>
                        </div>
                      </div>
                    );
                  })}
                  {ignored.length>0&&(<div style={{background:"#f5f5f0",borderRadius:8,padding:"8px 10px",fontSize:11,color:"#888",marginBottom:10,lineHeight:1.5}}>No usé estas partes del mensaje: {ignored.join(" · ")}</div>)}
                  {lines.length>0&&(
                    <div style={{borderTop:"2px solid #f0ede8",paddingTop:12}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:10,flexWrap:"wrap"}}>
                        <div style={{fontWeight:800,fontSize:18}}>Total: ${total.toLocaleString("es-AR")}</div>
                        <Btn label="Crear pedido" bg={ready?S0:"#ccc"} tc="#fff" onClick={crear}/>
                      </div>
                      {!cli&&(<div style={{fontSize:12,color:"#b45309",marginTop:8}}>Elegí el cliente para poder crear el pedido.</div>)}
                      {cli&&pendientes>0&&(<div style={{fontSize:12,color:"#b45309",marginTop:8}}>Hay {pendientes} línea{pendientes!==1?"s":""} en naranja: revisalas antes de crear el pedido.</div>)}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {tab==="enviar"&&(
        <div>
          <div style={{fontSize:12,color:"#888",marginBottom:8,lineHeight:1.5}}>Lista armada con tus productos con stock. Copiala y pegala en un grupo o lista de difusión de WhatsApp. Los clientes responden con cantidad y producto, y vos lo cargás en la pestaña Recibir pedido.</div>
          {prods.length===0?aviso("Todavía no cargaste productos."):(
            <div>
              <textarea id="wa-cat" readOnly style={Object.assign({},INP,{minHeight:220,resize:"vertical",fontFamily:"inherit"})} value={catalogo}/>
              <div style={{display:"flex",gap:8,marginTop:10,flexWrap:"wrap"}}>
                <Btn label="Copiar lista" bg={P0} tc={S0} onClick={copiar}/>
                <Btn label="Abrir WhatsApp" bg="#25D366" tc="#fff" onClick={abrirWa}/>
              </div>
              {msg&&(<div style={{background:"#d4edda",color:"#155724",borderRadius:8,padding:"9px 12px",fontSize:12,fontWeight:700,marginTop:10}}>{msg}</div>)}
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}

function ViewOrders(props) {
  var orders=props.orders, setOrders=props.setOrders, clients=props.clients, prods=props.prods;
  var selOrd=props.selOrd, setSelOrd=props.setSelOrd;
  var [showNew,setShowNew]=useState(false), [nOrd,setNOrd]=useState({cId:"",items:[]}), [busqProd,setBusqProd]=useState("");
  var [showWa,setShowWa]=useState(false);
  function submitOrd(){if(!nOrd.cId||!nOrd.items.length)return;var c=clients.find(function(x){return x.id===parseInt(nOrd.cId);});var tot=nOrd.items.reduce(function(a,i){return a+i.qty*i.price;},0);var newOrd={id:1000+orders.length+1,cId:c.id,cName:c.name,date:hoy(),status:"pendiente",items:nOrd.items,total:tot,pagos:[]};setOrders(function(os){return [newOrd].concat(os);});setNOrd({cId:"",items:[]});setShowNew(false);}
  function updStatus(id,s){setOrders(function(os){return os.map(function(o){return o.id===id?Object.assign({},o,{status:s}):o;});});if(selOrd&&selOrd.id===id)setSelOrd(function(o){return Object.assign({},o,{status:s});});}
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div style={{fontSize:22,fontWeight:800}}>Pedidos</div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"flex-end"}}>
          <Btn label="💬 Pedido WhatsApp" bg="#25D366" tc="#fff" onClick={function(){setShowWa(true);}}/>
          <Btn label="+ Nuevo" onClick={function(){setShowNew(true);setBusqProd("");setNOrd({cId:"",items:[]});}}/>
          {showWa&&(<ModalWhatsApp prods={prods} clients={clients} orders={orders} setOrders={setOrders} brand={props.brand} onClose={function(){setShowWa(false);}} onCreated={function(o){setShowWa(false);setSelOrd(o);}}/>)}
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        <div style={CARD}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr><th style={TH}>#</th><th style={TH}>Cliente</th><th style={TH}>Total</th><th style={TH}>Estado</th></tr></thead>
            <tbody>{orders.map(function(o){return (<tr key={o.id} onClick={function(){setSelOrd(o);}} style={{cursor:"pointer",background:selOrd&&selOrd.id===o.id?"#fff8ee":"transparent"}}><td style={Object.assign({},TD,{color:"#888",fontSize:12})}>#{o.id}</td><td style={Object.assign({},TD,{fontWeight:600})}>{o.cName}</td><td style={TD}><b>${o.total.toLocaleString()}</b></td><td style={TD}><Tag s={o.status}/></td></tr>);})}</tbody>
          </table>
        </div>
        <div>
          {selOrd?(
            <div style={CARD}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}>
                <div><div style={{fontSize:12,color:"#888"}}>#{selOrd.id} - {selOrd.date}</div><div style={{fontWeight:800,fontSize:17}}>{selOrd.cName}</div></div>
                <Tag s={selOrd.status}/>
              </div>
              <table style={{width:"100%",borderCollapse:"collapse",marginBottom:10}}>
                <thead><tr><th style={TH}>Producto</th><th style={TH}>Cant.</th><th style={TH}>Precio</th><th style={TH}>Subtotal</th></tr></thead>
                <tbody>{selOrd.items.map(function(it,i){return (<tr key={i}><td style={TD}>{it.name}</td><td style={TD}>{it.qty}</td><td style={TD}>${it.price.toLocaleString()}</td><td style={Object.assign({},TD,{fontWeight:700})}>${(it.qty*it.price).toLocaleString()}</td></tr>);})}</tbody>
              </table>
              <div style={{textAlign:"right",fontWeight:800,fontSize:17,marginBottom:12,paddingTop:8,borderTop:"2px solid #f0ede8"}}>Total: ${selOrd.total.toLocaleString()}</div>
              <div style={{fontSize:11,fontWeight:700,color:"#555",textTransform:"uppercase",marginBottom:6}}>Cambiar estado</div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {["pendiente","en camino","entregado","cobrado","cancelado"].map(function(s){return (<button key={s} onClick={function(){updStatus(selOrd.id,s);}} style={{padding:"5px 11px",borderRadius:20,border:"1.5px solid",borderColor:selOrd.status===s?S0:"#ddd",background:selOrd.status===s?S0:"#fff",color:selOrd.status===s?"#fff":"#666",fontSize:12,fontWeight:600,cursor:"pointer"}}>{ST[s]?ST[s].l:s}</button>);}) }
              </div>
            </div>
          ):(<div style={Object.assign({},CARD,{textAlign:"center",padding:44,color:"#aaa"})}>Selecciona un pedido</div>)}
        </div>
      </div>
      {showNew&&(
        <Modal title="Nuevo pedido" onClose={function(){setShowNew(false);}}>
          <div style={{marginBottom:10}}><label style={LBL}>Cliente</label><select style={INP} value={nOrd.cId} onChange={function(e){setNOrd(function(o){return Object.assign({},o,{cId:e.target.value});});}}><option value="">Selecciona...</option>{clients.filter(function(c){return c.active;}).map(function(c){return (<option key={c.id} value={c.id}>{c.name}</option>);})}</select></div>
          <div style={{marginBottom:10}}>
            <label style={LBL}>Buscar producto</label>
            <input style={INP} placeholder="Escribí nombre o EAN..." value={busqProd} onChange={function(e){setBusqProd(e.target.value);}}/>
            {busqProd.length>1&&(
              <div style={{border:"1px solid #f0ede8",borderRadius:8,maxHeight:200,overflowY:"auto",marginTop:4}}>
                {prods.filter(function(p){var q=busqProd.toLowerCase();return p.name.toLowerCase().indexOf(q)>=0||(p.ean&&p.ean.indexOf(q)>=0);}).slice(0,10).map(function(p){
                  var enPedido=nOrd.items.find(function(i){return i.pId===p.id;});
                  return (<div key={p.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 12px",borderBottom:"1px solid #f5f5f0",background:enPedido?"#fffbf0":"#fff"}}>
                    <div><div style={{fontWeight:600,fontSize:13}}>{p.name}</div><div style={{fontSize:11,color:"#888"}}>{p.cat} | Stock: {p.stock}</div></div>
                    <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0,marginLeft:10}}>
                      <span style={{fontWeight:700,fontSize:14}}>${p.price.toLocaleString()}</span>
                      {enPedido?(<div style={{display:"flex",alignItems:"center",gap:4,background:"#f0ede8",borderRadius:6,padding:"3px 8px"}}><button onClick={function(){var pid=p.id;setNOrd(function(o){var ni=o.items.map(function(i){return i.pId===pid?Object.assign({},i,{qty:Math.max(1,i.qty-1)}):i;});return Object.assign({},o,{items:ni});});}} style={{background:"none",border:"none",cursor:"pointer",fontWeight:800,fontSize:16,padding:"0 2px"}}>-</button><span style={{fontWeight:800,minWidth:16,textAlign:"center"}}>{enPedido.qty}</span><button onClick={function(){var pid=p.id;setNOrd(function(o){var ni=o.items.map(function(i){return i.pId===pid?Object.assign({},i,{qty:i.qty+1}):i;});return Object.assign({},o,{items:ni});});}} style={{background:"none",border:"none",cursor:"pointer",fontWeight:800,fontSize:16,padding:"0 2px"}}>+</button></div>):(<button onClick={function(){var pid=p.id,pname=p.name,pprice=p.price;setNOrd(function(o){return Object.assign({},o,{items:o.items.concat([{pId:pid,name:pname,qty:1,price:pprice}])});});}} style={{background:S0,color:"#f0ede8",border:"none",borderRadius:6,padding:"5px 10px",fontSize:12,fontWeight:700,cursor:"pointer"}}>+ Agregar</button>)}
                    </div>
                  </div>);
                })}
              </div>
            )}
          </div>
          {nOrd.items.length>0&&(<div style={{background:"#f5f5f0",borderRadius:8,padding:10,marginBottom:10,fontSize:13}}>{nOrd.items.map(function(it,i){return (<div key={i} style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span>{it.name} x{it.qty}</span><b>${(it.qty*it.price).toLocaleString()}</b></div>);})}<div style={{fontWeight:800,textAlign:"right",borderTop:"1px solid #ddd",marginTop:6,paddingTop:6}}>Total: ${nOrd.items.reduce(function(a,i){return a+i.qty*i.price;},0).toLocaleString()}</div></div>)}
          <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}><Btn label="Cancelar" bg="#eee" tc="#333" onClick={function(){setShowNew(false);}}/><Btn label="Crear pedido" onClick={submitOrd}/></div>
        </Modal>
      )}
    </div>
  );
}

function ViewCuentaCte(props) {
  var orders=props.orders, setOrders=props.setOrders, clients=props.clients;
  var [selC,setSelC]=useState(clients[0]?clients[0].id:null);
  var [modal,setModal]=useState(null), [payAmt,setPayAmt]=useState(""), [payMeth,setPayMeth]=useState("efectivo"), [payNote,setPayNote]=useState(""), [histId,setHistId]=useState(null);
  var deudaG=orders.filter(function(o){return o.status!=="cancelado";}).reduce(function(a,o){return a+getSaldo(o);},0);
  var cobradoG=orders.reduce(function(a,o){return a+getPagos(o).reduce(function(x,p){return x+p.amount;},0);},0);
  var ccCli=null; for(var ci=0;ci<clients.length;ci++){if(clients[ci].id===selC){ccCli=clients[ci];break;}}
  var ccOrds=orders.filter(function(o){return o.cId===selC&&o.status!=="cancelado";}).sort(function(a,b){return new Date(b.date)-new Date(a.date);});
  var ccF=ccOrds.reduce(function(a,o){return a+o.total;},0);
  var ccP=ccOrds.reduce(function(a,o){return a+getPagos(o).reduce(function(x,p){return x+p.amount;},0);},0);
  var ccD=ccF-ccP;
  function abrirPago(o){setModal({id:o.id,total:o.total,saldo:getSaldo(o)});setPayAmt(String(getSaldo(o)));setPayMeth("efectivo");setPayNote("");}
  function confirmarPago(){var amt=parseFloat(payAmt)||0;if(amt<=0)return;var now=new Date();var pg={id:Date.now(),amount:Math.min(amt,modal.saldo),method:payMeth,note:payNote,date:now.toISOString().slice(0,10)};setOrders(function(os){return os.map(function(o){if(o.id!==modal.id)return o;var np=getPagos(o).concat([pg]);var ns=o.total-np.reduce(function(a,p){return a+p.amount;},0);return Object.assign({},o,{pagos:np,status:ns<=0?"cobrado":o.status});});});setModal(null);}
  function revertirUltimo(id){setOrders(function(os){return os.map(function(o){if(o.id!==id)return o;var pg=getPagos(o).slice(0,-1);var ns=o.total-pg.reduce(function(a,p){return a+p.amount;},0);return Object.assign({},o,{pagos:pg,status:ns>0&&o.status==="cobrado"?"entregado":o.status});});});}
  function cobrarTodo(){var now=new Date();setOrders(function(os){return os.map(function(o){if(o.cId!==selC)return o;var s=getSaldo(o);if(s<=0||o.status==="cancelado")return o;var pg={id:Date.now()+Math.random(),amount:s,method:"efectivo",note:"Cobro total",date:now.toISOString().slice(0,10)};return Object.assign({},o,{pagos:getPagos(o).concat([pg]),status:"cobrado"});});});}
  return (
    <div>
      <div style={{fontSize:22,fontWeight:800,marginBottom:18}}>Cuenta corriente</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:16}}>
        {[{l:"Deuda total",v:"$"+deudaG.toLocaleString(),bg:"#fff3cd",c:"#856404"},{l:"Cobrado",v:"$"+cobradoG.toLocaleString(),bg:"#d4edda",c:"#155724"},{l:"Con deuda",v:clients.filter(function(c){return orders.filter(function(o){return o.cId===c.id&&o.status!=="cancelado";}).reduce(function(a,o){return a+getSaldo(o);},0)>0;}).length,bg:"#f0ede8",c:S0}].map(function(s,i){return (<div key={i} style={Object.assign({},CARD,{background:s.bg})}><div style={{fontWeight:800,fontSize:22,color:s.c}}>{s.v}</div><div style={{fontSize:11,fontWeight:700,color:s.c,textTransform:"uppercase"}}>{s.l}</div></div>);})}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"200px 1fr",gap:14}}>
        <div style={CARD}>
          <div style={{fontWeight:800,fontSize:13,marginBottom:8}}>Clientes</div>
          {clients.map(function(c){var d=orders.filter(function(o){return o.cId===c.id&&o.status!=="cancelado";}).reduce(function(a,o){return a+getSaldo(o);},0);return (<button key={c.id} onClick={function(){setSelC(c.id);}} style={{background:selC===c.id?S0:"#fafaf8",border:selC===c.id?"none":"1px solid #f0ede8",borderRadius:8,padding:"9px 11px",cursor:"pointer",textAlign:"left",display:"block",width:"100%",marginBottom:5}}><div style={{fontWeight:700,fontSize:12,color:selC===c.id?"#fff":S0}}>{c.name}</div>{d>0?(<div style={{fontSize:11,fontWeight:800,color:selC===c.id?P0:"#856404"}}>${d.toLocaleString()}</div>):(<div style={{fontSize:11,color:selC===c.id?"#90ee90":"#155724",fontWeight:700}}>Al día</div>)}</button>);})}
        </div>
        {ccCli&&(
          <div>
            <div style={Object.assign({},CARD,{marginBottom:12})}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
                <div><div style={{fontWeight:800,fontSize:17}}>{ccCli.name}</div><div style={{fontSize:12,color:"#666"}}>{ccCli.owner}</div></div>
                {ccD>0&&(<Btn label="Cobrar todo" bg="#5B21B6" tc="#fff" onClick={cobrarTodo} style={{fontSize:12,padding:"7px 14px"}}/>)}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
                {[{l:"Facturado",v:"$"+ccF.toLocaleString(),bg:"#f0ede8",c:S0},{l:"Saldo",v:"$"+ccD.toLocaleString(),bg:ccD>0?"#fff3cd":"#d4edda",c:ccD>0?"#856404":"#155724"},{l:"Cobrado",v:"$"+ccP.toLocaleString(),bg:"#d4edda",c:"#155724"},{l:"En camino",v:"$"+ccOrds.filter(function(o){return o.status==="en camino";}).reduce(function(a,o){return a+o.total;},0).toLocaleString(),bg:"#cce5ff",c:"#004085"}].map(function(s,i){return (<div key={i} style={{background:s.bg,borderRadius:8,padding:"9px 11px",textAlign:"center"}}><div style={{fontWeight:800,fontSize:15,color:s.c}}>{s.v}</div><div style={{fontSize:10,fontWeight:700,color:s.c,textTransform:"uppercase"}}>{s.l}</div></div>);})}
              </div>
            </div>
            <div style={CARD}>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead><tr>{["#","Fecha","Total","Pagado","Saldo","Estado",""].map(function(h){return (<th key={h} style={TH}>{h}</th>);})}</tr></thead>
                <tbody>
                  {ccOrds.map(function(o){var pagos=getPagos(o);var pagado=pagos.reduce(function(a,p){return a+p.amount;},0);var saldo=o.total-pagado;var st=saldo<=0?"cobrado":pagado>0?"parcial":o.status;return (
                    <tr key={o.id} style={{background:st==="cobrado"?"#fafff9":pagado>0?"#fffef0":"#fff"}}>
                      <td style={Object.assign({},TD,{fontFamily:"monospace",color:"#888"})}>#{o.id}</td>
                      <td style={Object.assign({},TD,{fontSize:12})}>{o.date}</td>
                      <td style={Object.assign({},TD,{fontWeight:700})}>${o.total.toLocaleString()}</td>
                      <td style={Object.assign({},TD,{color:"#155724"})}>{pagado>0?"$"+pagado.toLocaleString():"-"}</td>
                      <td style={Object.assign({},TD,{fontWeight:800,color:saldo>0?"#856404":"#155724"})}>{saldo>0?"$"+saldo.toLocaleString():"0"}</td>
                      <td style={TD}>{st==="cobrado"?(<span style={{background:"#e8d5ff",color:"#5B21B6",borderRadius:20,padding:"2px 7px",fontSize:11,fontWeight:800}}>Cobrado</span>):st==="parcial"?(<span style={{background:"#fff3cd",color:"#856404",borderRadius:20,padding:"2px 7px",fontSize:11,fontWeight:800}}>Parcial</span>):(<Tag s={st}/>)}</td>
                      <td style={Object.assign({},TD,{whiteSpace:"nowrap"})}><div style={{display:"flex",gap:4}}>{saldo>0&&(o.status==="entregado"||pagado>0)&&(<button onClick={function(){abrirPago(o);}} style={{background:"#5B21B6",color:"#fff",border:"none",borderRadius:6,padding:"3px 8px",fontSize:11,fontWeight:700,cursor:"pointer"}}>$ Cobrar</button>)}{pagos.length>0&&(<button onClick={function(){setHistId(histId===o.id?null:o.id);}} style={{background:"none",border:"1px solid #ddd",borderRadius:6,padding:"3px 7px",fontSize:11,cursor:"pointer",color:"#666"}}>{pagos.length}p</button>)}</div></td>
                    </tr>
                  );})}
                </tbody>
              </table>
              {ccOrds.filter(function(o){return histId===o.id;}).map(function(o){var pgs=getPagos(o);return (<div key={"h"+o.id} style={{background:"#f7f4ff",borderRadius:10,margin:"8px 0",padding:12,border:"1px solid #e8d5ff"}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><div style={{fontWeight:700,fontSize:12,color:"#5B21B6"}}>Pagos #{o.id}</div><button onClick={function(){revertirUltimo(o.id);}} style={{background:"none",border:"1px solid #ddd",borderRadius:6,padding:"2px 7px",fontSize:11,cursor:"pointer",color:"#888"}}>Revertir último</button></div><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr>{["Fecha","Monto","Forma","Nota"].map(function(h){return (<th key={h} style={Object.assign({},TH,{fontSize:10})}>{h}</th>);})}</tr></thead><tbody>{pgs.map(function(pg,i){return (<tr key={pg.id} style={{background:i%2===0?"#fff":"#faf7ff"}}><td style={Object.assign({},TD,{fontSize:12})}>{pg.date}</td><td style={Object.assign({},TD,{fontWeight:800,color:"#155724"})}>${pg.amount.toLocaleString()}</td><td style={TD}>{pg.method}</td><td style={Object.assign({},TD,{color:"#666"})}>{pg.note||"-"}</td></tr>);})}</tbody></table></div>);})}
            </div>
          </div>
        )}
      </div>
      {modal&&(
        <Modal title="Registrar cobro" onClose={function(){setModal(null);}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}><div style={{background:"#f0ede8",borderRadius:10,padding:12,textAlign:"center"}}><div style={{fontSize:10,color:"#888",fontWeight:700,textTransform:"uppercase"}}>Total</div><div style={{fontWeight:800,fontSize:20}}>${modal.total.toLocaleString()}</div></div><div style={{background:"#fff3cd",borderRadius:10,padding:12,textAlign:"center"}}><div style={{fontSize:10,color:"#856404",fontWeight:700,textTransform:"uppercase"}}>Saldo</div><div style={{fontWeight:800,fontSize:20,color:"#856404"}}>${modal.saldo.toLocaleString()}</div></div></div>
          <div style={{marginBottom:12}}><label style={LBL}>Monto</label><input type="number" style={Object.assign({},INP,{fontSize:18,fontWeight:800,textAlign:"center",color:"#5B21B6"})} value={payAmt} onChange={function(e){setPayAmt(e.target.value);}}/><div style={{display:"flex",gap:5,marginTop:6}}>{[25,50,75,100].map(function(pct){var a=Math.round(modal.saldo*pct/100);return (<button key={pct} onClick={function(){setPayAmt(String(a));}} style={{flex:1,padding:"5px 0",border:"1px solid #ddd",borderRadius:6,background:"#f7f4f0",fontSize:11,fontWeight:700,cursor:"pointer"}}>{pct}%</button>);})}</div></div>
          <div style={{marginBottom:12}}><label style={LBL}>Forma de pago</label><div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6}}>{["efectivo","transferencia","cheque","tarjeta","cuenta_cte","otro"].map(function(m){return (<button key={m} onClick={function(){setPayMeth(m);}} style={{padding:"7px 0",border:payMeth===m?"2px solid #5B21B6":"1.5px solid #e0ddd8",borderRadius:8,background:payMeth===m?"#e8d5ff":"#fff",color:payMeth===m?"#5B21B6":"#666",fontWeight:payMeth===m?800:500,cursor:"pointer",fontSize:11}}>{m==="efectivo"?"Efectivo":m==="transferencia"?"Transf.":m==="cheque"?"Cheque":m==="tarjeta"?"Tarjeta":m==="cuenta_cte"?"Cta.Cte.":"Otro"}</button>);})}</div></div>
          <div style={{marginBottom:16}}><label style={LBL}>Nota</label><input style={INP} value={payNote} onChange={function(e){setPayNote(e.target.value);}} placeholder="Opcional..."/></div>
          <div style={{display:"flex",gap:10}}><Btn label="Cancelar" bg="#eee" tc="#333" onClick={function(){setModal(null);}} style={{flex:1}}/><Btn label={"Registrar $"+(parseFloat(payAmt)?parseFloat(payAmt).toLocaleString():"0")} bg="#5B21B6" tc="#fff" onClick={confirmarPago} style={{flex:2,fontSize:13}}/></div>
        </Modal>
      )}
    </div>
  );
}

function ViewClients(props) {
  var clients=props.clients, setClients=props.setClients, orders=props.orders;
  var [showNew,setShowNew]=useState(false);
  var [nC,setNC]=useState({name:"",owner:"",phone:"",address:"",email:"",user:"",pass:""});
  var delivered=getDelivered(orders);
  function saveNew(){if(!nC.name||!nC.user)return;var nc=Object.assign({},nC,{id:clients.length+10,active:true});setClients(function(cs){return cs.concat([nc]);});setNC({name:"",owner:"",phone:"",address:"",email:"",user:"",pass:""});setShowNew(false);}
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div style={{fontSize:22,fontWeight:800}}>Clientes</div>
        <Btn label="+ Nuevo" onClick={function(){setShowNew(true);}}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,alignItems:"start"}}>
        {clients.map(function(c){var co=orders.filter(function(o){return o.cId===c.id;});var sp=delivered.filter(function(o){return o.cId===c.id;}).reduce(function(a,o){return a+o.total;},0);return (
          <div key={c.id} style={Object.assign({},CARD,{borderLeft:"4px solid "+(c.active?P0:"#ddd")})}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
              <div><div style={{fontWeight:800,fontSize:15}}>{c.name}</div><div style={{fontSize:12,color:"#666"}}>{c.owner}</div></div>
              <Tag s={c.active?"entregado":"cancelado"}/>
            </div>
            <div style={{fontSize:11,color:"#888",marginBottom:10}}>{c.phone} | {c.email}<br/>{c.address}<br/>Usuario: <b>{c.user}</b></div>
            <div style={{display:"flex",gap:20,paddingTop:8,borderTop:"1px solid #f0ede8"}}>
              <div><div style={{fontSize:9,color:"#888",textTransform:"uppercase",fontWeight:700}}>Pedidos</div><div style={{fontWeight:800,fontSize:16}}>{co.length}</div></div>
              <div><div style={{fontSize:9,color:"#888",textTransform:"uppercase",fontWeight:700}}>Compras</div><div style={{fontWeight:800,fontSize:16}}>${sp.toLocaleString()}</div></div>
            </div>
          </div>
        );})}
      </div>
      {showNew&&(
        <Modal title="Nuevo cliente" onClose={function(){setShowNew(false);}}>
          {[{l:"Nombre del kiosco",k:"name"},{l:"Dueño/a",k:"owner"},{l:"Teléfono",k:"phone"},{l:"Dirección",k:"address"},{l:"Email",k:"email"}].map(function(f){return (<div key={f.k} style={{marginBottom:10}}><label style={LBL}>{f.l}</label><input style={INP} value={nC[f.k]} onChange={function(e){var k=f.k;setNC(function(x){return Object.assign({},x,{[k]:e.target.value});})}}/></div>);})}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}><div><label style={LBL}>Usuario</label><input style={INP} value={nC.user} onChange={function(e){setNC(function(x){return Object.assign({},x,{user:e.target.value});})}}/></div><div><label style={LBL}>Contraseña</label><input style={INP} value={nC.pass} onChange={function(e){setNC(function(x){return Object.assign({},x,{pass:e.target.value});})}}/></div></div>
          <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}><Btn label="Cancelar" bg="#eee" tc="#333" onClick={function(){setShowNew(false);}}/><Btn label="Guardar" onClick={saveNew}/></div>
        </Modal>
      )}
    </div>
  );
}

function ViewMessages(props) {
  var clients=props.clients, msgs=props.msgs, setMsgs=props.setMsgs;
  var [selC,setSelC]=useState(clients[0]?clients[0].id:null), [txt,setTxt]=useState("");
  function send(){if(!txt.trim())return;var m={id:msgs.length+1,cId:selC,from:"admin",text:txt.trim(),date:new Date().toLocaleString("es-AR").slice(0,16)};setMsgs(function(ms){return ms.concat([m]);});setTxt("");}
  var cliMsgs=msgs.filter(function(m){return m.cId===selC;});
  return (
    <div>
      <div style={{fontSize:22,fontWeight:800,marginBottom:18}}>Mensajes</div>
      <div style={{display:"grid",gridTemplateColumns:"200px 1fr",gap:14}}>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {clients.map(function(c){
            // Badge de mensajes no leídos (del cliente, después del último admin)
            var cMsgs=msgs.filter(function(m){return m.cId===c.id;});
            var lastAdminIdx=cMsgs.map(function(m){return m.from;}).lastIndexOf("admin");
            var unread=cMsgs.slice(lastAdminIdx+1).filter(function(m){return m.from==="client";}).length;
            var last=cMsgs.slice(-1)[0];
            return (<button key={c.id} onClick={function(){setSelC(c.id);}} style={Object.assign({},CARD,{textAlign:"left",cursor:"pointer",border:selC===c.id?"2px solid "+P0:"2px solid transparent",padding:"10px 12px",marginBottom:0})}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{fontWeight:700,fontSize:12}}>{c.name}</div>{unread>0&&(<span style={{background:"#dc3545",color:"#fff",borderRadius:10,fontSize:9,fontWeight:800,padding:"1px 5px"}}>{unread}</span>)}</div><div style={{fontSize:10,color:"#888",marginTop:2}}>{last?last.text.slice(0,28)+"...":"Sin mensajes"}</div></button>);
          })}
        </div>
        <div style={CARD}>
          <div style={{fontWeight:800,marginBottom:12}}>{(clients.find(function(c){return c.id===selC;})||{}).name}</div>
          <div style={{minHeight:240,maxHeight:320,overflowY:"auto",marginBottom:12}}>
            {cliMsgs.map(function(m){return (<div key={m.id} style={{display:"flex",justifyContent:m.from==="admin"?"flex-end":"flex-start",marginBottom:10}}><div><div style={{maxWidth:280,padding:"9px 13px",borderRadius:m.from==="admin"?"14px 14px 4px 14px":"14px 14px 14px 4px",background:m.from==="admin"?S0:"#f0ede8",color:m.from==="admin"?"#fff":S0,fontSize:13}}>{m.text}</div><div style={{fontSize:9,color:"#aaa",marginTop:2,textAlign:m.from==="admin"?"right":"left"}}>{m.date}</div></div></div>);})}
          </div>
          <div style={{display:"flex",gap:8,borderTop:"1px solid #f0ede8",paddingTop:12}}><input style={Object.assign({},INP,{flex:1})} placeholder="Escribí tu respuesta..." value={txt} onChange={function(e){setTxt(e.target.value);}} onKeyDown={function(e){if(e.key==="Enter")send();}}/><Btn label="Enviar" onClick={send}/></div>
        </div>
      </div>
    </div>
  );
}

function ViewPrecios(props) {
  var prods=props.prods, setProds=props.setProds;
  var [subtab,setSubtab]=useState("pct"), [pctV,setPctV]=useState(""), [pctC,setPctC]=useState(""), [pctCat,setPctCat]=useState("Todos"), [prev,setPrev]=useState([]);
  var cats=getCats(prods);
  function calcPrev(){var base=pctCat==="Todos"?prods:prods.filter(function(p){return p.cat===pctCat;});var pv=parseFloat(pctV)||0;var pc=parseFloat(pctC)||0;var res=base.map(function(p){return Object.assign({},p,{nV:pv?Math.round(p.price*(1+pv/100)):p.price,nC:pc?Math.round(p.costo*(1+pc/100)):p.costo});});setPrev(res.filter(function(p){return p.nV!==p.price||p.nC!==p.costo;}));}
  function aplicar(){var pr=prev;setProds(function(ps){return ps.map(function(p){var m=pr.find(function(x){return x.id===p.id;});return m?Object.assign({},p,{price:m.nV,costo:m.nC}):p;});});setPctV("");setPctC("");setPrev([]);}
  // PreciosImport inline
  var [rows,setRows]=useState([]), [msg,setMsg]=useState("");
  function handleFilePrices(e){var file=e.target.files[0];if(!file)return;e.target.value="";var reader=new FileReader();reader.onload=function(ev){var text=ev.target.result;var lineas=text.trim().split("\n");var sep=lineas[0].indexOf(";")>=0?";":",";var headers=lineas[0].split(sep).map(function(h){return h.trim().toLowerCase().replace(/"/g,"");});function col(row,names){for(var i=0;i<names.length;i++){var idx=headers.indexOf(names[i]);if(idx>=0)return(row[idx]||"").replace(/"/g,"").trim();}return"";}var result=[];for(var i=1;i<lineas.length;i++){var parts=lineas[i].split(sep);if(!parts.some(function(p){return p.trim();}))continue;var nombre=col(parts,["nombre","name","producto","descripcion"]);var ean=col(parts,["ean","codigo","barcode"]);var precio=parseFloat(col(parts,["precio","price","pvp","venta","precio venta"]).replace(",","."))||0;var costo=parseFloat(col(parts,["costo","cost","compra","precio costo"]).replace(",","."))||0;if(!nombre&&!ean)continue;if(!precio&&!costo)continue;var found=prods.find(function(p){return(ean&&p.ean===ean)||(nombre&&p.name.toLowerCase()===nombre.toLowerCase());});if(found)result.push({id:found.id,nombre:found.name,precioActual:found.price,costoActual:found.costo,precioNuevo:precio||found.price,costoNuevo:costo||found.costo});}setRows(result);setMsg("");};reader.readAsText(file);}
  function aplicarArchivo(){var r=rows;setProds(function(ps){return ps.map(function(p){var m=r.find(function(x){return x.id===p.id;});return m?Object.assign({},p,{price:m.precioNuevo,costo:m.costoNuevo}):p;});});setMsg("Actualizados "+rows.length+" productos.");setRows([]);}
  function exportar(){var csv="nombre,ean,precio,costo\n"+prods.map(function(p){return p.name+","+(p.ean||"")+","+p.price+","+p.costo;}).join("\n");var blob=new Blob([csv],{type:"text/csv"});var url=URL.createObjectURL(blob);var a=document.createElement("a");a.href=url;a.download="precios_actuales.csv";a.click();URL.revokeObjectURL(url);}
  return (
    <div>
      <div style={{fontSize:22,fontWeight:800,marginBottom:16}}>Precios</div>
      <div style={{display:"flex",gap:8,marginBottom:18}}>
        <button onClick={function(){setSubtab("pct");}} style={{padding:"8px 18px",border:"none",borderRadius:8,cursor:"pointer",fontWeight:subtab==="pct"?700:500,fontSize:13,background:subtab==="pct"?S0:"#f0ede8",color:subtab==="pct"?"#fff":"#666"}}>Aumento %</button>
        <button onClick={function(){setSubtab("archivo");}} style={{padding:"8px 18px",border:"none",borderRadius:8,cursor:"pointer",fontWeight:subtab==="archivo"?700:500,fontSize:13,background:subtab==="archivo"?S0:"#f0ede8",color:subtab==="archivo"?"#fff":"#666"}}>Desde archivo</button>
      </div>
      {subtab==="archivo"&&(
        <div style={CARD}>
          <div style={{fontSize:13,color:"#888",marginBottom:14}}>CSV con <b>nombre</b> (o EAN), <b>precio</b> y/o <b>costo</b>.</div>
          {msg&&(<div style={{background:"#d4edda",color:"#155724",borderRadius:8,padding:"10px 14px",marginBottom:12,fontWeight:700,fontSize:13}}>{msg}</div>)}
          <div style={{display:"flex",gap:10,marginBottom:14}}>
            <label style={{background:S0,color:"#f0ede8",borderRadius:8,padding:"9px 16px",fontSize:13,fontWeight:700,cursor:"pointer"}}>Seleccionar CSV<input type="file" accept=".csv,.txt" style={{display:"none"}} onChange={handleFilePrices}/></label>
            <button onClick={exportar} style={{background:"none",border:"1px solid #ddd",borderRadius:8,padding:"8px 14px",fontSize:12,cursor:"pointer",color:"#666"}}>Exportar precios actuales</button>
          </div>
          {rows.length>0&&(<div><div style={{fontWeight:700,fontSize:13,marginBottom:8}}>{rows.length} productos encontrados</div><div style={{maxHeight:280,overflowY:"auto",border:"1px solid #f0ede8",borderRadius:8,marginBottom:12}}><table style={{width:"100%",borderCollapse:"collapse"}}><thead style={{position:"sticky",top:0,background:"#f7f4f0"}}><tr><th style={TH}>Producto</th><th style={TH}>Precio actual</th><th style={TH}>Precio nuevo</th><th style={TH}>Costo actual</th><th style={TH}>Costo nuevo</th></tr></thead><tbody>{rows.map(function(r,i){var cv=r.precioNuevo!==r.precioActual;var cc=r.costoNuevo!==r.costoActual;return (<tr key={i} style={{background:i%2===0?"#fff":"#fafaf8"}}><td style={Object.assign({},TD,{fontWeight:600})}>{r.nombre}</td><td style={Object.assign({},TD,{color:"#888"})}>${r.precioActual.toLocaleString()}</td><td style={Object.assign({},TD,{fontWeight:700,color:cv?"#155724":"#888"})}>${r.precioNuevo.toLocaleString()}{cv&&(<span style={{fontSize:10,color:"#155724",marginLeft:4}}>↑</span>)}</td><td style={Object.assign({},TD,{color:"#888"})}>${r.costoActual.toLocaleString()}</td><td style={Object.assign({},TD,{fontWeight:700,color:cc?"#155724":"#888"})}>${r.costoNuevo.toLocaleString()}{cc&&(<span style={{fontSize:10,color:"#155724",marginLeft:4}}>↑</span>)}</td></tr>);})}</tbody></table></div><div style={{display:"flex",gap:10,justifyContent:"flex-end"}}><button onClick={function(){setRows([]);}} style={{background:"#eee",color:"#333",border:"none",borderRadius:8,padding:"9px 16px",fontSize:13,fontWeight:700,cursor:"pointer"}}>Cancelar</button><button onClick={aplicarArchivo} style={{background:P0,color:S0,border:"none",borderRadius:8,padding:"9px 16px",fontSize:13,fontWeight:700,cursor:"pointer"}}>Aplicar {rows.length} precios</button></div></div>)}
        </div>
      )}
      {subtab==="pct"&&(
        <div>
          <div style={CARD}>
            <div style={{fontWeight:700,fontSize:14,marginBottom:14}}>Aumento por porcentaje</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:14}}>
              <div><label style={LBL}>% Venta</label><input type="number" style={INP} placeholder="ej: 20" value={pctV} onChange={function(e){setPctV(e.target.value);}}/></div>
              <div><label style={LBL}>% Costo</label><input type="number" style={INP} placeholder="ej: 15" value={pctC} onChange={function(e){setPctC(e.target.value);}}/></div>
              <div><label style={LBL}>Categoría</label><select style={INP} value={pctCat} onChange={function(e){setPctCat(e.target.value);}}>{cats.map(function(c){return (<option key={c}>{c}</option>);})}</select></div>
            </div>
            <div style={{display:"flex",gap:10}}><Btn label="Vista previa" bg={P0} tc={S0} onClick={calcPrev}/>{prev.length>0&&(<Btn label={"Aplicar ("+prev.length+")"} onClick={aplicar}/>)}</div>
          </div>
          {prev.length>0&&(<div style={CARD}><div style={{fontWeight:700,fontSize:14,marginBottom:12}}>Vista previa</div><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr><th style={TH}>Producto</th><th style={TH}>Venta actual</th><th style={TH}>Venta nueva</th><th style={TH}>Costo actual</th><th style={TH}>Costo nuevo</th></tr></thead><tbody>{prev.map(function(p,i){return (<tr key={i} style={{background:i%2===0?"#fff":"#fafaf8"}}><td style={Object.assign({},TD,{fontWeight:600})}>{p.name}</td><td style={Object.assign({},TD,{color:"#888"})}>${p.price.toLocaleString()}</td><td style={Object.assign({},TD,{fontWeight:700,color:"#155724"})}>${p.nV.toLocaleString()}</td><td style={Object.assign({},TD,{color:"#888"})}>${p.costo.toLocaleString()}</td><td style={Object.assign({},TD,{fontWeight:700,color:"#155724"})}>${p.nC.toLocaleString()}</td></tr>);})}</tbody></table></div>)}
        </div>
      )}
    </div>
  );
}

function ViewAjuste(props) {
  var prods=props.prods, setProds=props.setProds;
  var [edits,setEdits]=useState({}), [mode,setMode]=useState("add"), [val,setVal]=useState(""), [cat,setCat]=useState("Todos"), [prev,setPrev]=useState([]);
  var cats=getCats(prods);
  var editCount=Object.keys(edits).filter(function(k){return edits[k]!=="";}).length;
  function applyManual(){setProds(function(ps){return ps.map(function(p){var v=edits[p.id];return v!==undefined&&v!==""?Object.assign({},p,{stock:Math.max(0,parseInt(v)||0)}):p;});});setEdits({});}
  function calcPrev(){var base=cat==="Todos"?prods:prods.filter(function(p){return p.cat===cat;});var v=parseInt(val)||0;var res=base.map(function(p){var ns=mode==="set"?v:mode==="add"?p.stock+v:Math.max(0,p.stock-v);return Object.assign({},p,{ns:ns});});setPrev(res.filter(function(p){return p.ns!==p.stock;}));}
  function applyBulk(){var pr=prev;setProds(function(ps){return ps.map(function(p){var m=pr.find(function(x){return x.id===p.id;});return m?Object.assign({},p,{stock:m.ns}):p;});});setVal("");setPrev([]);}
  return (
    <div>
      <div style={{fontSize:22,fontWeight:800,marginBottom:18}}>Ajuste de stock</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        <div>
          <div style={{fontWeight:700,fontSize:14,marginBottom:8}}>Manual</div>
          <div style={Object.assign({},CARD,{maxHeight:460,overflowY:"auto"})}>
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead style={{position:"sticky",top:0,background:"#fff"}}><tr><th style={TH}>Producto</th><th style={TH}>Actual</th><th style={TH}>Nuevo</th></tr></thead>
              <tbody>{prods.map(function(p,i){var ed=edits[p.id]!==undefined;return (<tr key={p.id} style={{background:ed?"#fffbf0":i%2===0?"#fff":"#fafaf8"}}><td style={Object.assign({},TD,{fontWeight:600,fontSize:12})}>{p.name}</td><td style={Object.assign({},TD,{fontWeight:700,color:p.stock<=p.min?"#dc3545":"#155724"})}>{p.stock}</td><td style={TD}><input type="number" min={0} placeholder={String(p.stock)} value={edits[p.id]||""} onChange={function(e){var id=p.id;setEdits(function(m){return Object.assign({},m,{[id]:e.target.value});});}} style={{width:80,border:"1.5px solid "+(ed?P0:"#e0ddd8"),borderRadius:6,padding:"4px 7px",fontSize:13}}/></td></tr>);})}</tbody>
            </table>
          </div>
          {editCount>0&&(<div style={{display:"flex",gap:8,marginTop:8,justifyContent:"flex-end"}}><Btn label="Cancelar" bg="#eee" tc="#333" onClick={function(){setEdits({});}}/><Btn label={"Aplicar "+editCount+" cambios"} onClick={applyManual}/></div>)}
        </div>
        <div>
          <div style={{fontWeight:700,fontSize:14,marginBottom:8}}>Masivo</div>
          <div style={CARD}>
            <div style={{marginBottom:10}}><label style={LBL}>Tipo</label><div style={{display:"flex",gap:6}}>{[{id:"set",l:"= Fijar"},{id:"add",l:"+ Sumar"},{id:"sub",l:"- Restar"}].map(function(m){return (<button key={m.id} onClick={function(){setMode(m.id);setPrev([]);}} style={{flex:1,padding:"6px 0",border:"none",background:mode===m.id?P0:"#f0ede8",color:mode===m.id?S0:"#888",borderRadius:8,cursor:"pointer",fontWeight:mode===m.id?800:500,fontSize:12}}>{m.l}</button>);})}</div></div>
            <div style={{marginBottom:10}}><label style={LBL}>Cantidad</label><input type="number" style={INP} value={val} onChange={function(e){setVal(e.target.value);setPrev([]);}}/></div>
            <div style={{marginBottom:12}}><label style={LBL}>Categoría</label><select style={INP} value={cat} onChange={function(e){setCat(e.target.value);setPrev([]);}}>{cats.map(function(c){return (<option key={c}>{c}</option>);})}</select></div>
            <div style={{display:"flex",gap:8}}><Btn label="Vista previa" bg={P0} tc={S0} onClick={function(){if(!val)return;calcPrev();}}/>{prev.length>0&&(<Btn label={"Aplicar ("+prev.length+")"} onClick={applyBulk}/>)}</div>
            {prev.length>0&&(<div style={{marginTop:10,maxHeight:220,overflowY:"auto"}}><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr><th style={TH}>Producto</th><th style={TH}>Actual</th><th style={TH}>Nuevo</th></tr></thead><tbody>{prev.map(function(p,i){var d=p.ns-p.stock;return (<tr key={p.id} style={{background:i%2===0?"#fff":"#fafaf8"}}><td style={Object.assign({},TD,{fontWeight:600,fontSize:12})}>{p.name}</td><td style={Object.assign({},TD,{color:"#888"})}>{p.stock}</td><td style={Object.assign({},TD,{fontWeight:800,color:d>0?"#155724":"#dc3545"})}>{p.ns} ({d>0?"+":""}{d})</td></tr>);})}</tbody></table></div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

function ViewOfertas(props) {
  var prods=props.prods, offers=props.offers, setOffers=props.setOffers;
  var [tab,setTab]=useState("activas"), [showNew,setShowNew]=useState(false);
  var [nOff,setNOff]=useState({title:"",desc:"",from:hoy(),to:"",items:[]}), [search,setSearch]=useState("");
  var today=hoy();
  var actOff=offers.filter(function(o){return o.to>=today&&o.from<=today;});
  var list=tab==="activas"?actOff:offers.filter(function(o){return o.to<today;});
  function togItem(p){var inList=nOff.items.some(function(i){return i.id===p.id;});if(inList){setNOff(function(o){return Object.assign({},o,{items:o.items.filter(function(i){return i.id!==p.id;})});});}else{setNOff(function(o){return Object.assign({},o,{items:o.items.concat([{id:p.id,name:p.name,orig:p.price,offer:p.price,disc:0}])});});}}
  function updItem(id,field,v){var ni=nOff.items.map(function(i){if(i.id!==id)return i;if(field==="disc"){var d=parseFloat(v)||0;return Object.assign({},i,{disc:d,offer:Math.round(i.orig*(1-d/100))});}if(field==="offer"){var op=parseFloat(v)||0;return Object.assign({},i,{offer:op,disc:i.orig>0?Math.round((1-op/i.orig)*100):0});}return i;});setNOff(function(o){return Object.assign({},o,{items:ni});});}
  function saveOff(){if(!nOff.title||!nOff.to||!nOff.items.length)return;var no=Object.assign({},nOff,{id:Date.now()});setOffers(function(os){return [no].concat(os);});setNOff({title:"",desc:"",from:today,to:"",items:[]});setShowNew(false);setTab("activas");}
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
        <div style={{fontSize:22,fontWeight:800}}>Ofertas</div>
        <Btn label="+ Nueva oferta" bg={P0} tc={S0} onClick={function(){setShowNew(true);}}/>
      </div>
      <div style={{display:"flex",gap:8,marginBottom:14}}>
        {[{id:"activas",l:"Activas ("+actOff.length+")"},{id:"vencidas",l:"Vencidas"}].map(function(t){return (<button key={t.id} onClick={function(){setTab(t.id);}} style={{padding:"7px 14px",border:"none",background:tab===t.id?S0:"#f0ede8",color:tab===t.id?"#fff":"#666",borderRadius:8,cursor:"pointer",fontWeight:tab===t.id?700:500,fontSize:13}}>{t.l}</button>);})}
      </div>
      {list.length===0?(<div style={Object.assign({},CARD,{textAlign:"center",padding:44,color:"#aaa"})}>No hay ofertas aquí.</div>):list.map(function(offer){return (
        <div key={offer.id} style={Object.assign({},CARD,{border:"2px solid "+P0})}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
            <div><div style={{fontWeight:800,fontSize:16}}>{offer.title}</div>{offer.desc&&(<div style={{fontSize:12,color:"#666",marginTop:2}}>{offer.desc}</div>)}<div style={{fontSize:11,color:"#888",marginTop:4}}>{offer.from} al {offer.to}</div></div>
            <button onClick={function(){setOffers(function(os){return os.filter(function(o){return o.id!==offer.id;});});}} style={{background:"none",border:"none",color:"#ccc",cursor:"pointer",fontSize:18}}>✕</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:8}}>
            {offer.items.map(function(it){return (<div key={it.id} style={{background:"#fffbf0",borderRadius:8,padding:"9px 11px",border:"1px solid #f5e0aa"}}><div style={{fontWeight:700,fontSize:12,marginBottom:5}}>{it.name}</div><div style={{display:"flex",alignItems:"center",gap:5}}><span style={{textDecoration:"line-through",color:"#aaa",fontSize:11}}>${it.orig.toLocaleString()}</span><span style={{fontWeight:800,color:"#dc3545",fontSize:15}}>${it.offer.toLocaleString()}</span>{it.disc>0&&(<span style={{background:"#dc3545",color:"#fff",borderRadius:20,padding:"1px 5px",fontSize:10,fontWeight:800}}>-{it.disc}%</span>)}</div></div>);})}
          </div>
        </div>
      );})}
      {showNew&&(
        <Modal title="Nueva oferta" onClose={function(){setShowNew(false);}} w={680}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
            <div style={{gridColumn:"1/-1"}}><label style={LBL}>Título *</label><input style={INP} value={nOff.title} onChange={function(e){setNOff(function(o){return Object.assign({},o,{title:e.target.value});})}} placeholder="Ej: Liquidacion mayo"/></div>
            <div style={{gridColumn:"1/-1"}}><label style={LBL}>Descripción</label><input style={INP} value={nOff.desc} onChange={function(e){setNOff(function(o){return Object.assign({},o,{desc:e.target.value});})}}/></div>
            <div><label style={LBL}>Desde *</label><input type="date" style={INP} value={nOff.from} onChange={function(e){setNOff(function(o){return Object.assign({},o,{from:e.target.value});})}}/></div>
            <div><label style={LBL}>Hasta *</label><input type="date" style={INP} value={nOff.to} onChange={function(e){setNOff(function(o){return Object.assign({},o,{to:e.target.value});})}}/></div>
          </div>
          <div style={{borderTop:"1px solid #f0ede8",paddingTop:12,marginBottom:12}}>
            <div style={{fontWeight:700,fontSize:13,marginBottom:8}}>Productos</div>
            <input style={Object.assign({},INP,{marginBottom:8})} placeholder="Buscar..." value={search} onChange={function(e){setSearch(e.target.value);}}/>
            {search&&(<div style={{maxHeight:140,overflowY:"auto",border:"1px solid #f0ede8",borderRadius:8,marginBottom:10}}>{prods.filter(function(p){return p.name.toLowerCase().indexOf(search.toLowerCase())>=0;}).slice(0,12).map(function(p){var al=nOff.items.some(function(i){return i.id===p.id;});return (<div key={p.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 11px",borderBottom:"1px solid #f5f5f0",background:al?"#fffbf0":"#fff"}}><div><div style={{fontWeight:600,fontSize:12}}>{p.name}</div><div style={{fontSize:10,color:"#888"}}>${p.price.toLocaleString()}</div></div><button onClick={function(){togItem(p);}} style={{background:al?"#eee":S0,color:al?"#333":"#f0ede8",border:"none",borderRadius:7,padding:"3px 10px",fontSize:11,fontWeight:700,cursor:"pointer"}}>{al?"✓ Listo":"+ Agregar"}</button></div>);})}</div>)}
            {nOff.items.length>0&&(<div style={{border:"1px solid #f0ede8",borderRadius:8,overflow:"hidden",marginBottom:4}}>
              <div style={{background:"#f7f4f0",padding:"8px 12px",display:"grid",gridTemplateColumns:"2fr 100px 120px 130px 30px",gap:8,alignItems:"center"}}>{["Producto","Original","% Desc.","Precio oferta",""].map(function(h){return (<div key={h} style={{fontSize:11,fontWeight:700,color:"#888",textTransform:"uppercase"}}>{h}</div>);})}</div>
              {nOff.items.map(function(it){var ahorro=it.orig-it.offer;return (<div key={it.id} style={{padding:"10px 12px",display:"grid",gridTemplateColumns:"2fr 100px 120px 130px 30px",gap:8,alignItems:"center",borderTop:"1px solid #f0ede8",background:"#fff"}}><div><div style={{fontWeight:600,fontSize:13}}>{it.name}</div>{ahorro>0&&(<div style={{fontSize:11,color:"#155724",marginTop:2}}>Ahorro: ${ahorro.toLocaleString()}</div>)}</div><div style={{fontSize:13,color:"#888"}}>${it.orig.toLocaleString()}</div><div style={{display:"flex",alignItems:"center",gap:4}}><input type="number" min={0} max={99} value={it.disc||""} placeholder="0" onChange={function(e){updItem(it.id,"disc",e.target.value);}} style={{width:55,border:"1.5px solid #e0ddd8",borderRadius:6,padding:"5px 7px",fontSize:13,textAlign:"center"}}/><span style={{fontSize:13,color:"#888"}}>%</span></div><div><input type="number" min={0} value={it.offer||""} placeholder={String(it.orig)} onChange={function(e){updItem(it.id,"offer",e.target.value);}} style={{width:100,border:"1.5px solid "+(ahorro>0?"#dc3545":"#e0ddd8"),borderRadius:6,padding:"5px 7px",fontSize:14,fontWeight:800,color:"#dc3545",textAlign:"center"}}/></div><button onClick={function(){togItem({id:it.id});}} style={{background:"none",border:"none",color:"#ccc",cursor:"pointer",fontSize:16}}>✕</button></div>);})}
            </div>)}
          </div>
          <div style={{display:"flex",justifyContent:"flex-end",gap:10}}><Btn label="Cancelar" bg="#eee" tc="#333" onClick={function(){setShowNew(false);}}/><Btn label="Publicar oferta" bg={P0} tc={S0} onClick={saveOff} style={{opacity:(!nOff.title||!nOff.to||!nOff.items.length)?0.5:1}}/></div>
        </Modal>
      )}
    </div>
  );
}

function ViewReportes(props) {
  var orders=props.orders, clients=props.clients;
  var delivered=getDelivered(orders);
  var totalV=delivered.reduce(function(a,o){return a+o.total;},0);
  var salesByMes=MESES.map(function(m,i){return {mes:m,v:delivered.filter(function(o){return parseInt(o.date.split("-")[1])===i+1;}).reduce(function(a,o){return a+o.total;},0)};}).filter(function(d){return d.v>0;});
  var ranking=clients.map(function(c){var sp=delivered.filter(function(o){return o.cId===c.id;}).reduce(function(a,o){return a+o.total;},0);var cn=delivered.filter(function(o){return o.cId===c.id;}).length;return Object.assign({},c,{sp:sp,cn:cn});}).sort(function(a,b){return b.sp-a.sp;});
  var maxV=salesByMes.reduce(function(a,d){return Math.max(a,d.v);},1);
  var chartH=160, chartW=560;
  var barW=Math.min(40,Math.floor((chartW-40)/(salesByMes.length||1))-8);
  return (
    <div>
      <div style={{fontSize:22,fontWeight:800,marginBottom:18}}>Reportes</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:16}}>
        {[{l:"Facturación",v:"$"+totalV.toLocaleString()},{l:"Ticket promedio",v:"$"+Math.round(totalV/(delivered.length||1)).toLocaleString()},{l:"Pedidos entregados",v:delivered.length}].map(function(k,i){return (<div key={i} style={CARD}><div style={{fontSize:11,color:"#888",fontWeight:700,textTransform:"uppercase"}}>{k.l}</div><div style={{fontWeight:800,fontSize:22,marginTop:3}}>{k.v}</div></div>);})}
      </div>
      {salesByMes.length>0&&(<div style={Object.assign({},CARD,{marginBottom:14})}><div style={{fontWeight:700,fontSize:14,marginBottom:14}}>Ventas por mes</div><svg width="100%" viewBox={"0 0 "+chartW+" "+(chartH+30)} style={{overflow:"visible"}}>{salesByMes.map(function(d,i){var x=20+i*((chartW-40)/salesByMes.length);var barH=Math.round((d.v/maxV)*chartH);var y=chartH-barH;var isLast=i===salesByMes.length-1;return (<g key={d.mes}><rect x={x} y={y} width={barW} height={barH} rx={4} fill={isLast?P0:S0}/><text x={x+barW/2} y={chartH+14} textAnchor="middle" fontSize={11} fill="#999">{d.mes}</text><text x={x+barW/2} y={y-4} textAnchor="middle" fontSize={10} fill="#888">{"$"+(d.v/1000).toFixed(0)+"k"}</text></g>);})}</svg></div>)}
      <div style={CARD}><div style={{fontWeight:700,fontSize:14,marginBottom:12}}>Ranking de clientes</div><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr><th style={TH}>#</th><th style={TH}>Cliente</th><th style={TH}>Pedidos</th><th style={TH}>Total</th></tr></thead><tbody>{ranking.map(function(c,i){return (<tr key={c.id}><td style={Object.assign({},TD,{fontWeight:800,color:i===0?P0:"#aaa",fontSize:17})}>{i+1}</td><td style={Object.assign({},TD,{fontWeight:700})}>{c.name}</td><td style={TD}>{c.cn}</td><td style={Object.assign({},TD,{fontWeight:800})}>${c.sp.toLocaleString()}</td></tr>);})}</tbody></table></div>
    </div>
  );
}

function ViewRentabilidad(props) {
  var orders=props.orders, clients=props.clients, prods=props.prods;
  var [vista,setVista]=useState("clientes");
  var delivered=getDelivered(orders);
  function getCosto(items){return items.reduce(function(a,it){var p=prods.find(function(x){return x.id===it.pId;});return a+it.qty*(p?p.costo||0:0);},0);}
  var totV=delivered.reduce(function(a,o){return a+o.total;},0);
  var totC=delivered.reduce(function(a,o){return a+getCosto(o.items);},0);
  var totG=totV-totC;
  var margenG=totV>0?Math.round((totG/totV)*100):0;
  var porCliente=clients.map(function(c){var ords=delivered.filter(function(o){return o.cId===c.id;});var v=ords.reduce(function(a,o){return a+o.total;},0);var co=ords.reduce(function(a,o){return a+getCosto(o.items);},0);var g=v-co;var m=v>0?Math.round((g/v)*100):0;return Object.assign({},c,{v:v,co:co,g:g,m:m,n:ords.length});}).filter(function(c){return c.v>0;}).sort(function(a,b){return b.g-a.g;});
  var porProducto=prods.map(function(p){var vendido=0,ingresos=0,costos=0;delivered.forEach(function(o){o.items.forEach(function(it){if(it.pId===p.id){vendido+=it.qty;ingresos+=it.qty*it.price;costos+=it.qty*(p.costo||0);}});});var g=ingresos-costos;var m=ingresos>0?Math.round((g/ingresos)*100):0;return Object.assign({},p,{vendido:vendido,ingresos:ingresos,costos:costos,g:g,m:m});}).filter(function(p){return p.vendido>0;}).sort(function(a,b){return b.g-a.g;});
  function MargenBar(p){var m=p.m;var color=m>=30?"#16A34A":m>=15?"#D97706":"#DC2626";return (<div style={{display:"flex",alignItems:"center",gap:8}}><div style={{flex:1,height:8,background:"#f0ede8",borderRadius:4}}><div style={{height:8,borderRadius:4,background:color,width:Math.min(100,Math.max(0,m))+"%"}}/></div><span style={{fontSize:12,fontWeight:800,color:color,minWidth:36}}>{m}%</span></div>);}
  return (
    <div>
      <div style={{fontSize:22,fontWeight:800,marginBottom:18}}>Rentabilidad</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:18}}>
        {[{l:"Facturación",v:"$"+totV.toLocaleString(),bg:"#f0ede8",c:S0},{l:"Costo total",v:"$"+totC.toLocaleString(),bg:"#fff3cd",c:"#856404"},{l:"Ganancia",v:"$"+totG.toLocaleString(),bg:"#d4edda",c:"#155724"},{l:"Margen",v:margenG+"%",bg:margenG>=30?"#d4edda":margenG>=15?"#fff3cd":"#f8d7da",c:margenG>=30?"#155724":margenG>=15?"#856404":"#721c24"}].map(function(s,i){return (<div key={i} style={Object.assign({},CARD,{background:s.bg})}><div style={{fontWeight:800,fontSize:24,color:s.c}}>{s.v}</div><div style={{fontSize:11,fontWeight:700,color:s.c,textTransform:"uppercase"}}>{s.l}</div></div>);})}
      </div>
      <div style={{display:"flex",gap:8,marginBottom:16}}>
        {[{id:"clientes",l:"Por cliente"},{id:"productos",l:"Por producto"}].map(function(t){return (<button key={t.id} onClick={function(){setVista(t.id);}} style={{padding:"8px 18px",border:"none",background:vista===t.id?S0:"#f0ede8",color:vista===t.id?"#fff":"#666",borderRadius:8,cursor:"pointer",fontWeight:vista===t.id?700:500,fontSize:13}}>{t.l}</button>);})}
      </div>
      {vista==="clientes"&&(<div style={CARD}><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr><th style={TH}>#</th><th style={TH}>Cliente</th><th style={TH}>Pedidos</th><th style={TH}>Facturado</th><th style={TH}>Costo</th><th style={TH}>Ganancia</th><th style={TH}>Margen</th></tr></thead><tbody>{porCliente.map(function(c,i){return (<tr key={c.id} style={{background:i===0?"#fffbf0":i%2===0?"#fff":"#fafaf8"}}><td style={Object.assign({},TD,{fontWeight:800,color:i===0?P0:"#aaa",fontSize:18})}>{i+1}</td><td style={Object.assign({},TD,{fontWeight:700})}>{i===0&&(<span style={{background:P0,color:S0,borderRadius:10,padding:"1px 6px",fontSize:10,fontWeight:800,marginRight:6}}>TOP</span>)}{c.name}</td><td style={TD}>{c.n}</td><td style={Object.assign({},TD,{fontWeight:700})}>${c.v.toLocaleString()}</td><td style={Object.assign({},TD,{color:"#856404"})}>${c.co.toLocaleString()}</td><td style={Object.assign({},TD,{fontWeight:800,color:"#155724"})}>${c.g.toLocaleString()}</td><td style={Object.assign({},TD,{minWidth:140})}><MargenBar m={c.m}/></td></tr>);})}</tbody></table></div>)}
      {vista==="productos"&&(<div style={CARD}><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr><th style={TH}>#</th><th style={TH}>Producto</th><th style={TH}>Unidades</th><th style={TH}>Ingresos</th><th style={TH}>Costo</th><th style={TH}>Ganancia</th><th style={TH}>Margen</th></tr></thead><tbody>{porProducto.map(function(p,i){return (<tr key={p.id} style={{background:i===0?"#fffbf0":i%2===0?"#fff":"#fafaf8"}}><td style={Object.assign({},TD,{fontWeight:800,color:i===0?P0:"#aaa",fontSize:18})}>{i+1}</td><td style={Object.assign({},TD,{fontWeight:700})}>{i===0&&(<span style={{background:P0,color:S0,borderRadius:10,padding:"1px 6px",fontSize:10,fontWeight:800,marginRight:6}}>TOP</span>)}{p.name}</td><td style={TD}>{p.vendido}</td><td style={Object.assign({},TD,{fontWeight:700})}>${p.ingresos.toLocaleString()}</td><td style={Object.assign({},TD,{color:"#856404"})}>{p.costos?"$"+p.costos.toLocaleString():"-"}</td><td style={Object.assign({},TD,{fontWeight:800,color:"#155724"})}>${p.g.toLocaleString()}</td><td style={Object.assign({},TD,{minWidth:140})}>{p.costos>0?(<MargenBar m={p.m}/>):(<span style={{fontSize:12,color:"#aaa"}}>Sin costo</span>)}</td></tr>);})}</tbody></table>{prods.filter(function(p){return !p.costo||p.costo===0;}).length>0&&(<div style={{background:"#fff3cd",borderRadius:8,padding:"10px 14px",marginTop:12,fontSize:12,color:"#856404"}}>Algunos productos no tienen precio de costo. Completalos en Inventario.</div>)}</div>)}
    </div>
  );
}

function ViewProspeccion(props) {
  var clients=props.clients, setClients=props.setClients;
  var [zona,setZona]=useState(""), [buscando,setBuscando]=useState(false), [resultados,setResultados]=useState([]);
  var [error,setError]=useState(""), [selPre,setSelPre]=useState(null);
  var [formPre,setFormPre]=useState({name:"",owner:"",phone:"",address:"",email:"",user:"",pass:""});
  var [msgOk,setMsgOk]=useState(""), [prospectos,setProspectos]=useState([]);
  var [radioKm,setRadioKm]=useState(2), [mapCenter,setMapCenter]=useState(null);
  var mapInstRef=useRef(null), circleRef=useRef(null), markersRef=useRef([]);
  function cargarLeaflet(cb){if(window.L){cb();return;}var css=document.createElement("link");css.rel="stylesheet";css.href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";document.head.appendChild(css);var scr=document.createElement("script");scr.src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";scr.onload=cb;document.head.appendChild(scr);}
  function dibujarCirculo(map,lat,lon,km){var L=window.L;if(!L||!map)return;if(circleRef.current){circleRef.current.remove();}var c=L.circle([lat,lon],{radius:km*1000,color:P0,fillColor:P0,fillOpacity:0.12,weight:2}).addTo(map);circleRef.current=c;map.setView([lat,lon],km<=1?15:km<=3?14:km<=5?13:12);}
  function iniciarMapa(lat,lon,km){cargarLeaflet(function(){var L=window.L;var contenedor=document.getElementById("mapa-prospeccion");if(!contenedor)return;if(mapInstRef.current){mapInstRef.current.remove();mapInstRef.current=null;}var map=L.map("mapa-prospeccion").setView([lat,lon],14);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"OpenStreetMap"}).addTo(map);mapInstRef.current=map;dibujarCirculo(map,lat,lon,km);});}
  function actualizarRadio(km){setRadioKm(km);if(mapInstRef.current&&mapCenter){dibujarCirculo(mapInstRef.current,mapCenter.lat,mapCenter.lon,km);}}
  function agregarMarcadores(res){if(!window.L||!mapInstRef.current)return;var L=window.L;markersRef.current.forEach(function(m){m.remove();});markersRef.current=[];res.forEach(function(r){if(!r.lat||!r.lon)return;var m=L.marker([parseFloat(r.lat),parseFloat(r.lon)]).bindPopup("<b>"+r.nombre+"</b><br/>"+r.direccion).addTo(mapInstRef.current);markersRef.current.push(m);});}
  function distanciaKm(lat1,lon1,lat2,lon2){var R=6371;var dLat=(lat2-lat1)*Math.PI/180;var dLon=(lon2-lon1)*Math.PI/180;var a=Math.sin(dLat/2)*Math.sin(dLat/2)+Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)*Math.sin(dLon/2);return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));}
  function buscarZona(){if(!zona.trim())return;setBuscando(true);setError("");setResultados([]);var km=radioKm;var geoUrl="https://nominatim.openstreetmap.org/search?format=json&limit=1&q="+encodeURIComponent(zona);fetch(geoUrl,{headers:{"Accept-Language":"es"}}).then(function(r){return r.json();}).then(function(geo){if(!geo||!geo[0]){setBuscando(false);setError("No se encontró la zona.");return Promise.reject("no geo");}var lat=parseFloat(geo[0].lat);var lon=parseFloat(geo[0].lon);setMapCenter({lat:lat,lon:lon});setTimeout(function(){iniciarMapa(lat,lon,km);},200);var radM=km*1000;var q="[out:json][timeout:30];(node[\"shop\"](around:"+radM+","+lat+","+lon+");node[\"amenity\"=\"marketplace\"](around:"+radM+","+lat+","+lon+");way[\"shop\"](around:"+radM+","+lat+","+lon+"););out center;";var url="https://overpass-api.de/api/interpreter?data="+encodeURIComponent(q);return fetch(url).then(function(r2){return r2.json();}).then(function(data){return {data:data,lat:lat,lon:lon};});}).then(function(obj){if(!obj)return;setBuscando(false);var elements=(obj.data&&obj.data.elements)?obj.data.elements:[];var centerLat=obj.lat;var centerLon=obj.lon;if(!elements.length){setError("No se encontraron comercios en "+km+" km.");return;}var res=[];elements.forEach(function(e){var tags=e.tags||{};var elat=e.lat||(e.center?e.center.lat:null);var elon=e.lon||(e.center?e.center.lon:null);if(!elat||!elon)return;var nombre=tags.name||("Local ("+( tags.shop||tags.amenity||"comercio")+")");var calle=tags["addr:street"]||"";var numero=tags["addr:housenumber"]||"";var dir=calle?(calle+(numero?" "+numero:"")):"Sin dirección";var dist=distanciaKm(centerLat,centerLon,elat,elon);if(dist>km)return;res.push({osm_id:e.id,nombre:nombre,direccion:dir,tipo:tags.shop||tags.amenity||"local",lat:String(elat),lon:String(elon),display:nombre+", "+dir+", "+zona,distKm:dist,phone:tags.phone||tags["contact:phone"]||""});});if(!res.length){setError("No se encontraron comercios.");return;}res.sort(function(a,b){return a.distKm-b.distKm;});setResultados(res);setTimeout(function(){agregarMarcadores(res);},600);}).catch(function(e){if(e==="no geo")return;setBuscando(false);setError("Error al buscar. Verificá tu conexión.");});}
  function prepararAlta(r){setSelPre(r);setFormPre({name:r.nombre,owner:"",phone:"",address:r.direccion,email:"",user:r.nombre.toLowerCase().replace(/\s+/g,"").slice(0,12),pass:"pass123"});setMsgOk("");}
  function guardarProspecto(){if(!formPre.name)return;var yaExiste=prospectos.some(function(p){return p.osm_id===selPre.osm_id;});if(yaExiste){setMsgOk("Este prospecto ya está en la lista.");return;}var np=Object.assign({},formPre,{osm_id:selPre.osm_id,lat:selPre.lat,lon:selPre.lon,estado:"prospecto",fecha:new Date().toISOString().slice(0,10)});setProspectos(function(ps){return ps.concat([np]);});setSelPre(null);setMsgOk("Prospecto guardado: "+formPre.name);}
  function convertirCliente(p){var yaCliente=clients.some(function(c){return c.name.toLowerCase()===p.name.toLowerCase();});if(yaCliente){setMsgOk(p.name+" ya es cliente.");return;}var nc={id:Date.now(),name:p.name,owner:p.owner||"",phone:p.phone||"",address:p.address||"",email:p.email||"",active:true,user:p.user||p.name.toLowerCase().replace(/\s+/g,"").slice(0,12),pass:p.pass||"pass123"};setClients(function(cs){return cs.concat([nc]);});setProspectos(function(ps){return ps.map(function(x){return x.osm_id===p.osm_id?Object.assign({},x,{estado:"convertido"}):x;});});setMsgOk(p.name+" convertido a cliente!");}
  var convertidos=prospectos.filter(function(p){return p.estado==="convertido";}).length;
  var pendientes=prospectos.filter(function(p){return p.estado==="prospecto";}).length;
  return (
    <div>
      <div style={{fontSize:22,fontWeight:800,marginBottom:6}}>Prospección de clientes</div>
      <div style={{fontSize:13,color:"#888",marginBottom:18}}>Buscá kioscos y almacenes en una zona.</div>
      <div style={CARD}>
        <div style={{fontWeight:700,fontSize:14,marginBottom:10}}>Buscar zona</div>
        <div style={{display:"flex",gap:8,marginBottom:12}}><input style={Object.assign({},INP,{flex:1,fontSize:14})} placeholder="Ej: Flores Buenos Aires..." value={zona} onChange={function(e){setZona(e.target.value);}} onKeyDown={function(e){if(e.key==="Enter")buscarZona();}}/><Btn label={buscando?"Buscando...":"Buscar"} bg={S0} tc="#f0ede8" onClick={buscarZona}/></div>
        <div style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}><span style={{fontSize:12,fontWeight:700,color:"#555"}}>Radio:</span>{[1,2,3,5,10].map(function(km){return (<button key={km} onClick={function(){actualizarRadio(km);}} style={{padding:"5px 12px",borderRadius:20,border:"1.5px solid",borderColor:radioKm===km?P0:"#ddd",background:radioKm===km?P0:"#fff",color:radioKm===km?S0:"#666",fontSize:12,fontWeight:700,cursor:"pointer"}}>{km} km</button>);})}</div>
      </div>
      {msgOk&&(<div style={{background:"#d4edda",color:"#155724",borderRadius:10,padding:"11px 16px",marginBottom:14,fontWeight:700,fontSize:13}}>{msgOk}</div>)}
      {error&&(<div style={{background:"#f8d7da",color:"#721c24",borderRadius:10,padding:"11px 16px",marginBottom:14,fontSize:13}}>{error}</div>)}
      {mapCenter&&(<div style={Object.assign({},CARD,{padding:0,overflow:"hidden",marginBottom:14})}><div id="mapa-prospeccion" style={{height:380,width:"100%"}}></div></div>)}
      {resultados.length>0&&(<div style={CARD}><div style={{fontWeight:700,fontSize:14,marginBottom:12}}>Dentro de {radioKm} km: {resultados.length} locales</div><div style={{display:"flex",flexDirection:"column",gap:8}}>{resultados.map(function(r,i){var yaProspecto=prospectos.some(function(p){return p.osm_id===r.osm_id;});var yaCliente=clients.some(function(c){return c.name.toLowerCase()===r.nombre.toLowerCase();});return (<div key={i} style={{border:"1px solid #f0ede8",borderRadius:10,padding:"12px 14px",background:yaCliente?"#f0fff4":yaProspecto?"#fffbf0":"#fff"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}><div style={{flex:1}}><div style={{fontWeight:700,fontSize:14}}>{r.nombre}</div><div style={{fontSize:12,color:"#888",marginTop:2}}>{r.direccion}</div><div style={{display:"flex",gap:8,marginTop:4}}><span style={{fontSize:11,color:"#aaa"}}>Tipo: {r.tipo}</span>{r.distKm>0&&(<span style={{fontSize:11,fontWeight:700,color:r.distKm<=1?"#155724":r.distKm<=3?"#856404":"#666",background:r.distKm<=1?"#d4edda":r.distKm<=3?"#fff3cd":"#f0ede8",borderRadius:20,padding:"1px 8px"}}>{r.distKm.toFixed(1)} km</span>)}</div></div><div style={{display:"flex",gap:6,flexShrink:0,marginLeft:12}}><button onClick={function(){window.open("https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(r.display),"_blank");}} style={{background:"#f0ede8",border:"none",borderRadius:7,padding:"5px 10px",fontSize:11,cursor:"pointer",fontWeight:600}}>Maps</button>{yaCliente?(<span style={{background:"#d4edda",color:"#155724",borderRadius:7,padding:"5px 10px",fontSize:11,fontWeight:700}}>Ya es cliente</span>):yaProspecto?(<span style={{background:"#fff3cd",color:"#856404",borderRadius:7,padding:"5px 10px",fontSize:11,fontWeight:700}}>Guardado</span>):(<button onClick={function(){prepararAlta(r);}} style={{background:S0,color:"#f0ede8",border:"none",borderRadius:7,padding:"5px 10px",fontSize:11,cursor:"pointer",fontWeight:700}}>+ Agregar</button>)}</div></div></div>);})}</div></div>)}
      {selPre&&(<Modal title={"Agregar: "+selPre.nombre} onClose={function(){setSelPre(null);}} w={520}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:4}}>{[{l:"Nombre",k:"name",col:"1/-1"},{l:"Dueño/a",k:"owner"},{l:"Teléfono",k:"phone"},{l:"Email",k:"email"},{l:"Dirección",k:"address",col:"1/-1"}].map(function(f){return (<div key={f.k} style={{gridColumn:f.col||"auto"}}><label style={LBL}>{f.l}</label><input style={INP} value={formPre[f.k]||""} onChange={function(e){var k=f.k;setFormPre(function(x){return Object.assign({},x,{[k]:e.target.value});})}}/></div>);})}</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}><div><label style={LBL}>Usuario</label><input style={INP} value={formPre.user||""} onChange={function(e){setFormPre(function(x){return Object.assign({},x,{user:e.target.value});})}}/></div><div><label style={LBL}>Contraseña</label><input style={INP} value={formPre.pass||""} onChange={function(e){setFormPre(function(x){return Object.assign({},x,{pass:e.target.value});})}}/></div></div><div style={{display:"flex",gap:10,justifyContent:"flex-end"}}><Btn label="Cancelar" bg="#eee" tc="#333" onClick={function(){setSelPre(null);}}/><Btn label="Guardar prospecto" bg={S0} tc="#f0ede8" onClick={guardarProspecto}/></div></Modal>)}
      {prospectos.length>0&&(<div style={CARD}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontWeight:700,fontSize:14}}>Mis prospectos</div><div style={{display:"flex",gap:10,fontSize:12}}><span style={{background:"#fff3cd",color:"#856404",borderRadius:20,padding:"3px 10px",fontWeight:700}}>{pendientes} pendientes</span><span style={{background:"#d4edda",color:"#155724",borderRadius:20,padding:"3px 10px",fontWeight:700}}>{convertidos} convertidos</span></div></div><div style={{display:"flex",flexDirection:"column",gap:8}}>{prospectos.map(function(p,i){return (<div key={i} style={{border:"1px solid #f0ede8",borderRadius:10,padding:"12px 14px",background:p.estado==="convertido"?"#f0fff4":"#fff",display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{fontWeight:700,fontSize:13}}>{p.name}</div><div style={{fontSize:12,color:"#888",marginTop:2}}>{p.address}{p.phone?" | "+p.phone:""}</div></div><div style={{display:"flex",gap:6,alignItems:"center"}}>{p.estado==="convertido"?(<span style={{background:"#d4edda",color:"#155724",borderRadius:20,padding:"4px 12px",fontSize:12,fontWeight:700}}>Cliente</span>):(<Btn label="Convertir a cliente" bg={P0} tc={S0} onClick={function(){convertirCliente(p);}} style={{fontSize:12,padding:"6px 12px"}}/>)}</div></div>);})}</div></div>)}
    </div>
  );
}

function ViewConfig(props) {
  var brandIn=props.brand||{}, setBrandOut=props.setBrand||function(){};
  var [nombre,setNombre]=useState(brandIn.nombre||"DistribuApp");
  var [eslogan,setEslogan]=useState(brandIn.eslogan||"Panel Admin");
  var [telefono,setTelefono]=useState(brandIn.telefono||"");
  var [email,setEmail]=useState(brandIn.email||"");
  var [logo,setLogo]=useState(brandIn.logo||"");
  var [primario,setPrimario]=useState(brandIn.primario||"#F5A623");
  var [secundario,setSecundario]=useState(brandIn.secundario||"#1A1A1A");
  var [guardado,setGuardado]=useState(false);
  var mob=useIsMobile();
  var adminIn=props.admin, setAdminOut=props.setAdmin||function(){};
  var [aUser,setAUser]=useState((adminIn&&adminIn.user)||"");
  var [curPass,setCurPass]=useState(""), [newPass,setNewPass]=useState(""), [newPass2,setNewPass2]=useState("");
  var [accMsg,setAccMsg]=useState(null), [bkMsg,setBkMsg]=useState("");
  function cambiarAcceso(){
    if(!adminIn||curPass!==adminIn.pass){setAccMsg({ok:false,t:"La clave actual no es correcta."});return;}
    var nu=(aUser||"").trim();
    if(nu.length<3){setAccMsg({ok:false,t:"El usuario debe tener al menos 3 caracteres."});return;}
    if(newPass){
      if(newPass.length<6){setAccMsg({ok:false,t:"La clave nueva debe tener al menos 6 caracteres."});return;}
      if(newPass!==newPass2){setAccMsg({ok:false,t:"Las dos claves nuevas no coinciden."});return;}
    }
    setAdminOut({user:nu,pass:newPass||adminIn.pass});
    setCurPass("");setNewPass("");setNewPass2("");
    setAccMsg({ok:true,t:"Acceso actualizado. Usá estos datos la próxima vez que ingreses."});
  }
  function descargarBackup(){
    try{
      var data={};
      Object.keys(window.localStorage).forEach(function(k){if(k.indexOf("dapp_")===0)data[k]=window.localStorage.getItem(k);});
      var blob=new Blob([JSON.stringify({app:"DistribuApp",version:1,fecha:hoy(),data:data})],{type:"application/json"});
      var url=URL.createObjectURL(blob);
      var a=document.createElement("a");a.href=url;a.download="distribuapp-copia-"+hoy()+".json";
      document.body.appendChild(a);a.click();document.body.removeChild(a);
      setTimeout(function(){URL.revokeObjectURL(url);},1500);
      setBkMsg("Copia descargada. Guardala en un lugar seguro (Drive, mail, etc.).");
    }catch(err){setBkMsg("No se pudo generar la copia en este navegador.");}
  }
  function restaurarBackup(e){
    var file=e.target.files[0];e.target.value="";
    if(!file)return;
    var reader=new FileReader();
    reader.onload=function(ev){
      var obj=null;
      try{obj=JSON.parse(ev.target.result);}catch(err){}
      if(!obj||obj.app!=="DistribuApp"||!obj.data||typeof obj.data!=="object"){setBkMsg("El archivo no es una copia válida de DistribuApp.");return;}
      if(!window.confirm("Esto reemplaza TODOS los datos de este dispositivo por los de la copia. ¿Continuar?"))return;
      try{
        Object.keys(window.localStorage).filter(function(k){return k.indexOf("dapp_")===0;}).forEach(function(k){window.localStorage.removeItem(k);});
        Object.keys(obj.data).forEach(function(k){if(k.indexOf("dapp_")===0&&typeof obj.data[k]==="string")window.localStorage.setItem(k,obj.data[k]);});
        window.location.reload();
      }catch(err){setBkMsg("No se pudo restaurar la copia.");}
    };
    reader.readAsText(file);
  }
  function onLogo(e){var file=e.target.files[0];if(!file)return;resizeImage(file,300,function(url){setLogo(url);},true);e.target.value="";}
  function guardar(){setBrandOut({nombre:nombre,eslogan:eslogan,telefono:telefono,email:email,logo:logo,primario:primario,secundario:secundario});setGuardado(true);setTimeout(function(){setGuardado(false);},2500);}
  return (
    <div>
      <div style={{fontSize:22,fontWeight:800,marginBottom:18}}>Configuración</div>
      <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"1fr 260px",gap:16,alignItems:"start"}}>
        <div>
          <div style={CARD}>
            <div style={{fontWeight:700,fontSize:14,marginBottom:14}}>Datos del negocio</div>
            <div style={{marginBottom:12}}><label style={LBL}>Nombre *</label><input style={INP} value={nombre} onChange={function(e){setNombre(e.target.value);}} placeholder="Ej: Distribuidora El Sol"/></div>
            <div style={{marginBottom:12}}><label style={LBL}>Eslogan</label><input style={INP} value={eslogan} onChange={function(e){setEslogan(e.target.value);}}/></div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}><div><label style={LBL}>Teléfono</label><input style={INP} value={telefono} onChange={function(e){setTelefono(e.target.value);}}/></div><div><label style={LBL}>Email</label><input style={INP} value={email} onChange={function(e){setEmail(e.target.value);}}/></div></div>
          </div>
          <div style={CARD}>
            <div style={{fontWeight:700,fontSize:14,marginBottom:14}}>Logo</div>
            <div style={{display:"flex",alignItems:"center",gap:14}}>
              <div style={{width:80,height:80,borderRadius:10,border:"2px dashed #e0ddd8",display:"flex",alignItems:"center",justifyContent:"center",background:"#fafaf8",overflow:"hidden",flexShrink:0}}>{logo?(<img src={logo} alt="" style={{width:"100%",height:"100%",objectFit:"contain"}}/>):(<div style={{fontSize:11,color:"#aaa",textAlign:"center"}}>Sin logo</div>)}</div>
              <div style={{display:"flex",flexDirection:"column",gap:8}}><label style={{background:S0,color:"#f0ede8",borderRadius:8,padding:"8px 14px",fontSize:12,fontWeight:700,cursor:"pointer"}}>Subir imagen<input type="file" accept="image/*" style={{display:"none"}} onChange={onLogo}/></label>{logo&&(<button onClick={function(){setLogo("");}} style={{background:"#eee",color:"#666",border:"none",borderRadius:8,padding:"6px 12px",fontSize:11,cursor:"pointer"}}>Quitar logo</button>)}</div>
            </div>
          </div>
          <div style={CARD}>
            <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>Colores</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:14}}>
              {BRAND_PRESETS.map(function(pr){var activo=primario===pr.p&&secundario===pr.s;return (<button key={pr.l} onClick={function(){setPrimario(pr.p);setSecundario(pr.s);}} style={{border:activo?"2px solid "+pr.p:"2px solid #e0ddd8",borderRadius:10,padding:"9px 6px",cursor:"pointer",background:activo?"#fffbf0":"#fff"}}><div style={{display:"flex",gap:4,justifyContent:"center",marginBottom:4}}><div style={{width:20,height:20,borderRadius:4,background:pr.p}}/><div style={{width:20,height:20,borderRadius:4,background:pr.s}}/></div><div style={{fontSize:10,color:"#888",fontWeight:600}}>{pr.l}</div></button>);})}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <div><label style={LBL}>Color primario</label><div style={{display:"flex",gap:8,alignItems:"center"}}><input type="color" value={primario} onChange={function(e){setPrimario(e.target.value);}} style={{width:40,height:40,border:"none",borderRadius:7,cursor:"pointer",padding:2}}/><input style={INP} value={primario} onChange={function(e){setPrimario(e.target.value);}}/></div></div>
              <div><label style={LBL}>Color secundario</label><div style={{display:"flex",gap:8,alignItems:"center"}}><input type="color" value={secundario} onChange={function(e){setSecundario(e.target.value);}} style={{width:40,height:40,border:"none",borderRadius:7,cursor:"pointer",padding:2}}/><input style={INP} value={secundario} onChange={function(e){setSecundario(e.target.value);}}/></div></div>
            </div>
          </div>
          {guardado&&(<div style={{background:"#d4edda",color:"#155724",borderRadius:10,padding:"12px 16px",fontWeight:700,fontSize:13,marginBottom:14}}>Configuración guardada correctamente.</div>)}
          <Btn label="Guardar configuración" bg={primario} tc={secundario} onClick={guardar} style={{fontSize:14,padding:"11px 24px"}}/>
          <div style={Object.assign({},CARD,{marginTop:18})}>
            <div style={{fontWeight:700,fontSize:14,marginBottom:14}}>Acceso de administrador</div>
            <div style={{marginBottom:12}}><label style={LBL}>Usuario</label><input style={INP} value={aUser} onChange={function(e){setAUser(e.target.value);setAccMsg(null);}} autoCapitalize="none"/></div>
            <div style={{marginBottom:12}}><label style={LBL}>Clave actual *</label><input style={INP} type="password" value={curPass} onChange={function(e){setCurPass(e.target.value);setAccMsg(null);}}/></div>
            <div style={{marginBottom:12}}><label style={LBL}>Clave nueva (vacío = no cambiarla)</label><input style={INP} type="password" value={newPass} onChange={function(e){setNewPass(e.target.value);setAccMsg(null);}}/></div>
            <div style={{marginBottom:12}}><label style={LBL}>Repetir clave nueva</label><input style={INP} type="password" value={newPass2} onChange={function(e){setNewPass2(e.target.value);setAccMsg(null);}}/></div>
            {accMsg&&(<div style={{background:accMsg.ok?"#d4edda":"#f8d7da",color:accMsg.ok?"#155724":"#721c24",borderRadius:8,padding:"9px 12px",fontSize:12,fontWeight:700,marginBottom:12}}>{accMsg.t}</div>)}
            <Btn label="Guardar acceso" bg={S0} tc="#f0ede8" onClick={cambiarAcceso}/>
          </div>
          <div style={CARD}>
            <div style={{fontWeight:700,fontSize:14,marginBottom:6}}>Copia de seguridad</div>
            <div style={{fontSize:12,color:"#888",lineHeight:1.5,marginBottom:12}}>Tus datos viven solo en este dispositivo. Descargá una copia seguido: sirve para pasar todo a otro celular o recuperar los datos si se borran.</div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              <Btn label="Descargar copia" bg={P0} tc={S0} onClick={descargarBackup}/>
              <label style={{background:"#eee",color:"#333",borderRadius:8,padding:"9px 16px",fontSize:13,fontWeight:700,cursor:"pointer"}}>Restaurar copia<input type="file" accept=".json,application/json" style={{display:"none"}} onChange={restaurarBackup}/></label>
            </div>
            {bkMsg&&(<div style={{background:"#f0ede8",color:"#555",borderRadius:8,padding:"9px 12px",fontSize:12,fontWeight:700,marginTop:12}}>{bkMsg}</div>)}
          </div>
        </div>
        <div style={{position:"sticky",top:24}}>
          <div style={{fontSize:11,fontWeight:700,color:"#888",textTransform:"uppercase",marginBottom:8}}>Vista previa</div>
          <div style={{background:secundario,borderRadius:12,padding:14,marginBottom:12}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12,paddingBottom:10,borderBottom:"1px solid rgba(255,255,255,.1)"}}>{logo?(<img src={logo} alt="" style={{width:28,height:28,objectFit:"contain",borderRadius:6,background:"rgba(255,255,255,.15)",padding:2,flexShrink:0}}/>):(<span style={{fontSize:18,flexShrink:0}}>📦</span>)}<div><div style={{fontWeight:800,fontSize:12,color:"#f0ede8"}}>{nombre||"Mi Distribuidora"}</div><div style={{fontSize:9,color:"#888"}}>{eslogan}</div></div></div>
            {["Dashboard","Inventario","Pedidos","Cuenta cte."].map(function(item,i){return (<div key={item} style={{padding:"7px 9px",borderRadius:6,marginBottom:2,background:i===0?primario:"transparent",color:i===0?secundario:"#666",fontSize:11,fontWeight:i===0?700:400}}>{item}</div>);})}
          </div>
          <div style={{display:"flex",gap:6}}><div style={{flex:1,height:34,borderRadius:7,background:primario,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:secundario}}>Botón</div><div style={{flex:1,height:34,borderRadius:7,background:secundario,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:"#f0ede8"}}>Sidebar</div></div>
        </div>
      </div>
    </div>
  );
}

// ─── PANEL ADMIN ──────────────────────────────────────────────────────────────
function Panel(props) {
  var sharedState = props.sharedState;
  var prods=sharedState.prods, setProds=sharedState.setProds;
  var clients=sharedState.clients, setClients=sharedState.setClients;
  var orders=sharedState.orders, setOrders=sharedState.setOrders;
  var msgs=sharedState.msgs, setMsgs=sharedState.setMsgs;
  var offers=sharedState.offers, setOffers=sharedState.setOffers;
  var brand=sharedState.brand, setBrand=sharedState.setBrand;
  var admin=sharedState.admin, setAdmin=sharedState.setAdmin;
  var [tab,setTab]=useState("dashboard"), [selOrd,setSelOrd]=useState(null);
  var [drawerOpen,setDrawerOpen]=useState(false);
  var mob=useIsMobile();
  var pendN=orders.filter(function(o){return o.status==="pendiente";}).length;
  var lowN=prods.filter(function(p){return p.stock<=p.min;}).length;
  var deudaG=orders.filter(function(o){return o.status!=="cancelado";}).reduce(function(a,o){return a+getSaldo(o);},0);
  var unreadTotal=0;
  clients.forEach(function(c){var cMsgs=msgs.filter(function(m){return m.cId===c.id;});var lastAdminIdx=cMsgs.map(function(m){return m.from;}).lastIndexOf("admin");unreadTotal+=cMsgs.slice(lastAdminIdx+1).filter(function(m){return m.from==="client";}).length;});

  function navTo(id){ setTab(id); setDrawerOpen(false); }

  var navList = NAV_ADMIN.map(function(item){
    var badge=null;
    if(item.id==="orders"&&pendN>0)badge=pendN;
    if(item.id==="stock"&&lowN>0)badge=lowN;
    if(item.id==="messages"&&unreadTotal>0)badge=unreadTotal;
    return (
      <button key={item.id} onClick={function(){navTo(item.id);}}
        style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"9px 10px",borderRadius:8,cursor:"pointer",marginBottom:2,
          background:tab===item.id?brand.primario:"transparent",
          color:tab===item.id?brand.secundario:"#aaa",
          fontWeight:tab===item.id?700:400,fontSize:13,border:"none",width:"100%",textAlign:"left"}}>
        <span style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:15}}>{item.icon}</span>{item.l}</span>
        {badge&&(<span style={{background:tab===item.id?"rgba(255,255,255,.3)":brand.primario,color:tab===item.id?brand.secundario:"#fff",borderRadius:10,fontSize:10,fontWeight:800,padding:"1px 6px"}}>{badge}</span>)}
        {item.id==="cuentacte"&&deudaG>0&&!badge&&(<span style={{background:"#5B21B6",color:"#fff",borderRadius:10,fontSize:10,fontWeight:800,padding:"1px 6px"}}>$</span>)}
      </button>
    );
  });

  var CONTENT = (
    <div>
      {tab==="dashboard"&&(<ViewDashboard orders={orders} prods={prods} clients={clients} setTab={setTab} setSelOrd={setSelOrd}/>)}
      {tab==="scanner"&&(<ViewScanner prods={prods} setProds={setProds}/>)}
      {tab==="stock"&&(<ViewStock prods={prods} setProds={setProds} orders={orders}/>)}
      {tab==="orders"&&(<ViewOrders orders={orders} setOrders={setOrders} clients={clients} prods={prods} selOrd={selOrd} setSelOrd={setSelOrd} brand={brand}/>)}
      {tab==="cuentacte"&&(<ViewCuentaCte orders={orders} setOrders={setOrders} clients={clients}/>)}
      {tab==="clients"&&(<ViewClients clients={clients} setClients={setClients} orders={orders}/>)}
      {tab==="messages"&&(<ViewMessages clients={clients} msgs={msgs} setMsgs={setMsgs}/>)}
      {tab==="precios"&&(<ViewPrecios prods={prods} setProds={setProds}/>)}
      {tab==="ajuste"&&(<ViewAjuste prods={prods} setProds={setProds}/>)}
      {tab==="ofertas"&&(<ViewOfertas prods={prods} offers={offers} setOffers={setOffers}/>)}
      {tab==="reportes"&&(<ViewReportes orders={orders} clients={clients}/>)}
      {tab==="rentabilidad"&&(<ViewRentabilidad orders={orders} clients={clients} prods={prods}/>)}
      {tab==="prospeccion"&&(<ViewProspeccion clients={clients} setClients={setClients}/>)}
      {tab==="config"&&(<ViewConfig brand={brand} setBrand={setBrand} admin={admin} setAdmin={setAdmin}/>)}
    </div>
  );

  if (mob) {
    var curLabel = (NAV_ADMIN.find(function(n){return n.id===tab;})||{}).l||"";
    return (
      <div style={{fontFamily:"Arial,sans-serif",minHeight:"100vh",background:"#f0ede8"}}>
        {/* TopBar mobile */}
        <div style={{background:brand.secundario,height:52,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 14px",position:"sticky",top:0,zIndex:100,boxShadow:"0 2px 8px rgba(0,0,0,.2)"}}>
          <button onClick={function(){setDrawerOpen(true);}}
            style={{background:"none",border:"none",cursor:"pointer",padding:"6px 4px",display:"flex",flexDirection:"column",gap:5,flexShrink:0}}>
            <div style={{width:22,height:2,background:"#f0ede8",borderRadius:2}}/>
            <div style={{width:22,height:2,background:"#f0ede8",borderRadius:2}}/>
            <div style={{width:22,height:2,background:"#f0ede8",borderRadius:2}}/>
          </button>
          <div style={{display:"flex",alignItems:"center",gap:8,position:"absolute",left:"50%",transform:"translateX(-50%)"}}>
            {brand.logo?(<img src={brand.logo} alt="" style={{height:26,objectFit:"contain"}}/>):(<span style={{fontSize:18}}>📦</span>)}
            <span style={{color:"#f0ede8",fontWeight:800,fontSize:14}}>{brand.nombre}</span>
          </div>
          <div style={{display:"flex",gap:6,alignItems:"center"}}>
            {(pendN>0||lowN>0)&&(<span style={{background:brand.primario,color:brand.secundario,borderRadius:10,fontSize:10,fontWeight:800,padding:"2px 7px"}}>{pendN+lowN}</span>)}
            <button onClick={props.onLogout} style={{background:"#333",color:"#aaa",border:"none",borderRadius:7,padding:"5px 9px",fontSize:11,cursor:"pointer"}}>Salir</button>
          </div>
        </div>
        {/* Section label */}
        <div style={{padding:"8px 14px 0",fontSize:11,color:"#999",fontWeight:700,textTransform:"uppercase",letterSpacing:.8}}>{curLabel}</div>
        {/* Drawer */}
        {drawerOpen&&(
          <div style={{position:"fixed",inset:0,zIndex:200,display:"flex"}}>
            <div style={{flex:1,background:"rgba(0,0,0,.5)"}} onClick={function(){setDrawerOpen(false);}}/>
            <div style={{width:240,background:brand.secundario,display:"flex",flexDirection:"column",height:"100%",overflowY:"auto",animation:"slideIn .2s ease"}}>
              <div style={{padding:"16px 13px 12px",borderBottom:"1px solid rgba(255,255,255,.1)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  {brand.logo?(<img src={brand.logo} alt="" style={{width:26,height:26,objectFit:"contain"}}/>):(<span style={{fontSize:18}}>📦</span>)}
                  <div style={{fontWeight:800,fontSize:13,color:"#f0ede8"}}>{brand.nombre}</div>
                </div>
                <button onClick={function(){setDrawerOpen(false);}} style={{background:"none",border:"none",color:"#888",fontSize:22,cursor:"pointer"}}>✕</button>
              </div>
              <nav style={{padding:"8px 8px",flex:1}}>{navList}</nav>
              <button onClick={function(){setDrawerOpen(false);props.onLogout();}} style={{margin:"0 10px 14px",background:"#333",color:"#666",border:"none",borderRadius:8,padding:"9px 0",fontSize:12,fontWeight:600,cursor:"pointer"}}>Cerrar sesión</button>
            </div>
          </div>
        )}
        <div style={{padding:"12px 14px 28px"}}>{CONTENT}</div>
      </div>
    );
  }

  // ── Desktop (sin cambios) ──────────────────────────────────────────────────
  return (
    <div style={{fontFamily:"Arial,sans-serif",display:"flex",minHeight:"100vh",background:"#f0ede8"}}>
      <div style={{width:190,background:brand.secundario,display:"flex",flexDirection:"column",position:"fixed",top:0,left:0,bottom:0}}>
        <div style={{padding:"16px 13px 11px",borderBottom:"1px solid rgba(255,255,255,.1)"}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>{brand.logo?(<img src={brand.logo} alt="" style={{width:28,height:28,objectFit:"contain",borderRadius:6,background:"rgba(255,255,255,.15)",padding:2,flexShrink:0}}/>):(<span style={{fontSize:16}}>📦</span>)}<div><div style={{fontWeight:800,fontSize:12,color:"#f0ede8"}}>{brand.nombre}</div><div style={{fontSize:9,color:"#888",marginTop:1}}>{brand.eslogan}</div></div></div>
        </div>
        <nav style={{padding:"8px 7px",flex:1,overflowY:"auto"}}>{navList}</nav>
        <button onClick={props.onLogout} style={{margin:"0 8px 12px",background:"#333",color:"#666",border:"none",borderRadius:8,padding:"7px 0",fontSize:11,fontWeight:600,cursor:"pointer"}}>Cerrar sesión</button>
      </div>
      <div style={{marginLeft:190,padding:"24px 28px",flex:1}}>{CONTENT}</div>
    </div>
  );
}

// ─── PORTAL CLIENTE ───────────────────────────────────────────────────────────
function PortalCliente(props) {
  var cliente=props.cliente, sharedState=props.sharedState, onLogout=props.onLogout;
  var orders=sharedState.orders, setOrders=sharedState.setOrders;
  var msgs=sharedState.msgs, setMsgs=sharedState.setMsgs;
  var prods=sharedState.prods, offers=sharedState.offers;
  var brand=sharedState.brand;
  var [tab,setTab]=useState("catalogo"), [carrito,setCarrito]=useState([]);
  var [pedidoOk,setPedidoOk]=useState(false), [msgTxt,setMsgTxt]=useState(""), [catF,setCatF]=useState("Todos");
  var today=hoy();
  var misOrders=orders.filter(function(o){return o.cId===cliente.id;}).sort(function(a,b){return new Date(b.date)-new Date(a.date);});
  var misMsgs=msgs.filter(function(m){return m.cId===cliente.id;});
  var actOff=offers.filter(function(o){return o.to>=today&&o.from<=today;});
  var cats=getCats(prods);
  var filtP=catF==="Todos"?prods:prods.filter(function(p){return p.cat===catF;});
  var totalCarrito=carrito.reduce(function(a,i){return a+i.qty*i.price;},0);
  var pedidoActivo=misOrders.find(function(o){return o.status==="pendiente"||o.status==="en camino";});
  // Mensajes no leídos (del admin, después del último mensaje del cliente)
  var lastClientIdx=misMsgs.map(function(m){return m.from;}).lastIndexOf("client");
  var unreadMsgs=misMsgs.slice(lastClientIdx+1).filter(function(m){return m.from==="admin";}).length;
  function agregarAlCarrito(prod,precioOferta){var precio=precioOferta||prod.price;var ex=carrito.find(function(i){return i.pId===prod.id;});if(ex){setCarrito(function(c){return c.map(function(i){return i.pId===prod.id?Object.assign({},i,{qty:i.qty+1}):i;});});}else{setCarrito(function(c){return c.concat([{pId:prod.id,name:prod.name,price:precio,qty:1}]);});}}
  function cambiarQty(pId,delta){setCarrito(function(c){var ni=c.map(function(i){return i.pId===pId?Object.assign({},i,{qty:i.qty+delta}):i;});return ni.filter(function(i){return i.qty>0;});});}
  function confirmarPedido(){if(!carrito.length)return;var o={id:Date.now(),cId:cliente.id,cName:cliente.name,date:today,status:"pendiente",items:carrito,total:totalCarrito,pagos:[]};setOrders(function(os){return [o].concat(os);});setCarrito([]);setPedidoOk(true);setTimeout(function(){setPedidoOk(false);},4000);setTab("pedidos");}
  function enviarMsg(){if(!msgTxt.trim())return;var m={id:msgs.length+1,cId:cliente.id,from:"client",text:msgTxt.trim(),date:new Date().toLocaleString("es-AR").slice(0,16)};setMsgs(function(ms){return ms.concat([m]);});setMsgTxt("");}
  var priColor=brand.primario||P0, secColor=brand.secundario||S0;
  var TABS=[
    {id:"catalogo",l:"Catálogo"},
    {id:"ofertas",l:"Ofertas"+(actOff.length>0?" ("+actOff.length+")":"")},
    {id:"carrito",l:"Carrito"+(carrito.length>0?" ("+carrito.length+")":"")},
    {id:"pedidos",l:"Pedidos"},
    {id:"mensajes",l:"Mensajes"+(unreadMsgs>0?" ("+unreadMsgs+")":"")},
  ];
  return (
    <div style={{fontFamily:"Arial,sans-serif",minHeight:"100vh",background:"#f7f4f0"}}>
      <div style={{background:secColor,padding:"0 20px",display:"flex",alignItems:"center",justifyContent:"space-between",height:52,position:"sticky",top:0,zIndex:50}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>{brand.logo?(<img src={brand.logo} alt="" style={{height:28,objectFit:"contain"}}/>):(<span style={{fontSize:20}}>📦</span>)}<span style={{color:"#f0ede8",fontWeight:800,fontSize:15}}>{brand.nombre}</span></div>
        <div style={{display:"flex",alignItems:"center",gap:12}}><span style={{color:"#888",fontSize:12}}>Hola, {cliente.owner||cliente.name}</span><button onClick={onLogout} style={{background:"#333",color:"#aaa",border:"none",borderRadius:7,padding:"5px 12px",fontSize:12,cursor:"pointer"}}>Salir</button></div>
      </div>
      <div style={{background:"#fff",borderBottom:"2px solid #e8e4e0",display:"flex",padding:"0 16px",overflowX:"auto"}}>
        {TABS.map(function(t){return (<button key={t.id} onClick={function(){setTab(t.id);}} style={{padding:"12px 16px",border:"none",background:"none",cursor:"pointer",fontWeight:tab===t.id?800:500,fontSize:14,color:tab===t.id?secColor:"#888",borderBottom:tab===t.id?"3px solid "+priColor:"3px solid transparent",whiteSpace:"nowrap"}}>{t.l}</button>);})}
      </div>
      <div style={{padding:16,maxWidth:860,margin:"0 auto"}}>
        {pedidoOk&&(<div style={{background:"#d4edda",color:"#155724",borderRadius:10,padding:"14px 18px",marginBottom:16,fontWeight:700,fontSize:14}}>¡Pedido enviado! Te avisamos cuando esté en camino.</div>)}
        {tab==="catalogo"&&(
          <div>
            {actOff.length>0&&(<div onClick={function(){setTab("ofertas");}} style={{background:"linear-gradient(135deg,"+secColor+",#333)",borderRadius:12,padding:"14px 18px",marginBottom:16,cursor:"pointer",display:"flex",alignItems:"center",gap:14}}><span style={{fontSize:28}}>🏷️</span><div><div style={{fontWeight:800,color:priColor,fontSize:15}}>{actOff.length} oferta{actOff.length!==1?"s":""} disponible{actOff.length!==1?"s":""}!</div><div style={{color:"#aaa",fontSize:12,marginTop:2}}>Ver promociones vigentes</div></div><span style={{marginLeft:"auto",color:"#aaa",fontSize:20}}>›</span></div>)}
            <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>{cats.map(function(c){return (<button key={c} onClick={function(){setCatF(c);}} style={{padding:"5px 12px",borderRadius:20,border:"1.5px solid",borderColor:catF===c?secColor:"#ddd",background:catF===c?secColor:"#fff",color:catF===c?"#fff":"#666",fontSize:12,fontWeight:600,cursor:"pointer"}}>{c}</button>);})}</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(170px,1fr))",gap:12}}>
              {filtP.filter(function(p){return p.stock>0;}).map(function(p){var enCarrito=carrito.find(function(i){return i.pId===p.id;});return (<div key={p.id} style={{background:"#fff",borderRadius:12,padding:14,boxShadow:"0 1px 4px rgba(0,0,0,.07)",display:"flex",flexDirection:"column",gap:8}}><div style={{fontSize:11,color:"#aaa",background:"#f7f4f0",borderRadius:6,padding:"2px 7px",alignSelf:"flex-start"}}>{p.cat}</div><div style={{fontWeight:700,fontSize:14,lineHeight:1.3}}>{p.name}</div><div style={{fontWeight:800,fontSize:18,color:secColor,marginTop:"auto"}}>${p.price.toLocaleString()}<span style={{fontSize:11,color:"#aaa",fontWeight:400}}>/{p.unit}</span></div>{enCarrito?(<div style={{display:"flex",alignItems:"center",gap:8,background:"#f0ede8",borderRadius:8,padding:"6px 10px"}}><button onClick={function(){cambiarQty(p.id,-1);}} style={{background:"none",border:"none",fontSize:18,cursor:"pointer",fontWeight:800}}>-</button><span style={{flex:1,textAlign:"center",fontWeight:800}}>{enCarrito.qty}</span><button onClick={function(){cambiarQty(p.id,1);}} style={{background:"none",border:"none",fontSize:18,cursor:"pointer",fontWeight:800}}>+</button></div>):(<button onClick={function(){agregarAlCarrito(p);}} style={{background:priColor,color:secColor,border:"none",borderRadius:8,padding:"9px 0",fontSize:13,fontWeight:700,cursor:"pointer"}}>+ Agregar</button>)}</div>);})}
            </div>
          </div>
        )}
        {tab==="ofertas"&&(
          <div>
            <div style={{fontSize:18,fontWeight:800,marginBottom:16}}>Ofertas vigentes</div>
            {actOff.length===0?(<div style={Object.assign({},CARD,{textAlign:"center",padding:44,color:"#aaa"})}>No hay ofertas activas por ahora.</div>):actOff.map(function(offer){var diasRest=Math.ceil((new Date(offer.to)-new Date(today))/86400000);return (<div key={offer.id} style={Object.assign({},CARD,{border:"2px solid "+priColor})}><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}><div><div style={{fontWeight:800,fontSize:17}}>{offer.title}</div>{offer.desc&&(<div style={{fontSize:13,color:"#666",marginTop:2}}>{offer.desc}</div>)}<div style={{fontSize:12,color:"#aaa",marginTop:4}}>Hasta el {offer.to}</div></div><span style={{background:diasRest<=3?"#f8d7da":"#d4edda",color:diasRest<=3?"#721c24":"#155724",borderRadius:20,padding:"4px 12px",fontSize:12,fontWeight:800,flexShrink:0}}>{diasRest>0?diasRest+"d":"Hoy"}</span></div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(170px,1fr))",gap:10}}>{offer.items.map(function(it){var prod=prods.find(function(p){return p.id===it.id;});var enCarrito=carrito.find(function(i){return i.pId===it.id;});return (<div key={it.id} style={{background:"#fffbf0",borderRadius:10,padding:12,border:"1px solid #f5e0aa"}}><div style={{fontWeight:700,fontSize:13,marginBottom:8}}>{it.name}</div><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10,flexWrap:"wrap"}}><span style={{textDecoration:"line-through",color:"#aaa",fontSize:12}}>${it.orig.toLocaleString()}</span><span style={{fontWeight:800,color:"#dc3545",fontSize:18}}>${it.offer.toLocaleString()}</span>{it.disc>0&&(<span style={{background:"#dc3545",color:"#fff",borderRadius:20,padding:"2px 7px",fontSize:11,fontWeight:800}}>-{it.disc}%</span>)}</div>{enCarrito?(<div style={{display:"flex",alignItems:"center",gap:8,background:"#f0ede8",borderRadius:8,padding:"6px 10px"}}><button onClick={function(){cambiarQty(it.id,-1);}} style={{background:"none",border:"none",fontSize:18,cursor:"pointer",fontWeight:800}}>-</button><span style={{flex:1,textAlign:"center",fontWeight:800}}>{enCarrito.qty}</span><button onClick={function(){cambiarQty(it.id,1);}} style={{background:"none",border:"none",fontSize:18,cursor:"pointer",fontWeight:800}}>+</button></div>):prod&&prod.stock>0?(<button onClick={function(){agregarAlCarrito(prod,it.offer);}} style={{background:priColor,color:secColor,border:"none",borderRadius:8,width:"100%",padding:"8px 0",fontSize:12,fontWeight:700,cursor:"pointer"}}>+ Agregar</button>):(<div style={{background:"#f8d7da",color:"#721c24",borderRadius:8,padding:"7px 0",fontSize:12,fontWeight:700,textAlign:"center"}}>Sin stock</div>)}</div>);})}</div></div>);})}
          </div>
        )}
        {tab==="carrito"&&(
          <div>
            <div style={{fontSize:18,fontWeight:800,marginBottom:16}}>Mi carrito</div>
            {carrito.length===0?(<div style={Object.assign({},CARD,{textAlign:"center",padding:44,color:"#aaa"})}><div style={{fontSize:36,marginBottom:10}}>🛒</div>Tu carrito está vacío.<div style={{marginTop:14}}><Btn label="Ver catálogo" bg={priColor} tc={secColor} onClick={function(){setTab("catalogo");}}/></div></div>):(
              <div style={CARD}>
                {carrito.map(function(it){return (<div key={it.pId} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 0",borderBottom:"1px solid #f0ede8"}}><div style={{flex:1}}><div style={{fontWeight:700,fontSize:14}}>{it.name}</div><div style={{fontSize:12,color:"#888"}}>${it.price.toLocaleString()} c/u</div></div><div style={{display:"flex",alignItems:"center",gap:12}}><div style={{display:"flex",alignItems:"center",gap:8,background:"#f0ede8",borderRadius:8,padding:"5px 12px"}}><button onClick={function(){cambiarQty(it.pId,-1);}} style={{background:"none",border:"none",fontSize:18,cursor:"pointer",fontWeight:800}}>-</button><span style={{fontWeight:800,minWidth:24,textAlign:"center"}}>{it.qty}</span><button onClick={function(){cambiarQty(it.pId,1);}} style={{background:"none",border:"none",fontSize:18,cursor:"pointer",fontWeight:800}}>+</button></div><div style={{fontWeight:800,minWidth:80,textAlign:"right"}}>${(it.qty*it.price).toLocaleString()}</div></div></div>);})}
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:16,paddingTop:14,borderTop:"2px solid #f0ede8"}}><div style={{fontWeight:800,fontSize:20}}>Total: <span style={{color:priColor}}>${totalCarrito.toLocaleString()}</span></div><Btn label="Confirmar pedido" bg={secColor} tc="#f0ede8" onClick={confirmarPedido} style={{fontSize:14,padding:"11px 22px"}}/></div>
              </div>
            )}
          </div>
        )}
        {tab==="pedidos"&&(
          <div>
            <div style={{fontSize:18,fontWeight:800,marginBottom:16}}>Mis pedidos</div>
            {pedidoActivo&&(<div style={Object.assign({},CARD,{border:"2px solid "+priColor,marginBottom:16})}><div style={{fontWeight:800,fontSize:15,marginBottom:10}}>Pedido activo</div><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>{["pendiente","en camino","entregado"].map(function(s,i){var idx=["pendiente","en camino","entregado"].indexOf(pedidoActivo.status);var done=i<idx;var act=i===idx;return (<div key={s} style={{display:"flex",alignItems:"center",flex:i<2?1:0}}><div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}><div style={{width:30,height:30,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:12,background:done?priColor:act?secColor:"#e0ddd8",color:done||act?"#fff":"#aaa"}}>{done?"✓":i+1}</div><div style={{fontSize:10,fontWeight:600,color:act?secColor:done?priColor:"#aaa",whiteSpace:"nowrap"}}>{ST[s]?ST[s].l:s}</div></div>{i<2&&(<div style={{flex:1,height:2,background:done?priColor:"#e0ddd8",margin:"0 6px",marginBottom:16}}/>)}</div>);})}</div><div style={{fontSize:13,color:"#888"}}>#{pedidoActivo.id} - {pedidoActivo.date} - <b>${pedidoActivo.total.toLocaleString()}</b></div></div>)}
            {misOrders.length===0?(<div style={Object.assign({},CARD,{textAlign:"center",padding:44,color:"#aaa"})}>Todavía no hiciste pedidos.</div>):misOrders.map(function(o){return (<div key={o.id} style={CARD}><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}><div><div style={{fontSize:12,color:"#aaa"}}>#{o.id} - {o.date}</div><div style={{fontWeight:700,fontSize:14,marginTop:4}}>{o.items.map(function(i){return i.name+" x"+i.qty;}).join(", ")}</div></div><div style={{textAlign:"right",flexShrink:0,marginLeft:12}}><Tag s={o.status}/><div style={{fontWeight:800,fontSize:18,marginTop:6}}>${o.total.toLocaleString()}</div></div></div></div>);})}
          </div>
        )}
        {tab==="mensajes"&&(
          <div>
            <div style={{fontSize:18,fontWeight:800,marginBottom:16}}>Mensajes con la distribuidora</div>
            <div style={CARD}>
              <div style={{minHeight:280,maxHeight:400,overflowY:"auto",marginBottom:14,display:"flex",flexDirection:"column",gap:10}}>
                {misMsgs.length===0?(<div style={{textAlign:"center",color:"#aaa",padding:40}}>Sin mensajes todavía.</div>):misMsgs.map(function(m){return (<div key={m.id} style={{display:"flex",justifyContent:m.from==="client"?"flex-end":"flex-start"}}><div><div style={{maxWidth:280,padding:"10px 14px",borderRadius:m.from==="client"?"16px 16px 4px 16px":"16px 16px 16px 4px",background:m.from==="client"?secColor:"#f0ede8",color:m.from==="client"?"#fff":secColor,fontSize:14}}>{m.text}</div><div style={{fontSize:10,color:"#aaa",marginTop:3,textAlign:m.from==="client"?"right":"left"}}>{m.date}</div></div></div>);})}
              </div>
              <div style={{display:"flex",gap:8,borderTop:"1px solid #f0ede8",paddingTop:12}}><input style={Object.assign({},INP,{flex:1})} placeholder="Escribí tu mensaje..." value={msgTxt} onChange={function(e){setMsgTxt(e.target.value);}} onKeyDown={function(e){if(e.key==="Enter")enviarMsg();}}/><Btn label="Enviar" bg={secColor} tc="#f0ede8" onClick={enviarMsg}/></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  // ESTADO COMPARTIDO — única fuente de verdad para admin y clientes
  var [prods,setProds]=usePersist("dapp_prods",[]);
  var [clients,setClients]=usePersist("dapp_clients",[]);
  var [orders,setOrders]=usePersist("dapp_orders",[]);
  var [msgs,setMsgs]=usePersist("dapp_msgs",[]);
  var [offers,setOffers]=usePersist("dapp_offers",[]);
  var [brand,setBrand]=usePersist("dapp_brand",{nombre:"DistribuApp",eslogan:"Panel Admin",telefono:"",email:"",logo:"",primario:"#F5A623",secundario:"#1A1A1A"});
  var [admin,setAdmin]=usePersist("dapp_admin",null);
  var [storageErr,setStorageErr]=useState(false);
  useEffect(function(){
    function onFull(){ setStorageErr(true); }
    window.addEventListener("dapp-storage-full", onFull);
    return function(){ window.removeEventListener("dapp-storage-full", onFull); };
  }, []);

  var sharedState = {
    prods, setProds,
    clients, setClients,
    orders, setOrders,
    msgs, setMsgs,
    offers, setOffers,
    brand, setBrand,
    admin, setAdmin,
  };

  // Sesión: null | { role: "admin" } | { role: "client", data: clientObj }
  var [session,setSession]=useState(null);

  function crearAdmin(cfg) {
    setAdmin({user:cfg.user, pass:cfg.pass});
    setBrand(function(b){ return Object.assign({}, b, {nombre:cfg.negocio}); });
    if (cfg.demo) { setProds(PRODS); setClients(CLIENTS); setOrders(ORDERS); setMsgs(MSGS); }
    setSession({role:"admin"});
  }
  function resetTodo() {
    try {
      Object.keys(window.localStorage).filter(function(k){ return k.indexOf("dapp_")===0; }).forEach(function(k){ window.localStorage.removeItem(k); });
    } catch(e) {}
    window.location.reload();
  }
  var banner = storageErr ? (
    <div onClick={function(){ setStorageErr(false); }} style={{position:"fixed",left:0,right:0,bottom:0,zIndex:999,background:"#721c24",color:"#fff",padding:"10px 14px",fontSize:12,fontWeight:700,textAlign:"center",cursor:"pointer"}}>
      ⚠ No se pudieron guardar los datos en este dispositivo (memoria llena o bloqueada). Descargá una copia en Configuración. Tocá para cerrar.
    </div>
  ) : null;

  if (!session) {
    return (
      <div>
        {banner}
        <LoginSelector
          clients={clients}
          admin={admin}
          onSetupAdmin={crearAdmin}
          onReset={resetTodo}
          onLoginAdmin={function(){ setSession({role:"admin"}); }}
          onLoginClient={function(c){ setSession({role:"client",data:c}); }}
        />
      </div>
    );
  }
  if (session.role==="admin") {
    return (<div>{banner}<Panel sharedState={sharedState} onLogout={function(){setSession(null);}}/></div>);
  }
  if (session.role==="client") {
    return (<div>{banner}<PortalCliente cliente={session.data} sharedState={sharedState} onLogout={function(){setSession(null);}}/></div>);
  }
  return null;
}
