import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SearchService, SongService, SaavnError } from "jiosaavn-sdk";

const searchService = new SearchService();
const songService = new SongService();

export default function App() {
  const [results, setResults] = useState([]);
  const [running, setRunning] = useState(false);

  const updateResult = (idx, update) => {
    setResults((prev) =>
      prev.map((r, i) => (i === idx ? { ...r, ...update } : r)),
    );
  };

  const runTests = async () => {
    setRunning(true);
    const tests = [
      { name: "Import SDK", status: "running", detail: "" },
      { name: "Search API call", status: "running", detail: "" },
      { name: "SaavnError handling", status: "running", detail: "" },
    ];
    setResults([...tests]);

    // Test 1: SDK imports
    try {
      const ok =
        typeof SearchService === "function" &&
        typeof SongService === "function" &&
        typeof SaavnError === "function";
      updateResult(0, {
        status: ok ? "pass" : "fail",
        detail: ok ? "All exports resolved" : "Missing exports",
      });
    } catch (e) {
      updateResult(0, { status: "fail", detail: e.message });
    }

    // Test 2: Live search
    try {
      const res = await searchService.searchAll("Arijit Singh");
      console.log("▶ Search response:", JSON.stringify(res, null, 2));
      const ok = res && "topQuery" in res;
      updateResult(1, {
        status: ok ? "pass" : "fail",
        detail: ok ? "topQuery found in response" : "Missing topQuery",
      });
    } catch (e) {
      updateResult(1, { status: "fail", detail: e.message });
    }

    // Test 3: SaavnError
    try {
      const songRes = await songService.getSongByIds({
        songIds: "totally-invalid-id",
      });
      console.log(
        "▶ Song response (unexpected):",
        JSON.stringify(songRes, null, 2),
      );
      updateResult(2, { status: "fail", detail: "Should have thrown" });
    } catch (e) {
      console.log("▶ Error caught:", e.constructor.name, e.message);
      if (e instanceof SaavnError) {
        updateResult(2, {
          status: "pass",
          detail: `Caught SaavnError(${e.statusCode})`,
        });
      } else {
        updateResult(2, {
          status: "fail",
          detail: `Wrong error: ${e.constructor.name}`,
        });
      }
    }

    setRunning(false);
  };

  const icon = (s) => (s === "pass" ? "✅" : s === "fail" ? "❌" : "⏳");

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>JioSaavn SDK</Text>
      <Text style={styles.subtitle}>React Native Compatibility Test</Text>

      <Pressable style={styles.button} onPress={runTests} disabled={running}>
        {running ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.btnText}>Run Tests</Text>
        )}
      </Pressable>

      {results.map((r, i) => (
        <View key={i} style={styles.row}>
          <Text style={styles.icon}>{icon(r.status)}</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{r.name}</Text>
            {r.detail ? <Text style={styles.detail}>{r.detail}</Text> : null}
          </View>
        </View>
      ))}

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f0f0f" },
  content: { padding: 24, paddingTop: 80 },
  title: { fontSize: 28, fontWeight: "800", color: "#fff" },
  subtitle: { fontSize: 16, color: "#888", marginBottom: 24 },
  button: {
    backgroundColor: "#6366f1",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 24,
  },
  btnText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: "#333",
  },
  icon: { fontSize: 20, marginTop: 2 },
  name: { fontSize: 16, fontWeight: "600", color: "#fff" },
  detail: { fontSize: 13, color: "#888", marginTop: 2 },
});
