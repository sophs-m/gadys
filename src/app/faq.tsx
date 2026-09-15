import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { themes, useSettings } from '../context/SettingsContext';

const FAQ_ITEMS = [
  {
    question: 'Como criar um roteiro de viagem?',
    answer: 'Abra o chat, toque em “Criar roteiro”, informe o destino e a quantidade de dias. Toque nos dias da linha cronológica para ver cada etapa.',
  },
  {
    question: 'Como vejo a culinária local?',
    answer: 'Após criar um roteiro, use o botão “Culinária local” para ver pratos relacionados ao estado escolhido.',
  },
  {
    question: 'Como encontro informações de um estado?',
    answer: 'Use a aba Estados ou o chat. No roteiro, o botão “Sobre o estado” abre a página do destino.',
  },
  {
    question: 'Como adiciono um lugar aos favoritos?',
    answer: 'Toque no ícone de coração nas páginas de estados e pontos turísticos. Os itens salvos ficam na aba Favoritos.',
  },
  {
    question: 'O chat guarda minhas mensagens?',
    answer: 'Sim. Use o ícone de relógio no cabeçalho do chat para consultar ou limpar o histórico salvo no aparelho.',
  },
];

export default function Faq() {
  const router = useRouter();
  const { theme } = useSettings();
  const c = themes[theme];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <View style={[styles.container, { backgroundColor: c.bg }]}>
      <View style={[styles.header, { backgroundColor: c.header }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={c.text} />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: c.text }]}>
          Perguntas frequentes
        </Text>

        <View style={styles.backButton} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.intro, { backgroundColor: c.card }]}>
          <Ionicons name="help-buoy-outline" size={30} color={c.accent} />
          <View style={{ flex: 1 }}>
            <Text style={[styles.introTitle, { color: c.text }]}>
              Como podemos ajudar?
            </Text>
            <Text style={[styles.introText, { color: c.subtext }]}>
              Encontre respostas rápidas sobre a Gadys.
            </Text>
          </View>
        </View>

        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <View key={item.question} style={[styles.item, { backgroundColor: c.card }]}>
              <TouchableOpacity
                style={styles.questionRow}
                onPress={() => setOpenIndex(isOpen ? null : index)}
              >
                <Text style={[styles.question, { color: c.text }]}>
                  {item.question}
                </Text>
                <Ionicons
                  name={isOpen ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color={c.accent}
                />
              </TouchableOpacity>

              {isOpen && (
                <Text style={[styles.answer, { color: c.subtext }]}>
                  {item.answer}
                </Text>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 55,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  backButton: { width: 40, height: 40, justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  content: { padding: 16, paddingBottom: 36 },
  intro: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    borderRadius: 16,
    marginBottom: 18,
    alignItems: 'center',
  },
  introTitle: { fontSize: 16, fontWeight: '700', marginBottom: 3 },
  introText: { fontSize: 13 },
  item: { borderRadius: 14, marginBottom: 10 },
  questionRow: {
    minHeight: 58,
    paddingHorizontal: 16,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  question: { flex: 1, fontSize: 14, fontWeight: '700' },
  answer: { fontSize: 13, lineHeight: 20, paddingHorizontal: 16, paddingBottom: 16 },
});