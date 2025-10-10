<?php
include 'db_connect.php';

$student_id = $_POST['student_id'];
$skill_id = $_POST['skill_id'];
$when = $_POST['when'];
$note = $_POST['note'];
$price = $_POST['price'];

$stmt = $conn->prepare("INSERT INTO orders (student_id, skill_id, when_datetime, note, price, status) VALUES (?, ?, ?, ?, ?, 'Pending')");
$stmt->bind_param("iissi", $student_id, $skill_id, $when, $note, $price);
$stmt->execute();

echo json_encode(["status" => "booked"]);
?>
