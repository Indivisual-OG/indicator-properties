# THE ASSESSMENT CENTER @ 40C3 (MAYBE!) -- CONCEPT ONLY
### Setup plan: 40th Chaos Communication Congress, Hamburg Messe, 27–30 December 2026

---

## 0. WHERE THINGS STAND (read this first)

- **The Call for Art has closed.** Its deadline was 10 October 2026. The Art team said they would decide by early November which submissions can be realized.
- **The talk CfP has closed too.** It closed on 9 October 2026.
- **The best remaining route is an *Assembly*.** Assemblies are self-organized spaces registered through the Congress **Hub**, and they are where most installations at Congress actually live. Self-organized sessions (workshops, small talks) are also booked through the Hub.
- **It's still worth emailing the Art team.** Late, small, self-sufficient pieces sometimes find a corner if they are easy to say yes to.

**This year's motto, "Model Citizens," fits the piece unusually well.** The Ethics track call even notes that *"Are you human?"* has become an actual question. A booth that certifies visitors as "provisionally a person" belongs here.

---

## 1. ADAPTING THE PIECE FOR CONGRESS

Congress visitors are hackers, privacy activists and tinkerers. They will try to break the piece, read the source and question every sensor. Design for that.

| Original concept | Congress version | Why |
|---|---|---|
| Mirror test with face tracking | **Physical mirror with a removable red sticker dot**, or the on-screen mirror in the web version. **No cameras anywhere.** | A camera at a CCC booth would undercut the piece and annoy people for good reason |
| Libet booth with hand tracking | Web version (the cursor approaching the button triggers it), or a **capacitive proximity pad** under the button (ESP32 + copper tape) | Same trick, no camera |
| Split-brain card swap (magician's drawer) | Web version (digital swap), plus one **staffed analog table** with a real card swap during busy hours | The live version makes the biggest impression; staff it when you can |
| Sealed, mysterious tech | **Open source, said out loud.** A sign: *"Source code: [repo QR]. No cameras. No logs of your answers. The machine forgets you. Ironic, we know."* | Transparency earns trust here |
| Rooms II & III physically | **QR code on the wall** to the full web version (Quiet Ward + Workspace) | Lets people take the weight home and add to the shared sky |

**Optional for Congress: a "Model Citizen" stamp.** A rubber stamp for the Certificate that reads *"MODEL CITIZEN: PROVISIONALLY"*. Congress people collect stickers and stamps, so this spreads the piece by itself.

---

## 2. STEP-BY-STEP

### Phase A: Get a place at Congress

1. **Email the 40C3 Art team.** Explain that you missed the deadline and offer a **small, self-sufficient installation** (one table, 2–4 screens, one power socket, no network needed). Attach the artist statement, a link to the live website and 2–3 photos or mockups of the booth. Contact details are on the Call for Art page (cfp.cccv.de/40c3-art) and the Congress info pages.
2. **At the same time, plan an Assembly.**
   - Watch the 40C3 info pages and the event blog for the announcement that **Hub / Assembly registration** is open.
   - Register the Assembly with a clear description, the space you need (≈ 4–6 m², or 2 tables), power needs and the number of people.
   - Or **join an existing Assembly**: hackerspace clusters, AI-ethics, digital-rights or art-collective assemblies often welcome a guest installation. Ask on their wikis or Matrix channels.
3. **Register self-organized sessions** in the Hub once it opens. For example:
   - *"Certify Yourself: a consciousness exam for humans"*, run as a group session at the booth.
   - *"Indicator Properties: what neuroscience can and can't tell us about machine minds"*, a short talk plus discussion.
4. **Tickets.** Congress tickets run through a voucher and presale system, and demand is high. Make sure every crew member has a ticket or a voucher; ask your Assembly or local hackerspace about vouchers.

### Phase B: Build the booth

**Recommended setup: "one desk, three booths, one printer"**

| Item | Qty | Notes |
|---|---|---|
| Laptops or tablets running the kiosk page | 3 | Old laptops are fine; touchscreens are nicer |
| Mini PC / Raspberry Pi 4 or 5 running `server.js` | 1 | Optional; only needed for a shared tally on site |
| 80 mm thermal receipt printer (USB, ESC/POS) | 1 | For the certificates; bring a backup roll or two |
| Thermal paper rolls | plenty | Many thousands of people attend; certificates go fast |
| Small mirror (≈ 30×40 cm) + red sticker dots | 1 + a pack | Analog mirror test |
| Card deck + card-swap sleeve | 1 | For the staffed analog split-brain table |
| Arcade button + ESP32 + copper tape | optional | Physical Libet booth |
| Take-a-number dispenser + numbered tickets | 1 | Essential for the joke |
| Laminated "CONSCIOUSNESS CERTIFICATION" sign | 1 large | Bureaucratic beige |
| Beige tablecloths / desk dividers | as needed | **Flame-retardant certified (DIN 4102 B1 or EN 13501-1)**; venues check this |
| Rubber stamp "MODEL CITIZEN: PROVISIONALLY" + ink pad | 1–2 | |
| Multi-plug power strip (CE, no daisy-chaining) | 1–2 | |
| Gaffer tape, cable ties, cable covers | | Tape down every cable crossing a walkway |
| Small Bluetooth/USB speaker | 1 | For the slowed "Daisy Bell" muzak, at low volume. Check the music rights, or use your own recording of the 1892 song, which is public domain |
| QR code poster to the website | 2+ | One at the booth, one by the exit |
| Printed artist statement + ethics note | 1 | |

**Software setup on each kiosk laptop:**
1. Install Chrome or Chromium.
2. Use the deployed website, or for full reliability **run everything offline**: copy the folder to the laptop and run `node server.js` locally.
3. Start Chrome in kiosk mode with silent printing:
   ```
   chromium --kiosk --kiosk-printing "http://localhost:8080/?kiosk=1&print=1"
   ```
   - `?kiosk=1` runs only the Assessment Center and resets for the next visitor after the certificate, or after 2 minutes idle.
   - `&print=1` prints the certificate automatically to the default printer (set the thermal printer as default, with 80 mm paper).
   - Drop `&print=1` on any kiosk without a printer.
4. Turn off sleep, screen savers, notifications and automatic OS updates.
5. Turn on voices (the 🔈 button) on at most one kiosk. Three PHI-LLIPs talking over each other in a loud hall is chaos, though possibly the good kind.

**Network: plan to need none.**
- The Congress network is fast but adversarial. Don't expose an admin page, and don't count on Wi-Fi.
- For the shared tally on site, connect the kiosks to the Pi/mini PC over a **small private wired switch or an offline travel router**, and never connect that to the Congress network.
- Visitors reach Rooms II & III through the **public website** on their phones via QR code. Make sure the online version runs with `MODERATION=queue`. The Congress crowd *will* test your filters.

### Phase C: Rehearse

1. Do a **full test run** with friends who haven't seen it. Time one applicant from start to certificate and note where people get stuck.
2. **Stress test like a hacker would:** paste huge text, emoji or HTML into the red-color box, mash the Libet button, unplug the printer mid-print. Fix what breaks.
3. Do a **print test** at the real paper width and check that the certificate fits and reads well.
4. **Do a dry run of packing.** Everything goes into labeled crates with a checklist.
5. **Write a crew brief** (one page):
   - the one-sentence pitch
   - the answer to "is the AI conscious?" (*"Nobody knows. That's the point. Here's what it means to treat that uncertainty seriously."*)
   - how to restart a frozen kiosk
   - how to refill the printer
   - the Congress Code of Conduct and the awareness team contacts

### Phase D: At Congress

1. **Build-up day(s).** Arrive during the official build-up window (check the info pages for times and access rules for Assemblies).
   - Find your spot, then set up power, tables, kiosks, printer, signage and the mirror.
   - Tape down every cable.
   - Run one complete test applicant on every kiosk.
2. **During Congress (27–30 Dec):**
   - Keep at least **one person at the booth during busy hours** to run the analog card swap, hand out stamps and talk with visitors. The conversations after the certificate are half the piece.
   - Run the self-organized sessions as scheduled.
   - Restock paper; wipe touchscreens.
   - Check the online moderation queue (`/admin?key=…`) a few times a day, from a trusted device.
   - Document with photos of **the setup and certificates only**. Congress has a strong no-photos-of-people-without-consent norm. Ask before photographing anyone.
3. **Teardown.** Pack by the checklist and leave the spot clean. Thank your Assembly hosts.

### Phase E: After Congress

1. Export the tally (today/total) and the approved Workspace fragments for documentation.
2. Write a short project post and link it in the Congress wiki or Hub.
3. Collect feedback and decide what moves into the full three-room installation.

---

## 3. BUDGET CHECKLIST (fill in your own prices)

| Category | Items | Cost |
|---|---|---|
| Hardware | laptops (borrow?), printer, Pi, button/ESP32 | |
| Consumables | thermal rolls, stickers, tickets, ink | |
| Print | signs, posters, statements | |
| Booth | flame-retardant cloth, dividers, stamp | |
| Travel & stay | crew to Hamburg, accommodation (book early; prices rise around Congress) | |
| Tickets | crew tickets / vouchers | |
| Hosting | Render (paid tier for the shared sky to persist) | |

---

## 4. RISKS & FALLBACKS

| Risk | Fallback |
|---|---|
| No Assembly or Art spot | Join a friendly existing Assembly with just one kiosk + printer; or run it entirely as a QR poster + website + self-organized session |
| Printer fails | Pre-printed certificates (on cream paper, like the original concept) + rubber stamp |
| Laptop dies | Kiosk mode runs on any phone or tablet browser; bring a spare |
| Network down | Everything runs offline locally; only the shared sky needs internet, and that's on visitors' phones |
| Trolls on the Workspace | `MODERATION=queue` means nothing public appears unreviewed |
| "Is this AI hype?" pushback | Point to Bed 2 (the Overclaimer) and the ethics note. The piece satirizes hype as much as dismissal |

---

## 5. STAIRWELL VERSION: "THE ASCENT"

### The concept
A staircase is already a series of levels you have to pass to get somewhere, which is exactly what a certification is. Each **landing** becomes a booth, and climbing becomes applying for personhood. People reach the top "certified," then look down at everyone still being tested below them. Going down the stairs, they pass the same tests again from the other side.

| Level | Booth | What's there |
|---|---|---|
| Bottom | **Take a number** | Ticket dispenser, the bureaucratic sign, quiet slowed "Daisy Bell" |
| Landing 1 | **The Report Test** | Wall text: *"Describe the color red. Silently. We'll assume you did it statistically."* |
| Landing 2 | **The Mirror** | Wall-mounted mirror with red sticker dots, plus PHI-LLIP's caption about the cleaner wrasse |
| Landing 3 | **The Interpreter** | Kiosk with the digital card swap (if power is available) |
| Landing 4 | **The Readiness Potential** | Button with a capacitive pad that "detects your decision" before you press |
| Top | **The Verdict** | Kiosk + printer, Certificate of Indeterminacy, stamp, QR code to the Quiet Ward and the Workspace |
| Along the stair risers | **The Checklist** | One indicator property per step riser, each with its footnote. You read it as you climb: *"Recurrent processing\* / \*no consensus on how much is enough"*. Vinyl lettering or paper, with venue approval |

A smaller variant if you only get one landing: run the full kiosk there, put the checklist on the risers and the QR code at the top.

### The hard rules: stairwells are escape routes
In a German venue, a stairwell is usually a **Fluchtweg** (escape route). Treat these as non-negotiable and **confirm every item with the Art team / venue before building anything**:

- **Nothing may narrow the stairs or landings** below the required escape width. Kiosks go flush against walls, ideally wall-mounted or on narrow shelves. No tables in the walking path, and no queues that block the stairs.
- **No cables crossing steps.** Run power along walls with cable ducts, or use **battery-powered devices** (laptops/tablets with a full charge plus power banks swapped each shift). Battery power may be the only option in a stairwell anyway.
- **Flame-retardant materials only** (B1 / EN 13501-1 certificates on hand for fabric, vinyl and paper signage over a certain size).
- **Don't cover or obscure** exit signs, emergency lighting, fire extinguishers, handrails or door closers. Fire doors must stay closed and must not be propped open.
- **Riser text must be non-slip and flat**, with nothing on the tread (the surface you step on). Lettering on vertical risers only.
- **Lighting:** don't darken the stairwell. Mood comes from the content, not from lowering safety lighting.
- **No loose objects on steps** (no ticket dispenser at the bottom step, no stools).
- **Sound:** low volume only. Stairwells echo, and announcements must remain audible.

### Practical adjustments
- **Interaction becomes walk-by.** People pass through quickly, so the analog layer (risers, mirror, wall texts) has to work in seconds without stopping. The full experience lives at the top kiosk and on visitors' phones via QR code.
- **Put the printer at the top landing only.** It's the reward for climbing.
- **Accessibility:** a stairwell excludes wheelchair users. Place a duplicate QR code and a printed certificate stack (with the stamp) **at the elevator or the ground floor**, and say so on a sign: *"Certification is available at ground level too. Personhood should not require stairs."* That line fits the piece, too.
- **Security:** anything on a landing is unattended much of the time. Lock laptops to wall brackets with Kensington locks, keep kiosk mode locked down, and take the expensive hardware home at night if the venue doesn't secure the area.
- **Ask the venue what you can attach and with what** (gaffer tape vs. removable mounting strips vs. nothing at all). Damage to walls costs money.

### Questions to answer once you see the stairwell
- How many landings are there, and how wide are they?
- Are there power sockets? On which landings?
- Is it a main route or a side stair (crowd density)?
- Can things be attached to walls and risers, and how?
- Is there an elevator nearby for the accessible duplicate?

Take photos and measurements during a site visit or build-up, and the layout can be finalized from those.

---

## 6. OPEN QUESTIONS FOR YOU

- How many people are in the crew? (Plan for at least 3 for comfortable shifts.)
- Do you already know someone with an Assembly or a hackerspace going to 40C3?
- Is the online version deployed on a paid tier (so the sky persists), or should we move it to a free database first?
