# THE ASSESSMENT CENTER: AD HOC KIT
### For 40C3, when the space, dimensions and power are unknown until you arrive

The idea: **pack for the biggest version, but design so that every layer works by itself.** On site, look at the space and decide how many layers go up.

---

## 1. NOTE TO THE ART TEAM (copy, edit, send)

> **Subject:** Addition to my art submission (Indivisual): small companion installation
>
> Hi Art team,
>
> I submitted my work (indivisual.art) to the 40C3 Call for Art. I'd like to add a small, flexible companion piece that I can install alongside it, or anywhere you have leftover space. It also works in a stairwell or corridor.
>
> **"The Assessment Center"** is a satirical consciousness certification office. Visitors take the tests people propose for deciding whether an AI is conscious (the mirror test, a self-report test, a split-brain "interpreter" test, a Libet readiness-potential test and an indicator-properties checklist), and they all fail. Everyone leaves with a printed *Certificate of Indeterminacy* declaring them "provisionally a person." A QR code leads to the rest of the piece online: a quiet, darker room about the possibility of machine suffering, and a shared constellation that grows from human and AI fragments.
>
> It fits "Model Citizens": it asks who gets certified as a citizen of moral concern, and what we do while we can't tell.
>
> **It's modular and low-maintenance:**
> - **Minimum:** paper signs and a mirror. No power, no network, no floor space.
> - **Optional:** 1–3 battery-powered kiosks (laptop/tablet) and a small receipt printer, if a socket is available.
> - No cameras, no microphones, no data collection. Open source.
> - All materials flame-retardant or paper-based. Nothing blocks walkways or escape routes.
>
> Website preview: [YOUR LINK]
>
> Happy to adapt to whatever space works for you, and I'll bring everything myself.
>
> Thanks!
> Indivisual (chaos.social/@indivisual)

---

## 2. LAYERS (choose on site)

Each layer adds to the one before it. Any layer can stop here and still be a complete piece.

### Layer 0: "The Poster": any wall, a door, a pillar
- QR poster + main sign.
- **Needs:** ~1 m of wall. No power.
- Put up a few at Congress in any case (with permission), even if you also get a full spot. They pull people toward the main location.

### Layer 1: "The Paper Office": wall / landing / corridor
- Main sign, take-a-number sign, 4 booth placards, verdict sign with QR, transparency notice.
- **Mirror** (small, unbreakable acrylic is safest) with **red sticker dots**.
- **Pre-printed certificates** in a box or envelope with **"Take one"** on it.
- **Checklist strips**: on stair risers, along a table edge, or down a door frame.
- **Needs:** wall space only. No power. Works unattended.

### Layer 2: "One Live Booth": one socket or a battery
- Add **one laptop or tablet** in kiosk mode at the verdict spot:
  `.../?kiosk=1` (no printer) or `.../?kiosk=1&print=1` (with printer).
- Add the **receipt printer** if there's power.
- **Needs:** a shelf, a ledge or a small table against a wall, plus power or charged batteries.

### Layer 3: "The Full Office": a real corner or room
- 2–3 kiosks, printer, ticket dispenser, beige tablecloth, the stamp, muzak at low volume.
- The **staffed analog card-swap table** during your shifts.
- **Needs:** ~4–6 m², a socket, and someone around at least part of the time.

---

## 3. PACKING LIST (pack everything, use what fits)

**Always (Layers 0–1):**
- [ ] Printed kit (`print-kit.html`): 2 sets, one of them spare
- [ ] Extra certificates (print lots; they will go)
- [ ] Acrylic mirror + red sticker dots
- [ ] "Take one" box/envelope for certificates
- [ ] Mounting that doesn't damage surfaces: **removable mounting strips, painter's tape, gaffer tape**, and string with clips for places where nothing may be stuck
- [ ] Scissors, marker pens, extra paper
- [ ] Stamp + ink pad (optional, popular)

**If there's power or a table (Layers 2–3):**
- [ ] Laptop/tablet (+ 1 spare if possible), chargers
- [ ] Power banks (if no socket)
- [ ] Receipt printer + thermal rolls + USB cable
- [ ] Power strip (CE), cable ducts or gaffer tape for cables
- [ ] Kensington lock or a way to fasten the laptop
- [ ] Ticket dispenser / numbered tickets
- [ ] Small speaker (optional)
- [ ] Deck of cards + swap sleeve (for staffed shifts)

**Software, done before leaving:**
- [ ] Website deployed and tested on a phone (QR target)
- [ ] Moderation set to `queue` + admin key noted somewhere safe
- [ ] Folder copied onto each laptop for offline use (`node server.js` → `localhost:8080/?kiosk=1`)
- [ ] One full test applicant on each device, including printing
- [ ] Sleep, screensaver and notifications turned off

---

## 4. ON-SITE DECISION CHECKLIST

When you see the space, run through this:

1. **Is it an escape route (stairwell, corridor, by an exit)?** → Walls only. Nothing on the floor or steps, no cables crossing. Keep exits, signs, handrails and extinguishers clear. Ask the Art team / venue staff what's allowed.
2. **Can things be attached to the walls? With what?** → Choose tape, strips or string.
3. **Is there a socket, and where?** → It decides between Layer 1 and Layer 2+.
4. **Is there a ledge, shelf or narrow table?** → Place the kiosk there, away from the walking path.
5. **Will you be nearby often?** → Unattended: Layer 1 + at most one locked kiosk. Attended: Layer 3.
6. **Is there step-free access?** → If not, put the accessibility sign + certificates + QR at the nearest step-free spot.
7. **Which way do people walk?** → Booths 1 → 4 in the walking direction, verdict + QR at the end.

---

## 5. PRINTING THE KIT

1. Open `print-kit.html` in Chrome or Firefox.
2. Paste the website address into the box at the top. The QR codes fill in automatically (this needs internet while printing).
3. Print on **A4**, margins **none/minimum**, **background graphics ON**.
4. Laminate the signs if you can (or use sheet protectors). Paper doesn't last four days in a Congress hallway.
5. Cut the checklist strips along the dashed lines.
