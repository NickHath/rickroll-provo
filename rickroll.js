require('dotenv').config();

// set up twilio REST client
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;
const twilioClient = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// texts art installation using Twilio #
const rickroll = () => {
  const { INSTALLATION_PHONE_NUMBER, TWILIO_NUMBER } = process.env;
  console.log(`Texting rickroll... to ${INSTALLATION_PHONE_NUMBER}`);

  const smsDetails = {
    to: INSTALLATION_PHONE_NUMBER,
    from: TWILIO_NUMBER,
    body: 'rickroll'
  };

  twilioClient.messages.create(smsDetails)
    .then(console.log)
    .catch(console.error);
}

const randomTime = () => {
  // number of ms in 24 hours
  const maxTime = 86400000
      , currentTime = Date.now()
      , randomDelay = Math.floor(Math.random() * maxTime)
      , scheduledTime = currentTime + randomDelay;
  
  // create a new Date object to get the scheduled time's hour
  const scheduledHour = new Date(scheduledTime).getHours();

  // generate a different delay if scheduledHour is too early or late
  if (scheduledHour < 10 || scheduledHour > 19) {
    return randomTime();
  } else {
    console.log(`Texting art installation between ${scheduledHour}:00 and ${scheduledHour}:59 tomorrow`);
    return randomDelay;
  }
}

// recursive calls itself after a random timeout
const dispatchRickroll = () => {
  rickroll();
  setTimeout(dispatchRickroll, randomTime());
}

// start recursive call 1s after running script
setTimeout(dispatchRickroll, 1000);