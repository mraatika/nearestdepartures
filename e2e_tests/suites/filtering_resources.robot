*** Settings ***
Documentation   A resource file with reusable keywords and variables for filtering tests

*** Variables ***
${FILTER_BUTTON}=   class:filter-button

*** Keywords ***
User Selects vehicle filter
  [Arguments]  ${type}
  Click Element  css:.filter-button.${type}

Vehicle Filter Should Be Selected
  [Arguments]  ${type}
  Element Should Be Visible  css:.filter-button.${type}.toggled

Vehicle Filter Count Should Be
  [Arguments]  ${count}
  ${elementCount}=  Get Element Count  ${FILTER_BUTTON}.toggled
  Should Be True  ${count} == ${elementCount}
