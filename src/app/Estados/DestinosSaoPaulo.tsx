import DestinosEstado from '../../components/DestinosEstado';

const headerImage = require('../../../assets/images/estados/sp.png');
const imagensLocais = {
  'MASP': require('../../../assets/images/sp/masp.png'),
  'Parque Ibirapuera': require('../../../assets/images/sp/parque.png'),
};

export default function DestinosSaoPaulo() {
  return (
    <DestinosEstado
      sigla="SP"
      titulo="Destinos em São Paulo"
      subtitulo="A metrópole que nunca para"
      headerImage={headerImage}
      cor="#37474f"
      rotaVoltar="/Estados/SaoPaulo"
      imagensLocais={imagensLocais}
    />
  );
}
