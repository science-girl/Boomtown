--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE boomtowndb;
ALTER ROLE boomtowndb WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'md597458482c4d7eb52494598174cde9a71';
CREATE ROLE lindsey;
ALTER ROLE lindsey WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN NOREPLICATION NOBYPASSRLS;
CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS;






--
-- Database creation
--

CREATE DATABASE boomtowndb WITH TEMPLATE = template0 OWNER = lindsey;
GRANT ALL ON DATABASE boomtowndb TO boomtowndb;
CREATE DATABASE lindsey WITH TEMPLATE = template0 OWNER = lindsey;
REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


\connect boomtowndb

SET default_transaction_read_only = off;

--
-- PostgreSQL database dump
--

-- Dumped from database version 10.1
-- Dumped by pg_dump version 10.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: items; Type: TABLE; Schema: public; Owner: boomtowndb
--

CREATE TABLE items (
    id integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    itemowner text,
    borrower text,
    imageurl text,
    created date DEFAULT now(),
    CONSTRAINT no_owner_borrower CHECK ((borrower <> itemowner))
);


ALTER TABLE items OWNER TO boomtowndb;

--
-- Name: items_itemid_seq; Type: SEQUENCE; Schema: public; Owner: boomtowndb
--

CREATE SEQUENCE items_itemid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE items_itemid_seq OWNER TO boomtowndb;

--
-- Name: items_itemid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: boomtowndb
--

ALTER SEQUENCE items_itemid_seq OWNED BY items.id;


--
-- Name: itemtags; Type: TABLE; Schema: public; Owner: boomtowndb
--

CREATE TABLE itemtags (
    itemid integer,
    tagid integer
);


ALTER TABLE itemtags OWNER TO boomtowndb;

--
-- Name: tags; Type: TABLE; Schema: public; Owner: boomtowndb
--

CREATE TABLE tags (
    id integer NOT NULL,
    title text NOT NULL
);


ALTER TABLE tags OWNER TO boomtowndb;

--
-- Name: tags_id_seq; Type: SEQUENCE; Schema: public; Owner: boomtowndb
--

CREATE SEQUENCE tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tags_id_seq OWNER TO boomtowndb;

--
-- Name: tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: boomtowndb
--

ALTER SEQUENCE tags_id_seq OWNED BY tags.id;


--
-- Name: items id; Type: DEFAULT; Schema: public; Owner: boomtowndb
--

ALTER TABLE ONLY items ALTER COLUMN id SET DEFAULT nextval('items_itemid_seq'::regclass);


--
-- Name: tags id; Type: DEFAULT; Schema: public; Owner: boomtowndb
--

ALTER TABLE ONLY tags ALTER COLUMN id SET DEFAULT nextval('tags_id_seq'::regclass);


--
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: boomtowndb
--

