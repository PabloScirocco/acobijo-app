/* Only contacts selected by the owner may be added. approvedByOwner is mandatory.
 * Source-backed coordinates are optional. Never use an invented office for mobile
 * taxis/bus routes. Payment conditions and the shared taxi number were supplied
 * directly by the owner. Guest geolocation is not part of this dataset.
 */
window.ACOBIJO_CONTACTS = [
  {
    "id": "la-cantabrica",
    "name": "La Cantábrica · San Vicente – Santander",
    "category": "mobility",
    "stays": [
      "oyambre",
      "cardeo",
      "ruiloba"
    ],
    "locality": "San Vicente de la Barquera · Santander",
    "approvedByOwner": true,
    "reviewedAt": "2026-09-29",
    "kind": "bus",
    "phone": "+34 942 720 822",
    "website": "https://lacantabrica.com/",
    "description": {
      "es": "Línea San Vicente de la Barquera ↔ Santander. Camping Oyambre y Apartamentos El Cardeo están entre las paradas de San Vicente de la Barquera y Comillas. Camping Ruiloba está entre las paradas de Comillas y Cóbreces.",
      "en": "San Vicente de la Barquera ↔ Santander bus route. Camping Oyambre and Apartamentos El Cardeo are between the San Vicente de la Barquera and Comillas stops. Camping Ruiloba is between the Comillas and Cóbreces stops.",
      "fr": "Ligne San Vicente de la Barquera ↔ Santander. Camping Oyambre et Apartamentos El Cardeo se trouvent entre les arrêts de San Vicente de la Barquera et Comillas. Camping Ruiloba se trouve entre les arrêts de Comillas et Cóbreces.",
      "de": "Buslinie San Vicente de la Barquera ↔ Santander. Camping Oyambre und Apartamentos El Cardeo liegen zwischen den Haltestellen San Vicente de la Barquera und Comillas. Camping Ruiloba liegt zwischen den Haltestellen Comillas und Cóbreces.",
      "nl": "Buslijn San Vicente de la Barquera ↔ Santander. Camping Oyambre en Apartamentos El Cardeo liggen tussen de haltes San Vicente de la Barquera en Comillas. Camping Ruiloba ligt tussen de haltes Comillas en Cóbreces."
    },
    "notice": {
      "es": "Pago solo en efectivo. Se admiten billetes de hasta 20 €. Salvo en la parada de origen, los horarios son aproximados. Pueden producirse retrasos.",
      "en": "Cash only. Banknotes up to €20 are accepted. Except at the route’s starting stop, scheduled times are approximate. Delays may occur.",
      "fr": "Paiement en espèces uniquement. Billets de 20 € maximum. Sauf à l’arrêt de départ, les horaires sont approximatifs. Des retards sont possibles.",
      "de": "Nur Barzahlung. Banknoten bis 20 € werden akzeptiert. Außer an der Starthaltestelle sind die Fahrplanzeiten ungefähre Angaben. Verspätungen sind möglich.",
      "nl": "Alleen contant betalen. Biljetten tot en met €20 worden geaccepteerd. Behalve bij de beginhalte zijn de tijden bij benadering. Vertragingen zijn mogelijk."
    },
    "sources": [
      "https://lacantabrica.com/",
      "https://sanvicentedelabarquera.es/planifica-tu-viaje/como-llegar/",
      "https://www.cultura.gob.es/mnaltamira/visita/localizacion.html"
    ],
    "ownerConfirmed": [
      "route-accommodations",
      "cash-only",
      "maximum-note-20-eur",
      "relative-stops",
      "approximate-intermediate-times",
      "possible-delays"
    ]
  },
  {
    "id": "taxi-tesla-san-vicente",
    "name": "Taxi Tesla San Vicente",
    "category": "mobility",
    "stays": [
      "oyambre"
    ],
    "locality": "San Vicente de la Barquera",
    "approvedByOwner": true,
    "reviewedAt": "2026-09-29",
    "kind": "taxi",
    "phone": "+34 609 846 633",
    "website": "https://www.taxiteslasanvicente.com/",
    "sources": [
      "https://www.taxiteslasanvicente.com/"
    ],
    "recommendedByOwner": true
  },
  {
    "id": "taxi-oyambre",
    "name": "Taxi Oyambre · Valdáliga",
    "category": "mobility",
    "stays": [
      "oyambre"
    ],
    "locality": "Oyambre · Valdáliga",
    "approvedByOwner": true,
    "reviewedAt": "2026-09-29",
    "kind": "taxi",
    "phone": "+34 649 856 550",
    "ownerConfirmed": [
      "phone",
      "same-operator-for-both-names"
    ]
  },
  {
    "id": "parada-taxis-san-vicente",
    "name": "Parada de taxis de San Vicente de la Barquera",
    "category": "mobility",
    "stays": [
      "oyambre"
    ],
    "locality": "San Vicente de la Barquera",
    "approvedByOwner": true,
    "reviewedAt": "2026-09-29",
    "kind": "taxi-rank",
    "phone": "+34 942 710 880",
    "address": "Plaza Mayor del Fuero",
    "website": "https://aytosanvicentedelabarquera.es/empresas-y-servicios/",
    "displayName": {
      "es": "Parada de taxis de San Vicente de la Barquera",
      "en": "San Vicente de la Barquera taxi rank",
      "fr": "Station de taxis de San Vicente de la Barquera",
      "de": "Taxistand San Vicente de la Barquera",
      "nl": "Taxistandplaats San Vicente de la Barquera"
    },
    "sources": [
      "https://aytosanvicentedelabarquera.es/empresas-y-servicios/"
    ]
  },
  {
    "id": "parada-taxis-comillas",
    "name": "Parada de taxis de Comillas",
    "category": "mobility",
    "stays": [
      "oyambre"
    ],
    "locality": "Comillas",
    "approvedByOwner": true,
    "reviewedAt": "2026-09-29",
    "kind": "taxi-rank",
    "phone": "+34 942 720 034",
    "address": "Parking de Sobrellano, Paseo Marqués de Comillas",
    "website": "https://www.comillas.es/wp-content/uploads/2025/04/BOLETIN-Semana-31-1.pdf",
    "displayName": {
      "es": "Parada de taxis de Comillas",
      "en": "Comillas taxi rank",
      "fr": "Station de taxis de Comillas",
      "de": "Taxistand Comillas",
      "nl": "Taxistandplaats Comillas"
    },
    "sources": [
      "https://www.comillas.es/wp-content/uploads/2025/04/BOLETIN-Semana-31-1.pdf"
    ]
  },
  {
    "id": "talleres-velez",
    "name": "Talleres Vélez",
    "category": "garage",
    "stays": [
      "oyambre",
      "ruiloba",
      "cardeo",
      "verdemar"
    ],
    "locality": "San Vicente de la Barquera",
    "approvedByOwner": true,
    "reviewedAt": "2026-09-29",
    "phone": "+34 942 711 595",
    "address": "Barrio Boria, 7 · N-634",
    "website": "https://www.afodeb.es/talleres-velez",
    "websiteLabel": "source",
    "description": {
      "es": "Taller de coches: mecánica general, chapa y pintura.",
      "en": "Car repairs, general mechanical work, bodywork and paintwork.",
      "fr": "Garage automobile : mécanique générale, carrosserie et peinture.",
      "de": "Kfz-Werkstatt für allgemeine Reparaturen, Karosserie- und Lackierarbeiten.",
      "nl": "Autogarage voor algemene reparaties, carrosseriewerk en spuitwerk."
    },
    "sources": [
      "https://www.afodeb.es/talleres-velez"
    ],
    "recommendedByOwner": true
  },
  {
    "id": "caravaning-cantabria",
    "name": "Caravaning Cantabria",
    "category": "garage",
    "stays": [
      "oyambre",
      "ramales",
      "ruiloba"
    ],
    "locality": "39311 Cartes",
    "approvedByOwner": true,
    "reviewedAt": "2026-09-29",
    "phone": "+34 942 819 918",
    "address": "Polígono Industrial Mies de Molladar, nave E21",
    "website": "https://caravaningcantabria.es/",
    "coordinates": {
      "lat": 43.31740758542025,
      "lon": -4.068452765861778
    },
    "description": {
      "es": "Reparación, mantenimiento y alquiler de campers, autocaravanas y caravanas.",
      "en": "Repairs, maintenance and rental of campervans, motorhomes and caravans.",
      "fr": "Réparation, entretien et location de vans aménagés, camping-cars et caravanes.",
      "de": "Reparatur, Wartung und Vermietung von Campervans, Wohnmobilen und Wohnwagen.",
      "nl": "Reparatie, onderhoud en verhuur van camperbusjes, campers en caravans."
    },
    "sources": [
      "https://caravaningcantabria.es/contacto/",
      "https://caravaningcantabria.es/sobre-nosotros/"
    ],
    "coordinateSource": "https://caravaningcantabria.es/contacto/",
    "recommendedByOwner": true
  },
  {
    "id": "pharmacy-san-vicente-mur",
    "name": "Farmacia Mur",
    "category": "pharmacy",
    "address": "Avenida de los Soportales, 27",
    "locality": "39540 San Vicente de la Barquera",
    "phone": "+34 942 710 157",
    "stays": [
      "oyambre",
      "ruiloba",
      "cardeo",
      "verdemar"
    ],
    "website": "https://www.cofcantabria.org/Entidades/Listado.aspx?IdMenu=df34e502-507b-494f-a119-68244e4a5d9c&Idioma=es-ES",
    "websiteLabel": "source",
    "approvedByOwner": true,
    "reviewedAt": "2026-09-29",
    "sources": [
      "https://www.cofcantabria.org/Entidades/Listado.aspx?IdMenu=df34e502-507b-494f-a119-68244e4a5d9c&Idioma=es-ES"
    ]
  },
  {
    "id": "pharmacy-san-vicente-penil",
    "name": "Farmacia Peñil",
    "category": "pharmacy",
    "address": "Paseo de la Barquera, 5",
    "locality": "39540 San Vicente de la Barquera",
    "phone": "+34 942 715 070",
    "stays": [
      "oyambre",
      "ruiloba",
      "cardeo",
      "verdemar"
    ],
    "website": "https://www.farmaciapenil.es/historia/",
    "websiteLabel": "website",
    "approvedByOwner": true,
    "reviewedAt": "2026-09-29",
    "sources": [
      "https://www.farmaciapenil.es/historia/",
      "https://www.cofcantabria.org/Entidades/Listado.aspx?IdMenu=df34e502-507b-494f-a119-68244e4a5d9c&Idioma=es-ES"
    ]
  },
  {
    "id": "pharmacy-comillas-busto-barbarin",
    "name": "Farmacia de Comillas · Pilar Bustamante",
    "category": "pharmacy",
    "address": "Calle Los Arzobispos, 8",
    "locality": "39520 Comillas",
    "phone": "+34 942 722 240",
    "stays": [
      "oyambre",
      "ruiloba",
      "cardeo",
      "verdemar"
    ],
    "website": "https://www.cofcantabria.org/Entidades/Listado.aspx?IdMenu=df34e502-507b-494f-a119-68244e4a5d9c&Idioma=es-ES",
    "websiteLabel": "source",
    "approvedByOwner": true,
    "reviewedAt": "2026-09-29",
    "sources": [
      "https://www.cofcantabria.org/Entidades/Listado.aspx?IdMenu=df34e502-507b-494f-a119-68244e4a5d9c&Idioma=es-ES"
    ],
    "description": {
      "es": "La farmacia conocida como Busto Barbarín, en Los Arzobispos.",
      "en": "The pharmacy previously known as Busto Barbarín, on Los Arzobispos.",
      "fr": "La pharmacie connue auparavant sous le nom de Busto Barbarín, rue Los Arzobispos.",
      "de": "Die ehemals als Busto Barbarín bekannte Apotheke in der Straße Los Arzobispos.",
      "nl": "De apotheek die voorheen Busto Barbarín heette, aan Los Arzobispos."
    }
  },
  {
    "id": "pharmacy-cabezon-jacobo-pulgar",
    "name": "Farmacia Jacobo Pulgar",
    "category": "pharmacy",
    "address": "Paseo de Igareda, 8",
    "locality": "39500 Cabezón de la Sal",
    "phone": "+34 942 700 031",
    "stays": [
      "oyambre",
      "ruiloba",
      "cardeo",
      "verdemar"
    ],
    "website": "https://www.cofcantabria.org/Entidades/Listado.aspx?IdMenu=df34e502-507b-494f-a119-68244e4a5d9c&Idioma=es-ES",
    "websiteLabel": "source",
    "approvedByOwner": true,
    "reviewedAt": "2026-09-29",
    "sources": [
      "https://www.cofcantabria.org/Entidades/Listado.aspx?IdMenu=df34e502-507b-494f-a119-68244e4a5d9c&Idioma=es-ES"
    ]
  },
  {
    "id": "pharmacy-cabezon-gabriel-guy-pulgar",
    "name": "Farmacia Gabriel Guy Pulgar",
    "category": "pharmacy",
    "address": "Calle Reverendo Padre Gómez, 8",
    "locality": "39500 Cabezón de la Sal",
    "phone": "+34 942 700 063",
    "stays": [
      "oyambre",
      "ruiloba",
      "cardeo",
      "verdemar"
    ],
    "website": "https://www.cofcantabria.org/Entidades/Listado.aspx?IdMenu=df34e502-507b-494f-a119-68244e4a5d9c&Idioma=es-ES",
    "websiteLabel": "source",
    "approvedByOwner": true,
    "reviewedAt": "2026-09-29",
    "sources": [
      "https://www.cofcantabria.org/Entidades/Listado.aspx?IdMenu=df34e502-507b-494f-a119-68244e4a5d9c&Idioma=es-ES"
    ]
  },
  {
    "id": "pharmacy-ruiloba-frechoso",
    "name": "Farmacia Frechoso · Ruiloba",
    "category": "pharmacy",
    "address": "Vía Peñona, 2 · Barrio Liandres",
    "locality": "39527 Ruiloba",
    "phone": "+34 942 720 148",
    "stays": [
      "oyambre",
      "ruiloba",
      "cardeo",
      "verdemar"
    ],
    "website": "https://farmaciaruiloba.com/",
    "websiteLabel": "website",
    "approvedByOwner": true,
    "reviewedAt": "2026-09-29",
    "sources": [
      "https://farmaciaruiloba.com/",
      "https://www.cofcantabria.org/Entidades/Listado.aspx?IdMenu=df34e502-507b-494f-a119-68244e4a5d9c&Idioma=es-ES"
    ],
    "recommendedByOwner": true
  },
  {
    "id": "police-san-vicente",
    "name": "Guardia Civil · San Vicente de la Barquera",
    "category": "police",
    "address": "Calle Alta, 8",
    "locality": "39540 San Vicente de la Barquera",
    "phone": "+34 942 710 007",
    "stays": [
      "oyambre",
      "cardeo",
      "verdemar"
    ],
    "website": "https://web.guardiacivil.es/va/colaboracion/atencionciudadano_1/directorio-de-telefonos-y-direcciones/PUESTO-DE-SAN-VICENTE-DE-LA-BARQUERA/",
    "websiteLabel": "source",
    "approvedByOwner": true,
    "reviewedAt": "2026-09-29",
    "sources": [
      "https://web.guardiacivil.es/va/colaboracion/atencionciudadano_1/directorio-de-telefonos-y-direcciones/PUESTO-DE-SAN-VICENTE-DE-LA-BARQUERA/"
    ],
    "kind": "policeOffice",
    "displayName": {
      "es": "Puesto de la Guardia Civil · San Vicente de la Barquera",
      "en": "Guardia Civil station · San Vicente de la Barquera",
      "fr": "Poste de la Guardia Civil · San Vicente de la Barquera",
      "de": "Guardia-Civil-Dienststelle · San Vicente de la Barquera",
      "nl": "Guardia Civil-bureau · San Vicente de la Barquera"
    }
  },
  {
    "id": "police-comillas",
    "name": "Guardia Civil · Comillas",
    "category": "police",
    "address": "Paseo Jesús Cancio, 12",
    "locality": "39520 Comillas",
    "phone": "+34 942 720 035",
    "stays": [
      "ruiloba"
    ],
    "website": "https://web.guardiacivil.es/es/colaboracion/atencionciudadano_1/directorio-de-telefonos-y-direcciones/PUESTO-DE-COMILLAS/",
    "websiteLabel": "source",
    "approvedByOwner": true,
    "reviewedAt": "2026-09-29",
    "sources": [
      "https://web.guardiacivil.es/es/colaboracion/atencionciudadano_1/directorio-de-telefonos-y-direcciones/PUESTO-DE-COMILLAS/"
    ],
    "kind": "policeOffice",
    "displayName": {
      "es": "Puesto de la Guardia Civil · Comillas",
      "en": "Guardia Civil station · Comillas",
      "fr": "Poste de la Guardia Civil · Comillas",
      "de": "Guardia-Civil-Dienststelle · Comillas",
      "nl": "Guardia Civil-bureau · Comillas"
    }
  },
  {
    "id": "police-ramales",
    "name": "Guardia Civil · Ramales de la Victoria",
    "category": "police",
    "address": "Avenida Barón de Adzaneta, 19",
    "locality": "39800 Ramales de la Victoria",
    "phone": "+34 942 646 006",
    "stays": [
      "ramales"
    ],
    "website": "https://web.guardiacivil.es/en/colaboracion/atencionciudadano_1/directorio-de-telefonos-y-direcciones/PUESTO-DE-RAMALES-DE-LA-VICTORIA/",
    "websiteLabel": "source",
    "approvedByOwner": true,
    "reviewedAt": "2026-09-29",
    "sources": [
      "https://web.guardiacivil.es/en/colaboracion/atencionciudadano_1/directorio-de-telefonos-y-direcciones/PUESTO-DE-RAMALES-DE-LA-VICTORIA/"
    ],
    "kind": "policeOffice",
    "displayName": {
      "es": "Puesto de la Guardia Civil · Ramales de la Victoria",
      "en": "Guardia Civil station · Ramales de la Victoria",
      "fr": "Poste de la Guardia Civil · Ramales de la Victoria",
      "de": "Guardia-Civil-Dienststelle · Ramales de la Victoria",
      "nl": "Guardia Civil-bureau · Ramales de la Victoria"
    }
  },
  {
    "id": "salud-san-vicente",
    "name": "Centro de Salud San Vicente de la Barquera",
    "category": "health",
    "address": "Calle Arenal, 2",
    "locality": "39540 San Vicente de la Barquera",
    "phone": "+34942712370",
    "stays": [
      "oyambre",
      "cardeo",
      "verdemar"
    ],
    "website": "https://www.scsalud.es/buscador-de-centros-sanitarios",
    "websiteLabel": "source",
    "approvedByOwner": true,
    "reviewedAt": "2026-09-29",
    "sources": [
      "https://www.cantabria.es/web/guia-de-comunicacion/home?_es_gobcantabria_liferay_gobierno_guia_comunicacion_GuiaComunicacionPortlet_INSTANCE_4wyHL9Mxa7vt_category=1141233&_es_gobcantabria_liferay_gobierno_guia_comunicacion_GuiaComunicacionPortlet_INSTANCE_4wyHL9Mxa7vt_format=pdf&p_p_cacheability=cacheLevelPage&p_p_id=es_gobcantabria_liferay_gobierno_guia_comunicacion_GuiaComunicacionPortlet_INSTANCE_4wyHL9Mxa7vt&p_p_lifecycle=2&p_p_mode=view&p_p_resource_id=downloadPdf&p_p_state=normal",
      "https://contrataciondelestado.es/wps/wcm/connect/PLACE_es/Site/area/docAccCmpnt?DocumentIdParam=f2bb93e5-dc8a-4c92-a815-c2b6491496c4&cmpntname=GetDocumentsById&source=library&srv=cmpnt"
    ],
    "kind": "healthCentre",
    "displayName": {
      "es": "Centro de Salud San Vicente de la Barquera",
      "en": "San Vicente de la Barquera health centre",
      "fr": "Centre de santé de San Vicente de la Barquera",
      "de": "Gesundheitszentrum San Vicente de la Barquera",
      "nl": "Gezondheidscentrum San Vicente de la Barquera"
    }
  },
  {
    "id": "salud-comillas",
    "name": "Consultorio médico de Comillas",
    "category": "health",
    "address": "Paseo de Estrada, 3",
    "locality": "39520 Comillas",
    "phone": "+34942722270",
    "stays": [
      "ruiloba"
    ],
    "website": "https://www.scsalud.es/buscador-de-centros-sanitarios",
    "websiteLabel": "source",
    "approvedByOwner": true,
    "reviewedAt": "2026-09-29",
    "sources": [
      "https://contrataciondelestado.es/wps/wcm/connect/PLACE_es/Site/area/docAccCmpnt?DocumentIdParam=f2bb93e5-dc8a-4c92-a815-c2b6491496c4&cmpntname=GetDocumentsById&source=library&srv=cmpnt",
      "https://www.comillas.es/wp-content/uploads/2025/07/LIBRITO-FIESTAS-DEL-CRISTO-2025.pdf",
      "https://saludcantabria.es/w/sanidad-mejora-la-accesibilidad-y-las-instalaciones-del-consultorio-m%C3%A9dico-de-comillas"
    ],
    "kind": "healthCentre",
    "displayName": {
      "es": "Consultorio médico de Comillas",
      "en": "Comillas medical clinic",
      "fr": "Cabinet médical de Comillas",
      "de": "Arztpraxis Comillas",
      "nl": "Medische praktijk Comillas"
    }
  },
  {
    "id": "salud-ramales",
    "name": "Centro de Salud Alto Asón · Ramales",
    "category": "health",
    "address": "Calle Salvador Pérez, s/n",
    "locality": "39800 Ramales de la Victoria",
    "phone": "+34942678487",
    "stays": [
      "ramales"
    ],
    "website": "https://www.scsalud.es/buscador-de-centros-sanitarios",
    "websiteLabel": "source",
    "approvedByOwner": true,
    "reviewedAt": "2026-09-29",
    "sources": [
      "https://www.cantabria.es/web/guia-de-comunicacion/home?_es_gobcantabria_liferay_gobierno_guia_comunicacion_GuiaComunicacionPortlet_INSTANCE_4wyHL9Mxa7vt_category=1141233&_es_gobcantabria_liferay_gobierno_guia_comunicacion_GuiaComunicacionPortlet_INSTANCE_4wyHL9Mxa7vt_format=pdf&p_p_cacheability=cacheLevelPage&p_p_id=es_gobcantabria_liferay_gobierno_guia_comunicacion_GuiaComunicacionPortlet_INSTANCE_4wyHL9Mxa7vt&p_p_lifecycle=2&p_p_mode=view&p_p_resource_id=downloadPdf&p_p_state=normal",
      "https://contrataciondelestado.es/wps/wcm/connect/PLACE_es/Site/area/docAccCmpnt?DocumentIdParam=f2bb93e5-dc8a-4c92-a815-c2b6491496c4&cmpntname=GetDocumentsById&source=library&srv=cmpnt"
    ],
    "kind": "healthCentre",
    "displayName": {
      "es": "Centro de Salud Alto Asón · Ramales",
      "en": "Alto Asón health centre · Ramales",
      "fr": "Centre de santé Alto Asón · Ramales",
      "de": "Gesundheitszentrum Alto Asón · Ramales",
      "nl": "Gezondheidscentrum Alto Asón · Ramales"
    }
  },
  {
    "id": "hospital-sierrallana",
    "name": "Hospital Sierrallana",
    "category": "health",
    "address": "Barrio de Ganzo, s/n",
    "locality": "39300 Torrelavega",
    "phone": "+34942847400",
    "stays": [
      "oyambre",
      "cardeo",
      "verdemar",
      "ruiloba",
      "ramales"
    ],
    "website": "https://www.scsalud.es/hospital-de-sierrallana-home",
    "websiteLabel": "source",
    "approvedByOwner": true,
    "reviewedAt": "2026-09-29",
    "sources": [
      "https://www.scsalud.es/contactar_scs"
    ],
    "kind": "hospital"
  },
  {
    "id": "hospital-valdecilla",
    "name": "Hospital Universitario Marqués de Valdecilla",
    "category": "health",
    "address": "Avenida de Valdecilla, s/n",
    "locality": "39008 Santander",
    "phone": "+34942202520",
    "stays": [
      "oyambre",
      "cardeo",
      "verdemar",
      "ruiloba",
      "ramales"
    ],
    "website": "https://www.humv.es/ubicacion-y-contacto/",
    "websiteLabel": "source",
    "approvedByOwner": true,
    "reviewedAt": "2026-09-29",
    "sources": [
      "https://www.humv.es/ubicacion-y-contacto/",
      "https://www.scsalud.es/contactar_scs"
    ],
    "kind": "hospital"
  },
  {
    "id": "hospital-laredo",
    "name": "Hospital de Laredo",
    "category": "health",
    "address": "Avenida Derechos Humanos, s/n",
    "locality": "39770 Laredo",
    "phone": "+34942638500",
    "stays": [
      "ramales"
    ],
    "website": "https://hospitaldelaredo.es/",
    "websiteLabel": "source",
    "approvedByOwner": true,
    "reviewedAt": "2026-09-29",
    "sources": [
      "https://www.scsalud.es/contactar_scs",
      "https://hospitaldelaredo.es/ciudadanos/como-llegar"
    ],
    "kind": "hospital",
    "coordinates": {
      "lat": 43.41399,
      "lon": -3.4419
    }
  },
  {
    "id": "pharmacy-ramales-paula-ruiz-zurdo",
    "name": "Farmacia Paula Ruiz Zurdo",
    "category": "pharmacy",
    "address": "Avenida Miguel de Cervantes, 6",
    "locality": "39800 Ramales de la Victoria",
    "town": "Ramales de la Victoria",
    "phone": "+34 942 102 817",
    "stays": [
      "ramales"
    ],
    "approvedByOwner": true,
    "reviewedAt": "2026-09-29",
    "website": "https://www.cofcantabria.org/Entidades/Ficha.aspx?Cod=8fa4bd4e-f34e-4dd5-9790-5bd36f16d664&IdMenu=df34e502-507b-494f-a119-68244e4a5d9c&Idioma=es-ES",
    "websiteLabel": "source",
    "sources": [
      "https://www.cofcantabria.org/Entidades/Ficha.aspx?Cod=8fa4bd4e-f34e-4dd5-9790-5bd36f16d664&IdMenu=df34e502-507b-494f-a119-68244e4a5d9c&Idioma=es-ES",
      "https://www.cofcantabria.org/Entidades/Listado.aspx?IdMenu=df34e502-507b-494f-a119-68244e4a5d9c&Idioma=es-ES"
    ],
    "cofNumber": 65
  },
  {
    "id": "pharmacy-ampuero-adriana-avendano-pescador",
    "name": "Farmacia Adriana Avendaño Pescador",
    "category": "pharmacy",
    "address": "Calle del Progreso, 1",
    "locality": "39840 Ampuero",
    "town": "Ampuero",
    "phone": "+34 942 634 192",
    "stays": [
      "ramales"
    ],
    "approvedByOwner": true,
    "reviewedAt": "2026-09-29",
    "website": "https://www.cofcantabria.org/Entidades/Ficha.aspx?Cod=ddc49ef0-24f8-434c-b6cb-e6bb2390021f&IdMenu=df34e502-507b-494f-a119-68244e4a5d9c&Idioma=es-ES",
    "websiteLabel": "source",
    "sources": [
      "https://www.cofcantabria.org/Entidades/Ficha.aspx?Cod=ddc49ef0-24f8-434c-b6cb-e6bb2390021f&IdMenu=df34e502-507b-494f-a119-68244e4a5d9c&Idioma=es-ES",
      "https://www.cofcantabria.org/Entidades/Listado.aspx?IdMenu=df34e502-507b-494f-a119-68244e4a5d9c&Idioma=es-ES"
    ],
    "cofNumber": 34
  },
  {
    "id": "pharmacy-limpias-veronica-fernandez-baldor-anibarro",
    "name": "Farmacia Verónica Fernández-Baldor Añíbarro",
    "category": "pharmacy",
    "address": "Calle La Atalaya, 5",
    "locality": "39820 Limpias",
    "town": "Limpias",
    "phone": "+34 942 622 400",
    "stays": [
      "ramales"
    ],
    "approvedByOwner": true,
    "reviewedAt": "2026-09-29",
    "website": "https://www.cofcantabria.org/Entidades/Ficha.aspx?Cod=e5dbed58-539e-4963-9c1d-03a2d2b9fb54&IdMenu=df34e502-507b-494f-a119-68244e4a5d9c&Idioma=es-ES",
    "websiteLabel": "source",
    "sources": [
      "https://www.cofcantabria.org/Entidades/Ficha.aspx?Cod=e5dbed58-539e-4963-9c1d-03a2d2b9fb54&IdMenu=df34e502-507b-494f-a119-68244e4a5d9c&Idioma=es-ES",
      "https://www.cofcantabria.org/Entidades/Listado.aspx?IdMenu=df34e502-507b-494f-a119-68244e4a5d9c&Idioma=es-ES"
    ],
    "cofNumber": 190
  },
  {
    "id": "pharmacy-laredo-susana-amini-dehesa",
    "name": "Farmacia Susana Amini Dehesa",
    "category": "pharmacy",
    "address": "Calle Eguilior, 4",
    "locality": "39770 Laredo",
    "town": "Laredo",
    "phone": "+34 942 610 796",
    "stays": [
      "ramales"
    ],
    "approvedByOwner": true,
    "reviewedAt": "2026-09-29",
    "website": "https://www.cofcantabria.org/Entidades/Listado.aspx?IdMenu=df34e502-507b-494f-a119-68244e4a5d9c&Idioma=es-ES",
    "websiteLabel": "source",
    "sources": [
      "https://www.cofcantabria.org/Entidades/Listado.aspx?IdMenu=df34e502-507b-494f-a119-68244e4a5d9c&Idioma=es-ES"
    ],
    "cofNumber": 137
  },
  {
    "id": "pharmacy-laredo-felipe-diego-crespo",
    "name": "Farmacia Felipe Diego Crespo",
    "category": "pharmacy",
    "address": "Avenida de España, 20",
    "locality": "39770 Laredo",
    "town": "Laredo",
    "phone": "+34 942 607 089",
    "stays": [
      "ramales"
    ],
    "approvedByOwner": true,
    "reviewedAt": "2026-09-29",
    "website": "https://www.cofcantabria.org/Entidades/Ficha.aspx?Cod=c9a0cd54-a7a1-4920-9e0e-aa70b0b5a67a&IdMenu=df34e502-507b-494f-a119-68244e4a5d9c&Idioma=es-ES",
    "websiteLabel": "source",
    "sources": [
      "https://www.cofcantabria.org/Entidades/Ficha.aspx?Cod=c9a0cd54-a7a1-4920-9e0e-aa70b0b5a67a&IdMenu=df34e502-507b-494f-a119-68244e4a5d9c&Idioma=es-ES",
      "https://www.cofcantabria.org/Entidades/Listado.aspx?IdMenu=df34e502-507b-494f-a119-68244e4a5d9c&Idioma=es-ES"
    ],
    "cofNumber": 102
  },
  {
    "id": "pharmacy-laredo-laura-diego-del-rio",
    "name": "Farmacia Laura Diego del Río",
    "category": "pharmacy",
    "address": "Calle Villa de Foz, 1",
    "locality": "39770 Laredo",
    "town": "Laredo",
    "phone": "+34 942 605 291",
    "stays": [
      "ramales"
    ],
    "approvedByOwner": true,
    "reviewedAt": "2026-09-29",
    "website": "https://www.cofcantabria.org/Entidades/Ficha.aspx?Cod=9cae0a7b-266a-42f0-980a-ed2803a42e63&IdMenu=df34e502-507b-494f-a119-68244e4a5d9c&Idioma=es-ES",
    "websiteLabel": "source",
    "sources": [
      "https://www.cofcantabria.org/Entidades/Ficha.aspx?Cod=9cae0a7b-266a-42f0-980a-ed2803a42e63&IdMenu=df34e502-507b-494f-a119-68244e4a5d9c&Idioma=es-ES",
      "https://www.cofcantabria.org/Entidades/Listado.aspx?IdMenu=df34e502-507b-494f-a119-68244e4a5d9c&Idioma=es-ES"
    ],
    "cofNumber": 233
  },
  {
    "id": "pharmacy-laredo-fatima-de-la-fuente-del-rey",
    "name": "Farmacia María Fátima de la Fuente del Rey",
    "category": "pharmacy",
    "address": "Calle Marqués de Comillas, 13",
    "locality": "39770 Laredo",
    "town": "Laredo",
    "phone": "+34 942 605 338",
    "stays": [
      "ramales"
    ],
    "approvedByOwner": true,
    "reviewedAt": "2026-09-29",
    "website": "https://www.cofcantabria.org/Entidades/Ficha.aspx?Cod=cc354f31-cfe3-4dde-8e6b-82d70b7974b8&IdMenu=df34e502-507b-494f-a119-68244e4a5d9c&Idioma=es-ES",
    "websiteLabel": "source",
    "sources": [
      "https://www.cofcantabria.org/Entidades/Ficha.aspx?Cod=cc354f31-cfe3-4dde-8e6b-82d70b7974b8&IdMenu=df34e502-507b-494f-a119-68244e4a5d9c&Idioma=es-ES",
      "https://www.cofcantabria.org/Entidades/Listado.aspx?IdMenu=df34e502-507b-494f-a119-68244e4a5d9c&Idioma=es-ES"
    ],
    "cofNumber": 191
  },
  {
    "id": "pharmacy-laredo-amparo-gobantes-san-emeterio",
    "name": "Farmacia María Amparo Gobantes San Emeterio",
    "category": "pharmacy",
    "address": "Plaza de la Constitución, 9-11",
    "locality": "39770 Laredo",
    "town": "Laredo",
    "phone": "+34 942 605 103",
    "stays": [
      "ramales"
    ],
    "approvedByOwner": true,
    "reviewedAt": "2026-09-29",
    "website": "https://www.cofcantabria.org/Entidades/Ficha.aspx?Cod=812754ba-b9d9-4247-baa1-fa5c02a51849&IdMenu=df34e502-507b-494f-a119-68244e4a5d9c&Idioma=es-ES",
    "websiteLabel": "source",
    "sources": [
      "https://www.cofcantabria.org/Entidades/Ficha.aspx?Cod=812754ba-b9d9-4247-baa1-fa5c02a51849&IdMenu=df34e502-507b-494f-a119-68244e4a5d9c&Idioma=es-ES",
      "https://www.cofcantabria.org/Entidades/Listado.aspx?IdMenu=df34e502-507b-494f-a119-68244e4a5d9c&Idioma=es-ES"
    ],
    "cofNumber": 32
  },
  {
    "id": "pharmacy-laredo-natividad-vara-martinez",
    "name": "Farmacia Natividad Vara Martínez",
    "category": "pharmacy",
    "address": "Avenida de la Libertad, 25",
    "locality": "39770 Laredo",
    "town": "Laredo",
    "phone": "+34 942 603 585",
    "stays": [
      "ramales"
    ],
    "approvedByOwner": true,
    "reviewedAt": "2026-09-29",
    "website": "https://www.cofcantabria.org/Entidades/Ficha.aspx?Cod=edc28031-f983-4253-8c94-ab33295671b4&IdMenu=df34e502-507b-494f-a119-68244e4a5d9c&Idioma=es-ES",
    "websiteLabel": "source",
    "sources": [
      "https://www.cofcantabria.org/Entidades/Ficha.aspx?Cod=edc28031-f983-4253-8c94-ab33295671b4&IdMenu=df34e502-507b-494f-a119-68244e4a5d9c&Idioma=es-ES",
      "https://www.cofcantabria.org/Entidades/Listado.aspx?IdMenu=df34e502-507b-494f-a119-68244e4a5d9c&Idioma=es-ES"
    ],
    "cofNumber": 207
  },
  {
    "id": "vet-san-vicente-pablo",
    "name": "La Clínica de Pablo",
    "category": "vet",
    "address": "Calle Padre Ángel, 26, bajo",
    "locality": "39540 San Vicente de la Barquera",
    "town": "San Vicente de la Barquera",
    "stays": [
      "oyambre",
      "ruiloba",
      "cardeo",
      "verdemar"
    ],
    "approvedByOwner": true,
    "reviewedAt": "2026-09-29",
    "sources": [
      "https://www.laclinicadepablo.com/",
      "https://www.afodeb.es/clinica-veterinaria-la-clinica-de-pablo",
      "https://cantabria.vucolvet.org/sociedades-profesionales"
    ],
    "phone": "+34 942 710 041",
    "website": "https://www.laclinicadepablo.com/",
    "recommendedByOwner": true
  },
  {
    "id": "vet-comillas",
    "name": "Centro Veterinario Comillas",
    "category": "vet",
    "address": "Barrio Rovacías, s/n",
    "locality": "39520 Comillas",
    "town": "Comillas",
    "stays": [
      "oyambre",
      "ruiloba",
      "cardeo",
      "verdemar"
    ],
    "approvedByOwner": true,
    "reviewedAt": "2026-09-29",
    "sources": [
      "https://www.clinicaveterinarialabarquera.es/",
      "https://www.clinicaveterinarialabarquera.es/contacto/"
    ],
    "phone": "+34 942 722 553",
    "website": "https://www.clinicaveterinarialabarquera.es/"
  },
  {
    "id": "vet-ramales-sauga",
    "name": "Clínica Veterinaria Sauga Alto Asón",
    "category": "vet",
    "address": "Calle Alcalde Domingo Gómez Maza, Urbanización Los Acebos, 7, bajo",
    "locality": "39800 Ramales de la Victoria",
    "town": "Ramales de la Victoria",
    "stays": [
      "ramales"
    ],
    "approvedByOwner": true,
    "reviewedAt": "2026-09-29",
    "sources": [
      "https://comprasaltoasonadl8.wixsite.com/website/servicios-agropecuarios-ganader%C3%ADa",
      "https://www.laparovet.es/clinicas",
      "https://www.colvet.es/es/62-Empleo/19746-SE-PRECISA-VETERINARIO-EN-CANTABRIA.htm"
    ],
    "phone": "+34 942 646 584",
    "website": "https://comprasaltoasonadl8.wixsite.com/website/servicios-agropecuarios-ganader%C3%ADa",
    "websiteLabel": "source"
  },
  {
    "id": "vet-ramales-centro",
    "name": "Centro Veterinario Ramales",
    "category": "vet",
    "address": "Barrio Veares, s/n",
    "locality": "39800 Ramales de la Victoria",
    "town": "Ramales de la Victoria",
    "stays": [
      "ramales"
    ],
    "approvedByOwner": true,
    "reviewedAt": "2026-09-29",
    "sources": [
      "https://www.paginasamarillas.es/f/ramales-de-la-victoria/centro-veterinario-ramales_231073222_000000001.html",
      "https://vetclub.es/veterinario/centro-veterinario-ramales-ramales-de-la-victoria/"
    ],
    "phone": "+34 608 822 091",
    "website": "https://www.paginasamarillas.es/f/ramales-de-la-victoria/centro-veterinario-ramales_231073222_000000001.html",
    "websiteLabel": "source",
    "phoneVerification": "secondary_sources_agree"
  },
  {
    "id": "vet-ramales-nam",
    "name": "NAM Veterinaria Ramales",
    "category": "vet",
    "address": "Calle Trefilería, 5",
    "locality": "39800 Ramales de la Victoria",
    "town": "Ramales de la Victoria",
    "stays": [
      "ramales"
    ],
    "approvedByOwner": true,
    "reviewedAt": "2026-09-29",
    "sources": [
      "https://www.lineaverderamales.org/lv/comunicaciones.asp?comunicacion=623000&page=7",
      "https://veterinarioscerca.es/veterinarios/nam-veterinaria/",
      "https://firmania.es/ramales-de-la-victoria/nam-veterinaria-ramales-2707482"
    ],
    "website": "https://www.lineaverderamales.org/lv/comunicaciones.asp?comunicacion=623000&page=7",
    "websiteLabel": "source",
    "phoneVerification": "omitted_pending_confirmation"
  },
  {
    "id": "supermarket-lupa-san-vicente-padre-angel",
    "name": "Lupa · Calle Padre Ángel",
    "category": "supermarket",
    "chain": "Lupa",
    "address": "Calle Padre Ángel, s/n",
    "locality": "39540 San Vicente de la Barquera",
    "stays": [
      "oyambre",
      "cardeo",
      "verdemar"
    ],
    "approvedByOwner": true,
    "reviewedAt": "2026-09-29",
    "website": "https://lupa.com/localizador-de-tiendas/lupa-calle-padre-angel-s-n",
    "sources": [
      "https://lupa.com/localizador-de-tiendas/lupa-calle-padre-angel-s-n",
      "https://lupa.com/localizador-de-tiendas"
    ],
    "coordinates": {
      "lat": 43.3828412,
      "lon": -4.3991605
    },
    "coordinateSource": "https://lupa.com/localizador-de-tiendas/lupa-calle-padre-angel-s-n"
  },
  {
    "id": "supermarket-lupa-comillas-cervantes",
    "name": "Lupa · Calle Cervantes",
    "category": "supermarket",
    "chain": "Lupa",
    "address": "Calle Cervantes, s/n",
    "locality": "39520 Comillas",
    "stays": [
      "oyambre",
      "ruiloba",
      "cardeo",
      "verdemar"
    ],
    "approvedByOwner": true,
    "reviewedAt": "2026-09-29",
    "website": "https://lupa.com/localizador-de-tiendas/lupa-calle-cervantes-s-n",
    "sources": [
      "https://lupa.com/localizador-de-tiendas/lupa-calle-cervantes-s-n",
      "https://lupa.com/localizador-de-tiendas"
    ],
    "coordinates": {
      "lat": 43.385362,
      "lon": -4.29115388
    },
    "coordinateSource": "https://lupa.com/localizador-de-tiendas/lupa-calle-cervantes-s-n"
  },
  {
    "id": "supermarket-lupa-comillas-paseo-estrada",
    "name": "Lupa · Paseo Estrada",
    "category": "supermarket",
    "chain": "Lupa",
    "address": "Paseo Estrada, s/n",
    "locality": "39520 Comillas",
    "stays": [
      "oyambre",
      "ruiloba",
      "cardeo",
      "verdemar"
    ],
    "approvedByOwner": true,
    "reviewedAt": "2026-09-29",
    "website": "https://lupa.com/localizador-de-tiendas/lupa-paseo-estrada-s-n",
    "sources": [
      "https://lupa.com/localizador-de-tiendas/lupa-paseo-estrada-s-n",
      "https://lupa.com/localizador-de-tiendas"
    ],
    "coordinates": {
      "lat": 43.3825527,
      "lon": -4.2895345
    },
    "coordinateSource": "https://lupa.com/localizador-de-tiendas/lupa-paseo-estrada-s-n"
  },
  {
    "id": "supermarket-lupa-ramales-baron-adzaneta",
    "name": "Lupa · Paseo Barón de Adzaneta",
    "category": "supermarket",
    "chain": "Lupa",
    "address": "Paseo Barón de Adzaneta, 10",
    "locality": "39800 Ramales de la Victoria",
    "stays": [
      "ramales"
    ],
    "approvedByOwner": true,
    "reviewedAt": "2026-09-29",
    "website": "https://lupa.com/localizador-de-tiendas/lupa-paseo-baron-de-adzaneta-10",
    "sources": [
      "https://lupa.com/localizador-de-tiendas/lupa-paseo-baron-de-adzaneta-10",
      "https://lupa.com/localizador-de-tiendas"
    ],
    "coordinates": {
      "lat": 43.2558134,
      "lon": -3.4649136
    },
    "coordinateSource": "https://lupa.com/localizador-de-tiendas/lupa-paseo-baron-de-adzaneta-10"
  },
  {
    "id": "supermarket-lupa-ramales-menendez-pelayo",
    "name": "Lupa · Menéndez Pelayo",
    "category": "supermarket",
    "chain": "Lupa",
    "address": "Calle Menéndez Pelayo, 7",
    "locality": "39800 Ramales de la Victoria",
    "stays": [
      "ramales"
    ],
    "approvedByOwner": true,
    "reviewedAt": "2026-09-29",
    "website": "https://lupa.com/localizador-de-tiendas/calle-menendez-pelayo-7",
    "sources": [
      "https://lupa.com/localizador-de-tiendas/calle-menendez-pelayo-7",
      "https://lupa.com/localizador-de-tiendas"
    ],
    "coordinates": {
      "lat": 43.2611047,
      "lon": -3.4677256
    },
    "coordinateSource": "https://lupa.com/localizador-de-tiendas/calle-menendez-pelayo-7"
  },
  {
    "id": "supermarket-lupa-ampuero-melchor-torio",
    "name": "Lupa · Melchor Torio",
    "category": "supermarket",
    "chain": "Lupa",
    "address": "Calle Melchor Torio, 12-14",
    "locality": "39840 Ampuero",
    "stays": [
      "ramales"
    ],
    "approvedByOwner": true,
    "reviewedAt": "2026-09-29",
    "website": "https://lupa.com/localizador-de-tiendas/lupa-calle-melchor-torio-12-14",
    "sources": [
      "https://lupa.com/localizador-de-tiendas/lupa-calle-melchor-torio-12-14",
      "https://lupa.com/localizador-de-tiendas"
    ],
    "coordinates": {
      "lat": 43.343005,
      "lon": -3.4164906
    },
    "coordinateSource": "https://lupa.com/localizador-de-tiendas/lupa-calle-melchor-torio-12-14"
  },
  {
    "id": "supermarket-bm-laredo-martinez-balaguer",
    "name": "BM Complet · Martínez Balaguer",
    "category": "supermarket",
    "chain": "BM",
    "address": "Calle Martínez Balaguer, 6",
    "locality": "39770 Laredo",
    "stays": [
      "ramales"
    ],
    "approvedByOwner": true,
    "reviewedAt": "2026-09-29",
    "phone": "+34 942 610 078",
    "website": "https://www.bmsupermercados.es/tienda-14526.htm",
    "sources": [
      "https://www.bmsupermercados.es/tienda-14526.htm"
    ]
  },
  {
    "id": "supermarket-mercadona-cabezon-las-navas",
    "name": "Mercadona · Cabezón de la Sal",
    "category": "supermarket",
    "chain": "Mercadona",
    "address": "Polígono Las Navas, 1",
    "locality": "Cabezón de la Sal",
    "stays": [
      "oyambre",
      "ruiloba",
      "cardeo",
      "verdemar"
    ],
    "approvedByOwner": true,
    "reviewedAt": "2026-09-29",
    "website": "https://info.mercadona.es/es/supermercados",
    "sources": [
      "https://info.mercadona.es/document/es/listado-tiendas-listo-para-comer-0.pdf"
    ],
    "verificationNote": "Address verified in indexed content of an official Mercadona store-list PDF. Direct retrieval of the PDF and live locator returned 403; no phone, marker coordinates or operating hours inferred."
  },
  {
    "id": "supermarket-mercadona-laredo-wenceslao-lopez-albo",
    "name": "Mercadona · Laredo",
    "category": "supermarket",
    "chain": "Mercadona",
    "address": "Calle Wenceslao López Albo, 15",
    "locality": "Laredo",
    "stays": [
      "ramales"
    ],
    "approvedByOwner": true,
    "reviewedAt": "2026-09-29",
    "website": "https://info.mercadona.es/es/supermercados",
    "sources": [
      "https://info.mercadona.es/document/es/listado-tiendas-listo-para-comer-0.pdf"
    ],
    "verificationNote": "Address verified in indexed content of an official Mercadona store-list PDF. Direct retrieval of the PDF and live locator returned 403; no phone, marker coordinates or operating hours inferred."
  },
  {
    "id": "supermarket-carrefour-torrelavega",
    "name": "Carrefour Torrelavega",
    "category": "supermarket",
    "chain": "Carrefour",
    "address": "Avenida Bilbao, s/n · Polígono Los Ochos",
    "locality": "39300 Torrelavega",
    "stays": [
      "oyambre",
      "ruiloba",
      "cardeo",
      "verdemar"
    ],
    "approvedByOwner": true,
    "reviewedAt": "2026-09-29",
    "phone": "+34 942 846 021",
    "website": "https://www.carrefour.es/tiendas-carrefour/hipermercados/carrefour/torrelavega.aspx",
    "sources": [
      "https://www.carrefour.es/tiendas-carrefour/hipermercados/carrefour/torrelavega.aspx"
    ],
    "selectionNote": "Verified broader-area shopping option; held outside primary records because it is in Torrelavega, beyond the initially requested San Vicente/Comillas/Cabezón cluster. Do not label as a local walkable or nearest store.",
    "description": {
      "es": "Opción en Torrelavega, para desplazamientos más largos.",
      "en": "An option in Torrelavega for a longer shopping trip.",
      "fr": "Une option à Torrelavega, pour un trajet plus long.",
      "de": "Eine Einkaufsmöglichkeit in Torrelavega mit längerer Anfahrt.",
      "nl": "Een optie in Torrelavega waarvoor je verder moet rijden."
    }
  },
  {
    "id": "bus-ramales-laredo",
    "name": "Autobús Ramales ↔ Laredo",
    "category": "mobility",
    "kind": "bus",
    "stays": [
      "ramales"
    ],
    "locality": "Ramales de la Victoria · Laredo",
    "approvedByOwner": true,
    "reviewedAt": "2026-09-29",
    "displayName": {
      "es": "Autobús Ramales ↔ Laredo",
      "en": "Ramales ↔ Laredo bus",
      "fr": "Bus Ramales ↔ Laredo",
      "de": "Bus Ramales ↔ Laredo",
      "nl": "Bus Ramales ↔ Laredo"
    },
    "phone": "+34 910 207 007",
    "website": "https://www.alsa.es/horarios-autobuses",
    "description": {
      "es": "Servicio directo entre Ramales de la Victoria y Laredo, operado por Turytrans (ALSA). Forma parte de la línea K4816 Laredo–Ramales–Bustablado.",
      "en": "Direct bus service between Ramales de la Victoria and Laredo, operated by Turytrans (ALSA). Part of route K4816 Laredo–Ramales–Bustablado.",
      "fr": "Liaison directe entre Ramales de la Victoria et Laredo, assurée par Turytrans (ALSA). Elle fait partie de la ligne K4816 Laredo–Ramales–Bustablado.",
      "de": "Direkte Busverbindung zwischen Ramales de la Victoria und Laredo, betrieben von Turytrans (ALSA). Teil der Linie K4816 Laredo–Ramales–Bustablado.",
      "nl": "Rechtstreekse busverbinding tussen Ramales de la Victoria en Laredo, uitgevoerd door Turytrans (ALSA). Onderdeel van lijn K4816 Laredo–Ramales–Bustablado."
    },
    "notice": {
      "es": "Consulta los horarios para la fecha de tu viaje. El teléfono corresponde a atención al cliente de ALSA.",
      "en": "Check the timetable for your travel date. The phone number is for ALSA customer service.",
      "fr": "Consultez les horaires pour la date de votre voyage. Le numéro de téléphone est celui du service client ALSA.",
      "de": "Prüfen Sie den Fahrplan für Ihren Reisetag. Die Telefonnummer gehört zum ALSA-Kundenservice.",
      "nl": "Bekijk de dienstregeling voor je reisdatum. Het telefoonnummer is van de klantenservice van ALSA."
    },
    "sources": [
      "https://transportedecantabria.es/web/ctl/estaciones-autobus/-/estacion/43302",
      "https://www.transportedecantabria.es/consulta-servicios-publicos-regionales-disponibles-municipio",
      "https://www.alsa.es/horarios-autobuses",
      "https://www.alsa.es/ayuda/como-contactar-desde-el-extranjero/-/asset_publisher/gtBV5MaTtZVE/"
    ]
  }
];
