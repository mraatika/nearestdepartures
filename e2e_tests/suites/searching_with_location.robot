*** Settings ***
Documentation     Test searching departures with location.
...
Resource          resource.robot
Test Teardown     Close Browser

*** Test Cases ***
Search using location
    Given Browser is opened with location
    When loading is done
    Then accuracy should be visible
        address should have value
        favourite button should not be disabled