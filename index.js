const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use('/public', express.static('./public'));

require('./routes/views')(app);

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});