COPY items (id, title, description, itemowner, borrower, imageurl, created) FROM stdin;
28	mixi-cali	california all the time	HYbUjrVTX0Sp3c8cGUkz4du0GFU2	9vU0bqi0iCgphwdoQfnEGYdrytN2	https://firebasestorage.googleapis.com/v0/b/boomtown-dfdd8.appspot.com/o/demo-images%2Fmix-tape.jpg?alt=media	2018-02-03
3	Hatchet	Chop things down, show nature who is boss. But be safe—alcoholic beverage not included..	FS99efSmMdQ1IPsLChdgkBdkfli2	9vU0bqi0iCgphwdoQfnEGYdrytN2	https://firebasestorage.googleapis.com/v0/b/boomtown-dfdd8.appspot.com/o/demo-images%2Fhatchet.jpg?alt=media	2018-01-29
20	mix-tape	all your favourite songs	FS99efSmMdQ1IPsLChdgkBdkfli2	9vU0bqi0iCgphwdoQfnEGYdrytN2	https://firebasestorage.googleapis.com/v0/b/boomtown-dfdd8.appspot.com/o/demo-images%2Fmix-tape.jpg?alt=media	2018-02-02
6	Mix-Tape (Radiohead Live)	What is on it? Who knows! Borrow it and find out. Tape deck not included.	HYbUjrVTX0Sp3c8cGUkz4du0GFU2	9vU0bqi0iCgphwdoQfnEGYdrytN2	https://firebasestorage.googleapis.com/v0/b/boomtown-dfdd8.appspot.com/o/demo-images%2Fmix-tape.jpg?alt=media	2018-01-29
21	mix-tape	all your MOST favourite songs	FS99efSmMdQ1IPsLChdgkBdkfli2	9vU0bqi0iCgphwdoQfnEGYdrytN2	https://firebasestorage.googleapis.com/v0/b/boomtown-dfdd8.appspot.com/o/demo-images%2Fmix-tape.jpg?alt=media	2018-02-02
36	Amazing Item	Profound Item Description	9vU0bqi0iCgphwdoQfnEGYdrytN2	HYbUjrVTX0Sp3c8cGUkz4du0GFU2	https://firebasestorage.googleapis.com/v0/b/boomtown-dfdd8.appspot.com/o/demo-images%2Fmix-tape.jpg?alt=media	2018-02-03
31	The Unsound	The devil incarnate or white noise? You decide!	HYbUjrVTX0Sp3c8cGUkz4du0GFU2	9vU0bqi0iCgphwdoQfnEGYdrytN2	https://firebasestorage.googleapis.com/v0/b/boomtown-dfdd8.appspot.com/o/demo-images%2Fmix-tape.jpg?alt=media	2018-02-03
32	Sea Monkeys	Grow a small community of sentient beings from a packet of crystals	9vU0bqi0iCgphwdoQfnEGYdrytN2	HYbUjrVTX0Sp3c8cGUkz4du0GFU2	https://firebasestorage.googleapis.com/v0/b/boomtown-dfdd8.appspot.com/o/demo-images%2Fmix-tape.jpg?alt=media	2018-02-03
1	Miscellaneous Dishes	Eat off of real plates and dishes	FS99efSmMdQ1IPsLChdgkBdkfli2	9vU0bqi0iCgphwdoQfnEGYdrytN2	https://firebasestorage.googleapis.com/v0/b/boomtown-dfdd8.appspot.com/o/demo-images%2Fmisc-dishes.jpg?alt=media	2018-01-31
23	mix-tape (tune-yards)	all your MOST favouritest songs	FS99efSmMdQ1IPsLChdgkBdkfli2	9vU0bqi0iCgphwdoQfnEGYdrytN2	https://firebasestorage.googleapis.com/v0/b/boomtown-dfdd8.appspot.com/o/demo-images%2Fmix-tape.jpg?alt=media	2018-02-02
34	The Next Episode	Everybody forgot about Dre	9vU0bqi0iCgphwdoQfnEGYdrytN2	HYbUjrVTX0Sp3c8cGUkz4du0GFU2	https://firebasestorage.googleapis.com/v0/b/boomtown-dfdd8.appspot.com/o/demo-images%2Fmix-tape.jpg?alt=media	2018-02-03
22	mix-tape (tune-yards)	all your MOST favouritest songs	FS99efSmMdQ1IPsLChdgkBdkfli2	9vU0bqi0iCgphwdoQfnEGYdrytN2	https://firebasestorage.googleapis.com/v0/b/boomtown-dfdd8.appspot.com/o/demo-images%2Fmix-tape.jpg?alt=mediav	2018-02-02
27	mix-tape (The Clash)	Rock the Casbah	FS99efSmMdQ1IPsLChdgkBdkfli2	HYbUjrVTX0Sp3c8cGUkz4du0GFU2		2018-02-03
35	mix-tape (The Cure)	Friday I'm in love	FS99efSmMdQ1IPsLChdgkBdkfli2	HYbUjrVTX0Sp3c8cGUkz4du0GFU2		2018-02-03
25	mix-tape (RHCP)	under the bridge downtown	FS99efSmMdQ1IPsLChdgkBdkfli2	\N	https://firebasestorage.googleapis.com/v0/b/boomtown-dfdd8.appspot.com/o/demo-images%2Fmix-tape.jpg?alt=media	2018-02-03
33	Yoga Mat	Namaste!	9vU0bqi0iCgphwdoQfnEGYdrytN2	HYbUjrVTX0Sp3c8cGUkz4du0GFU2	https://firebasestorage.googleapis.com/v0/b/boomtown-dfdd8.appspot.com/o/demo-images%2Fmix-tape.jpg?alt=media	2018-02-03
24	mix-tape (RHCP)	under the bridge downtown	FS99efSmMdQ1IPsLChdgkBdkfli2	HYbUjrVTX0Sp3c8cGUkz4du0GFU2	https://firebasestorage.googleapis.com/v0/b/boomtown-dfdd8.appspot.com/o/demo-images%2Fmix-tape.jpg?alt=media	2018-02-02
26	mix-tape (90s)	The Best of The 1990s on one tape	FS99efSmMdQ1IPsLChdgkBdkfli2	\N		2018-02-03
8	Skateboard	Relive your youth! And try not to seriously injure yourself while doing it!	9vU0bqi0iCgphwdoQfnEGYdrytN2	\N	https://firebasestorage.googleapis.com/v0/b/boomtown-dfdd8.appspot.com/o/demo-images%2Fskateboard.jpg?alt=media	2018-01-29
9	Iron and Ironing Board	Dress for the job you want, not the one you have, with freshly pressed shirts and slacks.	9vU0bqi0iCgphwdoQfnEGYdrytN2	\N	https://firebasestorage.googleapis.com/v0/b/boomtown-dfdd8.appspot.com/o/demo-images%2Firon-and-board.jpg?alt=media	2018-01-29
37	Boomtown Inception	:o	9vU0bqi0iCgphwdoQfnEGYdrytN2	\N	https://firebasestorage.googleapis.com/v0/b/boomtown-e933c.appspot.com/o/1517711707064-Screen%20Shot%202018-02-01%20at%2011.11.42%20PM.png?alt=media&token=ab2839c9-ac9d-4f8d-8741-738456d16b7f	2018-02-03
4	Mix-Tape (Overly Dedicated)	What is on it? Who knows! Borrow it and find out. Tape deck not included.	HYbUjrVTX0Sp3c8cGUkz4du0GFU2	\N	https://firebasestorage.googleapis.com/v0/b/boomtown-dfdd8.appspot.com/o/demo-images%2Fmix-tape.jpg?alt=media	2018-01-29
2	Flute	Like-new flute to lend. Cmon, you know you want to play it...	FS99efSmMdQ1IPsLChdgkBdkfli2	\N	https://firebasestorage.googleapis.com/v0/b/boomtown-dfdd8.appspot.com/o/demo-images%2Fflute.jpg?alt=media	2018-01-29
5	Mix-Tape (The Doors)	What is on it? Who knows! Borrow it and find out. Tape deck not included.	HYbUjrVTX0Sp3c8cGUkz4du0GFU2	\N	https://firebasestorage.googleapis.com/v0/b/boomtown-dfdd8.appspot.com/o/demo-images%2Fmix-tape.jpg?alt=media	2018-01-29
39	Mystery Mix-Tape	only playable on a mystery machine	9vU0bqi0iCgphwdoQfnEGYdrytN2	\N	https://firebasestorage.googleapis.com/v0/b/boomtown-e933c.appspot.com/o/1517772101257-item-placeholder.jpg?alt=media&token=6db98622-0930-40a4-bc5f-f7a13589c205	2018-02-04
29	Yacht Rock	california all the time	HYbUjrVTX0Sp3c8cGUkz4du0GFU2	\N	https://firebasestorage.googleapis.com/v0/b/boomtown-dfdd8.appspot.com/o/demo-images%2Fmix-tape.jpg?alt=media	2018-02-03
30	Sounds of Science	The mind aspires to be as cunning	HYbUjrVTX0Sp3c8cGUkz4du0GFU2	\N	https://firebasestorage.googleapis.com/v0/b/boomtown-dfdd8.appspot.com/o/demo-images%2Fmix-tape.jpg?alt=media	2018-02-03
7	Baseball	Lightly-used baseball for you and your friend to enjoy at your next ball tournament.	9vU0bqi0iCgphwdoQfnEGYdrytN2	\N	https://firebasestorage.googleapis.com/v0/b/boomtown-dfdd8.appspot.com/o/demo-images%2Fbaseball.jpg?alt=media	2018-01-29
38	juiolki	yo mama sobig	9vU0bqi0iCgphwdoQfnEGYdrytN2	\N	https://firebasestorage.googleapis.com/v0/b/boomtown-e933c.appspot.com/o/1517727234765-Screen%20Shot%202018-02-01%20at%2011.11.23%20PM.png?alt=media&token=7e50c4d9-23f7-4a07-9481-8ac9615c651a	2018-02-03
40	Borrow my Borrow Item	Turtles all the way down	9vU0bqi0iCgphwdoQfnEGYdrytN2	\N	https://firebasestorage.googleapis.com/v0/b/boomtown-e933c.appspot.com/o/1517781308271-Screen%20Shot%202018-02-01%20at%2011.11.23%20PM.png?alt=media&token=66b399ec-c848-4224-bbfd-a4f670a44d73	2018-02-04
41	Amazing Item	Profound Item Description	HYbUjrVTX0Sp3c8cGUkz4du0GFU2	\N	https://firebasestorage.googleapis.com/v0/b/boomtown-e933c.appspot.com/o/1517808768162-Screen%20Shot%202018-02-01%20at%2011.11.23%20PM.png?alt=media&token=16ceaea8-7ec8-4a73-95c8-1df25328889d	2018-02-04
\.


