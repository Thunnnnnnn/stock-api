# README
### Overview
This program is a Node.js application designed to handle financial data retrieval based on a given type (name or symbol). It processes HTTP requests and provides results based on the query parameters passed in the request.

## Prerequisites
1. Node.js Version: This application requires Node.js v18.20.4 or higher.

## Installation
1. Node.js Version:
 **This application requires Node.js v18.20.4** or higher.  

    if you install node success you can check version by running:

        node -v
      
2. Install Dependencies:
Navigate to the project directory and install all required modules by running:

       npm install

### Usage
1. Start the Application:
Run the application in development mode using:

       npm run start:dev

2. API Endpoint:
   
Path: /finance

Query Parameters: type: Specifies the search type. 
  
  Acceptable values are:
  
  - name: Search by company name.
   
  - symbol: Search by stock symbol.
  
  name: The specific name or symbol to search for (depending on the type value).

### EX.
    http://localhost:3000/finance?type=symbol&name=AAPL 
    
    http://localhost:3000/finance?type=name&name=Apple
