import { Ionicons } from '@expo/vector-icons';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { themes, useSettings } from '../context/SettingsContext';

const INFO: Record<string, { nome: string; capital: string; regiao: string; desc: string }> = {
  AC: { nome: 'Acre', capital: 'Rio Branco', regiao: 'Norte', desc: 'Terra da Revolução Acreana e da floresta amazônica, berço de Chico Mendes.' },
  AL: { nome: 'Alagoas', capital: 'Maceió', regiao: 'Nordeste', desc: 'Praias paradisíacas como Maragogi e Praia do Francês, e a foz do Rio São Francisco.' },
  AP: { nome: 'Amapá', capital: 'Macapá', regiao: 'Norte', desc: 'O único estado cortado pela linha do Equador, com a Fortaleza de São José de Macapá.' },
  AM: { nome: 'Amazonas', capital: 'Manaus', regiao: 'Norte', desc: 'O maior estado do Brasil, guardião da maior floresta tropical do mundo e do Teatro Amazonas.' },
  BA: { nome: 'Bahia', capital: 'Salvador', regiao: 'Nordeste', desc: 'Primeira capital do Brasil, com o Pelourinho e o maior carnaval do mundo.' },
  CE: { nome: 'Ceará', capital: 'Fortaleza', regiao: 'Nordeste', desc: 'Jericoacoara, Lençóis Cearenses e praias de águas quentes o ano todo.' },
  DF: { nome: 'Distrito Federal', capital: 'Brasília', regiao: 'Centro-Oeste', desc: 'Capital do Brasil, planejada por Lúcio Costa e Oscar Niemeyer, Patrimônio da Humanidade.' },
  ES: { nome: 'Espírito Santo', capital: 'Vitória', regiao: 'Sudeste', desc: 'Pedra Azul, Guarapari e a forte influência da imigração italiana e alemã.' },
  GO: { nome: 'Goiás', capital: 'Goiânia', regiao: 'Centro-Oeste', desc: 'Chapada dos Veadeiros, cidade histórica de Goiás e o cerrado brasileiro.' },
  MA: { nome: 'Maranhão', capital: 'São Luís', regiao: 'Nordeste', desc: 'Lençóis Maranhenses, Centro Histórico Patrimônio da UNESCO e o Bumba Meu Boi.' },
  MT: { nome: 'Mato Grosso', capital: 'Cuiabá', regiao: 'Centro-Oeste', desc: 'Pantanal, Chapada dos Guimarães e o centro geodésico da América do Sul.' },
  MS: { nome: 'Mato Grosso do Sul', capital: 'Campo Grande', regiao: 'Centro-Oeste', desc: 'Bonito, Pantanal sul e a biodiversidade do maior santuário de vida selvagem.' },
  MG: { nome: 'Minas Gerais', capital: 'Belo Horizonte', regiao: 'Sudeste', desc: 'Ouro Preto, Inhotim, queijo mineiro e a cultura do café e das pedras preciosas.' },
  PA: { nome: 'Pará', capital: 'Belém', regiao: 'Norte', desc: 'Alter do Chão, Mercado Ver-o-Peso e o Círio de Nazaré, maior procissão do mundo.' },
  PB: { nome: 'Paraíba', capital: 'João Pessoa', regiao: 'Nordeste', desc: 'A cidade mais oriental das Américas, com Cabo Branco e o Parque Estadual Marinho.' },
  PR: { nome: 'Paraná', capital: 'Curitiba', regiao: 'Sul', desc: 'Cataratas do Iguaçu, Jardim Botânico de Curitiba e a influência europeia.' },
  PE: { nome: 'Pernambuco', capital: 'Recife', regiao: 'Nordeste', desc: 'Olinda Patrimônio da UNESCO, Frevo e Porto de Galinhas.' },
  PI: { nome: 'Piauí', capital: 'Teresina', regiao: 'Nordeste', desc: 'Serra da Capivara com pinturas rupestres de 25 mil anos e o Delta do Parnaíba.' },
  RJ: { nome: 'Rio de Janeiro', capital: 'Rio de Janeiro', regiao: 'Sudeste', desc: 'Cristo Redentor, Carnaval, Pão de Açúcar e as praias mais famosas do Brasil.' },
  RN: { nome: 'Rio Grande do Norte', capital: 'Natal', regiao: 'Nordeste', desc: 'Dunas de Genipabu, Parrachos de Maracajaú e o sol com mais horas de brilho do país.' },
  RS: { nome: 'Rio Grande do Sul', capital: 'Porto Alegre', regiao: 'Sul', desc: 'Tradição gaúcha, Serra Gaúcha, churrasco e vinhos da região de Bento Gonçalves.' },
  RO: { nome: 'Rondônia', capital: 'Porto Velho', regiao: 'Norte', desc: 'Ferrovia Madeira-Mamoré e os rios navegáveis da Amazônia Ocidental.' },
  RR: { nome: 'Roraima', capital: 'Boa Vista', regiao: 'Norte', desc: 'Monte Roraima, fronteira com Venezuela e Guiana, e o Parque Nacional do Viruá.' },
  SC: { nome: 'Santa Catarina', capital: 'Florianópolis', regiao: 'Sul', desc: 'Oktoberfest de Blumenau, Serra Catarinense e as praias de Florianópolis.' },
  SP: { nome: 'São Paulo', capital: 'São Paulo', regiao: 'Sudeste', desc: 'Maior metrópole da América do Sul, capital cultural e econômica do Brasil.' },
  SE: { nome: 'Sergipe', capital: 'Aracaju', regiao: 'Nordeste', desc: 'O menor estado do Brasil, com o Cânion do Xingó e as festas juninas.' },
  TO: { nome: 'Tocantins', capital: 'Palmas', regiao: 'Norte', desc: 'Jalapão, Ilha do Bananal e o estado mais novo do Brasil, criado em 1988.' },
};

