

## Plan: Opdater Event Information til København Event

### Ændringer

#### 1. NewsletterPopup.tsx
| Felt | Nuværende | Ny værdi |
|------|-----------|----------|
| Link (linje 12) | `https://luma.com/jffq7yqn` | `https://luma.com/93cjqd5t` |
| Speakers (linje 36) | `Nick Traulsen & Jonas Ghaus` | `Marcus Dahl & Martin Roland` |
| Lokation (linje 37) | `Aarhus Event - Gratis deltagelse` | `København Event - Gratis deltagelse` |

#### 2. Footer.tsx
| Felt | Nuværende | Ny værdi |
|------|-----------|----------|
| Link (linje 9) | `https://luma.com/jffq7yqn` | `https://luma.com/93cjqd5t` |
| Speakers (linje 29) | `Nick Traulsen & Jonas Ghaus` | `Marcus Dahl & Martin Roland` |
| Lokation (linje 32) | `Aarhus Event - Gratis deltagelse` | `København Event - Gratis deltagelse` |

#### 3. Events.tsx
| Felt | Nuværende | Ny værdi |
|------|-----------|----------|
| Iframe embed (linje 89) | `evt-jWCCranVGxjfaOO` | Ny event ID fra Luma (skal udledes fra embed snippet - brugeren har ikke givet snippet, så vi beholder eller beder om det) |
| CTA link (linje 113) | `https://luma.com/jffq7yqn` | `https://luma.com/93cjqd5t` |
| Bottom CTA (linje 142) | `https://luma.com/jffq7yqn` | `https://luma.com/93cjqd5t` |

**Note:** Brugeren har ikke givet et nyt iframe snippet denne gang. Events.tsx iframe embed ID skal muligvis også opdateres — jeg opdaterer links men beholder embed ID medmindre brugeren giver et nyt snippet.

### Resultat
- Pop-up: "Marcus Dahl & Martin Roland" + "København Event"
- Footer: "Marcus Dahl & Martin Roland" + "København Event"
- Events-siden: Alle links peger på `luma.com/93cjqd5t`

