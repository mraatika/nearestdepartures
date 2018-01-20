*** Settings ***
Documentation     Test address lookup
...
Library           MyLib.py
Resource          resource.robot
Test Setup        Browser is opened without location
Test Teardown     Close Browser

*** Test Cases ***
User changes range
  ${suggestion}=    Set Variable    Porvoonkatu, Helsinki
  Given user has searched for    ${suggestion}
#  When user changes range to  600


*** Keywords ***
User Changes Range to
  [Arguments]  ${range}
  Set Range  css:[name='range']  range

User Selects Suggestion With Keyboard
  [Arguments]    ${value}    ${key}
  Wait For Suggestion List
  Press Key    ${ADDRESS_INPUT}    \\40
  Press Key    ${ADDRESS_INPUT}    ${key}