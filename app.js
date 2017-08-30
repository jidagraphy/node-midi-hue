var easymidi = require('easymidi');

var hue = require("node-hue-api");
var HueApi = hue.HueApi;
var lightState = hue.lightState;

var displayJSON = function(result) {
    console.log(JSON.stringify(result, null, 2));
};

var host = "192.168.200.133",
    username = "DV2CkRTtKJnpUG77t6T-LLHx3-mJDsS5A8oO5ihH",
    api;

api = new HueApi(host, username);

// api.lightStatus(4).then(displayJSON).done();


var input = new easymidi.Input('Midi Hue', true);

input.on('noteoff', function (msg) {
  console.log('noteoff', msg.note, msg.velocity, msg.channel);

    api.setLightState(5, {
      on : false,
      transitiontime: 1,
    }).then(displayJSON)
    .done();
    api.setLightState(4, {
      on : false,
      transitiontime: 1,
    }).then(displayJSON)
    .done();

});

input.on('noteon', function (msg) {
  console.log('noteon', msg.note, msg.velocity, msg.channel);

  var brightness = (msg.velocity/127) * 100;
  var hue = (msg.note%12/12) * 65535;
  // console.log(hue);

  api.setLightState(5, {
    on : true,
    hue : hue,
    sat: 255,
    brightness: brightness,
    transitiontime: 1,
  }).then(displayJSON)
  .done();
  api.setLightState(4, {
    on : true,
    hue : hue,
    sat: 255,
    brightness: brightness,
    transitiontime: 1,
  }).then(displayJSON)
  .done();
});

input.on('poly aftertouch', function (msg) {
  console.log('poly aftertouch', msg.note, msg.pressure, msg.channel);
});

input.on('cc', function (msg) {
  console.log('cc', msg.controller, msg.value, msg.channel);
  if(msg.controller == 1){
    var hue = (msg.value/127) * 65535;
    // api.setLightState(5, {
    //   hue: hue,
    //   transitiontime: 1,
    // }).then(displayJSON)
    // .done();
    // api.setLightState(4, {
    //   hue: hue,
    //   transitiontime: 1,
    // }).then(displayJSON)
    // .done();
  }
});

input.on('program', function (msg) {
  console.log('program', msg.number, msg.channel);
});

input.on('channel aftertouch', function (msg) {
  console.log('channel aftertouch', msg.pressure, msg.channel);
});

input.on('pitch', function (msg) {
  console.log('pitch', msg.value, msg.channel);
});

input.on('position', function (msg) {
  console.log('position', msg.value);
});

input.on('select', function (msg) {
  console.log('select', msg.song);
});

input.on('clock', function () {
  console.log('clock');
});

input.on('start', function () {
  console.log('start');
});

input.on('continue', function () {
  console.log('continue');
});

input.on('stop', function () {
  console.log('stop');
});

input.on('reset', function () {
  console.log('reset');
});
