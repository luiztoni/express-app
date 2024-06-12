const express = require('express');
const port = process.env.PORT || 3001;
const app = express();
app.use(express.json());

app.use((req, res, next) => {
    console.log('REquisção steps');
    console.log(req.steps);
    console.log('Requisção stringficada');
    //console.log(JSON.stringify(req));
    const auth = {login: 'admin', password: 'admin'}  
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')  
    console.log('HEADERS:');
    console.log(req.headers);
    console.log('Authorization: ')
    console.log(b64auth);
    console.log("Login: "+login);
    console.log("Password: "+password)
    if (login && password && login === auth.login && password === auth.password) {
      return next();
    }
    res.set('WWW-Authenticate', 'Basic realm="401"')
    res.status(401).send('Unauthorized')
  
});

app.post('/msg', (req, res) => {
    console.log('body');
    console.log(req.body);
    res.status(200).send('Ok');
});

app.listen(port, () => {
    return console.log("Server port 3000");
});

