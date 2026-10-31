# A Little World Made Just For Sowmiya ❤️
> **"Sowmiya, when you entered my life, you made it more colorful than ever."**

A luxury, cinematic, highly interactive birthday surprise website created exclusively for Sowmiya (Princess) to celebrate her birthday on **November 5**.

---

## ✨ Experience Journey

1. **The Magical Entrance**  
   A full-screen pearl-white and champagne-gold opening with floating golden stardust, delicate flower petals, butterflies, and a gleaming gold entrance button. Clicking triggers a radiant golden light burst and smoothly ushers her into the celebration.

2. **The Grand Birthday Celebration**  
   An animated three-tier luxury birthday cake with glowing, flickering candle flames, golden floating balloons, a countdown to November 5, and an interactive **"MAKE A WISH, PRINCESS ✨"** button that extinguishes the candles into a burst of golden confetti.

3. **A Message From My Heart**  
   A high-end editorial stationery card on warm ivory with subtle golden borders and an emotional message that feels deeply personal, crowned by a beating golden heart seal.

4. **Our Little World — Romantic Illustration Gallery**  
   Eight bespoke fine-art romantic illustrations in white and champagne gold (Golden Roses, Two Butterflies, Moon & Golden Stars, Heart of Blossoms, Starry Night Together, Hands Held Gently, Sunset Horizon, and Radiant Heart). Every card features smooth hover zoom, soft glowing shadows, captions, and an interactive full-screen Lightbox.

5. **10 Reasons Why You Are My Princess**  
   Ten interactive 3D flip cards with gold hearts and numbers. Clicking any card flips it in 3D space to reveal a romantic message.

6. **Open My Love Letter**  
   A realistic ivory envelope sealed with a champagne-gold wax seal stamped with an **"S"**. Clicking breaks the seal, tilts the envelope flap in 3D, and smoothly slides out the personalized love letter. Includes a **"READ IT AGAIN ❤️"** button to fold and reopen at will.

7. **The Final Mystery Gift**  
   A 3D-styled luxury gift box wrapped with gold ribbon and bow. Clicking **"OPEN YOUR GIFT 🎁"** lifts the lid, unleashes golden fireworks and heart confetti, illuminates the box with an inner aura, and reveals the romantic quote.

8. **The Grand Romantic Finale & Virtual Hug**  
   A glowing animated heart centerpiece with orbiting butterflies, the master romantic quote, and an interactive **"ONE MORE HUG? 🤗"** button that triggers a sweet virtual hug modal with charming chibi artwork and showers of floating hearts.

---

## 🎨 Design System & Palette

- **Pearl White**: `#FFFDF8`
- **Ivory**: `#F8F4EA`
- **Champagne Gold**: `#D4AF37`
- **Soft Gold**: `#E8D6A5`
- **Warm Beige**: `#EDE3D1`
- **Deep Brown**: `#5C4632`
- **Typography**:
  - *Playfair Display* (Editorial Headings)
  - *Cormorant Garamond* (Romantic Quotes & Letters)
  - *Poppins* (Modern Interface)
  - *Great Vibes* (Handwritten Signatures)

---

## 📁 Project Structure

```text
birthday/
├── index.html                # Semantic HTML5 website structure
├── style.css                 # Luxury styling, 3D transforms, & animations
├── script.js                 # Canvas engines, sound system, & interactions
├── assets/
│   ├── illustrations/        # Bespoke romantic white & gold illustrations
│   │   ├── golden-roses.jpg
│   │   ├── two-butterflies.jpg
│   │   ├── moon-and-stars.jpg
│   │   ├── heart-flower-wreath.jpg
│   │   ├── couple-stargazing.jpg
│   │   ├── hands-holding.jpg
│   │   ├── golden-sunset.jpg
│   │   ├── glowing-heart-flowers.jpg
│   │   └── romantic-heart-hug.jpg
│   ├── music/
│   │   └── romantic-melody.wav  # Custom synthesized music box/piano lullaby
│   └── fonts/
└── README.md                 # Documentation and hosting guide
```

---

## 🚀 How to Run Locally

### Option 1: VS Code Live Server (Recommended)
1. Open the project folder in VS Code.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click `index.html` and select **"Open with Live Server"**.
4. The website will launch automatically in your browser at `http://127.0.0.1:5500`.

### Option 2: Python HTTP Server
Open your terminal in the `birthday/` directory and run:
```bash
python3 -m http.server 8080
```
Then visit:
```
http://localhost:8080
```

### Option 3: Direct Browser Launch
You can also directly double-click `index.html` to open it in Chrome, Safari, Edge, or Firefox.

---

## 🌐 How to Publish Online for Free (To Share with Sowmiya)

To share this surprise as a live link on her phone:

### Method A: Vercel (Fastest & Simplest, < 1 minute)
1. Go to [vercel.com](https://vercel.com) and log in.
2. Drag and drop the `birthday` folder directly into Vercel's dashboard.
3. Your site will instantly go live with a custom HTTPS link like `https://for-sowmiya.vercel.app`!

### Method B: Netlify Drop (< 1 minute)
1. Visit [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop the `birthday` folder onto the page.
3. Netlify will generate a live public URL ready to share.

### Method C: GitHub Pages
1. Create a repository on GitHub (e.g. `sowmiya-birthday`).
2. Push this folder to GitHub:
   ```bash
   git init
   git add .
   git commit -m "A Little World Made Just For Sowmiya"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/sowmiya-birthday.git
   git push -u origin main
   ```
3. In GitHub repo settings, go to **Pages**, set source to `main` branch, and click **Save**.
4. Your website will be live at `https://YOUR_USERNAME.github.io/sowmiya-birthday/`.

---

## 🎵 Music Player Notes
- Audio **never autoplays** (following modern browser policies).
- It initiates gently when the user taps **"ENTER YOUR LITTLE WORLD ✨"** or clicks the floating **"Play Music ✨"** pill.
- Includes a lossless ambient music-box piano recording (`assets/music/romantic-melody.wav`) and an automatic **Web Audio API synthesizer fallback** so music plays anywhere without dependencies.
- You can replace `assets/music/romantic-melody.wav` with your own favorite romantic MP3/WAV song anytime!
