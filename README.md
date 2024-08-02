# Todo List Management System

The Todo List Management System is a Node.js and Express.js backend application for managing todo items. It supports CRUD operations, CSV file uploads/downloads, and filtering by status. Users can efficiently manage tasks with features for bulk uploads, exports, and status updates.

## Installation

1. **Clone the Repository**

   
            git clone https://github.com/manoj7654/Azguards.git
            
            cd Azguards

2. Install Dependencies


            npm install

3. Set Up Environment Variables

- Create a .env file in the root directory and add the necessary environment variables. For example:

  
        host=your database host
        mySqlPort=your database port
        user_name=your database user name
        mySqlPassword=your database password
        dataBaseName=your database name
        port=your port no
        key=your secret key for jwt tolen
        


4. Start the Server


            npm start

### API Endpoints

`Todo Items`

#### Get all todo

- Method : GET
- Endpoint: todos/

- Fetch all todo items.

- Response:


        [
        {
            "id": 1,
            "description": "Sample todo",
            "status": "pending"
        }
        ]
#### Get todo by id

- Method : GET
- Endpoint : todos/:id

- Fetch a single todo item by ID.

- Response:


        {
        "id": 1,
        "description": "Sample todo",
        "status": "pending"
        }

#### create todo

- Method : POST
- Endpoint : todos

- Add a new todo item.

- Request Body:


            {
            "description": "New todo item",
            "status": "pending"
            }

- Response:


        {
        "id": 2,
        "description": "New todo item",
        "status": "pending"
        }

#### Update todo

- Method : PUT
- Endpoint : todos/:id

- Update  particular todo item.

- Request Body:

        {
        "description": "Updated todo item",
        "status": "completed"
        }

- Response:


        {
        "id": 1,
        "description": "Updated todo item",
        "status": "completed"
        }

#### Delete todo

- Method : DELETE
- Endpoint : todos/:id

- Delete a particular todo item.

- Response:


            {
            "message": "Todo item deleted successfully"
            }

### CSV Operations
#### Upload csv file

- Method : POST
- Endpoint : todos/upload

- Upload todo items from a CSV file. The CSV should have description and status columns.

- Request:

      Form-data with file upload
- Response:


        {
        "message": "Todos uploaded successfully"
        }
#### Download todo

- Method : GET
- Endpoint : todos/download

- Download the todo list in CSV format, including the description and status.

- Response:

        CSV file download
`Filtering`

#### GET /todos/filter?status=status

- Fetch todo items based on their status (e.g., pending or completed).

- Response:


            [
            {
                "id": 1,
                "description": "Sample todo",
                "status": "completed"
            }
            ]



## Deployed Link
[live](https://azguards.onrender.com/)

## Swagger Documentation
[swagger](https://azguards.onrender.com/api-docs/)