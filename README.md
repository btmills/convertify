Ensure you have Android Studio and Node.js installed.

Add these to your `~/.bashrc` or `~/.zshrc`:

```
export ANDROID_HOME=~/Library/Android/sdk
PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

```
$ npm i -g cordova gulp

$ git clone https://github.com/btmills/convertify.git

$ cd convertify/www

$ npm i

$ gulp

$ cd ..

$ cordova build android

$ cordova run android
```
