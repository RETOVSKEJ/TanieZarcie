PGDMP         "         
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
          public          postgres    false    205            �            1259    17810    WartosciOdzywcze    TABLE     �  CREATE TABLE public."WartosciOdzywcze" (
    id integer NOT NULL,
    name text NOT NULL,
    alergeny text,
    kcal100g numeric(5,2),
    "kcalPorcja" numeric(5,2) NOT NULL,
    "kcalRI" numeric(5,2) NOT NULL,
    tluszcze100g numeric(5,2),
    "tluszczePorcja" numeric(5,2) NOT NULL,
    "tluszczeRI" double precision NOT NULL,
    "tluszczeNasycone100g" numeric(5,2),
    "tluszczeNasyconePorcja" numeric(5,2) NOT NULL,
    "tluszczeNasyconeRI" numeric(5,2) NOT NULL,
    weglowodany100g numeric(5,2),
    "weglowodanyPorcja" numeric(5,2) NOT NULL,
    "weglowodanyRI" numeric(5,2) NOT NULL,
    cukry100g numeric(5,2),
    "cukryPorcja" numeric(5,2) NOT NULL,
    "cukryRI" numeric(5,2) NOT NULL,
    blonnik100g numeric(5,2),
    "blonnikPorcja" numeric(5,2) NOT NULL,
    bialko100g numeric(5,2),
    "bialkoPorcja" numeric(5,2) NOT NULL,
    "bialkoRI" numeric(5,2) NOT NULL,
    sol100g numeric(5,2),
    "solPorcja" numeric(5,2) NOT NULL,
    "solRI" numeric(5,2) NOT NULL
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
       public         heap    postgres    false    6            �            1259    19110    rankings    VIEW     �  CREATE VIEW public.rankings AS
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
       public          postgres    false    207    210    210    209    209    209    209    208    208    207    207    207    207    207    207    207    207    6            �            1259    19102    rankingsmat    MATERIALIZED VIEW     �  CREATE MATERIALIZED VIEW public.rankingsmat AS
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
       public         heap    postgres    false    208    207    207    207    210    210    209    209    209    209    208    6            V           2604    17779    Category id    DEFAULT     n   ALTER TABLE ONLY public."Category" ALTER COLUMN id SET DEFAULT nextval('public."Category_id_seq"'::regclass);
 <   ALTER TABLE public."Category" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    203    202    203            Y           2604    19065    Food id    DEFAULT     f   ALTER TABLE ONLY public."Food" ALTER COLUMN id SET DEFAULT nextval('public."Food_id_seq"'::regclass);
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
    public          postgres    false    210   S       �          0    17810    WartosciOdzywcze 
   TABLE DATA           �  COPY public."WartosciOdzywcze" (id, name, alergeny, kcal100g, "kcalPorcja", "kcalRI", tluszcze100g, "tluszczePorcja", "tluszczeRI", "tluszczeNasycone100g", "tluszczeNasyconePorcja", "tluszczeNasyconeRI", weglowodany100g, "weglowodanyPorcja", "weglowodanyRI", cukry100g, "cukryPorcja", "cukryRI", blonnik100g, "blonnikPorcja", bialko100g, "bialkoPorcja", "bialkoRI", sol100g, "solPorcja", "solRI") FROM stdin;
    public          postgres    false    207   X                 0    18678    Zestawy 
   TABLE DATA           :   COPY public."Zestawy" (id, name, price, slug) FROM stdin;
    public          postgres    false    209   n                  0    17819    _FoodToZestawy 
   TABLE DATA           4   COPY public."_FoodToZestawy" ("A", "B") FROM stdin;
    public          postgres    false    208   �q       �          0    17760    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public          postgres    false    201   >s                  0    0    Category_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Category_id_seq"', 1, false);
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
       public          postgres    false    230    209            t           2620    19073    Food slug_food    TRIGGER     �   CREATE TRIGGER slug_food BEFORE INSERT OR UPDATE OF name ON public."Food" FOR EACH ROW WHEN (((new.name IS NOT NULL) AND (new.slug IS NULL))) EXECUTE FUNCTION public.set_slug();
 )   DROP TRIGGER slug_food ON public."Food";
       public          postgres    false    210    210    210    229    210            s           2620    18690    Zestawy slug_zestawy    TRIGGER     �   CREATE TRIGGER slug_zestawy BEFORE INSERT OR UPDATE OF name ON public."Zestawy" FOR EACH ROW WHEN (((new.name IS NOT NULL) AND (new.slug IS NULL))) EXECUTE FUNCTION public.set_slug();
 /   DROP TRIGGER slug_zestawy ON public."Zestawy";
       public          postgres    false    229    209    209    209    209            p           2606    19074 $   _FoodToZestawy _FoodToZestawy_A_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."_FoodToZestawy"
    ADD CONSTRAINT "_FoodToZestawy_A_fkey" FOREIGN KEY ("A") REFERENCES public."Food"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 R   ALTER TABLE ONLY public."_FoodToZestawy" DROP CONSTRAINT "_FoodToZestawy_A_fkey";
       public          postgres    false    208    210    2924            q           2606    19079 $   _FoodToZestawy _FoodToZestawy_B_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."_FoodToZestawy"
    ADD CONSTRAINT "_FoodToZestawy_B_fkey" FOREIGN KEY ("B") REFERENCES public."Zestawy"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 R   ALTER TABLE ONLY public."_FoodToZestawy" DROP CONSTRAINT "_FoodToZestawy_B_fkey";
       public          postgres    false    209    208    2919                       0    19102    rankingsmat    MATERIALIZED VIEW DATA     .   REFRESH MATERIALIZED VIEW public.rankingsmat;
          public          postgres    false    211    3077            �   f   x�3�t*-JO-�T�T/J,��2��.-J�J���2��H,(�T�MM��2�t+�,��*L�OI��L9}�S@:SR��Fp�q�%�g�r�s���r��qqq  �         �  x���͎�6���S�����z�ٺ	�A(z�eƫ胆(Օ��٧(z�-�{u�!�q6��lp~�r8Ck.��K��=oES�bK^v��P�^(IЀj-E�3E��ptR�����WB(�ܳ/�w��Ap���<�TU:���ZZg�ڑ5/˯tS�h�K\�u�ZN����V���fl��Wr{���nBa��tV	F�"t_�㣋"��C%��ƒ��+��'=��p#�M#P���Eޚ5�rd�����Q��*�e�
�oOL���5�o�^|�G�볖��w��I��	�]�v� ���{Ĳ����2ږ��0[P�j��GU}����E���{-K��#�^�����m�0Ho*Ŭ�(D>��l8c���}/ZA\$�Ft[�+5W:p�R��)�R����8��Xb�Bv�4zV,qb�&�q_}�P
2@���"3QR����Yc8��x)���L����O�݌��l�Ĺqzk��v��[
���U��P������^��{2�ɖC&!�;jNnǾ�yM^�q��Ea e�G�����e��28�N�"E,�q��~rּ��>�r�+���0��L�ӝ,�I������Q�&ю��ʙ�;�i�CO�7��G,�O42pˊ���в�"�Y����	�,����岌��4w��Vb��!�L��N��������Oh{6`(S����m-��;'��c�\AGIc�Â  �����'Z���Mu�P��W��)���'����^"	4�z$o�Q����ߒ�v�_�>H��f�������r�M���m��'S�y�=9�x�+.��YԲ�ۋ�e�r>kw��ɝw�ߓ3��؅܁wUS]f.xB�L���ߖ�ƞ�2��W���R��^6����yo��� m��mzJw���~��1�����S���~,��"E?�\:K���"�9.���ji�,
{��+��4m�,�&˻����(��Ҽ�)z����r�B�Mw֭R��#m��p�`}����)c!�5�`�W�m��ؑ�1��bA��.����p��K�i4�QSdE�V��t��>HZj[	6��"��/sdK����R�.���!z��S\�3�p����q��-̝S9�6�m�FOCty�&Z/��'T��p;r#��o�X����h�n�cx�a&�m��Ġ���o��eb��:��c���씒�X�
3�x��L0#���������k��      �      x��\ݎ��u�&��W�c`'�?+�[kǫ���"��zh���A�`2})d"�;0r�x�RUߩ����H^ 7T��M~u���R���p�f�y;n�?���Z^�m%�
��x�/d8�]V*|Q���J������v"��qч�K�qO��GnP��Żq܎�Ѹ?~k�=L����2
�Z�r�	� ��S����?�+Ȁ�V�����rXD0x��h	�W\��+�� 3�G���	��Dٽ���+E���r���~��l�G18�/:,5�����Qag��u����yO�#!m�M�.T8���okS�0��xO/�bВ�$�wBe5iŴM���p��OC���62n^�y�x7-��*��Ҁ�\�?R��IB"�2�0�Wf~`��pS�Iϑ�j[�n�nǿ�e�|��@:�)�,��֥HK�<�0y��g�*QPq%���:;`�{ob�rI`,����SrdL;ݱ�t�.0�YcUe/�q����x�v�+��p��8�d�ѳ���iv$��eh�Y4j�_����_��o�Gl��1y�FaW,x���3O�(�<��x�7�l+YC-D�������o��~u\�V����@t�o�_�ֶ/hT�L�����-��V��dݎ��R��#H���ƻ;�W������Ń ?!���q�M|Bީ���')B-����i��������+�f;�����v�Y�eD�����j�Qc #��+���t���t��+�����/�)�����q�^5�_��c|,m|��0l/�cT��t2~B˸-��f���N�M>�v�^��Z�����a�-l4�7�۠�!hU���½���ʔ)%$���[]��2�$���f���7� D���.�D���Ldp�
���2at�x�-d#�,5���e0X��V����Ь��cܯz/���	N^��ms�����D���F�m���oo��專�h`�l�`P�6�]����p?-9���0�Z���nZ�o7�. і�)��=�Bx�\n���9�LB"Z<QrPdk}\� ���� ����~�[߭�Z�o��r}w߬�մ]N���0��������>췇�aP�	u��:��^đ�Tgu�s�L{�	1-��8������0��S��6��`d�E�`-R����ٲ�!h�_��kj)�dj����߾wۦ��n����?"a _��~�£�x.��$��P��y��o�K&LqV��H��\j�΢�N�I
~Y����<���R#|��C���C���(��������?7�t' u�l�\ E�)�49��Y�E:mQ�1�, �bz||N��=��#�H��ag �1+En���1d��cpD���l�1vU��cs3l�ƻqq�a�^U�(b�p8�G�p,���'�QFK�W�ˆ�� 3�dq�������&��"�����3X����By�M�81w8M�!ϳ�7�������i^M^*�f95S�:E��c���e��@���\����nH(d7����Y���7�C���)<A:͐q|΃$D��e 	�	�s�%"��B]������5~�U��%Y9\�X�!f�Y#Ӊ��<���Jq+��b��U��3�U�/��Ӵj���kT�˖�s�X���J��䮪�B�T�0X���Ξ�򂌒�'���`�I�CNN���B�}�!?q�;�����vV�A�Gq�s<�R�	�'$��Cp臈to8�
���G�B��q2�<@rq��Cr��d� C�@~3ln��ԥZpW��J,����`!$n~��$�gd�6H[���\Af
��}�~������a}��wG�>%�=�l������,Gi籵%����z�L�U]�����C��Q�D��K���(��Efa��9��5<X��h�I��xP��"8�(������4l|p�#AR�ޕ-v��ݟ8j���?�����z���n�UJ�=�;Y�@�g�4�ӌu�G`<�(���9>OD lٿ�-�Q��$���{�s"���:^V����(�)a%J�n��በ,���$�4���Cƛ�2�e(�fx9M�l^��@td��� �E��m�\$iEL6(&Md��JZ|�9��k4!at.2�R�7����<�V"�Ν��DQi�ֲz���4\�)p{*�x��jZ�!	d>�΢x��@BY���:.[M\�k�1F���2������Xg� �E�j�7oa,Z�e|�f��RN�T=F��c#zQ��Z�g�MV7��>Pt���OA�K��]�BC�͹Bw�X��0�pV�dz�M��zXx/u���C����#�N` ���J�|���eo����P��(*�ؖ9�6�pk�U�l�w�xn��ğT+d�����R���?�Ȗ�8&{yM�v�vSA@6�y���V�Hx0��B�P�@��K}� *�d�k��:*c�>!������ѰxɣВ��j8��&��O��(�u.��@T
o�vշ^�����rKZg*!��[��9�m�,�+w�'��CgP��>|���������,,ԂW�xeUr�dUbb��נg�����C�ǈ��Ͱy3.�#�	��mN��#��Ku�W��:��J�)���Pn|^�6W���9�G`��Y��I�:��Q�6�����jFT�/FE0��z�Z�Rs�as'"5P��a�.?��W^C���kGy����Ǜi�+��� �T3�1��#���_{Ћ����;S��4��g��a��6��Űn���0^5���!"�y����+�ƀ�c��Hڲ��� �mP�NZ�A���2��l��U��z�n'4��?қ�ॎ
�����Zm���RH�ܛ �A�"�:U!�YW�Xo�����0�!��Ƭ�G-tj����y+�:�<���F�GO=�ڄ����iq�+l�9�bc�iSvҳ�H�B�a6�Č�*؎���JS
�,��������z�d_8�3�x���)��ҕ����5�(�)wQ���M�_�z�s�о�#��q�5�nn���"�1 HRQ���0J 2�������"����3Y�cU*�(�vSW�oO�E@�+V�x
m����H�|�����>���;�O��q��	����ո�6*֪a0����y�ɦBNN���H��̻v6�����^��j�]>��c��ܸaI%m�-�t�QHv���C��!:���GAv� -x67 �q_Ռu591��(?k���5�.Ʊ���m|�v��LK���l�ȧ��U��3�хi�[��K�~}�%P0f��981�N	���$Q��2��F��=��ɀ�;蜭^��Bs{3,�͝��C6w�y�v}=����^|�|=�H�#M�X�eb�ȅ���Q���o.��Xc���"�r�Ti��z�g@�m���p�̐�d7�v@Bk�bS���� %��}�7�?�y�̇>!��aSt�>x�2Tv������l�ƥ%]��WTɜ�>��K��(K��ikCg���f�(�����c~9��	�^}�i�SQNE���D��,C�������$���U�+>o3=��4�[��u����Ff�H�p#�0ԕd��QO�,�u�˺C`��czDs$&�4R�����0�V=[Q��9C\,�fh���JpF�8���7��`A.J3��S��`:EeUV��e�.�㽈%�Nn��˸���?lY�Ԭ2T�b;ث��>͢�^̵/ƌ)��>�Pq�&�˵5���Sf@A ����s�&6ty�ޒz�l�9�-3��,ig�ۤB�T��ҕYu3:>yw<5�2���b��rsN39��jF��MY���81G�4�Kܤ��hLuv,�R�}ʞd��&͒aS:Ҭ�z�nX�yEa�:B��'j=�4\��N�]���v6��cC�����Uy�qF=`t��*���=w	:#���s�0�Z��bO-TsN��T a��JA�~� �:01�v�z���^��`rNzF��0���A"���K�TzD*�x!"�p�׍d3qY�)�G����La_��a*3��a1��I�g��}�IQ}
#�#�:�}��9"�rϒ# �  u~�^W/�a�[�1��Qm���;{���^-�ų�����n*1�齈J*S�Z�LW���x{V'.3LqH8�����.󅤽M5�6uo$���#e�X�}����~��r��{L]48�h�=�����ӱ���$��-24�&"m��*7&UfYM�^�:S�+E���Y\�ގ�L�{&���}_�n7�aVΫIz�������:~�ds��M�v��^�p�r��q[�c"�vZ��*��B�y��*��;�Wl8�+�T�m�T�/C�QA�65�����g���ɨ�=�����5I�|��Q8��32����Љ�1�^����NT(w4w��%��Y�C1�as[��*�.6h��B&$`�??=��O�1�bXbzxZ�����s�Ǵx7^]�f�����,�X���4񯲂���kT��*l@*��j���7j>��	�������z}fB����y��C1�){�w���}��e`V��O�9��"D�<�o��C���n�J�(���`��1�Y|���J���������0�Q�l���]"'&�R��i�.d��H�dqlD#��Y�S9��o"�����M���U��%ެJ>�?�ē?�����B5�����:Р�_ɓD0���&?��#�v��.ߢp5�<hQC\U�>OY���l�x���Mc��y_���Z����y��cr���6�{�P:b��-4�`kG|����EPd�\r��dKq���H|R-@:�\�s�c<���A��������m��͟��Ѵm���iV���`���gMRsc��4�$�[�D�7E����pu���xҖy�2��_O���!� g��wF���#�7���J��ΣA��'�����f�n�F��M|;X�^�c����+������Z�!N��[����a�3��,6�O��%P�?��>�6�yn�=�O%� �EL��4w~�q��k5��/J�����qA߶�6jT��e��7��.|���#��Jq�=Zޱ�jf����M/���o��yGW�X/��^��'&_��uvYs>E�8��f��zj�<�����8��yH4���E�kN}R� �܏ᑂY<	�W��_�3�� 9�߽/	xx(�i,?ˡ.���K�#�?����P�Xa"���2�ꏟ�F�/��ыUaE��c�T|��vc)��Z�SH�;zr��I��p�5��w5��'à����(�\�>�%F�`�#pؐ�@0��!ڱ���*���^N��������|?�����vDC9ς�!6sw<���]��aq�����֞DV^�V��*�ݸ�<�l_��ڬ�O��\���<^����W���ո�Ë
�������r��7o���j�'�ϙ���F��W��!�6��.yh�+���)-e����,� g$��'U-�ҟg�����K�����o�͛a���3��7�����Oc��	΋9c��������h�&P)_/uTD��?^�u��c��         �  x��V�r�0][_�;eb��c�0Ё	0-��������Nɾ�����_�v�%��qYe�{���Ȗ��_X�	w�"�en��2LY��|��yf~�w�ӏuuȳ�aۓ�H��aځp^�p�A�� �Wy]�I��+�*6F"j�6�߆�Ì�'aU�t=`�$v�c��#���W仍#�)3��*߇I��Ѳ.�\�a�{�}���,��\�]�k%R�#��ٟ�Pg�/���|�b���0t��ۢd)�{�5���c�y]�to^lˈ�=�Y�S�x�5W5W5�6hIٚ��^Л2,�W:�;����N�3�����LH��)�H��HF�c�4�j&oީo��i���r[�O|�o���Ӄ�9ē��^i�,�'��4R�`kl/Y�����廨���@�l����ߜ�,[��2m�:l&��9��ٴHlc��������m��m��p�.o'k�d*�+`���GVp.�5Tr�#2=��Z!��z�m� lDH/c��~0#b��a;C��ӏLE瘍�̆�UR����R��{Vp"�=/,����;D|M&��� "�&�`Ա{
$\P�!�d�=�]�&c�~f�F�����$�p!��&�y3㪉�x�����O��|U�7�0���T�����[|�w�
� �<O��p�'!�<�͞��5�T(�}�C�	Z�q�����}i
��>��-cx��Q�����F��ƛ0	��+?}j���MY�cm���J���i�@�&>��-.��HJ��=T��6��v��,��0��z�g�[�����.��l��u��a��f�^�3C� �z;�Fy�����	�ί�>鍏hp�5���?����݉%ժ.�)/��u��Y�%�����l�T�<K^�{��k�6Ȥ�S�Y�ҧ/�����ơ���i�o_'���~�          ]  x�-�˕ !�c0�D�`.��]�^2����-s�o���w&P��+��'�q����j��j�����D.�ZGY���j<W=���)��ǩ|�_I<��-�-��sK�0q��'�I��Ƥ�8�ʁ��r[��y�"��٭��%D��Rk�;a�kVA�C�ӳ &���ʹ�V�jq���眄 #H�����1�zo�S�SD.�)�w��G$�����JF�,�nt�M����d,��Xm,�c-���8s�9վ)SS�/�3�Y���(���fy��e���j[��1i������"a^�=����q:c=ѳe���Fez�ry��5i����M�鷛������ ���<      �   �   x�e�]JD1F��]żK/m���.�M������ǎ��BޒC��Oh-U3L��'��ͭC��6DC��P�֢`�y�qѶ�
i�D�,c���R��AL���r����?�A ���/�������
M�\�MDº%�9SEIqD*�n�����J	Z�f��<2a}��v����u�h��e�^�RiS��I�.Nг�Aи�_�W%�޺�����}̿�x]�-����� �`?     