import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useRef, useState } from 'react';
import {
    FlatList,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { comida, themes, useSettings } from '../context/SettingsContext';
import { answerQuery, ChatChip, ChatState, createItinerary, findStateMatch, getWelcomeMessage, Itinerary, normalize } from '../data/chatKnowledge';

interface Message {
  id: string;
  from: 'bot' | 'user';
  text: string;
  chips?: ChatChip[];
  itinerary?: Itinerary;
}

let idCounter = 0;
const nextId = () => `m${idCounter++}`;
type ItineraryStep = 'destination' | 'days' | null;
const CHAT_HISTORY_KEY = 'gadys_chat_history';

export default function Chat() {
  const router = useRouter();
  const { theme } = useSettings();
  const t = comida;
  const c = themes[theme];

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [itineraryStep, setItineraryStep] = useState<ItineraryStep>(null);
  const [itineraryState, setItineraryState] = useState<ChatState | null>(null);
  const [selectedItineraryDay, setSelectedItineraryDay] = useState<Record<string, number>>({});
  const [historyVisible, setHistoryVisible] = useState(false);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const listRef = useRef<FlatList<Message>>(null);

  useEffect(() => {
    const loadHistory = async () => {
      const savedHistory = await SecureStore.getItemAsync(CHAT_HISTORY_KEY);
      if (savedHistory) {
        try {
          const savedMessages = JSON.parse(savedHistory) as Message[];
          if (Array.isArray(savedMessages) && savedMessages.length) {
            setMessages(savedMessages);
            const lastId = Math.max(...savedMessages.map(message => Number(message.id.replace(/\D/g, '')) || 0));
            idCounter = lastId + 1;
            setHistoryLoaded(true);
            return;
          }
        } catch {
          // Se o conteúdo antigo estiver inválido, inicia uma conversa nova.
        }
      }

      const nome = await SecureStore.getItemAsync('nome');
      const welcome = getWelcomeMessage(nome ?? undefined);
      setMessages([{ id: nextId(), from: 'bot', text: welcome.text, chips: welcome.chips }]);
      setHistoryLoaded(true);
    };

    loadHistory();
  }, []);

  useEffect(() => {
    if (historyLoaded) {
      SecureStore.setItemAsync(CHAT_HISTORY_KEY, JSON.stringify(messages));
    }
  }, [historyLoaded, messages]);

  const scrollToEnd = () => {
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 80);
  };

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: Message = { id: nextId(), from: 'user', text: trimmed };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    scrollToEnd();

    // pequeno atraso para simular "digitando..." e dar naturalidade à conversa
    setTimeout(() => {
      if (itineraryStep === 'destination') {
        const state = findStateMatch(normalize(trimmed));
        if (!state) {
          setMessages(prev => [...prev, {
            id: nextId(), from: 'bot',
            text: 'Ainda não reconheci esse destino. Escolha um estado brasileiro ou cite sua capital (por exemplo: Bahia, Salvador, Rio de Janeiro ou Curitiba).',
          }]);
          setIsTyping(false);
          scrollToEnd();
          return;
        }
        setItineraryState(state);
        setItineraryStep('days');
        setMessages(prev => [...prev, {
          id: nextId(), from: 'bot',
          text: `Ótima escolha! Quantos dias você terá para conhecer ${state.name}? Envie um número de 1 a 14.`,
          chips: [
            { label: '2 dias', prompt: '2' },
            { label: '3 dias', prompt: '3' },
            { label: '5 dias', prompt: '5' },
            { label: '7 dias', prompt: '7' },
          ],
        }]);
        setIsTyping(false);
        scrollToEnd();
        return;
      }

      if (itineraryStep === 'days' && itineraryState) {
        const days = Number.parseInt(normalize(trimmed), 10);
        if (!Number.isInteger(days) || days < 1 || days > 14) {
          setMessages(prev => [...prev, {
            id: nextId(), from: 'bot', text: 'Para montar um roteiro equilibrado, envie uma duração entre 1 e 14 dias.',
          }]);
        } else {
          const itinerary = createItinerary(itineraryState, days);
          setMessages(prev => [...prev, { id: nextId(), from: 'bot', text: itinerary.text, chips: itinerary.chips, itinerary: itinerary.itinerary }]);
          setItineraryStep(null);
          setItineraryState(null);
        }
        setIsTyping(false);
        scrollToEnd();
        return;
      }

      const answer = answerQuery(trimmed, t);
      const botMsg: Message = { id: nextId(), from: 'bot', text: answer.text, chips: answer.chips };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
      scrollToEnd();
    }, 500 + Math.random() * 400);
  };

  const startItinerary = () => {
    setItineraryState(null);
    setItineraryStep('destination');
    setMessages(prev => [...prev, {
      id: nextId(), from: 'bot',
      text: 'Vamos criar seu roteiro! Para qual estado brasileiro você quer viajar? Você pode informar o estado ou a capital.',
    }]);
    scrollToEnd();
  };

  const clearHistory = async () => {
    await SecureStore.deleteItemAsync(CHAT_HISTORY_KEY);
    const nome = await SecureStore.getItemAsync('nome');
    const welcome = getWelcomeMessage(nome ?? undefined);
    setMessages([{ id: nextId(), from: 'bot', text: welcome.text, chips: welcome.chips }]);
    setSelectedItineraryDay({});
    setItineraryStep(null);
    setItineraryState(null);
    setHistoryVisible(false);
  };

  const handleChipPress = (chip: ChatChip) => {
    if (chip.action === 'create-itinerary') {
      startItinerary();
      return;
    }
    if (chip.route) {
      router.push(chip.route as any);
      return;
    }
    if (chip.prompt) {
      sendMessage(chip.prompt);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[styles.row, item.from === 'user' ? styles.rowUser : styles.rowBot]}>
      {item.from === 'bot' && (
        <View style={[styles.avatar, { backgroundColor: c.accent }]}>
          <Ionicons name="compass" size={16} color={theme === 'light' ? '#fff' : '#0A172A'} />
        </View>
      )}
      <View style={{ maxWidth: '80%' }}>
        <View
          style={[
            styles.bubble,
            item.from === 'user'
              ? [styles.bubbleUser, { backgroundColor: c.accent }]
              : [styles.bubbleBot, { backgroundColor: c.card }],
          ]}
        >
          <Text style={{ color: item.from === 'user' ? (theme === 'light' ? '#fff' : '#0A172A') : c.text, fontSize: 15, lineHeight: 21 }}>
            {item.text}
          </Text>
        </View>

        {!!item.itinerary && (() => {
          const selectedDay = selectedItineraryDay[item.id] ?? 1;
          const selectedStop = item.itinerary.stops.find(stop => stop.day === selectedDay) ?? item.itinerary.stops[0];
          const { state, stops } = item.itinerary;
          return (
            <View style={[styles.itineraryCard, { backgroundColor: c.card, borderColor: c.nav }]}> 
              <View style={styles.itineraryCardHeader}>
                <Ionicons name="map" size={17} color={c.accent} />
                <Text style={[styles.itineraryCardTitle, { color: c.text }]}>Seu roteiro em {state.name}</Text>
              </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.timelineWrap}>
                <View style={[styles.timelineLine, { backgroundColor: c.nav }]} />
                {stops.map(stop => {
                  const active = stop.day === selectedStop.day;
                  return (
                    <TouchableOpacity key={stop.day} style={styles.timelineStep} onPress={() => setSelectedItineraryDay(prev => ({ ...prev, [item.id]: stop.day }))}>
                      <View style={[styles.timelineDot, { borderColor: c.accent, backgroundColor: active ? c.accent : c.card }]} />
                      <Text style={[styles.timelineDay, { color: active ? c.accent : c.subtext }]}>{`Dia ${stop.day}`}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              <View style={[styles.stopDetail, { backgroundColor: c.bg }]}> 
                <Text style={[styles.stopTitle, { color: c.text }]}>{`Dia ${selectedStop.day} · ${selectedStop.title}`}</Text>
                <Text style={[styles.stopDescription, { color: c.subtext }]}>{selectedStop.description}</Text>
              </View>

              <View style={styles.itineraryActions}>
                <TouchableOpacity style={[styles.itineraryAction, { borderColor: c.accent }]} onPress={() => router.push(`/comidas?state=${state.code}` as any)}>
                  <Ionicons name="restaurant-outline" size={16} color={c.accent} />
                  <Text style={[styles.itineraryActionText, { color: c.accent }]}>Culinária local</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.itineraryAction, { backgroundColor: c.accent }]} onPress={() => router.push(`/Estados/${state.page}` as any)}>
                  <Ionicons name="information-circle-outline" size={17} color={theme === 'light' ? '#fff' : '#0A172A'} />
                  <Text style={[styles.itineraryActionText, { color: theme === 'light' ? '#fff' : '#0A172A' }]}>Sobre {state.name}</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })()}

        {!!item.chips?.length && (
          <View style={styles.chipsWrap}>
            {item.chips.map((chip, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.chip, { borderColor: c.accent }]}
                onPress={() => handleChipPress(chip)}
              >
                <Text style={[styles.chipText, { color: c.accent }]}>{chip.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: c.bg }]}>
      {/* HEADER */}
      <View style={[styles.header, { backgroundColor: c.header }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={c.text} />
        </TouchableOpacity>
        <View style={{ alignItems: 'center' }}>
          <Text style={[styles.headerTitle, { color: c.text }]}>Guia Turístico</Text>
          <Text style={[styles.headerSubtitle, { color: c.subtext }]}>Pergunte sobre o Brasil</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity
            accessibilityLabel="Histórico de conversa"
            onPress={() => setHistoryVisible(true)}
            style={[styles.itineraryBtn, { borderColor: c.accent }]}
          >
            <Ionicons name="time-outline" size={20} color={c.accent} />
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityLabel="Criar roteiro"
            onPress={startItinerary}
            style={[styles.itineraryBtn, { borderColor: c.accent }]}
          >
            <Ionicons name="map-outline" size={20} color={c.accent} />
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : Platform.OS === 'android' ? 'height' : undefined}        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={renderMessage}
          contentContainerStyle={{ padding: 16, paddingBottom: 8 }}
          onContentSizeChange={scrollToEnd}
        />

        {isTyping && (
          <View style={[styles.row, styles.rowBot, { paddingHorizontal: 16 }]}>
            <View style={[styles.avatar, { backgroundColor: c.accent }]}>
              <Ionicons name="compass" size={16} color={theme === 'light' ? '#fff' : '#0A172A'} />
            </View>
            <View style={[styles.bubble, styles.bubbleBot, { backgroundColor: c.card }]}>
              <Text style={{ color: c.subtext, fontSize: 15 }}>digitando…</Text>
            </View>
          </View>
        )}

        {/* INPUT */}
        <View style={[styles.inputBar, { backgroundColor: c.card, borderTopColor: c.nav }]}>
          <TextInput
            style={[styles.input, { color: c.text }]}
            placeholder={itineraryStep === 'destination' ? 'Digite o destino...' : itineraryStep === 'days' ? 'Quantos dias você terá?' : 'Pergunte ou crie um roteiro...'}
            placeholderTextColor={c.subtext}
            value={input}
            onChangeText={setInput}
            onSubmitEditing={() => sendMessage(input)}
            returnKeyType="send"
          />
          <TouchableOpacity
            style={[styles.sendBtn, { backgroundColor: c.accent, opacity: input.trim() ? 1 : 0.5 }]}
            onPress={() => sendMessage(input)}
            disabled={!input.trim()}
          >
            <Ionicons name="send" size={18} color={theme === 'light' ? '#fff' : '#0A172A'} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <Modal visible={historyVisible} transparent animationType="slide" onRequestClose={() => setHistoryVisible(false)}>
        <View style={styles.historyOverlay}>
          <View style={[styles.historySheet, { backgroundColor: c.card }]}> 
            <View style={styles.historyHeader}>
              <View>
                <Text style={[styles.historyTitle, { color: c.text }]}>Histórico da conversa</Text>
                <Text style={[styles.historySubtitle, { color: c.subtext }]}>Suas mensagens ficam salvas neste aparelho.</Text>
              </View>
              <TouchableOpacity accessibilityLabel="Fechar histórico" onPress={() => setHistoryVisible(false)}>
                <Ionicons name="close" size={24} color={c.text} />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.historyList}>
              {messages.map(message => (
                <View key={message.id} style={[styles.historyMessage, message.from === 'user' ? [styles.historyMessageUser, { backgroundColor: c.accent }] : { backgroundColor: c.bg }]}>
                  <Text style={[styles.historySender, { color: message.from === 'user' ? (theme === 'light' ? '#fff' : '#0A172A') : c.accent }]}>
                    {message.from === 'user' ? 'Você' : 'Guia Gadys'}
                  </Text>
                  <Text style={{ color: message.from === 'user' ? (theme === 'light' ? '#fff' : '#0A172A') : c.text, fontSize: 13, lineHeight: 19 }}>
                    {message.text}
                  </Text>
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity style={[styles.clearHistoryBtn, { borderColor: c.accent }]} onPress={clearHistory}>
              <Ionicons name="trash-outline" size={17} color={c.accent} />
              <Text style={[styles.clearHistoryText, { color: c.accent }]}>Limpar histórico</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 12, paddingTop: 55, paddingBottom: 14,
  },
  backBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'flex-start' },
  itineraryBtn: { width: 40, height: 40, borderRadius: 20, borderWidth: 1.5, justifyContent: 'center', alignItems: 'center' },
  headerActions: { flexDirection: 'row', gap: 8 },
  headerTitle: { fontSize: 17, fontWeight: 'bold' },
  headerSubtitle: { fontSize: 11, marginTop: 1 },

  row: { flexDirection: 'row', marginBottom: 16, alignItems: 'flex-end' },
  rowBot: { justifyContent: 'flex-start' },
  rowUser: { justifyContent: 'flex-end' },

  avatar: {
    width: 28, height: 28, borderRadius: 14,
    justifyContent: 'center', alignItems: 'center', marginRight: 8, marginBottom: 4,
  },

  bubble: { borderRadius: 18, paddingHorizontal: 14, paddingVertical: 10 },
  bubbleBot: { borderBottomLeftRadius: 4 },
  bubbleUser: { borderBottomRightRadius: 4, marginLeft: 'auto' },

  chipsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 },
  chip: {
    borderWidth: 1.5, borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 6,
  },
  chipText: { fontSize: 13, fontWeight: '600' },

  itineraryCard: { marginTop: 10, borderWidth: 1, borderRadius: 16, padding: 12, overflow: 'hidden' },
  itineraryCardHeader: { flexDirection: 'row', alignItems: 'center', gap: 7, marginBottom: 14 },
  itineraryCardTitle: { fontSize: 14, fontWeight: '700' },
  timelineWrap: { minWidth: '100%', paddingHorizontal: 8, gap: 18, position: 'relative' },
  timelineLine: { position: 'absolute', top: 9, left: 22, right: 22, height: 2 },
  timelineStep: { alignItems: 'center', minWidth: 44, zIndex: 1 },
  timelineDot: { width: 18, height: 18, borderRadius: 9, borderWidth: 3 },
  timelineDay: { marginTop: 5, fontSize: 11, fontWeight: '700' },
  stopDetail: { marginTop: 14, borderRadius: 12, padding: 12 },
  stopTitle: { fontSize: 14, fontWeight: '700', marginBottom: 5 },
  stopDescription: { fontSize: 13, lineHeight: 19 },
  itineraryActions: { flexDirection: 'row', gap: 8, marginTop: 12 },
  itineraryAction: { flex: 1, minHeight: 40, borderRadius: 10, borderWidth: 1.2, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 5, paddingHorizontal: 6 },
  itineraryActionText: { fontSize: 11, fontWeight: '700' },

  historyOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.45)' },
  historySheet: { maxHeight: '78%', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, paddingBottom: 28 },
  historyHeader: { flexDirection: 'row', justifyContent: 'space-between', gap: 16, alignItems: 'flex-start', marginBottom: 16 },
  historyTitle: { fontSize: 19, fontWeight: '700' },
  historySubtitle: { fontSize: 12, marginTop: 3 },
  historyList: { gap: 10, paddingBottom: 16 },
  historyMessage: { alignSelf: 'flex-start', maxWidth: '88%', padding: 12, borderRadius: 14 },
  historyMessageUser: { alignSelf: 'flex-end', backgroundColor: '#3B82F6' },
  historySender: { fontSize: 11, fontWeight: '700', marginBottom: 3 },
  clearHistoryBtn: { borderWidth: 1.2, minHeight: 44, borderRadius: 12, flexDirection: 'row', gap: 7, alignItems: 'center', justifyContent: 'center' },
  clearHistoryText: { fontSize: 13, fontWeight: '700' },

  inputBar: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 14, paddingVertical: 10, borderTopWidth: 1,
  },
  input: { flex: 1, fontSize: 15, maxHeight: 100 },
  sendBtn: {
    width: 40, height: 40, borderRadius: 20,
    justifyContent: 'center', alignItems: 'center',
  },
});
