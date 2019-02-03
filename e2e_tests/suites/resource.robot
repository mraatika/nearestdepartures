*** Settings ***
Documentation   A resource file with reusable keywords and variables.
...
...         The system specific keywords created here form our own
...         domain specific language. They utilize keywords provided
...         by the imported Selenium2Library.
Library       Selenium2Library

*** Variables ***
${SERVER}     localhost:3000
${BROWSER}    Chrome
${DELAY}      0
${URL}        http://${SERVER}/

${LOADING_OVERLAY}      css:.departures-list>.loading-overlay
${ACCURACY_INDICATOR}   class:location-accuracy
${ADDRESS_INPUT}        css:.address-search>input
${FAVOURITE_TOGGLE}     class:favourites-toggle
${SEARCH_BUTTON}        class:address-search-submit
${SUGGESTION_LIST}      id:suggestions-list

*** Keywords ***
Accuracy Should Be Hidden
  Element Should Not Be Visible  ${ACCURACY_INDICATOR}

Accuracy Should Be Visible
  Element Should Be Visible  ${ACCURACY_INDICATOR}

Address Should Be
  [Arguments]  ${address}
  Textfield Value Should Be  ${ADDRESS_INPUT}  ${address}

Address Should Have Value
  Should Not Be Equal  Get Value  ${ADDRESS_INPUT}  ${EMPTY}

Browser is opened without location
  Open Browser  ${URL}  Firefox
  Maximize Browser Window
  Set Selenium Speed  ${DELAY}

Browser is opened with location
  Open Browser  ${URL}  Chrome
  Maximize Browser Window
  Set Selenium Speed  ${DELAY}

Departures List Should Not Be Empty
  ${count}=  Get Element Count  css:li.departures-list-row-container
  Should Be True  ${count} > 0

Departures Should Be Loading
  Wait Until Element Is Visible  ${LOADING_OVERLAY}

Error Should Not Be Visible
  Element Should Not Be Visible  class:error-message

Error Should Be
  [arguments]  ${value}
  Element Should Be Visible  class:error-message
  Element Text Should Be  ${value}

Favourite Button Should Be Disabled
  Element Should Be Disabled  ${FAVOURITE_TOGGLE}

Favourite Button Should Not Be Disabled
  Element Should Be Enabled  ${FAVOURITE_TOGGLE}

Front Page Should Be Open
  Title Should Be  Julkisilla.info - löydä lähimmät julkisen liikenteen lähdöt helposti!

Loading Is Done
  Wait Until Element Is Not Visible  ${LOADING_OVERLAY}

Range Should Be
  [Arguments]  ${range}
  Element Text Should Be  xpath://div[contains(@class, 'range-filter-wrapper')]//output  ${range}m

Suggestion List Contains
  [Arguments]    ${value}
  Element Should Be Visible    xpath://li[contains(.//div[contains(@class, 'suggestion-name')], '${value}')]

Suggestion List Is hidden
  Wait Until Element Is Not Visible  ${SUGGESTION_LIST}

User Has Searched For
  [Arguments]  ${address}  ${skipWaitForLoadingDone}= 'false'
  User Has Entered Search Value  ${address}  ${skipWaitForLoadingDone}
  User Clicks Suggestion  ${address}
  Loading Is Done

User Clicks Suggestion
  [Arguments]    ${value}
  Wait For Suggestion List
  Suggestion List Contains    ${value}
  Click Element    xpath://li[contains(.//div[contains(@class, 'suggestion-name')], '${value}')]

User Has Entered Search Value
  [Arguments]  ${address}  ${skipWaitForLoadingDone}= 'false'
  Run Keyword Unless  ${skipWaitForLoadingDone} == 'false'  Loading Is Done
  Input Text  ${ADDRESS_INPUT}  ${address}

User Clicks Clear button
  Click Button  class:address-search-clear

User Clicks Search button
  Click Button  ${SEARCH_BUTTON}

Wait For Suggestion List
  Wait Until Element Is Visible    ${SUGGESTION_LIST}
