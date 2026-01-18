import { BioStage, Achievement, Disc, Testimonial, BookHighlight, Video, Song } from './types';

export const BOOK_STORE_LINKS = {
  amazon: "#", 
  apple: "#",
  google: "#"
};

export const BOOK_IMAGE_URL = "https://www.webcincodev.com/blog/wp-content/uploads/2026/01/HEADERS.png";

export const LEGEND_STATS = [
  { label: "Años de Trayectoria", value: "70", suffix: "+" },
  { label: "Álbumes Producidos", value: "50", suffix: "+" },
  { label: "Países Conquistados", value: "30", suffix: "+" },
  { label: "Clásicos en el Baúl", value: "100", suffix: "+" }
];

export const HISTORICAL_GALLERY_IMAGES = [
  "https://www.puertadetierra.info/figuras/artistas/juan/Juan_Lopez.jpg",
  "https://i.scdn.co/image/ab67616d0000b273ed4d9e27bfff9e88aa9676ed",
  "https://latinastereo.com/wp-content/uploads/2023/05/Johnny-El-Bravo-1.jpg",
  "https://i.ytimg.com/vi/rakaiyUz8gI/maxresdefault.jpg",
  "https://i.pinimg.com/736x/c0/20/0b/c0200b45206d1090ca129206702f5f23.jpg",
  "https://i.imgur.com/cVriOid.jpg",
  "https://i.ytimg.com/vi/dehdXfZ-acE/hqdefault.jpg",
  "https://i.scdn.co/image/ab67616d00001e023aba6e408da42f875d0ca820",
  "https://cloudfront-us-east-1.images.arcpublishing.com/vanguardiaeluniversal/IXPERGOIPVAZPG2K7ZSCIUZWUY.jpg"
];

