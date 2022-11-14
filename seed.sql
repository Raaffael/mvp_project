CREATE TABLE course (
    course_id SERIAL PRIMARY KEY,
    name VARCHAR(60),
    credits INT,
    description TEXT
);
CREATE TABLE registration (
    reg_id SERIAL,
    date_registered DATE,
    paid BOOLEAN,
    course_id INT,
    CONSTRAINT fk_course
        FOREIGN KEY(course_id)
            REFERENCES course(course_id)
);