--
-- Data for Name: itemtags; Type: TABLE DATA; Schema: public; Owner: boomtowndb
--

COPY itemtags (itemid, tagid) FROM stdin;
1	1
2	1
2	2
3	5
4	4
5	6
6	6
7	5
8	2
8	7
9	7
20	1
20	2
21	1
21	2
22	1
22	2
23	1
23	2
24	1
24	2
25	1
25	2
26	1
26	2
27	1
27	2
28	1
29	3
30	3
31	3
32	3
33	3
34	3
35	1
35	2
36	2
36	3
37	2
38	7
39	2
40	4
41	1
\.


--
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: boomtowndb
--

COPY tags (id, title) FROM stdin;
1	Household Items
2	Recreational Equipment
3	Electronics
4	Tools
5	Musical Instruments
6	Physical Media
7	Sporting Goods
\.


--
-- Name: items_itemid_seq; Type: SEQUENCE SET; Schema: public; Owner: boomtowndb
--

SELECT pg_catalog.setval('items_itemid_seq', 41, true);


--
-- Name: tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: boomtowndb
--

SELECT pg_catalog.setval('tags_id_seq', 7, true);


--
-- Name: items items_pkey; Type: CONSTRAINT; Schema: public; Owner: boomtowndb
--

ALTER TABLE ONLY items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);


