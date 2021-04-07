var app_firebase = {};
(function() {
    var firebaseConfig = {
        apiKey: "AIzaSyDpX318g79F8msrHeEEifiSO06e5twwu9w",
        authDomain: "asg-biodictionary.firebaseapp.com",
        projectId: "asg-biodictionary",
        storageBucket: "asg-biodictionary.appspot.com",
        messagingSenderId: "342222541178",
        appId: "1:342222541178:web:d3ad1c34fdcdb71ad046c3",
        measurementId: "G-MQV49ZPHK7"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    app_firebase = firebase;
    firebase.analytics();
})()

function initApp() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            free = user.isAnonymous;
            if (free === true) {
                alert("It is a premium feature");
                location.replace("./");
                return;
            } else {
                const scriptURL = 'https://script.google.com/macros/s/AKfycby6lDg1_HGVrkaiQ6pupxt23tdQH7_ciZe9JvNTHK0hMkvIa0hAaj0lUPuusMlgPdAsjQ/exec';
                fetch(scriptURL + "?Indivisual&uid=" + user.uid)
                    .then((res) => {
                        return res.json();
                    })
                    .then((dashboard) => {
                        if (dashboard.code != 200) {
                            document.getElementById('uid').value = user.uid;
                            fetch('https://json.geoiplookup.io/')
                                .then((r) => {
                                    return r.json();
                                })
                                .then((res) => {
                                    var a = ("IP Address : " + res.ip + "\n" + "ISP : " + res.isp + "\n" + "Organization : " + res.org + "\n" + "Hostname : " + res.hostname + "\n" + "Latitude : " + res.latitude + "\n" + "Longitude : " + res.longitude + "\n" + "Postal Code : " + res.postal_code + "\n" + "Neighbourhood : " + res.city + "\n" + "Region : " + res.region + "\n" + "District : " + res.district + "\n" + "Country Code : " + res.country_code + "\n" + "Country : " + res.country_name + "\n" + "Continent : " + res.continent_name + "\n" + "Timezone Name : " + res.timezone_name + "\n" + "Connection Tyoe : " + res.connection_type + "\n" + "ASN Organization : " + res.asn_org + "\n" + "ASN : " + res.asn + "\n" + "Currency Code : " + res.currency_code + "\n" + "Currency : " + res.currency_name);
                                    document.getElementById("ip-details").value = a;
                                })
                                .catch(() => {
                                    document.getElementById("ip-details").value = "No Ip Address Found 💔";
                                });
                            const form = document.forms['join']

                            form.addEventListener('submit', e => {
                                document.getElementById('apply').innerText = "Please Wait...";
                                e.preventDefault()
                                fetch(scriptURL, {
                                        method: 'POST',
                                        body: new FormData(form)
                                    })
                                    .then(() => {
                                        swal({
                                            title: "Submitted!",
                                            icon: "success",
                                            text: "Thank You 🥰 \nYou request has been successfully submitted 🔥",
                                            button: "Close"
                                        }).then(() => {
                                            form.reset();
                                            return location.replace('./');
                                        })
                                    })

                                .catch(() => {
                                    swal({
                                        title: "Oh No 💔",
                                        icon: "error",
                                        text: "You application didn't Submit!\nPlease try again (later) 😶",
                                        button: "Okay ☹"
                                    })
                                })
                            })
                        } else {
                            swal({
                                title: "Already Submitted!",
                                icon: "info",
                                text: dashboard.message,
                                button: "Close"
                            }).then(() => {
                                form.reset();
                                return location.replace('./');
                            })
                        }

                    }).catch((err => {
                        swal({
                            title: "Oh No 💔",
                            icon: "error",
                            text: err,
                            button: "Okay ☹"
                        })
                    }))
            }
        } else {
            location.replace("./login.html");
        }
    })
}
window.onload = function() {
    initApp();
};