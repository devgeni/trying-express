const app = require('express')();
const bodyParser = require('body-parser');

const { Article } = require('./db');

app.set('port', process.env.PORT || 80);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/articles', (req, res, next) => {
	Article.all((err, articles) => {
		if (err) return next(err);
		res.send(articles);
	});
});

/*app.post('/articles', (req, res, next) => {
	const article = { title: req.body.title };
	articles.push(article);
	res.send(article);
});*/

app.get('/articles/:id', (req, res, next) => {
	const { id } = req.params;
	Article.find(id, (err, article) => {
		if (err) return next(err);
		res.send(article);
	});
});

app.delete('/articles/:id', (req, res, next) => {
	const { id } = req.params;
	Article.delete(id, (err) => {
		if (err) return next(err);
		res.send({ message: 'Deleted' });
	});
});

app.listen(app.get('port'), () => {
	console.log('App started on port ', app.get('port'));
});

module.exports = app;