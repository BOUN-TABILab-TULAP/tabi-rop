// TODO: change this
var bratLocation = "http://nlp.cmpe.boun.edu.tr/staticFiles/Brat";
head.js(
  // External libraries
  bratLocation + "/lib/jquery.min.js",
  bratLocation + "/lib/jquery.svg.min.js",
  bratLocation + "/lib/jquery.svgdom.min.js",
  bratLocation + "/src/util.js",

  // brat helper modules
  bratLocation + "/src/configuration.js",
  bratLocation + "/src/annotation_log.js",
  bratLocation + "/lib/webfont.js",

  // brat modules
  bratLocation + "/src/dispatcher.js",
  bratLocation + "/src/url_monitor.js",
  bratLocation + "/src/visualizer.js",


  bratLocation + '/src/annodoc.js',
  // project-specific collection data
  bratLocation + '/src/collections.js',
  // project-specific coniguration
  bratLocation + '/src/config.js',
  bratLocation + '/src/conllu.js',
  // "http://nlp.cmpe.boun.edu.tr/staticFiles/conllu.js"

  
  

);
var webFontURLs = [
  // bratLocation + "/static/font/Astloch-Bold.ttf",
  // bratLocation + "/static/font/PT_Sans-Caption-Web-Regular.ttf",
  // bratLocation + "/static/font/Liberation_Sans-Regular.ttf",
];

// head.ready(function() {
//   // mark current collection (filled in by Jekyll)
//   // Collections.listing['_current'] = '{{ page.collection }}';

// // performs all embedding and support functions
// Annodoc.activate(Config.bratCollData);
// console.log("activated");
// });



// https://github.com/arne-cl/brat-embedded-visualization-examples/blob/master/js/brat_loader.js
