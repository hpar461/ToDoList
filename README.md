# CS732 Quiz Part A - Push the Button
For this test, you will demonstrate your knowledge of all aspects of the MERN stack, by building an extremely simple web application - "Push the Button".

A very barebones skeleton for the frontend and backend has been provided to you. You must implement the majority of the code yourself to meet the requirements set out in this README.

Completion of the requirements in Part A are worth 40 marks and 50% of your grade for the quiz, which is in turn worth 20% of your overall grade for the course (this means Part A is worth 10% of your overall grade, and that parts A and B of this quiz are weighted equally).

## Submission instructions
To submit, Zip up your project contents and upload the Zip file to Canvas at or before the due date / time.

**Notes:**

- Do **not** include any `node_modules` or `.git` folders. If you do, you will receive an automatic 50% penalty for Part A.

- Make sure your completed `test-part-b.docx` file is included in the Zip, or you risk getting 0 marks for Part B.

## Requirements
This section details the requirements for the "Push the Button" webapp you must develop for Part A, along with the marks each requirement is worth.

Overall, the webapp should render a graphical representation of a button, which is either pressed or unpressed. Clicking the button should toggle its state. The state of the button should be stored in a MongoDB database, and can be accessed / changed via a RESTful (or REST-like) API over HTTP.

1. **MongoDB schema (5 marks):** Devise a mongoose / MongoDB schema for a button. Buttons can be pressed or unpressed.

2. **Backend API (5 marks):** Your backend API, built using Express, should contain at least two endpoints:

   - Getting the state of the button

   - Setting or toggling the state of the button

3. **Backend unit tests (5 marks):** Unit tests for your backend should test that all of your API methods perform the required updates to the database (if any), and return the correct information to the client.

4. **Frontend UI (5 marks):** A button should be created using React, which can be either pressed or unpressed. The button should look visually obviously different depending on what state it is in. Images have been included in [frontend/public](./frontend/public) which can be used if desired.

5. **Frontend unit tests (5 marks):** Unit tests for your frontend should test that the button is rendered correctly in both pressed and unpressed states.

6. **Frontend-backend connectivity (5 marks):** Your frontend should call your backend API appropriately.

7. **Code style (5 marks):** Both your frontend and backend should follow good code style / practices / appropriate use of the features of the frameworks being used, as shown in lecture videos / given in examples.

8. **Something extra (5 marks):** Add something extra to your webapp to allow it to stand out. Comment on the extra feature / improvement / etc you've added here:

```
Your answer here.
```

**Note:** The extra feature doesn't have to be massive (around fifteen minutes of effort should suffice).
