var page = require('webpage').create(),
    system = require('system'),
    args = system.args,
    t,
    address = system.args[1];
    //viewports = args[2];

page.open(address, function () {

    t = Date.now().toString();
    viewports = [{width: 1024, height: 768}];
    output = '';
    for (var i = viewports.length - 1; i >= 0; i--) {

        var obj = viewports[i];
        page.viewportSize = obj;
        page.render('./screenshots/' + obj.width + 'x' + obj.height + '/' + t + '.png');
        output += 'Created: [' + obj.width + 'x' + obj.height + ']' + t + '.png\n';

    }
    console.log(output);

    setTimeout(function() {
        phantom.exit();
    }, 1000);

});