"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

interface ServiceCommission {
	serviceId: string;
	commission: string;
}

// Lista de servicios médicos desde el archivo
const availableServices = [
	{
		id: "0e2547d0-b4f0-11ef-8544-2cf05d7babc5",
		name: "Cesaréa Clásica",
	},
	{
		id: "0e255122-b4f0-11ef-8544-2cf05d7babc5",
		name: "Cesaréa Gemelar y Triple Cesareada",
	},
	{
		id: "0e2552c5-b4f0-11ef-8544-2cf05d7babc5",
		name: "Parto Normal",
	},
	{
		id: "0e255435-b4f0-11ef-8544-2cf05d7babc5",
		name: "Parto Humanizado",
	},
	{
		id: "0e2555c3-b4f0-11ef-8544-2cf05d7babc5",
		name: "Próstata",
	},
	{
		id: "0e25572a-b4f0-11ef-8544-2cf05d7babc5",
		name: "Colecistectomía",
	},
	{
		id: "0e25b2ff-b4f0-11ef-8544-2cf05d7babc5",
		name: "Implante sudermico con material",
	},
	{
		id: "0e25b63b-b4f0-11ef-8544-2cf05d7babc5",
		name: "Histerectomía simple",
	},
	{
		id: "0e25b897-b4f0-11ef-8544-2cf05d7babc5",
		name: "Histerectomía vaginal",
	},
	{
		id: "0e25ba13-b4f0-11ef-8544-2cf05d7babc5",
		name: "Extracción de uña encarnada",
	},
	{
		id: "0e25bbf2-b4f0-11ef-8544-2cf05d7babc5",
		name: "Quiste de Bartolito",
	},
	{
		id: "0e25bd39-b4f0-11ef-8544-2cf05d7babc5",
		name: "Aplicación de DIU Mirena con material",
	},
	{
		id: "0e25be8a-b4f0-11ef-8544-2cf05d7babc5",
		name: "Aplicación de SIU con material",
	},
	{
		id: "0e25c013-b4f0-11ef-8544-2cf05d7babc5",
		name: "Legrado Evacuador",
	},
	{
		id: "0e25c16d-b4f0-11ef-8544-2cf05d7babc5",
		name: "Biopsia de Cuello",
	},
	{
		id: "0e25c2c2-b4f0-11ef-8544-2cf05d7babc5",
		name: "Pólipo con anestesia",
	},
	{
		id: "0e25c40b-b4f0-11ef-8544-2cf05d7babc5",
		name: "Conización del Cuello Uterino con anestesia",
	},
	{
		id: "0e25c545-b4f0-11ef-8544-2cf05d7babc5",
		name: "Apendicitis",
	},
	{
		id: "0e25c676-b4f0-11ef-8544-2cf05d7babc5",
		name: "Peritonitis",
	},
	{
		id: "1398667e-b4f1-11ef-8544-2cf05d7babc5",
		name: " STREPTOCOCCUS GRUPO A CULTIVO",
	},
	{
		id: "18fb7ca0-b4e4-11ef-8544-2cf05d7babc5",
		name: "Consulta con Neurologo",
	},
	{
		id: "18fd45c0-b4e4-11ef-8544-2cf05d7babc5",
		name: "Consulta con Nefrologo",
	},
	{
		id: "18fd49b2-b4e4-11ef-8544-2cf05d7babc5",
		name: "Consulta con Otorrino",
	},
	{
		id: "18fd4c2c-b4e4-11ef-8544-2cf05d7babc5",
		name: "Consulta con Traumatologo",
	},
	{
		id: "18fd4e0b-b4e4-11ef-8544-2cf05d7babc5",
		name: "Consulta Ginecológica",
	},
	{
		id: "18fd4f70-b4e4-11ef-8544-2cf05d7babc5",
		name: "Consulta con Nutricionista",
	},
	{
		id: "18fd50bd-b4e4-11ef-8544-2cf05d7babc5",
		name: "Consulta Psicológica",
	},
	{
		id: "18fd51ed-b4e4-11ef-8544-2cf05d7babc5",
		name: "Consulta con Reumatologo",
	},
	{
		id: "18fd53a5-b4e4-11ef-8544-2cf05d7babc5",
		name: "Consulta Obstetrica",
	},
	{
		id: "18fd55cb-b4e4-11ef-8544-2cf05d7babc5",
		name: "Consulta Médica Normal",
	},
	{
		id: "18fd570b-b4e4-11ef-8544-2cf05d7babc5",
		name: "Consulta Médica por Urgencia",
	},
	{
		id: "21bbea99-b4e9-11ef-8544-2cf05d7babc5",
		name: "ANTI TPO",
	},
	{
		id: "21bbf28d-b4e9-11ef-8544-2cf05d7babc5",
		name: "BHCG",
	},
	{
		id: "21bbf425-b4e9-11ef-8544-2cf05d7babc5",
		name: "BHCG CUANTITATIVA",
	},
	{
		id: "21bbf586-b4e9-11ef-8544-2cf05d7babc5",
		name: "BILIRRUBINA (TOTAL, DIRECTA, INDIRECTA)",
	},
	{
		id: "21bbf724-b4e9-11ef-8544-2cf05d7babc5",
		name: "BNP",
	},
	{
		id: "21bbf88e-b4e9-11ef-8544-2cf05d7babc5",
		name: "CALCIO IONICO",
	},
	{
		id: "21bbfa8d-b4e9-11ef-8544-2cf05d7babc5",
		name: "CALCIO SERICO",
	},
	{
		id: "21bbfbbe-b4e9-11ef-8544-2cf05d7babc5",
		name: "CHAGAS ANTICARIOS",
	},
	{
		id: "21bbfd02-b4e9-11ef-8544-2cf05d7babc5",
		name: "COITOMEGALOBURIS IGG-IGM",
	},
	{
		id: "21bbfe64-b4e9-11ef-8544-2cf05d7babc5",
		name: "CK TOTAL",
	},
	{
		id: "21bbffb7-b4e9-11ef-8544-2cf05d7babc5",
		name: "CKMB",
	},
	{
		id: "21bc0165-b4e9-11ef-8544-2cf05d7babc5",
		name: "COAGULOGRAMA",
	},
	{
		id: "21bc079f-b4e9-11ef-8544-2cf05d7babc5",
		name: "COLESTEROL",
	},
	{
		id: "21bc0949-b4e9-11ef-8544-2cf05d7babc5",
		name: "CREATININA",
	},
	{
		id: "21bc0ad6-b4e9-11ef-8544-2cf05d7babc5",
		name: "CURVA DE TOLERANCIA A LA GLUCOSA",
	},
	{
		id: "21bc0c20-b4e9-11ef-8544-2cf05d7babc5",
		name: "CA 125",
	},
	{
		id: "21bc0d54-b4e9-11ef-8544-2cf05d7babc5",
		name: "CA 15.3",
	},
	{
		id: "21bc0e80-b4e9-11ef-8544-2cf05d7babc5",
		name: "CLEARENCE DE CREATININA",
	},
	{
		id: "21bc0fd8-b4e9-11ef-8544-2cf05d7babc5",
		name: "CA 19.9",
	},
	{
		id: "2aaf2ce3-b4f0-11ef-8544-2cf05d7babc5",
		name: "Parto Normal",
	},
	{
		id: "2aaf35cd-b4f0-11ef-8544-2cf05d7babc5",
		name: "Cesárea",
	},
	{
		id: "2aaf3868-b4f0-11ef-8544-2cf05d7babc5",
		name: "Triple Cesárea o gemelar",
	},
	{
		id: "33c7ae85-b4ef-11ef-8544-2cf05d7babc5",
		name: " Ecografía Morfológica 1er y 2do semestre",
	},
	{
		id: "4304f061-b4ec-11ef-8544-2cf05d7babc5",
		name: "PLAQUETAS",
	},
	{
		id: "56861491-b4f0-11ef-8544-2cf05d7babc5",
		name: "Incubadora",
	},
	{
		id: "56861e62-b4f0-11ef-8544-2cf05d7babc5",
		name: "Servo Cuna",
	},
	{
		id: "56862126-b4f0-11ef-8544-2cf05d7babc5",
		name: "Luminoterapia",
	},
	{
		id: "56862373-b4f0-11ef-8544-2cf05d7babc5",
		name: "Monitor Cardiaco Pediátrico",
	},
	{
		id: "5686850e-b4f0-11ef-8544-2cf05d7babc5",
		name: "Honorario Médico",
	},
	{
		id: "56868759-b4f0-11ef-8544-2cf05d7babc5",
		name: "Servicio de Enfermería",
	},
	{
		id: "6adf6040-b4f0-11ef-8544-2cf05d7babc5",
		name: "Derecho de Sala",
	},
	{
		id: "6adf67eb-b4f0-11ef-8544-2cf05d7babc5",
		name: "Monitor Cardiaco",
	},
	{
		id: "6adf6984-b4f0-11ef-8544-2cf05d7babc5",
		name: "Honorario Médico",
	},
	{
		id: "6adf6ad4-b4f0-11ef-8544-2cf05d7babc5",
		name: "Servicio de Enfermería",
	},
	{
		id: "6be70e5d-b4ef-11ef-8544-2cf05d7babc5",
		name: "Ecografía partes blandas (hombro, dedo, rodilla, cuello, muñeca)",
	},
	{
		id: "6be7169a-b4ef-11ef-8544-2cf05d7babc5",
		name: "Ecografía Perfil Biofisico",
	},
	{
		id: "6be71871-b4ef-11ef-8544-2cf05d7babc5",
		name: "Ecografía Renal",
	},
	{
		id: "6be719e3-b4ef-11ef-8544-2cf05d7babc5",
		name: "Ecografía Cervicometria",
	},
	{
		id: "6be71baa-b4ef-11ef-8544-2cf05d7babc5",
		name: "Perfil Biofisico",
	},
	{
		id: "6be71d2e-b4ef-11ef-8544-2cf05d7babc5",
		name: "Ecografía Tiroidea",
	},
	{
		id: "6be71e67-b4ef-11ef-8544-2cf05d7babc5",
		name: "Ecografía de Ojos",
	},
	{
		id: "6d3c8979-8e3c-4f9a-879e-e18dbf85113a",
		name: "t2",
	},
	{
		id: "7559d618-b4ee-11ef-8544-2cf05d7babc5",
		name: "Ecografía Obstétrico",
	},
	{
		id: "7559e012-b4ee-11ef-8544-2cf05d7babc5",
		name: "Ecografía Ginecológica",
	},
	{
		id: "755b5691-b4ee-11ef-8544-2cf05d7babc5",
		name: "Ecografía Doppler",
	},
	{
		id: "755b5a08-b4ee-11ef-8544-2cf05d7babc5",
		name: "Ecografía de mamas",
	},
	{
		id: "755b5b89-b4ee-11ef-8544-2cf05d7babc5",
		name: "Ecografía Prostático simple",
	},
	{
		id: "755b5cff-b4ee-11ef-8544-2cf05d7babc5",
		name: "Ecografía Prostático (riñon, vias urinarias) completo",
	},
	{
		id: "755b5e8e-b4ee-11ef-8544-2cf05d7babc5",
		name: "Ecografía Abdominal",
	},
	{
		id: "755b5fd6-b4ee-11ef-8544-2cf05d7babc5",
		name: "Ecografía Transvaginal",
	},
	{
		id: "7605b8db-b4ec-11ef-8544-2cf05d7babc5",
		name: "POTASIO",
	},
	{
		id: "7605c39d-b4ec-11ef-8544-2cf05d7babc5",
		name: "PROGESTERONA TOTAL Y LIBRE",
	},
	{
		id: "7605c6e2-b4ec-11ef-8544-2cf05d7babc5",
		name: "PROTEINAS TOTALES",
	},
	{
		id: "7605cb9d-b4ec-11ef-8544-2cf05d7babc5",
		name: "PROTEINOGRAMA",
	},
	{
		id: "7605cddd-b4ec-11ef-8544-2cf05d7babc5",
		name: "PROTEINURIA 24 HS",
	},
	{
		id: "7605cfeb-b4ec-11ef-8544-2cf05d7babc5",
		name: "PROCALCOTONINA",
	},
	{
		id: "7605d267-b4ec-11ef-8544-2cf05d7babc5",
		name: "PSA TOTAL",
	},
	{
		id: "7605d580-b4ec-11ef-8544-2cf05d7babc5",
		name: "ROTAVIRUS",
	},
	{
		id: "7605d7ba-b4ec-11ef-8544-2cf05d7babc5",
		name: "RUBEOLA IGG-IGM",
	},
	{
		id: "7605da43-b4ec-11ef-8544-2cf05d7babc5",
		name: "SANGRE OCULTA (TEST DE GUAYACO)",
	},
	{
		id: "8d0638ea-b4f0-11ef-8544-2cf05d7babc5",
		name: "Oxígeno (Cada 60 minutos)",
	},
	{
		id: "8fc32b6a-b4ef-11ef-8544-2cf05d7babc5",
		name: "Rx por posición",
	},
	{
		id: "8fc33371-b4ef-11ef-8544-2cf05d7babc5",
		name: "Rx dos posiciones a mas",
	},
	{
		id: "a12eda7f-b4e9-11ef-8544-2cf05d7babc5",
		name: "CCP",
	},
	{
		id: "a12ee1c1-b4e9-11ef-8544-2cf05d7babc5",
		name: "CEA",
	},
	{
		id: "a12ee345-b4e9-11ef-8544-2cf05d7babc5",
		name: "CLAMIDIA EN SEC. VAG. URETRAL (UREPLASMA, MICROPLASMA)",
	},
	{
		id: "a12ee4a4-b4e9-11ef-8544-2cf05d7babc5",
		name: "COLINESTERASA",
	},
	{
		id: "a12ee5f7-b4e9-11ef-8544-2cf05d7babc5",
		name: "COVID 19 ANTIGENO",
	},
	{
		id: "a12ee754-b4e9-11ef-8544-2cf05d7babc5",
		name: "COVID 19 IGG IGM",
	},
	{
		id: "a12ee8a5-b4e9-11ef-8544-2cf05d7babc5",
		name: "DIMERO D",
	},
	{
		id: "a12eea65-b4e9-11ef-8544-2cf05d7babc5",
		name: "DHEA",
	},
	{
		id: "a12eebad-b4e9-11ef-8544-2cf05d7babc5",
		name: "DENGUE IGG IGM",
	},
	{
		id: "a12eece2-b4e9-11ef-8544-2cf05d7babc5",
		name: "ELECTROLITOS",
	},
	{
		id: "a24b770e-b4e7-11ef-8544-2cf05d7babc5",
		name: "ACIDO URICO",
	},
	{
		id: "a24b8148-b4e7-11ef-8544-2cf05d7babc5",
		name: "ADENO VIRUS, ANTIGENO EN HECES",
	},
	{
		id: "a24b835a-b4e7-11ef-8544-2cf05d7babc5",
		name: "AMILASA",
	},
	{
		id: "a24b8509-b4e7-11ef-8544-2cf05d7babc5",
		name: "ARTRITEST",
	},
	{
		id: "a24b8682-b4e7-11ef-8544-2cf05d7babc5",
		name: "ASTO",
	},
	{
		id: "a24b8812-b4e7-11ef-8544-2cf05d7babc5",
		name: "ALBUMINA",
	},
	{
		id: "a24b8a10-b4e7-11ef-8544-2cf05d7babc5",
		name: "ALFAFEROPROTEINA",
	},
	{
		id: "a24b8c15-b4e7-11ef-8544-2cf05d7babc5",
		name: "ANA TOTAL",
	},
	{
		id: "a24b8e04-b4e7-11ef-8544-2cf05d7babc5",
		name: "ANTI DNA",
	},
	{
		id: "a24b8feb-b4e7-11ef-8544-2cf05d7babc5",
		name: "ACIDO VALPROICO",
	},
	{
		id: "afa7f52a-b4ef-11ef-8544-2cf05d7babc5",
		name: "Electrocardiograma",
	},
	{
		id: "afa8024f-b4ef-11ef-8544-2cf05d7babc5",
		name: "Electrocardiograma con informe",
	},
	{
		id: "afa88522-b4ef-11ef-8544-2cf05d7babc5",
		name: "Ecocardiograma",
	},
	{
		id: "afa88844-b4ef-11ef-8544-2cf05d7babc5",
		name: "Doppler Cervical",
	},
	{
		id: "afa88a78-b4ef-11ef-8544-2cf05d7babc5",
		name: "Holter 24 hs",
	},
	{
		id: "afa88d07-b4ef-11ef-8544-2cf05d7babc5",
		name: "Mapa",
	},
	{
		id: "afa88f23-b4ef-11ef-8544-2cf05d7babc5",
		name: "Ecocardiograma Infantil",
	},
	{
		id: "afa89122-b4ef-11ef-8544-2cf05d7babc5",
		name: "Electrocardiograma con informe infantil",
	},
	{
		id: "b89defd6-3e29-4be5-93e9-67be4475c41d",
		name: "ddsfsf",
	},
	{
		id: "c26f18f3-b4ea-11ef-8544-2cf05d7babc5",
		name: "ERITROSEDIMENTACION",
	},
	{
		id: "c26f201b-b4ea-11ef-8544-2cf05d7babc5",
		name: "ESPERMOGRAMA",
	},
	{
		id: "c26f219f-b4ea-11ef-8544-2cf05d7babc5",
		name: "ESTRADIOL",
	},
	{
		id: "c26f232a-b4ea-11ef-8544-2cf05d7babc5",
		name: "FIBRINOGENO",
	},
	{
		id: "c26f249b-b4ea-11ef-8544-2cf05d7babc5",
		name: "FOSFORO",
	},
	{
		id: "c26f25ea-b4ea-11ef-8544-2cf05d7babc5",
		name: "FERRITINA",
	},
	{
		id: "c26f2703-b4ea-11ef-8544-2cf05d7babc5",
		name: "FRONTIS DE SANGRE PEROFERICA",
	},
	{
		id: "c26f2890-b4ea-11ef-8544-2cf05d7babc5",
		name: "FRONTIS DE MUCUS FECAL",
	},
	{
		id: "c26f2a43-b4ea-11ef-8544-2cf05d7babc5",
		name: "FSH",
	},
	{
		id: "c26f2ca9-b4ea-11ef-8544-2cf05d7babc5",
		name: "FTA ABS",
	},
	{
		id: "c26f2ef2-b4ea-11ef-8544-2cf05d7babc5",
		name: "GAMMA GT",
	},
	{
		id: "c26f3008-b4ea-11ef-8544-2cf05d7babc5",
		name: "GLICEMIA",
	},
	{
		id: "c26f3123-b4ea-11ef-8544-2cf05d7babc5",
		name: "GPT",
	},
	{
		id: "c26f323a-b4ea-11ef-8544-2cf05d7babc5",
		name: "GOT",
	},
	{
		id: "c26f334a-b4ea-11ef-8544-2cf05d7babc5",
		name: "GASOMETRIA ARTERIAL O VENOSA",
	},
	{
		id: "c26f346c-b4ea-11ef-8544-2cf05d7babc5",
		name: "H. PYLORI IGA",
	},
	{
		id: "c26f35b4-b4ea-11ef-8544-2cf05d7babc5",
		name: "H. PYLORI IGG",
	},
	{
		id: "c26f36cc-b4ea-11ef-8544-2cf05d7babc5",
		name: "HERPES SIMPLE I GG IGM",
	},
	{
		id: "c26f37df-b4ea-11ef-8544-2cf05d7babc5",
		name: "HERPES SIMPLE TIPO II IGG IGM",
	},
	{
		id: "c26f38ef-b4ea-11ef-8544-2cf05d7babc5",
		name: "HECES SIMPLE O PARASITOLOGICO",
	},
	{
		id: "c26ff2e2-b4ea-11ef-8544-2cf05d7babc5",
		name: "HECES SERIADO",
	},
	{
		id: "c26ff53e-b4ea-11ef-8544-2cf05d7babc5",
		name: "HELICOBACTER PYLORY",
	},
	{
		id: "c26ff6a0-b4ea-11ef-8544-2cf05d7babc5",
		name: "HEMOGLOBINA GLICOSILADA",
	},
	{
		id: "c26ff7e4-b4ea-11ef-8544-2cf05d7babc5",
		name: "HEMOGRAMA",
	},
	{
		id: "c26ff942-b4ea-11ef-8544-2cf05d7babc5",
		name: "HEPATOGRAMA",
	},
	{
		id: "c26ffb7e-b4ea-11ef-8544-2cf05d7babc5",
		name: "HEPATITIS A",
	},
	{
		id: "c26ffd30-b4ea-11ef-8544-2cf05d7babc5",
		name: "HEPATITIS B",
	},
	{
		id: "c26ffe72-b4ea-11ef-8544-2cf05d7babc5",
		name: "HEPATITIS C",
	},
	{
		id: "c270008d-b4ea-11ef-8544-2cf05d7babc5",
		name: "HIV 1-2",
	},
	{
		id: "c27002dc-b4ea-11ef-8544-2cf05d7babc5",
		name: "IGE TOTAL",
	},
	{
		id: "c2700540-b4ea-11ef-8544-2cf05d7babc5",
		name: "INFLUENZA A-B",
	},
	{
		id: "c2700822-b4ea-11ef-8544-2cf05d7babc5",
		name: "INSULINA",
	},
	{
		id: "c2700a2a-b4ea-11ef-8544-2cf05d7babc5",
		name: "LH",
	},
	{
		id: "c2700c34-b4ea-11ef-8544-2cf05d7babc5",
		name: "LIPASA",
	},
	{
		id: "c2700e78-b4ea-11ef-8544-2cf05d7babc5",
		name: "LDH (LACTICO DESHIDROGENASA)",
	},
	{
		id: "c2701070-b4ea-11ef-8544-2cf05d7babc5",
		name: "MAGNESIO",
	},
	{
		id: "c27012cd-b4ea-11ef-8544-2cf05d7babc5",
		name: "ORINA SIMPLE",
	},
	{
		id: "c27014c7-b4ea-11ef-8544-2cf05d7babc5",
		name: "PROLACTINA",
	},
	{
		id: "c27016e7-b4ea-11ef-8544-2cf05d7babc5",
		name: "PSA",
	},
	{
		id: "c822ebec-b4ec-11ef-8544-2cf05d7babc5",
		name: "SECRECION VAGINAL",
	},
	{
		id: "c822f560-b4ec-11ef-8544-2cf05d7babc5",
		name: "SODIO",
	},
	{
		id: "c822f6c7-b4ec-11ef-8544-2cf05d7babc5",
		name: "TIROGLOBINA",
	},
	{
		id: "c822f82e-b4ec-11ef-8544-2cf05d7babc5",
		name: "TSH",
	},
	{
		id: "c8233532-b4ec-11ef-8544-2cf05d7babc5",
		name: "T3",
	},
	{
		id: "c8233703-b4ec-11ef-8544-2cf05d7babc5",
		name: "T4",
	},
	{
		id: "c8233880-b4ec-11ef-8544-2cf05d7babc5",
		name: "T3 LIBRE",
	},
	{
		id: "c8233e3e-b4ec-11ef-8544-2cf05d7babc5",
		name: "T4 LIBRE",
	},
	{
		id: "c8234026-b4ec-11ef-8544-2cf05d7babc5",
		name: "TEST DE COOMBS DIRECTO",
	},
	{
		id: "c82341be-b4ec-11ef-8544-2cf05d7babc5",
		name: "TEST DE COOMBS INDIRECTO",
	},
	{
		id: "c8234333-b4ec-11ef-8544-2cf05d7babc5",
		name: "TIEMPO DE PROTOMBINA (TP)",
	},
	{
		id: "c823446a-b4ec-11ef-8544-2cf05d7babc5",
		name: "TIPIFICACION",
	},
	{
		id: "c8234745-b4ec-11ef-8544-2cf05d7babc5",
		name: "TOXO IGG – IGM",
	},
	{
		id: "c823b381-b4ec-11ef-8544-2cf05d7babc5",
		name: "TOXOPLASMOSIS AVIDEZ",
	},
	{
		id: "c823b577-b4ec-11ef-8544-2cf05d7babc5",
		name: "TP – INR",
	},
	{
		id: "c823b6fa-b4ec-11ef-8544-2cf05d7babc5",
		name: "TRIGLICERIDOS",
	},
	{
		id: "c823b838-b4ec-11ef-8544-2cf05d7babc5",
		name: "TROPONINA I CUANTITATIVA",
	},
	{
		id: "c823b972-b4ec-11ef-8544-2cf05d7babc5",
		name: "TORCH",
	},
	{
		id: "c823bad4-b4ec-11ef-8544-2cf05d7babc5",
		name: "TTPA",
	},
	{
		id: "c823bc2d-b4ec-11ef-8544-2cf05d7babc5",
		name: "UREA",
	},
	{
		id: "c823bd58-b4ec-11ef-8544-2cf05d7babc5",
		name: "VDRL",
	},
	{
		id: "c823be95-b4ec-11ef-8544-2cf05d7babc5",
		name: "VITAMINA D",
	},
	{
		id: "c823bfeb-b4ec-11ef-8544-2cf05d7babc5",
		name: "VIRUS SINCITIAL RESPIRATORIO (SE DERIVA)",
	},
	{
		id: "d5521bda-b4eb-11ef-8544-2cf05d7babc5",
		name: "PANEL TROPICAL (ZIKA, DENGUE, CHIKUNGUNYA",
	},
	{
		id: "d552234c-b4eb-11ef-8544-2cf05d7babc5",
		name: "PANEL RESPIRATORIO",
	},
	{
		id: "d552255a-b4eb-11ef-8544-2cf05d7babc5",
		name: "PRO BNP",
	},
	{
		id: "d552271d-b4eb-11ef-8544-2cf05d7babc5",
		name: "PRO BNO",
	},
	{
		id: "d5522972-b4eb-11ef-8544-2cf05d7babc5",
		name: "PCR",
	},
	{
		id: "d5522aea-b4eb-11ef-8544-2cf05d7babc5",
		name: "PERFIL HEPATICO",
	},
	{
		id: "d5522c93-b4eb-11ef-8544-2cf05d7babc5",
		name: "PERFIL LIPIDICO",
	},
	{
		id: "d5522fb3-b4eb-11ef-8544-2cf05d7babc5",
		name: "PERFIL RENAL",
	},
	{
		id: "d55234d7-b4eb-11ef-8544-2cf05d7babc5",
		name: "PERFIL TIROIDEO (T3 T4 TSH)",
	},
	{
		id: "d55236c7-b4eb-11ef-8544-2cf05d7babc5",
		name: "PH BENEDIC",
	},
	{
		id: "e3008f42-b4ed-11ef-8544-2cf05d7babc5",
		name: "UROCULTIVO",
	},
	{
		id: "e300962b-b4ed-11ef-8544-2cf05d7babc5",
		name: "COPROCULTIVO",
	},
	{
		id: "e30097d3-b4ed-11ef-8544-2cf05d7babc5",
		name: "SECRECION VAGINAL",
	},
	{
		id: "e30099a2-b4ed-11ef-8544-2cf05d7babc5",
		name: "SECRECION URETRAL",
	},
	{
		id: "e3009b17-b4ed-11ef-8544-2cf05d7babc5",
		name: "SECRECION FARINGEA",
	},
	{
		id: "e3009c72-b4ed-11ef-8544-2cf05d7babc5",
		name: "SECRECION NASAL",
	},
	{
		id: "e3009d95-b4ed-11ef-8544-2cf05d7babc5",
		name: "PUNTA CATETER",
	},
	{
		id: "e3009ece-b4ed-11ef-8544-2cf05d7babc5",
		name: "HEMOCULTIVO",
	},
	{
		id: "e300a015-b4ed-11ef-8544-2cf05d7babc5",
		name: "HEMOCULTIVO POR 2 FRASCOS",
	},
	{
		id: "e300a166-b4ed-11ef-8544-2cf05d7babc5",
		name: "UREAPLASMA",
	},
	{
		id: "e300a2a4-b4ed-11ef-8544-2cf05d7babc5",
		name: "SECRECION TRAQUEAL",
	},
	{
		id: "e300a3c6-b4ed-11ef-8544-2cf05d7babc5",
		name: "SECRECION PURULENTA",
	},
	{
		id: "e3011a54-b4ed-11ef-8544-2cf05d7babc5",
		name: "LIQUIDO PLEURAL",
	},
	{
		id: "e3011cdb-b4ed-11ef-8544-2cf05d7babc5",
		name: "LIQUIDO CEFALORRAQUIDEO",
	},
	{
		id: "e3021cda-b4ed-11ef-8544-2cf05d7babc5",
		name: "LIQUIDO ABDOMINAL",
	},
	{
		id: "e3021fc8-b4ed-11ef-8544-2cf05d7babc5",
		name: "STREPTOCOCCUS GRUPO B",
	},
	{
		id: "ef2d4dc6-a073-48fb-a7f3-69b79d1d390d",
		name: "producto generico",
	},
].sort((a, b) => a.name.localeCompare(b.name));

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME;

