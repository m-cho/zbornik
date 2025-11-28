# Testiranje Liturgijskih Informacija

## Pristup Test Ekranu

Test ekran se nalazi na putanji `/test-liturgical`. Možete mu pristupiti:
1. Direktno unesite URL u browser: `http://localhost:8081/test-liturgical`
2. Ili dodajte privremeno dugme na početnoj strani

## Način Testiranja

### 1. Ručno Unošenje Datuma

U polje za unos unesite datum u formatu `YYYY-MM-DD`:
- Primer: `2025-04-20` za Vaskrs
- Primer: `2025-01-07` za Božić
- Primer: `2025-11-28` za Božićni post

### 2. Brzi Izbor Datuma

Koristite predefinisana dugmad za brzu navigaciju:
- **Vaskrs 2025** - `2025-04-20`
- **Badnji dan** - `2025-01-06`
- **Božić 2025** - `2025-01-07`
- **Bogojavljensko veče** - `2025-01-18`
- **Bogojavljenje 2025** - `2025-01-19`
- **Velika sedmica** - `2025-04-13`
- **Duhovi 2025** - `2025-06-08`
- **Preobraženje 2025** - `2025-08-19`
- **Veliki post** - `2025-03-03`
- **Božićni post** - `2025-11-28`

### 3. Programsko Testiranje

Za programsko testiranje, možete direktno pozvati hook sa određenim datumom:

\`\`\`typescript
import { useLiturgicalCalendar } from '@/hooks/useLiturgicalCalendar';

// Test za određeni datum
const testDate = new Date('2025-04-20'); // Vaskrs
const liturgicalInfo = useLiturgicalCalendar(testDate);

console.log(liturgicalInfo);
// {
//   weekAfterPascha: 0,
//   weekAfterPentecost: null,
//   weekName: "0. nedelja po Vaskrsu",
//   isFasting: false,
//   fastingPeriod: null,
//   currentPeriod: "Svetla sedmica",
//   upcomingFeast: { name: "Vaznesenje Gospodnje", date: Date },
//   specialDay: "Vaskrs Hristov"
// }
\`\`\`

## Važni Datumi za Testiranje (2025)

### Pokretni Praznici
- **Vaskrs**: 20. april (`2025-04-20`)
- **Velika sedmica**: 13-19. april
- **Svetla sedmica**: 20-26. april
- **Vaznesenje**: 29. maj (`2025-05-29`)
- **Duhovi**: 8. jun (`2025-06-08`)

### Nepokretni Praznici
- **Badnji dan**: 6. januar (`2025-01-06`)
- **Božić**: 7. januar (`2025-01-07`)
- **Bogojavljensko veče**: 18. januar (`2025-01-18`)
- **Bogojavljenje**: 19. januar (`2025-01-19`)
- **Sretenje**: 15. februar (`2025-02-15`)
- **Preobraženje**: 19. avgust (`2025-08-19`)
- **Uspenje**: 28. avgust (`2025-08-28`)
- **Rođenje Bogorodice**: 21. septembar (`2025-09-21`)
- **Vozdviženje**: 27. septembar (`2025-09-27`)
- **Pokrov**: 14. oktobar (`2025-10-14`)

### Postovi
- **Božićni post**: 28. novembar - 6. januar
- **Veliki post**: 3. mart - 19. april
- **Petrovskog post**: 16. jun - 11. jul
- **Uspenjski post**: 14. avgust - 27. avgust

## Šta Testirati

1. **Posebni Dani**: Proverite da li se pravilno prikazuju velika svetkovina
2. **Nazivi Nedelja**: Proverite brojanje nedelja posle Vaskrsa i Duhova
3. **Post**: Proverite da li se pravilno detektuje post
4. **Liturgijski Periodi**: Proverite Triod, Pentekostarion, Veliku i Svetlu sedmicu
5. **Predstojući Praznici**: Proverite da li se prikazuje sledeći praznik u naredna 2 dana

## Uklanjanje Test Dugmeta u Produkciji

Test dugme je automatski sakriveno u produkcijskoj verziji jer je obavijeno sa:
\`\`\`typescript
## Napomene o Testiranju

- Test stranica je dostupna samo u development modu
- Za produkciju, uklonite fajl `/app/test-liturgical.tsx`
- Svi datumi su prikazani u lokalnoj vremenskoj zoni
- Posebna pažnja je posvećena UTC/lokalnoj konverziji za praznike
\`\`\`

Ovo dugme će biti vidljivo samo kada pokrenete aplikaciju sa `npm start`, a neće biti prisutno u produkcijskom buildu.

## Primeri Testiranja

### Test 1: Veliki Post
\`\`\`
Datum: 2025-03-03
Očekivano:
- isFasting: true
- fastingPeriod: "Veliki post"
- currentPeriod: "Triod"
- weekName: pokazuje nedelju u Trijodu
\`\`\`

### Test 2: Vaskrs
\`\`\`
Datum: 2025-04-20
Očekivano:
- specialDay: "Vaskrs Hristov"
- currentPeriod: "Svetla sedmica"
- isFasting: false
- weekAfterPascha: 0
\`\`\`

### Test 3: Sreda u Običnom Vremenu
\`\`\`
Datum: 2025-11-12 (sreda)
Očekivano:
- isFasting: true
- fastingPeriod: "Post (sreda/petak)"
- weekAfterPentecost: neka vrednost
\`\`\`

### Test 4: Božićni Post
\`\`\`
Datum: 2025-11-28
Očekivano:
- isFasting: true
- fastingPeriod: "Božićni post"
- upcomingFeast: prikazuje Božić
\`\`\`

## Automatsko Testiranje Cele Godine

Ako želite da testirate sve datume u godini programski:

\`\`\`typescript
// Testiraj sve datume u 2025
for (let month = 0; month < 12; month++) {
  for (let day = 1; day <= 31; day++) {
    try {
      const testDate = new Date(2025, month, day);
      if (testDate.getMonth() !== month) continue; // Preskoči nevažeće datume
      
      const info = useLiturgicalCalendar(testDate);
      console.log(\`\${testDate.toISOString().split('T')[0]}: \`, info);
    } catch (e) {
      // Preskoči greške
    }
  }
}
\`\`\`

## Debug Mod

Za detaljnije informacije tokom testiranja, možete dodati console.log u hook:

\`\`\`typescript
// U useLiturgicalCalendar.ts, dodajte na početku:
console.log('Testing date:', date.toISOString());
console.log('Dates object:', dates);
\`\`\`
