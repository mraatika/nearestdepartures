*** Settings ***
Documentation     Test departure row functionality

Resource          resource.robot
Test Setup        Browser is opened without location
Test Teardown     Close Browser

*** Variables ***
${ADDITIONAL_INFO_SECTION}=  xpath=//ul[@class="departures-list-body"]/li[1]/div[contains(@class, 'departures-list-row-additional-info')]

*** Test Cases ***
User opens an additional info section
  Given user has searched for  Porvoonkatu, Helsinki
  When user clicks first row
  Then additional info section is shown
  And additional info section should have focus

# @TODO: Second click is not firing
# User closes the additional info section
#  Given user has searched for  Porvoonkatu, Helsinki
#  When user clicks first row
#  And Additional info section is shown
#  And user clicks first row
#  Then additional info section is not shown

User opens an additional info section after another
  Given user has searched for  Porvoonkatu, Helsinki
  When user clicks first row
  And user clicks second row
  Then additional info section is not shown

User opens an additional info section using keyboard
  Given user has searched for  Porvoonkatu, Helsinki
  When user presses enter on row
  Then additional info section is shown
  And additional info section should have focus

User closes the additional info section using enter key
  Given user has searched for  Porvoonkatu, Helsinki
  And user presses enter on row
  When user presses enter on row
  Then additional info section is not shown

User closes the additional info section using escape key
  Given user has searched for  Porvoonkatu, Helsinki
  And user presses enter on row
  When Additional info section is shown
  And user presses esc on additional info section
  Then additional info section is not shown


*** Keywords ***
User clicks first row
  Click Element  xpath=//ul[@class="departures-list-body"]/li[1]

User clicks second row
  Click Element  xpath=//ul[@class="departures-list-body"]/li[2]

User presses enter on row
  Press Key  xpath=//ul[@class="departures-list-body"]/li[1]/div[@class="departures-list-row"]  \\13

User presses esc on additional info section
  Press Key  ${ADDITIONAL_INFO_SECTION}  \\27

Additional info section is shown
  Wait Until Element Is Visible  ${ADDITIONAL_INFO_SECTION}

Additional info section is not shown
  Wait Until Element Is Not Visible  ${ADDITIONAL_INFO_SECTION}

Additional info section should have focus
  Element Should Be Focused  ${ADDITIONAL_INFO_SECTION}