const api = axios.create({
	baseURL: `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`,
	headers: {
		Authorization: `Bearer ${AIRTABLE_API_KEY}`,
		"Content-Type": "application/json",
	},
});

export default function DoctorRegistrationForm() {
	const [selectedServices, setSelectedServices] = useState<
		ServiceCommission[]
	>([]);
	const { toast } = useToast();
	const { register, handleSubmit, reset } = useForm();

	const handleAddService = () => {
		console.log(process.env);

		setSelectedServices([
			...selectedServices,
			{ serviceId: "", commission: "" },
		]);
	};

	const handleRemoveService = (index: number) => {
		const newServices = selectedServices.filter((_, i) => i !== index);
		setSelectedServices(newServices);
	};

	const handleServiceChange = (index: number, serviceId: string) => {
		const newServices = [...selectedServices];
		newServices[index].serviceId = serviceId;
		setSelectedServices(newServices);
	};

	const handleCommissionChange = (index: number, commission: string) => {
		const newServices = [...selectedServices];
		newServices[index].commission = commission;
		setSelectedServices(newServices);
	};

	const onSubmit = async (data: any) => {
		if (
			selectedServices.length === 0 ||
			selectedServices.some((s) => !s.serviceId || !s.commission)
		) {
			toast({
				title: "Error",
				description: "Debe agregar al menos un servicio y su comisión.",
				variant: "destructive",
			});
			return;
		}

		const formData = {
			records: [
				{
					fields: {
						Prefijo: data.prefix,
						Nombre: data.doctorName,
						Apellido: data.lastName,
						"Fecha de Nacimiento": data.birthDate,
						Especialidad: data.speciality,
						Email: data.email,
						Teléfono: data.phone,
						Servicios: selectedServices
							.map(
								(s) =>
									`ID: ${s.serviceId}, Comisión: ${s.commission}`
							)
							.join("; "),
					},
				},
			],
		};

		try {
			await api.post(`/${AIRTABLE_TABLE_NAME}`, formData);

			reset(); // Limpia el formulario
			setSelectedServices([]); // Limpia los servicios seleccionados
			alert("Se ha enviado con exito!");
			toast({
				title: "Registro exitoso",
				description: "El médico ha sido registrado en Airtable.",
			});
		} catch (error) {
			toast({
				title: "Error",
				description: "No se pudo registrar el médico en Airtable.",
				variant: "destructive",
			});
		}
	};

	return (
		<>
			<Toaster />
			<form onSubmit={handleSubmit(onSubmit)}>
				<Card className="w-full max-w-2xl mx-auto">
					<CardHeader>
						<CardTitle className="text-2xl">
							Registro de Médico
						</CardTitle>
						<p className="text-sm text-muted-foreground">
							Complete este formulario para registrar un médico en
							el sistema.
						</p>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="prefix">Prefijo</Label>
								<Input
									id="prefix"
									{...register("prefix")}
									placeholder="Dr./Dra."
									required
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="doctorName">Nombre</Label>
								<Input
									id="doctorName"
									{...register("doctorName")}
									required
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="lastName">Apellido</Label>
								<Input
									id="lastName"
									{...register("lastName")}
									required
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="birthDate">
									Fecha de Nacimiento
								</Label>
								<Input
									id="birthDate"
									{...register("birthDate")}
									type="date"
									required
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="speciality">Especialidad</Label>
								<Input
									id="speciality"
									{...register("speciality")}
									required
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="email">
									Correo electrónico
								</Label>
								<Input
									id="email"
									{...register("email")}
									type="email"
									required
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="phone">Teléfono</Label>
								<Input
									id="phone"
									{...register("phone")}
									type="tel"
									required
								/>
							</div>
						</div>

						<div className="space-y-4">
							<Label>Servicios y Comisiones (Obligatorio)</Label>
							<p className="text-sm text-muted-foreground">
								Seleccione al menos un servicio y especifique la
								comisión.
							</p>
							<Button
								type="button"
								variant="outline"
								size="sm"
								onClick={handleAddService}
							>
								<Plus className="h-4 w-4 mr-2" />
								Agregar Servicio
							</Button>
							{selectedServices.map((service, index) => (
								<div
									key={index}
									className="flex items-center gap-4 bg-muted/20 p-4 rounded-lg relative"
								>
									<Select
										value={service.serviceId}
										onValueChange={(value) =>
											handleServiceChange(index, value)
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Seleccionar servicio" />
										</SelectTrigger>
										<SelectContent>
											{availableServices.map((s) => (
												<SelectItem
													key={s.id}
													value={s.id}
												>
													{s.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<Input
										type="number"
										min="0"
										step="1"
										value={service.commission}
										onChange={(e) =>
											handleCommissionChange(
												index,
												e.target.value
											)
										}
										placeholder="Comisión (₲)"
										required
									/>
									<Button
										type="button"
										variant="ghost"
										size="icon"
										onClick={() =>
											handleRemoveService(index)
										}
									>
										<X className="h-4 w-4" />
									</Button>
								</div>
							))}
						</div>

						<Button type="submit" className="w-full">
							Enviar
						</Button>
					</CardContent>
				</Card>
			</form>
		</>
	);
}
