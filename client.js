var io = require('socket.io-client');
fs = require('fs');
moment = require('moment');

var socket = io.connect('http://localhost:3000');

var par = process.argv.slice(2);
date = new Date(par);
if(!isNaN(date.getTime())) {
    //console.log(date);
    console.log(moment(date).format('MMMM DD, YYYY'));
}

socket.on('connect', function () {
	console.log("socket connected");

	fs.readFile('./data4.tsv', 'utf8', function(err, data) {
        var j;
		if(err) {
			console.error(err);
		}
		else {
			var lines = data.split(/\n/g);
            var s = '';
		   	for (var i = 0; i < lines.length; i++) {
				var columns = lines[i].split(/\t/g);
				var l = columns.length;
				if(l > 2) {
					s += (s.length > 0 ? ',' : '') + '\"' + columns[l - 2] + '\":\"' + columns[l - 1] + '\"';
				}
			}
            s = '"data4":{' + s + '}';
            date = !isNaN(date.getTime()) ? date : new Date();
            s = '{ "date":"' + moment(date).format('MMMM DD, YYYY') + '",' + s + '}';

            j = JSON.parse(s);
            d4 = j.data4;
            keys = Object.keys(d4);
            for(i = 0; i < keys.length; i++)
            {
                v = d4[keys[i]];
                if(v === "NA")
                    v = 0;
                else
                    v = Math.random()
                d4[keys[i]] = v;
            }
		}
	    socket.emit('update', JSON.stringify(j)); 
	    socket.close();
	});
});
