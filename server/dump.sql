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

COPY public.boards (id, title, author_id, share_hash) FROM stdin;
1	first	1	\N
\.

COPY public.cards (id, title, description, board_id, table_id, "position") FROM stdin;
1	1	\N	1	1	65535
2	2	\N	1	1	131071
3	3	\N	1	1	196607
4	10	\N	1	2	65535
5	20	\N	1	2	131071
6	100	\N	1	3	65535
\.

COPY public.users (id, name, email, password) FROM stdin;
1	admin	admin@admin.com	$2b$10$COTTsgJOp80T0oHNBUJgHePuLAFEL/WYqpxraH66/s5.wY5Yc/DS6
\.

--
-- PostgreSQL database dump complete
--

