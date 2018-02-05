*** Settings ***
Documentation     Test adding and using favourites feature
...
Resource          resource.robot
Test Setup        Browser is opened without location
Test Teardown     Close Browser

*** Variables ***
${MODAL_TOGGLE}  class:favourites-open
${REMOVE_FAVOURITE_BUTTON}  class:favouriteslist-item-remove

*** Test Cases ***
Adding a favourite
  ${address}=  Set Variable  Porvoonkatu 1, Helsinki
  Given user has searched for  ${address}
  When user adds current address to favourites
  Then favourites button should be toggled
  And favourites list should contain  ${address}

Searching with favourite
  ${address}=  Set Variable  Porvoonkatu 1, Helsinki
  Given user has favoured address  ${address}
  When user clicks clear button
  And user selects favourite  ${address}
  And loading is done
  Then address should be  ${address}
  And departures list should not be empty

Removing a favourite from modal
  ${address}=  Set Variable  Porvoonkatu 1, Helsinki
  Given user has favoured address  ${address}
  When open favourites
  And user clicks remove button
  Then favourites list should be empty
  And favourites button should not be toggled

Removing a favourite using toggle
  ${address}=  Set Variable  Porvoonkatu 1, Helsinki
  Given user has favoured address  ${address}
  When toggle favourite
  And open favourites
  Then favourites list should be empty
  And favourites button should not be toggled

*** Keywords ***
Favourites Button Should Be Toggled
  ${condition}=    Get Element Attribute    ${FAVOURITE_TOGGLE}    aria-pressed
  Element Text Should Be    ${FAVOURITE_TOGGLE}    ★
  Should Be Equal    true    ${condition}

Favourites Button Should Not Be Toggled
  ${condition}=    Get Element Attribute    ${FAVOURITE_TOGGLE}    aria-pressed
  Element Text Should Be    ${FAVOURITE_TOGGLE}    ☆
  Should Be Equal    false    ${condition}

Favourites List Should Be Empty
  ${count}=  Get Element Count  class:favouriteslist-item

Favourites List Should Contain
  [Arguments]    ${entry}
  Open Favourites
  Element Text Should Be  class:favouriteslist-item-label  ${entry}

Get Current Address
  Get Value  ${ADDRESS_INPUT}

Open Favourites
  Click Button    ${MODAL_TOGGLE}
  Wait Until Element Is Visible    class:favouriteslist

User Adds Current Address To Favourites
  Favourite Button Should Not Be Disabled
  Toggle Favourite

User Clicks Remove Button
  Click Button  ${REMOVE_FAVOURITE_BUTTON}

User Has Favoured Address
  [Arguments]    ${entry}
  User Has Searched For  ${entry}
  Loading Is Done
  User Adds Current Address To Favourites

User Selects Favourite
  [Arguments]    ${entry}
  Open Favourites
  Click Element  xpath://li[contains(.//div[@class='favouriteslist-item-label']/button, '${entry}')]

Toggle Favourite
  Click Button    ${FAVOURITE_TOGGLE}