export const BIO_STAGES: BioStage[] = [
  {
    id: "stage-1944",
    year: "1944",
    title: "Origen: Puerta de Tierra",
    description: "Nacimiento de una leyenda en el Residencial San Agustín.",
    longText: "Nacido el 4 de mayo de 1944 en San Juan. De familia humilde, Johnny fue el quinto de seis hermanos. Su madre, Genoveva 'Purula' Llanos, fue su primera gran influencia musical.",
    image: "https://i.pinimg.com/originals/39/9d/00/399d008299cf7b027b3912fa483b21ec.jpg"
  },
  {
    id: "stage-1961",
    year: "1961",
    title: "Giro del Destino",
    description: "Del diamante del béisbol al cuero de las congas.",
    longText: "Una lesión grave en su brazo derecho truncó su carrera como beisbolista. Ese mismo brazo encontraría la fuerza en la percusión.",
    image: "https://www.webcincodev.com/blog/wp-content/uploads/2026/01/ChatGPT-Image-17-ene-2026-14_45_09.png"
  },
  {
    id: "stage-1969",
    year: "1969",
    title: "LATIN SOUL",
    description: "La era dorada del Boogaloo y el Soul latino.",
    longText: "Lanza dos álbumes con Velvet. Incluye el tema 'Este Es' del maestro Tite Curet Alonso.",
    image: "https://i.discogs.com/ryd26gTLLyiVAf4x38vMSfyWIcyC6cjI-1xHLjaO9-g/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI2ODY0/NzAtMTI5NjU1NzYy/Mi5qcGVn.jpeg"
  },
  {
    id: "stage-1972",
    year: "1972",
    title: "GUEDE ZAINA",
    description: "El impacto mundial de un sonido crudo y auténtico.",
    longText: "Grabado para Horóscopo Records, este álbum redefinió la salsa dura neoyorquina con sabor puertorriqueño.",
    image: "https://img.discogs.com/Xwdcbl-bxGB-rXxyf_Osi7qmddk=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-4543635-1434420031-3762.jpeg.jpg"
  },
  {
    id: "stage-1982",
    year: "1982",
    title: "SI SUPIERAS",
    description: "El regreso triunfal de la mano de Discos Fuentes.",
    longText: "Graba en Colombia 'El Regreso'. El tema 'Si Supieras' se convierte en un éxito mundial ineludible.",
    image: "https://i.discogs.com/fcMvHRY6-rwPLnw7lDw9NvFHKsehOqZoq4uS-E6voBM/rs:fit/g:sm/q:90/h:600/w:384/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE2ODk3/NzA3LTE2MTA0NzM2/NjYtMTIxNC5qcGVn.jpeg"
  },
  {
    id: "stage-1989",
    year: "1989",
    title: "TE IMAGINAS",
    description: "Dominando la Salsa Romántica.",
    longText: "Johnny se adapta a los tiempos con un álbum que fue un éxito rotundo en Colombia y Venezuela.",
    image: "https://i1.sndcdn.com/artworks-000383758269-st4u9i-t500x500.jpg"
  },
  {
    id: "stage-2016",
    year: "2016",
    title: "CONGO DE ORO",
    description: "Consagración en el Carnaval de Barranquilla.",
    longText: "Johnny El Bravo recibió el Congo de Oro en el año 2016 en Barranquilla, Colombia, siendo reconocido como orquesta de salsa, galardón que se suma a otros premios importantes como su inclusión en el Salón de la Fama de Puerto Rico ese mismo año y diversos honores en Colombia por su trayectoria salsera.",
    image: "https://carnavaldebarranquilla.org/wp-content/uploads/2024/06/WhatsApp-Image-2024-06-17-at-9.45.50-AM-1.jpeg"
  },
  {
    id: "stage-2025",
    year: "2025",
    title: "EL LIBRO OFICIAL",
    description: "Una leyenda viva de la salsa y muchas historias.",
    longText: "El capítulo final de esta cronología celebra el lanzamiento de la obra definitiva. Johnny abre su corazón para narrar siete décadas de música y fe en 'Una leyenda viva de la salsa y muchas historias', escrito por Fabio Araque Guzmán.",
    image: "https://www.webcincodev.com/blog/wp-content/uploads/2026/01/HEADERS.png"
  }
];

export const DISCOGRAPHY: Disc[] = [
  {
    title: "This Is... Fabulous Latin Soul",
    year: "1969",
    label: "Velvet",
    image: "https://i.discogs.com/ryd26gTLLyiVAf4x38vMSfyWIcyC6cjI-1xHLjaO9-g/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI2ODY0/NzAtMTI5NjU1NzYy/Mi5qcGVn.jpeg",
    hits: ["Santa", "Bandera"]
  },
  {
    title: "Las Leyes Del Tránsito",
    year: "1970",
    label: "Seeco",
    image: "https://i.scdn.co/image/ab67616d0000b273ed4d9e27bfff9e88aa9676ed",
    hits: ["Las Leyes", "Tránsito Pesado"]
  },
  {
    title: "Te Imaginas",
    year: "1989",
    label: "Performance",
    image: "https://i1.sndcdn.com/artworks-000383758269-st4u9i-t500x500.jpg",
    hits: ["Te Imaginas", "Amada Mia"]
  }
];

