const express = require('express');
const path = require('path');
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();

const app = express();
app.use(express.json())
const port = process.env.PORT || 8000;

app.use('/restaurant/:restaurantId', express.static(path.join(__dirname, '../public')));

// const clientBundles = '../public/services'; //???not found
// const serverBundles = '../templates/services';
// const serviceConfig = require('../service-config.json');
// const services = require('../loader.js')(clientBundles, serverBundles, serviceConfig);

// const React = require('react');
// const ReactDom = require('react-dom/server');
// const Layout = require('../templates/layout');
// const App = require('../templates/app');
// const Scripts = require('../templates/scripts');

// const renderComponents = (components, props = {}) => {
//     return Object.keys(components).map(item => {
//       let component = React.createElement(components[item], props);
//       return ReactDom.renderToString(component);
//     });
// };

// app.get('/restaurant/:restaurantId', function(req, res) {
//     let components = renderComponents(services, {itemid: req.params.id});
//     res.end(Layout(
//       'SDC Demo',
//       App(...components),
//       Scripts(Object.keys(services))
//     ));
// });


const ServerOne = 'http://ec2-52-90-53-154.compute-1.amazonaws.com:3005';
//const ServerOne = 'http://localhost:3005';
const ServerTwo = 'http://ec2-52-201-248-49.compute-1.amazonaws.com:3000'; //overview
const ServerThree = 'http://ec2-35-183-93-87.ca-central-1.compute.amazonaws.com:3000';


app.all("/menus/*", function(req, res) {
    console.log('redirecting to Server1');
    apiProxy.web(req, res, {target: ServerOne});
});

app.all("/menusBundle.js", function(req, res) {
    console.log('menu redirecting to Server1');
    apiProxy.web(req, res, {target: ServerOne});
});

app.all("/*/overview", function(req, res) {
    console.log('overview redirecting to Server2');
    apiProxy.web(req, res, {target: ServerTwo});
});

app.all("/*/reviews", function(req, res) {
    console.log('reviews redirecting to Server3');
    apiProxy.web(req, res, {target: ServerThree});
});


// app.use('/overviews', proxy('http://cavatableoverviews-env.5sves92ky9.us-west-1.elasticbeanstalk.com/'));
// app.use('/photos', proxy('http://cavatablephotosv3-env.ispdbjpura.us-west-1.elasticbeanstalk.com/'));
// app.use('/menus', proxy('http://localhost:3005'));
// app.use('/reviews', proxy('http://CavatableFec-env.psexkp69kr.us-west-1.elasticbeanstalk.com/'));
// app.use('/reservations', proxy('http://cavareservations.us-west-2.elasticbeanstalk.com/'));

app.listen(port, () => console.log(`Listening on port ${port}!`));
