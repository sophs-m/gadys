import { useRouter } from "expo-router";
import { Image, ImageBackground, Text, StyleSheet, TouchableOpacity, View } from "react-native";


export default function SplashScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../../assets/images/fundos/inicializacao.png")}
      style={styles.background}
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <View style={styles.topSection}>
          <Image source={require("../../assets/images/logo.png")} style={styles.logo} />
          <Text style={styles.slogan}>Explore, aprenda e conheça o Brasil</Text>
        </View>

        <View style={styles.bottomSection}>
          <TouchableOpacity style={styles.button} onPress={() => router.push("/login")}>
            <Text style={styles.buttonText}>Começar</Text>
            <Text style={styles.buttonArrow}>{">"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: "center", alignItems: "center" },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0, 0, 0, 0.2)" },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  topSection: { alignItems: "center", marginTop: 50 },
  logo: { width: 250, height: 250, resizeMode: "contain" },
  slogan: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginTop: -40,
    textAlign: "center",
  },
  bottomSection: { width: "100%", alignItems: "center" },
  button: {
    backgroundColor: "#0A172A",
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: { color: "white", fontSize: 20, fontWeight: "bold" },
  buttonArrow: { color: "white", fontSize: 20, fontWeight: "bold", marginLeft: 15 },
});
