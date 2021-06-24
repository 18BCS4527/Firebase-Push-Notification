const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().fire);
exports.notifyNewMessage = functions.firestore.document('Rides/{Rides}').onWrite((docSnapshot, context)=>{
  const order = docSnapshot.after.data();
  const drop=order['drop'];
  const id=order['tripid'];
  const status=order['status'];
  const userid=order['uid'];


  if(status=='BOOK'){
  const price =34567;
  const token = 'cI9SE1B2wtE:APA91bE0B52ADRe1LBbLz-wKyhPZz7huCKsdrZjL9GXwqd0E8M2UkB96MZ1uo6PTqZZv9d_u0cKcvmWM9LwTckWc_4wsrqu4-S5dPkHCvRBl7bbmq5dqs83Dm8Hv0m4-WovRpXbFf8is';
  const notificationBody = drop;
  const payload = {
    notification: {
      title: "You have a new Ride",
      body: notificationBody,
      clickAction: 'FLUTTER_NOTIFICATION_CLICK'
    },
    data:{
      ORDER_ID:id,
    }
  };
  return admin.messaging().sendToDevice(token,payload).then(response=>{
   console.log(response)
  }).catch(e=>{
    console.log(e)

  });
  
}
var stat = "";
if(status=='BOOK'){
  stat='Your ride  booking was confirmed';
}
if(status=='ACCEPT'){
  stat='Your ride was accepted by our operator';
}
if(status=='CANCLE'){
  stat='Your ride was cancelled';
}
if(status=='LIVE'){
  stat='Live tracking was anabled you can track your vehicle';
}
if(status=='STARTED'){
  stat='Happy Jounary we hope to reach your destination safe';
}

return admin.firestore().collection('Usertokens').doc(''+userid).get().then(data=>{
  const usertoken = data.get('token');
const notificationBody = stat;

return admin.messaging().sendToDevice(usertoken,payload).then(response=>{
console.log(response)
}).catch(e=>{
 console.log(e)

});

})
      
})