interface Props {
  sigla: string | null;
  image: any;
  onClose: () => void;
  onEntrar: () => void;
}

export default function EstadoPopup({ sigla, image, onClose, onEntrar }: Props) {
  const { theme } = useSettings();
  const c = themes[theme];

  if (!sigla) return null;
  const info = INFO[sigla];
  if (!info) return null;

  return (
    <Modal transparent animationType="fade" visible={!!sigla} onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <View style={[styles.card, { backgroundColor: c.card }]}>
          <Image source={image} style={styles.image} />
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Ionicons name="close" size={20} color="#fff" />
          </TouchableOpacity>
          <View style={styles.body}>
            <Text style={[styles.nome, { color: c.text }]}>{info.nome}</Text>
            <View style={styles.row}>
              <Ionicons name="location-outline" size={14} color={c.accent} />
              <Text style={[styles.meta, { color: c.subtext }]}> {info.capital} • {info.regiao}</Text>
            </View>
            <Text style={[styles.desc, { color: c.subtext }]}>{info.desc}</Text>
            <TouchableOpacity style={[styles.btn, { backgroundColor: c.accent }]} onPress={onEntrar}>
              <Text style={[styles.btnText, { color: theme === 'light' ? '#fff' : '#0A172A' }]}>Explorar {info.nome}</Text>
              <Ionicons name="arrow-forward" size={16} color={theme === 'light' ? '#fff' : '#0A172A'} style={{ marginLeft: 6 }} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center', padding: 24 },
  card: { borderRadius: 20, overflow: 'hidden', width: '100%' },
  image: { width: '100%', height: 160 },
  closeBtn: { position: 'absolute', top: 12, right: 12, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 20, padding: 4 },
  body: { padding: 20 },
  nome: { fontSize: 22, fontWeight: 'bold', marginBottom: 6 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  meta: { fontSize: 13 },
  desc: { fontSize: 14, lineHeight: 21, marginBottom: 20 },
  btn: { borderRadius: 25, paddingVertical: 12, paddingHorizontal: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  btnText: { fontWeight: 'bold', fontSize: 15 },
});
