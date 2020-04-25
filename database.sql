CREATE TABLE "todo" (
"id" SERIAL PRIMARY KEY, 
"task" VARCHAR (255) NOT NULL,
"complete" BOOLEAN DEFAULT false
);

INSERT INTO "todo" ("task", "complete")
VALUES ('Feed the cats', 'false');
INSERT INTO "todo" ("task", "complete")
VALUES ('Run the dishwasher', 'false');
INSERT INTO "todo" ("task", "complete")
VALUES ('Sweep the balcony', 'false');
INSERT INTO "todo" ("task", "complete")
VALUES ('Shop for groceries', 'false');
INSERT INTO "todo" ("task", "complete")
VALUES ('Call mom', 'false');