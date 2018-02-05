*** Settings ***
Documentation     Test adding and using favourites feature
...
Resource          resource.robot
Resource          filtering_resources.robot
Test Setup        Browser is opened without location
Test Teardown     Close Browser
Test Template     Filter By Type

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
  user selects vehicle filter  ${type}
  vehicle filter should be selected  ${type}
  vehicle filter count should be  1
  list should only contain departures of type  ${type}

List Should Only Contain Departures Of type
  [Arguments]  ${type}
  ${list_rows}=  Get Element Count  //li[@class='departures-list-row-container']
  :FOR  ${i}  IN RANGE  1  ${list_rows}+1
  \  ${class}=  Get Element Attribute  //li[@class='departures-list-row-container'][${i}]/div/div[@class='routename']/a/span  class
  \  Should Be True  '${class}' == '${type}'
