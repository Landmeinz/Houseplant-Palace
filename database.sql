
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "users" (
	"id"            serial NOT NULL,
	"username"      varchar(100) NOT NULL UNIQUE,
	"password"      varchar(100) NOT NULL,
	"access_level"  int NOT NULL DEFAULT '0',
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "plants" (
	"id"            serial NOT NULL,
	"user_id"       int NOT NULL,
	"nickname"      varchar(100) NOT NULL,
	"date_added"    DATE NOT NULL,
	"plant_type"    varchar(100) NOT NULL,
	"light_level"   int NOT NULL,
	"water_freq"    int NOT NULL DEFAULT '7',
	"date_watered"  DATE NOT NULL,
	"date_potted"   DATE NOT NULL,
	"date_fertilized" DATE,
	"notes" varchar(255) NOT NULL,
	CONSTRAINT "plants_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "photos" (
	"id" serial     NOT NULL,
	"plants_id"     int NOT NULL,
	"photo_url"     varchar(255) NOT NULL,
	"date_uploaded" DATE NOT NULL,
	CONSTRAINT "photos_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "comments" (
	"id"        serial NOT NULL,
	"user_id"   int NOT NULL,
	"comment"   varchar(255) NOT NULL,
	"type"      varchar(100) NOT NULL,
	CONSTRAINT "comments_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "plants" ADD CONSTRAINT "plants_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "photos" ADD CONSTRAINT "photos_fk0" FOREIGN KEY ("plants_id") REFERENCES "plants"("id");

ALTER TABLE "comments" ADD CONSTRAINT "comments_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");















-- // from spike below here // -- 


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