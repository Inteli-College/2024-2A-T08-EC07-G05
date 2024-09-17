CREATE TABLE "Info" (
  "KNR" varchar PRIMARY KEY,
  "COR" text,
  "MOTOR" text,
  "TEMPO_MEDIO_OPERACOES" timestamp,
  "RESULTADO_TESTE" boolean,
  "DATA_TESTE" timestamp
);

CREATE TABLE "Modelo" (
  "ID_MODELO" varchar PRIMARY KEY,
  "DATA_TREINO" timestamp,
  "PRECISAO" varchar
);

CREATE TABLE "Operacao" (
  "ID" varchar PRIMARY KEY,
  "KNR" varchar,
  "HALLE" varchar,
  "TEVE_FALHA" boolean,
  "DESCRICAO" text,
  "GRUPO_FALHA" integer,
  "TEMPO" timestamp
);

CREATE TABLE "Procedimento" (
  "ID_PROCEDIMENTO" varchar PRIMARY KEY,
  "KNR" varchar,
  "NAME" text,
  "GROUP" integer,
  "TEMPO" timestamp,
  "STATUS" boolean
);

CREATE TABLE "Health" (
  "ID" varchar PRIMARY KEY,
  "SERVICO" varchar text,
  "HEALTH" varchar text,
  "DATE" varchar text
);

CREATE TABLE "Performance" (
  "KNR" varchar PRIMARY KEY,
  "ID_MODELO" varchar, 
  "NUMERO_PREVISOES" integer,
  "MEDIA_ACERTOS_ATUAL" varchar,
  "ACERTO_PREDICAO" boolean,
  "OUTPUT_MODELO" boolean,
  "DATA" timestamp,
  CONSTRAINT unique_id_modelo UNIQUE ("ID_MODELO")  
);

ALTER TABLE "Modelo" ADD FOREIGN KEY ("ID_MODELO") REFERENCES "Performance" ("ID_MODELO");
