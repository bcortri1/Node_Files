const fs = require('fs');
const { URL } = require('url');
const axios = require('axios');



function outputFile(data,path){
    fs.writeFile(path, data, 'utf8', function(err) {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        console.log(`DATA WRITTEN AT ${path}`);
    });
}


function cat(path, newpath=""){
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        if(newpath===""){
            console.log(data);
        }
        else{
            outputFile(data, newpath)
        }
    });
}

async function webCat(path, newpath=""){
    try{
        const response = await axios.get(path);
        if(newpath===""){
            console.log(response.data);
        }
        else{
            outputFile(response.data, newpath)
        }
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}


//Checks if the read location is a file or URL
//Also checks if an output file is requested
try{
    let arg1 = process.argv[2]
    if (arg1==='--out'){
        let arg2 = process.argv[3]
        let arg3 = new URL(process.argv[4])
        webCat(arg3,arg2);
    }

    else{
        let arg1 = new URL(process.argv[2])
        webCat(arg1)
    }
}
catch(err){
    let arg1 = process.argv[2]
    if (arg1==='--out'){
        let arg2 = process.argv[3]
        let arg3 = process.argv[4]
        cat(arg3,arg2);
    }
    else{
        cat(arg1);
    }

}
