let express = require('express');
let app = express();

var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

var listener = app.listen(process.env.PORT, () => 
  console.log(`App is listening on port ${listener.address().port}`));
