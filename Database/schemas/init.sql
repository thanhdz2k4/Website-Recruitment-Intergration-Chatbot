-- ========================
-- 1. Bảng company
-- ========================
CREATE TABLE company (
    company_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    website VARCHAR(255),
    logo_url TEXT NOT NULL,
    size VARCHAR(100) NOT NULL,
    description TEXT
);

-- ========================
-- 2. Bảng industry
-- ========================
CREATE TABLE industry (
    industry_id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

-- ========================
-- 3. Bảng account_type
-- ========================
CREATE TABLE account_type (
    account_type_id SERIAL PRIMARY KEY,
    role_name VARCHAR(100) NOT NULL CHECK (role_name IN ('Admin','Employer','Seeker'))
);

-- ========================
-- 4. Bảng account
-- ========================
CREATE TABLE account (
    account_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('active','inactive','banned')),
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    gender VARCHAR(10) CHECK (gender IN ('Male','Female','Other')),
    date_of_birth DATE,
    phone_number VARCHAR(11) CHECK (phone_number ~ '^[0][0-9]{9,10}$'),
    company_id INT REFERENCES company(company_id)
);

-- ========================
-- 5. Bảng account_account_type
-- ========================
CREATE TABLE account_account_type (
    account_id INT NOT NULL REFERENCES account(account_id),
    account_type_id INT NOT NULL REFERENCES account_type(account_type_id),
    PRIMARY KEY (account_id, account_type_id)
);

-- ========================
-- 6. Bảng address
-- ========================
CREATE TABLE address (
    address_id SERIAL PRIMARY KEY,
    company_id INT NOT NULL REFERENCES company(company_id),
    address_detail VARCHAR(255) NOT NULL
);

-- ========================
-- 7. Bảng company_industry
-- ========================
CREATE TABLE company_industry (
    company_id INT NOT NULL REFERENCES company(company_id),
    industry_id INT NOT NULL REFERENCES industry(industry_id),
    PRIMARY KEY (company_id, industry_id)
);

-- ========================
-- 8. Bảng job_posting
-- ========================
CREATE TABLE job_posting (
    job_posting_id SERIAL PRIMARY KEY,
    account_id INT NOT NULL REFERENCES account(account_id),
    company_id INT NOT NULL REFERENCES company(company_id),
    position_name VARCHAR(255) NOT NULL,
    job_description TEXT,
    requirements TEXT,
    salary NUMERIC CHECK (salary >= 0),
    deadline DATE CHECK (deadline > CURRENT_DATE),
    experience_years INT CHECK (experience_years >= 0),
    education_level VARCHAR(100) CHECK (education_level IN ('No Requirements','High School','College','University')),
    benefits TEXT,
    working_time VARCHAR(100),
    status VARCHAR(10) CHECK (status IN ('open','closed'))
);

-- ========================
-- 9. Bảng work_type
-- ========================
CREATE TABLE work_type (
    work_type_id SERIAL PRIMARY KEY,
    job_posting_id INT NOT NULL REFERENCES job_posting(job_posting_id),
    work_type_name VARCHAR(100) NOT NULL CHECK (work_type_name IN ('Full-time','Part-time','Remote','Internship'))
);

-- ========================
-- 10. Bảng job_posting_industry
-- ========================
CREATE TABLE job_posting_industry (
    job_posting_id INT NOT NULL REFERENCES job_posting(job_posting_id),
    industry_id INT NOT NULL REFERENCES industry(industry_id),
    PRIMARY KEY (job_posting_id, industry_id)
);

-- ========================
-- 11. Bảng skill
-- ========================
CREATE TABLE skill (
    skill_id SERIAL PRIMARY KEY,
    skill_name VARCHAR(100) NOT NULL
);

-- ========================
-- 12. Bảng job_posting_skill
-- ========================
CREATE TABLE job_posting_skill (
    job_posting_id INT NOT NULL REFERENCES job_posting(job_posting_id),
    skill_id INT NOT NULL REFERENCES skill(skill_id),
    PRIMARY KEY (job_posting_id, skill_id)
);

-- ========================
-- 13. Bảng cv
-- ========================

CREATE TABLE cv (
    cv_id SERIAL PRIMARY KEY,
    account_id INT NOT NULL REFERENCES account(account_id),
    cv_link TEXT NOT NULL,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE,
    years_experience INT CHECK (years_experience >= 0),
    education_level VARCHAR(100) CHECK (education_level IN ('No Requirements','High School','College','University'))
);

-- ========================
-- 14. Bảng cv_skill
-- ========================
CREATE TABLE cv_skill (
    cv_id INT NOT NULL REFERENCES cv(cv_id),
    skill_id INT NOT NULL REFERENCES skill(skill_id),
    PRIMARY KEY (cv_id, skill_id)
);

-- ========================
-- 15. Bảng job_application
-- ========================
CREATE TABLE job_application (
    job_application_id SERIAL PRIMARY KEY,
    account_id INT NOT NULL REFERENCES account(account_id),
    job_posting_id INT NOT NULL REFERENCES job_posting(job_posting_id),
    cv_id INT NOT NULL REFERENCES cv(cv_id),
    cover_letter TEXT NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('pending','accept','reject')),
    submitted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    file_upload VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL
);

-- ========================
-- 16. Bảng invoice
-- ========================
CREATE TABLE invoice (
    invoice_id SERIAL PRIMARY KEY,
    account_id INT NOT NULL REFERENCES account(account_id),
    card_number VARCHAR(20) NOT NULL,
    description TEXT NOT NULL,
    amount NUMERIC(15,2) NOT NULL CHECK (amount >= 10000),
    bank_name VARCHAR(100) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    payment_status VARCHAR(50) NOT NULL CHECK (payment_status IN ('completed','unfinished')),
    transaction_code VARCHAR(50) NOT NULL
);

-- ========================
-- 17. Bảng message
-- ========================
CREATE TABLE message (
    message_id SERIAL PRIMARY KEY,
    account_id INT NOT NULL REFERENCES account(account_id),
    message_account TEXT NOT NULL,
    message_ai TEXT NOT NULL
);

-- ========================
-- 18. Bảng user_guide
-- ========================
CREATE TABLE user_guide (
    guide_id SERIAL PRIMARY KEY,
    guide_title TEXT NOT NULL,
    guide_content TEXT NOT NULL,
    updated_at DATE NOT NULL DEFAULT CURRENT_DATE
);

-- ========================
-- 19. Bảng contact_info
-- ========================
CREATE TABLE contact_info (
    contact_id SERIAL PRIMARY KEY,
    account_id INT NOT NULL REFERENCES account(account_id),
    contact_detail VARCHAR(255) NOT NULL
);
