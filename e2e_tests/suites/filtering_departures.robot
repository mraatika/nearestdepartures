*** Settings ***
Documentation     Test filtering departures with range and vehicle filter
...
Resource          resource.robot
Resource          filtering_resources.robot
Test Setup        Browser is opened without location
Test Teardown     Close Browser

*** Test Cases ***
User changes range
  ${range}=  Set Variable  600
  Given user has searched for    Porvoonkatu, Helsinki
  When user changes range to  ${range}
  Then range output is  ${range}

User changes range and reloads the page
  ${range}=  Set Variable  600
  Given user has searched for  Porvoonkatu, Helsinki
  When user changes range to  ${range}
  And Reload Page
  Then range should be  ${range}

User selects a vehicle filter and reloads the page
  ${type}=  Set Variable  bus
  Given user has searched for  Porvoonkatu, Helsinki
  When user selects vehicle filter  ${type}
  And Reload Page
  Then Vehicle Filter Should Be Selected  ${type}
  And Vehicle Filter Count Should Be  1

*** Keywords ***
User Changes Range to
  [Arguments]  ${range}
  Execute Javascript  window.document.querySelector('[type=range]').value = ${range}
  Execute Javascript  window.document.querySelector('[type=range]').dispatchEvent(new Event('input'))

User Selects Suggestion With Keyboard
  [Arguments]    ${value}    ${key}
  Wait For Suggestion List
  Press Key    ${ADDRESS_INPUT}    \\40
  Press Key    ${ADDRESS_INPUT}    ${key}

Range Output is
  [Arguments]  ${range}
  Element Text Should Be  css:.range-filter-wrapper>output  ${range}m
