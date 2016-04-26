var links = [];
var casper = require('casper').create();
//var aggiu = require('/home/davide/nexa/public-tenders/sitar/aggiudicazione.js');
//var regexp = /(javascript:MM_openBrWindow\(\')(.*)(\',\')/;
var regexp = /\'[A-Za-z\/\s\.-_]+\'/;

function getLinks() {
    var links = document.querySelectorAll('#ctl00_cph_body_lblBody a');
    return Array.prototype.map.call(links, function(e) {
        return e.getAttribute('href');
    });
    this.echo('get links')
}

casper.start('https://www.sitar-er.it/consultazione/consultazione_motore.aspx?JS=1', function() {
    this.fill('form[action="consultazione_motore.aspx"]', {}, true);
});
/*    
casper.then(function() {
    // aggregate results for the 'casperjs' search
    links = this.evaluate(getLinks);
    // now search for 'phantomjs' by filling the form again
    this.fill('form[action="/search"]', { q: 'phantomjs' }, true);
});
*/    
casper.then(function() {
    // aggregate results for the 'phantomjs' search
    links = links.concat(this.evaluate(getLinks));
});
    
casper.run(function() {
    // echo results in some pretty fashion
   this.echo(links.length + ' links found:');
   //var r_links = links.replace(regexp);
   var r_links = [];
   for (var i = 0; i < links.length; i++) {   
       //regex = new RegExp(links[i], "g");
       //replaceLinks = replaceString.replace(regexp, replace[i]);
       var r_link = 'https://www.sitar-er.it/consultazione/' + links[i].match(regexp)[0].replace(/\'/g,"");
       this.echo('YYY');
       aggiu.scrapeSitar(r_link);
       r_links.push(r_link);
   }
   // Debug
   this.echo(' - ' + r_links.join('\n - ')).exit();
});

