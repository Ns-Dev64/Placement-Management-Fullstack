# Placement Management and Cell

So there are 2 requirements aka node and react and the react one being in the "Frontend" folder, you can install the node and react requirements using the following commands:

## Node:
To install all the necessary packages u can either install em seperately from the requirements file or run this command in ur powershell: Get-Content nodeRequirements.txt | ForEach-Object { npm install $_ } 

## React (in the "Frontend" folder):
To install all the necessary packages u can either install em seperately from the requirements file or run this command in ur powershell: Get-Content reactRequirements.txt | ForEach-Object { npm install $_ } 

## To run the server type : npm run dev (in the root folder)

## To run the client type: npm start (in the z folder)
