
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

-- new table --

CREATE TABLE "user" (
	"id" serial NOT NULL,
	"username" varchar(100) NOT NULL UNIQUE,
	"password" varchar(100) NOT NULL,
	"access_level" int NOT NULL DEFAULT '0',
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "plant" (
	"id" serial NOT NULL,
	"user_id" int NOT NULL,
	"nickname" varchar(100) NOT NULL,
	"date_added" DATE NOT NULL,
	"plant_type" varchar(100) NOT NULL,
	"light_level" int NOT NULL,
	"water_freq" int NOT NULL,
	"date_watered" DATE NOT NULL,
	"date_potted" DATE NOT NULL,
	"date_fertilized" DATE NOT NULL,
	"notes" varchar(255) DEFAULT 'null',
	CONSTRAINT "plant_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "photo" (
	"id" serial NOT NULL,
	"user_id" int NOT NULL,
	"plant_id" int NOT NULL,
	"photo_url" varchar(255) NOT NULL,
	"date_uploaded" DATE NOT NULL,
	CONSTRAINT "photo_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "comment" (
	"id" serial NOT NULL,
	"user_id" int NOT NULL,
	"comment" varchar(255) NOT NULL,
	"type" varchar(100) NOT NULL,
	CONSTRAINT "comment_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "plant" ADD CONSTRAINT "plant_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");

ALTER TABLE "photo" ADD CONSTRAINT "photo_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "photo" ADD CONSTRAINT "photo_fk1" FOREIGN KEY ("plant_id") REFERENCES "plant"("id");

ALTER TABLE "comment" ADD CONSTRAINT "comment_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");



-- insert plant data -- 

INSERT INTO "plant"
	("user_id", "nickname", "date_added", "plant_type", "light_level", "water_freq", "date_watered", "date_potted", "date_fertilized", "notes") 
VALUES 
	('1', 'Figgy', '2019-10-11', 'Fiddle Leaf Fig', '3', '9', '2021-11-08', '2019-10-11', '2020-03-09', 'Turn on first water of the month' ),
	('1', 'Devil', '2020-08-19', 'Golden Pothos', '2', '7', '2021-11-15', '2020-08-19', '2020-08-19', null),
	('1', 'Dummy', '2021-05-22', 'Dumbcane', '2', '6', '2021-11-15', '2021-05-22', '2021-05-22', null ),
	('1', 'Joey', '2020-08-19', 'Golden Pothos', '2', '7', '2021-11-15', '2020-08-19', '2020-08-19', null),
	('2', 'Tony', '2019-12-09', 'Golden Pothos', '2', '7', '2021-08-19', '2020-08-19', '2020-08-19', null)
;


-- insert photo data -- 

INSERT INTO "photo"
	("user_id", "plant_id", "photo_url", "date_uploaded")
VALUES 
	('1', '1', 'https://bit.ly/3owgpgV', CURRENT_DATE),
	('1', '1', 'https://bit.ly/3qGdOnl', CURRENT_DATE),
	('1', '2', 'https://bit.ly/3qD0Bvp', CURRENT_DATE),
	('1', '3', 'https://bit.ly/3ccBV4A', CURRENT_DATE),
	('1', '4', 'https://bit.ly/3Hpi2pl', CURRENT_DATE),
	('2', '5', 'https://bit.ly/3CiWKWO', CURRENT_DATE)
;












-- // NOTES from spike below here // -- 


--"date_watered" TIMESTAMP DEFAULT CURRENT_DATE NOT NULL,
-- START HERE to create the DATES tabel -- 

CREATE TABLE "dates" (
	"id" SERIAL PRIMARY KEY,
	"date_added" DATE,
	"date_watered" DATE,
    "date_potted" DATE,
    "date_fertilized" DATE,
    "water_freq" INT
);

SELECT *
FROM 	"dates";

-- instert dummy valuse to see if working correctly -- 

INSERT INTO "dates"
	("date_added", "date_watered", "date_potted", "date_fertilized", "water_freq")
VALUES
	('1998-05-08', '2021-11-10', '1999-08-27', '1999-08-17', '5'),
	('2005-05-08', '2021-11-28', '2008-08-27', '2010-08-17', '7');   



-- as if we updated the date_watered with the current via an update from the DOM -- 

UPDATE 	"dates"
SET "date_watered" = CURRENT_DATE
WHERE "id" = 1;


-- can get date values straight from the SQL server -- 

SELECT NOW();
SELECT CURRENT_DATE;
SELECT DATE_PART('year', NOW()) AS "YEAR" ;
SELECT DATE_PART('month', NOW()) AS "MONTH" ;
SELECT DATE_PART('day', NOW()) AS "DAY" ;


-- can add the current_date on to any query -- 

SELECT CURRENT_DATE, *
FROM 	"dates";


-- current date + 5 days -- 

SELECT CURRENT_DATE, CURRENT_DATE + INTERVAL '5 days' AS "current_date_5";




-- adding days to the last time this plant was watered -- 
-- how to get table values into the interval?? --

SELECT CURRENT_DATE, *, ("date_watered" + INTERVAL '5 days') AS "next_water_date"
FROM 	"dates";





-- how to use other table data to add to the date? -- 

SELECT CURRENT_DATE, "date_watered", "water_freq", "date_watered" + (INTERVAL '1 days' * "water_freq") AS "next_water_date"				
FROM "dates"
ORDER BY "next_water_date" ASC;


--SELECT 
--	CURRENT_DATE, 
--	DATE_PART('day', NOW()) AS "curret_day", 
--	
--	"date_watered",
--	DATE_PART('day', "date_watered") AS "last_water_day",
--	
--	"water_freq",
--	"date_watered" + INTERVAL '1 days' * "water_freq" AS "next_water_day"
--				
--FROM "dates";



-- the two dates that we need to compare --

SELECT CURRENT_DATE, "date_watered" + INTERVAL '1 day' * "water_freq" AS "next_water"
FROM 	"dates";





SELECT CURRENT_DATE, "plants".date_watered
FROM "plants";