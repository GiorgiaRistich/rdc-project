CREATE TABLE public.prenotazioni (
    cf character varying(16) NOT NULL,
    nome character varying,
    email character varying,
    datap timestamp without time zone
);


ALTER TABLE public.prenotazioni OWNER TO postgres;

COPY public.prenotazioni (cf, nome, email, datap) FROM stdin;
TMSCML97M09C352Z	Francesca Torchio	francescatorchio@myprojectmail.it	2021-06-03 16:30:00
BBRLIA96M41C349S	Giuseppe Musso	giuseppemusso@myprojectmail.it	2021-06-06 11:30:00
NCLKSN87H47G791B	Salvatore Penna	salvatorepenna@myprojectmail.it	2021-06-11 16:30:00
PPLMRA97C61C352W	Andrea Ferrero	andreaferrero@myprojectmail.it	2021-06-02 11:30:00
CHRRSO95C43D988A	Fabio Barbero	fabiobarbero@myprojectmail.it	2021-06-06 10:30:00
LNDMHL91M69E791F	Maria Cerrato	mariacerrato@myprojectmail.it	2021-06-06 10:30:00
ZFFFNC77B07Z133O	Marisa Giuliano	marisagiuliano@myprojectmail.it	2021-06-24 09:00:00
\.


ALTER TABLE ONLY public.prenotazioni
    ADD CONSTRAINT prenotazioni_pkey PRIMARY KEY (cf);
