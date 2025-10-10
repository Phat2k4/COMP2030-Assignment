<?php
include 'db_connect.php';

$tutor_id = $_POST['tutor'];
$rating = $_POST['rating'];
$text = $_POST['text'];
$by = $_POST['by'];

$stmt = $conn->prepare("INSERT INTO reviews (tutor_id, rating, text, reviewer_name) VALUES (?, ?, ?, ?)");
$stmt->bind_param("iiss", $tutor_id, $rating, $text, $by);
$stmt->execute();

echo json_encode(["status" => "reviewed"]);
?>
