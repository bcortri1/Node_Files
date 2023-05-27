const fs = require('fs');
let arg = process.argv[2]

function cat(path){
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        console.log(data);
    });
}

cat(arg);