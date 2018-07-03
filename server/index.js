const express = require('express');
const path = require('path');
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();

const app = express();
app.use(express())
const port = process.env.PORT || 8000;

app.use('/restaurant/:restaurantId', express.static(path.join(__dirname, '../public')));

const ServerOne = 'http://ec2-52-90-53-154.compute-1.amazonaws.com:3005';
//const ServerOne = 'http://localhost:3005';

app.all("/menus/*", function(req, res) {
    console.log('redirecting to Server2');
    apiProxy.web(req, res, {target: ServerOne});
});

app.all("/menusBundle.js", function(req, res) {
    // console.log('redirecting to Server2');
    apiProxy.web(req, res, {target: ServerOne});
});


// app.use('/overviews', proxy('http://cavatableoverviews-env.5sves92ky9.us-west-1.elasticbeanstalk.com/'));
// app.use('/photos', proxy('http://cavatablephotosv3-env.ispdbjpura.us-west-1.elasticbeanstalk.com/'));
// app.use('/menus', proxy('http://localhost:3005'));
// app.use('/reviews', proxy('http://CavatableFec-env.psexkp69kr.us-west-1.elasticbeanstalk.com/'));
// app.use('/reservations', proxy('http://cavareservations.us-west-2.elasticbeanstalk.com/'));

app.listen(port, () => console.log(`Listening on port ${port}!`));
