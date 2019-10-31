--
-- PostgreSQL database dump
--

-- Dumped from database version 11.4
-- Dumped by pg_dump version 11.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: enum_tasks_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_tasks_status AS ENUM (
    'TODO',
    'PROGRESS',
    'DONE'
);


ALTER TYPE public.enum_tasks_status OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: Boards; Type: TABLE; Schema: public; Owner: alexmilenkiy
--

CREATE TABLE public."Boards" (
    id integer NOT NULL,
    title character varying(255),
    author_id integer,
    share_hash character varying(255)
);


ALTER TABLE public."Boards" OWNER TO alexmilenkiy;

--
-- Name: Boards_id_seq; Type: SEQUENCE; Schema: public; Owner: alexmilenkiy
--

CREATE SEQUENCE public."Boards_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Boards_id_seq" OWNER TO alexmilenkiy;

--
-- Name: Boards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: alexmilenkiy
--

ALTER SEQUENCE public."Boards_id_seq" OWNED BY public."Boards".id;


--
-- Name: Cards; Type: TABLE; Schema: public; Owner: alexmilenkiy
--

CREATE TABLE public."Cards" (
    id integer NOT NULL,
    title character varying(255),
    description text,
    board_id integer,
    table_id integer,
    "position" numeric
);


ALTER TABLE public."Cards" OWNER TO alexmilenkiy;

--
-- Name: Cards_id_seq; Type: SEQUENCE; Schema: public; Owner: alexmilenkiy
--

CREATE SEQUENCE public."Cards_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Cards_id_seq" OWNER TO alexmilenkiy;

--
-- Name: Cards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: alexmilenkiy
--

ALTER SEQUENCE public."Cards_id_seq" OWNED BY public."Cards".id;


--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: alexmilenkiy
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO alexmilenkiy;

--
-- Name: Users; Type: TABLE; Schema: public; Owner: alexmilenkiy
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    name character varying(255),
    email character varying(255),
    password character varying(255)
);


ALTER TABLE public."Users" OWNER TO alexmilenkiy;

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: alexmilenkiy
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Users_id_seq" OWNER TO alexmilenkiy;

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: alexmilenkiy
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- Name: Boards id; Type: DEFAULT; Schema: public; Owner: alexmilenkiy
--

ALTER TABLE ONLY public."Boards" ALTER COLUMN id SET DEFAULT nextval('public."Boards_id_seq"'::regclass);


--
-- Name: Cards id; Type: DEFAULT; Schema: public; Owner: alexmilenkiy
--

ALTER TABLE ONLY public."Cards" ALTER COLUMN id SET DEFAULT nextval('public."Cards_id_seq"'::regclass);


--
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: alexmilenkiy
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- Data for Name: Boards; Type: TABLE DATA; Schema: public; Owner: alexmilenkiy
--

COPY public."Boards" (id, title, author_id, share_hash) FROM stdin;
1	first	1	\N
\.


--
-- Data for Name: Cards; Type: TABLE DATA; Schema: public; Owner: alexmilenkiy
--

COPY public."Cards" (id, title, description, board_id, table_id, "position") FROM stdin;
1	1	\N	1	1	65535
2	2	\N	1	1	131071
3	3	\N	1	1	196607
4	10	\N	1	2	65535
5	20	\N	1	2	131071
6	100	\N	1	3	65535
\.


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: alexmilenkiy
--

COPY public."SequelizeMeta" (name) FROM stdin;
20191009203122-create-user.js
20191010222526-create-board.js
20191017072514-create-card.js
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: alexmilenkiy
--

COPY public."Users" (id, name, email, password) FROM stdin;
1	admin	admin@admin.com	$2b$10$COTTsgJOp80T0oHNBUJgHePuLAFEL/WYqpxraH66/s5.wY5Yc/DS6
\.


--
-- Name: Boards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: alexmilenkiy
--

SELECT pg_catalog.setval('public."Boards_id_seq"', 1, true);


--
-- Name: Cards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: alexmilenkiy
--

SELECT pg_catalog.setval('public."Cards_id_seq"', 6, true);


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: alexmilenkiy
--

SELECT pg_catalog.setval('public."Users_id_seq"', 1, true);


--
-- Name: Boards Boards_pkey; Type: CONSTRAINT; Schema: public; Owner: alexmilenkiy
--

ALTER TABLE ONLY public."Boards"
    ADD CONSTRAINT "Boards_pkey" PRIMARY KEY (id);


--
-- Name: Cards Cards_pkey; Type: CONSTRAINT; Schema: public; Owner: alexmilenkiy
--

ALTER TABLE ONLY public."Cards"
    ADD CONSTRAINT "Cards_pkey" PRIMARY KEY (id);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: alexmilenkiy
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: Users Users_email_key; Type: CONSTRAINT; Schema: public; Owner: alexmilenkiy
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: alexmilenkiy
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

