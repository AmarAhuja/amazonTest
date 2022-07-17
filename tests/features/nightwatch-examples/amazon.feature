Feature: End to end tests

Scenario: navigate to amazon.in
  Given user navigates amazon page
  Then Body contains "Amazon"

Scenario: Searching the iphone13
  Given user on home page
  When user search "iphone 13"
  Then apply filter 128GB memory

Scenario: Searching the text from results
  Given Results are displayed
  Then using for loop extract iphone13 pink 128GB
  # //And extract price for the same
  # //And click on the matched result
  
Scenario: compare the price
  Given redirected to product page 
  Then extract price to pay
  