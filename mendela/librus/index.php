<pre>
<?php
include("passwd.php");
$cookie_file_path = ""; // path do przechowywania ciasteczek 
$ch = curl_init();
curl_setopt($ch, CURLOPT_COOKIEFILE, $cookie_file_path); // "The name of the file containing the cookie data ..."
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); // "Set CURLOPT_RETURNTRANSFER to TRUE to return the transfer as a string of the return value of curl_exec()"
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1); // "true to follow any "Location: " header that the server sends as part of the HTTP header."
 
get("https://synergia.librus.pl/loguj/portalRodzina?v=1706610609");
$res = post(array(
    "action" => "login",
    "login" => $login,
    "pass" => $passwd
), "https://api.librus.pl/OAuth/Authorization?client_id=46");
$res = json_decode($res);
//print_r($res);
 
$goTo = "https://api.librus.pl" . $res->{'goTo'};
//echo $goTo;
 
curl_setopt($ch, CURLOPT_HEADER, 1);
$res = post(array(
    "command" => "open_synergia_window",
    "commandPayload" => array(
        "url" => "https:\/\/synergia.librus.pl\/uczen\/index"
    )
), $goTo);
//echo $res;
curl_setopt($ch, CURLOPT_HEADER, 0);
 
preg_match_all("|location:\s(.+)|", $res, $out);
//print_r($out[0][2]);
get($out[0][2]);
$res = get('https://synergia.librus.pl/przegladaj_oceny/uczen');
$signs = ["\r\n", "\n", "&nbsp;", "\r"];
$empty = "";
$res = str_replace($signs, $empty, $res);
$res = str_replace("/images/", "./images/", $res);
preg_match_all("|<h3.+?Oceny\sbieżące.+</div>|", $res, $out);
echo $out[0][0];
 
 
//echo $res;
 
 
//tu linki do stylów
$style = Array(
    "https://synergia.librus.pl/LibrusStyleSheet2.1674858050.css",
    "https://synergia.librus.pl/js/librus-component/dialog/librus-dialog.css?v1",
    "https://synergia.librus.pl/js/librus-component/notification/librus-notification.css?v4",
    "https://synergia.librus.pl/LibrusStyleSheet2Light.1637964526.css",
    "https://synergia.librus.pl/js/librus-component/data-table/librus-data-table.css?v2",
    "https://synergia.librus.pl/assets/css/synergia.1615587149.css",
    "https://synergia.librus.pl/LibrusStyleSheet2NonIE.1361960241.css"
);
 
echo "<style>";
foreach($style as $a) {
    $s = get($a);
    echo $s;
};
echo '</style>';
 
/*
$doc = new DOMDocument();
$doc->loadHTML($out[0][0]);
print_r($doc);
$xpath = new DOMDocument($doc);
 */
 
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