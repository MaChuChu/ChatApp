<?php 
    session_start();
    include_once "config.php";
    $outgoing_id = $_SESSION['unique_id'];
    $sql = mysqli_query($conn, "SELECT * FROM users WHERE NOT unique_id = {$outgoing_id}");
    $output = "";

    if (mysqli_num_rows($sql) == 1) { // Check if there is only one row in the database.
        $output .= "No users are available to chat";
    } elseif (mysqli_num_rows($sql) > 0) { // Otherwise show all users
        include "data.php";
    }
    echo $output;
?>