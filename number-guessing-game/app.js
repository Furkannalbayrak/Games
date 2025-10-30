
const kontrolEtButton = document.querySelector(".input");
const again = document.querySelector(".again");
const input = document.querySelector(".inputGir");
const bilgiYazisi = document.querySelector(".firstP");
const skor = document.querySelector(".skor");
const maxSkor = document.querySelector(".maxSkor");
const numberBox = document.querySelector(".kare p");
const body = document.querySelector("body");

let puan = 10;
let randomNumber = Math.floor(Math.random() * 100) + 1;
runEventListeners()

function runEventListeners() {
    kontrolEtButton.addEventListener("click", degeriKontrolet);
    again.addEventListener("click", oyunuTekrarEt);
}

function degeriKontrolet() {

    const value = Number(input.value.trim());

    if (value != "") {
        if (value < 0 || value > 100) {
            bilgiYazisi.textContent = `Lütfen 1 ile 100 arasında bir sayı girin`;
            return;
        }

        if (value > randomNumber) {
            bilgiYazisi.textContent = "Daha küçük bir sayi girin";
            puan--;
            skor.textContent = puan;
        }
        else if (value < randomNumber) {
            bilgiYazisi.textContent = "Daha büyük bir sayi girin";
            puan--;
            skor.textContent = puan;
        }
        else {
            bilgiYazisi.textContent = "🎉 Doğru Tahmin! Tebrikler!"
            numberBox.textContent = randomNumber;
            body.style.background = "linear-gradient(135deg, #1a5f1a 0%, #1e3b1e 100%)";
            document.querySelector(".kare").style.background = "linear-gradient(135deg, #28a745, #5cd68b)";

            input.disabled = true;

            if (puan > Number(maxSkor.textContent)) {
                maxSkor.textContent = puan;
            }
        }
        puanKontrol();
    }
    else {
        alert("⚠️ Lütfen bir sayı giriniz!");
    }
}

function puanKontrol() {
    if (puan == 0) {
        bilgiYazisi.textContent = `💥 Oyun Bitti! Doğru sayı ${randomNumber} idi`;
        maxSkor.textContent = 0;
        body.style.background = "linear-gradient(135deg, #5e1a1a 0%, #3e1616 100%)";
        document.querySelector(".kare").style.background = "linear-gradient(135deg, #dc3545, #ff6b6b)";
        numberBox.textContent = randomNumber;
        kontrolEtButton.disabled = true;
    }
}

function oyunuTekrarEt() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    puan = 10;

    bilgiYazisi.textContent = "Tahmininizi girin...";
    skor.textContent = puan;
    input.value = "";
    numberBox.textContent = "?";

    body.style.background = "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)";
    document.querySelector(".kare").style.background = "linear-gradient(135deg, #4361ee, #3f37c9)";
    kontrolEtButton.disabled = false;
    input.disabled = false;
}



