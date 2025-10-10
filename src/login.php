<?php
include 'db_connect.php';

$email = $_POST['email'];
$password = $_POST['password'];

$stmt = $conn->prepare("SELECT id, name, password, credits FROM students WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
  if (password_verify($password, $row['password'])) {
    echo json_encode([
      "id" => $row['id'],
      "name" => $row['name'],
      "credits" => $row['credits']
    ]);
  } else {
    echo json_encode(["error" => "Invalid password"]);
  }
} else {
  echo json_encode(["error" => "User not found"]);
}
?>

