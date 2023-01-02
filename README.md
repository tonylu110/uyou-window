# uyou-window
This is a window webcomponent

[review in CodeSandbox](https://codesandbox.io/p/github/tonylu110/uyou-window/main)

If you want to use this component, you need build main.ts to `javascript` file, and add this to `<script></script>`, you can use this like
```html
<script src="./main.js"></script>
<uyou-window></uyou-window>
```
After you can change window style like
```html
<uyou-window 
        title="title"
        tb-color="red"
        tt-color="white"
        width="400"
        height="300"
        y="200"
        x="200"
        body-color="red"
        tb-shadow="true"
        win-radius="20"
>you can add some nodes in this and show</uyou-window>
```
It's like

![](https://mp-0956b3c3-b4ed-405b-812d-b6b32dfbc322.cdn.bspapp.com/cloudstorage/deb0eaaf-fe11-429c-8a01-ff17188ff5ea.png)

These props means
```
title // title bar text // default: title
tb-color // title bar color // default: bule
tt-color // title bar text color // default: white
width // window width // default: 400
height // window height // default: 300
y // window position on the y // default: 0 if have pos cannot use
x // window position on the x // default: o if have pos cannot use
body-color // body color // default: white
tb-shadow // title bar shadow show or hide // default: false
win-radius // window round radius // default: 10
pos // set window position // default: default set the prop do not use x or y
```