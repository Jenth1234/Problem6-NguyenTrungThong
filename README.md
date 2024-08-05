# User Score API Service

## Overview

This API service module manages user scores and provides endpoints to update scores and retrieve the top 10 users. The module also integrates with Socket.IO to provide real-time score updates to connected clients.

## API Endpoints

### 1. Update User Score
- **URL:** `/score/update`
- **Method:** `POST`
- **Request Data:**
  ```json
  {
    "user_id": "string",
    "score": "number"
  }

  Successful Response (200 OK):
    {
    "message": "Score has been successfully updated",
    "data": {
        "user_id": "string",
        "new_score": "number"
    }
    }


  400 Bad Request:
    {
    "error": "Invalid request data"
    }

  500 Internal Server Error:
    {
    "error": "Server error: error details"
    }

### 2. Get Top 10 Users

  URL: /score/top10
  Method: POST

  Successful Response (200 OK):
    {
    "data": [
        {
        "user_id": "string",
        "full_name": "string",
        "score": "number"
        }
    ]
    }
  Error Response (500 Internal Server Error):
    {
    "error": "Server error: error details"
    }

  Real-Time Updates with Socket.IO
  Event Name: scoreUpdate
    {
    "user_id": "string",
    "full_name": "string",
    "new_score": "number"
    }

  Install Node.js and MongoDB:
  Ensure that Node.js and MongoDB are installed on your system.
Cài Đặt Node.js và MongoDB:
Đảm bảo rằng Node.js và MongoDB đã được cài đặt trên hệ thống của bạn.

Clone Kho Lưu Trữ:
git clone <URL-to-repository>
cd <repository-folder>

Cài Đặt Các Phụ Thuộc:
npm install

Tạo Tệp .env:
Tạo tệp .env trong thư mục gốc của dự án với các biến môi trường cần thiết. Ví dụ
MONGO_URI=mongodb://localhost:27017/your-database
PORT=3050

Khởi Động Server:
npm start

Tích Hợp Với Socket.IO
Đảm bảo rằng bạn đã cấu hình Socket.IO trên client để lắng nghe sự kiện scoreUpdate.
Ví dụ về client JavaScript:
const socket = io('http://localhost:3050');
socket.on('scoreUpdate', (data) => {
  console.log('Điểm số đã được cập nhật:', data);
  // Xử lý dữ liệu và cập nhật giao diện người dùng
});

Diagram Quy Trình Thực Hiện
Dưới đây là sơ đồ minh họa quy trình thực hiện của module
+------------------+          +-----------------+          +-------------------+
| Client           |          | Dịch Vụ API     |          | Cơ Sở Dữ Liệu     |
| (Web/Socket.IO)  |          | (Node.js/Express) |          | (MongoDB)         |
+------------------+          +-----------------+          +-------------------+
         |                           |                           |
         |   POST /score/update       |                           |
         | --------------------------> |                           |
         |   {user_id, score}         |                           |
         |                           |                           |
         |                           |   Cập Nhật Điểm Trong CSDL |
         |                           | --------------------------> |
         |                           |                           |
         |                           |   Phát sự kiện scoreUpdate |
         |                           | <-------------------------- |
         |                           |                           |
         |   GET /score/top10          |                           |
         | --------------------------> |                           |
         |                           |   Lấy Top 10 Người Dùng    |
         |                           | --------------------------> |
         |                           |                           |
         |                           |   Trả Về Top 10 Người Dùng|
         |                           | <-------------------------- |
         |                           |                           |
         |   Xử Lý sự kiện scoreUpdate |                           |
         | <-------------------------- |                           |
         |                           |                           |

