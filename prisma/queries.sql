create view rankings as
SELECT "Zestawy".id, "Zestawy".name, "Zestawy".slug, "Zestawy"."price",
SUM("WartosciOdzywcze"."kcalPorcja") as kcal,
SUM("WartosciOdzywcze"."bialkoPorcja") as bialko,
SUM("WartosciOdzywcze"."tluszczePorcja") as tluszcze,
SUM("WartosciOdzywcze"."tluszczeNasyconePorcja") as "tluszczeNasycone",
SUM("WartosciOdzywcze"."weglowodanyPorcja") as weglowodany,
SUM("WartosciOdzywcze"."cukryPorcja") as cukry,
SUM("WartosciOdzywcze"."blonnikPorcja") as blonnik,
SUM("WartosciOdzywcze"."solPorcja") as sol
from "Zestawy"
JOIN "_FoodToZestawy" on "_FoodToZestawy"."B" = "Zestawy".id
JOIN "Food" on "_FoodToZestawy"."A" = "Food".id
JOIN "WartosciOdzywcze" on "WartosciOdzywcze".id = "Food"."woId"
GROUP BY "Zestawy".id, "Zestawy"."name", "Zestawy".slug, "Zestawy"."price"
		
    
create materialized view rankingsMat as
SELECT "Zestawy".id as zestawId, "Zestawy".name as zestawName, "Zestawy".slug as zestawSlug,
RANK () OVER(order by "Zestawy"."price") as rankPrice, 
RANK () OVER(order by SUM("WartosciOdzywcze"."kcalPorcja") DESC) as rankKcal,
RANK () OVER(order by SUM("WartosciOdzywcze"."bialkoPorcja") DESC) as rankBialko
FROM "Zestawy"
    JOIN "_FoodToZestawy" on "_FoodToZestawy"."B" = "Zestawy".id
    JOIN "Food" on "_FoodToZestawy"."A" = "Food".id
    JOIN "WartosciOdzywcze" on "WartosciOdzywcze".id = "Food"."woId"
    GROUP BY "Zestawy".id, "Zestawy"."name", "Zestawy"."price", "Zestawy".slug 


Create or replace Function RefreshRanksView() returns trigger
Language PLPGSQL
as
$$
BEGIN
Refresh materialized view rankingsMat;
return new;
END;
$$

CREATE TRIGGER OnZestawyInsertUpdate
BEFORE INSERT OR UPDATE ON "Zestawy"
FOR EACH ROW
EXECUTE PROCEDURE RefreshRanksView();

SHOW SERVER_VERSION;

-- ADDING SLUG TRIGGERS & COLUMNS --
Alter table "Zestawy" add column slug TEXT UNIQUE;
alter table "Food" add column slug TEXT UNIQUE;
CREATE EXTENSION IF NOT EXISTS "unaccent";

CREATE OR REPLACE FUNCTION slugify("value" TEXT)
RETURNS TEXT AS $$
  -- removes accents (diacritic signs) from a given string --
  WITH "unaccented" AS (
    SELECT unaccent("value") AS "value"
  ),
  -- lowercases the string
  "lowercase" AS (
    SELECT lower("value") AS "value"
    FROM "unaccented"
  ),
  -- replaces anything that's not a letter, number, hyphen('-'), or underscore('_') with a hyphen('-')
  "hyphenated" AS (
    SELECT regexp_replace("value", '[^a-z0-9\\-_]+', '-', 'gi') AS "value"
    FROM "lowercase"
  ),
  -- trims hyphens('-') if they exist on the head or tail of the string
  "trimmed" AS (
    SELECT regexp_replace(regexp_replace("value", '\\-+$', ''), '^\\-', '') AS "value"
    FROM "hyphenated"
  )
  SELECT "value" FROM "trimmed";
$$ LANGUAGE SQL STRICT IMMUTABLE;

CREATE FUNCTION public.set_slug() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.slug := slugify(NEW.name);
  RETURN NEW;
END
$$;

CREATE TRIGGER "slug_zestawy"
BEFORE update of name or Insert ON "Zestawy"
FOR EACH ROW
WHEN (NEW.name IS NOT NULL AND NEW.slug IS NULL)
EXECUTE PROCEDURE set_slug();

CREATE TRIGGER "slug_food"
BEFORE update of name or Insert ON "Food"
FOR EACH ROW
WHEN (NEW.name IS NOT NULL AND NEW.slug IS NULL)
EXECUTE PROCEDURE set_slug();
-- END OF ADDING SLUG TRIGGERS & COLUMNS --


select * from "Zestawy"
-- Prawidlowy Insert od kiedy jest slug
insert into "Zestawy" (id, name, price) values (1315131, 'test sluga 2for"U', 10.1)
delete from "Zestawy" where id = 1315131

-- Views selects
select * from rankings
select * from rankingsMat

-- LIST ALL TRIGGERS --
SELECT event_object_table AS table_name ,trigger_name         
FROM information_schema.triggers  
GROUP BY table_name , trigger_name 
ORDER BY table_name ,trigger_name

DROP trigger slug_zestawy on "ZestawyTest";
DROP trigger onzestawyinsertupdate on "ZestawyTest";
DROP trigger slug_food on "Food";

------- CREATE A COPY OF THE TABLE -------
ALTER TABLE "Zestawy" RENAME TO "ZestawyTest"
CREATE TABLE "Zestawy" AS TABLE "ZestawyTest" WITH NO DATA
ALTER TABLE "Zestawy" ALTER COLUMN slug SET NOT NULL;
INSERT INTO "Zestawy" SELECT * from "ZestawyTest"	-- THATS THE COPYING PART --
Select * from "Zestawy"


CREATE TABLE "Zestawy" (like "ZestawyTest" INCLUDING ALL)  -- 
ALTER TABLE "Zestawy" ALTER COLUMN slug SET NOT NULL;
INSERT INTO "Zestawy" SELECT * from "ZestawyTest"	-- THATS THE COPYING PART --
Select * from "Zestawy"

CREATE TABLE "Food" (like "FoodTest" INCLUDING ALL);  -- 
ALTER TABLE "Food" ALTER COLUMN slug SET NOT NULL;
INSERT INTO "Food" SELECT * from "FoodTest";	-- THATS THE COPYING PART --
Select * from "Food"

--  ad.  CHANGE THE FOREIGN KEYS OF JUNCTION TABLE of the copied tables --
ALTER TABLE "_FoodToZestawy"
  DROP CONSTRAINT "_FoodToZestawy_A_fkey",
  ADD CONSTRAINT "_FoodToZestawy_A_fkey"
  FOREIGN KEY ("A") REFERENCES "Food"("id")
  ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "_FoodToZestawy"
  DROP CONSTRAINT "_FoodToZestawy_B_fkey",
  ADD CONSTRAINT "_FoodToZestawy_B_fkey"
  FOREIGN KEY ("B") REFERENCES "Zestawy"("id")
  ON UPDATE CASCADE ON DELETE CASCADE;
-- END --

-- SHOW ALL CONSTRAINTS OF THE COLUMN --
SELECT constraint_name, column_name
FROM information_schema.constraint_column_usage
WHERE table_name = 'Food' AND column_name = 'id';
-- END --

select * from "_FoodToZestawy"
select * from "Zestawy"
select * from "Food"
