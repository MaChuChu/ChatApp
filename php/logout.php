<?php 
    session_start();
    if (isset($_SESSION['unique_id'])) { // If the user is logged in
        include_once "config.php";
        $logout_id = mysqli_real_escape_string($conn, $_GET['logout_id']);
        if (isset($logout_id)) { // ID is set
            $status = "Offline now";
            $sql = mysqli_query($conn, "UPDATE users SET status = '{$status}' WHERE unique_id = {$logout_id}"); // once user is logged out, update status to offline 
            if ($sql) {
                session_unset();
                session_destroy();
                header("location: ../login.php");
            }
        } else {
            header("location: ../users.php");    
        }
    } else {
        header("location: ../login.php");
    }
?>