--
-- Name: itemtags itemtags_itemid_tagid_key; Type: CONSTRAINT; Schema: public; Owner: boomtowndb
--

ALTER TABLE ONLY itemtags
    ADD CONSTRAINT itemtags_itemid_tagid_key UNIQUE (itemid, tagid);


--
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: boomtowndb
--

ALTER TABLE ONLY tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);


--
-- Name: tags unique_titles; Type: CONSTRAINT; Schema: public; Owner: boomtowndb
--

ALTER TABLE ONLY tags
    ADD CONSTRAINT unique_titles UNIQUE (title);


--
-- Name: itemtags itemtags_itemid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: boomtowndb
--

ALTER TABLE ONLY itemtags
    ADD CONSTRAINT itemtags_itemid_fkey FOREIGN KEY (itemid) REFERENCES items(id);


--
-- Name: itemtags itemtags_tagid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: boomtowndb
--

ALTER TABLE ONLY itemtags
    ADD CONSTRAINT itemtags_tagid_fkey FOREIGN KEY (tagid) REFERENCES tags(id);


--
-- PostgreSQL database dump complete
--

\connect lindsey

SET default_transaction_read_only = off;

--
-- PostgreSQL database dump
--

-- Dumped from database version 10.1
-- Dumped by pg_dump version 10.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- PostgreSQL database dump complete
--

\connect postgres

SET default_transaction_read_only = off;

--
-- PostgreSQL database dump
--

-- Dumped from database version 10.1
-- Dumped by pg_dump version 10.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- PostgreSQL database dump complete
--

\connect template1

SET default_transaction_read_only = off;

--
-- PostgreSQL database dump
--

-- Dumped from database version 10.1
-- Dumped by pg_dump version 10.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: template1; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

