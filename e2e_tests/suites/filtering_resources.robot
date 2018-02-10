*** Settings ***
Documentation   A resource file with reusable keywords and variables for filtering tests

*** Variables ***
${FILTER_BUTTON}=   class:filter-button

*** Keywords ***
User Selects vehicle filter
  [Arguments]  ${type}  ${ctrl}=
  Execute Javascript  window.document.querySelector('.filter-button.' + '${type}').dispatchEvent(new MouseEvent('click', { ctrlKey: '${ctrl}', bubbles: true }))

Vehicle Filter Should Be Selected
  [Arguments]  ${type}
  Run Keyword If  '${type}' == 'ALL'  All Filters Should Be Selected  ELSE  Single Filter Should Be Selected  ${type}

Single Filter Should Be Selected
  [Arguments]  ${type}
  Element Should Be Visible  css:.filter-button.${type}.toggled

All Filters Should Be Selected
  ${count}=  Get Element Count  css:.filter-button.toggled
  Should Be Equal  ${count}  ${5}

Vehicle Filter Count Should Be
  [Arguments]  ${count}
  ${elementCount}=  Get Element Count  ${FILTER_BUTTON}.toggled
  Should Be True  ${count} == ${elementCount}
