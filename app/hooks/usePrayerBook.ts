/* eslint-disable @typescript-eslint/no-require-imports */
import { useEffect } from "react";
import { create } from "zustand";

type EmptyArray = [];

type PrayerCategory = {
  id: string;
  title: string;
  prayers: string[];
};

type PrayerMetadata = {
  id: string;
  title: string;
};

type PrayerMetadataMap = Record<string, PrayerMetadata>;

type State = {
  categories: PrayerCategory[] | EmptyArray;
  setCategories: (categories: PrayerCategory[] | EmptyArray) => void;

  prayersMetadata: PrayerMetadataMap;
  setPrayersMetadata: (prayers: PrayerMetadataMap) => void;
}

const useStore = create<State>()((set) => ({
  categories: [],
  setCategories: (categories: PrayerCategory[] | EmptyArray) => set({ categories }),

  prayersMetadata: {},
  setPrayersMetadata: (prayersMetadata: PrayerMetadataMap) => set({ prayersMetadata }),
}));

export default function usePrayerBook() {
  const categoriesList = useStore((state) => state.categories);
  const setCategoriesList = useStore((state) => state.setCategories);

  const prayersMetadataMap = useStore((state) => state.prayersMetadata);
  const setPrayersMetadataMap = useStore((state) => state.setPrayersMetadata);

  useEffect(() => {
    fetchPrayerBookData()
      .then(({ categories, prayersMetadata }) => {
        setCategoriesList(categories);
        setPrayersMetadataMap(prayersMetadata);
      });
  }, [setCategoriesList, setPrayersMetadataMap]);

  async function fetchPrayerBookData() {
    // const locale = i18n.locale;
    const locale = 'sr-Cyrl';

    const [categories, prayersMetadata] = await Promise.all([
      import(`../assets/prayer-book/${locale}/categories.json`)
        .then(module => module.default as PrayerCategory[]),
      import(`../assets/prayer-book/${locale}/prayers-metadata.json`)
        .then(module => module.default as PrayerMetadata[]),
    ]);

    return {
      categories,
      prayersMetadata: prayersMetadata.reduce((map, prayer) => {
        map[prayer.id] = prayer;
        return map;
      }, {} as PrayerMetadataMap),
    };
  }

  function getPrayerContent(prayerId: string): string {
    // const locale = i18n.locale;
    const locale = 'sr-Cyrl';
    
    const prayersContentMap: Record<string, any> = {
      'oce-nas': require(`../assets/prayer-book/${locale}/prayers/oce-nas.md`),
      'bogorodice-djevo': require(`../assets/prayer-book/${locale}/prayers/bogorodice-djevo.md`),
      'simbol-vere': require(`../assets/prayer-book/${locale}/prayers/simbol-vere.md`),
      'isusova-molitva': require(`../assets/prayer-book/${locale}/prayers/isusova-molitva.md`),
      'sv-jovanu-krstitelju': require(`../assets/prayer-book/${locale}/prayers/sv-jovanu-krstitelju.md`),
      'sv-savi-srpskom': require(`../assets/prayer-book/${locale}/prayers/sv-savi-srpskom.md`),
      'za-boziju-zastitu': require(`../assets/prayer-book/${locale}/prayers/za-boziju-zastitu.md`),
      'za-duhovnu-obnovu': require(`../assets/prayer-book/${locale}/prayers/za-duhovnu-obnovu.md`),
      'jutarnje': require(`../assets/prayer-book/${locale}/prayers/jutarnje.md`),
      'vecernje': require(`../assets/prayer-book/${locale}/prayers/vecernje.md`),
      'pravilo-svetog-serafima': require(`../assets/prayer-book/${locale}/prayers/pravilo-svetog-serafima.md`),
    };
    
    return prayersContentMap[prayerId] || '';
  }

  return {
    categories: categoriesList,
    prayers: prayersMetadataMap,
    getPrayerContent,
  };
}
