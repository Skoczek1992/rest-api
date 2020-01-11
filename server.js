const express = require('express');
const testimonialsRoutes = require('./routes/testimonials.routes')
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

const app = express();




app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', testimonialsRoutes);
app.use('/', concertsRoutes);
app.use('/', seatsRoutes);

app.use((req, res, next) => {
  res.send({ message: 'Not found' });
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
