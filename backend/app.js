const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { celebrate, Joi } = require('celebrate'); // валидация приходящих данных
const { errors } = require('celebrate'); // для обработки ошибок joi, celebrate
const router = require('./routes');
const auth = require('./middlewares/auth');
const cors = require('./middlewares/cors');
const centralizedErrors = require('./middlewares/centralizedErrors');
const { isValidUrl } = require('./utils/methods');

const { createUser, login } = require('./controllers/users');

const { PORT = 3001 } = process.env;
const app = express();

// для подключения к БД
mongoose.connect('mongodb://localhost:27017/mestodb');

// Безопасность. Обработка CORS запросов
app.use(cors);

app.use(cookieParser());
app.use(express.json());

app.post('/signup', celebrate({
  // валидируем body
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(isValidUrl),
    email: Joi.string().required().email(),
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{8,}$')),
  }),
}), createUser);
app.post('/signin', celebrate({
  // валидируем body
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{8,}$')),
  }),
}), login);

// авторизация
app.use(auth);

app.use(router); // запускаем роутер
app.use(errors()); // обработчик ошибок celebrate
app.use(centralizedErrors); // централизованная обработка ошибок

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
