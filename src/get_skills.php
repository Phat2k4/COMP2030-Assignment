<?php
include 'db_connect.php';

$result = $conn->query("SELECT * FROM skills");
$skills = [];

while ($row = $result->fetch_assoc()) {
  $row['tags'] = explode(",", $row['tags']);
  $skills[] = $row;
}

echo json_encode($skills);
?>
