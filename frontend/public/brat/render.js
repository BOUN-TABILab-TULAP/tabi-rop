head.ready(function () {
  // Evaluate the code from the example (with ID
  // 'embedding-entity-example') and show it to the user
  Util.embed(
    "embedding-entity-example",
    $.extend({}, collData),
    $.extend({}, docData),
    webFontURLs
  );
});
