import DestinosEstado from '../../components/DestinosEstado';

const headerImage = require('../../../assets/images/estados/rj.png');
const imagensLocais = {
  'Cristo Redentor': require('../../../assets/images/rj/cristo.png'),
  'Pão de Açúcar': require('../../../assets/images/rj/pao-de-acucar.png'),
  'Praia de Copacabana': require('../../../assets/images/rj/carnaval.png'),
};

export default function DestinosRioDeJaneiro() {
  return (
    <DestinosEstado
      sigla="RJ"
      titulo="Maravilhas do Rio"
      subtitulo="Descubra os encantos da Cidade Maravilhosa"
      headerImage={headerImage}
      cor="#6a1b9a"
      rotaVoltar="/Estados/RioDeJaneiro"
      imagensLocais={imagensLocais}
    />
  );
}
