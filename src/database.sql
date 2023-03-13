create TABLE recipes(
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    link_id INTEGER NOT NULL
);
create TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    is_activated BOOLEAN,
    activation_link VARCHAR(100)
);
CREATE TYPE weekdays AS ENUM (
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday'
);
create TABLE products(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    products_list VARCHAR(100) [] NOT NULL,
    weekday weekdays,
    FOREIGN KEY (user_id) REFERENCES users (id)
);
create TABLE likes(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    likes_list INTEGER [] NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
);
create TABLE token(
    user_id INTEGER,
    refresh_token VARCHAR NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
);