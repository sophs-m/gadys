// Imagens dos locais hospedadas no web (gadys-tcc.vercel.app)
// Chaves = nome EXATO retornado pelo banco (/api/locais/estado/{sigla})
const BASE = 'https://gadys-tcc.vercel.app';
const r = (p: string) => BASE + p;

export const localImageMap: Record<string, string> = {
  // ── AMAZONAS ────────────────────────────────────────────────────
  'Teatro Amazonas':                      '/images/geral/tea-am1.jpg',
  'Encontro das Águas':                   '/images/geral/en1-Am.jpg',
  'Arquipélago de Anavilhanas':           '/images/natureza/anavilhas.jpeg',
  'Amazônico Peixaria Regional':          '/images/geral/restama1.jpg',
  'Bumbódromo':                           '/images/geral/bum-Am.jpeg',
  'Cachoeira do Santuário':               '/images/geral/ca-Am.jpg',
  'Coreto Peixaria & Café Regional':      '/images/geral/res-Am.jpg',
  'Ponte Rio Negro':                      '/images/geral/pn-Am.jpg',
  // ── RIO DE JANEIRO ──────────────────────────────────────────────
  'Cristo Redentor':                      '/images/monumentos/cristo.jpg',
  'Pão de Açúcar':                        '/images/geral/pao.jpg',
  'Theatro Municipal':                    '/images/geral/Teatro_Municipal_de_São_Paulo_8.jpg',
  'Escadaria Selarón':                    '/images/geral/eam.jpg',
  'Arcos da Lapa':                        '/images/geral/eda-am.jpeg',
  'Museu do Amanhã':                      '/images/geral/pam.jpg',
  'Praia de Copacabana':                  '/images/geral/praiaEx.jpg',
  'Praia de Ipanema':                     '/images/geral/praiaEx.jpg',
  'Floresta da Tijuca':                   '/images/natureza/floresta.jpeg',
  'Lagoa Rodrigo de Freitas':             '/images/geral/praiaEx.jpg',
  'Jardim Botânico':                      '/images/natureza/floresta.jpeg',
  'Parque Lage':                          '/images/natureza/floresta.jpeg',
  // ── SÃO PAULO ───────────────────────────────────────────────────
  'MASP':                                 '/images/geral/masp.jpg',
  'Teatro Municipal':                     '/images/geral/Teatro_Municipal_de_São_Paulo_8.jpg',
  'Mercadão':                             '/images/monumentos/mercadaosp.jpg',
  'Edifício Copan':                       '/images/monumentos/copan.webp',
  'Parque Ibirapuera':                    '/images/geral/pqibi.webp',
  'Pinacoteca':                           '/images/geral/pina.webp',
  'Avenida Paulista':                     '/images/geral/paulista.jpg',
  'Beco do Batman':                       '/images/geral/bat.webp',
  // ── CEARÁ ───────────────────────────────────────────────────────
  'Jericoacoara':                         '/images/geral/Ceara1.webp',
  'Canoa Quebrada':                       '/images/geral/Ceara2.webp',
  'Centro Dragão do Mar':                 '/images/geral/Ceara3.jpg',
  'Beach Park':                           '/images/geral/CearaInicio.jpg',
  'Praia do Futuro':                      '/images/geral/ceara.webp',
  'Serra de Baturité':                    '/images/geral/Ceara2.webp',
  'Chapada do Araripe':                   '/images/geral/Ceara1.webp',
  'Centro Histórico de Fortaleza':        '/images/geral/Ceara3.jpg',
  // ── PARÁ ────────────────────────────────────────────────────────
  'Alter do Chão':                        '/images/geral/AlterdoChãoPara.jpeg',
  'Mercado Ver-o-Peso':                   '/images/geral/para1.jpg',
  'Ilha de Marajó':                       '/images/geral/Marajo.jpg',
  'Parque Nacional da Amazônia':          '/images/geral/PNApara.jpg',
  'Theatro da Paz':                       '/images/geral/para.carrossel.jpg',
  'Forte do Presépio':                    '/images/geral/para.carrossel1.jpg',
  'Feliz Lusitânia':                      '/images/geral/para.carrossel2.jpg',
  'Mangal das Garças':                    '/images/geral/PNApara.jpg',
  // ── ACRE ────────────────────────────────────────────────────────
  'Parque Estadual Chandless':            '/images/natureza/floresta.jpeg',
  'Centro Histórico de Rio Branco':       '/images/geral/amre-am1.jpg',
  'Parque Zoobotânico de Rio Branco':     '/images/geral/ac-parquezoo.jpg',
  // ── AMAPÁ ───────────────────────────────────────────────────────
  'Fortaleza de São José de Macapá':      '/images/monumentos/forte.jpeg',
  // ── RONDÔNIA ────────────────────────────────────────────────────
  'Museu Estrada de Ferro Madeira-Mamoré': '/images/geral/amre-am2.jpg',
  'Ferrovia Madeira-Mamoré':              '/images/geral/amre-am2.jpg',
  // ── RORAIMA ─────────────────────────────────────────────────────
  'Monte Roraima':                        '/images/natureza/veadeiros.jpeg',
  // ── TOCANTINS ───────────────────────────────────────────────────
  'Parque Estadual do Jalapão':           '/images/natureza/chapada.jpeg',
  'Jalapão':                              '/images/natureza/chapada.jpeg',
  // ── MINAS GERAIS ────────────────────────────────────────────────
  'Ouro Preto':                           '/images/monumentos/ouro.jpeg',
  'Instituto Inhotim':                    '/images/geral/David.jpeg',
  'Inhotim':                              '/images/geral/David.jpeg',
  'Tiradentes':                           '/images/monumentos/pala.jpeg',
  'Diamantina':                           '/images/monumentos/ouro.jpeg',
  'Santuário do Bom Jesus de Matosinhos': '/images/monumentos/independencia.webp',
  'Carnaval de Belo Horizonte':           '/images/cultura/carnaval.jpeg',
  // ── ESPÍRITO SANTO ──────────────────────────────────────────────
  'Pedra Azul':                           '/images/natureza/bonito.jpeg',
  'Guarapari':                            '/images/geral/praiaEx.jpg',
  'Convento da Penha':                    '/images/monumentos/independencia.webp',
  'Regência Augusta':                     '/images/natureza/bonito.jpeg',
  'Domingos Martins':                     '/images/natureza/veadeiros.jpeg',
  'Santa Teresa':                         '/images/natureza/chapada.jpeg',
  'Anchieta':                             '/images/monumentos/pala.jpeg',
  // ── ACRE (estáticos) ─────────────────────────────────────────────
  'Memorial Chico Mendes':                '/images/geral/oam.jpg',
  'Reserva Extrativista Chico Mendes':    '/images/geral/amazonas1.avif',
  'Mercado Velho de Rio Branco':          '/images/geral/amazonas2.jpg',
  'Cultura Seringueira':                  '/images/geral/amazonas3.1.jpg',
  'Praia do Amapá':                       '/images/geral/oam.jpg',
  // ── AMAPÁ (estáticos) ────────────────────────────────────────────
  'Marco Zero do Equador':                '/images/geral/amazonas2.jpg',
  'Parque Nacional do Cabo Orange':       '/images/geral/amazonas3.1.jpg',
  'Área de Proteção do Rio Curiaú':       '/images/geral/oam.jpg',
  'Praia de Fazendinha':                  '/images/geral/amazonas1.avif',
  'Mercado Central de Macapá':            '/images/geral/amazonas2.jpg',
  'Festival do Marabaixo':                '/images/geral/amazonas3.1.jpg',
  'Museu Sacaca':                         '/images/geral/oam.jpg',
  // ── RONDÔNIA (estáticos) ─────────────────────────────────────────
  'Parque Nacional Pacaás Novos':         '/images/geral/amazonas1.avif',
  'Lago de Samuel':                       '/images/geral/amazonas3.1.jpg',
  'Catedral Nossa Senhora das Graças':    '/images/geral/oam.jpg',
  'Reserva Biológica do Jaru':            '/images/geral/amazonas1.avif',
  'Feira do Produtor de Porto Velho':     '/images/geral/amazonas2.jpg',
  'Aldeia Indígena Igarapé Lage':         '/images/geral/amazonas3.1.jpg',
  'Orla do Rio Madeira':                  '/images/geral/oam.jpg',
  // ── RORAIMA (estáticos) ──────────────────────────────────────────
  'Parque Nacional do Monte Roraima':     '/images/geral/amazonas1.avif',
  'Lavrado de Roraima':                   '/images/geral/amazonas2.jpg',
  'Catedral Nossa Senhora do Carmo':      '/images/geral/amazonas3.1.jpg',
  'Praia do Cauamé':                      '/images/geral/oam.jpg',
  'Mercado Público de Boa Vista':         '/images/geral/amazonas1.avif',
  'Terra Indígena Yanomami':              '/images/geral/amazonas2.jpg',
  'Museu Integrado de Roraima':           '/images/geral/amazonas3.1.jpg',
  // ── TOCANTINS (estáticos) ────────────────────────────────────────
  'Ilha do Bananal':                      '/images/geral/oam.jpg',
  'Orla de Palmas':                       '/images/geral/amazonas1.avif',
  'Catedral Nossa Senhora da Assunção':   '/images/geral/amazonas2.jpg',
  'Cachoeira da Serra do Lajeado':        '/images/geral/amazonas3.1.jpg',
  'Feira Gastronômica de Palmas':         '/images/geral/oam.jpg',
  'Cultura Karajá e Xerente':             '/images/geral/amazonas1.avif',
  'Artesanato do Capim Dourado':          '/images/geral/amazonas2.jpg',
  // ── MINAS GERAIS (estáticos) ─────────────────────────────────────
  'Parque Estadual da Pedra Azul':        '/images/natureza/chapada.jpeg',
  'Restaurante Xapuri':                   '/images/gastronomia/feijoada.jpeg',
  // ── ESPÍRITO SANTO (estáticos) ───────────────────────────────────
  'Restaurante Lareira Portuguesa':       '/images/gastronomia/moqueca.jpeg',
  // ── PARÁ (estáticos) ─────────────────────────────────────────────
  'Tacacá':                               '/images/geral/tacaca1.webp',
  'Pato no Tucupi':                       '/images/geral/Pato no Tucupi.webp',
  'Açaí Paraense':                        '/images/geral/AcaiPara.avif',
  'Maniçoba':                             '/images/geral/ManicobaPara.jpg',
  'Círio de Nazaré':                      '/images/geral/CíriodeNazaréPara.jpg',
  'Carimbó':                              '/images/geral/CarimbóPara.jpg',
  'Cerâmica Marajoara':                   '/images/cultura/ceramica-marajoara.jpg',
  // ── BAHIA ───────────────────────────────────────────────────────
  'Pelourinho':                           '/images/geral/ba.jpg',
  // ── PERNAMBUCO ──────────────────────────────────────────────────
  'Fernando de Noronha':                  '/images/geral/praiaEx.jpg',
  // ── PARANÁ ──────────────────────────────────────────────────────
  'Cataratas do Iguaçu':                  '/images/natureza/chapada.jpeg',
  // ── MATO GROSSO DO SUL ──────────────────────────────────────────
  'Pantanal':                             '/images/natureza/veadeiros.jpeg',
};
