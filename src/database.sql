create TABLE recipes(
    id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    link_id INTEGER
);

create TABLE person(
    id SERIAL PRIMARY KEY
);

create TABLE products(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    products_list VARCHAR(100)[],
    FOREIGN KEY (user_id) REFERENCES person (id)
);

create TABLE likes(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    likes_list INTEGER[],
    FOREIGN KEY (user_id) REFERENCES person (id)
);
