let express = require('express');
let app = express();

var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.get('/api/timestamp/', (req, res, next) => {
  const now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString()
  })
})

app.get('/api/timestamp/:date', (req, res) => {
  const userInput = req.params.date;
  if (/^\+?(0|[1-9]\d*)$/.test(userInput)) {
    const userInputAsInt = parseInt(userInput); 

    res.json({
      unix: userInputAsInt,
      utc: new Date(userInputAsInt).toUTCString()
    })
  } else {
    const userDateObject = new Date(userInput);
    console.log('userDateObject: ', userDateObject, `is a ${typeof userDateObject}`)
    console.log('userDateObject as UTC: ', userDateObject.toUTCString());
    if (userDateObject.toString() === "Invalid Date") {
      res.json({error: "Invalid Date"});
    } else {
    res.json({
      unix: userDateObject.valueOf(),
      utc: userDateObject.toUTCString()
    })
    }
  }
})

var listener = app.listen(process.env.PORT, () => 
  console.log(`App is listening on port ${listener.address().port}`));
