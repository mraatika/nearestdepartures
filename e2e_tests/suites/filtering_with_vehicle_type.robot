*** Settings ***
Documentation     Test adding and using favourites feature
...
Resource          resource.robot
Test Setup        Browser is opened without location
Test Teardown     Close Browser
Test Template     Filter By Type

*** Variables ***
${FILTER_BUTTON}=   class:filter-button

*** Test Cases ***
Selecting Bus Filter  bus  Porvoonkatu 1, Helsinki
Selecting Tram Filter  tram  Porvoonkatu 1, Helsinki
Selecting Rail Filter  rail  Pasilan asema
Selecting Subway Filter  subway  Metro Sörnäinen
Selecting Ferry Filter  ferry  Kauppatori

*** Keywords ***
Filter By type
  [Arguments]  ${type}  ${address}
  user has searched for  ${address}
  departures list should not be empty
  user selects filter  ${type}
  filter should be selected  ${type}
  filter count should be  1
  list should only contain departures of type  ${type}

User Selects filter
  [Arguments]  ${type}
  Click Element  css:.filter-button.${type}

Filter Should Be Selected
  [Arguments]  ${type}
  Element Should Be Visible  css:.filter-button.${type}.toggled

Filter Count Should Be
  [Arguments]  ${count}
  ${elementCount}=  Get Element Count  ${FILTER_BUTTON}.toggled
  Should Be True  ${count} == ${elementCount}

List Should Only Contain Departures Of type
  [Arguments]  ${type}
  ${list_rows}=  Get Element Count  //li[@class='departures-list-row-container']
  :FOR  ${i}  IN RANGE  1  ${list_rows}+1
  \  ${class}=  Get Element Attribute  //li[@class='departures-list-row-container'][${i}]/div/div[@class='routename']/a/span  class
  \  Should Be True  '${class}' == '${type}'
