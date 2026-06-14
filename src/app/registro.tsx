import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image, ImageBackground, Keyboard, KeyboardAvoidingView, Platform,
  SafeAreaView, ScrollView, StyleSheet, Text, TextInput,
  TouchableOpacity, TouchableWithoutFeedback, View,
} from "react-native";

export default function RegisterScreen() {
  const router = useRouter();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [confirmSecureTextEntry, setConfirmSecureTextEntry] = useState(true);

  return (
    <ImageBackground
      source={require("../../assets/images/fundos/inicializacao.png")}
      style={styles.background}
    >
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <View style={styles.header}>
                <Image source={require("../../assets/images/logo.png")} style={styles.logo} />
                <Text style={styles.title}>Cadastre-se</Text>
                <Text style={styles.subtitle}>Crie sua conta e comece a explorar o Brasil com o GADYS.</Text>
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <Ionicons name="person-outline" size={24} color="#888" style={styles.inputIcon} />
                  <TextInput placeholder="Nome completo" placeholderTextColor="#888" style={styles.input} autoCapitalize="words" />
                </View>
                <View style={styles.inputWrapper}>
                  <Ionicons name="mail-outline" size={24} color="#888" style={styles.inputIcon} />
                  <TextInput placeholder="E-mail" placeholderTextColor="#888" style={styles.input} keyboardType="email-address" autoCapitalize="none" />
                </View>
                <View style={styles.inputWrapper}>
                  <Ionicons name="lock-closed-outline" size={24} color="#888" style={styles.inputIcon} />
                  <TextInput placeholder="Senha" placeholderTextColor="#888" style={styles.input} secureTextEntry={secureTextEntry} />
                  <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
                    <Ionicons name={secureTextEntry ? "eye-off-outline" : "eye-outline"} size={24} color="#888" style={styles.inputIconRight} />
                  </TouchableOpacity>
                </View>
                <View style={styles.inputWrapper}>
                  <Ionicons name="lock-closed-outline" size={24} color="#888" style={styles.inputIcon} />
                  <TextInput placeholder="Confirmar senha" placeholderTextColor="#888" style={styles.input} secureTextEntry={confirmSecureTextEntry} />
                  <TouchableOpacity onPress={() => setConfirmSecureTextEntry(!confirmSecureTextEntry)}>
                    <Ionicons name={confirmSecureTextEntry ? "eye-off-outline" : "eye-outline"} size={24} color="#888" style={styles.inputIconRight} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.dobContainer}>
                <Text style={styles.dobLabel}>Data de nascimento</Text>
                <View style={styles.dobInputWrapper}>
                  <TextInput placeholder="DD" placeholderTextColor="#888" style={[styles.dobInput, styles.dayInput]} keyboardType="number-pad" maxLength={2} />
                  <TextInput placeholder="MM" placeholderTextColor="#888" style={[styles.dobInput, styles.monthInput]} keyboardType="number-pad" maxLength={2} />
                  <TextInput placeholder="AAAA" placeholderTextColor="#888" style={[styles.dobInput, styles.yearInput]} keyboardType="number-pad" maxLength={4} />
                </View>
              </View>

              <TouchableOpacity style={styles.createAccountButton} onPress={() => router.push("/inicio")}>
                <Text style={styles.createAccountButtonText}>Criar conta</Text>
              </TouchableOpacity>

              <View style={styles.separatorContainer}>
                <View style={styles.line} />
                <Text style={styles.separatorText}>ou cadastre-se com</Text>
                <View style={styles.line} />
              </View>

              <View style={styles.socialLoginContainer}>
                <TouchableOpacity style={styles.socialButton}>
                  <Ionicons name="logo-google" size={30} color="#DB4437" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <Ionicons name="logo-facebook" size={30} color="#4267B2" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <Ionicons name="logo-apple" size={30} color="#000" />
                </TouchableOpacity>
              </View>

              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Já tem uma conta? </Text>
                <TouchableOpacity onPress={() => router.push("/login")}>
                  <Text style={styles.loginLink}>Entrar</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flex: 1 },
  safeArea: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(10, 23, 42, 0.5)" },
  scrollContainer: { flexGrow: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 30, paddingVertical: 20 },
  header: { alignItems: "center", marginBottom: 30 },
  logo: { width: 100, height: 100, resizeMode: "contain", marginBottom: 10 },
  title: { fontSize: 32, fontWeight: "bold", color: "white", marginBottom: 10 },
  subtitle: { fontSize: 16, color: "white", textAlign: "center" },
  inputContainer: { width: "100%" },
  inputWrapper: {
    flexDirection: "row", alignItems: "center", backgroundColor: "white",
    borderRadius: 12, paddingHorizontal: 15, marginBottom: 15, height: 55,
  },
  inputIcon: { marginRight: 10 },
  inputIconRight: { marginLeft: 10 },
  input: { flex: 1, fontSize: 16, color: "#333" },
  dobContainer: { width: "100%", marginBottom: 20 },
  dobLabel: { color: "white", marginBottom: 10, fontSize: 14 },
  dobInputWrapper: { flexDirection: "row", justifyContent: "space-between" },
  dobInput: { backgroundColor: "white", borderRadius: 12, paddingHorizontal: 15, height: 55, fontSize: 16, color: "#333", textAlign: "center" },
  dayInput: { width: "22%" },
  monthInput: { width: "22%" },
  yearInput: { width: "48%" },
  createAccountButton: { backgroundColor: "#0052CC", paddingVertical: 15, borderRadius: 12, alignItems: "center", width: "100%", marginBottom: 20 },
  createAccountButtonText: { color: "white", fontSize: 18, fontWeight: "bold" },
  separatorContainer: { flexDirection: "row", alignItems: "center", width: "100%", marginBottom: 20 },
  line: { flex: 1, height: 1, backgroundColor: "rgba(255, 255, 255, 0.5)" },
  separatorText: { color: "white", marginHorizontal: 10 },
  socialLoginContainer: { flexDirection: "row", justifyContent: "space-evenly", width: "80%", marginBottom: 30 },
  socialButton: { backgroundColor: "white", padding: 12, borderRadius: 10, width: 60, height: 60, justifyContent: "center", alignItems: "center" },
  loginContainer: { flexDirection: "row", justifyContent: "center" },
  loginText: { color: "white" },
  loginLink: { color: "#00BFFF", fontWeight: "bold" },
});
