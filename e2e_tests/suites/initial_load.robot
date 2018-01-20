*** Settings ***
Documentation     A test suite testing initial load.
Resource          resource.robot
Test Teardown     Close Browser

*** Test Cases ***
Open front page
    Given Browser is opened without location
    Then front page should be open
        accuracy should be hidden
        departures should be loading
        range should be    400
        favourite button should be disabled
        address should be    ${EMPTY}
        error should not be visible

*** Keywords ***
.. User "${username}" logs in with password "${password}"
    Input username    ${username}
    Input password    ${password}
    Submit credentials
