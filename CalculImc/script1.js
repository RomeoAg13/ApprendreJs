
function calcul(prenom,taille, poids){
    var imc = 0;
    if (taille && poids > 0 && taille && poids != null) {
        taille /=100;
        imc = poids/(taille*taille);
        document.getElementById("resultImc").textContent =imc.toFixed(2);
    }


        if( imc <=18.5){
            let maigreur = "Vous êtes en : Insuffisance pondérale (maigreur)";
            document.getElementById("resultString").textContent =maigreur;
            
        }else if( imc >= 18.5 && imc <24.9){
            let normal = "Vous avez une corpulence Normale";
            document.getElementById("resultString").textContent =normal;
        }else if(imc >= 24.9 && imc <29.9){
            let surpoids = "Vous êtes en : Surpoids ";
            document.getElementById("resultString").textContent =surpoids;
        } else if(imc >= 29.9 && imc <40){
            let obesite = "Vous êtes en : Obésité";
            document.getElementById("resultString").textContent =obesite;
            
        } else if(imc > 40){
            let obesitemassive = "Vous êtes en : Obésité Morbite/Massive";
            document.getElementById("resultString").textContent =obesitemassive;
            
            
        }
        else {
            return "un soucis dans les valeurs";
        }
        
    
}

function calculImc(){
    var prenom = document.getElementById("prenomInput").value;
    var taille = document.getElementById("tailleInput").value;
    var poids= document.getElementById("poidsInput").value;
    if(taille.trim() === "" || poids.trim() === "") {
        alert("Veuillez remplir tous les champs.");
        return;
    }
    calcul(prenom, taille, poids);
}