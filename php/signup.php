<?php
    session_start();
    include_once "config.php";
    $firstname = mysqli_real_escape_string($conn, $_POST['firstname']);
    $lastname = mysqli_real_escape_string($conn, $_POST['lastname']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);

    if (!empty($firstname) && !empty($lastname) && !empty($email) && !empty($password)) {
        // Check validity of user email
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {// Emial is valid
            // Check if email exists in the database
            $sql = mysqli_query($conn, "SELECT email FROM users WHERE email = '{$email}'");
            if (mysqli_num_rows($sql) > 0) { // If email already exists
                echo "$email - Email already exists!";
            } else {
                // Check if user uploaded a file or not
                if (isset($_FILES['image'])) { // If file is uploaded
                    $img_name = $_FILES['image']['name']; // User uploaded image name
                    $tmp_name = $_FILES['image']['tmp_name']; // Temporary name used to save/move file

                    // Checking file exentension type (jpg, png)
                    $img_explode = explode('.', $img_name);
                    $img_ext = end($img_explode); // Extension of the users uploaded file

                    $extensions = ['png', 'jpeg', 'jpg']; // Valid image extensions
                    if (in_array($img_ext, $extensions) === true) { // Uploaded image matches with any extensions stored
                        $time = time(); // Returns the current time, this will be used as the unqiue name
                        
                        // Moving users uploaded image to a specific folder
                        $new_img_name = $time.$img_name;
                        if (move_uploaded_file($tmp_name, "images/".$new_img_name)) { // Successfully moved the uploaded image to the folder
                            $status = "Active now"; // Once user has signed up the status will be active
                            $random_id = rand(time(), 10000000); // Creating random id for user

                            // Adding all user data into the table
                            $sql2 = mysqli_query($conn, "INSERT INTO users (unique_id, firstname, lastname, email, password, image, status)
                             VALUES ({$random_id}, '{$firstname}', '{$lastname}', '{$email}', '{$password}', '{$new_img_name}', '{$status}')");
                            if ($sql2) {
                                $sql3 = mysqli_query($conn, "SELECT * FROM users WHERE email = '{$email}'");
                                if (mysqli_num_rows($sql3) > 0) {
                                    $row = mysqli_fetch_assoc($sql3);
                                    $_SESSION['unique_id'] = $row['unique_id']; // In this session the users unqiue_id is being used in other php files
                                    echo "success";
                                }
                            } else {
                                echo "Something went wrong!";
                            }
                        }
                    } else {
                        echo "Please select an image file! (jpg, jpeg, png)";    
                    }
                } else {
                    echo "Please select an image file!";
                }
            }
        } else {// Email is invalid
            echo "$email - This is not a valid email!";
        }
    } else {
        echo "All input fields are required!";
    }
?>