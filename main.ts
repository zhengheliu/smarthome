// 门: AnalogPin.P8
// 
// 窗: AnalogPin.P9
// 
// 红外热释电传感器: P15
// DHT11 传感器: P2
// 电机: AnalogPin P12 + P13
function openCurtain () {
    if (curtainOperating) {
        return
    }
    curtainOperating = true
    I2C_LCD1602.BacklightOn()
    I2C_LCD1602.ShowString("Open Curtain", 0, 0)
    while (degree < 100) {
        degree += 5
        degree = Math.min(degree, 100)
        pins.servoWritePin(AnalogPin.P9, degree)
        control.waitMicros(200 * 1000)
    }
    music.startMelody(music.builtInMelody(Melodies.JumpUp), MelodyOptions.Once)
    I2C_LCD1602.clear()
    I2C_LCD1602.BacklightOff()
    curtainOperating = false
}
function checkPeople () {
    if (pins.digitalReadPin(DigitalPin.P15)) {
        basic.showIcon(IconNames.Heart)
    } else {
        basic.clearScreen()
    }
}
function closeCurtain () {
    if (curtainOperating) {
        return
    }
    curtainOperating = true
    I2C_LCD1602.BacklightOn()
    I2C_LCD1602.ShowString("Close Curtain", 0, 0)
    while (degree > 0) {
        degree += 0 - 5
        degree = Math.max(degree, 0)
        pins.servoWritePin(AnalogPin.P9, degree)
        control.waitMicros(200 * 1000)
    }
    music.startMelody(music.builtInMelody(Melodies.JumpDown), MelodyOptions.Once)
    I2C_LCD1602.clear()
    I2C_LCD1602.BacklightOff()
    curtainOperating = false
}
input.onButtonPressed(Button.A, function () {
    openCurtain()
})
input.onButtonPressed(Button.B, function () {
    closeCurtain()
})
function checkDHT11 () {
    dht11_dht22.queryData(
    DHTtype.DHT11,
    DigitalPin.P2,
    true,
    false,
    true
    )
    temp = dht11_dht22.readData(dataType.temperature)
    humi = dht11_dht22.readData(dataType.humidity)
    if (!(dht11_dht22.readDataSuccessful())) {
        return
    }
    I2C_LCD1602.BacklightOn()
    I2C_LCD1602.ShowString("Temp: " + temp, 0, 0)
    I2C_LCD1602.ShowString("Humi: " + humi, 0, 1)
    if (humi > 90) {
        pins.analogWritePin(AnalogPin.P12, 300)
        pins.analogWritePin(AnalogPin.P13, 0)
    } else {
        pins.analogWritePin(AnalogPin.P12, 0)
        pins.analogWritePin(AnalogPin.P13, 0)
    }
}
let humi = 0
let temp = 0
let curtainOperating = false
let degree = 0
pins.servoWritePin(AnalogPin.P9, degree)
I2C_LCD1602.LcdInit(39)
I2C_LCD1602.clear()
I2C_LCD1602.BacklightOff()
basic.forever(function () {
    checkPeople()
    checkDHT11()
    control.waitMicros(100 * 1000)
})
