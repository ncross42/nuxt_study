-- Up
CREATE TABLE clothes (
	"id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"name"	TEXT NOT NULL UNIQUE,
	"price"	INTEGER NOT NULL,
	"category"	TEXT NOT NULL CHECK(category IN ('top', 'pants', 'skirt')),
	"stock"	INTEGER NOT NULL,
	"img_path"	TEXT NOT NULL,
	"img_data"	BLOB
);
CREATE TABLE sales (
	"id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"quantity"	INTEGER NOT NULL,
	"user_id"	INTEGER NOT NULL,
	"clothe_id"	INTEGER NOT NULL,
	FOREIGN KEY("user_id") REFERENCES "users"("id")
);

CREATE TABLE users (
	"id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"name"	TEXT NOT NULL UNIQUE,
	"pass"	TEXT NOT NULL,
	"balance"	INTEGER NOT NULL DEFAULT 0,
	"type"	TEXT NOT NULL CHECK(type IN ('admin', 'user'))
);

INSERT INTO users (id, name, pass, balance, type) VALUES (1, 'admin', 'apass', 10000, 'admin' );

-- Down
DROP TABLE Category
DROP TABLE Post;