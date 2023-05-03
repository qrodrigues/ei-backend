const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const repository = require('./Repository/repository.js')
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.send('EI Backend Working');
});

app.get('/tickets', async (req, res) => {
    try {
        const tickets = await repository.getTickets();
        res.status(200).json(tickets);
      } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching tickets');
      }
})

app.get('/tickets/:id', async (req, res) => {
    try {
        const ticket = await repository.getTicket(Number(req.params.id));
        res.status(200).json(ticket);
      } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching ticket');
      }
})

app.post('/tickets', async (req, res) => {
    console.log(req);
    try {
      const ticket = await repository.createTicket(req.body);
      res.status(201).json(ticket)
    } catch (error) {
      console.error(error);
      res.status(500).send('Error creating ticket');
    }
  });

  app.put('/tickets/:id', async (req, res) => {
    try {
      const update = await repository.updateTicket(parseInt(req.params.id), req.body);
      res.status(200).json(update);
    } catch (error) {
      console.error(error)
      res.status(500).send('Error updating ticket');
    }
  });

  app.delete('/tickets/:id', async (req, res) => {
    try {
      await repository.deleteTicket(parseInt(req.params.id));
      res.status(200).json();
    } catch (error) {
        console.error(error);
      res.status(500).send('Error deleting ticket');
    }
  });

app.listen(port, () => {
    console.log('Server app listening on port ' + port);
});