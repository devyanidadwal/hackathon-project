// ------------------------------
// Location search (dummy handler)
// ------------------------------
document.getElementById("locationInput")?.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    alert("Searching for location: " + this.value);
  }
});

// ------------------------------
// GPS tracking
// ------------------------------
document.getElementById("gpsBtn")?.addEventListener("click", function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (pos) {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        alert("Your current location:\nLatitude: " + lat + "\nLongitude: " + lon);
        document.getElementById("locationInput").value = lat + ", " + lon;
      },
      function (err) {
        alert("Error getting location: " + err.message);
      }
    );
  } else {
    alert("Geolocation not supported in this browser.");
  }
});

// ------------------------------
// Feature cards: toggle collapse/expand
// ------------------------------
document.querySelectorAll(".feature-card").forEach(card => {
  card.addEventListener("click", function (e) {
    if (e.target.tagName.toLowerCase() === "h3" || e.target.tagName.toLowerCase() === "p") {
      e.stopPropagation();
      this.classList.toggle("collapsed");
    }
  });
});

// ------------------------------
// Site wallpaper upload + persistence
// ------------------------------
const siteWallpaperInput = document.getElementById("siteWallpaperInput");
const siteOverlay = document.querySelector(".site-overlay");

function setSiteWallpaper(url) {
  document.body.style.backgroundImage = url ? `url('${url}')` : "";
  try {
    localStorage.setItem("siteWallpaper", url || "");
  } catch (e) {
    /* ignore storage errors */
  }
}

try {
  const saved = localStorage.getItem("siteWallpaper");
  if (saved) {
    setSiteWallpaper(saved);
  }
} catch (e) {
  /* ignore */
}

if (siteWallpaperInput) {
  siteWallpaperInput.addEventListener("change", e => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      alert("Please upload an image file for the wallpaper.");
      return;
    }
    const url = URL.createObjectURL(f);
    setSiteWallpaper(url);
  });
}

window.toggleSiteOverlayDark = function (toggle) {
  if (!siteOverlay) return;
  if (toggle === undefined) siteOverlay.classList.toggle("dark");
  else if (toggle) siteOverlay.classList.add("dark");
  else siteOverlay.classList.remove("dark");
};

// ------------------------------
// Extra wallpaper preview in features hero
// ------------------------------
document.addEventListener("DOMContentLoaded", function () {
  const wallpaperInput = document.getElementById("wallpaperInput");
  if (wallpaperInput) {
    wallpaperInput.addEventListener("change", function (e) {
      const file = e.target.files[0];
      if (file) {
        const url = URL.createObjectURL(file);
        document.querySelector(".features-hero").style.backgroundImage = `url('${url}')`;
      }
    });
  }
});

