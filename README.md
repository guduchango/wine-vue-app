# Wine Vue App

A simple app to store and manage details about wines, such as name, country, vintage, variety, and winery.  
This application allows users to add, edit, and filter wines by different attributes.

## Features

- Add and edit wine entries.  
- Filter wines by name, country, and variety.  
- View a list of wines with basic information.  
- Shared form for creating and editing.  
- Filters panel toggle.  

## Project Structure

```
wine-vue-app/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   └── WineForm.vue
│   ├── views/
│   │   ├── WineFormView.vue
│   │   └── WineListView.vue
│   ├── stores/
│   │   └── wines.js
│   ├── App.vue
│   ├── main.js
│   └── router.js
├── index.html
├── package.json
└── vite.config.js
```

## Technologies Used

- **Vue 3** — Composition API  
- **Vite** — Frontend build tool for fast development  
- **Pinia** — State management for Vue  
- **Vue Router** — Client-side routing  

## How to Run

1. Clone the repository:  
   ```bash
   git clone git@github.com:guduchango/wine-vue-app.git
   cd wine-vue-app
   ```

2. Install dependencies:  
   ```bash
   npm install
   ```

3. Run the development server:  
   ```bash
   npm run dev
   ```
