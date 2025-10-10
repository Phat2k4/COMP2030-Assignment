<?php
include 'db_connect.php';

$id = $_POST['id'];
$name = $_POST['name'];

$stmt = $conn->prepare("UPDATE students SET name=? WHERE id=?");
$stmt->bind_param("si", $name, $id);
$stmt->execute();

echo json_encode(["status" => "updated"]);
?>
