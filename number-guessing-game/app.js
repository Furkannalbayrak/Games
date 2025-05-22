
const kontrolEtButton = document.querySelector(".input");
const again = document.querySelector(".again");
const input = document.querySelector(".inputGir");
const bilgiYazisi = document.querySelector(".firstP");
const skor = document.querySelector(".skor");
const maxSkor = document.querySelector(".maxSkor");

let puan = 20;
let maxSayi = 100;
let randomNumber = Math.floor(Math.random() * maxSayi) + 1;
runEventListeners()

function runEventListeners() {
    kontrolEtButton.addEventListener("click", degeriKontrolet);
    again.addEventListener("click", oyunuTekrarEt);
}

function degeriKontrolet() {

    const value = Number(input.value.trim());

    if(value != ""){
        if(value < 0 || value > maxSayi){
            bilgiYazisi.textContent = `Lütfen 0 ile ${maxSayi} arasında bir sayı girin`;
            return;
        }
        
    
        if (value > randomNumber) {
            bilgiYazisi.textContent = "Daha kucuk bir sayi girin";
            puan--;
            skor.textContent = puan;
        }
        else if (value < randomNumber) {
            bilgiYazisi.textContent = "Daha buyuk bir sayi girin";
            puan--;
            skor.textContent = puan;
        }
        else {
            bilgiYazisi.textContent = "Doğru Tahmin ettiniz !!!"
            document.querySelector(".background").style.backgroundColor = "rgb(56, 208, 74)";
            input.disabled = true;
    
            if (puan > Number(maxSkor.textContent)) {
                maxSkor.textContent = puan;
            }
        }
    
        puanKontrol();
    }
    else{
        alert("Boş bırakmayınız !!!");
    }

    
}

function puanKontrol(){
    if(puan == 0){
        bilgiYazisi.textContent = "OYUNU KAYBETTİNİZ :(";
        maxSkor.textContent = puan;
        document.querySelector(".background").style.backgroundColor = "rgb(226, 40, 40)";
        kontrolEtButton.disabled = true;
    }
}

function oyunuTekrarEt(){
    randomNumber = Math.floor(Math.random() * maxSayi) + 1;
    puan = 20;
    bilgiYazisi.textContent = "Tahmin ediliyor...";
    skor.textContent = puan; 
    input.value = "";
    document.querySelector(".background").style.backgroundColor = "rgb(48, 46, 46)";
    kontrolEtButton.disabled = false;
    input.disabled = false;
}


// background colorlar ayarlanacak