/**
 * Hook za dobijanje liturgijskih informacija za određeni datum.
 *
 * Logika:
 * 1. Preuzima liturgijske podatke iz ortodox-utils biblioteke za zadatu godinu
 * 2. Izračunava broj nedelje posle Vaskrsa ili Duhova
 * 3. Detektuje period posta (Veliki post, Božićni, Petrovskog, Uspenjski, sreda/petak)
 * 4. Određuje trenutni liturgijski period (Svetla sedmica, Velika sedmica, Triod, Pentikostrarion)
 * 5. Prepoznaje posebne dane (velike praznike)
 * 6. Nalazi predstojeći praznik u narednih 14 dana
 */

import i18n from "@/constants/i18n";
import { dates as datesModule, periods } from "ortodox-utils";
import { useMemo } from "react";

export interface LiturgicalInfo {
  weekAfterPascha: number | null;
  weekAfterPentecost: number | null;
  weekName: string;
  isFasting: boolean;
  fastingPeriod: string | null;
  currentPeriod: string | null;
  upcomingFeast: { name: string; date: Date } | null;
  specialDay: string | null;
}

interface Range {
  start: Date | string;
  end: Date | string;
}

// Pomoćna funkcija za proveru da li je vrednost period (sa start i end)
function isRange(value: any): value is Range {
  return (
    value && typeof value === "object" && "start" in value && "end" in value
  );
}

// Pomoćna funkcija za proveru da li je vrednost datum
function isDate(value: any): value is Date | string {
  return value instanceof Date || typeof value === "string";
}

