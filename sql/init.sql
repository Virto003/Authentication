CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";


CREATE TABLE IF NOT EXISTS application_user(
    uuid uuid DEFAULT uuid_generate_v4(),
    username varchar not null,
    password varchar not null,
    primary key (uuid)
)

insert into application_user (username, password) values ('admin', crypt('admin', 'my_salt'));