import User from '../models/user.model';
import db from '../db';
import { Script } from 'vm';
import DatabaseError from '../models/errors/database.error.model';

class UserRepository {

    async findAllUsers(): Promise<User[]> {
        const query = `
        select username, uuid from application_user
        `;
        const { rows } = await db.query<User>(query);
        return rows || [];
    }

    async findById(uuid: string): Promise<User> {
        try{
            const query = `
        select username, uuid from application_user where uuid = $1
        `;
        const values = [uuid]
        const { rows } = await db.query<User>(query, values);
        const [user] = rows;
        return user;
        }catch(error) {
            throw new DatabaseError('Erro na consulta por ID', error);
        }
        
    }

     async create(user: User): Promise<string> {
        const query = `
        insert into application_user (username, password) values($1, crypt($2, 'my_salt'))
        returning uuid
        `;

        const values = [user.username, user.password];
        const { rows } = await db.query<{ uuid: string }>(query, values);
        const [ newUser ] = rows;
        return newUser.uuid;

    }
    async update(user: User): Promise<void> {
        const query = `
        update application_user set username = $1, password = crypt($2, 'my_salt') where uuid = $3
        `;

        const values = [user.username, user.password, user.uuid];
        await db.query<{ uuid: string }>(query, values);

    }

    async remove(uuid: string): Promise<void> {
        const query = `
        delete from application_user where uuid = $1
        `;

        const values =  [uuid];
        await db.query(query, values);

    }
}

export default new UserRepository();