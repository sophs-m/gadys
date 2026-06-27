import { useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width: W } = Dimensions.get('window');

interface Props {
  cor: string;
  historia: React.ReactNode;
  culturaLocal: React.ReactNode;
}

export default function AbasSwipe({ cor, historia, culturaLocal }: Props) {
  const [activeTab, setActiveTab] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const goTo = (index: number) => {
    setActiveTab(index);
    scrollRef.current?.scrollTo({ x: index * W, animated: true });
  };

  const onScroll = (e: any) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / W);
    if (index !== activeTab) setActiveTab(index);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.tabs}>
        {['História', 'Cultura Local'].map((label, i) => (
          <TouchableOpacity
            key={label}
            onPress={() => goTo(i)}
            style={[styles.tabBtn, activeTab === i && styles.tabBtnActive]}
          >
            <Text style={[styles.tabText, activeTab === i && styles.tabTextActive]}>
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScroll}
        scrollEventThrottle={16}
      >
        <View style={{ width: W }}>{historia}</View>
        <View style={{ width: W }}>{culturaLocal}</View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#1E2F4A',
  },
  tabBtn: {
    paddingVertical: 8,
    paddingHorizontal: 28,
    borderRadius: 20,
    backgroundColor: '#2A3F5F',
  },
  tabText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFC700',
  },
  tabBtnActive: {
    backgroundColor: '#2A6DB5',
  },
  tabTextActive: {
    color: '#fff',
  },
});
