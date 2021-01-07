const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next)=>{
	res.send({
		quote: getRandomElement(quotes)
	});
});

app.get('/api/quotes', (req, res, next)=>{
	if(req.query.person !== undefined){
		const quotesByPerson = quotes.filter(quote => quote.person === req.query.person);
		res.send({
			quotes: quotesByPerson
		});
	}
	else{
		res.send({
			quotes:quotes
		});
	}
});

app.post('/api/quotes', (req, res, next)=>{
	const newQuote = {
		quote: req.query.quote,
		person: req.query.person
	};
	if(newQuote.quote && newQuote.person){
		quotes.push(newQuote);
		res.send({
			quote: newQuote
		});
	}
	else{
		res.status(400).send();
	}
});

app.listen(PORT, ()=>{
	console.log('Server listen at '+PORT);
});