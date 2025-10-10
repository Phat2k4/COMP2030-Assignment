<?php
include 'db_connect.php';

$from = $_POST['from'];
$to = $_POST['to'];
$text = $_POST['text'];

$stmt = $conn->prepare("INSERT INTO messages (sender_id, receiver_id, text) VALUES (?, ?, ?)");
$stmt->bind_param("iis", $from, $to, $text);
$stmt->execute();

echo json_encode(["status" => "sent"]);
?>
