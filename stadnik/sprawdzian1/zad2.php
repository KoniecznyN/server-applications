<style>
    td {
        text-align: center;
        background-color: yellowgreen;
        width: 20px;
        height: 20px;
    }
    
    .header {
        font-weight: 900;
        background-color: lightblue;
    }
</style>

<?php  
    echo "<table>";
    for ($i=1; $i <= 5; $i++) { 
        echo "<tr>";
        for ($j=1; $j <= 8; $j++) { 
            if ($i==1 or $j==1) {
                echo "<td class=\"header\">", $i * $j, "</td>";
                continue;
            }
            echo "<td>", $i * $j, "</td>";
        }
        echo "</tr>";
    }
    echo "</table>";
?>