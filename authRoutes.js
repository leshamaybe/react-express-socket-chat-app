import { Router } from 'express';
import controller from './authController.js';
import { check } from 'express-validator';
const router = new Router();

router.post(
    '/reg',
    [
        check('username', 'Имя пользователя не может быть пустым').notEmpty(),
        check('password', 'Пароль не может быть меньше 4 и больше 10 символов').isLength({
            min: 4,
            max: 10,
        }),
    ],
    controller.registration,
);
router.post('/login', controller.login);
router.post('/addMessage', controller.addMessages);
router.get('/getMessages', controller.getMessages);
router.get('/users', controller.getUsers);

export default router;
