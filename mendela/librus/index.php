<!-- <pre> -->
<?php
header('Content-Type: text/html; charset=utf-8');
include ("passwd.php");
$cookie_file_path = ""; // path do przechowywania ciasteczek 
$ch = curl_init();
curl_setopt($ch, CURLOPT_COOKIEFILE, $cookie_file_path); // "The name of the file containing the cookie data ..."
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); // "Set CURLOPT_RETURNTRANSFER to TRUE to return the transfer as a string of the return value of curl_exec()"
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1); // "true to follow any "Location: " header that the server sends as part of the HTTP header."

get("https://synergia.librus.pl/loguj/portalRodzina?v=1706610609");
$res = post(
    array(
        "action" => "login",
        "login" => $login,
        "pass" => $passwd
    ),
    "https://api.librus.pl/OAuth/Authorization?client_id=46"
);
$res = json_decode($res);

$goTo = "https://api.librus.pl" . $res->{'goTo'};

$res = post(
    array(
        "command" => "open_synergia_window",
        "commandPayload" => array(
            "url" => "https:\/\/synergia.librus.pl\/uczen\/index"
        )
    ),
    $goTo
);

$res = get('https://synergia.librus.pl/przegladaj_oceny/uczen');
$signs = array("\t", "\n", "\r", "\r\n", "&nbsp;", "<br/>");
$empty = "";
$res = str_replace($signs, $empty, $res);
$res = str_replace("/images/", "./images/", $res);
preg_match_all("|<h3.+?Oceny\sbieżące.+</div>|", $res, $out);
echo $out[0][0];

// $style = Array(
//     "https://synergia.librus.pl/LibrusStyleSheet2.1674858050.css",
//     "https://synergia.librus.pl/js/librus-component/dialog/librus-dialog.css?v1",
//     "https://synergia.librus.pl/js/librus-component/notification/librus-notification.css?v4",
//     "https://synergia.librus.pl/LibrusStyleSheet2Light.1637964526.css",
//     "https://synergia.librus.pl/js/librus-component/data-table/librus-data-table.css?v2",
//     "https://synergia.librus.pl/assets/css/synergia.1615587149.css",
//     "https://synergia.librus.pl/LibrusStyleSheet2NonIE.1361960241.css"
// );

echo "<style>";
foreach ($style as $a) {
    $s = get($a);
    echo $s;
}
;
echo '</style>';


//oceny z waga ==============================================================================
$html = $out[0][0];

$doc = new DOMDocument();
@$doc->loadHTML($html);
$xpath = new DOMXpath($doc);
// $res = $xpath->query("//a[@title and contains(@title, 'Waga')]");

$pierwszy_semestr = [
    "biologia" => [],
    "chemia" => [],
    "geografia" => [],
    "historia" => [],
    "język angielski" => [],
    "język niemiecki" => [],
    "język polski" => [],
    "wiedza o społeczeństwie" => [],
    "wychowanie fizyczne" => [],
];

$drugi_semestr = [
    "biologia" => [],
    "chemia" => [],
    "geografia" => [],
    "historia" => [],
    "język angielski" => [],
    "język niemiecki" => [],
    "język polski" => [],
    "wiedza o społeczeństwie" => [],
    "wychowanie fizyczne" => [],
];

$przedmioty = ["biologia", "chemia", "geografia", "historia", "język angielski", "język niemiecki", "język polski", "wiedza o społeczeństwie", "wychowanie fizyczne"];

