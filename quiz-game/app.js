const startTestKategorili = document.querySelector(".startTestChild_Kategorili");
const startTestPuanli = document.querySelector(".startTestChild_Puanli");
const nextQuestion = document.querySelector(".nextQuestionChild");

const sinavTuru = document.querySelector(".sinavTuru");
const kategoriler = document.querySelector(".kategoriler");
const zorlukDuzeyi = document.querySelector(".zorlukDuzeyi");

const sinavTuruDiv = document.querySelector(".sinavTuruDiv");
const kategoriDiv = document.querySelector(".kategoriDiv");
const zorlukDuzeyiDiv = document.querySelector(".zorlukDuzeyiDiv");
const questionDiv = document.querySelector(".questionDiv");
const bilgilendirmeDiv = document.querySelector(".bilgilendirmeDiv");
const resultDiv = document.querySelector(".resultDiv");

const options = document.querySelector(".options");
const secenekler = document.querySelectorAll(".optionsChild");

const resultBox = document.querySelector(".resultBox");
const liste = document.querySelector(".liste");
const restartBtn = document.querySelector(".restartBtn");

const backToMainFromKategori = document.querySelector("#backToMainFromKategori");
const backToKategoriFromZorluk = document.querySelector("#backToKategoriFromZorluk");
const backToMainFromBilgi = document.querySelector("#backToMainFromBilgi");


sayilar = [];
dizi_benimCevaplarim = [];
dizi_zorluk = [];
dizi_soru = [];
dizi_siklar_kumesi = [];
dizi_cevap = [];
results = [];
runEventListener();

function runEventListener() {
    sessionStorage.clear();
    sinavTuru.addEventListener("click", selectSinavTuru);
    kategoriler.addEventListener("click", selectKategori);
    zorlukDuzeyi.addEventListener("click", selectDifficulty);
    startTestKategorili.addEventListener("click", StartTestKategori);
    startTestPuanli.addEventListener("click", startTestPuan);
    options.addEventListener("click", selectOptions);
    nextQuestion.addEventListener("click", bekle);

    resultBox.addEventListener("click", goQuestion);
    liste.addEventListener("click", listele);

    if (restartBtn) {
        restartBtn.addEventListener("click", () => location.reload());
    }

    if(backToMainFromKategori) {
        backToMainFromKategori.addEventListener("click", () => {
            kategoriDiv.style.display = "none";
            sinavTuruDiv.style.display = "block";
        });
    }

    if(backToKategoriFromZorluk) {
        backToKategoriFromZorluk.addEventListener("click", () => {
            zorlukDuzeyiDiv.style.display = "none";
            kategoriDiv.style.display = "block";
        });
    }

    if(backToMainFromBilgi) {
        backToMainFromBilgi.addEventListener("click", () => {
            bilgilendirmeDiv.style.display = "none";
            sinavTuruDiv.style.display = "block";
        });
    }
}

function listele() {
    secenekler.forEach((element) => {
        element.style.backgroundColor = "#cbd5e0";
        element.style.color = "#4a5568";
    })
    showResult(true);
}


function goQuestion(e) {
    if (e.target.classList == "resultBoxChild") {
        resultDiv.style.display = "none";
        questionDiv.style.display = "block";

        let number = e.target.textContent - 1;
        createNewQuestion(dizi_soru[number], dizi_siklar_kumesi[number], dizi_zorluk[number], 1);

        secenekler.forEach((element) => {
            if (element.textContent == dizi_cevap[number]) {
                element.style.backgroundColor = "#48bb78";
                element.style.color = "white";
            }
        })

        if (results[number] == "yanlis") {
            secenekler.forEach((element) => {
                if (element.textContent == dizi_benimCevaplarim[number]) {
                    element.style.backgroundColor = "#f56565";
                    element.style.color = "white";
                }
            })
        }
    }
    progressBarFunction(true);
    options.removeEventListener("click", selectOptions);
}


async function startTestPuan() {

    bilgilendirmeDiv.style.display = "none";
    questionDiv.style.display = "block";

    progressBarFunction();

    try {
        const response = await fetch("soru.json");

        if (!response.ok) {
            alert("Veri alınırken bir hata oluştu");
            return;
        }

        const data = await response.json();

        while (sayilar.length < 10) {
            let kontrol = true;
            const rastgeleSayi = Math.floor(Math.random() * 53);

            sayilar.forEach((element) => {
                if (element == rastgeleSayi) {
                    kontrol = false
                }
            })

            if (kontrol) {
                sayilar[a] = rastgeleSayi;
                a++;
            }
        }

        sayilar.forEach((element, index) => {
            dizi_soru[index] = data[element].soru;
            dizi_siklar_kumesi[index] = data[element].cevaplar;
            dizi_cevap[index] = data[element].cevap;
            dizi_zorluk[index] = data[element].zorluk;
        })

        let number = sayilar[0];
        createNewQuestion(data[number].soru, data[number].cevaplar, data[number].zorluk);

    } catch (error) {
        alert("Hata oluştu: ", error);
    }
}