export function useLiturgicalCalendar(date: Date = new Date()): LiturgicalInfo {
  return useMemo(() => {
    try {
      const todayISO = date.toISOString().split("T")[0];
      const year = date.getFullYear();
      const dates = datesModule.getForYear(year, "new");
      const prevYearDates = datesModule.getForYear(year - 1, "new");

      // Dobavi brojeve nedelja posle Vaskrsa i Duhova
      const weekPentecost = periods.getWeekAfterPentecost(todayISO, "new");
      const weekPascha = periods.getWeekAfterPascha(todayISO, "new");

      // Odredi naziv nedelje
      let weekName = "";
      let weekAfterPascha: number | null = null;
      let weekAfterPentecost: number | null = null;

      // Helper za normalizaciju datuma
      const toLocalDateForWeek = (d: Date | string) => {
        const utc = new Date(d);
        return new Date(utc.getFullYear(), utc.getMonth(), utc.getDate());
      };

      // Lista svih imenovanih nedelja
      const namedSundays = [
        "pascha", // Vaskrs je NEDELJA
        "pentecost", // Duhovi su NEDELJA
        "palmSunday", // Cveti su NEDELJA
        "thomasSunday",
        "zacchaeusSunday",
        "publicanPharisee",
        "sundayProdigalSon",
        "sundayLastJudgementMeatfare",
        "sundayCheesefareCastingAdam",
        "forgivenessSunday",
        "sundayOfOrthodoxy",
        "sundayOfStGregoryPalamas",
        "sundayOfVenerationOfPreciousCross",
        "sundayOfStJohnClimacus",
        "sundayOfStMaryOfEgypt",
        "sundayOfTheMyrrhBearingWomen",
        "sundayOfTheParalytic",
        "sundayOfTheSamaritanWomen",
        "sundayOfTheBlindMan",
        "sundayOfTheFathers",
        "sundayOfTheFathersOfThe1StEcumenicalCouncil",
        "sundayOfTheFathersOfThe7thEcumenicalCouncil",
        "sundayOfAllSaints",
        "firstSundayAfterPentecost",
        "secondSundayAfterPentecost",
        "thirdSundayAfterPentecost",
        "sundayAfterNativity",
        "sundayBeforeNativity",
        "secondSundayBeforeNativity",
        "sundayOfTheForefathers",
        "sundayBeforeTheophany",
        "sundayAfterTheophany",
        "sundayBeforeTheExaltationOfTheCross",
        "sundayAfterTheExaltationOfTheCross",
      ];

      // Uvek koristi nedelju u toku (prethodnu nedelju ili tekuću ako je nedelja)
      const dayOfWeek = date.getDay();
      const sundayInProgress = new Date(date);
      if (dayOfWeek !== 0) {
        sundayInProgress.setDate(date.getDate() - dayOfWeek);
      }
      const sundayLocal = new Date(
        sundayInProgress.getFullYear(),
        sundayInProgress.getMonth(),
        sundayInProgress.getDate(),
      );

      // Dobavi brojeve nedelja
      if (weekPascha.week !== null && weekPascha.week >= 0) {
        weekAfterPascha = weekPascha.week;
      } else if (weekPentecost.week !== null && weekPentecost.week >= 0) {
        weekAfterPentecost = weekPentecost.week;
      } else if (weekPentecost.week !== null && weekPentecost.week < 0) {
        // Nedelje od 1. januara do Duhova tekuće godine nastavljaju brojanje iz prošle godine
        if (dates.pentecost && isDate(dates.pentecost)) {
          const pentecostCurrentYear = toLocalDateForWeek(dates.pentecost);
          if (sundayLocal.getTime() < pentecostCurrentYear.getTime()) {
            // Pre Duhova tekuće godine: broj od Duhova prethodne godine
            if (prevYearDates.pentecost && isDate(prevYearDates.pentecost)) {
              const pentecostPrevYear = toLocalDateForWeek(
                prevYearDates.pentecost,
              );
              const daysSincePentecost = Math.floor(
                (sundayLocal.getTime() - pentecostPrevYear.getTime()) /
                  (1000 * 60 * 60 * 24),
              );
              const weeksSincePentecost = Math.floor(daysSincePentecost / 7);
              if (weeksSincePentecost > 0) {
                weekAfterPentecost = weeksSincePentecost;
              }
            }
          } else {
            // Na ili posle Duhova tekuće godine: broj od Duhova tekuće godine
            const daysSincePentecost = Math.floor(
              (sundayLocal.getTime() - pentecostCurrentYear.getTime()) /
                (1000 * 60 * 60 * 24),
            );
            const weeksSincePentecost = Math.floor(daysSincePentecost / 7);
            if (weeksSincePentecost >= 0) {
              weekAfterPentecost = weeksSincePentecost;
            }
          }
        }
      }

      // Prvo probaj da nađeš imenovanu nedelju
      let foundNamedSunday = false;
      for (const sundayKey of namedSundays) {
        const sundayDate = dates[sundayKey];
        if (sundayDate && isDate(sundayDate)) {
          const namedSundayLocal = toLocalDateForWeek(sundayDate);
          if (sundayLocal.getTime() === namedSundayLocal.getTime()) {
            const namedWeek = i18n.t(`weekNames.${sundayKey}`);
            if (weekAfterPascha !== null) {
              weekName = `${namedWeek} (${i18n.t("weekNames.afterPascha", { count: weekAfterPascha })})`;
            } else if (weekAfterPentecost !== null) {
              weekName = `${namedWeek} (${i18n.t("weekNames.afterPentecost", { count: weekAfterPentecost })})`;
            } else {
              weekName = namedWeek;
            }
            foundNamedSunday = true;
            break;
          }
        }
      }
      // Ako nije pronađena imenovana nedelja, koristi brojčani sistem
      if (!foundNamedSunday) {
        if (weekAfterPascha !== null) {
          weekName = i18n.t("weekNames.afterPascha", {
            count: weekAfterPascha,
          });
        } else if (weekAfterPentecost !== null) {
          weekName = i18n.t("weekNames.afterPentecost", {
            count: weekAfterPentecost,
          });
        }
      }

      // Proveri periode posta
      let isFasting = false;
      let fastingPeriod: string | null = null;
      // Normalize to local date for consistent comparison
      const todayLocal = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
      );
      const todayTime = todayLocal.getTime();

      // Helper to convert UTC date to local midnight
      const toLocalDate = (d: Date | string) => {
        const utc = new Date(d);
        return new Date(utc.getFullYear(), utc.getMonth(), utc.getDate());
      };

      // Proveri Veliki post
      if (dates.greatLent && isRange(dates.greatLent)) {
        const startLocal = toLocalDate(dates.greatLent.start).getTime();
        const endLocal = toLocalDate(dates.greatLent.end).getTime();
        if (todayTime >= startLocal && todayTime <= endLocal) {
          isFasting = true;
          fastingPeriod = i18n.t("liturgical.greatLent");
        }
      }

      // Proveri Božićni post
      if (dates.nativityFast && typeof dates.nativityFast === "object") {
        // Proveri obe verzije posta (tekuću i sledeću godinu)
        const fastsToCheck = [];

        if (isRange(dates.nativityFast)) {
          fastsToCheck.push(dates.nativityFast);
        }

        if (
          "followingYear" in dates.nativityFast &&
          dates.nativityFast.followingYear &&
          isRange(dates.nativityFast.followingYear)
        ) {
          fastsToCheck.push(dates.nativityFast.followingYear);
        }

        for (const nativityFast of fastsToCheck) {
          const startLocal = toLocalDate(nativityFast.start).getTime();
          const endLocal = toLocalDate(nativityFast.end).getTime();
          if (todayTime >= startLocal && todayTime <= endLocal) {
            isFasting = true;
            fastingPeriod = i18n.t("liturgical.nativityFast");
            break;
          }
        }
      }

      // Proveri Petrovskog post
      if (dates.apostlesFast && isRange(dates.apostlesFast)) {
        const startLocal = toLocalDate(dates.apostlesFast.start).getTime();
        const endLocal = toLocalDate(dates.apostlesFast.end).getTime();
        if (todayTime >= startLocal && todayTime <= endLocal) {
          isFasting = true;
          fastingPeriod = i18n.t("liturgical.apostlesFast");
        }
      }

      // Proveri Uspenjski post
      if (dates.dormitionFast && isRange(dates.dormitionFast)) {
        const startLocal = toLocalDate(dates.dormitionFast.start).getTime();
        const endLocal = toLocalDate(dates.dormitionFast.end).getTime();
        if (todayTime >= startLocal && todayTime <= endLocal) {
          isFasting = true;
          fastingPeriod = i18n.t("liturgical.dormitionFast");
        }
      }

      // Proveri Krst (Bogojavljensko veče - 18. januar)
      if (dates.eveOfTheophany && isDate(dates.eveOfTheophany)) {
        const eveDate = toLocalDate(dates.eveOfTheophany);
        if (todayTime === eveDate.getTime()) {
          isFasting = true;
          if (!fastingPeriod) {
            fastingPeriod = i18n.t("liturgical.eveOfTheophanyFasting");
          }
        }
      }

      // Proveri Usekovanje glave Sv. Jovana Krstiteljа (11. septembar / 29. avgust juliano)
      if (dates.beheadingBaptist && isDate(dates.beheadingBaptist)) {
        const beheadingDate = toLocalDate(dates.beheadingBaptist);
        if (todayTime === beheadingDate.getTime()) {
          isFasting = true;
          if (!fastingPeriod) {
            fastingPeriod = i18n.t("liturgical.beheadingBaptistFasting");
          }
        }
      }

      // Proveri Vozdviženje časnog Krsta (27. septembar / 14. septembar juliano)
      if (dates.exaltationCross && isDate(dates.exaltationCross)) {
        const exaltationDate = toLocalDate(dates.exaltationCross);
        if (todayTime === exaltationDate.getTime()) {
          isFasting = true;
          if (!fastingPeriod) {
            fastingPeriod = i18n.t("liturgical.exaltationCrossFasting");
          }
        }
      }

      // Proveri post sredom i petkom (van velikih postova)
      if (dayOfWeek === 3 || dayOfWeek === 5) {
        // Proveri da li je u popraznićnim danima gde se post može olakšati
        const isAfterFeast = checkAfterFeast(dates, todayTime);
        if (!isAfterFeast && !isFasting) {
          isFasting = true;
          fastingPeriod = i18n.t("liturgical.wednesdayFriday");
        }
      }

      // NAPOMENA: Post se prikazuje nezavisno od posebnih dana.
      // Npr. na Badnji dan i dalje je Božićni post aktivan.

      // Odredi trenutni liturgijski period
      let currentPeriod: string | null = null;

      if (dates.brightWeek && isRange(dates.brightWeek)) {
        const startLocal = toLocalDate(dates.brightWeek.start).getTime();
        const endLocal = toLocalDate(dates.brightWeek.end).getTime();
        if (todayTime >= startLocal && todayTime <= endLocal) {
          currentPeriod = i18n.t("liturgical.brightWeek");
        }
      } else if (dates.holyWeek && isRange(dates.holyWeek)) {
        const startLocal = toLocalDate(dates.holyWeek.start).getTime();
        const endLocal = toLocalDate(dates.holyWeek.end).getTime();
        if (todayTime >= startLocal && todayTime <= endLocal) {
          currentPeriod = i18n.t("liturgical.holyWeek");
        }
      } else if (dates.triodion && isRange(dates.triodion)) {
        const startLocal = toLocalDate(dates.triodion.start).getTime();
        const endLocal = toLocalDate(dates.triodion.end).getTime();
        if (todayTime >= startLocal && todayTime <= endLocal) {
          currentPeriod = i18n.t("liturgical.triodion");
        }
      } else if (dates.pentecostarion && isRange(dates.pentecostarion)) {
        const startLocal = toLocalDate(dates.pentecostarion.start).getTime();
        const endLocal = toLocalDate(dates.pentecostarion.end).getTime();
        if (todayTime >= startLocal && todayTime <= endLocal) {
          currentPeriod = i18n.t("liturgical.pentecostarion");
        }
      }

      // Proveri posebne dane (velike praznike)
      let specialDay: string | null = null;
      const todayLocalDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
      );

      const specialDays = [
        { key: "pascha", label: i18n.t("liturgical.pascha") },
        { key: "nativity", label: i18n.t("liturgical.nativity") },
        { key: "theophany", label: i18n.t("liturgical.theophany") },
        { key: "ascension", label: i18n.t("liturgical.ascension") },
        { key: "pentecost", label: i18n.t("liturgical.pentecost") },
        { key: "transfiguration", label: i18n.t("liturgical.transfiguration") },
        { key: "dormition", label: i18n.t("liturgical.dormition") },
        {
          key: "nativityTheotokos",
          label: i18n.t("liturgical.nativityTheotokos"),
        },
        { key: "exaltationCross", label: i18n.t("liturgical.exaltationCross") },
        {
          key: "presentationTheotokos",
          label: i18n.t("liturgical.presentationTheotokos"),
        },
        { key: "annunciation", label: i18n.t("liturgical.annunciation") },
        { key: "palmSunday", label: i18n.t("liturgical.palmSunday") },
        { key: "lazarusSaturday", label: i18n.t("liturgical.lazarusSaturday") },
        {
          key: "forgivenessSunday",
          label: i18n.t("liturgical.forgivenessSunday"),
        },
        { key: "thomasSunday", label: i18n.t("liturgical.thomasSunday") },
        { key: "eveOfTheophany", label: i18n.t("liturgical.eveOfTheophany") },
        { key: "circumcision", label: i18n.t("liturgical.circumcision") },
        {
          key: "presentationChrist",
          label: i18n.t("liturgical.presentationChrist"),
        },
        {
          key: "beheadingBaptist",
          label: i18n.t("liturgical.beheadingBaptist"),
        },
        {
          key: "protectionTheotokos",
          label: i18n.t("liturgical.protectionTheotokos"),
        },
        {
          key: "sundayOfOrthodoxy",
          label: i18n.t("liturgical.sundayOfOrthodoxy"),
        },
      ];

      for (const day of specialDays) {
        const dateValue = dates[day.key];
        if (dateValue && isDate(dateValue)) {
          const feastDate = new Date(dateValue);
          const feastLocalDate = new Date(
            feastDate.getFullYear(),
            feastDate.getMonth(),
            feastDate.getDate(),
          );

          if (todayLocalDate.getTime() === feastLocalDate.getTime()) {
            specialDay = day.label;
            break;
          }
        }
      }

      // Ručna provera za Badnji dan (dan pre Božića)
      if (!specialDay && dates.nativity && isDate(dates.nativity)) {
        const nativityDate = new Date(dates.nativity);
        const nativityLocalDate = new Date(
          nativityDate.getFullYear(),
          nativityDate.getMonth(),
          nativityDate.getDate(),
        );
        const dayBeforeNativity = new Date(nativityLocalDate);
        dayBeforeNativity.setDate(dayBeforeNativity.getDate() - 1);

        if (todayLocalDate.getTime() === dayBeforeNativity.getTime()) {
          specialDay = i18n.t("liturgical.eveOfNativity");
        }
      }

      // Pronađi predstojeći praznik (u narednih 2 dana)
      let upcomingFeast: { name: string; date: Date } | null = null;
      const twoDaysFromNow = todayTime + 2 * 24 * 60 * 60 * 1000;

      for (const day of specialDays) {
        const dateValue = dates[day.key];
        if (dateValue && isDate(dateValue)) {
          const feastLocal = toLocalDate(dateValue);
          const feastTime = feastLocal.getTime();

          if (feastTime > todayTime && feastTime <= twoDaysFromNow) {
            if (!upcomingFeast || feastTime < upcomingFeast.date.getTime()) {
              upcomingFeast = { name: day.label, date: feastLocal };
            }
          }
        }
      }

      return {
        weekAfterPascha,
        weekAfterPentecost,
        weekName,
        isFasting,
        fastingPeriod,
        currentPeriod,
        upcomingFeast,
        specialDay,
      };
    } catch (err) {
      console.error("Error in useLiturgicalCalendar:", err);
      return {
        weekAfterPascha: null,
        weekAfterPentecost: null,
        weekName: "",
        isFasting: false,
        fastingPeriod: null,
        currentPeriod: null,
        upcomingFeast: null,
        specialDay: null,
      };
    }
  }, [date]);
}

// Provera da li je datum u nekom od poprazničnih perioda gde se ukida post sredom/petkom
function checkAfterFeast(dates: any, today: number): boolean {
  // Samo poprazničja koja ukidaju post sredom i petkom
  // (Bogojavljenje, Preobraženje, Uspenje, Vozdviženje NE ukidaju post sredom/petkom)
  const afterFeastPeriods = [
    "afterfeastPascha",
    "afterfeastAscension",
    "afterfeastPentecost",
    "afterfeastNativity",
  ];

  for (const period of afterFeastPeriods) {
    if (dates[period] && dates[period].start && dates[period].end) {
      const start = new Date(dates[period].start).getTime();
      const end = new Date(dates[period].end).getTime();
      if (today >= start && today <= end) {
        return true;
      }
    }
  }

  return false;
}
