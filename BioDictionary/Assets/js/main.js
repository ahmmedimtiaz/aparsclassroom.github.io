var mainApp = {};
(function() {
    var firebase = app_firebase;
    var uid = null;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            Name = user.displayName;
            email = user.email;
            photoUrl = user.photoURL;
            emailVerified = user.emailVerified;
            ann = user.isAnonymous;
            uid = user.uid;
            console.log("%cDon't YOU Ever Try To STEAL the SOURCE CODE 🤬", "color:red;Background-Color:white;padding:100px;font-size:50px")
            if (ann === true) {
                document.getElementById('dsh').style.display = "none";
                document.getElementById('lg').style.display = "inline-block";
            } else {
                document.getElementById('dsh').style.display = "inline-block";
                document.getElementById('lg').style.display = "none";
            }
        } else {
            window.location.replace("login.html");
        }
    });

    function logOut() {
        firebase.auth().signOut();
    }
    mainApp.logOut = logOut;
})()