// ------------------------------
// 🌐 Translations dictionary + logic
// ------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const translations = {
    en: {
      logoText: "BOOND",
      tagline: "every drop counts",
      navHome: "Home",
      navContact: "Contact",
      username: "Guest",
      useGPS: "📍 Use GPS",
      featuresHeading: "EXPLORE POWERFUL FEATURES",
      feature1Title: "Harvesting Feasibility 🏠💧",
      feature1Desc: "Check if your rooftop is ready for rainwater harvesting — get a clear YES/NO with tips to improve your setup.",
      feature2Title: "Money Matters 💸",
      feature2Desc: "Understand costs, savings, and funding options for water projects.",
      feature3Title: "Groundwater Depth 📏",
      feature3Desc: "Check the groundwater levels in your area with updated data.",
      feature4Title: "Rain Check ☔",
      feature4Desc: "Provides local rainfall data and trends.",
      feature5Title: "Runoff Meter ⚡",
      feature5Desc: "Measure and predict water runoff during rains for better planning.",
      feature6Title: "Red Alert Meter ⚠️",
      feature6Desc: "Real-time Red Alert system notifies users of rising water-borne disease risks in their area.",
      feature7Title: "👷📞 Contact a Contractor",
      feature7Desc: "Need professional help? Instantly connect with verified local contractors to install or maintain your harvesting system.",
      plansHeading: "Subscription Plans",
      sp1: "BOOND — Free (7 day pro trial included)",
      sp2: "BOOND Pro — 99 INR/month | BOOND Premium — 200 INR/month",
      contactHeading: "Contact",
      address: "Address",
      addressText: "Akhilesh Das Gupta Institute Of Professional Studies , New Delhi, 1100XX",
      contact: "Contact",
      phone: "+91 7217XXXXXX",
      email:"Email",
      emailtext: "info@boond.com",
      followers: "Followers",
      socialMedia: "Instagram • Facebook • Twitter"
    },
    hi: {
      logoText: "बूंद",
      tagline: "हर बूंद मायने रखती है",
      navHome: "होम",
      navContact: "संपर्क",
      username: "अतिथि",
      useGPS: "📍 जीपीएस का उपयोग करें",
      featuresHeading: "शक्तिशाली विशेषताएँ देखें",
      feature1Title: "वर्षा जल संचयन योग्यता 🏠💧",
      feature1Desc: "जांचें कि क्या आपकी छत वर्षा जल संचयन के लिए तैयार है — सुधार के सुझावों के साथ स्पष्ट हाँ/नहीं प्राप्त करें।",
      feature2Title: "पैसों का महत्व 💸",
      feature2Desc: "जल परियोजनाओं की लागत, बचत और फंडिंग विकल्प समझें।",
      feature3Title: "भूजल गहराई 📏",
      feature3Desc: "अपने क्षेत्र में भूजल स्तर की अद्यतन जानकारी देखें।",
      feature4Title: "वर्षा जांच ☔",
      feature4Desc: "स्थानीय वर्षा डेटा और रुझान प्रदान करता है।",
      feature5Title: "रनऑफ़ मीटर ⚡",
      feature5Desc: "बेहतर योजना के लिए वर्षा के दौरान पानी के बहाव को मापें और अनुमान लगाएँ।",
      feature6Title: "रेड अलर्ट मीटर ⚠️",
      feature6Desc: "वास्तविक समय रेड अलर्ट सिस्टम आपके क्षेत्र में बढ़ते जलजनित रोग जोखिम की सूचना देता है।",
      feature7Title: "👷📞 ठेकेदार से संपर्क करें",
      feature7Desc: "पेशेवर सहायता की ज़रूरत है? अपने संचयन सिस्टम को स्थापित या बनाए रखने के लिए तुरंत स्थानीय ठेकेदारों से जुड़ें।",
      plansHeading: "सदस्यता योजनाएँ",
      sp1: "बूंद — मुफ्त (7 दिन प्रो ट्रायल शामिल)",
      sp2: "बूंद प्रो — 99 रुपये/माह | बूंद प्रीमियम — 200 रुपये/माह",
      contactHeading: "संपर्क",
      address: "पता",
      addressText: " : अखिलेश दास गुप्ता प्रोफेशनल स्टडीज़ संस्थान, नई दिल्ली, 1100XX",
      contact: "संपर्क",
      phone: "+91 7217XXXXXX",
      email: "ईमेल",
      emailtext: "info@boond.com",
      followers: "अनुयायियों",
      followerstext: "(जैसा है रखा गया है)",
      socialMedia: "इंस्टाग्राम • फेसबुक • ट्विटर"
    }
  };

  function applyLanguage(lang) {
    if (!translations[lang]) return;
    localStorage.setItem("lang", lang);
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });
  }

  const savedLang = localStorage.getItem("lang") || "en";
  applyLanguage(savedLang);

  // 👇 notice: your HTML uses `class="langswitch"`
  document.querySelectorAll(".langswitch button").forEach(btn => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      applyLanguage(lang);
    });
  });
});
