# Verb Practice App

This is a simple Spanish verb conjugation quizzing app built with Expo/React Native. Its original purpose was twofold:

1. Teach myself the basics of React Native
2. Practice my spanish verb conjugations, once the app is published!

## Development quickstart

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Install the App

As of now, the app is not published on the Apple App Store or Google Play.

If you are on an Android device, you can build the app and install manually.

### Why it's not published

**Google Play:**
I don't own an Android device. Google Play charges a one-time $25 fee for a developer account in order to submit an app. So, selfishly, since I wouldn't be able to download the app anyways, I passed. Eventually when I own an Android phone, I'll likely submit the app just for fun!

**Apple App Store (rant warning):**
Apple charges $100 for a developer account that is required to submit apps to their App Store. Honestly, I was ready pay the fee until I discovered that it's not a one-time thing. No, it's a yearly subscription! Worse yet - if you pay for a year to initially submit your app and then don't pay the following year, they delete your app from the app store. I'm fine with paying a small fee to publish a silly little project like this app. But $100/year is "commitment" territory, not "small fee" territory. I know that $100 may not seem like much to some people, but it's more the premise of the situation, culminated with several other factors. Allow me to continue the rant.

This whole discovery was extremely off-putting to me. I don't own a Mac computer, so during the development and testing, I was using a combination of the iOS Expo Go (dev) app and Android Simulator. For the uninformed, you cannot build iOS apps (even React Native or Flutter) on non-apple operating systems. I knew that going into this project. However, I expected that I'd at least be able to utilize Expo's EAS services to create an iOS build, and somehow manually install this on my device for testing. This is also not possible without that $100 fee.

Look -- I paid nearly $1000 cash for my personal iPhone (a decision I've come to regret). But, unless I fork over another $100 every year, I am forbidden from running MY OWN code on it! You either pay Apple or you don't run your code -- that's final. Well, mostly. You CAN buy a Mac computer and jump through a bunch of hoops enabling various developer options (at the expense of device security), and provisioning your device, to install your app. But even then, it's only temporary. These sorts of builds expire after a certain number of days, after which the phone I bought and paid for will no longer allow me to run the code (a new build must be created).

Further, friends and colleagues in software roles have commented to me over the years about how difficult deployments with Apple's app store are. There's also a growing number of high-profile cases in the news against Apple, which involve them abusing their power to prevent apps from being published. They also take a massive cut of in-app payment currency. In the United States, since consumer protections are a joke, Apple is allowed to run free and abuse their power and I'm tired of it. They are an evil profit-seeking company in my eyes, and they do not deserve my attention any longer. I have made the personal decision not to pursue personal iOS projects. I wish this was not the case. But I simply do not want to play ball in their court. The experience has left me feeling frustrated and violated.

Note: these are my own personal views. In the event that I am affiliated with an organization that is, or is planning to, develop an iOS application: I will [attempt to] bite my tongue and do my job :)
