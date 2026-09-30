// Fixed public beach locations from the official Portus catalog; verified 2026-09-30.
window.ACOBIJO_BEACHES = [
  {
    "id": "oyambre",
    "name": "Oyambre",
    "portusCode": 31137,
    "lat": 43.3909988,
    "lon": -4.33099985,
    "wavePoint": {
      "lat": 43.417,
      "lon": -4.333
    },
    "waveGraph": "https://portus.puertos.es/PortusData/predChart?code=3124034&var=Tp,Hm0&dirVar=MeanDir180&int=min&locale=es",
    "seaLevelGraph": "https://portus.puertos.es/PortusData/nivmarChart?code=31137&var=SeaLevel,SeaSea,Residual&int=min&locale=es",
    "officialUrl": "https://portus.puertos.es/#/locationsWidget?code=31137&locale=es"
  },
  {
    "id": "comillas",
    "name": "Comillas",
    "portusCode": 31136,
    "lat": 43.3899994,
    "lon": -4.28800011,
    "wavePoint": {
      "lat": 43.417,
      "lon": -4.292
    },
    "waveGraph": "https://portus.puertos.es/PortusData/predChart?code=3125034&var=Tp,Hm0&dirVar=MeanDir180&int=min&locale=es",
    "seaLevelGraph": "https://portus.puertos.es/PortusData/nivmarChart?code=31136&var=SeaLevel,SeaSea,Residual&int=min&locale=es",
    "officialUrl": "https://portus.puertos.es/#/locationsWidget?code=31136&locale=es"
  },
  {
    "id": "el-cabo",
    "name": "El Cabo (S. Vicente de la Barquera)",
    "portusCode": 31138,
    "lat": 43.3979988,
    "lon": -4.35900021,
    "wavePoint": {
      "lat": 43.417,
      "lon": -4.333
    },
    "waveGraph": "https://portus.puertos.es/PortusData/predChart?code=3124034&var=Tp,Hm0&dirVar=MeanDir180&int=min&locale=es",
    "seaLevelGraph": "https://portus.puertos.es/PortusData/nivmarChart?code=31138&var=SeaLevel,SeaSea,Residual&int=min&locale=es",
    "officialUrl": "https://portus.puertos.es/#/locationsWidget?code=31138&locale=es"
  },
  {
    "id": "laredo",
    "name": "La Salve (Laredo)",
    "portusCode": 31121,
    "lat": 43.4119987,
    "lon": -3.42199993,
    "wavePoint": {
      "lat": 43.417,
      "lon": -3.422
    },
    "waveGraph": "https://portus.puertos.es/PortusData/predChart?code=3146034&var=Tp,Hm0&dirVar=MeanDir180&int=min&locale=es",
    "seaLevelGraph": "https://portus.puertos.es/PortusData/nivmarChart?code=31121&var=SeaLevel,SeaSea,Residual&int=min&locale=es",
    "officialUrl": "https://portus.puertos.es/#/locationsWidget?code=31121&locale=es"
  }
];
window.ACOBIJO_BEACH_DEFAULTS = {oyambre:"oyambre",cardeo:"oyambre",verdemar:"oyambre",ruiloba:"comillas",ramales:"laredo"};
