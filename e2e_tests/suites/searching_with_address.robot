*** Settings ***
Documentation     Test address lookup
...
Resource          resource.robot
Test Setup        Browser is opened without location
Test Teardown     Close Browser

*** Test Cases ***
User selects a suggestion by clicking
  ${suggestion}=    Set Variable    Porvoonkatu, Helsinki
  Given user has entered search value    porvoon
  When user clicks suggestion    ${suggestion}
  And loading is done
  And suggestion list is hidden
  Then address should be    ${suggestion}
  And departures list should not be empty

# TODO: How to simulate down arrow key press
# User selects a suggestion with keyboard
#  ${suggestion}=    Set Variable    Porvoonkatu, Helsinki
#  Given user has entered search value    Porvoonkatu,
#  When user selects suggestion with keyboard    ${suggestion}    \\13
#  And loading is done
#  And suggestion list is hidden
#  Then address should be    ${suggestion}
#  And departures list should not be empty

# TODO: Search is too quick so address changes before validation, needs some delay
# User searches with a search term without selecting a suggestion
#  ${term}=    Set Variable    Adelen
#  Given User Has Searched For    ${term}
#  And loading is done
#  Then address should be    ${term}
#  And departures list should not be empty

User clears the address search
  Given user has entered search value    Jokitie
  When user clicks clear button
  Then address should be    ${EMPTY}

*** Keywords ***
User Selects Suggestion With Keyboard
  [Arguments]    ${value}    ${key}
  Wait For Suggestion List
  Press Key    ${ADDRESS_INPUT}    \\40
  Press Key    ${ADDRESS_INPUT}    ${key}