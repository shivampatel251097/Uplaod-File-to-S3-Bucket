const express = require('express'),
  app = express(),
  bodyParser = require('body-parser');
  port = process.env.PORT || 3307;

const fs = require('fs');
const AWS = require('aws-sdk');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Enter Your bucket credentials
const ID = 'YOURID';
const SECRET = 'YOURSECRETACCESSKEY';
const BUCKET_NAME = 'sops3bucket';//Bucket name


//Accesinbg bucket using aws credentials
const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

var routes = require('./app/route/approutes.js'); //importing route
routes(app); //register the route

app.listen(port);
console.log('API server started on: ' + port);

const uploadFile = (fileName) => {
    const fileContent = fs.readFileSync(fileName);
    const params = {
        Bucket: BUCKET_NAME,
        Key: '2015_16_Districtwise.csv', // file name you want to upload
        Body: fileContent
    };

    // Uploading file to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err
        }
        console.log(`File uploaded successfully. ${data.Location}`)
    });
};
// Enter the file you want to upload here
uploadFile('2015_16_Districtwise.csv');