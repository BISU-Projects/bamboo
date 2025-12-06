import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Platform,
  StatusBar as RNStatusBar,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Text, Surface } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import YoutubeIframe from "react-native-youtube-iframe";
import { Colors } from "@/constants/Colors";

const { width } = Dimensions.get("window");

const getStatusBarHeight = () => {
  if (Platform.OS === "ios") return 44;
  return RNStatusBar.currentHeight || 24;
};

export default function AboutScreen() {
  const statusBarHeight = getStatusBarHeight();
  const [playing, setPlaying] = useState(false);
  const [language, setLanguage] = useState<"english" | "bisaya">("english");

  const content = {
    english: {
      userManualSteps: [
        {
          step: 1,
          title: "Take or Select Photo",
          description:
            "Use your camera to take a photo of bamboo or select from your gallery.",
          icon: "📸",
        },
        {
          step: 2,
          title: "Wait for Analysis",
          description:
            "Our AI will analyze the image and identify the bamboo species.",
          icon: "🤖",
        },
        {
          step: 3,
          title: "View Results",
          description:
            "See the identified species with confidence level and detailed information.",
          icon: "✅",
        },
        {
          step: 4,
          title: "Explore More",
          description:
            'Tap "See More Details" to view comprehensive species information.',
          icon: "📚",
        },
      ],
      importantNotes: [
        "Ensure good lighting when taking photos for better accuracy",
        "Focus on bamboo culm and nodes",
        "Avoid blurry or heavily cropped images",
        "The app currently supports 5 bamboo species",
        "Confidence level above 80% indicates high accuracy",
      ],
      manualSubtitle: "How to Use BambooScope",
    },
    bisaya: {
      userManualSteps: [
        {
          step: 1,
          title: "Kuhaa o Pilia ang Hulagway",
          description:
            "Gamita ang imong kamera aron pagkuha og litrato sa kawayan o pagpili gikan sa imong gallery.",
          icon: "📸",
        },
        {
          step: 2,
          title: "Hulata ang Analisis",
          description:
            "Ang among AI mag-analisar sa hulagway ug mag-ila sa espisye sa kawayan.",
          icon: "🤖",
        },
        {
          step: 3,
          title: "Tan-awa ang Resulta",
          description:
            "Tan-awa ang giila nga espisye nga adunay lebel sa pagsalig ug detalyadong impormasyon.",
          icon: "✅",
        },
        {
          step: 4,
          title: "Susiha ang Dugang",
          description:
            'I-tap ang "See More Details" aron makita ang komprehensibo nga impormasyon bahin sa espisyo.',
          icon: "📚",
        },
      ],
      importantNotes: [
        "Siguroha nga maayo ang suga sa dihang nagkuha og litrato para mas tukma",
        "Fokus sa punoan sa kawayan ug sa mga buko-buko",
        "Likayi ang mga hulagway nga hanap o grabe kaayo ang pagputol",
        "Ang app karon nagsuporta sa 5 ka espisye sa kawayan.",
        "Ang lebel sa pagsalig nga labaw sa 80% nagpakita og taas nga katukma.",
      ],
      manualSubtitle: "Unsaon Paggamit sa BambooScope",
    },
  };

  const currentContent = content[language];

  return (
    <>
      <StatusBar style="light" translucent />
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <LinearGradient
            colors={[Colors.primary, Colors.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[
              styles.headerGradient,
              { paddingTop: statusBarHeight + 20 },
            ]}
          >
            <Text style={styles.headerTitle}>About</Text>
            <Text style={styles.headerSubtitle}>Developer & User Guide</Text>
          </LinearGradient>
        </View>

        {/* Developer Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👨‍💻 About Developer</Text>
          <Surface style={styles.developerCard} elevation={2}>
            <View style={styles.developerImageContainer}>
              <Image
                source={require("@/assets/images/developer.jpg")}
                style={styles.developerImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.developerInfo}>
              <Text style={styles.developerName}>Engr. Danie Baldesco</Text>
              <Text style={styles.developerTitle}>Mobile App Developer</Text>
              <Text style={styles.developerDescription}>
                Computer Science faculty passionate about mobile development and
                AI integration. BambooScope was developed as a thesis project to
                help identify bamboo species in the Philippines using advanced
                deep learning technology.
              </Text>
              <View style={styles.developerStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>React Native</Text>
                  <Text style={styles.statLabel}>Framework</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>TensorFlow</Text>
                  <Text style={styles.statLabel}>AI Model</Text>
                </View>
              </View>
            </View>
          </Surface>
        </View>

        {/* User Manual Section with Language Toggle */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📖 User Manual</Text>
            <View style={styles.languageToggle}>
              <TouchableOpacity
                style={[
                  styles.languageButton,
                  language === "english" && styles.languageButtonActive,
                ]}
                onPress={() => setLanguage("english")}
              >
                <Text
                  style={[
                    styles.languageButtonText,
                    language === "english" && styles.languageButtonTextActive,
                  ]}
                >
                  English
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.languageButton,
                  language === "bisaya" && styles.languageButtonActive,
                ]}
                onPress={() => setLanguage("bisaya")}
              >
                <Text
                  style={[
                    styles.languageButtonText,
                    language === "bisaya" && styles.languageButtonTextActive,
                  ]}
                >
                  Bisaya
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Surface style={styles.manualCard} elevation={1}>
            <Text style={styles.manualSubtitle}>
              {currentContent.manualSubtitle}
            </Text>
            {currentContent.userManualSteps.map((item) => (
              <View key={item.step} style={styles.stepContainer}>
                <View style={styles.stepIconContainer}>
                  <Text style={styles.stepIcon}>{item.icon}</Text>
                </View>
                <View style={styles.stepContent}>
                  <View style={styles.stepHeader}>
                    <Text style={styles.stepNumber}>Step {item.step}</Text>
                    <Text style={styles.stepTitle}>{item.title}</Text>
                  </View>
                  <Text style={styles.stepDescription}>{item.description}</Text>
                </View>
              </View>
            ))}
          </Surface>
        </View>

        {/* Important Notes Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚠️ Important Notes</Text>
          <Surface style={styles.notesCard} elevation={1}>
            {currentContent.importantNotes.map((note, index) => (
              <View key={index} style={styles.noteItem}>
                <View style={styles.noteBullet}>
                  <View style={styles.noteDot} />
                </View>
                <Text style={styles.noteText}>{note}</Text>
              </View>
            ))}
          </Surface>
        </View>

        {/* Video Tutorial Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎥 Video Tutorial</Text>
          <Surface style={styles.videoCard} elevation={2}>
            <View style={styles.videoContainer}>
              <YoutubeIframe
                height={220}
                play={playing}
                videoId="K7iHyFgrHFw"
                onChangeState={(state: string) => {
                  if (state === "ended") {
                    setPlaying(false);
                  }
                }}
              />
            </View>
            <View style={styles.videoInfo}>
              <Text style={styles.videoTitle}>
                Complete Guide to BambooScope
              </Text>
              <Text style={styles.videoDescription}>
                Watch this tutorial to learn how to effectively use all features
                of the app.
              </Text>
            </View>
          </Surface>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    marginBottom: 24,
  },
  headerGradient: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    alignItems: "center",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.textInverse,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.textInverse,
    opacity: 0.9,
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  // Language Toggle
  languageToggle: {
    flexDirection: "row",
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  languageButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
  },
  languageButtonActive: {
    backgroundColor: Colors.primary,
  },
  languageButtonText: {
    fontSize: 13,
    fontWeight: "500",
    color: Colors.textSecondary,
  },
  languageButtonTextActive: {
    color: Colors.textInverse,
    fontWeight: "600",
  },
  // Developer Card
  developerCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },
  developerImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: "hidden",
    borderWidth: 4,
    borderColor: Colors.primary,
    marginBottom: 16,
  },
  developerImage: {
    width: "100%",
    height: "100%",
  },
  developerInfo: {
    alignItems: "center",
    width: "100%",
  },
  developerName: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  developerTitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  developerDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 20,
  },
  developerStats: {
    flexDirection: "row",
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    width: "100%",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.border,
    marginHorizontal: 12,
  },
  // Manual Card
  manualCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
  },
  manualSubtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginBottom: 20,
    textAlign: "center",
  },
  stepContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  stepIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primarySoft,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  stepIcon: {
    fontSize: 24,
  },
  stepContent: {
    flex: 1,
  },
  stepHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  stepNumber: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.primary,
    backgroundColor: Colors.primarySoft,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginRight: 8,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
    flex: 1,
  },
  stepDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  // Video Card
  videoCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    overflow: "hidden",
  },
  videoContainer: {
    width: "100%",
    backgroundColor: "#000",
  },
  videoInfo: {
    padding: 16,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  videoDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  // Notes Card
  notesCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
  },
  noteItem: {
    flexDirection: "row",
    marginBottom: 12,
  },
  noteBullet: {
    marginTop: 6,
    marginRight: 12,
  },
  noteDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
  },
  noteText: {
    flex: 1,
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  bottomSpacing: {
    height: 32,
  },
});
