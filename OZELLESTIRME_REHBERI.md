# 🎨 Proje Özelleştirme Rehberi

Bu rehber, 3D portfolyo projenizi kendinize göre özelleştirmeniz için adım adım talimatlar içerir.

## 📋 İçindekiler

1. [Temel Bilgiler](#temel-bilgiler)
2. [HTML Meta Bilgileri](#html-meta-bilgileri)
3. [CSS Stilleri](#css-stilleri)
4. [Logo ve Branding](#logo-ve-branding)
5. [3D Modeller](#3d-modeller)
6. [Videolar](#videolar)
7. [Renkler ve Işıklandırma](#renkler-ve-işıklandırma)
8. [Credits ve Footer](#credits-ve-footer)
9. [Tıklanabilir Alanlar](#tıklanabilir-alanlar)

---

## 🎯 Temel Bilgiler

### Proje Yapısı
```
src/
├── index.html          # Ana HTML dosyası
├── style.css           # CSS stilleri
├── script.js           # Giriş noktası
└── Experience/
    ├── Experience.js   # Ana deneyim sınıfı
    ├── World.js        # 3D dünya ve objeler
    ├── assets.js       # Asset yolları (modeller, texture'lar)
    ├── BouncingLogo.js # Logo animasyonu
    ├── Baked.js        # Oda ışıklandırması ve renkler
    ├── Screen.js       # Ekran videoları
    └── ...
```

---

## 📝 HTML Meta Bilgileri

**Dosya:** `src/index.html`

### Başlık ve Açıklama
```html
<title>My Room in 3D</title>
<meta itemprop="name" content="My Room in 3D — Experiment">
<meta itemprop="description" content="Creative WebGL experiment with Three.js">
```

**Özelleştirme:**
- `<title>` etiketini kendi adınızla değiştirin
- Meta description'ı kendi projenizin açıklamasıyla güncelleyin
- Sosyal medya paylaşım görselini (`share-1200x630.png`) kendi görselinizle değiştirin

### Örnek:
```html
<title>Ahmet'in Portfolyosu</title>
<meta itemprop="name" content="Ahmet'in 3D Portfolyosu">
<meta itemprop="description" content="Web geliştirici ve 3D sanatçısı Ahmet'in interaktif portfolyosu">
```

---

## 🎨 CSS Stilleri

**Dosya:** `src/style.css`

### Font Değiştirme
```css
font-family: 'Roboto', sans-serif;
```

**Özelleştirme:**
1. Google Fonts'tan istediğiniz fontu seçin
2. `index.html`'de font linkini güncelleyin:
```html
<link href="https://fonts.googleapis.com/css2?family=YOUR_FONT:wght@300&display=swap" rel="stylesheet">
```
3. `style.css`'de font-family'yi değiştirin

### Renkler
```css
.credits {
    color: #ffffff; /* Beyaz */
}
```

**Özelleştirme:**
- Credits rengini değiştirebilirsiniz
- Arka plan rengi için `body` veya `.experience` stillerini ekleyebilirsiniz

---

## 🏷️ Logo ve Branding

**Dosya:** `src/Experience/BouncingLogo.js`

### Logo Texture Değiştirme

1. **Yeni logo dosyası ekleyin:**
   - Logo dosyanızı `static/assets/` klasörüne ekleyin (PNG formatı önerilir, şeffaf arka planlı)

2. **assets.js'i güncelleyin:**
   ```javascript
   { name: 'myLogoTexture', source: '/assets/myLogo.png', type: 'texture' }
   ```

3. **BouncingLogo.js'i güncelleyin:**
   ```javascript
   this.model.texture = this.resources.items.myLogoTexture
   ```

### Logo Pozisyonu ve Boyutu

**BouncingLogo.js** dosyasında:
- `position.x`, `position.y`, `position.z`: Logo konumu
- `scale.y`, `scale.z`: Logo boyutu
- Debug modunda (büyük ekranlarda) Tweakpane ile canlı olarak ayarlayabilirsiniz

---

## 🎬 Videolar

**Dosya:** `src/Experience/World.js` ve `src/Experience/Screen.js`

### Video Değiştirme

1. **Yeni video dosyası ekleyin:**
   - Video dosyanızı `static/assets/` klasörüne ekleyin (MP4 formatı önerilir)

2. **World.js'i güncelleyin:**
   ```javascript
   this.pcScreen = new Screen(
       this.resources.items.pcScreenModel.scene.children[0],
       '/assets/myPortfolioVideo.mp4'  // Yeni video yolu
   )
   this.macScreen = new Screen(
       this.resources.items.macScreenModel.scene.children[0],
       '/assets/myStreamVideo.mp4'  // Yeni video yolu
   )
   ```

### Video Ayarları

**Screen.js** dosyasında:
- `muted`: Sessiz başlatma (true/false)
- `loop`: Döngü (true/false)
- `autoplay`: Otomatik oynatma (true/false)
- `controls`: Kontrolleri göster (true/false)

---

## 🌈 Renkler ve Işıklandırma

**Dosya:** `src/Experience/Baked.js`

### Işık Renkleri

```javascript
this.colors.tv = '#ff115e'      // TV ışığı (Pembe)
this.colors.desk = '#ff6700'    // Masa ışığı (Turuncu)
this.colors.pc = '#0082ff'      // PC ışığı (Mavi)
```

**Özelleştirme:**
- Renk kodlarını kendi tercihlerinize göre değiştirin
- Debug modunda Tweakpane ile canlı olarak test edebilirsiniz

### Işık Şiddeti

```javascript
uLightTvStrength: { value: 1.47 }
uLightDeskStrength: { value: 1.9 }
uLightPcStrength: { value: 1.4 }
```

**Özelleştirme:**
- Değerleri artırarak daha parlak, azaltarak daha koyu yapabilirsiniz

### Gün/Zaman Karışımı

```javascript
uNightMix: { value: 1 }      // Gece modu (0-1 arası)
uNeutralMix: { value: 0 }    // Nötr mod (0-1 arası)
```

**Özelleştirme:**
- `uNightMix: 0` → Gündüz modu
- `uNightMix: 1` → Gece modu
- `uNeutralMix` ile ara tonlar oluşturabilirsiniz

---

## 🎭 3D Modeller

**Dosya:** `src/Experience/assets.js` ve `src/Experience/World.js`

### Yeni Model Ekleme

1. **Model dosyasını ekleyin:**
   - GLB formatında modelinizi `static/assets/` klasörüne ekleyin

2. **assets.js'e ekleyin:**
   ```javascript
   { name: 'myModel', source: '/assets/myModel.glb', type: 'model' }
   ```

3. **World.js'de kullanın:**
   ```javascript
   setMyModel() {
       const model = this.resources.items.myModel.scene
       // Model pozisyonu, rotasyonu, ölçeği ayarlayın
       this.scene.add(model)
   }
   ```

### Mevcut Modelleri Kaldırma

**World.js** dosyasında ilgili `set...()` metodlarını ve çağrılarını kaldırın:
- `setGoogleLeds()` → Google Home LED'leri
- `setLoupedeckButtons()` → Loupedeck butonları
- `setCoffeeSteam()` → Kahve buharı
- `setTopChair()` → Üst sandalye
- `setElgatoLight()` → Elgato ışığı
- `setBouncingLogo()` → Logo
- `setScreens()` → Ekranlar

---

## 📄 Credits ve Footer

**Dosya:** `src/index.html`

### Credits Metni

```html
<div class="credits">
    My Room in 3D by <a href="https://bruno-simon.com" target="_blank">Bruno Simon</a>
</div>
```

**Özelleştirme:**
```html
<div class="credits">
    <a href="https://yourwebsite.com" target="_blank">Ahmet</a> tarafından yapıldı
    | <a href="https://github.com/yourusername" target="_blank">GitHub</a>
</div>
```

---

## 🔧 Debug Modu

Debug modu, büyük ekranlarda (420px'den büyük) otomatik olarak açılır ve Tweakpane ile:
- Logo pozisyonu ve boyutu
- Işık renkleri ve şiddeti
- Gün/gece karışımı
- Ve daha fazlasını canlı olarak ayarlayabilirsiniz

Manuel olarak açmak için `Experience.js` dosyasında:
```javascript
this.config.debug = true  // Her zaman açık
```

---

## 📦 Asset Dosyaları

Tüm asset dosyaları `static/assets/` klasöründe bulunur:

- **Modeller:** `.glb` formatında 3D modeller
- **Texture'lar:** `.jpg`, `.png` formatında görseller
- **Videolar:** `.mp4` formatında videolar

### Önerilen Formatlar:
- **3D Modeller:** GLB (glTF Binary)
- **Texture'lar:** JPG (küçük dosya), PNG (şeffaflık için)
- **Videolar:** MP4 (H.264 codec)

---

## 🖱️ Tıklanabilir Alanlar

Projede 3D sahnede tıklanabilir alanlar eklenmiştir. Bu özellik sayesinde kullanıcılar 3D objelere tıklayarak etkileşimde bulunabilir.

### Mevcut Tıklanabilir Alanlar

1. **PC Ekranı** - GitHub profilini açar
2. **Mac Ekranı** - Kişisel web sitesini açar
3. **Logo** - Sosyal medya panelini açar

### Tıklanabilirlik Sistemi

**Dosya:** `src/Experience/Interactivity.js`

Bu dosya, Three.js Raycaster kullanarak 3D sahnede tıklama algılama yapar.

### Yeni Tıklanabilir Alan Ekleme

#### 1. Screen.js ile Ekran Tıklanabilirliği

```javascript
// World.js içinde
this.pcScreen = new Screen(
    this.resources.items.pcScreenModel.scene.children[0],
    '/assets/videoPortfolio.mp4',
    {
        clickAction: () =>
        {
            // Tıklanınca ne olacak?
            window.open('https://your-link.com', '_blank')
        }
    }
)
```

#### 2. Herhangi Bir 3D Objeye Tıklanabilirlik Ekleme

```javascript
// Herhangi bir sınıf içinde
this.interactivity = this.experience.interactivity

this.interactivity.registerClickable(
    this.model.mesh, // Tıklanabilir mesh
    {
        onClick: () =>
        {
            // Tıklama aksiyonu
            console.log('Clicked!')
        },
        onHover: () =>
        {
            // Hover efekti (opsiyonel)
            this.model.material.opacity = 0.8
        },
        onHoverOut: () =>
        {
            // Hover çıkış efekti (opsiyonel)
            this.model.material.opacity = 1
        }
    }
)
```

### Sosyal Medya Paneli

**Dosya:** `src/index.html` ve `src/style.css`

Sosyal medya paneli, logo'ya tıklandığında açılır ve tüm sosyal medya linklerinizi gösterir.

#### Panel'i Özelleştirme

1. **Link Ekleme/Çıkarma:**
   ```html
   <!-- index.html içinde -->
   <a href="https://your-link.com" target="_blank" class="social-link">
       <span>Link Adı</span>
   </a>
   ```

2. **Panel Stilini Değiştirme:**
   ```css
   /* style.css içinde */
   .social-panel {
       background: rgba(20, 20, 20, 0.95); /* Arka plan rengi */
       border-radius: 16px; /* Köşe yuvarlaklığı */
   }
   ```

### Tıklama ve Sürükleme Çakışması

Sistem, kullanıcı sürükleme yapıyorsa tıklama olayını tetiklemez. Bu sayede kamera kontrolü ile tıklama birbirine karışmaz.

**Özelleştirme:**
- `Interactivity.js` dosyasında `dragDistance > 5` değerini değiştirerek hassasiyeti ayarlayabilirsiniz.

### Tooltip (Bilgi Balonu)

Sayfa yüklendiğinde 5 saniye boyunca kullanıcıya tıklanabilir alanlar hakkında bilgi verir.

**Özelleştirme:**
```javascript
// script.js içinde
setTimeout(() =>
{
    infoTooltip.classList.add('show')
    setTimeout(() =>
    {
        infoTooltip.classList.remove('show')
    }, 5000) // Gösterim süresi (milisaniye)
}, 2000) // Başlangıç gecikmesi
```

### Klavye Kısayolları

- **ESC:** Sosyal medya panelini kapatır

---

## 🚀 Hızlı Başlangıç Checklist

- [ ] HTML başlık ve meta bilgilerini güncelle
- [ ] Credits metnini değiştir
- [ ] Logo texture'ını değiştir
- [ ] Video dosyalarını değiştir
- [ ] Işık renklerini özelleştir
- [ ] CSS font ve renkleri güncelle
- [ ] Gerekirse modelleri ekle/çıkar
- [ ] Sosyal medya paylaşım görselini değiştir
- [ ] Tıklanabilir alanları özelleştir (ekranlar, logo)
- [ ] Sosyal medya linklerini güncelle

---

## 💡 İpuçları

1. **Performans:** Büyük dosyalar yüklemeyi yavaşlatır. Videoları ve texture'ları optimize edin
2. **Debug:** Debug modunu kullanarak değerleri canlı olarak test edin
3. **Responsive:** Mobil cihazlarda debug modu kapalıdır
4. **Browser Console:** Hataları görmek için tarayıcı konsolunu açık tutun

---

## 📚 Ek Kaynaklar

- [Three.js Dokümantasyonu](https://threejs.org/docs/)
- [GLB Model Formatı](https://www.khronos.org/gltf/)
- [Tweakpane Dokümantasyonu](https://tweakpane.github.io/docs/)

---

**Sorularınız için:** GitHub Issues veya proje sahibine ulaşabilirsiniz.

