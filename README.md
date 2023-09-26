# TASK MANAGEMENT

Frontend UI of Task Management app

## Requirements

* ReactJs - 18.2.0
* Node - 18.13.0
* Yarn - 1.22.19 [Recommended]

## Installation

```bash
  cp .env.example .env
```

##### Write your REACT_APP_API_HOST and REACT_APP_API_PREFIX in .env

```bash 
    yarn i 
    yarn start
```

### Implemented Features

```bash
   -Authentication
        1. [Registration] 
            'Registration form for new user'
        2. [Login] 
            'Login for registered user' 
        3. [Verify]  
            'Email verification for non verified email users'
   -Task
        1. [List] 
            'All created tasks are shown there with pagination'
        2. [Create] 
            'Task Create Form'
        3. [Edit]  
            'Task Edit for task creator or assigned users'
        4. [Delete]
            'Task can only deleted by assigned user or creator'
        5. [Comment]
            'Users can comment on task and creator along with assigned users will get notification'
  -Task Status
        1. [List] 
            'All created task status are shown there with pagination'
        2. [Create] 
            'Task status Create Form'
        3. [Edit]  
            'Task status Edit form'
        5. [DELETE]  
            'Task status delete'
```