foreach ($przedmioty as $key => $value) {
    $pom1 = [];
    $pom2 = [];

    $przedmiot = $value;
    $przedmiot = utf8_encode($przedmiot);

    $res = $xpath->query("//td[contains(., '$przedmiot')]/following-sibling::td//span//a[contains(@title, 'tak')]");
    foreach ($res as $key) {
        $ocena = $key->nodeValue;
        $a = $key->attributes;

        // $dupa = print_r($a[0]);
        foreach ($a as $key) {
            if ($key->name == 'title') {
                $att = $key->nodeValue;
                // $regular_verb = '/Nauczyciel:\s*([A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ\s]+)/u';
                // if (preg_match($regular_verb, $att, $wynik)) {
                //     $imie_i_nazwisko = $wynik[1];
                // }

                $regular_verb = '/Data:\s*(\d{4}-\d{2}-\d{2})/u';
                if (preg_match($regular_verb, $att, $wynik)) {
                    $data = $wynik[1];
                }
                //2024.18.01 zaczyna sie drugi semestr
                $data_array = explode("-", $data);
                if ((int) $data_array[0] == 2024 && (((int) $data_array[1] == 1 && (int) $data_array[2] >= 18)) || (int) $data_array[1] < 6) {
                    $semestr = 'drugi';
                } else {
                    $semestr = 'pierwszy';
                }

                $regular_verb = '/Waga:\s*(\d+)/u';
                if (preg_match($regular_verb, $att, $wynik)) {
                    $waga = $wynik[1];
                }
            }
        }
        $info_o_ocenie = [
            "ocena" => $ocena,
            "waga" => $waga,
        ];

        if ($semestr == 'pierwszy') {
            array_push($pom1, $info_o_ocenie);
        } else {
            array_push($pom2, $info_o_ocenie);
        }
    }
    $pierwszy_semestr[utf8_decode($przedmiot)] = $pom1;
    $drugi_semestr[utf8_decode($przedmiot)] = $pom2;
}

$oceny = [
    "pierwszy_semestr" => $pierwszy_semestr,
    "drugi_semestr" => $drugi_semestr,
];

echo "<script>";
echo "var oceny = " . json_encode($oceny) . ";";
echo "</script>";


// echo "<pre>";
// print_r($oceny);
// echo "</pre>";

function get($url)
{
    global $ch;
    curl_setopt($ch, CURLOPT_URL, $url); // "The URL to fetch."
    $res = curl_exec($ch);
    return $res;
}

function post($fields, $url)
{
    global $ch;
    $POSTFIELDS = http_build_query($fields);
    curl_setopt($ch, CURLOPT_POST, 1); // "true to do a regular HTTP POST."
    curl_setopt($ch, CURLOPT_POSTFIELDS, $POSTFIELDS); // "The full data to post in a HTTP "POST" operation."
    curl_setopt($ch, CURLOPT_URL, $url);
    $res = curl_exec($ch);
    return $res;
}

?>
<script>
    function changeEventListeners(table) {
        const array = table.children
        for (let i = 0; i < array.length; i++) {
            if (i % 2 == 0) {
                let button = array[i].children[0].children[0]
                button.onclick = () => {
                    let sibling = array[i].nextElementSibling
                    if (sibling.style.visibility == "hidden") {
                        button.src = "./images/tree_expanded.png"
                        sibling.style.display = "contents"
                        sibling.style.visibility = "visible"
                    } else {
                        button.src = "./images/tree_colapsed.png"
                        sibling.style.display = "none"
                        sibling.style.visibility = "hidden"
                    }

                }
            }
        }
    }

    function countAverage(array, semester, subject) {

        console.log(array);
        console.log(semester);
        console.log(subject);
        const subjectArray = array[semester.toString()][subject.toString()]
        if (subjectArray == undefined) {
            return "---"
        } else {
            console.log(subjectArray);
            let ocena = 0
            let wagi = 0
            for (let i = 0; i < subjectArray.length; i++) {
                let pom = subjectArray[i].ocena.replace("+", ".5")
                ocena += parseFloat(pom) * parseInt(subjectArray[i].waga)
                wagi += parseInt(subjectArray[i].waga)
            }
            let result = ocena / wagi
            console.log(result);
            return result.toFixed(2)
        }

    }

    countAverage(oceny, "pierwszy_semestr", "biologia")

    // console.log(oceny);

    function overwriteAverages(table) {
        for (let i = 0; i < table.children.length; i++) {
            if (i % 2 == 0) {
                let row = table.children[i]
                let subject = row.children[1].innerText
                row.children[3].innerText = countAverage(oceny, "pierwszy_semestr", subject)
                row.children[7].innerText = countAverage(oceny, "drugi_semestr", subject)
                if (row.children[3].innerText != "---") {
                    let yearlyAverage = (parseFloat(row.children[3].innerText) + parseFloat(row.children[7].innerText)) / 2
                    row.children[9].innerText = yearlyAverage.toFixed(2)
                } else {
                    row.children[9].innerText = "---"
                }
            }
        }
    }


    const firstTable = document.querySelector("body > table:nth-child(3) > tbody")
    const secondTable = document.querySelector("body > table:nth-child(12) > tbody")
    changeEventListeners(firstTable)
    changeEventListeners(secondTable)
    overwriteAverages(firstTable)

</script>