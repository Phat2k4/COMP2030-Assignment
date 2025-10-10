<?php
include 'db_connect.php';

$tutor_id = $_GET['tutor'];
$stmt = $conn->prepare("SELECT rating, text, reviewer_name FROM reviews WHERE tutor_id = ?");
$stmt->bind_param("i", $tutor_id);
$stmt->execute();
$result = $stmt->get_result();

$reviews = [];
while ($row = $result->fetch_assoc()) {
  $reviews[] = $row;
}

echo json_encode($reviews);
?>
