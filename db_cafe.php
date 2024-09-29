<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json; charset=utf-8');
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents("php://input"), true);

switch ($method) {
    case 'GET':
        $sql = "SELECT cafes.*, county.countyName FROM cafes LEFT JOIN county ON cafes.countyID = county.countyID";

        if (isset($_GET['id'])) {
            $id = $conn->real_escape_string($_GET['id']);
            $sql .= " WHERE cafes.cafeID='$id'";
        }
        
        // Run query and check for errors
        $result = $conn->query($sql);
        if (!$result) {
            die("SQL Error: " . $conn->error);
        }
    
        $history = array();
    
        $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
        $host = $_SERVER['HTTP_HOST'];
        $uri = $_SERVER['REQUEST_URI'];
        $path = dirname($uri);
        $urlimg = $protocol . $host . $path . "/";
    
        while ($row = $result->fetch_assoc()) {
            $history[] = array(
                "cafeID" => $row["cafeID"],
                "cafeName" => $row["cafeName"],
                "countyName" => $row["countyName"],
                "likes" => $row["likes"],
                "img" => $urlimg . $row["img"],
                "openingHours" => $row["openingHours"],
                "detailsCafe" => $row["detailsCafe"]
            );
        }
    
        $conn->close();
        echo json_encode($history);
        break;
    

    case 'POST':
        if (isset($_POST['method'])) {
            switch ($_POST['method']) {
                case 'POST':
                    var_dump($_POST);
                    if (isset($_POST['cafeName']) && isset($_POST['countyName'])) {
                        $cafeName = $conn->real_escape_string($_POST['cafeName']);
                        $countyID = $conn->real_escape_string($_POST['countyName']);
                        $img = $conn->real_escape_string($_POST['img']);
                        $openingHours = $conn->real_escape_string($_POST['openingHours']);
                        $detailsCafe = $conn->real_escape_string($_POST['detailCafe']);

                        $sql = "INSERT INTO cafes (cafeName, countyName, img, openingHours, detailsCafe) VALUES (?, ?, ?, ?, ?)";
                        $stmt = $conn->prepare($sql);
                        $stmt->bind_param("sisss", $cafeName, $countyName, $img, $openingHours, $detailsCafe);

                        if ($stmt->execute()) {
                            $response = array('status' => 'success', 'message' => 'Cafe added successfully');
                        } else {
                            $response = array('status' => 'error', 'message' => 'Error adding cafe: ' . $stmt->error);
                        }

                        $stmt->close();
                    } else {
                        $response = array('status' => 'error', 'message' => 'Cafe name, county ID, img, opening hours, or details are missing');
                    }
                    echo json_encode($response);
                    break;
                case 'PUT':
                    if (isset($_POST['cafeID']) && isset($_POST['user_id'])) {
                        $cafeID = $_POST['cafeID'];
                        $userID = $_POST['user_id'];
                
                        // Check if the user has already liked this cafe
                        $checkLikeSql = "SELECT * FROM likes WHERE user_id = ? AND cafeID = ?";
                        $checkLikeStmt = $conn->prepare($checkLikeSql);
                        $checkLikeStmt->bind_param("ii", $userID, $cafeID);
                        $checkLikeStmt->execute();
                        $result = $checkLikeStmt->get_result();
                
                        if ($result->num_rows > 0) {
                            // User has already liked this cafe
                            $response = array('status' => 'error', 'message' => 'คุณได้กดไลค์สถานที่นี้แล้ว');
                        } else {
                            // User has not liked this cafe yet, proceed to update likes
                            $sql = "UPDATE cafes SET `likes`=`likes`+1 WHERE cafeID=?";
                            $stmt = $conn->prepare($sql);
                            $stmt->bind_param("i", $cafeID);
                
                            if ($stmt->execute()) {
                                // Insert into likes table
                                $insertLikeSql = "INSERT INTO likes (user_id, cafeID) VALUES (?, ?)";
                                $insertLikeStmt = $conn->prepare($insertLikeSql);
                                $insertLikeStmt->bind_param("ii", $userID, $cafeID);
                                $insertLikeStmt->execute();
                
                                $response = array('status' => 'success', 'message' => 'ขอบคุณสำหรับการกด LIKE');
                            } else {
                                $response = array('status' => 'error', 'message' => 'Error updating record: ' . $stmt->error);
                            }
                
                            $stmt->close();
                        }
                
                        $checkLikeStmt->close();
                    } else {
                        $response = array('status' => 'error', 'message' => 'Cafe ID หรือ User ID parameter is missing');
                    }
                    echo json_encode($response);
                    break;
                
                case 'PATCH':
                    if (isset($_POST['cafeID'])) {
                        $cafeID = $_POST['cafeID'];
                        $updates = [];

                        if (isset($_POST['cafeName'])) {
                            $updates[] = "cafeName='" . $conn->real_escape_string($_POST['cafeName']) . "'";
                        }
                        if (isset($_POST['img'])) {
                            $updates[] = "img='" . $conn->real_escape_string($_POST['img']) . "'";
                        }
                        if (isset($_POST['openingHours'])) {
                            $updates[] = "openingHours='" . $conn->real_escape_string($_POST['openingHours']) . "'";
                        }
                        if (isset($_POST['detailsCafe'])) {
                            $updates[] = "detailsCafe='" . $conn->real_escape_string($_POST['detailsCafe']) . "'";
                        }
                       
                        if (isset($_POST['likes'])) {
                            $updates[] = "likes=" . intval($_POST['likes']);
                        }

                        if (count($updates) > 0) {
                            $sql = "UPDATE cafes SET " . implode(', ', $updates) . " WHERE cafeID=?";
                            $stmt = $conn->prepare($sql);
                            $stmt->bind_param("s", $cafeID);

                            if ($stmt->execute()) {
                                $response = array('status' => 'success', 'message' => 'Cafe record updated successfully');
                            } else {
                                $response = array('status' => 'error', 'message' => 'Error updating record: ' . $stmt->error);
                            }

                            $stmt->close();
                        } else {
                            $response = array('status' => 'error', 'message' => 'No valid fields to update');
                        }
                    } else {
                        $response = array('status' => 'error', 'message' => 'Cafe ID parameter is missing');
                    }
                    echo json_encode($response);
                    break;

                case 'DELETE':
                    if (isset($_POST['cafeID'])) {
                        $cafeID = $_POST['cafeID'];
                        $sql = "DELETE FROM cafes WHERE cafeID = ?";
                        $stmt = $conn->prepare($sql);
                        $stmt->bind_param("s", $cafeID);

                        if ($stmt->execute()) {
                            $response = array('status' => 'success', 'message' => 'Cafe record deleted successfully');
                        } else {
                            $response = array('status' => 'error', 'message' => 'Error deleting record: ' . $stmt->error);
                        }

                        $stmt->close();
                    } else {
                        $response = array('status' => 'error', 'message' => 'Cafe ID parameter is missing');
                    }
                    echo json_encode($response);
                    break;

                default:
                    $response = array('status' => 'error', 'message' => 'Invalid POST method');
                    echo json_encode($response);
                    break;
            }
        } else {
            
            // Handle normal POST request for adding a new cafe
            if (isset($_POST['cafeID']) && isset($_POST['cafeName'])) {
                $cafeID = $_POST['cafeID'];
                $cafeName = $_POST['cafeName'];
                $openingHours = $_POST['openingHours'];
                $detailsCafe = $_POST['detailsCafe'];
                $likes = isset($_POST['likes']) ? $_POST['likes'] : 0;

                // Handle file upload
                if (isset($_FILES['img']) && $_FILES['img']['error'] == UPLOAD_ERR_OK) {
                    $img = $_FILES['img']['name'];
                    $tmpName = $_FILES['img']['tmp_name'];
                    $uploadDir = 'uploads/';
                    $uploadFile = $uploadDir . basename($img);
                    
                    if (move_uploaded_file($tmpName, $uploadFile)) {
                        // File uploaded successfully
                    } else {
                        $response = array('status' => 'error', 'message' => 'Error uploading file');
                        echo json_encode($response);
                        exit;
                    }
                } else {
                    $img = null;
                }

                $sql = "INSERT INTO cafes (cafeID, cafeName, img, likes,openingHours,detailsCafe) VALUES (?, ?, ?, ? , ?, ?)";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("sssi", $cafeID, $cafeName, $img, $likes, $openingHours,$detailsCafe);

                if ($stmt->execute()) {
                    $response = array('status' => 'success', 'message' => 'Cafe record added successfully');
                } else {
                    $response = array('status' => 'error', 'message' => 'Error adding record: ' . $stmt->error);
                }

                $stmt->close();
            } else {
                $response = array('status' => 'error', 'message' => 'Missing required parameters');
            }
            echo json_encode($response);
        }
        break;

    default:
        $response = array('status' => 'error', 'message' => 'Invalid request method');
        echo json_encode($response);
        break;
}
?>
