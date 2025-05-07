# simple-text-analyzer

**Project Description**
A simple text analysis tool built with Node.js, Express, and TypeScript. The application can read, write, update, and delete texts from the database and provides detailed text analytics such as word count, character count, sentence count, paragraph count, and longest words per paragraph.

# Download and run MySQL docker instance
docker run --name mysql-text-analyzer -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=text_analyzer -p 3306:3306 -d mysql:latest