# AutoCompleteVueJs

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### How to use
```
<auto-complete uri='URI' keyMatch="Key" v-bind:maxInputTags=2 v-bind:requestDelay=500 />
```

### Props
```
uri: `STRING`, `VALID_URL`, `REQUIRED`
keyMatch: `STRING`, `REQUIRED`
maxInputTags: `NUMBER`, `OPTIONAL`, default:2
requestDelay: `NUMBER`, `OPTIONAL`, default:100 ms
```

### What is this project contain

#### Pages: 
- `Login`
- `Email` 
- `Username` 
- `About` 
- `404` 

#### Components
- `AutoComplete` 
- `NavBar` 

#### Features
- While user type into the field. showing list for the suggestions result
- Have dynamic get url
- Have dynamic response delay timeout
- Have dynamic response data key match
- User can select any item by clicking on it or moving to it by arrow up and down and click enter
- User can move on the items by arrow up and down
- User can select the input value by clicking enter
- User can remove item by click on selected item/tag or click onbackspace
- Close list by clicking out of the auto complete widget
- On waiting time spinner loader coming up
- More tags exceed the limit grouped one tag and show total items number
- Item hovering background color is `#2398ff05`
- Arrow up and down change the background color to `#eeeeee`
- Selected item in drop down list have left border `2px solid #42b983`

#### TODO
- Make the widget more dynamic by adding more props for coloring, spinner DOM, keys, ...etc.
- Adding validation on input value.
- Adding animation to drop down list and select un select item
- Adding description on user input value if the value is already selected.
- Showing button to save selection values and retrieve it any time.
- Build it as a package to be able to used any where.
- Adding avatar image and item description dom on demand
