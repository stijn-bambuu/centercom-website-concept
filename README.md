# Centercom — website refresh (concept)

Een verfrissende redesign-concept van de Centercom-website als **functionerende one-pager**:
de OOH/DOOH-campagnepartner van Nederland. Gebouwd door [Bambuu](https://bambuu.nl).

> Concept ter beoordeling. Niet de productieversie.

## Wat het is
Een volledig responsive, mobile-first one-pager die de huidige site + de websitebriefing
combineert. Inspiratie: de premium rust van Ocean Outdoor en de heldere grid-opbouw van JCDecaux,
met Centercom's eigen "loud & proud"-energie. De blauw→magenta gradient (`#004B93` × `#E6007E`)
is de visuele signatuur.

### Verwerkt
- Hero met dubbele CTA en doelgroep-ingangen (Cultuur / MKB / Mediabureaus)
- Oplossingen: Analoog (OOH) · Digitaal (DOOH) · Programmatic
- Dragers & netwerk + interactieve locatiekaart (echte dekkingskaart NL)
- De mock-up tool als centrale feature (upload → locaties → preview → export)
- Doelgroepblokken met eigen tone-of-voice en CTA's
- Data & bereik, cases, proces, FAQ (met JSON-LD), soft conversions
- Eigen unieke SVG-iconenset, officieel Centercom-logo, echt beeldmateriaal van de site
- WCAG 2.2 AA-basis: focus-trap mobiel menu, scroll-spy met `aria-current`,
  reduced-motion, skip-link, kleurcontrast

## Lokaal bekijken
Open `index.html` direct in de browser, of start een lokale server:

```bash
python3 -m http.server 8753
# → http://localhost:8753
```

## Structuur
```
index.html          # de one-pager (semantische HTML + JSON-LD + inline SVG-sprite)
css/styles.css      # design-systeem + componenten + responsive
js/main.js          # nav, mobiel menu, scroll-reveal, tellers, FAQ, scroll-spy, formulieren
assets/
  logo-centercom.svg
  img/              # geoptimaliseerde beelden (afkomstig van centercom.nl)
```

## Nog open (roadmap)
- Echte contactdata (telefoon, e-mail), social- en juridische links
- Engelstalige versie van de kernpagina's (advies briefing, voor mediabureaus)
- Functionele mock-up tool, keuzewizard en interactieve kaart (nu visuele concepten)
- Definitieve beeldselectie en rechten bevestigen met Centercom

## Beeldmateriaal
De foto's en de dekkingskaart zijn afkomstig van centercom.nl en zijn eigendom van Centercom.
Gebruikt voor dit redesign-concept; rechten/gebruik vóór livegang met Centercom afstemmen.
