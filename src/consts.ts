export const SITE_TITLE = "Mialacan";
export const SITE_DESCRIPTION =
  "Explorando la intersección entre tecnología, eventos memorables y productividad para el día a día.";

export const WHATSAPP = {
  baseUrl: "https://api.markentas.com/api/whatsapp",
  messages: {
    default:
      "Hola, me contacto desde mialacan.com, quisiera más información sobre las tarjetas digitales",
    invitaciones:
      "Hola, me contacto desde mialacan.com/invitaciones, quisiera más información sobre las invitaciones digitales",
    demo: (nombre: string) =>
      `Hola, me contacto desde la tarjeta ${nombre}, me gustó mucho, quisiera más información`,
    cta: "¿Tenés dudas sobre cuál elegir? Escribime y te ayudo a encontrar el diseño perfecto.",
    bienestar:
      "Hola, me contacto desde mialacan.com/bienestar, ¿cuál café con Ganoderma me conviene según mi rutina?",
  },
};

function buildWhatsAppUrl(message: string): string {
  return `${WHATSAPP.baseUrl}?src=${encodeURIComponent(message)}`;
}

export const WHATSAPP_URLS = {
  default: buildWhatsAppUrl(WHATSAPP.messages.default),
  invitaciones: buildWhatsAppUrl(WHATSAPP.messages.invitaciones),
  cta: buildWhatsAppUrl(WHATSAPP.messages.cta),
  demo: (nombre: string) => buildWhatsAppUrl(WHATSAPP.messages.demo(nombre)),
  bienestar: buildWhatsAppUrl(WHATSAPP.messages.bienestar),
};

export const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Invitaciones", href: "/invitaciones" },
  { label: "Blog", href: "/blog" },
  { label: "Bienestar", href: "/bienestar" },
];

export const HERO = {
  title: "Bienvenidos a Mialacan",
  subtitle:
    "Explorando la intersección entre tecnología, eventos memorables y productividad para el día a día.",
};

export const FEATURED = {
  title: "¿Organizas un evento?",
  description:
    "Sorprendé con invitaciones digitales interactivas y elegantes. Diseños exclusivos para bodas, 15 años, 18 años y más.",
  ctaText: "Ver Diseños",
  ctaLink: "/invitaciones",
  image: "/img/img-home-invitaciones.png",
};

export const BIENESTAR = {
  title: "El secreto de nuestra energía para programar y diseñar",
  description: "Conocé el café inteligente que potencia nuestras jornadas.",
  ctaText: "Conocer más",
  ctaLink: "/bienestar",
};

export const INVITACIONES_HERO = {
  title: "Diseños que Cuentan Tu Historia",
  subtitle:
    "Invitaciones digitales con los diseños que vos elegís. Sin complicaciones.",
  ctaText: "Consultar por WhatsApp",
};

export const CATEGORIAS = [
  {
    id: "15-anos",
    nombre: "15 Años",
    icono: "fa-birthday-cake",
    cantidad: 4,
    descripcion: "Diseños elegantes y románticos para tu quinceañera",
  },
  {
    id: "18-anos",
    nombre: "18 Años",
    icono: "fa-champagne-glasses",
    cantidad: 4,
    descripcion: "Looks modernos y sofisticados para tu mayoría de edad",
  },
  {
    id: "bodas",
    nombre: "Bodas",
    icono: "fa-ring",
    cantidad: 4,
    descripcion: "Diseños románticos y elegantes para tu gran día",
  },
];

export const DISENOS = [
  {
    id: "maria",
    nombre: "María",
    categoria: "15-anos",
    estilo: "Romántico",
    imagen: "/img/maria.png",
  },
  {
    id: "juana",
    nombre: "Juana",
    categoria: "15-anos",
    estilo: "Elegante",
    imagen: "/img/juana.png",
  },
  {
    id: "micaela",
    nombre: "Micaela",
    categoria: "15-anos",
    estilo: "Floral",
    imagen: "/img/micaela.png",
  },
  {
    id: "rebeca",
    nombre: "Rebeca",
    categoria: "15-anos",
    estilo: "Champagne",
    imagen: "/img/rebeca.png",
  },
  {
    id: "carlos",
    nombre: "Carlos",
    categoria: "18-anos",
    estilo: "Urbano",
    imagen: "/img/carlos.png",
  },
  {
    id: "fernando",
    nombre: "Fernando",
    categoria: "18-anos",
    estilo: "Natural",
    imagen: "/img/fernando.png",
  },
  {
    id: "julian",
    nombre: "Julian",
    categoria: "18-anos",
    estilo: "Náutico",
    imagen: "/img/julian.png",
  },
  {
    id: "omar",
    nombre: "Omar",
    categoria: "18-anos",
    estilo: "Elegante",
    imagen: "/img/omar.png",
  },
  {
    id: "boda-beso",
    nombre: "Boda Beso",
    categoria: "bodas",
    estilo: "Romántico",
    imagen: "/img/boda-beso.png",
  },
  {
    id: "boda-bosque",
    nombre: "Boda Bosque",
    categoria: "bodas",
    estilo: "Boho",
    imagen: "/img/boda-bosque.png",
  },
  {
    id: "boda-minimalista",
    nombre: "Boda Minimalista",
    categoria: "bodas",
    estilo: "Minimalista",
    imagen: "/img/boda-minimalista.png",
  },
  {
    id: "boda-signature",
    nombre: "Boda Signature",
    categoria: "bodas",
    estilo: "Clásico",
    imagen: "/img/boda-signature.png",
  },
];
