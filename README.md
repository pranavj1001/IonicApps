# IonicApps
Hybrid Mobile Applications.

Hey there,

This repository contains some of the hybrid mobile applications based on **Ionic Framework**. Here I've also used AngularJS to implement the main programming logic for the applications.

### What is Ionic Framework ?
Ionic is the beautiful, free and open source mobile SDK for developing native and progressive web apps with ease.
[More info can be found here.](https://ionicframework.com/)

### To install these applications

1. First install Ionic using node.js utility

  ``` $ sudo npm install -g ionic cordova ```

2. Then copy files

  ```$ ionic start <appName> https://github.com/pranavj1001/IonicApps/<appName>```

  ```eg. $ ionic start Eightball https://github.com/pranavj1001/IonicApps/Eightball```

3. Then to run the applications on browser

  ```cd <Path to app>```

  ```ionic serve```
 
4. To run the applications in mobile phones
 
 ```ionic platform add android```
 
 ```ionic build android```
 
 ```ionic emulate android```
 
 In order to run applications on iOS devices then simply replace 'android' with 'ios'.
 
 If you want to run on your actual device then 
 
 **For Android**
 
 ```ionic run android```
 
 Make sure you enable the Debugging mode on your device.
 
 **For iOS**
 
 You’ll need to sign up for an Apple Developer account to test as a native app on an iPhone or iPad. Unfortunately, this costs $99 per year. :(
  
You're good to go now!

###Contents

* **Eightball app** - This is a simple application which displays a random text after the user clicks on the screen. It also displays the message with an animation.

* **soundboard app** - This is a simple application which displays a list containing various sounds. After tapping on the list item the corresponding music starts playing. User can also delete sound from the list and also can reorder the list. I've used some animations which the Ionic framework provides. 

Acronym used

(WIP) --> Work in Progress.