function selectOptions(e) {

    if (e.target.classList.contains("optionsChild")) {

        Array.from(e.target.parentElement.children).forEach(element => {
            element.style.backgroundColor = "";
            element.style.color = "";
        });
        e.target.style.backgroundColor = "#667eea";
        e.target.style.color = "white";
    }
}


let a = 0;
async function StartTestKategori() {

    if (sessionStorage.getItem("difficultyValue") == "Kolay" || sessionStorage.getItem("difficultyValue") == "Orta" || sessionStorage.getItem("difficultyValue") == "Zor") {
        zorlukDuzeyiDiv.style.display = "none";
        questionDiv.style.display = "block";

        progressBarFunction();

        try {
            const response = await fetch("soru.json");

            if (!response.ok) {
                alert("Veri alınırken bir hata oluştur");
                return;
            }

            const data = await response.json();

            for (let i = 0; i < data.length; i++) {
                if (data[i].kategori == sessionStorage.getItem("kategoriValue") && data[i].zorluk == sessionStorage.getItem("difficultyValue")) {
                    dizi_cevap[a] = data[i].cevap;
                    dizi_soru[a] = data[i].soru;
                    dizi_siklar_kumesi[a] = data[i].cevaplar;
                    a++;
                }
            }
            for (let i = 0; i < data.length; i++) {
                if (data[i].kategori == sessionStorage.getItem("kategoriValue") && data[i].zorluk == sessionStorage.getItem("difficultyValue")) {
                    createNewQuestion(data[i].soru, data[i].cevaplar);
                    break;
                }
            }

        } catch (error) {
            alert("Hata oluştu: ", error);
        }
    }
}


async function createNewQuestion(soru, secenekler, zorlukSeviyesi, sonuclariIncele) {
    const question = document.querySelector(".question");
    question.textContent = soru;

    const zorluk = document.querySelector(".showDifficulty");
    zorluk.textContent = `(${zorlukSeviyesi})`;

    if (sessionStorage.getItem("kategori") == "Kategorili") {
        zorluk.style.display = "none";
    }

    const addOptionsChild = document.querySelectorAll(".optionsChild");
    addOptionsChild.forEach((element, index) => {
        element.textContent = secenekler[index];
        element.style.backgroundColor = "";
        element.style.color = "";
    })

    if (sonuclariIncele == 1) {
        nextQuestion.style.display = "none";
        liste.style.display = "block";
    }
}

let toplamPuan = 0;

function puanHesapla() {
    if (dizi_zorluk[i] == "Kolay") {
        toplamPuan = toplamPuan + 2;
    }
    else if (dizi_zorluk[i] == "Orta") {
        toplamPuan = toplamPuan + 4;
    }
    else {
        toplamPuan = toplamPuan + 7;
    }
}


let i = 0;
let b = 1;

function bekle(e) {
    let secili = false;

    secenekler.forEach((element) => {
        if (element.style.backgroundColor == "rgb(102, 126, 234)") {
            secili = true;
            dizi_benimCevaplarim[i] = element.textContent;

            if (element.textContent == dizi_cevap[i]) {
                results[i] = "dogru"

                if (sessionStorage.getItem("kategori") == "Puanli") {
                    puanHesapla();
                }
            }
            else {
                results[i] = "yanlis";
            }
        }
    })

    if (secili) {
        progressBarFunction();
        Array.from(e.target.parentElement.previousElementSibling.previousElementSibling.children).forEach((element) => {
            element.style.backgroundColor = "#cbd5e0";
        })
        i++;

        if ((i == 2 && sessionStorage.getItem("kategori") == "Kategorili") || (i == 9)) {
            const nextQuestion_showResult = document.querySelector(".nextQuestionChild");
            nextQuestion_showResult.textContent = "Sonuçları Göster";
        }


        if ((i == 3 && sessionStorage.getItem("kategori") == "Kategorili") || (i == 10)) {
            showResult();
            return;
        }

        createNewQuestion(dizi_soru[b], dizi_siklar_kumesi[b], dizi_zorluk[b]);
        b++;
    }
    else {
        const warning = document.querySelector(".warning");
        warning.textContent = "Lütfen bir şık seçiniz!";
        warning.style.display = "block";
        setTimeout(() => {
            warning.style.display = "none";
        }, 2000);
        return;
    }
}


