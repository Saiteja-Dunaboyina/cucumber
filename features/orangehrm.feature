Feature: This is orangehrm website
    Scenario Outline: As a Admin,I can login into a secure area.
        Given I am on the login page
        When I am login with valid username and passsword
        Then I should navigate to home page
        And click on the profile pic
        Then click on the logout button

    Scenario Outline: As a Admin,I can click on the PIM button and add the employee.
        Given I am on the login page
        When I am login with valid username and passsword
        Then I can see the PIM button
        When I click on that buttonn I have navigated to PIM page
        Then I can add an employee
        Then I can see the employee name
        And click on the profile pic
        Then click on the logout button

    Scenario Outline: As a admin,I can click the Buzz option and edit the post.
        Given I am on the login page
        When I am login with valid username and passsword
        Then I can see the Buzz button
        When I click on that button I have navigated to Buzz page
        Then I click on the three dots
        Then I can see the edit post button
        And I click on it, It will open the post for edit
        And click on the profile pic
        Then click on the logout button
        

    