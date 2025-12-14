# Quiziz - Bilgi Yarışması
Bu proje, kullanıcıların genel kültürlerini test edebileceği, farklı kategorilerde ve zorluk seviyelerinde yarışabileceği interaktif bir web tabanlı bilgi yarışması uygulamasıdır. Dinamik yapısı sayesinde soruları JSON tabanlı bir veri havuzundan çeker ve kullanıcıya akıcı bir deneyim sunar.

## 🚀 Özellikler

- **İki Farklı Oyun Modu**: "Puanlı" (Rastgele) ve "Kategorili" (Kullanıcı seçimli) olmak üzere iki ana mod.
- **Kategori Seçimi**: Sanat, Tarih, Müzik, Bilim, Spor ve Sinema gibi çeşitli alanlarda yarışabilme.
- **Zorluk Seviyeleri**: Kolay, Orta ve Zor olmak üzere üç farklı zorluk derecesi.
- **Dinamik Soru Yönetimi**: Soruların harici bir `soru.json` dosyasından dinamik olarak çekilmesi.
- **Anlık Geri Bildirim**: Seçilen şıkkın doğruluğuna göre görsel geri bildirimler.
- **Sonuç Ekranı**: Yarışma sonunda detaylı sonuç analizi ve puanlama.
- **Modern Bildirimler**: SweetAlert2 kütüphanesi ile şık uyarı ve bilgilendirme pencereleri.

## 📂 Proje Yapısı

- `index.html`: Uygulamanın ana iskeleti; menüler, soru kartları ve sonuç ekranı yapıları.
- `app.js`: Tüm oyun mantığı, DOM manipülasyonları, olay dinleyicileri (event listeners) ve JSON veri çekme işlemleri.
- `style.css`: Uygulamanın görsel tasarımı, animasyonlar ve responsive düzenlemeler.
- `soru.json`: Yarışmada sorulan soruların, şıkların, doğru cevapların, kategori ve zorluk bilgilerinin tutulduğu veri dosyası.

## 💻 Kullanılan Teknolojiler ve Yazılım Dilleri
- HTML5
- CSS3
- JavaScript (Vanilla)
- JSON
- SweetAlert2 (CDN)

## 🛠 Kurulum ve Kullanım

Bu projeyi bilgisayarınıza klonlamak için şu adımları izleyin:

1. **Proje Klasörünü Kopyalayın**:
   - GitHub'dan projeyi klonlamak için terminal veya komut satırında şu komutu çalıştırın:
     ```bash
     git clone https://github.com/Furkannalbayrak/Games.git
     ```

2. **Proje Klasörüne Girin**:
   - Klonlanan projeye gitmek için şu komutu çalıştırın:
     ```bash
     cd Games/quiz-game
     ```

> **Not:** Klasör isimleri büyük/küçük harfe duyarlıdır. Linux ve macOS sistemlerinde klasör adı yazımına dikkat edin.

3. **Gerekli Dosyayı Açın**:
   - Projeyi çalıştırmak için `index.html` dosyasını bir tarayıcıda açabilirsiniz.

Projeyi yerel ortamda çalıştırdığınızda, JavaScript tarayıcıda doğru şekilde çalışacaktır.

### 🎮 Oyun Akışı
1. Başlangıç ekranında **Puanlı** veya **Kategorili** modlarından birini seçin.
2. Eğer **Kategorili** seçtiyseniz, yarışmak istediğiniz alanı ve zorluk derecesini belirleyin.
3. Eğer **Puanlı** modunu seçerseniz:
   - Karşınıza rastgele zorlukta **10 adet soru** gelir.
   - Her soru için **30 saniye** süreniz vardır.
   - Soruların zorluğuna göre puan kazanırsınız (Kolay: 2, Orta: 4, Zor: 7 puan).
4. Her iki mod içinde soruları cevaplayın ve test sonunda detaylı skorunuzu görün.

## 📜 License
Bu proje MIT lisansı altında sunulmaktadır. Daha fazla bilgi için LICENSE dosyasına göz atabilirsiniz.

