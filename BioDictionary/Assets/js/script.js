var a;
$(document).ready(function() {
    const lin1 = "aHR0cHM6Ly9zY3JpcHQuZ29vZ2xlLmNvbS9tYWNyb3Mvcy8=";
    const lin2 = "L2V4ZWM=";
    var ln1 = window.atob(lin1);
    var ln2 = window.atob(lin2);
    var ln = window.atob(inf);
    fetch(ln1 + ln + ln2)
        .then((res) => {
            return res.json();
        })
        .then((loadedData) => {
            a = loadedData;
            console.log(a);
            i1 = '<div class="card text-center">',
                m1 = 1;
            $.each(a, function(a, e) {
                (
                    i1 += '<div class="col-md-15 well">',
                    i1 += "<h3>" + e.Number + " " + e.Word + "</h3>",
                    i1 += '<h4>অর্থ : ' + e.Meaning + '</h4>',
                    i1 += "<a type='button' class='links' href=\"" + e.ExplainMe + '">' + "ব্যাখ্যা" + "</a>",
                    i1 += "</p></div>&nbsp;", m1 % 2 == 0 && (i1 += '</div><div class="card text-center">'),
                    m1++)
            }), i1 += "</div>", $("#all").html(i1)
        })
        .catch((err) => {
            console.error(err);
        });

    $("#txt-search").keyup(function() {
        var e = $(this).val();
        if ("" !== e) {
            var o = new RegExp(e, "i"),
                i = '<div class="card text-center">',
                m = 1;
            $.each(a, function(a, e) {
                -1 == e.Word.search(o) || (i += '<div class="col-md-15 well">', i += "<h3>" + e.Number + " " + e.Word + "</h3>", i += '<h4>অর্থ : ' + e.Meaning + '</h4>', i += "<a type='button' class='links' href=\"" + e.ExplainMe + '">' + "ব্যাখ্যা" + "</a>", i += "</p></div>&nbsp;", m % 2 == 0 && (i += '</div><div class="card text-center">'), m++)
            }), i += "</div>", $("#filter-records").html(i)
        } else $("#filter-records").html("");
        if (document.getElementById("filter-records").innerHTML == '<div class="card text-center"></div>') {
            document.getElementById("filter-records").innerHTML = '<p style=' + '"text-align: center;">এরূপ কোন শব্দ খুঁজে পাওয়া যায় নি 😶</p>';
            document.getElementById("status").style.display = "none";
            document.getElementById("all").style.display = "block";
        }
        if ("" == e) {
            document.getElementById("all").style.display = "block";
            document.getElementById("status").style.display = "none";
        }
    })
});

const n = document.getElementById("status");

function searchFunc() {
    n.innerText = "Searching...";
}

function resultFunc() {
    n.style.display = "block";
    n.innerText = "সার্চ সম্পন্ন 🥰";
    document.getElementById("all").style.display = "none";
    setTimeout(function() {
        n.style.display = "none";
    }, 2000)
}