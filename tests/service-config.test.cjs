const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");
const state = new Map();
const window = {localStorage:{
  getItem:k=>state.has(k)?state.get(k):null,
  setItem:(k,v)=>state.set(k,String(v))
}};
window.window=window;
vm.runInNewContext(fs.readFileSync(path.join(__dirname,"../src/service-config.js"),"utf8"),window);
const c=window.AnimeSamaPublicService;
assert.equal(c.read().enabled,false);
assert.equal(c.checkUrl("https://example.org:8443"),true);
for(const url of ["http://example.org","https://user:pass@example.org","https://example.org/path","https://example.org?token=x"]){
  assert.equal(c.checkUrl(url),false);
}
assert.throws(()=>c.save("http://example.org",true),/INVALID_SERVICE_URL/);
c.save("https://example.org",true);
assert.equal(c.read().enabled,true);
state.set("anime_sama_public_service_v1","{broken");
assert.equal(c.read().enabled,false);
console.log("Service config: OK");
