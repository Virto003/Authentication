// get /users
// get /users/:uuid
// post /users
// put /users/:uuid
// deelte /users/:uuid

import { Router, Request, Response, NextFunction } from "express";
import { StatusCodes } from 'http-status-codes';
import userRepository from "../repositories/user.repository";

const usersRoute = Router();
const ok = StatusCodes.OK;


usersRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    const users = await userRepository.findAllUsers();
    res.status(ok).send(users);
});

usersRoute.get('/users/:uuid', async (req: Request, res: Response, next: NextFunction) => {

    try {
        const uuid = req.params.uuid;
        const user = await userRepository.findById(uuid);
        res.status(ok).send(user);
    } catch(error){
       next(error);
    }
    
});

usersRoute.post('/users', async (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body;
    
    const uuid = await userRepository.create(newUser);

    res.status(StatusCodes.CREATED).send(uuid);
});

usersRoute.put('/users/:uuid', async (req: Request, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    const modifiedUser = req.body;

    modifiedUser.uuid = uuid;

    await userRepository.update(modifiedUser)
    res.status(ok).send({ modifiedUser });
});

usersRoute.delete('/users/:uuid', async (req: Request, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;

    await userRepository.remove(uuid)
    res.sendStatus(StatusCodes.OK);
});

export default usersRoute;
