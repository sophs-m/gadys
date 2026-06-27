import { Ionicons } from '@expo/vector-icons';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { themes, useSettings } from '../context/SettingsContext';

export interface Place {
  name: string;
  category: string;
  location: string;
  image: any;
  description: string;
  modalDescription?: string;
}

interface Props {
  place: Place | null;
  visible: boolean;
  onClose: () => void;
  isFav?: boolean;
  onFavorito?: (name: string) => void;
}

export default function PlaceModal({ place, visible, onClose, isFav, onFavorito }: Props) {
  const { theme } = useSettings();
  const c = themes[theme];

  if (!place) return null;

  const renderDescription = (description: string) => {
    const parts = (description || '').split('**');
    return (
      <Text style={[styles.modalDescription, { color: c.subtext }]}>
        {parts.map((part, index) =>
          index % 2 === 1
            ? <Text key={index} style={[styles.modalSubtitle, { color: c.accent }]}>{part}</Text>
            : part
        )}
      </Text>
    );
  };

  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, { backgroundColor: c.card }]}>
          <Image source={place.image} style={styles.modalImage} />
          <TouchableOpacity style={styles.modalCloseBtn} onPress={onClose}>
            <Text style={styles.modalCloseBtnText}>✕</Text>
          </TouchableOpacity>
          <ScrollView style={styles.modalBody}>
            <View style={styles.modalTitleRow}>
              <Text style={[styles.modalTitle, { color: c.text }]}>{place.name}</Text>
              <TouchableOpacity onPress={() => onFavorito && onFavorito(place.name)}>
                <Ionicons name={isFav ? 'heart' : 'heart-outline'} size={26} color={isFav ? '#e53935' : c.subtext} />
              </TouchableOpacity>
            </View>
            <Text style={[styles.modalCategory, { color: c.subtext }]}>{place.category} • {place.location}</Text>
            {renderDescription(place.modalDescription || place.description)}
          </ScrollView>
          <TouchableOpacity onPress={onClose} style={[styles.closeButton, { backgroundColor: c.accent }]}>
            <Text style={[styles.closeButtonText, { color: theme === 'light' ? '#fff' : '#0A172A' }]}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.6)' },
  modalContent: { borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '90%' },
  modalImage: { width: '100%', height: 220, borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  modalCloseBtn: { position: 'absolute', top: 14, right: 14, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 20, width: 30, height: 30, justifyContent: 'center', alignItems: 'center' },
  modalCloseBtnText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  modalBody: { padding: 20 },
  modalTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: 20, paddingTop: 16, marginBottom: 5 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', flex: 1, marginRight: 10 },
  modalCategory: { fontSize: 14, marginBottom: 10, paddingHorizontal: 20 },
  modalDescription: { fontSize: 15, lineHeight: 23 },
  modalSubtitle: { fontWeight: 'bold' },
  closeButton: { margin: 20, marginTop: 0, borderRadius: 25, paddingVertical: 13, alignItems: 'center' },
  closeButtonText: { fontWeight: 'bold', fontSize: 15 },
});
