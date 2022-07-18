function changeForm(tipo){
    if (tipo == "club"){
        document.querySelector(".register-form-player").style.display = 'none';
        document.querySelector(".register-form-club").style.display = 'block';
    } else {
        document.querySelector(".register-form-club").style.display = 'none';
        document.querySelector(".register-form-player").style.display = 'block';

    }
}
