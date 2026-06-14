import { useRouter } from "expo-router";
import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../../assets/images/fundos/inicializacao.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Image source={require("../../assets/images/logo.png")} style={styles.logo} />
        <TextInput style={styles.input} placeholder="Usuário" placeholderTextColor="gray" />
        <TextInput style={styles.input} placeholder="Senha" placeholderTextColor="gray" secureTextEntry />
        <TouchableOpacity style={styles.button} onPress={() => router.replace("/inicio")}>
          <Text style={styles.buttonText}>ENTRAR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialButtonText}>Entrar com o Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialButtonText}>Entrar com o Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/registro")}>
          <Text style={styles.registerText}>Não tem conta? Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    width: "90%",
    maxWidth: 400,
  },
  logo: { width: 120, height: 120, resizeMode: "contain", marginBottom: 30 },
  input: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#1a73e8",
    padding: 15,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 16 },
  socialButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "center",
  },
  socialButtonText: { color: "#333", fontSize: 16 },
  registerText: { color: "#1a73e8", marginTop: 10, fontSize: 14 },
});
