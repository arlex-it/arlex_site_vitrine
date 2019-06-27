const express = require('express');
const app = express();
const sass = require('node-sass-middleware');

app.use(sass({
    src: './public/sass', //where the sass files are
    dest: './public/stylesheets', //where css should go
    debug: true, // obvious
    outputStyle: 'compressed',
    prefix: '/public/stylesheets'
    })
);
app.set('view engine', 'ejs');
app.use('/public', express.static('./public'));

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

require('./routes/views')(app);

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});
