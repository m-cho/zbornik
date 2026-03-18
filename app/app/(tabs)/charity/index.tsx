import ThemedContainer from "@/components/ThemedContainer";
import { ThemedScrollView } from "@/components/ThemedScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CharityCard from "@/components/ui/CharityCard";
import i18n from "@/constants/i18n";
import useBox from "@/hooks/useBox";
import { Dimensions, Platform, StyleSheet } from "react-native";

export default function CharityScreen() {
  const window = Dimensions.get("window");
  const isLandscape = window.width > window.height;
  const isAndroid = Platform.OS === "android";
  const { openWebPage } = useBox();

  // const items = useMemo(() => shuffle([{
  const items = [
    {
      type: "charity",
      title: i18n.t("charity.items.vds.title"),
      description: i18n.t("charity.items.vds.description"),
      link: "https://starateljstvo.info/onama/dobrotvori",
      aboutLink: "https://starateljstvo.info/onama",
    },
    {
      type: "charity",
      title: i18n.t("charity.items.vdsNis.title"),
      description: i18n.t("charity.items.vdsNis.description"),
      link: "https://vds.eparhijaniska.rs/doniraj",
      aboutLink: "https://vds.eparhijaniska.rs/o-nama",
    },
    {
      type: "charity",
      title: i18n.t("charity.items.vdsSumadija.title"),
      description: i18n.t("charity.items.vdsSumadija.description"),
      link: "https://starateljstvosumadijske.rs/teams",
      aboutLink: "https://starateljstvosumadijske.rs/about",
    },
    {
      type: "church",
      title: i18n.t(
        "charity.items.freskopisanjeCrkvaSvCaraKonstantinaICariceJelene.title",
      ),
      description: i18n.t(
        "charity.items.freskopisanjeCrkvaSvCaraKonstantinaICariceJelene.description",
      ),
      link: "https://radioglas.rs/Newsview.asp?ID=19667",
      aboutLink: "https://hramsvetogcarakonstantinaijelene.rs",
    },
    {
      type: "church",
      title: i18n.t("charity.items.crkvaRtanj.title"),
      description: i18n.t("charity.items.crkvaRtanj.description"),
      link: "https://eparhija-timocka.org/obnovimo-svetinju-na-planini-rtanj",
      aboutLink: "https://eparhija-timocka.org",
    },
    {
      type: "media",
      title: i18n.t("charity.items.ziveReci.title"),
      description: i18n.t("charity.items.ziveReci.description"),
      link: "https://zivereci.com/podrzhite",
    },
    {
      type: "media",
      title: i18n.t("charity.items.otacPredragPopovic.title"),
      description: i18n.t("charity.items.otacPredragPopovic.description"),
      link: "https://otacpredrag.com/donacije",
      // }]), [shuffle]);
    },
  ];

  const { isLargeScreen } = useBox();
  return (
    <ThemedContainer>
      <ThemedScrollView
        style={{ padding: 20 }}
        contentContainerStyle={styles.container}
      >
        <ThemedView
          style={[styles.content, isLargeScreen && styles.contentLarge]}
        >
          <ThemedView style={styles.disclaimerWrap}>
            <ThemedText style={styles.disclaimerText}>
              {i18n.t("charity.disclaimer")}
            </ThemedText>
          </ThemedView>
          {items.map((item) => (
            <ThemedView
              key={item.title}
              style={
                isLargeScreen
                  ? [
                      styles.cardWrapperLarge,
                      isAndroid && isLandscape
                        ? { maxHeight: window.height * 0.7 }
                        : null,
                    ]
                  : undefined
              }
            >
              <CharityCard
                type={item.type}
                title={item.title}
                description={item.description}
                onPressLink={() => {
                  openWebPage(item.link);
                }}
                {...(item.aboutLink
                  ? {
                      onPressAbout: () => {
                        openWebPage(item.aboutLink!);
                      },
                    }
                  : {})}
              />
            </ThemedView>
          ))}
        </ThemedView>
      </ThemedScrollView>
    </ThemedContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
  },
  disclaimerWrap: {
    width: "100%",
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  disclaimerText: {
    fontSize: 12,
    color: "#bdbdbd",
  },
  contentLarge: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "stretch",
    gap: 16,
  },
  cardWrapperLarge: {
    width: "48%",
    alignSelf: "stretch",
    display: "flex",
  },
});
