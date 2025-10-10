<?php
include 'db_connect.php';

$me = $_GET['me'];
$peer = $_GET['peer'];

$stmt = $conn->prepare("SELECT * FROM messages WHERE (sender_id=? AND receiver_id=?) OR (sender_id=? AND receiver_id=?) ORDER BY timestamp ASC");
$stmt->bind_param("iiii", $me, $peer, $peer, $me);
$stmt->execute();
$result = $stmt->get_result();

$thread = [];
while ($row = $result->fetch_assoc()) {
  $thread[] = $row;
}

echo json_encode($thread);
?>