export const TOP_SONGS: Song[] = [
  { title: "Besos Esclavos", album: "Éxito Baúl", url: "https://www.webcincodev.com/blog/wp-content/uploads/2026/01/Besos-Esclavos-_coro-nuevo.mp3" },
  { title: "Como Te Trata Tu Vecino", album: "Salsa Brava", url: "https://www.webcincodev.com/blog/wp-content/uploads/2026/01/Como-Te-Trata-Tu-Vecino-Jhonny-El-Bravo-Lopez.mp3" },
  { title: "Construyendo Proyecto", album: "Clásico", url: "https://www.webcincodev.com/blog/wp-content/uploads/2026/01/Construyendo-Proyecto-Jhonny-El-Bravo-Lopez.mp3" },
  { title: "Camina Canta y Baila", album: "Gozadera", url: "https://www.webcincodev.com/blog/wp-content/uploads/2026/01/9-Camina-canta-y-baila.wav" },
  { title: "Llena tu Boca de Risa", album: "Son Montuno", url: "https://www.webcincodev.com/blog/wp-content/uploads/2026/01/8-Llena-tu-boca-de-risa.wav" },
  { title: "Flor de Te", album: "Bolero Salsa", url: "https://www.webcincodev.com/blog/wp-content/uploads/2026/01/7-Flor-de-Te.wav" },
  { title: "Tu Cinturita con la Mia", album: "Pachanga", url: "https://www.webcincodev.com/blog/wp-content/uploads/2026/01/6-Tu-cinturita-con-la-mia.wav" },
  { title: "Carino Contigo Si", album: "Guaracha", url: "https://www.webcincodev.com/blog/wp-content/uploads/2026/01/5-Carino-Contigo-Si.wav" },
  { title: "Comparte tu Pan", album: "Mensaje", url: "https://www.webcincodev.com/blog/wp-content/uploads/2026/01/4-Comparte-tu-Pan.wav" },
  { title: "Yo voy Gozando", album: "Gozadera", url: "https://www.webcincodev.com/blog/wp-content/uploads/2026/01/2-Yo-voy-gozando.wav" },
  { title: "Maria Stela", album: "Clásico", url: "https://www.webcincodev.com/blog/wp-content/uploads/2026/01/1-Maria-Stela.wav" },
  { title: "Pa Alla Pa Alla", album: "Callejero", url: "https://www.webcincodev.com/blog/wp-content/uploads/2026/01/Pa-Alla-Pa-Alla-Jhonny-El-Bravo-Lopez.mp3" },
  { title: "No Hay Dinero", album: "El Bravo de Siempre", url: "https://www.webcincodev.com/blog/wp-content/uploads/2026/01/Johnny_El_Bravo_-_No_Hay_Dinero_mp3.pm_.mp3" },
  { title: "La Barola", album: "Guede Zaina", url: "https://www.webcincodev.com/blog/wp-content/uploads/2026/01/Johnny_El_Bravo_-_La_Barola_mp3.pm_.mp3" },
  { title: "Don Chu", album: "Salsa Jíbara", url: "https://www.webcincodev.com/blog/wp-content/uploads/2026/01/Chuito_El_De_Bayamon_-_Don_Chu_Con_Johnny_El_Bravo_mp3.pm_.mp3" },
  { title: "Si Supieras", album: "El Regreso", url: "https://www.webcincodev.com/blog/wp-content/uploads/2026/01/Johnny_El_Bravo_-_Si_Supieras_mp3.pm_.mp3" }
];

export const ACHIEVEMENTS: Achievement[] = [
  { year: "1970", title: "Agüeybaná de Oro - Orquesta del Año" },
  { year: "1973", title: "Disco de Oro por Guede Zaina" },
  { year: "2015", title: "Salón de la Fama de la Música de PR" },
  { year: "2016", title: "Congo de Oro - Barranquilla, Colombia" },
  { year: "2018", title: "Cien Mejores de la Cultura Latinoamericana" },
  { year: "2023", title: "Salsero del Mes - Latina Stereo" }
];

export const BOOK_HIGHLIGHTS: BookHighlight[] = [
  {
    title: "El Ritmo 'Sucky'",
    description: "La creación de un fenómeno que revolucionó a los estudiantes y fusionó ritmos del Caribe."
  },
  {
    title: "El Veto de la Zalsa",
    description: "Los años oscuros de la puja empresarial y por qué nunca fue invitado al Día Nacional."
  },
  {
    title: "Puerta de Tierra",
    description: "Crónica de un barrio que forjó a un Bravo a través de seis generaciones."
  }
];