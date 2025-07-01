# Block The Unwanted - Extension Website

Bu, Block The Unwanted Chrome Extension'ının resmi web sitesidir.

## 🚀 Kurulum

### 1. Dosyaları İndirin
```bash
git clone <repository-url>
cd extension-website
```

### 2. EmailJS Yapılandırması

Bug report formu çalışması için EmailJS yapılandırması gereklidir:

1. [EmailJS Dashboard](https://dashboard.emailjs.com/)'a gidin
2. Hesap oluşturun veya giriş yapın
3. Yeni bir servis oluşturun (Gmail, Outlook, vb.)
4. Yeni bir template oluşturun
5. `config.example.js` dosyasını `config.js` olarak kopyalayın
6. `config.js` dosyasındaki değerleri kendi EmailJS bilgilerinizle değiştirin

```javascript
const EMAIL_CONFIG = {
    serviceId: 'your_service_id',
    templateId: 'your_template_id', 
    publicKey: 'your_public_key',
    recipientEmail: 'your-email@example.com'
};
```

### 3. EmailJS Template Değişkenleri

EmailJS template'inizde şu değişkenleri kullanabilirsiniz:

- `{{to_name}}` - Alıcı adı
- `{{from_name}}` - Gönderen e-postası  
- `{{reply_to}}` - Yanıtlama e-postası
- `{{type}}` - Rapor türü (bug/feature/support)
- `{{email}}` - Kullanıcı e-postası
- `{{subject}}` - Rapor konusu
- `{{description}}` - Detaylı açıklama
- `{{browser}}` - Tarayıcı bilgisi
- `{{priority}}` - Öncelik seviyesi
- `{{timestamp}}` - Gönderim zamanı
- `{{language}}` - Arayüz dili
- `{{url}}` - Website URL'i
- `{{user_agent}}` - User agent bilgisi
- `{{message}}` - Formatlanmış tam mesaj

### 4. Web Sunucusu

Basit bir web sunucusu çalıştırın:

```bash
# Python 3
python -m http.server 8000

# Node.js (npx ile)
npx http-server

# PHP
php -S localhost:8000
```

### 5. Tarayıcıda Açın

`http://localhost:8000` adresine gidin.

## 📁 Dosya Yapısı

```
extension-website/
├── index.html          # Ana sayfa
├── script.js           # JavaScript işlevselliği
├── styles.css          # CSS stilleri
├── logo.svg           # Logo dosyası
├── config.js          # EmailJS yapılandırması (GİT'E EKLENMEMELİ)
├── config.example.js  # Örnek yapılandırma dosyası
├── .gitignore         # Git ignore kuralları
└── README.md          # Bu dosya
```

## 🔒 Güvenlik

- `config.js` dosyası `.gitignore`'da yer alır ve Git'e commit edilmez
- EmailJS Public Key'i frontend'de görünür olacaktır (bu normal)
- Hassas bilgiler için environment variables kullanın
- Production'da HTTPS kullanın

## 🌐 Özellikler

- **Çok Dilli Destek**: Türkçe ve İngilizce
- **Tema Desteği**: Açık/Koyu tema
- **Bug Report Sistemi**: EmailJS ile e-posta gönderimi
- **Responsive Tasarım**: Mobil uyumlu
- **Modern UI**: Inter font ve modern tasarım

## 🛠️ Geliştirme

### Yeni Dil Ekleme

1. HTML'deki `data-en` ve `data-tr` attribute'larına yeni dil ekleyin
2. `script.js`'teki `applyTranslations` fonksiyonunu güncelleyin
3. Placeholder çevirileri için `data-{lang}-placeholder` attribute'ları ekleyin

### Yeni Özellik Ekleme

1. HTML'e yeni section ekleyin
2. CSS'e stil kuralları ekleyin  
3. JavaScript'e işlevsellik ekleyin
4. Çeviri attribute'larını ekleyin

## 📧 İletişim

Bug report veya özellik önerileri için website üzerindeki formu kullanın.

## 📄 Lisans

Bu proje Block The Unwanted Extension'ının bir parçasıdır. 