# Topcoder - Submission Review App UI 

### Requirements

Node.js 10.15+

### Dependencies

To install dependencies run
```bash
npm install
```

### Development

To run the app in development mode run
```bash
npm start
```
You can access the app from [http://localhost:3000](http://localhost:3000)

The page will reload if you make edits.

You will also see any lint errors in the console.

### Lint check

To test the app for lint errors

```bash
npm run lint
```

*Use the `--fix` flag to automatically fix errors.*

### Production

To build the app for production

```bash
npm run build
```

Builds the app for production to the `build` folder.

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

If you want to test to production build locally you can run

```bash
npm install -g serve
serve -s build
```

It serves the build folder locally.

### Heroku Deployment

To deploy the app on heroku run

```bash
git init
heroku create tc-submission-review-app --buildpack mars/create-react-app
git add .
git commit -m "Heroku commit"
git push heroku master
```

You can access the app by running 
```bash
heroku open
```
