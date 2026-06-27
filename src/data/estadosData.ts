import { Lang } from '../context/SettingsContext';

export interface PlaceData {
  name: string;
  category: string;
  location: string;
  description: string;
  modalDescription: string;
}

export interface EstadoData {
  historyTitle: string;
  historySections: { subtitle: string; text: string }[];
  places: PlaceData[];
}

type EstadosMap = Record<string, EstadoData>;
type LangData = Record<Lang, EstadosMap>;

export const estadosData: LangData = {
  pt: {
    AC: {
      historyTitle: 'Da Floresta Amazônica à Conquista da Identidade Brasileira',
      historySections: [
        { subtitle: 'Os Primeiros Habitantes', text: 'Muito antes da chegada dos europeus, a região do atual Acre era habitada por diversos povos indígenas, como os Huni Kuin (Kaxinawá), Ashaninka, Yawanawá, Katukina e outros grupos. Pelo Tratado de Ayacucho (1867), a área era oficialmente reconhecida como pertencente à Bolívia.' },
        { subtitle: 'O Ciclo da Borracha e a Migração Nordestina', text: 'A história do Acre mudou no final do século XIX com a expansão do Ciclo da Borracha. Milhares de nordestinos migraram para a região fugindo das secas severas, passando a atuar nos seringais e extraindo látex das seringueiras.' },
        { subtitle: 'A Revolução Acreana (1899–1903)', text: 'Entre 1899 e 1903 ocorreram diversas revoltas conhecidas como Revolução Acreana. O movimento ganhou força sob a liderança de Plácido de Castro, que organizou forças militares que enfrentaram tropas bolivianas e conquistaram o controle da região.' },
        { subtitle: 'O Tratado de Petrópolis (1903)', text: 'Em 1903, sob a liderança do Barão do Rio Branco, foi assinado o Tratado de Petrópolis. O Brasil incorporou oficialmente o Acre ao seu território em troca do pagamento de 2 milhões de libras esterlinas e da construção da Estrada de Ferro Madeira-Mamoré.' },
        { subtitle: 'De Território a Estado (1904–1962)', text: 'Após sua incorporação, o Acre foi transformado em Território Federal em 1904. Em 15 de junho de 1962, o Acre foi finalmente elevado à categoria de estado brasileiro, com Rio Branco como capital.' },
        { subtitle: 'Chico Mendes e a Defesa da Amazônia', text: 'Durante a segunda metade do século XX, Chico Mendes liderou movimentos em defesa dos trabalhadores da floresta e da preservação ambiental. Após seu assassinato em 1988, transformou-se em símbolo global da conservação ambiental.' },
      ],
      places: [
        {
          name: 'Festival de Praia',
          category: 'Evento',
          location: 'Rio Branco',
          description: 'No Acre, quando o nível dos rios baixa durante o "verão amazônico" (julho a setembro), bancos de areia surgem, dando lugar a festivais com shows, esportes e gastronomia regional.',
          modalDescription: '**A Festa de Praia do Acre**\n\n**Origem e Desenvolvimento (Século XX)**\nA Festa de Praia surgiu a partir do costume das comunidades acreanas de aproveitar as praias naturais que aparecem durante o período de estiagem dos rios amazônicos.\n\n**Transformação em Evento Cultural**\nAo longo dos anos, esses encontros informais evoluíram para grandes festivais organizados por prefeituras e comunidades, incluindo shows musicais, feiras de artesanato e comidas típicas.\n\n**Valorização da Cultura Acreana**\nMais do que um evento recreativo, a Festa de Praia tornou-se uma importante manifestação cultural do Acre, fortalecendo o turismo e valorizando as tradições das populações ribeirinhas.',
        },
        {
          name: 'Seringueiras',
          category: 'Monumento',
          location: 'Xapuri',
          description: 'As seringueiras são as grandes protagonistas da história econômica, social e geográfica do Acre. Foi a busca pelo látex que desenhou as fronteiras do estado e atraiu as primeiras grandes levas de migrantes.',
          modalDescription: '**As Seringueiras**\n\n**O Ciclo da Borracha (Século XIX e início do Século XX)**\nAs seringueiras (Hevea brasiliensis) desempenharam um papel fundamental na história do Acre. A crescente demanda mundial por borracha impulsionou a extração do látex, atraindo milhares de trabalhadores para a região amazônica.\n\n**Importância Histórica e Econômica**\nAlém de impulsionar o desenvolvimento regional, as seringueiras tornaram-se um símbolo da identidade acreana. A riqueza gerada pela borracha influenciou a formação de cidades e os acontecimentos que culminaram na incorporação do Acre ao território brasileiro.',
        },
        {
          name: 'Mercado Velho',
          category: 'Monumento',
          location: 'Rio Branco',
          description: 'Oficialmente chamado de Mercado Municipal Elpídio Ribeiro, é um dos principais pontos turísticos, culturais e gastronômicos da capital do Acre, localizado às margens do Rio Acre.',
          modalDescription: '**Mercado Velho de Rio Branco**\n\n**Centro Comercial e Ponto de Encontro**\nLocalizado às margens do Rio Acre, o Mercado Velho foi um dos principais centros comerciais de Rio Branco durante o período de expansão econômica da borracha.\n\n**Patrimônio Histórico do Acre**\nAo longo dos anos, o Mercado Velho consolidou-se como um dos mais importantes patrimônios históricos e culturais da capital acreana, preservando a memória do desenvolvimento econômico e social do estado.',
        },
      ],
    },
  },

  en: {
    AC: {
      historyTitle: 'From the Amazon Rainforest to the Conquest of Brazilian Identity',
      historySections: [
        { subtitle: 'The First Inhabitants', text: 'Long before the arrival of Europeans, the region of present-day Acre was inhabited by various indigenous peoples, including the Huni Kuin (Kaxinawá), Ashaninka, Yawanawá, Katukina and other groups. Under the Treaty of Ayacucho (1867), the area was officially recognized as belonging to Bolivia.' },
        { subtitle: 'The Rubber Cycle and Northeastern Migration', text: 'The history of Acre changed at the end of the 19th century with the expansion of the Rubber Cycle. Thousands of northeasterners migrated to the region fleeing severe droughts, working in rubber plantations and extracting latex from rubber trees.' },
        { subtitle: 'The Acrean Revolution (1899–1903)', text: 'Between 1899 and 1903, several revolts known as the Acrean Revolution took place. The movement gained strength under the leadership of Plácido de Castro, who organized military forces that fought Bolivian troops and conquered control of the region.' },
        { subtitle: 'The Treaty of Petrópolis (1903)', text: 'In 1903, under the leadership of Barão do Rio Branco, the Treaty of Petrópolis was signed. Brazil officially incorporated Acre into its territory in exchange for payment of 2 million pounds sterling and the construction of the Madeira-Mamoré Railway.' },
        { subtitle: 'From Territory to State (1904–1962)', text: 'After its incorporation, Acre was transformed into a Federal Territory in 1904. On June 15, 1962, Acre was finally elevated to the status of a Brazilian state, with Rio Branco as its capital.' },
        { subtitle: 'Chico Mendes and the Defense of the Amazon', text: 'During the second half of the 20th century, Chico Mendes led movements in defense of forest workers and environmental preservation. After his assassination in 1988, he became a global symbol of environmental conservation.' },
      ],
      places: [
        {
          name: 'Beach Festival',
          category: 'Event',
          location: 'Rio Branco',
          description: 'In Acre, when river levels drop during the "Amazonian summer" (July to September), sandbars emerge, giving way to festivals with shows, sports and regional gastronomy.',
          modalDescription: '**Acre\'s Beach Festival**\n\n**Origin and Development (20th Century)**\nThe Beach Festival emerged from the custom of Acrean communities enjoying the natural beaches that appear during the dry season of Amazonian rivers.\n\n**Transformation into a Cultural Event**\nOver the years, these informal gatherings evolved into large festivals organized by municipalities and communities, including musical shows, craft fairs and typical foods.\n\n**Valuing Acrean Culture**\nMore than a recreational event, the Beach Festival has become an important cultural manifestation of Acre, strengthening tourism and valuing the traditions of riverside communities.',
        },
        {
          name: 'Rubber Trees',
          category: 'Monument',
          location: 'Xapuri',
          description: 'Rubber trees are the great protagonists of the economic, social and geographic history of Acre. It was the search for latex that drew the state\'s borders and attracted the first large waves of migrants.',
          modalDescription: '**The Rubber Trees**\n\n**The Rubber Cycle (19th and early 20th Century)**\nRubber trees (Hevea brasiliensis) played a fundamental role in the history of Acre. The growing global demand for rubber drove latex extraction, attracting thousands of workers to the Amazon region.\n\n**Historical and Economic Importance**\nBeyond driving regional development, rubber trees became a symbol of Acrean identity. The wealth generated by rubber influenced the formation of cities and the events that culminated in Acre\'s incorporation into Brazilian territory.',
        },
        {
          name: 'Old Market',
          category: 'Monument',
          location: 'Rio Branco',
          description: 'Officially called Mercado Municipal Elpídio Ribeiro, it is one of the main tourist, cultural and gastronomic attractions of the Acre capital, located on the banks of the Acre River.',
          modalDescription: '**Old Market of Rio Branco**\n\n**Commercial Center and Meeting Point**\nLocated on the banks of the Acre River, the Old Market was one of the main commercial centers of Rio Branco during the rubber economic expansion period.\n\n**Historical Heritage of Acre**\nOver the years, the Old Market has consolidated itself as one of the most important historical and cultural heritage sites of the Acrean capital, preserving the memory of the state\'s economic and social development.',
        },
      ],
    },
  },

  es: {
    AC: {
      historyTitle: 'De la Selva Amazónica a la Conquista de la Identidad Brasileña',
      historySections: [
        { subtitle: 'Los Primeros Habitantes', text: 'Mucho antes de la llegada de los europeos, la región del actual Acre estaba habitada por diversos pueblos indígenas, como los Huni Kuin (Kaxinawá), Ashaninka, Yawanawá, Katukina y otros grupos. Por el Tratado de Ayacucho (1867), el área era oficialmente reconocida como perteneciente a Bolivia.' },
        { subtitle: 'El Ciclo del Caucho y la Migración Nororiental', text: 'La historia de Acre cambió a finales del siglo XIX con la expansión del Ciclo del Caucho. Miles de norteños migraron a la región huyendo de las severas sequías, trabajando en los seringales y extrayendo látex de los árboles de caucho.' },
        { subtitle: 'La Revolución Acreana (1899–1903)', text: 'Entre 1899 y 1903 ocurrieron diversas revueltas conocidas como la Revolución Acreana. El movimiento cobró fuerza bajo el liderazgo de Plácido de Castro, quien organizó fuerzas militares que enfrentaron tropas bolivianas y conquistaron el control de la región.' },
        { subtitle: 'El Tratado de Petrópolis (1903)', text: 'En 1903, bajo el liderazgo del Barón de Rio Branco, se firmó el Tratado de Petrópolis. Brasil incorporó oficialmente Acre a su territorio a cambio del pago de 2 millones de libras esterlinas y la construcción del Ferrocarril Madeira-Mamoré.' },
        { subtitle: 'De Territorio a Estado (1904–1962)', text: 'Tras su incorporación, Acre fue transformado en Territorio Federal en 1904. El 15 de junio de 1962, Acre fue finalmente elevado a la categoría de estado brasileño, con Río Branco como capital.' },
        { subtitle: 'Chico Mendes y la Defensa de la Amazonia', text: 'Durante la segunda mitad del siglo XX, Chico Mendes lideró movimientos en defensa de los trabajadores del bosque y la preservación ambiental. Tras su asesinato en 1988, se convirtió en símbolo mundial de la conservación ambiental.' },
      ],
      places: [
        {
          name: 'Festival de Playa',
          category: 'Evento',
          location: 'Rio Branco',
          description: 'En Acre, cuando el nivel de los ríos baja durante el "verano amazónico" (julio a septiembre), bancos de arena emergen, dando lugar a festivales con espectáculos, deportes y gastronomía regional.',
          modalDescription: '**El Festival de Playa de Acre**\n\n**Origen y Desarrollo (Siglo XX)**\nEl Festival de Playa surgió de la costumbre de las comunidades acreanas de aprovechar las playas naturales que aparecen durante la época seca de los ríos amazónicos.\n\n**Transformación en Evento Cultural**\nCon el tiempo, estos encuentros informales evolucionaron hacia grandes festivales organizados por municipios y comunidades, con espectáculos musicales, ferias de artesanía y comidas típicas.\n\n**Valorización de la Cultura Acreana**\nMás que un evento recreativo, el Festival de Playa se ha convertido en una importante manifestación cultural de Acre, fortaleciendo el turismo y valorizando las tradiciones de las comunidades ribereñas.',
        },
        {
          name: 'Árboles de Caucho',
          category: 'Monumento',
          location: 'Xapuri',
          description: 'Los árboles de caucho son los grandes protagonistas de la historia económica, social y geográfica de Acre. Fue la búsqueda del látex lo que trazó las fronteras del estado y atrajo las primeras grandes oleadas de migrantes.',
          modalDescription: '**Los Árboles de Caucho**\n\n**El Ciclo del Caucho (Siglo XIX e inicios del Siglo XX)**\nLos árboles de caucho (Hevea brasiliensis) desempeñaron un papel fundamental en la historia de Acre. La creciente demanda mundial de caucho impulsó la extracción de látex, atrayendo a miles de trabajadores a la región amazónica.\n\n**Importancia Histórica y Económica**\nAdemás de impulsar el desarrollo regional, los árboles de caucho se convirtieron en símbolo de la identidad acreana.',
        },
        {
          name: 'Mercado Viejo',
          category: 'Monumento',
          location: 'Rio Branco',
          description: 'Oficialmente llamado Mercado Municipal Elpídio Ribeiro, es uno de los principales puntos turísticos, culturales y gastronómicos de la capital de Acre, ubicado a orillas del Río Acre.',
          modalDescription: '**Mercado Viejo de Rio Branco**\n\n**Centro Comercial y Punto de Encuentro**\nUbicado a orillas del Río Acre, el Mercado Viejo fue uno de los principales centros comerciales de Rio Branco durante el período de expansión económica del caucho.\n\n**Patrimonio Histórico de Acre**\nCon los años, el Mercado Viejo se consolidó como uno de los patrimonios históricos y culturales más importantes de la capital acreana.',
        },
      ],
    },
    AL: {
      historyTitle: 'De la Selva Amazónica a la Conquista de la Identidad Brasileña',
      historySections: [
        { subtitle: 'Los Primeros Habitantes', text: 'Mucho antes de la llegada de los europeos, la región del actual Acre estaba habitada por diversos pueblos indígenas, como los Huni Kuin (Kaxinawá), Ashaninka, Yawanawá, Katukina y otros grupos. Por el Tratado de Ayacucho (1867), el área era oficialmente reconocida como perteneciente a Bolivia.' },
        { subtitle: 'El Ciclo del Caucho y la Migración Nororiental', text: 'La historia de Acre cambió a finales del siglo XIX con la expansión del Ciclo del Caucho. Miles de norteños migraron a la región huyendo de las severas sequías, trabajando en los seringales y extrayendo látex de los árboles de caucho.' },
        { subtitle: 'La Revolución Acreana (1899–1903)', text: 'Entre 1899 y 1903 ocurrieron diversas revueltas conocidas como la Revolución Acreana. El movimiento cobró fuerza bajo el liderazgo de Plácido de Castro, quien organizó fuerzas militares que enfrentaron tropas bolivianas y conquistaron el control de la región.' },
        { subtitle: 'El Tratado de Petrópolis (1903)', text: 'En 1903, bajo el liderazgo del Barón de Rio Branco, se firmó el Tratado de Petrópolis. Brasil incorporó oficialmente Acre a su territorio a cambio del pago de 2 millones de libras esterlinas y la construcción del Ferrocarril Madeira-Mamoré.' },
        { subtitle: 'De Territorio a Estado (1904–1962)', text: 'Tras su incorporación, Acre fue transformado en Territorio Federal en 1904. El 15 de junio de 1962, Acre fue finalmente elevado a la categoría de estado brasileño, con Río Branco como capital.' },
        { subtitle: 'Chico Mendes y la Defensa de la Amazonia', text: 'Durante la segunda mitad del siglo XX, Chico Mendes lideró movimientos en defensa de los trabajadores del bosque y la preservación ambiental. Tras su asesinato en 1988, se convirtió en símbolo mundial de la conservación ambiental.' },
      ],
      places: [
        {
          name: 'Festival de Playa',
          category: 'Evento',
          location: 'Rio Branco',
          description: 'En Acre, cuando el nivel de los ríos baja durante el "verano amazónico" (julio a septiembre), bancos de arena emergen, dando lugar a festivales con espectáculos, deportes y gastronomía regional.',
          modalDescription: '**El Festival de Playa de Acre**\n\n**Origen y Desarrollo (Siglo XX)**\nEl Festival de Playa surgió de la costumbre de las comunidades acreanas de aprovechar las playas naturales que aparecen durante la época seca de los ríos amazónicos.\n\n**Transformación en Evento Cultural**\nCon el tiempo, estos encuentros informales evolucionaron hacia grandes festivales organizados por municipios y comunidades, con espectáculos musicales, ferias de artesanía y comidas típicas.\n\n**Valorización de la Cultura Acreana**\nMás que un evento recreativo, el Festival de Playa se ha convertido en una importante manifestación cultural de Acre, fortaleciendo el turismo y valorizando las tradiciones de las comunidades ribereñas.',
        },
        {
          name: 'Árboles de Caucho',
          category: 'Monumento',
          location: 'Xapuri',
          description: 'Los árboles de caucho son los grandes protagonistas de la historia económica, social y geográfica de Acre. Fue la búsqueda del látex lo que trazó las fronteras del estado y atrajo las primeras grandes oleadas de migrantes.',
          modalDescription: '**Los Árboles de Caucho**\n\n**El Ciclo del Caucho (Siglo XIX e inicios del Siglo XX)**\nLos árboles de caucho (Hevea brasiliensis) desempeñaron un papel fundamental en la historia de Acre. La creciente demanda mundial de caucho impulsó la extracción de látex, atrayendo a miles de trabajadores a la región amazónica.\n\n**Importancia Histórica y Económica**\nAdemás de impulsar el desarrollo regional, los árboles de caucho se convirtieron en símbolo de la identidad acreana. La riqueza generada por el caucho influyó en la formación de ciudades y en los acontecimientos que culminaron en la incorporación de Acre al territorio brasileño.',
        },
        {
          name: 'Mercado Viejo',
          category: 'Monumento',
          location: 'Rio Branco',
          description: 'Oficialmente llamado Mercado Municipal Elpídio Ribeiro, es uno de los principales puntos turísticos, culturales y gastronómicos de la capital de Acre, ubicado a orillas del Río Acre.',
          modalDescription: '**Mercado Viejo de Rio Branco**\n\n**Centro Comercial y Punto de Encuentro**\nUbicado a orillas del Río Acre, el Mercado Viejo fue uno de los principales centros comerciales de Rio Branco durante el período de expansión económica del caucho.\n\n**Patrimonio Histórico de Acre**\nCon los años, el Mercado Viejo se consolidó como uno de los patrimonios históricos y culturales más importantes de la capital acreana, preservando la memoria del desarrollo económico y social del estado.',
        },
      ],
    },
  },
};

export function getEstadoData(sigla: string, lang: Lang): EstadoData | null {
  return estadosData[lang]?.[sigla] ?? estadosData['pt']?.[sigla] ?? null;
}
