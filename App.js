import { useState, useEffect } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import Constants from "expo-constants";
import db, { createTable, add, selectAll, update, deleteItem } from "./DB";
import PagerView from "react-native-pager-view";

const data = [
  {
    "N°": 1,
    ATTRIBUTS: "انعمت عليهم",
    TURKCE: "",
    FRENCH: "",
    ENGLISH: "",
    SOURCES: "SURAH 1 FATIHA AYAT 7",
    "N° LIVRE PROTOTYPE": "",
    NOTES: "EN PAUSE",
  },
  {
    "N°": 2,
    ATTRIBUTS: "المُنْزَلُ عَلَيْهِ الكِتَابَ",
    TURKCE: "KENDİSİNE KİTAP VAHYEDİLEN",
    FRENCH: "CELUI À QUI LE LIVRE A ÉTÉ RÉVÉLÉ",
    ENGLISH: "ONE TO WHOM THE BOOK WAS REVEALED",
    SOURCES: "SURAH 2",
    "N° LIVRE PROTOTYPE": 99,
    NOTES: "VALIDÉ",
  },
  {
    "N°": "",
    ATTRIBUTS: "",
    TURKCE: "",
    FRENCH: "",
    ENGLISH: "",
    SOURCES: "AL-BAQARA AYAT 4, 23, 97, 99",
    "N° LIVRE PROTOTYPE": "",
    NOTES: "",
  },
  {
    "N°": "",
    ATTRIBUTS: "EL-MUNZELU ALEYHİL KİTAB  /  AL-MUNZALU ALAYHIL KITAB",
    TURKCE: "",
    FRENCH: "",
    ENGLISH: "",
    SOURCES: "",
    "N° LIVRE PROTOTYPE": "",
    NOTES: "",
  },
  {
    "N°": 3,
    ATTRIBUTS: "النَّذِيرٌ",
    TURKCE: "BÜTÜN İNSANLIK İÇİN GÖNDERİLMİŞ BİR UYARICI",
    FRENCH: "UN AVERTISSEUR ENVOYÉ POUR TOUTE L'HUMANITÉ",
    ENGLISH: "A WARNER SENT FOR ALL HUMANITY",
    SOURCES: "SURAH 2 BAQARA AYAT 6, 119",
    "N° LIVRE PROTOTYPE": 41,
    NOTES: "ENGLISH VERIFY",
  },
  {
    "N°": "",
    ATTRIBUTS: "EN-NEZÎR   /   AN-NAZÎR",
    TURKCE: "",
    FRENCH: "",
    ENGLISH: "",
    SOURCES: "",
    "N° LIVRE PROTOTYPE": "",
    NOTES: "",
  },
  {
    "N°": 4,
    ATTRIBUTS: "عَبْدُ اللّٰهْ",
    TURKCE: "ALLAH'IN KULU",
    FRENCH: "LE SERVITEUR D'ALLAH",
    ENGLISH: "THE SERVANT OF ALLAH",
    SOURCES: "SURAH 2",
    "N° LIVRE PROTOTYPE": 50,
    NOTES: "ENGLISH VERIFY",
  },
  {
    "N°": "",
    ATTRIBUTS: "",
    TURKCE: "",
    FRENCH: "",
    ENGLISH: "",
    SOURCES: "AL-BAQARA AYAT 23",
    "N° LIVRE PROTOTYPE": "",
    NOTES: "",
  },
  {
    "N°": "",
    ATTRIBUTS: "ABDULLAH",
    TURKCE: "",
    FRENCH: "",
    ENGLISH: "",
    SOURCES: "",
    "N° LIVRE PROTOTYPE": "",
    NOTES: "",
  },
  {
    "N°": 5,
    ATTRIBUTS: "البَشِيرٌ",
    TURKCE: "GÜZEL HAVADİSLER MÜJDELEYEN",
    FRENCH: "L'ANNONCIATEUR DE BONNES NOUVELLES",
    ENGLISH: "THE ANNOUNCER OF GOOD NEWS",
    SOURCES: "SURAH 2 AL-BAQARA AYAT 25, 119",
    "N° LIVRE PROTOTYPE": 9,
    NOTES: "ENGLISH VERIFY",
  },
  {
    "N°": "",
    ATTRIBUTS: "EL-BEŞÎR   /   AL BASHÎR",
    TURKCE: "",
    FRENCH: "",
    ENGLISH: "",
    SOURCES: "",
    "N° LIVRE PROTOTYPE": "",
    NOTES: "",
  },
  {
    "N°": 6,
    ATTRIBUTS: "رَسُولُ الهُدَى",
    TURKCE: "DOSDOĞRU HAK YOL ÜZERE REHBERLİK EDEN ELÇİ",
    FRENCH: "LE MESSAGER QUI GUIDE DANS LE DROIT CHEMIN",
    ENGLISH: "THE MESSENGER WHO GUIDES IN THE TRUE PATH",
    SOURCES: "SURAH 2 AL-BAQARA AYAT 38",
    "N° LIVRE PROTOTYPE": 11,
    NOTES: "ENGLISH VERIFY",
  },
  {
    "N°": "",
    ATTRIBUTS: "RASÛL-UL HUDA  /   RASOUL-AL HOUDA",
    TURKCE: "",
    FRENCH: "",
    ENGLISH: "",
    SOURCES: "",
    "N° LIVRE PROTOTYPE": "",
    NOTES: "",
  },
  {
    "N°": 7,
    ATTRIBUTS: "المُصَدّقٌ",
    TURKCE: "ALLAH'IN ÖNCEKİ TÜM KİTAPLARINI TASDİK EDEN",
    FRENCH: "CELUI QUI CONFIRME TOUS LES LIVRES ANTÉRIEURS D'ALLAH",
    ENGLISH: "THE ONE WHO CONFIRMS ALL OF ALLAH'S PREVIOUS BOOKS",
    SOURCES: "SURAH 2 AL-BAQARA AYAT 101",
    "N° LIVRE PROTOTYPE": 55,
    NOTES: "ENGLISH VERIFY",
  },
  {
    "N°": "",
    ATTRIBUTS: "EL-MUSADDİG   /   AL-MUSADDİQ",
    TURKCE: "",
    FRENCH: "",
    ENGLISH: "",
    SOURCES: "",
    "N° LIVRE PROTOTYPE": "",
    NOTES: "",
  },
  {
    "N°": "",
    ATTRIBUTS: "",
    TURKCE: "",
    FRENCH: "",
    ENGLISH: "",
    SOURCES: "",
    "N° LIVRE PROTOTYPE": "",
    NOTES: "",
  },
  {
    "N°": 8,
    ATTRIBUTS: "رَسُول الله",
    TURKCE: "ALLAH'IN ELÇİSİ",
    FRENCH: "LE MESSAGER D'ALLAH",
    ENGLISH: "THE MESSENGER OF ALLAH",
    SOURCES: "QURAN: SURAH 2 AL-BAQARA AYAT 108",
    "N° LIVRE PROTOTYPE": 10,
    NOTES: "ENGLISH VERIFY",
  },
  {
    "N°": "",
    ATTRIBUTS: "RASÛLULLAH   /   RASOUL ALLAH",
    TURKCE: "",
    FRENCH: "",
    ENGLISH: "",
    SOURCES: "",
    "N° LIVRE PROTOTYPE": "",
    NOTES: "",
  },
  {
    "N°": 9,
    ATTRIBUTS: "الرَّسُولُ بِالْحَقّ",
    TURKCE: "ALLAH'IN HAK ÜZERE GÖNDERDİĞİ ELÇİ",
    FRENCH: "LE MESSAGER QU'ALLAH A ENVOYÉ AVEC LA VÉRITÉ",
    ENGLISH: "THE MESSENGER THAT ALLAH SENT WITH THE TRUTH",
    SOURCES: "QURAN: SURAH 2 AL-BAQARA 119  -  SURAH 4 AN-NISA AYAT 170",
    "N° LIVRE PROTOTYPE": 46,
    NOTES: "ENGLISH VERIFY",
  },
  {
    "N°": "",
    ATTRIBUTS: "ER-RASÛLU BİL HAK   /   AR-RASÛLU BIL HAQ",
    TURKCE: "",
    FRENCH: "",
    ENGLISH: "",
    SOURCES: "",
    "N° LIVRE PROTOTYPE": "",
    NOTES: "",
  },
  {
    "N°": 10,
    ATTRIBUTS: "مُعَلّمُ الْكِتَابَ وَالْحِكْمَةَ",
    TURKCE: "KİTABI, HİKMETİ VE BİLMEDİKLERİNİZİ ÖĞRETEN",
    FRENCH:
      "CELUI QUI ENSEIGNE LE LIVRE, LA SAGESSE ET CE QUE VOUS NE SAVIEZ PAS",
    ENGLISH: "THE ONE WHO TEACHES THE BOOK, WISDOM AND WHAT YOU DIDN'T KNOW",
    SOURCES: "QURAN: SURAH AL-BAQARA AYAT 129, 151",
    "N° LIVRE PROTOTYPE": 95,
    NOTES: "ENGLISH  VERIFY",
  },
  {
    "N°": 11,
    ATTRIBUTS: "الرَّسُولٌ المُزَكّي",
    TURKCE: "ÜMMETİNİ GÜNAHLARDAN ARINDIRAN YÜCELTEN RASÛL",
    FRENCH: "LE MESSAGER QUI PURIFIE ET ENNOBLIT SA COMMUNAUTÉ",
    ENGLISH: "THE MESSENGER WHO PURIFIES AND ENNOBLES HIS COMMUNITY",
    SOURCES: "QURAN: SURAH AL-BAQARA AYAT 129,",
    "N° LIVRE PROTOTYPE": 96,
    NOTES: "ENGLISH",
  },

  {
    "N°": "",
    ATTRIBUTS: "ER-RASÛL UL MUZEKKÎ  / AR-RASÛL AL MUZAKKÎ",
    TURKCE: "",
    FRENCH: "",
    ENGLISH: "",
    SOURCES: "",
    "N° LIVRE PROTOTYPE": "",
    NOTES: "",
  },

  {
    "N°": 12,
    ATTRIBUTS: "الحَنِيف",
    TURKCE: "İBRAHİM (AS)'IN HAK OLAN TEVHİD DİNİNE UYAN",
    FRENCH: "CELUI QUI SUIT LA VRAIE RELIGION DROITE D'IBRAHIM (AS)",
    ENGLISH: "ONE WHO FOLLOWS THE TRUE RIGHT RELIGION OF IBRAHIM (AS)",
    SOURCES: "QURAN: SURAH AL-BAQARA 2 AYAT 135",
    "N° LIVRE PROTOTYPE": 52,
    NOTES: "ENGLISH VERIFY",
  },
  {
    "N°": "",
    ATTRIBUTS: "EL-HANÎF   /   AL-HANÎF",
    TURKCE: "",
    FRENCH: "",
    ENGLISH: "",
    SOURCES: "",
    "N° LIVRE PROTOTYPE": "",
    NOTES: "",
  },
];

