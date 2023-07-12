const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const data = [
	{
		lang: 'Indonesian',
		text: 'Selamat datang',
	},
	{
		lang: 'English',
		text: 'Welcome',
	},
	{
		lang: 'Spanish',
		text: 'Bienvenido',
	},
	{
		lang: 'French',
		text: 'Bienvenue',
	},
	{
		lang: 'German',
		text: 'Willkommen',
	},
	{
		lang: 'Italian',
		text: 'Benvenuto',
	},
	{
		lang: 'Russian',
		text: "Добро пожаловать (Dobro pozhalovat')",
	},
	{
		lang: 'Japanese',
		text: 'ようこそ (Youkoso)',
	},
	{
		lang: 'Arabic',
		text: 'أهلاً وسهلاً (Ahlan wa sahlan)',
	},
	{
		lang: 'Korean',
		text: '어서 오십시오 (Eoseo osipsio)',
	},
];

const checkHeader = (req, res, next) => {
	const userId = req.headers['user-id'];
	const scope = req.headers['scope'];

	if (userId === 'ifabula' && scope === 'user') {
		next();
	} else {
		res.status(401).json({ message: 'UNAUTHORIZED' });
	}
};

app
	.route('/hello')
	.get(checkHeader, (req, res) => {
		res.json({
			data,
		});
	})
	.post(checkHeader, (req, res) => {
		const { lang, text } = req.body;
		data.push({ lang, text });
		res.json({
			data: {
				lang,
				text,
			},
		});
	});

app.listen(5000, () => {
	console.log('Example app listening on port 5000!');
});