let interval;
function progressBarFunction(control) {

    const progressBar = document.querySelector(".progressBarInner");
    let zaman = 250;
    let reminingZaman = zaman;

    if (interval) {
        clearInterval(interval);
    }
    if (control == true) {
        progressBar.style.display = "none";
    }

    interval = setInterval(() => {
        reminingZaman--;

        const progressBarWidth = (reminingZaman / zaman) * 100;
        progressBar.style.width = `${progressBarWidth}%`;


        if (progressBarWidth <= 100 && progressBarWidth > 70) {
            progressBar.style.backgroundColor = "#48bb78";
        }
        else if (progressBarWidth <= 70 && progressBarWidth > 55) {
            progressBar.style.backgroundColor = "#ecc94b";
        }
        else if (progressBarWidth <= 55 && progressBarWidth > 40) {
            progressBar.style.backgroundColor = "#ed8936";
        }
        else if (progressBarWidth <= 40 && progressBarWidth > 25) {
            progressBar.style.backgroundColor = "#f56565";
        }
        else if (progressBarWidth <= 25 && progressBarWidth > 10) {
            progressBar.style.backgroundColor = "#c53030";
        }
        else {
            progressBar.style.backgroundColor = "#9b2c2c";
        }


        if (reminingZaman <= 0) {
            clearInterval(interval);
            Swal.fire({
                icon: "error",
                title: "Kaybettin",
                text: "Süreniz bittiği için bundan sonraki soruları göremeyeceksiniz",
                confirmButtonText: "Sonuçları Gör",
                width: "820px",
            });
            showResult();
        }
    }, 140);
}


function showResult(control) {
    questionDiv.style.display = "none";
    resultDiv.style.display = "block";

    clearInterval(interval);

    if (control != true) {

        const P = document.querySelectorAll(".result")

        const p1 = P[0];
        const p2 = P[1];
        const p3 = P[2];

        let dogruSayisi = 0;
        let yanlisSayisi = 0;
        let soruSayisi = 0;


        results.forEach((element) => {
            if (element == "dogru") {
                dogruSayisi++
            }
            else {
                yanlisSayisi++;
            }
            soruSayisi++;
            addBox(element, soruSayisi);
        })


        p1.textContent = `Toplam doğru sayısı: ${dogruSayisi}`;
        p2.textContent = `Toplam yanlış sayısı: ${yanlisSayisi}`;
        p3.textContent = `Toplam puan: ${toplamPuan}`;

        if (sessionStorage.getItem("kategori") == "Kategorili") {
            p3.style.display = "none";
        }
    }
}


function addBox(element, soru) {
    const sonucKutu = document.querySelector(".resultBox");

    const div = document.createElement("div");
    div.classList = "resultBoxChild";
    div.textContent = `${soru}`;
    if (element == "dogru") {
        div.style.backgroundColor = "#48bb78";
    }
    else {
        div.style.backgroundColor = "#f56565";
    }

    sonucKutu.appendChild(div);
}


function selectDifficulty(e) {
    if (e.target.className == "sameChild") {
        const difficultyValue = e.target.textContent;
        sessionStorage.setItem("difficultyValue", difficultyValue);

        Array.from(e.target.parentElement.children).forEach(element => {
            element.style.backgroundColor = "";
            element.style.color = "";
        });
        e.target.style.backgroundColor = "#667eea";
        e.target.style.color = "white";
    }
}


function selectKategori(e) {
    if (e.target.className == "sameChild") {
        const kategoriValue = e.target.textContent;
        sessionStorage.setItem("kategoriValue", kategoriValue);
        showDifficulty();
    }
}


function selectSinavTuru(e) {
    if (e.target.className == "sameChild") {
        if (e.target.textContent == "Puanlı") {
            sessionStorage.setItem("kategori", "Puanli");
            puanli();
        }
        else {
            sessionStorage.setItem("kategori", "Kategorili");
            showKategori();
        }
    }
}

function puanli() {
    sinavTuruDiv.style.display = "none";
    bilgilendirmeDiv.style.display = "block";
}

function showKategori() {
    sinavTuruDiv.style.display = "none";
    kategoriDiv.style.display = "block";
}
function showDifficulty() {
    kategoriDiv.style.display = "none";
    zorlukDuzeyiDiv.style.display = "block";
}


