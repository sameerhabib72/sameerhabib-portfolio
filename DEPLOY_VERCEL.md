# 🚀 How to Deploy Sameer Habib's Portfolio to Vercel (100% Free & Secure)

Aapka portfolio Vercel par deploy hone ke liye **100% ready** hai. Humne `vercel.json` already configure kar diya hai jo SPA routing aur background API proxy handle karta hai.

---

## ⚡ Method 1: GitHub + Vercel (Recommended - 2 Minutes)

Yeh tareeqa sabse best hai kyunki har baar jab aap code update karenge, Vercel automatically naya version live kar dega.

### Step 1: Apne Computer par Git Repository initialize karein
Terminal me yeh commands run karein:
```bash
git init
git add .
git commit -m "feat: complete portfolio with Vercel deployment configuration"
```

### Step 2: GitHub par Repository banayein
1. [GitHub.com](https://github.com/new) par jayein.
2. Repo ka naam rakhein: `sameerhabib-portfolio`
3. Repository ko **Public** ya **Private** select karein aur **Create repository** click karein.
4. Terminal me yeh commands paste karein:
```bash
git branch -M main
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/sameerhabib-portfolio.git
git push -u origin main
```

### Step 3: Vercel par 1-Click Deploy karein
1. [Vercel.com](https://vercel.com) par jayein aur **Sign in with GitHub** karein.
2. Dashboard par **"Add New..."** -> **"Project"** par click karein.
3. Apni `sameerhabib-portfolio` repository select karein aur **"Import"** dabayein.
4. Framework Preset me **Vite** automatically detect ho jayega.
5. **"Deploy"** button par click karein!
6. **Congratulations!** 🎉 30 seconds ke andar aapka portfolio live ho jayega:
   - Example URL: `https://sameerhabib.vercel.app` (Free SSL & HTTPS 🔒 included)

---

## ⚡ Method 2: Vercel CLI (Direct Terminal Deploy)

Agar aap GitHub use nahi karna chahte aur direct terminal se live karna chahte hain:

1. Terminal me run karein:
```bash
npx vercel
```
2. Vercel aapse login karne ko kahega (Email ya GitHub se 1 click me login karein).
3. Terminal prompts ka answer dein:
   - Set up and deploy? `Y`
   - Which scope? (Select your name/team)
   - Link to existing project? `N`
   - Project name? `sameer-habib-portfolio`
   - In which directory? `./`
   - Want to modify settings? `N`
4. Production live URL pane ke liye run karein:
```bash
npx vercel --prod
```

---

## 🌐 Free Custom Domain Setup on Vercel
1. Vercel dashboard me apne project ke **Settings** -> **Domains** me jayein.
2. Apna custom domain (jaise `sameerhabib.com` ya `sameerhabib.dev`) add karein.
3. Vercel free automatic SSL certificate generate kar dega.
