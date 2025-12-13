import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { fetchEventInfo } from "../service/api";
import { COLORS } from "../constants/Url";
import { createBooking } from "../service/api";

export default function HomeScreen({ navigation }: any) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["eventInfo"],
    queryFn: fetchEventInfo,
  });

  if (isLoading) return <Text style={styles.loading}>Loading...</Text>;
  if (error) return <Text style={styles.error}>Something went wrong</Text>;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>La Grande Soirée Gnawa</Text>
        <Text style={styles.heroSubtitle}>🎶 Agadir · Événement Culturel</Text>
      </View>

      <View style={styles.eventCard}>
        <Text style={styles.eventTitle}>{data?.title}</Text>
        <Text style={styles.eventDescription}>{data?.description}</Text>

        <View style={styles.metaRow}>
          <View style={styles.metaBadge}>
            <Text style={styles.metaText}>
              📅 {new Date(data?.date).toLocaleDateString()}
            </Text>
          </View>

          <View style={styles.metaBadge}>
            <Text style={styles.metaText}>📍 {data?.location}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.mainCTA}
        onPress={() => navigation.navigate("Artists")}
        activeOpacity={0.8}
      >
        <Text style={styles.mainCTAText}>Découvrir les artistes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryCTA}
        onPress={createBooking}
        activeOpacity={0.8}
      >
        <Text style={styles.secondaryCTAText}>Mes réservations</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },

  loading: {
    marginTop: 60,
    textAlign: "center",
    fontSize: 16,
  },

  error: {
    marginTop: 60,
    textAlign: "center",
    color: "red",
  },
  hero: {
    backgroundColor: COLORS.primary,
    paddingVertical: 60,
    paddingHorizontal: 25,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },

  heroTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "900",
  },

  heroSubtitle: {
    color: "#ddd",
    marginTop: 8,
    fontSize: 14,
  },

  eventCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 100,
    padding: 25,
    borderRadius: 20,
    elevation: 8,
  },

  eventTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 10,
  },

  eventDescription: {
    color: "#555",
    lineHeight: 22,
    marginBottom: 15,
  },

  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  metaBadge: {
    backgroundColor: "#F0F0F0",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },

  metaText: {
    fontSize: 12,
    color: "#333",
  },

  mainCTA: {
    backgroundColor: COLORS.secondary,
    marginHorizontal: 20,
    marginTop: 30,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    elevation: 3,
  },

  mainCTAText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },

  secondaryCTA: {
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 30,
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },

  secondaryCTAText: {
    color: COLORS.primary,
    fontWeight: "bold",
    fontSize: 15,
  },
});
