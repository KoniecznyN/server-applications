<?php
    for ($i=0; $i < 30; $i++) { 
        $tab[$i]=rand(-20,20);
        echo $tab[$i],"<br>";
    }
    sort($tab);
    for ($i=0; $i < 30; $i++) { 
        if ($i==0) {
            continue;
        }
        if ($tab[0]!=$tab[1]) {
            $tab[0] = 0;
        }

        if ($tab[$i-1] == $tab[$i]) {
            $tab[$i-1] = 0;
        } elseif ($i != 29) {
            if ($tab[$i-1] != $tab[$i] && $tab[$i] != $tab[$i+1]) {
                $tab[$i] = 0;
            } else {
                continue;
            }
        } else {
            $tab[$i] = 0;
            continue;
        }
    }
    echo "Powtarzające się to: <br>";
    for ($i=0; $i < 30; $i++) { 
        if ($tab[$i] == 0) {
            continue;
        }
        echo $tab[$i], "<br>";
    }
?>