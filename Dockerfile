# 1. Use the official Node.js image
FROM node:18-alpine

# 2. Set the working directory in the container
WORKDIR /app

# 3. Copy the package.json and package-lock.json to install dependencies
COPY package*.json ./

# 4. Install dependencies
RUN npm install


# 5. Copy the rest of the application code
COPY . .

# 6. Expose the port that the React app will run on
EXPOSE 3000

# 7. Run the app using the default React development server
CMD ["npm", "start"]


