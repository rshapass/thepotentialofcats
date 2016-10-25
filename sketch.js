var serial; // variable to hold aninstance of the serialport library
var portName = '/dev/cu.usbmodem1411'; // use your serial port name here
var inData;
var bg;
var cat;

function preload() {
  bg = loadImage("catphotos/pinkglitter.jpg");
  cat = loadImage("catphotos/cats1.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  // serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose); // callback for the port closing

  // serial.list();                      // list the serial ports
  serial.open(portName); // open a serial port
}


function draw() {
  background(0);
  image(bg, 0, 0, 1200, 800, 0, 0, windowWidth, windowHeight);
  image(cat, 0, 0, 300, 229, mouseX, mouseY, inData, inData);
  
  // // fill(inData, inData, inData);
  // // text("sensor value: " + inData, 30, 30);
  // ellipse(mouseX, mouseY, inData, inData);
}


function serverConnected() {
  println('connected to server.');
}

function portOpen() {
  println('the serial port opened.')
}


function serialEvent() {
  inData = Number(serial.read());
}

function serialError(err) {
  println('Something went wrong with the serial port. ' + err);
}

function portClose() {
  println('The serial port closed.');
}