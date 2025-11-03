# Usability Evaluation, Iteration, and Demonstration
## Usability Test Plan
### Research Objectives
 The main goal of this usability test is to servey how work, easy, safety and usefull it is for students to use the FUSS website. This test will help find any problems that make it hard for users to move around the site, complete tasks, or understand the system’s feedback messages.
1. **Validate end-to-end workflows**: Assess registration, skill browsing, service requests, messaging, and credit deductions with ≥90% success.
2. **Measure efficiency and errors**: Track time-on-task, error recovery in backend operations (e.g., credit updates via MySQL).
3. **Assess information hierarchy**:Test whether key pages (Dashboard, Credits, Profile) follow a logical and discoverable structure within ≤ 3 clicks.
4. **Verify secure authentication flow**: Ensure registration and login correctly implement salted password hashing, secure sessions, and auto-timeout.
5. **Examine database transaction safety**: Introduce simultaneous write operations (e.g., concurrent credit transfers) to test MySQL transaction isolation and rollback reliability.
### Description of 5 Student Recruitment
| ID | Major|
| -- | -----|
|CAO0262| IT|
|alab0073| IT|
|suneha | IT |
|vu0168| IT |
|ahmc0423| Artificial Intelligence |
### Tasks (Frontend & Backend-Integrated)
Participants will perform five core tasks that cover both the front-end interface and PHP/MySQL backend:
1. Users can register a new account.
- From the login page, navigate to the user registration page.
- Fill in given user details (Flinders email, password, first/last name).
- Register account.
2. Users can reset their account password.
- From the login page, navigate to the password reset page.
- Fill in given email and new password details.
- Reset password.
3. Providers can add a new skill offering.
- From the provider dashboard, navigate to the "Add Skill" section.
- Enter given skill name, category, rating, description.
- Submit the new skill.
4. Students can request a skill service and pay with credits.
- From the browse skills page, select a skill (e.g., "Python Programming").
- Choose duration and confirm credit cost.
- Submit request and deduct credits.
5. Admins can view user activity logs.
- From the admin dashboard, select a user (e.g., by email).
- View recent activities (requests, messages, reviews).
- Export log if needed
### Methodology
- **Pre-test**: Demographics questionnaire 
- **During**: Think-aloud; screenshort; observation notes; backend logs for errors/latency.
- **Post-task**: SEQ (1-7 difficulty/confidence).
- **Post-session**: SUS; open-ended interview.
- **Tools**: in person, Google Forms.
### Metrics Suscess
| Metric | Target |
|--------|--------|
| **Completion** | ≥90% |
| **SUS Avg** | ≥78 |
| **SEQ Avg** | ≥6/7 |
| **Time-on-Task** | ≤60s avg |
| **Errors** | ≤1/user
## Testing Summary and Analysis
## Iteration Description
![alt text](credits.png)
![alt text](Dashboard.png)
![alt text](skill.png)
![alt text](profile.png)
## Appendix

