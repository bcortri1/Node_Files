const fs = require('fs');
const { URL } = require('url');
const axios = require('axios');


function cat(path){
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        console.log(data);
    });
}

async function webCat(path){
    try{
        const response = await axios.get(path);
        console.log(response.data);
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}





try{
    let arg = new URL(process.argv[2])
    webCat(arg);
}
catch(err){
    let arg = process.argv[2]
    cat(arg);
}

