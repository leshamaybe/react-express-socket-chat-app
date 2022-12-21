import User from './models/Users.js';
import Message from './models/Messages.js';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import secret from './config.js';
import { nanoid } from 'nanoid';

const generateAccessToken = (id) => {
    const payload = {
        id,
    };
    return jwt.sign(payload, secret.secret, { expiresIn: '24h' });
};

class AuthController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Ошибка', errors });
            }
            const { username, password } = req.body;
            const candidate = await User.findOne({ username });
            if (candidate) {
                return res.status(400).json({ message: 'Пользователь существует' });
            }

            const hashPassword = bcrypt.hashSync(password, 7);

            const user = new User({ username, password: hashPassword });

            await user.save();

            return res.json({ message: 'Пользователь успешно зарегистрирован!' });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: 'Registration error' });
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(400).json({ message: `Пользователь ${username} не найден` });
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ message: 'Введён неверный пароль' });
            }
            const token = generateAccessToken(user._id);
            return res.status(200).json({ token, username });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: 'Login error' });
        }
    }

    async addMessages(req, res) {
        try {
            const { textOrPathToFile, userId, senderName } = req.body;
            if (!textOrPathToFile) {
                return res.status(400).json({ message: 'ВВедите сообщение' });
            }

            const newMessage = new Message({
                messageId: nanoid(),
                textOrPathToFile,
                userId,
                senderName,
            });

            await newMessage.save();

            return res.status(200).json({ message: 'Сообщение отправлено!' });
        } catch (error) {
            console.log(error);
        }
    }

    async getMessages(req, res) {
        try {
            const messages = await Message.find();
            res.json(messages);
        } catch (error) {
            console.log(error);
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            console.log(error);
        }
    }
}

export default new AuthController();
