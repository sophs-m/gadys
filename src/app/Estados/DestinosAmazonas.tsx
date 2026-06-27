import DestinosEstado from '../../components/DestinosEstado';

const headerImage = require('../../../assets/images/estados/am.png');
const imagensLocais = {
  'Teatro Amazonas': require('../../../assets/images/am/teatro.png'),
  'Encontro das Águas': require('../../../assets/images/am/encontro.png'),
  'Festival Folclórico de Parintins': require('../../../assets/images/am/festival.png'),
  'Arquipélago de Anavilhanas': require('../../../assets/images/am/anavilhanas.jpg'),
  'Amazônico Peixaria Regional': require('../../../assets/images/am/peixaria.jpg'),
  'Bumbódromo': require('../../../assets/images/am/bumbodromo.jpg'),
  'Cachoeira do Santuário': require('../../../assets/images/am/cachoeira.jpg'),
  'Coreto Peixaria & Café Regional': require('../../../assets/images/am/coreto.jpg'),
  'Ponte Rio Negro': require('../../../assets/images/am/ponte.jpg'),
};

export default function DestinosAmazonas() {
  return (
    <DestinosEstado
      sigla="AM"
      titulo="Coração da Floresta"
      subtitulo="Descubra os tesouros do Amazonas"
      headerImage={headerImage}
      cor="#009688"
      rotaVoltar="/Estados/Amazonas"
      imagensLocais={imagensLocais}
    />
  );
}
