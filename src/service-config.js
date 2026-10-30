(function (root) {
  "use strict";
  var KEY = "anime_sama_public_service_v1";
  function checkUrl(url) {
    if (typeof url !== "string" || url.length > 240) return false;
    // Never accept embedded credentials, query strings or fragment identifiers.
    return /^https:\/\/[a-z0-9.-]+(?::[0-9]{2,5})?$/i.test(url);
  }
  function read() {
    var data = {};
    try { data = JSON.parse(root.localStorage.getItem(KEY) || "{}"); } catch (e) {}
    return {
      serviceUrl: checkUrl(data.serviceUrl) ? data.serviceUrl : "",
      enabled: !!data.enabled && checkUrl(data.serviceUrl)
    };
  }
  function save(url, enabled) {
    if (url && !checkUrl(url)) throw new Error("INVALID_SERVICE_URL");
    var data = { serviceUrl: url || "", enabled: !!enabled && !!url };
    root.localStorage.setItem(KEY, JSON.stringify(data));
    return data;
  }
  // This module has no provider list or scraping endpoint.
  root.AnimeSamaPublicService = { read: read, save: save, checkUrl: checkUrl };
})(typeof window !== "undefined" ? window : globalThis);
