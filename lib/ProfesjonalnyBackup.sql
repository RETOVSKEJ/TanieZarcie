PGDMP                 
        {           railway    13.2    15.2 >               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            	           1262    17471    railway    DATABASE     r   CREATE DATABASE railway WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';
    DROP DATABASE railway;
                postgres    false                        2615    17759    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                postgres    false            
           0    0    SCHEMA public    COMMENT         COMMENT ON SCHEMA public IS '';
                   postgres    false    6                       0    0    SCHEMA public    ACL     +   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
                   postgres    false    6                        3079    18618    unaccent 	   EXTENSION     <   CREATE EXTENSION IF NOT EXISTS unaccent WITH SCHEMA public;
    DROP EXTENSION unaccent;
                   false    6                       0    0    EXTENSION unaccent    COMMENT     P   COMMENT ON EXTENSION unaccent IS 'text search dictionary that removes accents';
                        false    2            �            1255    18593    refreshranksview()    FUNCTION     �   CREATE FUNCTION public.refreshranksview() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
Refresh materialized view rankingsMat;
return new;
END;
$$;
 )   DROP FUNCTION public.refreshranksview();
       public          postgres    false    6            �            1255    18626 
   set_slug()    FUNCTION     �   CREATE FUNCTION public.set_slug() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.slug := slugify(NEW.name);
  RETURN NEW;
