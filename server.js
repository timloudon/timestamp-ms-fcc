let express = require('express');
let app = express();

var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

app.use( express.static('public'));

app.get('/', (req, res) => res.sendFile(__dirname + '/views/index.html'));

app.get('/api/timestamp/', (req, res) => res.json({ unix: new Date().getTime(), utc: new Date().toUTCString() }))

app.get('/api/timestamp/:date', (req, res) => {
  const userDateStr = req.params.date;
  // check the userDateStr is digits
  if ( /^\+?(0|[1-9]\d*)$/.test( userDateStr ) ) {
    const userDateInt = parseInt( userDateStr );
    res.json({ unix: userDateInt, utc: new Date(userDateInt).toUTCString() })
  } else {
    const userDateObject = new Date(userDateStr);
    if (userDateObject.toString() === "Invalid Date") {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({ unix: userDateObject.valueOf(), utc: userDateObject.toUTCString() })
    }
  }
})

var listener = app.listen(process.env.PORT, () =>
  console.log(`App is listening on port ${listener.address().port}`));
