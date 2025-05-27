-- Time Attendance System Database Schema

-- Account table for user authentication and roles
CREATE TABLE Account (
    account_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50),
    status VARCHAR(50)
);

-- Employee table with personal and professional information
CREATE TABLE Employee (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    gender VARCHAR(10),
    dob DATE,
    email VARCHAR(100),
    phone VARCHAR(20),
    address VARCHAR(255),
    department VARCHAR(100),
    account_id INT,
    FOREIGN KEY (account_id) REFERENCES Account(account_id)
);

-- Request table for managing employee requests
CREATE TABLE Request (
    request_id INT PRIMARY KEY AUTO_INCREMENT,
    request_type VARCHAR(50),
    datetime DATETIME,
    reason TEXT,
    status ENUM('pending', 'approved', 'rejected'),
    response_by INT,
    response_time DATETIME,
    response_note TEXT,
    employee_id INT,
    account_id INT,
    FOREIGN KEY (response_by) REFERENCES Account(account_id),
    FOREIGN KEY (employee_id) REFERENCES Employee(employee_id),
    FOREIGN KEY (account_id) REFERENCES Account(account_id)
);

-- TimeSheet table for tracking employee attendance
CREATE TABLE TimeSheet (
    timesheet_id INT PRIMARY KEY AUTO_INCREMENT,
    checkin_time DATETIME,
    checkout_time DATETIME,
    method ENUM('face', 'manual'),
    date DATE,
    employee_id INT,
    FOREIGN KEY (employee_id) REFERENCES Employee(employee_id)
);

-- Schedule table for managing employee schedules
CREATE TABLE Schedule (
    schedule_id INT PRIMARY KEY AUTO_INCREMENT,
    date DATE,
    note TEXT,
    employee_id INT,
    FOREIGN KEY (employee_id) REFERENCES Employee(employee_id)
);

-- Shift table for defining work shifts
CREATE TABLE Shift (
    shift_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    start_time TIME,
    end_time TIME,
    schedule_id INT,
    FOREIGN KEY (schedule_id) REFERENCES Schedule(schedule_id)
);

-- Recruitment table for managing job postings
CREATE TABLE Recruitment (
    recruit_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100),
    description TEXT,
    post_date DATE,
    close_date DATE,
    status VARCHAR(50),
    account_id INT,
    FOREIGN KEY (account_id) REFERENCES Account(account_id)
);

-- SummaryReport table for generating reports
CREATE TABLE SummaryReport (
    report_id INT PRIMARY KEY AUTO_INCREMENT,
    period_start DATE,
    period_end DATE,
    created_at DATETIME,
    account_id INT,
    FOREIGN KEY (account_id) REFERENCES Account(account_id)
); 


INSERT INTO Account (username, password, role, status) VALUES
('employee@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J2YrInzty', 'Employee', 'active'),    -- password: 123456
('manager@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J2YrInzty', 'Department Manager', 'active'),    -- password: 123456
('hr@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J2YrInzty', 'HR', 'active'),    -- password: 123456
('admin@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J2YrInzty', 'Administrator', 'active');    -- password: 123456