END
$$;
 !   DROP FUNCTION public.set_slug();
       public          postgres    false    6            �            1255    18625    slugify(text)    FUNCTION     '  CREATE FUNCTION public.slugify(value text) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
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
$_$;
 *   DROP FUNCTION public.slugify(value text);
       public          postgres    false    6            �            1259    17776    Category    TABLE     T   CREATE TABLE public."Category" (
    id integer NOT NULL,
    name text NOT NULL
);
    DROP TABLE public."Category";
       public         heap    postgres    false    6            �            1259    17774    Category_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Category_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public."Category_id_seq";
       public          postgres    false    6    203                       0    0    Category_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public."Category_id_seq" OWNED BY public."Category".id;
          public          postgres    false    202            �            1259    19059    Food    TABLE     �   CREATE TABLE public."Food" (
    id integer NOT NULL,
    name text NOT NULL,
    price double precision NOT NULL,
    "woId" integer NOT NULL,
    current boolean DEFAULT true NOT NULL,
    "categoryId" integer NOT NULL,
    slug text NOT NULL
);
    DROP TABLE public."Food";
       public         heap    postgres    false    6            �            1259    17796    Food_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Food_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."Food_id_seq";
       public          postgres    false    6    210                       0    0    Food_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."Food_id_seq" OWNED BY public."Food".id;
          public          postgres    false    205            �            1259    17810    WartosciOdzywcze    TABLE     2  CREATE TABLE public."WartosciOdzywcze" (
    id integer NOT NULL,
    name text NOT NULL,
    alergeny text,
    kcal100g double precision,
    "kcalPorcja" double precision NOT NULL,
    "kcalRI" double precision NOT NULL,
    tluszcze100g double precision,
    "tluszczePorcja" double precision NOT NULL,
    "tluszczeRI" double precision NOT NULL,
    "tluszczeNasycone100g" double precision,
    "tluszczeNasyconePorcja" double precision NOT NULL,
    "tluszczeNasyconeRI" double precision NOT NULL,
    weglowodany100g double precision,
    "weglowodanyPorcja" double precision NOT NULL,
    "weglowodanyRI" double precision NOT NULL,
    cukry100g double precision,
    "cukryPorcja" double precision NOT NULL,
    "cukryRI" double precision NOT NULL,
    blonnik100g double precision,
    "blonnikPorcja" double precision NOT NULL,
    bialko100g double precision,
    "bialkoPorcja" double precision NOT NULL,
    "bialkoRI" double precision NOT NULL,
    sol100g double precision,
    "solPorcja" double precision NOT NULL,
    "solRI" double precision NOT NULL
);
 &   DROP TABLE public."WartosciOdzywcze";
       public         heap    postgres    false    6            �            1259    17808    WartosciOdzywcze_id_seq    SEQUENCE     �   CREATE SEQUENCE public."WartosciOdzywcze_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."WartosciOdzywcze_id_seq";
       public          postgres    false    207    6                       0    0    WartosciOdzywcze_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public."WartosciOdzywcze_id_seq" OWNED BY public."WartosciOdzywcze".id;
          public          postgres    false    206            �            1259    18678    Zestawy    TABLE     �   CREATE TABLE public."Zestawy" (
    id integer NOT NULL,
    name text NOT NULL,
    price double precision NOT NULL,
    slug text NOT NULL
);
    DROP TABLE public."Zestawy";
       public         heap    postgres    false    6            �            1259    17785    Zestawy_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Zestawy_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Zestawy_id_seq";
       public          postgres    false    209    6                       0    0    Zestawy_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Zestawy_id_seq" OWNED BY public."Zestawy".id;
          public          postgres    false    204            �            1259    17819    _FoodToZestawy    TABLE     ]   CREATE TABLE public."_FoodToZestawy" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);
 $   DROP TABLE public."_FoodToZestawy";
       public         heap    postgres    false    6            �            1259    17760    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);
 &   DROP TABLE public._prisma_migrations;
       public         heap    postgres    false    6            �            1259    19432    rankings    VIEW     �  CREATE VIEW public.rankings AS
 SELECT "Zestawy".id,
    "Zestawy".name,
    "Zestawy".slug,
    "Zestawy".price,
    sum("WartosciOdzywcze"."kcalPorcja") AS kcal,
    sum("WartosciOdzywcze"."bialkoPorcja") AS bialko,
    sum("WartosciOdzywcze"."tluszczePorcja") AS tluszcze,
    sum("WartosciOdzywcze"."tluszczeNasyconePorcja") AS "tluszczeNasycone",
    sum("WartosciOdzywcze"."weglowodanyPorcja") AS weglowodany,
    sum("WartosciOdzywcze"."cukryPorcja") AS cukry,
    sum("WartosciOdzywcze"."blonnikPorcja") AS blonnik,
    sum("WartosciOdzywcze"."solPorcja") AS sol
   FROM (((public."Zestawy"
     JOIN public."_FoodToZestawy" ON (("_FoodToZestawy"."B" = "Zestawy".id)))
     JOIN public."Food" ON (("_FoodToZestawy"."A" = "Food".id)))
     JOIN public."WartosciOdzywcze" ON (("WartosciOdzywcze".id = "Food"."woId")))
  GROUP BY "Zestawy".id, "Zestawy".name, "Zestawy".slug, "Zestawy".price;
    DROP VIEW public.rankings;
       public          postgres    false    207    207    207    208    207    207    207    207    207    207    210    210    209    209    209    209    208    6            �            1259    19424    rankingsmat    MATERIALIZED VIEW     �  CREATE MATERIALIZED VIEW public.rankingsmat AS
 SELECT "Zestawy".id AS zestawid,
    "Zestawy".name AS zestawname,
    "Zestawy".slug AS zestawslug,
    rank() OVER (ORDER BY "Zestawy".price) AS rankprice,
    rank() OVER (ORDER BY (sum("WartosciOdzywcze"."kcalPorcja")) DESC) AS rankkcal,
    rank() OVER (ORDER BY (sum("WartosciOdzywcze"."bialkoPorcja")) DESC) AS rankbialko
   FROM (((public."Zestawy"
     JOIN public."_FoodToZestawy" ON (("_FoodToZestawy"."B" = "Zestawy".id)))
     JOIN public."Food" ON (("_FoodToZestawy"."A" = "Food".id)))
     JOIN public."WartosciOdzywcze" ON (("WartosciOdzywcze".id = "Food"."woId")))
  GROUP BY "Zestawy".id, "Zestawy".name, "Zestawy".price, "Zestawy".slug
  WITH NO DATA;
 +   DROP MATERIALIZED VIEW public.rankingsmat;
       public         heap    postgres    false    209    208    208    207    207    207    210    210    209    209    209    6            V           2604    17779    Category id    DEFAULT     n   ALTER TABLE ONLY public."Category" ALTER COLUMN id SET DEFAULT nextval('public."Category_id_seq"'::regclass);
 <   ALTER TABLE public."Category" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    202    203    203            Y           2604    19065    Food id    DEFAULT     f   ALTER TABLE ONLY public."Food" ALTER COLUMN id SET DEFAULT nextval('public."Food_id_seq"'::regclass);
 8   ALTER TABLE public."Food" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    205    210    210            W           2604    17813    WartosciOdzywcze id    DEFAULT     ~   ALTER TABLE ONLY public."WartosciOdzywcze" ALTER COLUMN id SET DEFAULT nextval('public."WartosciOdzywcze_id_seq"'::regclass);
 D   ALTER TABLE public."WartosciOdzywcze" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    207    206    207            X           2604    18684 
   Zestawy id    DEFAULT     l   ALTER TABLE ONLY public."Zestawy" ALTER COLUMN id SET DEFAULT nextval('public."Zestawy_id_seq"'::regclass);
 ;   ALTER TABLE public."Zestawy" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    204    209    209            �          0    17776    Category 
   TABLE DATA           .   COPY public."Category" (id, name) FROM stdin;
    public          postgres    false    203   �R                 0    19059    Food 
   TABLE DATA           V   COPY public."Food" (id, name, price, "woId", current, "categoryId", slug) FROM stdin;
    public          postgres    false    210   oS       �          0    17810    WartosciOdzywcze 
   TABLE DATA           �  COPY public."WartosciOdzywcze" (id, name, alergeny, kcal100g, "kcalPorcja", "kcalRI", tluszcze100g, "tluszczePorcja", "tluszczeRI", "tluszczeNasycone100g", "tluszczeNasyconePorcja", "tluszczeNasyconeRI", weglowodany100g, "weglowodanyPorcja", "weglowodanyRI", cukry100g, "cukryPorcja", "cukryRI", blonnik100g, "blonnikPorcja", bialko100g, "bialkoPorcja", "bialkoRI", sol100g, "solPorcja", "solRI") FROM stdin;
    public          postgres    false    207   cX                 0    18678    Zestawy 
   TABLE DATA           :   COPY public."Zestawy" (id, name, price, slug) FROM stdin;
    public          postgres    false    209   �l                  0    17819    _FoodToZestawy 
   TABLE DATA           4   COPY public."_FoodToZestawy" ("A", "B") FROM stdin;
    public          postgres    false    208   Sp       �          0    17760    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public          postgres    false    201   �q                  0    0    Category_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Category_id_seq"', 1, false);
          public          postgres    false    202                       0    0    Food_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Food_id_seq"', 1, false);
          public          postgres    false    205                       0    0    WartosciOdzywcze_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."WartosciOdzywcze_id_seq"', 124, true);
          public          postgres    false    206                       0    0    Zestawy_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Zestawy_id_seq"', 27, true);
          public          postgres    false    204            _           2606    17784    Category Category_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Category" DROP CONSTRAINT "Category_pkey";
       public            postgres    false    203            l           2606    19068    Food Food_pkey1 
   CONSTRAINT     Q   ALTER TABLE ONLY public."Food"
    ADD CONSTRAINT "Food_pkey1" PRIMARY KEY (id);
 =   ALTER TABLE ONLY public."Food" DROP CONSTRAINT "Food_pkey1";
       public            postgres    false    210            n           2606    19072    Food Food_slug_key1 
   CONSTRAINT     R   ALTER TABLE ONLY public."Food"
    ADD CONSTRAINT "Food_slug_key1" UNIQUE (slug);
 A   ALTER TABLE ONLY public."Food" DROP CONSTRAINT "Food_slug_key1";
       public            postgres    false    210            b           2606    17818 &   WartosciOdzywcze WartosciOdzywcze_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public."WartosciOdzywcze"
    ADD CONSTRAINT "WartosciOdzywcze_pkey" PRIMARY KEY (id);
 T   ALTER TABLE ONLY public."WartosciOdzywcze" DROP CONSTRAINT "WartosciOdzywcze_pkey";
       public            postgres    false    207            g           2606    18686    Zestawy Zestawy_pkey1 
   CONSTRAINT     W   ALTER TABLE ONLY public."Zestawy"
    ADD CONSTRAINT "Zestawy_pkey1" PRIMARY KEY (id);
 C   ALTER TABLE ONLY public."Zestawy" DROP CONSTRAINT "Zestawy_pkey1";
       public            postgres    false    209            i           2606    18689    Zestawy Zestawy_slug_key1 
   CONSTRAINT     X   ALTER TABLE ONLY public."Zestawy"
    ADD CONSTRAINT "Zestawy_slug_key1" UNIQUE (slug);
 G   ALTER TABLE ONLY public."Zestawy" DROP CONSTRAINT "Zestawy_slug_key1";
       public            postgres    false    209            \           2606    17769 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public            postgres    false    201            ]           1259    17822    Category_name_key    INDEX     Q   CREATE UNIQUE INDEX "Category_name_key" ON public."Category" USING btree (name);
 '   DROP INDEX public."Category_name_key";
       public            postgres    false    203            j           1259    19069    Food_name_idx    INDEX     I   CREATE UNIQUE INDEX "Food_name_idx" ON public."Food" USING btree (name);
 #   DROP INDEX public."Food_name_idx";
       public            postgres    false    210            o           1259    19070    Food_woId_idx    INDEX     K   CREATE UNIQUE INDEX "Food_woId_idx" ON public."Food" USING btree ("woId");
 #   DROP INDEX public."Food_woId_idx";
       public            postgres    false    210            `           1259    17826    WartosciOdzywcze_name_key    INDEX     a   CREATE UNIQUE INDEX "WartosciOdzywcze_name_key" ON public."WartosciOdzywcze" USING btree (name);
 /   DROP INDEX public."WartosciOdzywcze_name_key";
       public            postgres    false    207            e           1259    18687    Zestawy_name_idx    INDEX     O   CREATE UNIQUE INDEX "Zestawy_name_idx" ON public."Zestawy" USING btree (name);
 &   DROP INDEX public."Zestawy_name_idx";
       public            postgres    false    209            c           1259    17827    _FoodToZestawy_AB_unique    INDEX     b   CREATE UNIQUE INDEX "_FoodToZestawy_AB_unique" ON public."_FoodToZestawy" USING btree ("A", "B");
 .   DROP INDEX public."_FoodToZestawy_AB_unique";
       public            postgres    false    208    208            d           1259    17828    _FoodToZestawy_B_index    INDEX     T   CREATE INDEX "_FoodToZestawy_B_index" ON public."_FoodToZestawy" USING btree ("B");
 ,   DROP INDEX public."_FoodToZestawy_B_index";
       public            postgres    false    208            r           2620    18691    Zestawy onzestawyinsertupdate    TRIGGER     �   CREATE TRIGGER onzestawyinsertupdate BEFORE INSERT OR UPDATE ON public."Zestawy" FOR EACH ROW EXECUTE FUNCTION public.refreshranksview();
 8   DROP TRIGGER onzestawyinsertupdate ON public."Zestawy";
       public          postgres    false    209    230            t           2620    19073    Food slug_food    TRIGGER     �   CREATE TRIGGER slug_food BEFORE INSERT OR UPDATE OF name ON public."Food" FOR EACH ROW WHEN (((new.name IS NOT NULL) AND (new.slug IS NULL))) EXECUTE FUNCTION public.set_slug();
 )   DROP TRIGGER slug_food ON public."Food";
       public          postgres    false    229    210    210    210    210            s           2620    18690    Zestawy slug_zestawy    TRIGGER     �   CREATE TRIGGER slug_zestawy BEFORE INSERT OR UPDATE OF name ON public."Zestawy" FOR EACH ROW WHEN (((new.name IS NOT NULL) AND (new.slug IS NULL))) EXECUTE FUNCTION public.set_slug();
 /   DROP TRIGGER slug_zestawy ON public."Zestawy";
       public          postgres    false    209    209    209    229    209            p           2606    19074 $   _FoodToZestawy _FoodToZestawy_A_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."_FoodToZestawy"
    ADD CONSTRAINT "_FoodToZestawy_A_fkey" FOREIGN KEY ("A") REFERENCES public."Food"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 R   ALTER TABLE ONLY public."_FoodToZestawy" DROP CONSTRAINT "_FoodToZestawy_A_fkey";
       public          postgres    false    208    2924    210            q           2606    19079 $   _FoodToZestawy _FoodToZestawy_B_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."_FoodToZestawy"
    ADD CONSTRAINT "_FoodToZestawy_B_fkey" FOREIGN KEY ("B") REFERENCES public."Zestawy"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 R   ALTER TABLE ONLY public."_FoodToZestawy" DROP CONSTRAINT "_FoodToZestawy_B_fkey";
       public          postgres    false    209    208    2919                       0    19424    rankingsmat    MATERIALIZED VIEW DATA     .   REFRESH MATERIALIZED VIEW public.rankingsmat;
          public          postgres    false    211    3077            �   f   x�3�t*-JO-�T�T/J,��2��.-J�J���2��H,(�T�MM��2�t+�,��*L�OI��L9}�S@:SR��Fp�q�%�g�r�s���r��qqq  �         �  x���͎�6���S�����z�ٺ	�A(z�eƫ胆(Օ��٧(z�-�{u�!�q6��lp~�r8Ck.��K��=oES�bK^v��P�^(IЀj-E�3E��ptR�����WB(�ܳ/�w��Ap���<�TU:���ZZg�ڑ5/˯tS�h�K\�u�ZN����V���fl��Wr{���nBa��tV	F�"t_�㣋"��C%��ƒ��+��'=��p#�M#P���Eޚ5�rd�����Q��*�e�
�oOL���5�o�^|�G�볖��w��I��	�]�v� ���{Ĳ����2ږ��0[P�j��GU}����E���{-K��#�^�����m�0Ho*Ŭ�(D>��l8c���}/ZA\$�Ft[�+5W:p�R��)�R����8��Xb�Bv�4zV,qb�&�q_}�P
2@���"3QR����Yc8��x)���L����O�݌��l�Ĺqzk��v��[
���U��P������^��{2�ɖC&!�;jNnǾ�yM^�q��Ea e�G�����e��28�N�"E,�q��~rּ��>�r�+���0��L�ӝ,�I������Q�&ю��ʙ�;�i�CO�7��G,�O42pˊ���в�"�Y����	�,����岌��4w��Vb��!�L��N��������Oh{6`(S����m-��;'��c�\AGIc�Â  �����'Z���Mu�P��W��)���'����^"	4�z$o�Q����ߒ�v�_�>H��f�������r�M���m��'S�y�=9�x�+.��YԲ�ۋ�e�r>kw��ɝw�ߓ3��؅܁wUS]f.xB�L���ߖ�ƞ�2��W���R��^6����yo��� m��mzJw���~��1�����S���~,��"E?�\:K���"�9.���ji�,
{��+��4m�,�&˻����(��Ҽ�)z����r�B�Mw֭R��#m��p�`}����)c!�5�`�W�m��ؑ�1��bA��.����p��K�i4�QSdE�V��t��>HZj[	6��"��/sdK����R�.���!z��S\�3�p����q��-̝S9�6�m�FOCty�&Z/��'T��p;r#��o�X����h�n�cx�a&�m��Ġ���o��eb��:��c���씒�X�
3�x��L0#���������k��      �      x��[�n$ב]g~E�<������Nm��i7��x�]LwgYE�4k)�>b��``0[�l��Dܬ"�TKQj2�*^7'"�\�����a�v��}�/|
�E���J��EX���/B�g���+m���z<���F�p�Bu���q7�qHQ(�G�2	��H������0	�Fh�r��E(}��Cߖ��|z[]K��'! �w[�����<F}����<��?.Z׋�+<�m�X\,���W*tڎ�i�"��������Q�0��@I�b,a��/��1���f�?d�A�s�,�A�~��kP<� [yuF:��֋؝���+�Żi��$��"��ރ����l�����8���B	������e[�n�n��ߦ���@��}�����B-��bu����q���SjM���ϕ��̴Z�V�$��5i����z?���´�w��+�t�t���j�������0�D�/���N.�x��=N������B����כÛ�QM��S(7L���DR��7_�a��+%1%�U�K1��c�jsy�����S�w����%����t�v�]zi�@2�,z���"H��J�lv�G<Z�6�<��b� �
!"+d�M���@��GF.�<�W��])�X~�n��˫aw�<���L������w՗���8�Ⱥ���s�G��ri�T$"Hh�1����'\�Ͽ��)]�9>�6�����ß��ö�X'т��.���(��L��~�l�˼)Ҋg���p���_jS�/vAց���	�V9PK|W=�/N��5�#��b�L8_�ڎ����8yf�'Ҫ��#�y�x�
�I/��D5#N�ʈ��H[��j��c��G��sp�Z���x8�"�4{�֯7���u]���n��%��/¦���U �"�Df>�65�
sK���pB�'��i=�ݎ{Ў-�Y���h:	,0�|8J$�FǑ�։K�R'� lK�6��߼=l����g��͸]mn�M��v�i|_��A޽���������qy<@8OSh5�!�IM�����n��@�g�R��R��o��a���#*�%���A�e�e���j��(�4�xC*%qd/�X�������U�/c�;����/X��#����(�r�(�&p(4���J����U���S욇�<�,����\@:���3v��"Pd����+�-?����V����5})M�2+�����C=��`�H8��ȃ����C��d�Ȃ.��$2��Dab�a��W�!j�+l���jEŦ���X]���v\�5$DC��֗��M �2�#S���e�t�3�n)I��fy�����������M�q�37sp�y�UH5K��5��e)E��כݾ�^M"��]M�T�΀ U�mdw@��&�qz>�Eh���+����n�a����ƌJ���RR�7T�c�b�d@U/���tS �2�3��I|D�,Ad	����h�!�Ĳʲ�~�,��@ue D�8��OӺ�~7�_m��")�"�|�^Ӑf6�o�d0�)��wf"�C.b3�N��jk���\ ��@�g^��+�ྃ]�W�+Mg
	4���\�d;��s�"��%>�j8��Q} �s��f� ��3v_��q�Ө	��MG �{��?-�q]X_P�N fz)��^�@�����:l��6�Ĉ_7��֭�Y���9=���U��\�[zH��aK�c����>=��@�(�óx|>Ł�)-���T$�E�.��SS
Pz�N�js����ǽ�	�J~����;��~h!l�����I��a�"�V�EȎ3�#S�Md��H��^�Q*PP�.LfLZZ.�eDK�ܡ�#�>��������G�l�±� Ji��TK'f^�EB��s+�V�p��rN�jhQD("z:q �F�$�]( �1���D �4hp��<��)U%@"؄S��td��S����)*�NB>�+��������a=!#dL/���i9��$'�'���<Ӑ<�����E�;u�~)�''s��ܧy?0�k0O����\�=�C�-�g�.�{_��|�v�iM��ĎU�C�9$&�C�����;Z�i����M$Hū�a)9�(IXDU�QhנS1;9b
	�1D
