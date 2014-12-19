var io = require('socket.io-client');
fs = require('fs');

var socket = io.connect('http://localhost:3000');

socket.on('connect', function () {
	console.log("socket connected");

	fs.readFile('./data4.tsv', 'utf8', function(err, data) {
        var j;
		if(err) {
			console.error(err);
		}
		else {
			//console.log(data);
			var lines = data.split(/\n/g);
			var s = '{';
		   	for (var i = 0; i < lines.length; i++) {
				var columns = lines[i].split(/\t/g);
				var l = columns.length;
				if(l > 2) {
					s += (s.length > 1 ? ',' : '') + '\"' + columns[l - 2] + '\":\"' + columns[l - 1] + '\"';
				}
			}
			s += '}';

            j = JSON.parse(s);
            keys = Object.keys(j);
            for(i = 0; i < keys.length; i++)
            {
                v = j[keys[i]];
                if(v === "NA")
                    v = 0;
                else
                    v = Math.random()
                j[keys[i]] = v;
            }
		}
	    socket.emit('update', JSON.stringify(j)); 
	    socket.close();
	});
});