export default function App() {
  const [text, setText] = useState(null);
  const [forceUpdate, forceUpdateId] = useForceUpdate();
  const bg = require("./assets/bg.jpeg");
  useEffect(() => {
    createTable();
  }, []);

  return (
    <PagerView style={styles.pagerView} initialPage={0}>
      {data.map((d, i) => {
        return (
          <ImageBackground
            key={i}
            source={bg}
            style={{ width: "100%", height: "100%" }}
          >
            <View
              style={{
                height: "100%",
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                marginTop: 80,
                paddingHorizontal: 1,
              }}
            >
              <Text style={[styles.textColor, { fontSize: 50 }]}>
                {d.ATTRIBUTS}
              </Text>
              <Text
                style={[styles.textColor, { fontSize: 20, color: "green" }]}
              >
                {d.TURKCE}
              </Text>
              <Text style={[styles.textColor, { fontSize: 20, color: "red" }]}>
                {d.FRENCH}
              </Text>
              <Text
                style={[styles.textColor, { fontSize: 20, color: "violet" }]}
              >
                {d.ENGLISH}
              </Text>
              <Text
                style={[
                  styles.textColor,
                  {
                    fontSize: 15,
                    color: "cyan",
                  },
                ]}
              >
                {d.SOURCES}
              </Text>
            </View>
          </ImageBackground>
        );
      })}
    </PagerView>
  );
}

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  pagerView: {
    flex: 1,
  },
  textColor: {
    color: "white",
    textAlign: "center",
  },
});