�x�iU]C����b{�W����B�g-Ӫ�,>��$7-�
%�|�T�P �R�8���f�����z�Y�Z�e�XA�l&�r�V[T�wc�"B��e���Aڜ�[|��4ǇJ�m9�ԺW�>�Z�R��r���<��<�\,Q�g2�y�$���@��2iS���V���4���=\']O�-<�e�1^`(�Iv<#�'�!���/ �Ûa�f\F���9K���P=B�M�GvJ�1���i�'
t�����Ćf��:�3isN�[�gl�v�&F9���٭WF����;R���t-������L����Ԭ�!{�op_�K$���Ӹ��'�$�:�_Z$�W�<�㜖�4�є�FQ��+��/�q��n��v����xY�AR��7	�<��H���W����lio���Su�rd<GѦ�9�f;�/�W�n7���i�Gx:W�V��i�iǧ�eп��^y�"m��tu�����Y��l�1�S9�_�G�|�ig>R^�'!�=B�Е����w�RK�/��|b�B��2��SШk��tDbZ S��ʪ"E�k�W���j��)�u}����3���:��^2�U�=�g^�[H�u�X���F �^W�o�q_�b�����:�xWUhA	9�p�-���U��e���"O:fo��":9Ҧ���4w-j��8�Q�d*~���s��`��E@�^�O�7�u����ܿח�����\�پfTG��:0�4J�羖���Iwr�'C*%�=�-=�� �t����y1A���)���,��b�P��?Ǯy���(��p�B�q?��wbB�Cyo��3��&�5�};��ˀ&�h2�7��.�D�eXD��:7�s�6Mf�.�="�����3����.Llѣow�:�%��R[��\bh��V��V���յ���j���;I�'�)+��x��]t�dco�3,QD(�N��u�ڙj��Y@��^	��G���v��v5����l���\��ż�7���>�N�j��إp�i!V药N�b�-zݔ��xΛ��=3qTl��&d
���c��W���Yvw7+��唡}�vb>�V�%��ڬ�'��g�ƴN��c-���u?E�ϹFر&�j,/u�L��J���(��D�ѓGϔ������"���Y�Z�rA�����$��YV��5�m=H��G���6�L{}��-�C�e?r��4��A���8 �9�=OC�y;�4;S���]���_v�Ɔ��]���hk���dS���(��)�ӯ�Y1t٦�$���x� ��8#N�sIf�X�K�#�a�&��vfg��\���/����&�1�a%��5��6;��p��1?ӟ��)�G��7\��9yc\�)f5f(��Eg^[�s�i9Ʈx�nX��\���Сj���`��`��ؠ��M��\G��zH6�����a��������{r,tC��pcO���6΁�����b�T�rn�Ù���v�-*�B�ۓ���-���"ns��j����=��LQ�@��|��\�����nO�z��-�oW�	��#�''z�%h���sZ��2��3=E%����]�3��Ǔz��Ӱۯ6��V6����@��<1q�c�7�n=�5�"��%@ؐO*^m����V�W��:lwua�(jnGtg����T!��?�|��~x�Y����G�cd"�z~}Z`x�)5��<�m������}[vm1O�o�S�"7�rb��08e}W��Dg�J5e���p���"N�"ߢ9�r`���fj>�Q�&�Ϋi�<�O�i�Nw�7�jX��ؚ1�]�������$��v7Hp�KUoE��lG|�e	q����;7[5�}]|u@�"a��1�ճ���C���|�7��,�ga�~�n���kT���o1���A%J���5{=Q&�X���|g9���Y�   c���d8Dd��$]����r�V�͍��`��`cw7n2?�u*�Oi���X��n�FH
���e�>�P]m.�@Xm7��:��~�>s�G�U�n
��8�^�K����!&���%S�oWCu��v��f��f�sǬ��,� �V(��
Ny�5Ki6n�Ѭn���.0Xd7��\�6�P�����\���kk��3)b~�4��7E��x5����t��f�;�.��g��q�%E-�!��t�%���j��s��F�A���u�����y�������q+�`��ذ��&���=��t�`N��M"]�[BF ��$eoICs�.[�pCV�\i�Ԟ]�Q����Խ}�1Q3�v<��\��"
&�K'��b��w���v�n�!3���V�)L5V��/�ci;?ǻ*������	7W��j7\���0�w	[ݸ��#��	��(ɨq�ڟ�9��*��q��M�
,hv{������T����-�`�xe�c�h��+tV��^�hl웹[X�i'��vux��;�ū A'<�81��r��"�=9��ֳ�(��GխXrw��1_D���;�#�[G^Nrz	s��RE`�Fz���� �s�;+�qq���3�|�(�^/�m�����)S�z���{��x��|������J�=�fۤ�`[�c�X�7�Kl� ؝*�Լc3��V����|����ju������/E|�Z�-~�\������@���
��'�y��	;�҄ˆb��1-	����O���CJ�.�}��h��]�����J
[�G�:^��*n�:�J���pe������i��%.꾜n��u��˱�z����5)f�)s�����b�	�ۧɟ3�5 �?���<x�����}��%m�W�ޣ{�<}���R<|Z���
79��	����j�<To\�X�&�8����~J�K�+T�a;����8��x�����?��Z��og��s{�ļ�#?��N���D��~;n����nr�9��
�s¾g��;w�E�K,+is�n�p���?�eY��sL         �  x��V�r�0][_�;eb��c�0Ё	0-��������Nɾ�����_�v�%��qYe�{���Ȗ��_X�	w�"�en��2LY��|��yf~�w�ӏuuȳ�aۓ�H��aځp^�p�A�� �Wy]�I��+�*6F"j�6�߆�Ì�'aU�t=`�$v�c��#���W仍#�)3��*߇I��Ѳ.�\�a�{�}���,��\�]�k%R�#��ٟ�Pg�/���|�b���0t��ۢd)�{�5���c�y]�to^lˈ�=�Y�S�x�5W5W5�6hIٚ��^Л2,�W:�;����N�3�����LH��)�H��HF�c�4�j&oީo��i���r[�O|�o���Ӄ�9ē��^i�,�'��4R�`kl/Y�����廨���@�l����ߜ�,[��2m�:l&��9��ٴHlc��������m��m��p�.o'k�d*�+`���GVp.�5Tr�#2=��Z!��z�m� lDH/c��~0#b��a;C��ӏLE瘍�̆�UR����R��{Vp"�=/,����;D|M&��� "�&�`Ա{
$\P�!�d�=�]�&c�~f�F�����$�p!��&�y3㪉�x�����O��|U�7�0���T�����[|�w�
� �<O��p�'!�<�͞��5�T(�}�C�	Z�q�����}i
��>��-cx��Q�����F��ƛ0	��+?}j���MY�cm���J���i�@�&>��-.��HJ��=T��6��v��,��0��z�g�[�����.��l��u��a��f�^�3C� �z;�Fy�����	�ί�>鍏hp�5���?����݉%ժ.�)/��u��Y�%�����l�T�<K^�{��k�6Ȥ�S�Y�ҧ/�����ơ���i�o_'���~�          ]  x�-�˕ !�c0�D�`.��]�^2����-s�o���w&P��+��'�q����j��j�����D.�ZGY���j<W=���)��ǩ|�_I<��-�-��sK�0q��'�I��Ƥ�8�ʁ��r[��y�"��٭��%D��Rk�;a�kVA�C�ӳ &���ʹ�V�jq���眄 #H�����1�zo�S�SD.�)�w��G$�����JF�,�nt�M����d,��Xm,�c-���8s�9վ)SS�/�3�Y���(���fy��e���j[��1i������"a^�=����q:c=ѳe���Fez�ry��5i����M�鷛������ ���<      �   �   x�e�]JD1F��]żK/m���.�M������ǎ��BޒC��Oh-U3L��'��ͭC��6DC��P�֢`�y�qѶ�
i�D�,c���R��AL���r����?�A ���/�������
M�\�MDº%�9SEIqD*�n�����J	Z�f��<2a}��v����u�h��e�^�RiS��I�.Nг�Aи�_�W%�޺�����}̿�x]�-����� �`?     