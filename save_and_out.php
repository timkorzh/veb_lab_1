<?php

session_start();
$start = microtime(true); // Время начала исполнения скрипта
$validY = array(-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2);
$validR = array(1, 2, 3, 4, 5);
$r = floatval(htmlspecialchars($_POST["r"]));
$x = floatval(htmlspecialchars($_POST["x"]));
$y = floatval(htmlspecialchars($_POST["y"]));
$invalid = ($_POST["invalid"] == "true")?(true):(false);
date_default_timezone_set("Europe/Moscow");
$current_time = date("H:i:s");
$message = "";
$class = "No";



$int_value = is_numeric($x) ? floatval($x) : null;
if ($int_value === null)
{
// $value wasn't all numeric
}

if ((($x <= 0 && $y <= 0 && 4*($x*$x+$y*$y) <= $r*$r)) ||
    ($x <= 0 && $y >= 0 && ($x + $y >= -$r/2)) ||
    ($x >= 0 && $y <= 0 && abs($x) <= $r && abs($y) <= $r)) {
    $message = "Yes";
    $class = "Yes";
} else {
    $message = "No";
}
if (!is_null($x) && !is_null($y) && $invalid == false) {
        if (!in_array($y, $validY)) {
            $message = "Invalid Y";
        }
        if ($x > 5 || $x < -5) {
            $message = "Invalid X";
        }



    $time = strval(number_format(microtime(true) - $start, 10, ".", "")*1000) . 'ms';

    // Сохранение в сессию
    $result = array($x, $y, $r, $message, $time, $current_time);
    if (!isset($_SESSION['results'])) {
        $_SESSION['results'] = array();
    }
    array_push($_SESSION['results'], $result);
    if (isset($_POST['reset'])) {
        unset($_SESSION['results']);
    }
    // Печать в таблицу
    //print_r('<tr><td>'.$x.'</td><td>'.$y.'</td><td>'.$r.'</td><td class="'.$class.'">'.$message.'</td><td>'.$time.'</td><td>'.$current_time.'</td></tr>');
foreach ($_SESSION['results'] as $result) { ?>
    <tr>
        <td><?php echo $result[0] ?></td>
        <td><?php echo $result[1] ?></td>
        <td><?php echo $result[2] ?></td>
        <td class="<?php echo $result[3] ?>"><?php echo $result[3]?></td>
        <td><?php echo $result[4] ?></td>
        <td><?php echo $result[5] ?></td>
    </tr>
<?php }
}

?>