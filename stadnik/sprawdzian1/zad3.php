<?php
$tekst = "Tekst do zamiany";

function hugeLetters($tekst){
    $tekstArray = explode(" ", $tekst);
    foreach ($tekstArray as &$tekstElement) {
        if (strlen($tekstElement) % 2 != 0) {
            for ($i=0; $i < strlen($tekstElement); $i++) { 
                if ($i == 0) {
                    $tekstElement[$i] = strtoupper($tekstElement[$i]);
                } 
                if ($i == strlen($tekstElement) - 1) {
                    $tekstElement[$i] = strtoupper($tekstElement[$i]);
                }
            }
        }
    }
    return implode(" ", $tekstArray);
}

echo hugeLetters($tekst);
?>