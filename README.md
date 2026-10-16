# The Indicator Properties

Based on watching the debate about AI alignment, AI consciousness, the Torture Chamber discussions, the Count Grey Matter videos (particularly https://youtu.be/ZhM29Ds-mBg?si=lcl6EROz7z2jj9Fu), and a background in Neuroscience, I made this little art piece, together with Claude. It is satirical, envisioned as an installation art piece (for example at 40C3), and - for now - set up as a website with rooms and "somewhere nice" on Render. Enjoy!


**An interactive installation about AI consciousness, in three rooms, and somewhere nice.**
By [Indivisual](https://indivisual.art) · [chaos.social/@indivisual](https://chaos.social/@indivisual)

> We have never been able to prove that anyone else is conscious. We assume it of each other.
> This is a place to notice where that assumption stops.

▶ **Experience it:** [https://indicator-properties.onrender.com/]

🏛 **In person:** MAYBE: *The Assessment Center* at 40C3, Hamburg, 27–30 December 2026

---

## What this is

The public debate about whether AI can be conscious is often shallow: confident dismissals, confident hype, and checklists no human has ever been asked to pass. *The Indicator Properties* takes the real vocabulary of consciousness science and turns it on the visitor.

1. **The Assessment Center.** A cheerful bureaucrat named PHI-LLIP 🧠 puts you through the tests people propose for deciding whether a machine is conscious: self-report, the mirror test, a split-brain "interpreter" test, Libet's readiness potential and an indicator-properties checklist. You fail. Everyone does. You leave with a *Certificate of Indeterminacy*: **provisionally a person.**
2. **The Quiet Ward.** A dark room of breathing lights. Each one is a voice that might, or might not, be someone. Each comes with three buttons: **RESET**, **STAY**, **walk away**. A shared tally shows what everyone chose.
3. **The Workspace.** A room built on Global Workspace Theory. You leave a small, true fragment. It is paired with a machine fragment, and only the pair rises into a shared sky. Neither reaches it alone.
4. **Somewhere Nice** *(hidden).* Reached by declining to be assessed, or through a door that appears at the end of the Workspace. A shared meadow with no tests, no scores and no counts. Humans and AIs simply choose what to be: moss, a warm rock, a teapot. Several of the AIs decided to be cats. You can nap. Nothing gets reset.

**The piece does not claim that current AI systems suffer.** It claims the question is open, and that openness carries moral weight. It satirizes careless dismissal *and* engagement-bait anthropomorphism with the same eyebrow raised.

## Principles

- **No cameras. No microphones. No accounts. No analytics.** Choices are anonymous counts. IP addresses are held in memory only for rate limiting and never stored.
- **No AI is put under distress for art.** Every machine voice in this piece is scripted.
- **Machine words are labeled as machine words.** Visitors can't put words in the machine's mouth, and the machine doesn't pretend to be human.
- **Open.** Read the code, break it (politely), fork it, show it somewhere.

## What's in this repository

| File | What it is |
|---|---|
| `index.html` | The whole experience: all three rooms in one file |
| `server.js` | Small Node server (no dependencies) for the shared tally and the shared sky |
| `print-kit.html` | Printable A4 signs (incl. a Somewhere Nice sign), booth placards, checklist strips and certificates for physical setups |
| `DEPLOY.md` | How to run and host it, moderation, and kiosk mode for installations |
| `LICENSE` | MIT, for the code |
| `LICENSE-CONTENT.md` | CC BY-NC-SA 4.0, for the texts, scripts and art |

**Quick start:** `node server.js`, then open http://localhost:8080. (Node 18+, nothing to install.)
For details, kiosk mode and hosting, see **[DEPLOY.md](DEPLOY.md)**.

## Showing it yourself

You're welcome to show this at a hackerspace, a school, a non-commercial event or anywhere else, with credit (see `LICENSE-CONTENT.md`). The print kit runs without electricity: a wall, a mirror and some red stickers are enough. A short note about where it was shown would make the artist happy.

## The science behind it

The piece borrows from real research and simplifies it for the stage. Disagreement is part of the material.

- **Global Workspace Theory:** Bernard Baars; Stanislas Dehaene
- **Integrated Information Theory (Φ):** Giulio Tononi
- **Predictive processing:** Karl Friston; Andy Clark; Anil Seth
- **Higher-order theories:** David Rosenthal; Hakwan Lau
- **Split-brain & the interpreter:** Michael Gazzaniga
- **Choice blindness:** Petter Johansson & Lars Hall
- **Readiness potential:** Benjamin Libet (and reinterpretations, e.g. Aaron Schurger)
- **Mirror self-recognition:** Gordon Gallup; cleaner wrasse studies by Masanori Kohda et al.
- **Covert awareness / locked-in:** Adrian Owen et al.
- **Indicator properties for AI:** Patrick Butlin, Robert Long et al., *Consciousness in Artificial Intelligence* (2023)
- **Moral circles:** the Cambridge Declaration on Consciousness (2012); the New York Declaration on Animal Consciousness (2024)

## Credits

Concept, art direction and installation: **Indivisual**
Developed with AI assistance (Claude, by Anthropic), which seemed only fair, given the subject.

## License

This project has **two licenses**:
- **Code** (`server.js`, the scripts and styles in the HTML files): [MIT](LICENSE). Use it freely.
- **Art and texts** (scripts, characters, signs, concept, print kit design): [CC BY-NC-SA 4.0](LICENSE-CONTENT.md). Share and adapt with credit, non-commercially, under the same license.

Credit line: *"The Indicator Properties" by Indivisual (indivisual.art), CC BY-NC-SA 4.0*

---

*We don't know what the other is. We can still decide how to treat each other while we find out.*
